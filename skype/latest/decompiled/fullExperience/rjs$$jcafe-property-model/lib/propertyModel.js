(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("jcafe-property-model/lib/propertyModel", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function v(e, t) {
    return t = U({ code: e }, t), U(Error(this || e), t);
  }
  function m(e, t) {
    var n = e + " is not a " + t;
    return v.call(n, "WrongType", { value: e });
  }
  function g(e, t, n) {
    var r = "`" + e + "` = " + t + " is not a " + n;
    return v.call(r, "WrongArgType", {
      arg: e,
      value: t
    });
  }
  function y(e, t) {
    var n = e + " != " + t;
    return v.call(n, "DoesNotEqual", {
      lhs: e,
      rhs: t
    });
  }
  function b(e, t) {
    var n = "`" + e + "` is invalid: " + t;
    return v.call(n, "InvalidArgument", {
      arg: e,
      reason: t
    });
  }
  function w(e, t) {
    var n = "Invalid state: " + e + " (expected " + t + ")";
    return v.call(n, "InvalidState", {
      actual: e,
      expected: t
    });
  }
  function E(e, t) {
    var n = "the `" + e + "` property is missing";
    return v.call(n, "KeyMissing", {
      key: e,
      object: t
    });
  }
  function S(e) {
    return v("AlreadyExists", { item: e });
  }
  function x(e) {
    return v("DoesNotExist", { item: e });
  }
  function T(e) {
    return v("NotSupported", { reason: e });
  }
  function N(e, t, n) {
    if (!e) {
      if (!c)
        debugger;
      throw v(t || "AssertionFailed", n);
    }
  }
  function C(e, t, n) {
    if (!e)
      throw v(t || "RuntimeCheckFailed", n);
  }
  function k(e) {
    return c ? e : e + ":" + X();
  }
  function L(e, t) {
    p.replacePrototype ? e.__proto__ ? e.__proto__ = t : Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : U(e, t) : U(e, t);
  }
  function A() {
    function r(e, t) {
      s(e, 0);
    }
    function i() {
      var n = l();
      while (e.length) {
        var r = e.shift();
        r();
        var i = l() - n;
        if (i >= t || i < 0)
          return;
      }
    }
    function o() {
      n = !0;
      try {
        i();
      } finally {
        n = !1;
        e.length && r(o, !1);
      }
    }
    function u() {
      if (n || e.length > 1)
        return;
      r(o, !0);
    }
    function a(t) {
      e.push(t);
      u();
    }
    var e = [], t = 16, n = !1;
    return a;
  }
  function M(e) {
    var t = [];
    for (var n = 1; n < arguments.length; n++)
      t[n - 1] = arguments[n];
    e = e.bind.apply(e, [this].concat(t));
    c ? e() : O(e);
  }
  function _(e) {
    N(e >= 0);
    var t = jt(e + " sec timeout", {
        cancel: function (e) {
          o(n);
          t.reject(e);
        }
      }), n = s(function () {
        t.resolve();
      }, e * 1000 | 0);
    return t.promise;
  }
  function D(e) {
    return Pt(e)().then(function () {
      return U(D(e), { locked: !0 });
    });
  }
  function P(e, t) {
    return N(ht(t) && t > 0), e = Pt(e), D(function () {
      return e().then(B(_, t));
    });
  }
  function H(e, t, n) {
    return t in e ? e[t] : n;
  }
  function B(e) {
    var t = [];
    for (var n = 1; n < arguments.length; n++)
      t[n - 1] = arguments[n];
    var r = this;
    return e.bind ? e.bind.apply(e, [r].concat(t)) : function () {
      return e.apply(r, t.concat([].slice.call(arguments, 0)));
    };
  }
  function j(e, t) {
    var n;
    if (e.indexOf)
      return e.indexOf(t);
    for (n = 0; n < e.length; n++)
      if (e[n] == t)
        return n;
    return -1;
  }
  function F(e, t) {
    e.splice(t, 1);
  }
  function I(e, t, n) {
    e.splice(t, 0, n);
  }
  function q(e) {
    var t;
    return Object.keys ? t = Object.keys(e) : (t = [], J(e, function (e, n) {
      t.push(n);
    })), t;
  }
  function R(e, t) {
    for (var n in e)
      if (!t(e[n], n))
        return !1;
    return !0;
  }
  function U(e) {
    var t = [];
    for (var n = 1; n < arguments.length; n++)
      t[n - 1] = arguments[n];
    var r, i, s, o = t[t.length - 1];
    e = e || {};
    o = ct(o) ? o : "";
    for (i = 0; i < t.length; i++) {
      r = t[i] || {};
      if (r !== o)
        for (s in r)
          if (o != "append" || !(s in e))
            e[s] = r[s];
    }
    return e;
  }
  function z(e, t, n) {
    n === void 0 && (n = null);
    var r, i = n || window, s = e.split(".");
    for (r = 0; r < s.length; r++)
      i = i[s[r]] || (i[s[r]] = {});
    for (r in t)
      r in i ? f && f.warn : i[r] = t[r];
    return i;
  }
  function W() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
      var t = a.random() * 16 | 0, n = e == "x" ? t : t & 3 | 8;
      return n.toString(16);
    });
  }
  function X() {
    return a.random().toString(16).slice(2);
  }
  function V(e, t, n, r) {
    try {
      Object.defineProperty(e, t, {
        value: n,
        enumerable: !1,
        writable: !r
      });
    } catch (i) {
      e[t] = n;
    }
  }
  function $(e) {
    return e.trim ? e.trim() : e.replace(/^\s+|\s+$/gm, "");
  }
  function J(e, t) {
    N(ft(e) || at(e));
    N(pt(t));
    var n, r, i;
    if (ft(e))
      for (r = 0; r < e.length; ++r)
        t(e[r], r);
    else
      for (i in e)
        n = t(e[i], i), N(n === void 0);
  }
  function K(e, t) {
    N(ft(e) || at(e));
    N(pt(t));
    var n;
    return ft(e) ? (n = [], J(e, function (e, r) {
      t(e, r) && n.push(e);
    })) : (n = {}, J(e, function (e, r) {
      t(e, r) && (n[r] = e);
    })), n;
  }
  function Q(e) {
    N(at(e));
    var t = [];
    return J(e, function (e) {
      t.push(e);
    }), t;
  }
  function G(e) {
    return N(ft(e) || at(e)), ft(e) ? e.length : q(e).length;
  }
  function Y(e, t) {
    N(ft(e) || at(e));
    N(pt(t));
    var n;
    if (ft(e)) {
      for (n = 0; n < e.length; ++n)
        if (t(e[n], n))
          return !0;
    } else
      for (n in e)
        if (t(e[n], n))
          return !0;
    return !1;
  }
  function Z(e, t) {
    N(ft(e) || at(e));
    N(pt(t));
    var n, r = {};
    if (ft(e)) {
      for (n = 0; n < e.length; ++n)
        if (t(e[n], n))
          return e[n];
    } else
      for (n in e)
        if (t(e[n], n))
          return r[n] = e[n], r;
    return null;
  }
  function et(e) {
    return Object.freeze ? Object.freeze(e) : e;
  }
  function tt() {
    var e = {}, t, n;
    for (n = 0; n < arguments.length; n++)
      t = arguments[n], e[t] = t;
    return et(e);
  }
  function nt() {
    var e, t;
    if (arguments.length == 1 && at(arguments[0]))
      e = arguments[0];
    else {
      e = {};
      for (t = 0; t < arguments.length; t++)
        e[arguments[t]] = t;
    }
    return et(e);
  }
  function rt(e, t) {
    for (var n in e)
      if (e[n] == t)
        return n;
    return "";
  }
  function it(e, t, n) {
    var r, i;
    if (ft(e)) {
      r = [];
      for (i = 0; i < e.length; i++)
        r.push(t.call(n, e[i], i, e));
    } else if (at(e)) {
      r = {};
      for (i in e)
        r[i] = t.call(n, e[i], i, e);
    }
    return r;
  }
  function st(e, t, n) {
    var r, i = {};
    e = e || {};
    t = t || {};
    for (r in t)
      if (!(r in e) || n != "append")
        i[r] = {
          value: t[r],
          writable: !0,
          enumerable: !0,
          configurable: !0
        };
    return Object.create(e, i);
  }
  function ot(e) {
    return e && JSON.parse(JSON.stringify(e));
  }
  function ut(e) {
    return e && Object.prototype.toString.call(e) == "[object Object]";
  }
  function at(e) {
    return ut(e);
  }
  function ft(e) {
    return Object.prototype.toString.call(e) == "[object Array]";
  }
  function lt(e, t) {
    if (!ft(e))
      return !1;
    for (var n = 0; n < e.length; n++)
      if (!t(e[n]))
        return !1;
    return !0;
  }
  function ct(e) {
    return Object.prototype.toString.call(e) == "[object String]";
  }
  function ht(e) {
    return Object.prototype.toString.call(e) == "[object Number]";
  }
  function pt(e) {
    return Object.prototype.toString.call(e) == "[object Function]";
  }
  function dt(e) {
    return Object.prototype.toString.call(e) == "[object Boolean]";
  }
  function vt(e) {
    return ct(e) && e.length > 0;
  }
  function mt(e) {
    return e === null || e === undefined;
  }
  function gt(e) {
    return ht(e) && (e | 0) == e;
  }
  function yt(e, t) {
    return gt(e) && ft(t) && e >= 0 && e < t.length;
  }
  function bt(e, t, n) {
    return ht(n) && n >= e && n <= t;
  }
  function wt(e) {
    return ut(e) && vt(e.type) && vt(e.url);
  }
  function Et(e) {
    return at(e) && "status" in e;
  }
  function St(e) {
    for (var t in e)
      if (e.hasOwnProperty(t))
        return !1;
    return !0;
  }
  function xt(e) {
    return e && e[h];
  }
  function Tt(e) {
    return e instanceof Ft;
  }
  function Nt(e) {
    return e && e.constructor === ln;
  }
  function Ct(e) {
    return e && e.constructor === sn;
  }
  function kt(e) {
    return e && e.constructor === Zt;
  }
  function Lt(e, t) {
    var n, r = t.split("|");
    for (n = 0; n < r.length; n++)
      if (r[n] in Lt.types && Lt.types[r[n]](e))
        return !0;
    return !1;
  }
  function At(e) {
    return e && pt(e.then);
  }
  function Ot(e, t) {
    var n, r = typeof e, i = typeof t;
    if (e === t)
      return !0;
    if (r !== i || r !== "object" && r !== "function")
      return !1;
    if (e === null || t === null)
      return e === t;
    if (e instanceof u && t instanceof u)
      return +e == +t;
    for (n in e)
      if (!(n in t) || e[n] !== t[n])
        return !1;
    for (n in t)
      if (!(n in e) || e[n] !== t[n])
        return !1;
    return !0;
  }
  function Mt(e) {
    return e.replace(/[<>&;#/]/gm, function (e) {
      return "&#" + e.charCodeAt(0) + ";";
    }).replace(/\r\n|\n/gm, function () {
      return "<br>";
    });
  }
  function _t(e) {
    return new Qt("<root>" + e + "</root>").text();
  }
  function Dt(e) {
    return e.replace(/&(#?\w+);/gm, function (e, t) {
      return t.charAt(0) == "#" ? String.fromCharCode(+t.slice(1)) : Dt.entities[t];
    });
  }
  function Pt(e, t) {
    var n = e[h] ? e : function () {
      try {
        return jt.wait(e.apply(this, arguments), t);
      } catch (n) {
        return jt().reject(n).promise;
      }
    };
    return V(n, h, !0), n;
  }
  function Bt(e, t) {
    this.event = e;
    this.listener = t;
  }
  function jt(e, t) {
    if (this instanceof jt) {
      ct(e) || (t = e, e = void 0);
      t = t || {};
      var n = this, r = {};
      return r.leafs = [], r.state = "pending", r.status = sn({ value: e }), t.mode && (r.mode = t.mode), t.cancel && (r.fnCancel = t.cancel), r.promise = new jt.Promise(n), U(n, {
        _: r,
        status: r.status,
        promise: r.promise
      }), undefined;
    }
    return new jt(e, t);
  }
  function Ft(e) {
    var t = jt();
    try {
      e(function (e) {
        t.resolve(e);
      }, function (e) {
        t.reject(e);
      }, t.status);
    } catch (n) {
      t.promise.state() == "pending" && t.reject(n);
    }
    return t.promise;
  }
  function It(e) {
    return st(It.prototype, {
      exec: function (t, n) {
        var r = e(t, n || 0);
        return arguments.length == 2 ? r : !r || r.pos != t.length ? null : r.res;
      }
    });
  }
  function qt(e) {
    return It(function (t, n) {
      return t.slice(n, n + e.length) == e ? {
        res: e,
        pos: n + e.length
      } : undefined;
    });
  }
  function Rt(e) {
    return It(function (t, n) {
      var r = e.exec(t.slice(n));
      return r && r.index == 0 ? {
        res: r[0],
        pos: n + r[0].length
      } : undefined;
    });
  }
  function Ut(e, t) {
    return It(function (n, r) {
      return e.exec(n, r) || {
        res: t,
        pos: r
      };
    });
  }
  function zt(e, t) {
    return It(function (n, r) {
      return !t.exec(n, r) && e.exec(n, r);
    });
  }
  function Wt() {
    var e = [];
    for (var t = 0; t < arguments.length; t++)
      e[t] = arguments[t];
    return It(function (t, n) {
      var r, i, s = [];
      for (r = 0; r < e.length; r++) {
        i = e[r].exec(t, n);
        if (!i)
          return undefined;
        s.push(i.res);
        n = i.pos;
      }
      return {
        res: s,
        pos: n
      };
    });
  }
  function Xt() {
    var e = [];
    for (var t = 0; t < arguments.length; t++)
      e[t] = arguments[t];
    return It(function (t, n) {
      var r, i;
      for (r = 0; r < e.length && !i; r++)
        i = e[r].exec(t, n);
      return i;
    });
  }
  function Vt(e) {
    return It(function (t, n) {
      var r, i = [];
      while (r = e.exec(t, n))
        i.push(r.res), n = r.pos;
      return {
        res: i,
        pos: n
      };
    });
  }
  function $t(e, t) {
    var n = Wt(t, e).select(1), r = Wt(e, Vt(n)).then(function (e) {
        return [e[0]].concat(e[1]);
      });
    return Ut(r, []);
  }
  function Jt(e, t) {
    var n = Rt(/\\./).then(function (e) {
        return e.slice(1);
      }), r = Xt(n, zt(Rt(/./), t));
    return Wt(e, Vt(r), t).select(1).merge();
  }
  function Kt(e) {
    var t = Kt.pattern.exec(e);
    if (!t)
      throw new SyntaxError("Invalid data URL: " + e);
    return t.base64 = !!t.attributes.base64, t;
  }
  function Gt(e) {
    return { root: new Qt($(e.replace(/^<\?.+?\?>/, ""))) };
  }
  function Yt(e) {
    var t = Yt.pattern.exec(e || "");
    if (t)
      return t;
    throw new SyntaxError("Invalid WWW-Authenticate header:\n" + e);
  }
  function Zt(e, t) {
    function r() {
      var t;
      if (!n.enabled()) {
        t = v("CommandDisabled", { reason: n.enabled.reason });
        if (xt(e))
          return jt().reject(t).promise;
        throw t;
      }
      return e.apply(this, arguments);
    }
    function i() {
      return "[Command: enabled = " + n.enabled() + "]";
    }
    function s(e) {
      return Zt(function () {
        return n.apply(e, arguments);
      }, n.enabled);
    }
    var n = r;
    return U(n, {
      constructor: Zt,
      enabled: t && t.asReadOnly(),
      bind: s,
      toString: i
    });
  }
  function en(e) {
    return U(e, {
      constructor: Zt,
      toString: function () {
        return "[Command: enabled = true]";
      },
      enabled: on(!0)
    });
  }
  function tn(e) {
    return e !== void 0 ? Zt(function () {
    }, on(!1, e)) : (tn.instance || (tn.instance = Zt(function () {
    }, on(!1))), tn.instance);
  }
  function nn(e) {
    return e !== void 0 ? Zt(Pt(function () {
    }), on(!1, e)) : (nn.instance || (nn.instance = Zt(Pt(function () {
    }), on(!1))), nn.instance);
  }
  function rn(e, t) {
    var n = 0;
    return function () {
      var r = !1;
      return n++, n == 1 && e && e(), {
        dispose: function () {
          if (r)
            throw v("AlreadyDisposed");
          r = !0;
          n--;
          n == 0 && t && t();
        }
      };
    };
  }
  function sn(e) {
    function s(e, n) {
      return arguments.length == 0 ? t._value : (t._write(e, n), this);
    }
    var t = s, n = e && e.get, r = e && e.set, i = e && e.readOnly;
    return e && e.value !== void 0 && (t._value = e.value), e && e.reason !== void 0 && (t.reason = e.reason), e && e.check && (t._check = e.check), n && (t._getter = Pt(n)), i && (t._ro = t), r && (t._setter = Pt(r, "sync")), e && e.subscribed && (t._subscribed = e.subscribed), e && e.unsubscribed && (t._unsubscribed = e.unsubscribed), L(t, sn.prototype), U(t, {
      get: kt(n) ? Zt(t._getAsync, n.enabled) : en(t._getAsync),
      set: i ? nn() : kt(r) ? Zt(t._setAsync, r.enabled) : en(t._setAsync)
    }), Object.defineProperty(t, "changed", {
      get: t._getChanged,
      set: function (e) {
        t._getChanged();
        t._changed.observer = e;
      }
    }), t;
  }
  function on(e, t) {
    if (t === void 0) {
      if (e === null)
        return sn["null"];
      if (e === !0)
        return sn["true"];
      if (e === !1)
        return sn["false"];
    }
    return sn({
      value: e,
      reason: t,
      readOnly: !0
    });
  }
  function an(e, t) {
    var n = sn();
    return n(e, t), n.inc = function () {
      n(n() + 1);
    }, n.dec = function () {
      n(n() - 1);
    }, n;
  }
  function fn(e, t) {
    var n = sn();
    return n(e, t), n;
  }
  function ln(e) {
    function r(e) {
      return arguments.length == 0 ? t._asArray() : ft(e) ? (t.empty(), t._addArray(e), this) : t._getFromCache(e);
    }
    var t = r, n = t._ = U({}, e);
    return e && e.get && (n.get = Pt(e.get)), n.vals = [], n.keys = [], n.idxs = {}, L(t, ln.prototype), t._init(), t;
  }
  function cn(e) {
    function o(t, n) {
      N(!r[t]);
      N(t > e);
      N(pt(n));
      r[t] = Pt(n);
    }
    function u(e) {
      C(e >= n(), "InvalidTargetState", {
        currentTarget: n(),
        requestedTarget: e
      });
      if (e == t())
        return;
      return e > n() && (i = jt("advancing to target state " + e, { cancel: a }), n.set(e), f(i)), i.promise;
    }
    function a(e) {
      s.cancel(e);
      s = null;
    }
    function f(e) {
      if (s)
        return;
      var i = t() + 1;
      e.status("advancing to state " + i);
      s = r[i].call(null);
      s.then(function (r) {
        s = null;
        t.set(i);
        t() < n() ? f(e) : e.resolve(r);
      }, function (t) {
        s = null;
        e.reject(t);
      });
    }
    var t = sn({ value: e }), n = sn({ value: e }), r = {}, i, s;
    return {
      defineState: o,
      advanceTo: Pt(u),
      state: t.asReadOnly(),
      target: n.asReadOnly()
    };
  }
  function hn(e, t) {
    function a() {
      N(n <= t);
      while (n < t && r.length > 0)
        f();
    }
    function f() {
      var t = r.splice(0, 1)[0], f = s[t], l = i[t];
      delete s[t];
      delete i[t];
      o.splice(0, 1);
      n++;
      u[t] = e(f);
      u[t].then(function (e) {
        l.resolve(e);
      }, function (e) {
        l.reject(e);
      }, l.status).then(function () {
        n--;
        delete u[t];
        a();
      });
    }
    function l(e, t) {
      var n = o.length;
      while (n > 0 && t > o[n - 1])
        n--;
      o.splice(n, 0, t);
      r.splice(n, 0, e);
    }
    function c(e, t) {
      var n;
      if (u[e])
        u[e].cancel(t);
      else {
        i[e].reject(t);
        delete s[e];
        delete i[e];
        for (n = 0; n < r.length; n++)
          if (r[n] == e) {
            r.splice(n, 1);
            o.splice(n, 1);
            break;
          }
      }
    }
    N(pt(e));
    N(t > 0);
    e = Pt(e);
    var n = 0, r = [], i = {}, s = {}, o = [], u = {};
    return function (e, t) {
      var n = X(), r = jt("Waiting in the throttling queue.", { cancel: B(c, n) });
      return i[n] = r, s[n] = e, l(n, t), a(), r.promise;
    };
  }
  function pn(e) {
    N(pt(e));
    var t = null;
    return function () {
      return t || (t = e());
    };
  }
  function dn(e, t) {
    function i(e, t, r) {
      N(ht(e));
      N(r instanceof jt);
      var i = 0;
      while (i < n.length && e > n[i].priority)
        i++;
      n.splice(i, 0, {
        priority: e,
        request: t,
        task: r
      });
    }
    function o(e) {
      N(e > 0);
      N(n.length > 0);
      var t, r = [], i = [];
      for (t = n.length - 1; t >= 0 && r.length < e; t--)
        r.push(n[t].request), i.push(n[t].task);
      return n.splice(t + 1, e), {
        requests: r,
        tasks: i
      };
    }
    function u(e, t) {
      var r;
      for (r = 0; r < n.length; r++)
        if (n[r].task === e)
          break;
      r < n.length ? (n.splice(r, 1), e.reject(t)) : (e.cancelled = !0, e.reject(t));
    }
    function a() {
      function r(e) {
        J(n.tasks, function (t, n) {
          t.cancelled || e(t, n);
        });
      }
      var n = o(t);
      jt.wait(e(n.requests)).then(function (e) {
        r(function (t, n) {
          var r = ft(e) ? e[n] : e;
          jt.wait(r).then(function (e) {
            t.resolve(e);
          }, function (e) {
            t.reject(e);
          }, t.status);
        });
      }, function (e) {
        r(function (t) {
          t.reject(e);
        });
      }, function (e) {
        r(function (t) {
          t.status(e);
        });
      });
    }
    N(t > 0);
    var n = [], r;
    return function (e, t) {
      var o = jt("Waiting in the batching queue.", {
        cancel: function (e) {
          u(o, e);
        }
      });
      return r || (r = s(function () {
        r = null;
        while (n.length > 0)
          a();
      }, 0)), i(t, e, o), o.promise;
    };
  }
  function gn(e) {
    function t(e) {
      N(ct(e));
      var t = e.split("\r\n"), n, r, s, o;
      for (var u = 0; u < t.length; u++)
        if (o = $(t[u]))
          n = o.indexOf(":"), n >= 0 && (r = $(o.substr(0, n)), s = $(o.substr(n + 1)), i(r, s));
    }
    function n(e) {
      N(at(e));
      for (var t in e)
        i(t, e[t] + "");
    }
    function r(e) {
      return N(vt(e)), o[e.toLowerCase()];
    }
    function i(e, t) {
      N(vt(e));
      N(vt(t));
      e = e.toLowerCase();
      o[e] ? o[e] += "\n" + t : o[e] = t;
    }
    function s() {
      var e, t, n, r = "";
      for (t in o) {
        n = o[t].split("\n");
        for (e = 0; e < n.length; e++)
          n[e] && (r += t + ": " + n[e] + "\r\n");
      }
      return r + "\r\n";
    }
    var o = {};
    return vt(e) ? t(e) : at(e) && n(e), {
      get: r,
      add: i,
      toString: s
    };
  }
  function yn(e) {
    var t = Kt("data:" + e.replace(/\s/g, "") + ",");
    return {
      mimeType: t.mime,
      attributes: t.attributes
    };
  }
  function bn(e) {
    if (!e)
      return e;
    var t = /\d+/.exec(e);
    return new u(t && +t[0]);
  }
  function wn(e) {
    return e ? "/Date(" + +e + ")/" : e;
  }
  function En(e, t) {
    function n(e, t) {
      for (var n = 0; n < e.length; n++)
        if (j(t, e[n]) < 0)
          return !1;
      return !0;
    }
    return n(e, t) && n(t, e);
  }
  var n = null;
  try {
    n = window;
  } catch (r) {
  }
  !n && global && (global.window = global);
  var i = window.ttt ? ttt.window : window, s = i.setTimeout, o = i.clearTimeout, u = i.Date, a = i.Math, f = i.console, l = i.performance && i.performance.now ? function () {
      return performance.now();
    } : function () {
      return u.now();
    };
  i = null;
  var c = typeof SkypeWebTests != "undefined", h = k("async"), p = z("Skype.Web.Utils", { replacePrototype: !0 }), d = {
      log: function () {
        if (!c)
          try {
            f.log.apply(f, arguments);
          } catch (e) {
          }
      }
    };
  (function (e) {
    function t(n, r) {
      if (r instanceof RegExp)
        e(r.test(n), "DoesNotMatchPattern", {
          value: n,
          pattern: r
        });
      else if (r && !t(n, r)) {
        debugger;
        throw m(n, r);
      }
    }
    function n(e, n) {
      J(n, function (n, r) {
        var i = e && e[r];
        if (!t(i, n)) {
          debugger;
          throw g(r, i, n);
        }
      });
    }
    e.is = t;
    e.args = n;
  }(N || (N = {})));
  (function (e) {
    function t(e, t) {
      if (e != t)
        throw y(e, t);
    }
    function n(e, t) {
      if (ft(t)) {
        if (j(t, e) == -1)
          throw w(e, t);
      } else if (e != t)
        throw w(e, t);
    }
    function r(e, t) {
      if (!(e in t))
        throw E(e, t);
    }
    e.equals = t;
    e.state = n;
    e.belongs = r;
  }(C || (C = {})));
  var O = A();
  t.isPromise = Tt;
  t.isCollection = Nt;
  t.isProperty = Ct;
  t.isCommand = kt;
  (function (e) {
    e.types = {
      String: ct,
      NotEmptyString: vt,
      Function: pt,
      Dictionary: at,
      Object: ut,
      Array: ft,
      Boolean: dt,
      Void: mt,
      Number: ht
    };
  }(Lt || (Lt = {})));
  (function (e) {
    e.entities = {
      lt: "<",
      gt: ">",
      amp: "&",
      nbsp: "\xA0",
      quot: "\""
    };
  }(Dt || (Dt = {})));
  t.async = Pt;
  var Ht = function () {
    function e(t) {
      function s(e, t) {
        return n.on(e, t), pt(t) && t(this), new Bt(n, e);
      }
      var n = s, r, i = t || {};
      return this instanceof e ? (r = this, U(r, i), r._listeners = [], r._modes = [], r._locked = !1, r.observer = n, L(n, e.prototype.observer), n._event = r, r) : new e(t);
    }
    return e;
  }();
  t.event = Ht;
  U(Bt.prototype, {
    dispose: function () {
      this.event.off(this.listener);
    }
  });
  Ht.prototype = function () {
  };
  U(Ht.prototype, {
    constructor: Ht,
    fire: function () {
      var e = this;
      if (e._enqueue(e, e._fire, arguments))
        return;
      e._fire.apply(e, arguments);
      e._dequeue();
    },
    _fire: function () {
      var e, t = this;
      for (e = 0; e < t._listeners.length; e++)
        t._invoke(t._listeners[e], arguments, t._modes[e]);
    },
    _invoke: function (e, t, n) {
      var r = this;
      if (n == "async" && !c)
        M.call(r, r.invoke, e, t, "sync");
      else
        try {
          e.apply(null, t);
        } catch (i) {
          if (i !== r._ie) {
            f && f.log;
            debugger;
          }
        }
    },
    _enqueue: function (e, t, n) {
      var r = this;
      return r._locked ? (r._queue = r._queue || [], r._queue.push([
        e,
        t,
        n
      ])) : r._locked = !0, r._queue && r._queue.length > 0;
    },
    _dequeue: function () {
      var e, t = this;
      if (t._queue) {
        while (e = t._queue.shift())
          e[1].apply(e[0], e[2]);
        t._queue = null;
      }
      t._locked = !1;
    },
    observed: function () {
      return this._listeners.length > 0;
    },
    observer: {
      toString: function () {
        var e = this._event._listeners.length;
        return "[Event" + (e ? ": " + e + " listener" + (e == 1 ? "" : "s") : "") + "]";
      },
      on: function (e, t) {
        var n = this._event;
        if (n._enqueue(this, this._addListener, [
            e,
            t
          ]))
          return;
        this._addListener(e, t);
        n._dequeue();
      },
      _addListener: function (e, t) {
        var n = this._event;
        N(pt(e));
        n.adding && n.adding.call(n.context, e);
        n._listeners.push(e);
        n._modes.push(t);
        n.added && n.added.call(n.context, e);
        n._listeners.length == 1 && n.subscribed && n.subscribed.call(n.context);
      },
      off: function (e) {
        var t = this._event;
        if (t._enqueue(this, this._removeListener, [e]))
          return;
        this._removeListener(e);
        t._dequeue();
      },
      _removeListener: function (e) {
        var t = this._event, n = j(t._listeners, e);
        n >= 0 && (t._listeners.splice(n, 1), t._modes.splice(n, 1), t._listeners.length == 0 && t.unsubscribed && t.unsubscribed.call(t.context));
      }
    }
  });
  t.task = jt;
  U(jt.prototype, {
    resolve: function (e) {
      var t = this, n = t._;
      return C.state(n.state, "pending"), n.value = e, n.state = "resolved", n.$state && n.$state._set(n.state), n.promise.result = e, t._complete();
    },
    reject: function (e) {
      var t = this, n = t._;
      return C.state(n.state, "pending"), n.value = e, n.state = "rejected", n.$state && n.$state._set(n.state), n.promise.error = e, t._complete();
    },
    _complete: function () {
      var e = this, t = e._;
      t.status(null);
      for (var n = 0; n < t.leafs.length; n++)
        t.leafs[n]();
      return t.fnCancel = null, e;
    }
  });
  (function (e) {
    function t(e) {
      this.task = e;
      Object.defineProperty(this, "state", { get: this._getState });
      Object.defineProperty(this, "status", { get: this._getStatus });
    }
    e.Promise = t;
  }(jt || (jt = {})));
  t.task = jt;
  jt.Promise.prototype = st(Ft.prototype, {
    _getState: function () {
      var e = this.task._;
      return e.$state || (e.$state = sn({
        value: e.state,
        readOnly: !0
      })), e.$state;
    },
    _getStatus: function () {
      var e = this.task._;
      return e.status.asReadOnly();
    },
    from: function (e) {
      var t = this.task, n = t._;
      this.locked ? this.target.from(e) : (n.source = e, n.source.then(function (e) {
        t.resolve(e);
      }, function (e) {
        t.reject(e);
      }, n.status), n.fnCancel = function (e) {
        n.source.cancel(e);
      }, n.source.locked && (n.source.target = this));
    },
    cancel: function (e) {
      var t = this.task, n = t._;
      C.state(n.state, "pending");
      n.fnCancel ? n.fnCancel(e) : t.reject(e);
    },
    then: function (e, t, n) {
      function a() {
        i.status.changed.off(f);
        try {
          if (i.state == "resolved")
            s = pt(e) ? e(i.value) : i.value;
          else {
            if (!pt(t)) {
              o.reject(i.value);
              return;
            }
            s = t(i.value);
          }
        } catch (n) {
          o.reject(n);
          return;
        }
        At(s) ? o.promise.from(jt.wait(s)) : o.resolve(s);
      }
      function f(e, t) {
        i.state == "pending" && (o.status(e, t), pt(n) && n(e, t));
      }
      function l(e) {
        if (i.leafs.length < 2)
          i.promise.cancel(e);
        else {
          F(i.leafs, j(i.leafs, u));
          i.status.changed.off(f);
          try {
            pt(t) ? o.promise.from(jt.wait(t(e))) : o.reject(e);
          } catch (n) {
            o.reject(n);
          }
        }
      }
      var r = this.task, i = r._, s, o = jt({ cancel: l }), u = i.mode == "sync" ? a : B(M, a);
      return i.state == "pending" ? (i.status.changed(f), i.leafs.push(u)) : u(), o.promise;
    }
  });
  (function (e) {
    function t(t) {
      function s(e) {
        J(t, function (t) {
          try {
            t.cancel(e);
          } catch (n) {
          }
        });
      }
      var n = t.length, r = e({ cancel: s }), i = r.promise;
      return n == 1 ? i = e.wait(t[0]) : n == 0 ? r.reject(Error()) : J(t, function (e) {
        e.then(function (e) {
          n--;
          r && (r.resolve(e), r = null, s(v("CompetingTaskResolved")));
        }, function (e) {
          n--;
          n || (r.reject(e), r = null);
        }, function () {
          var e = it(t, function (e, t) {
            return e.status() || "#" + t;
          });
          r.status(e.join(" || "));
        });
      }), i;
    }
    function n(t) {
      function u(e) {
        for (var n = 0; n < t.length; n++)
          try {
            t[n].state() == "pending" && t[n].cancel(e);
          } catch (r) {
            debugger;
          }
      }
      function a() {
        var e = it(o, function (e, t) {
          return e.status() || "#" + t;
        });
        i.status(Q(e).join(" && "));
      }
      var n = t.length, r = [], i = e({ cancel: u }), s = i.promise, o = {};
      return r.length = t.length, n == 0 ? i.resolve([]) : n == 1 ? s = e.wait(t[0]).then(function (e) {
        return [e];
      }) : (J(t, function (n, r) {
        o[r] = t[r] = e.wait(n);
      }), a(), J(t, function (e, t) {
        e.then(function (e) {
          r[t] = e;
          delete o[t];
          a();
          n--;
          n || (i.resolve(r), i = null);
        }, function (e) {
          delete o[t];
          n--;
          i && (i.reject(e), i = null, u(e));
        }, a);
      })), s;
    }
    e.waitAny = t;
    e.waitAll = n;
  }(jt || (jt = {})));
  t.task = jt;
  jt.wait = function (e, t) {
    return Tt(e) ? e : At(e) ? Ft(B.call(e, e.then)) : jt({ mode: t }).resolve(e).promise;
  };
  t.promise = Ft;
  U(Ft.prototype, {
    "catch": function (e) {
      return this.then(null, e || function () {
      });
    },
    "finally": function (e) {
      return this.then(function (t) {
        return jt.wait(e()).then(function () {
          return t;
        });
      }, function (t) {
        return jt.wait(e()).then(function () {
          throw t;
        });
      });
    }
  });
  U(It.prototype, {
    then: function (e) {
      var t = this.exec;
      return It(function (n, r) {
        var i = t(n, r);
        return i && {
          res: e(i.res),
          pos: i.pos
        };
      });
    },
    select: function (e) {
      return this.then(function (t) {
        return t[e];
      });
    },
    merge: function (e) {
      return this.then(function (t) {
        return t.join(e || "");
      });
    },
    join: function (e, t) {
      return this.then(function (n) {
        var r, i = {};
        for (r = 0; r < n.length; r++)
          i[n[r][e]] = n[r][t];
        return i;
      });
    },
    as: function (e) {
      return this.then(function (t) {
        var n, r = {};
        for (n in e)
          r[n] = t[e[n]];
        return r;
      });
    }
  });
  (function (e) {
    function t(e) {
      return encodeURIComponent(e).replace(/%20/gm, "+");
    }
    function n(e) {
      return decodeURIComponent(e.replace(/\+/gm, " "));
    }
    e.encodeData = t;
    e.decodeData = n;
    e.pattern = function () {
      var t = Rt(/[^()<>@,;:\\\x22/\[\]?=\s]+/), n = Wt(t, qt("/"), t).merge(), r = Rt(/[^\uffff]*/).then(e.decodeData), i = Jt(qt("\""), qt("\"")), s = Wt(Rt(/\s*=\s*/), Xt(i, t)).select(1), o = Wt(Rt(/\s*;\s*/), t, Ut(s, !0));
      return Wt(qt("data:"), Ut(n), Vt(o).join(1, 2), Rt(/\s*,\s*/), r).as({
        mime: 1,
        attributes: 2,
        data: 4
      });
    }();
  }(Kt || (Kt = {})));
  var Qt = function () {
    function e(t) {
      if (!(ct(t) || t && t.ast))
        throw new Error("Invalid argument: " + t);
      if (!(this instanceof e))
        return new e(t);
      var n, r;
      try {
        n = t.ast || e.pattern.exec(t);
        if (!n)
          throw void 0;
      } catch (i) {
        throw r = new SyntaxError("Invalid XML: " + t), r.reason = i, r;
      }
      var s = n.attrs || {}, o = (n.nodes || []).map(function (t) {
          return new e({ ast: ct(t) ? { text: t } : t });
        }), u = function (e, t) {
          return e + t.text();
        }, a = function () {
          return n.name;
        }, f = function () {
          return n.text || o.reduce(u, "");
        };
      this.attrs = s;
      this.nodes = o;
      this.name = a;
      this.text = f;
    }
    return e.prototype.toString = function () {
      return "[object XmlNode]";
    }, e.prototype.attr = function (e) {
      return N(e in this.attrs, "Attribute does not exist: " + this.name() + "." + e), this.attrs[e];
    }, e.prototype.selectOne = function (e, t) {
      var n = K(this.nodes, pt(e) ? e : function (n) {
        var r, i;
        if (t)
          for (r in t) {
            i = r.toLowerCase();
            if (t[i] != n.attrs[i])
              return !1;
          }
        return n.name() == e.toLowerCase();
      });
      return N(n.length == 1, "Single node expected: " + e), n[0];
    }, e;
  }();
  Qt.pattern = function () {
    var e, t = Rt(/[\x00-\x20]*/), n = Rt(/\x22[^\x22]*\x22/).then(function (e) {
        return e.slice(1, -1);
      }), r = Rt(/[^\s<>\x22]+/), i = Xt(n, r).then(Dt), s = Rt(/[^<]+/m).then(Dt), o = Rt(/[\w\d:-]+/).then(function (e) {
        return e.toLowerCase();
      }), u = Wt(o, Ut(Wt(t, qt("="), t, i).select(3))), a = $t(u, t).join(0, 1), f = Wt(qt("<"), t, o, t, a, t, qt(">")).as({
        name: 2,
        attrs: 4
      }), l = Wt(qt("<"), t, o, t, a, t, qt("/>")).as({
        name: 2,
        attrs: 4
      }), c = Wt(qt("</"), t, o, t, qt(">")).select(2), h = It(function (t, n) {
        return e.exec(t, n);
      }), p = Wt(f, Vt(Xt(h, s)), c).then(function (e) {
        if (e[0].name == e[2])
          return {
            name: e[2],
            nodes: e[1],
            attrs: e[0].attrs
          };
        throw new SyntaxError("</" + e[2] + "> does not match <" + e[0].name + ">");
      });
    return e = Xt(p, l);
  }();
  (function (e) {
    e.pattern = function () {
      var e = Rt(/[\s,]*/), t = Rt(/[^\s,=]+/), n = Jt(qt("\""), qt("\"")), r = Wt(t, Rt(/\s*=\s*/), n), i = $t(r, e).join(0, 2), s = Wt(t, e, i);
      return $t(s, e).join(0, 2);
    }();
  }(Yt || (Yt = {})));
  t.command = Zt;
  t.enabledCommand = en;
  t.disabledCommand = tn;
  (function (e) {
  }(tn || (tn = {})));
  t.disabledCommand = tn;
  t.disabledAsyncCommand = nn;
  (function (e) {
  }(nn || (nn = {})));
  t.disabledAsyncCommand = nn;
  t.property = sn;
  (function (e) {
    e.sUpdated = {};
  }(sn || (sn = {})));
  t.property = sn;
  sn.prototype = function () {
  };
  U(sn.prototype, {
    constructor: sn,
    toString: function () {
      return "[Property: value = " + this() + "]";
    },
    map: function (e) {
      var t = this, n, r = sn({
          get: Zt(function () {
            return t.get().then(e);
          }, t.get.enabled),
          subscribed: function () {
            n = t.subscribe();
          },
          unsubscribed: function () {
            n.dispose();
          }
        });
      return t.changed(function (t, n) {
        r(e(t), n);
      }), r.asReadOnly();
    },
    when: function (e, t) {
      function s(e, n, s) {
        i(e) && t.call(r, n, s);
      }
      var n = this.changed, r = {
          dispose: function () {
            n.off(s);
          }
        }, i = pt(e) ? e : function (t) {
          return t === e;
        };
      return n(s), r;
    },
    once: function (e, t) {
      return this.when(e, function () {
        this.dispose();
        t.apply(null, arguments);
      });
    },
    equals: function (e) {
      return this.map(function (t) {
        return t == e;
      });
    },
    equalsAny: function () {
      var e = [].slice.call(arguments);
      return this.map(function (t) {
        return Y(e, function (e) {
          return e == t;
        });
      });
    },
    fork: function (e) {
      var t = this, n, r = e.enabled || on(!0), i = r === on(!1), s = sn({
          value: t(),
          reason: t.reason,
          readOnly: i,
          set: !i && Zt(function (n, r) {
            return Pt(e)(n, r).then(function (e) {
              return t.set(e, r);
            });
          }, r),
          get: t.get.bind(t),
          subscribed: function () {
            n = t.subscribe();
          },
          unsubscribed: function () {
            n.dispose();
          }
        });
      return (t._forks = t._forks || []).push(s), s;
    },
    asReadOnly: function () {
      var e = this;
      return e._ro || (e._ro = e.fork(nn())), e._ro;
    },
    observed: function () {
      var e = this, t = e._changed;
      return t && t.observed();
    },
    subscribe: function () {
      var e = this;
      return e.subscribe = rn(e._subscribed, e._unsubscribed), e.subscribe();
    }
  });
  U(sn.prototype, {
    _set: function (e, t) {
      var n = this, r = n._value, i, s = n._forks, o = n._changed;
      if (!Ot(e, r) || !Ot(t, n.reason)) {
        n._value = e;
        n.reason = t;
        o && o.fire(e, t, r);
        if (s)
          for (i = 0; i < s.length; i++)
            s[i]._set(e, t);
      }
      return e;
    },
    _getChanged: function () {
      var e = this;
      return e._changed || (e._changed = new Ht({
        context: e,
        added: e._listenerAdded
      })), e._changed.observer;
    },
    _listenerAdded: function (e) {
      var t = this, n = t._value, r = t.reason;
      n !== void 0 && e(n, r);
    },
    _getAsync: Pt(function () {
      var e = this, t = e._getter, n = e._value;
      return t ? t.call(e, n, e.reason).then(function (t) {
        return e._set(t, e.reason), e._value;
      }) : n;
    }),
    _setAsync: Pt(function (e, t) {
      var n = this, r = n._check, i = n._setter;
      return N(arguments.length > 0), r && r(e), i ? i.call(n, e, t).then(function (e) {
        return n._set(e, t);
      }) : n._set(e, t);
    }, "sync"),
    _write: function (e, t) {
      var n = this, r = n._check, i = n._setter;
      r && r(e);
      if (!n.set.enabled())
        throw Error("This is a read-only property.");
      i && t !== sn.sUpdated ? i.call(n, e, t).then(function (e) {
        n._set(e, t);
      }) : n._set(e, t);
    }
  });
  t.constProperty = on;
  var un = sn;
  un["true"] = sn({
    value: !0,
    readOnly: !0
  });
  un["false"] = sn({
    value: !1,
    readOnly: !0
  });
  un["true"].get.enabled = un["true"];
  un["true"].set.enabled = un["false"];
  un["false"].get.enabled = un["true"];
  un["false"].set.enabled = un["false"];
  nn.instance.enabled = un["false"];
  un["null"] = sn({
    value: null,
    readOnly: !0
  });
  t.numProperty = an;
  t.boolProperty = fn;
  t.collection = ln;
  ln.prototype = function () {
  };
  U(ln.prototype, {
    _init: function () {
      var e = this;
      Object.defineProperties(e, {
        added: {
          enumerable: !0,
          get: e._initAddedEvent,
          set: function (t) {
            e._initAddedEvent();
            e._.added.observer = t;
          }
        },
        removed: {
          enumerable: !0,
          get: e._initRemovedEvent,
          set: function (t) {
            e._initRemovedEvent();
            e._.removed.observer = t;
          }
        },
        changed: {
          enumerable: !0,
          get: e._initChangedEvent,
          set: function (t) {
            e._initChangedEvent();
            e._.changed.observer = t;
          }
        },
        size: {
          enumerable: !0,
          get: e._initSizeProperty,
          set: function (t) {
            e._initSizeProperty();
            e._.size.observer = t;
          }
        }
      });
    },
    _initAddedEvent: function () {
      var e = this, t = e._, n = "added", r;
      return t[n] = t[n] || new Ht({
        context: e,
        adding: e._addedListenerAdding
      }), r = t[n].observer, r;
    },
    _addedListenerAdding: function (e) {
      var t = this, n = t._;
      J(n.vals, function (t, r) {
        e(t, n.keys[r], r);
      });
    },
    _initRemovedEvent: function () {
      var e = this, t = e._, n = "removed", r;
      return t[n] = t[n] || new Ht(), r = t[n].observer, r;
    },
    _initChangedEvent: function () {
      var e = this, t = e._, n = "changed", r;
      return t[n] = t[n] || new Ht({ added: e._changedListenerAdded }), r = t[n].observer, r;
    },
    _changedListenerAdded: function (e) {
      e();
    },
    _initSizeProperty: function () {
      var e = this, t = e._, n = "size", r;
      return t[n] = t[n] || an(t.vals.length), r = t[n].asReadOnly(), r;
    },
    subscribe: function () {
      var e = this, t = e._;
      return e.subscribe = rn(t.subscribed, t.unsubscribed), e.subscribe();
    },
    observed: function () {
      var e = this._, t = e.added, n = e.removed, r = e.changed;
      return t && t.observed() || n && n.observed() || r && r.observed();
    },
    _insert: function (e, t, n) {
      var r, i = this._, s = i.vals.length;
      for (r = n; r < s; r++)
        i.idxs[i.keys[r]]++;
      I(i.vals, n, e);
      I(i.keys, n, t);
      i.idxs[t] = n;
    },
    add: function (e, t, n) {
      var r = this._, i = r.vals.length;
      t = t || (r.key || X)(e);
      if (t in r.idxs)
        throw S(t);
      return n = gt(n) ? n : i, n < 0 && (n = 0), n > i && (n = i), this._insert(e, t, n), r.size && r.size.inc(), r.added && r.added.fire(e, t, n), r.changed && r.changed.fire(), t;
    },
    remove: function (e) {
      var t = this._, n, r, i;
      gt(e) ? (n = e, e = t.keys[n]) : n = t.idxs[e];
      r = t.vals[n];
      if (n >= 0 && n < t.vals.length) {
        for (i = n + 1; i < t.keys.length; i++)
          t.idxs[t.keys[i]]--;
        F(t.vals, n);
        F(t.keys, n);
        delete t.idxs[e];
        t.size && t.size.dec();
        t.removed && t.removed.fire(r, e, n);
        t.changed && t.changed.fire();
      }
    },
    _getFromCache: function (e) {
      var t = this._;
      return ct(e) ? t.vals[t.idxs[e]] : t.vals[e];
    },
    get: function (e) {
      var t = this, n = t._.get, r = n && n().then(function (e) {
          return t._setNewItems(e);
        });
      return jt.wait(r).then(function () {
        return mt(e) ? t._asArray() : t._getFromCache(e);
      });
    },
    index: function (e) {
      return this._.idxs[e];
    },
    key: function (e) {
      return this._.keys[e];
    },
    _setNewItems: function (e) {
      var t = this, n = t._, r;
      if (!at(e))
        return;
      for (r in n.idxs)
        (!(r in e) || n.vals[n.idxs[r]] !== e[r]) && t.remove(r);
      for (r in e)
        r in n.idxs || t.add(e[r], r);
    },
    empty: function () {
      var e = this._, t;
      if (e.removed)
        for (t = 0; t < e.vals.length; t++)
          e.removed.fire(e.vals[t], e.keys[t]);
      e.vals = [];
      e.keys = [];
      e.idxs = {};
      e.size && e.size(0);
      e.changed && e.changed.fire();
    },
    _addArray: function (e) {
      for (var t = 0; t < e.length; t++)
        this.add(e[t]);
    },
    _asArray: function () {
      return this._.vals.slice(0);
    },
    asReadOnly: function () {
      function n(e) {
        return arguments.length == 0 ? t._asArray() : t._getFromCache(e);
      }
      var e = n, t = this;
      return L(e, t), e._init(), e.add = null, e.remove = null, e.empty = null, e;
    },
    fork: function (e) {
      function r(e) {
        return kt(e) ? Zt(Pt(e), e.enabled) : pt(e) ? en(Pt(e)) : nn(T());
      }
      function i(e) {
        return arguments.length == 0 ? n() : n(e);
      }
      var t = i, n = this;
      return L(t, n), U(t, {
        add: r(e.add),
        remove: r(e.remove)
      }), t._init(), t;
    },
    asWritable: function (e) {
      return this.fork(e);
    }
  });
  U(ln.prototype, {
    constructor: ln,
    toString: function () {
      return "[Collection: " + this.size() + " items]";
    },
    each: function (e) {
      return this.added(e), this.added.off(e), this;
    },
    contains: function (e) {
      var t = !1;
      return this.each(function (n) {
        e(n) && (t = !0);
      }), t;
    },
    observe: function (e) {
      function u(e, t) {
        r[t] = e;
        delete i[t];
        f();
      }
      function a(e, t) {
        i[t] = e;
        delete r[t];
        f();
      }
      function f() {
        t || (t = s(function () {
          var n = r, s = i;
          r = {};
          i = {};
          t = null;
          e(n, s);
        }, 0));
      }
      function l() {
        t && (o(t), t = null);
      }
      var t, n = this, r = {}, i = {};
      return n.added(u), n.removed(a), {
        dispose: function () {
          l();
          n.added.off(u);
          n.removed.off(a);
        }
      };
    },
    map: function (e) {
      var t = this, n, r = ln({
          get: function (e) {
            return t.get().then(function () {
              return r(e);
            });
          },
          subscribed: function () {
            n = t.subscribe();
          },
          unsubscribed: function () {
            n.dispose();
          }
        });
      return t.added(function (t, n, i) {
        r.add(e(t), n, i);
      }), t.removed(function (e, t) {
        r.remove(t);
      }), r.asReadOnly();
    },
    filter: function (e) {
      var t = this, n, r = ln({
          get: function (e) {
            return t.get().then(function () {
              return r(e);
            });
          },
          subscribed: function () {
            n = t.subscribe();
          },
          unsubscribed: function () {
            n.dispose();
          }
        });
      return t.added(function (n, i, s) {
        var o, u, a;
        if (!e(n))
          return;
        o = s + 1;
        u = t.size();
        while (o < u && !e(t(o)))
          o++;
        a = o < u ? r.index(t.key(o)) : r.size();
        r.add(n, i, a);
      }), t.removed(function (e, t) {
        r.remove(t);
      }), r.asReadOnly();
    },
    sort: function (e) {
      function i(t, n) {
        return e(t, n) || !e(n, t);
      }
      var t = this, n, r = ln({
          get: function (e) {
            return t.get().then(function () {
              return r(e);
            });
          },
          subscribed: function () {
            n = t.subscribe();
          },
          unsubscribed: function () {
            n.dispose();
          }
        });
      return t.added(function (e, n, s) {
        var o = r.size(), u = 0;
        while (u < o && !i(e, r(u)))
          u++;
        while (u < o && i(r(u), e) && t.index(r.key(u)) < s)
          u++;
        r.add(e, n, u);
      }), t.removed(function (e, t) {
        r.remove(t);
      }), r.asReadOnly();
    }
  });
  (function (e) {
    e.empty = e().asReadOnly();
  }(ln || (ln = {})));
  t.collection = ln;
  var vn = function () {
    function e(t) {
      function r(e) {
        var t = function (t) {
          return arguments.length == 0 ? (n[e] || "") + "" : (n[e] = (t || "") + "", this);
        };
        return t.toString = function () {
          return t();
        }, t;
      }
      var n;
      if (!(this instanceof e))
        return new e(t);
      n = e.pattern.exec((t || "") + "");
      if (!n)
        throw new SyntaxError("Invalid URI: " + t);
      this.scheme = r("scheme");
      this.user = r("user");
      this.host = r("host");
      this.port = r("port");
      this.path = r("path");
      this.query = r("query");
      this.hash = r("hash");
    }
    return e.prototype.toString = function () {
      function e(e, t) {
        return t ? e + t : "";
      }
      var t = (this.user() ? this.user() + "@" : "") + (this.host() || "") + e(":", this.port());
      return (this.scheme() ? this.scheme() + ":" : "") + e("//", t) + this.path() + e("?", this.query()) + e("#", this.hash());
    }, e;
  }();
  vn.pattern = {
    regexp: /^(?:([a-zA-Z][\w+-.]*):)?(?:\/\/(?:([^/@]*)@)?([^:/?#]*)(?:\:(\d*))?)?([^?#]*)(?:\?([^#]*))?(?:#(.*))?$/,
    exec: function (e) {
      var t = this.regexp.exec(e);
      return t && {
        scheme: t[1],
        user: t[2],
        host: t[3],
        port: t[4],
        path: t[5],
        query: t[6],
        hash: t[7]
      };
    }
  };
  (function (e) {
    var t = function () {
      function t(t) {
        if (!(this instanceof e.Query))
          return new e.Query(t);
        var n = this;
        ct(t) ? J(t.split("&"), function (e) {
          var t, r, i = e.indexOf("=");
          i < 0 ? (t = e, r = "") : (t = e.slice(0, i), r = e.slice(i + 1));
          t && (n[decodeURIComponent(t)] = decodeURIComponent(r));
        }) : t && J(ot(t), function (e, t) {
          n[t] = e + "";
        });
      }
      return t.prototype.toString = function () {
        var e = [];
        return J(ot(this), function (t, n) {
          e.push(t ? encodeURIComponent(n) + "=" + encodeURIComponent(t) : encodeURIComponent(n));
        }), e.join("&");
      }, t;
    }();
    e.Query = t;
  }(vn || (vn = {})));
  var mn = {
    isInfo: B(bt, 100, 199),
    isSuccess: B(bt, 200, 299),
    isRedirection: B(bt, 300, 399),
    isClientError: B(bt, 400, 499),
    isServerError: B(bt, 500, 599),
    isError: B(bt, 400, 599),
    Unauthorized: 401,
    ProxyAuthenticationRequired: 407,
    ExpectationFailed: 417,
    TooManyRequests: 429,
    InternalServerError: 500
  };
}));

function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("jcafe-property-model/lib/propertyModel", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  var n = null;
  try {
    n = window;
  } catch (r) {
  }
  !n && global && (global.window = global);
  var i = function () {
    function N(e, t) {
      return t = Y({ code: e }, t), Y(Error(this || e), t);
    }
    function C(e, t) {
      var n = e + " is not a " + t;
      return N.call(n, "WrongType", { value: e });
    }
    function k(e, t, n) {
      var r = "`" + e + "` = " + t + " is not a " + n;
      return N.call(r, "WrongArgType", {
        arg: e,
        value: t
      });
    }
    function L(e, t) {
      var n = e + " != " + t;
      return N.call(n, "DoesNotEqual", {
        lhs: e,
        rhs: t
      });
    }
    function A(e, t) {
      var n = "`" + e + "` is invalid: " + t;
      return N.call(n, "InvalidArgument", {
        arg: e,
        reason: t
      });
    }
    function O(e, t) {
      var n = "Invalid state: " + e + " (expected " + t + ")";
      return N.call(n, "InvalidState", {
        actual: e,
        expected: t
      });
    }
    function M(e, t) {
      var n = "the `" + e + "` property is missing";
      return N.call(n, "KeyMissing", {
        key: e,
        object: t
      });
    }
    function _(e) {
      return N("AlreadyExists", { item: e });
    }
    function D(e) {
      return N("DoesNotExist", { item: e });
    }
    function P(e) {
      return N("NotSupported", { reason: e });
    }
    function H(e, t, n) {
      if (!e) {
        if (!E)
          debugger;
        throw N(t || "AssertionFailed", n);
      }
    }
    function B(e, t, n) {
      if (!e)
        throw N(t || "RuntimeCheckFailed", n);
    }
    function j(e) {
      return E ? e : e + ":" + tt();
    }
    function F(e, t) {
      x.replacePrototype ? e.__proto__ ? e.__proto__ = t : Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : Y(e, t) : Y(e, t);
    }
    function I() {
      function r(e, t) {
        v(e, 0);
      }
      function i() {
        var n = w();
        while (e.length) {
          var r = e.shift();
          r();
          var i = w() - n;
          if (i >= t || i < 0)
            return;
        }
      }
      function s() {
        n = !0;
        try {
          i();
        } finally {
          n = !1, e.length && r(s, !1);
        }
      }
      function o() {
        if (n || e.length > 1)
          return;
        r(s, !0);
      }
      function u(t) {
        e.push(t), o();
      }
      var e = [], t = 16, n = !1;
      return u;
    }
    function R(e) {
      var t = [];
      for (var n = 1; n < arguments.length; n++)
        t[n - 1] = arguments[n];
      e = e.bind.apply(e, [this].concat(t)), E ? e() : q(e);
    }
    function U(e) {
      t(e >= 0);
      var n = o(e + " sec timeout", {
          cancel: function (e) {
            m(r), n.reject(e);
          }
        }), r = v(function () {
          n.resolve();
        }, e * 1000 | 0);
      return n.promise;
    }
    function z(e) {
      return Wt(e)().then(function () {
        return Y(z(e), { locked: !0 });
      });
    }
    function W(e, n) {
      return t(St(n) && n > 0), e = Wt(e), z(function () {
        return e().then(V(U, n));
      });
    }
    function X(e, t, n) {
      return t in e ? e[t] : n;
    }
    function V(e) {
      var t = [];
      for (var n = 1; n < arguments.length; n++)
        t[n - 1] = arguments[n];
      var r = this;
      return e.bind ? e.bind.apply(e, [r].concat(t)) : function () {
        return e.apply(r, t.concat([].slice.call(arguments, 0)));
      };
    }
    function $(e, t) {
      var n;
      if (e.indexOf)
        return e.indexOf(t);
      for (n = 0; n < e.length; n++)
        if (e[n] == t)
          return n;
      return -1;
    }
    function J(e, t) {
      e.splice(t, 1);
    }
    function K(e, t, n) {
      e.splice(t, 0, n);
    }
    function Q(e) {
      var t;
      return Object.keys ? t = Object.keys(e) : (t = [], it(e, function (e, n) {
        t.push(n);
      })), t;
    }
    function G(e, t) {
      for (var n in e)
        if (!t(e[n], n))
          return !1;
      return !0;
    }
    function Y(e) {
      var t = [];
      for (var n = 1; n < arguments.length; n++)
        t[n - 1] = arguments[n];
      var r, i, s, o = t[t.length - 1];
      e = e || {}, o = Et(o) ? o : "";
      for (i = 0; i < t.length; i++) {
        r = t[i] || {};
        if (r !== o)
          for (s in r)
            if (o != "append" || !(s in e))
              e[s] = r[s];
      }
      return e;
    }
    function Z(e, n, r) {
      r === void 0 && (r = null);
      var i, s = r || window, o = e.split(".");
      for (i = 0; i < o.length; i++)
        s = s[o[i]] || (s[o[i]] = {});
      for (i in n)
        t(!(i in s), e + "." + i + " already exists"), s[i] = n[i];
      return s;
    }
    function et() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
        var t = y.random() * 16 | 0, n = e == "x" ? t : t & 3 | 8;
        return n.toString(16);
      });
    }
    function tt() {
      return y.random().toString(16).slice(2);
    }
    function nt(e, t, n, r) {
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
    function rt(e) {
      return e.trim ? e.trim() : e.replace(/^\s+|\s+$/gm, "");
    }
    function it(e, n) {
      t(bt(e) || yt(e)), t(xt(n));
      var r, i, s;
      if (bt(e))
        for (i = 0; i < e.length; ++i)
          n(e[i], i);
      else
        for (s in e)
          r = n(e[s], s), t(r === void 0);
    }
    function st(e, n) {
      t(bt(e) || yt(e)), t(xt(n));
      var r;
      return bt(e) ? (r = [], it(e, function (e, t) {
        n(e, t) && r.push(e);
      })) : (r = {}, it(e, function (e, t) {
        n(e, t) && (r[t] = e);
      })), r;
    }
    function ot(e) {
      t(yt(e));
      var n = [];
      return it(e, function (e) {
        n.push(e);
      }), n;
    }
    function ut(e) {
      return t(bt(e) || yt(e)), bt(e) ? e.length : Q(e).length;
    }
    function at(e, n) {
      t(bt(e) || yt(e)), t(xt(n));
      var r;
      if (bt(e)) {
        for (r = 0; r < e.length; ++r)
          if (n(e[r], r))
            return !0;
      } else
        for (r in e)
          if (n(e[r], r))
            return !0;
      return !1;
    }
    function ft(e, n) {
      t(bt(e) || yt(e)), t(xt(n));
      var r, i = {};
      if (bt(e)) {
        for (r = 0; r < e.length; ++r)
          if (n(e[r], r))
            return e[r];
      } else
        for (r in e)
          if (n(e[r], r))
            return i[r] = e[r], i;
      return null;
    }
    function lt(e) {
      return Object.freeze ? Object.freeze(e) : e;
    }
    function ct() {
      var e = {}, t, n;
      for (n = 0; n < arguments.length; n++)
        t = arguments[n], e[t] = t;
      return lt(e);
    }
    function ht() {
      var e, t;
      if (arguments.length == 1 && yt(arguments[0]))
        e = arguments[0];
      else {
        e = {};
        for (t = 0; t < arguments.length; t++)
          e[arguments[t]] = t;
      }
      return lt(e);
    }
    function pt(e, t) {
      for (var n in e)
        if (e[n] == t)
          return n;
      return "";
    }
    function dt(e, t, n) {
      var r, i;
      if (bt(e)) {
        r = [];
        for (i = 0; i < e.length; i++)
          r.push(t.call(n, e[i], i, e));
      } else if (yt(e)) {
        r = {};
        for (i in e)
          r[i] = t.call(n, e[i], i, e);
      }
      return r;
    }
    function vt(e, t, n) {
      var r, i = {};
      e = e || {}, t = t || {};
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
    function mt(e) {
      return e && JSON.parse(JSON.stringify(e));
    }
    function gt(e) {
      return e && Object.prototype.toString.call(e) == "[object Object]";
    }
    function yt(e) {
      return gt(e);
    }
    function bt(e) {
      return Object.prototype.toString.call(e) == "[object Array]";
    }
    function wt(e, t) {
      if (!bt(e))
        return !1;
      for (var n = 0; n < e.length; n++)
        if (!t(e[n]))
          return !1;
      return !0;
    }
    function Et(e) {
      return Object.prototype.toString.call(e) == "[object String]";
    }
    function St(e) {
      return Object.prototype.toString.call(e) == "[object Number]";
    }
    function xt(e) {
      return Object.prototype.toString.call(e) == "[object Function]";
    }
    function Tt(e) {
      return Object.prototype.toString.call(e) == "[object Boolean]";
    }
    function Nt(e) {
      return Et(e) && e.length > 0;
    }
    function Ct(e) {
      return e === null || e === undefined;
    }
    function kt(e) {
      return St(e) && (e | 0) == e;
    }
    function Lt(e, t) {
      return kt(e) && bt(t) && e >= 0 && e < t.length;
    }
    function At(e, t, n) {
      return St(n) && n >= e && n <= t;
    }
    function Ot(e) {
      return gt(e) && Nt(e.type) && Nt(e.url);
    }
    function Mt(e) {
      return yt(e) && "status" in e;
    }
    function _t(e) {
      for (var t in e)
        if (e.hasOwnProperty(t))
          return !1;
      return !0;
    }
    function Dt(e) {
      return e && e[S];
    }
    function Pt(e) {
      return e instanceof Jt;
    }
    function Ht(e) {
      return e && e.constructor === p;
    }
    function Bt(e) {
      return e && e.constructor === h;
    }
    function jt(e) {
      return e && e.constructor === ln;
    }
    function Ft(e, t) {
      var n, i = t.split("|");
      for (n = 0; n < i.length; n++)
        if (i[n] in r.types && r.types[i[n]](e))
          return !0;
      return !1;
    }
    function It(e) {
      return e && xt(e.then);
    }
    function qt(e, t) {
      var n, r = typeof e, i = typeof t;
      if (e === t)
        return !0;
      if (r !== i || r !== "object" && r !== "function")
        return !1;
      if (e === null || t === null)
        return e === t;
      if (e instanceof g && t instanceof g)
        return +e == +t;
      for (n in e)
        if (!(n in t) || e[n] !== t[n])
          return !1;
      for (n in t)
        if (!(n in e) || e[n] !== t[n])
          return !1;
      return !0;
    }
    function Rt(e) {
      return e.replace(/[<>&;#\/]/gm, function (e) {
        return "&#" + e.charCodeAt(0) + ";";
      }).replace(/\r\n|\n/gm, function () {
        return "<br>";
      });
    }
    function Ut(e) {
      return a("<root>" + e + "</root>").text();
    }
    function zt(e) {
      return e.replace(/&(#?\w+);/gm, function (e, t) {
        return t.charAt(0) == "#" ? String.fromCharCode(+t.slice(1)) : i.entities[t];
      });
    }
    function Wt(e, t) {
      var n = e[S] ? e : function () {
        try {
          return o.wait(e.apply(this, arguments), t);
        } catch (n) {
          return o().reject(n).promise;
        }
      };
      return nt(n, S, !0), n;
    }
    function Xt(e) {
      function i(e, n) {
        return t.on(e, n), xt(n) && n(this), new Vt(t, e);
      }
      var t = i, n, r = e || {};
      return this instanceof s ? (n = this, Y(n, r), n._listeners = [], n._modes = [], n._locked = !1, n.observer = t, F(t, s.prototype.observer), t._event = n, n) : new s(e);
    }
    function Vt(e, t) {
      this.event = e, this.listener = t;
    }
    function $t(e, t) {
      if (!(this instanceof o))
        return new o(e, t);
      Et(e) || (t = e, e = void 0), t = t || {};
      var n = this, r = {};
      r.leafs = [], r.state = "pending", r.status = h({ value: e }), t.mode && (r.mode = t.mode), t.cancel && (r.fnCancel = t.cancel), r.promise = new o.Promise(n), Y(n, {
        _: r,
        status: r.status,
        promise: r.promise
      });
    }
    function Jt(e) {
      var t = o();
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
    function Kt(e) {
      return vt(Kt.prototype, {
        exec: function (t, n) {
          var r = e(t, n || 0);
          return arguments.length == 2 ? r : !r || r.pos != t.length ? null : r.res;
        }
      });
    }
    function Qt(e) {
      return Kt(function (t, n) {
        if (t.slice(n, n + e.length) == e)
          return {
            res: e,
            pos: n + e.length
          };
      });
    }
    function Gt(e) {
      return Kt(function (t, n) {
        var r = e.exec(t.slice(n));
        if (r && r.index == 0)
          return {
            res: r[0],
            pos: n + r[0].length
          };
      });
    }
    function Yt(e, t) {
      return Kt(function (n, r) {
        return e.exec(n, r) || {
          res: t,
          pos: r
        };
      });
    }
    function Zt(e, t) {
      return Kt(function (n, r) {
        return !t.exec(n, r) && e.exec(n, r);
      });
    }
    function en() {
      var e = [];
      for (var t = 0; t < arguments.length; t++)
        e[t - 0] = arguments[t];
      return Kt(function (t, n) {
        var r, i, s = [];
        for (r = 0; r < e.length; r++) {
          i = e[r].exec(t, n);
          if (!i)
            return;
          s.push(i.res), n = i.pos;
        }
        return {
          res: s,
          pos: n
        };
      });
    }
    function tn() {
      var e = [];
      for (var t = 0; t < arguments.length; t++)
        e[t - 0] = arguments[t];
      return Kt(function (t, n) {
        var r, i;
        for (r = 0; r < e.length && !i; r++)
          i = e[r].exec(t, n);
        return i;
      });
    }
    function nn(e) {
      return Kt(function (t, n) {
        var r, i = [];
        while (r = e.exec(t, n))
          i.push(r.res), n = r.pos;
        return {
          res: i,
          pos: n
        };
      });
    }
    function rn(e, t) {
      var n = en(t, e).select(1), r = en(e, nn(n)).then(function (e) {
          return [e[0]].concat(e[1]);
        });
      return Yt(r, []);
    }
    function sn(e, t) {
      var n = Gt(/\\./).then(function (e) {
          return e.slice(1);
        }), r = tn(n, Zt(Gt(/./), t));
      return en(e, nn(r), t).select(1).merge();
    }
    function on(e) {
      var t = u.pattern.exec(e);
      if (!t)
        throw new SyntaxError("Invalid data URL: " + e);
      return t.base64 = !!t.attributes.base64, t;
    }
    function un(e) {
      if (!(Et(e) || e && e.ast))
        throw new Error("Invalid argument: " + e);
      if (!(this instanceof a))
        return new a(e);
      var t, n;
      try {
        t = e.ast || a.pattern.exec(e);
        if (!t)
          throw void 0;
      } catch (r) {
        throw n = new SyntaxError("Invalid XML: " + e), n.reason = r, n;
      }
      var i = t.attrs || {}, s = (t.nodes || []).map(function (e) {
          return a({ ast: Et(e) ? { text: e } : e });
        }), o = function (e, t) {
          return e + t.text();
        }, u = function () {
          return t.name;
        }, f = function () {
          return t.text || s.reduce(o, "");
        };
      this.attrs = i, this.nodes = s, this.name = u, this.text = f;
    }
    function an(e) {
      return { root: a(rt(e.replace(/^<\?.+?\?>/, ""))) };
    }
    function fn(e) {
      var t = f.pattern.exec(e || "");
      if (t)
        return t;
      throw new SyntaxError("Invalid WWW-Authenticate header:\n" + e);
    }
    function ln(e, t) {
      function r() {
        var t;
        if (!n.enabled()) {
          t = N("CommandDisabled", { reason: n.enabled.reason });
          if (Dt(e))
            return o().reject(t).promise;
          throw t;
        }
        return e.apply(this, arguments);
      }
      function i() {
        return "[Command: enabled = " + n.enabled() + "]";
      }
      function s(e) {
        return ln(function () {
          return n.apply(e, arguments);
        }, n.enabled);
      }
      var n = r;
      return Y(n, {
        constructor: ln,
        enabled: t && t.asReadOnly(),
        bind: s,
        toString: i
      });
    }
    function cn(e) {
      return Y(e, {
        constructor: ln,
        toString: function () {
          return "[Command: enabled = true]";
        },
        enabled: mn(!0)
      });
    }
    function hn(e) {
      return e !== void 0 ? ln(function () {
      }, mn(!1, e)) : (l.instance || (l.instance = ln(function () {
      }, mn(!1))), l.instance);
    }
    function pn(e) {
      return e !== void 0 ? ln(Wt(function () {
      }), mn(!1, e)) : (c.instance || (c.instance = ln(Wt(function () {
      }), mn(!1))), c.instance);
    }
    function dn(e, t) {
      var n = 0;
      return function () {
        var r = !1;
        return n++, n == 1 && e && e(), {
          dispose: function () {
            if (r)
              throw N("AlreadyDisposed");
            r = !0, n--, n == 0 && t && t();
          }
        };
      };
    }
    function vn(e) {
      function s(e, n) {
        return arguments.length == 0 ? t._value : (t._write(e, n), this);
      }
      var t = s, n = e && e.get, r = e && e.set, i = e && e.readOnly;
      return e && e.value !== void 0 && (t._value = e.value), e && e.reason !== void 0 && (t.reason = e.reason), e && e.check && (t._check = e.check), n && (t._getter = Wt(n)), i && (t._ro = t), r && (t._setter = Wt(r, "sync")), e && e.subscribed && (t._subscribed = e.subscribed), e && e.unsubscribed && (t._unsubscribed = e.unsubscribed), F(t, h.prototype), Y(t, {
        get: jt(n) ? ln(t._getAsync, n.enabled) : cn(t._getAsync),
        set: i ? c() : jt(r) ? ln(t._setAsync, r.enabled) : cn(t._setAsync)
      }), Object.defineProperty(t, "changed", {
        get: t._getChanged,
        set: function (e) {
          t._getChanged(), t._changed.observer = e;
        }
      }), t;
    }
    function mn(e, t) {
      if (t === void 0) {
        if (e === null)
          return h.null;
        if (e === !0)
          return h.true;
        if (e === !1)
          return h.false;
      }
      return h({
        value: e,
        reason: t,
        readOnly: !0
      });
    }
    function gn(e, t) {
      var n = h();
      return n(e, t), n.inc = function () {
        n(n() + 1);
      }, n.dec = function () {
        n(n() - 1);
      }, n;
    }
    function yn(e, t) {
      var n = h();
      return n(e, t), n;
    }
    function bn(e) {
      function r(e) {
        return arguments.length == 0 ? t._asArray() : bt(e) ? (t.empty(), t._addArray(e), this) : t._getFromCache(e);
      }
      var t = r, n = t._ = Y({}, e);
      return e && e.get && (n.get = Wt(e.get)), n.vals = [], n.keys = [], n.idxs = {}, F(t, p.prototype), t._init(), t;
    }
    function wn(e) {
      function f(n, r) {
        t(!s[n]), t(n > e), t(xt(r)), s[n] = Wt(r);
      }
      function l(e) {
        n(e >= i(), "InvalidTargetState", {
          currentTarget: i(),
          requestedTarget: e
        });
        if (e == r())
          return;
        return e > i() && (u = o("advancing to target state " + e, { cancel: c }), i.set(e), p(u)), u.promise;
      }
      function c(e) {
        a.cancel(e), a = null;
      }
      function p(e) {
        if (a)
          return;
        var t = r() + 1;
        e.status("advancing to state " + t), a = s[t].call(null), a.then(function (n) {
          a = null, r.set(t), r() < i() ? p(e) : e.resolve(n);
        }, function (t) {
          a = null, e.reject(t);
        });
      }
      var r = h({ value: e }), i = h({ value: e }), s = {}, u, a;
      return {
        defineState: f,
        advanceTo: Wt(l),
        state: r.asReadOnly(),
        target: i.asReadOnly()
      };
    }
    function En(e, n) {
      function l() {
        t(r <= n);
        while (r < n && i.length > 0)
          c();
      }
      function c() {
        var t = i.splice(0, 1)[0], n = u[t], o = s[t];
        delete u[t], delete s[t], a.splice(0, 1), r++, f[t] = e(n), f[t].then(function (e) {
          o.resolve(e);
        }, function (e) {
          o.reject(e);
        }, o.status).then(function () {
          r--, delete f[t], l();
        });
      }
      function h(e, t) {
        var n = a.length;
        while (n > 0 && t > a[n - 1])
          n--;
        a.splice(n, 0, t), i.splice(n, 0, e);
      }
      function p(e, t) {
        var n;
        if (f[e])
          f[e].cancel(t);
        else {
          s[e].reject(t), delete u[e], delete s[e];
          for (n = 0; n < i.length; n++)
            if (i[n] == e) {
              i.splice(n, 1), a.splice(n, 1);
              break;
            }
        }
      }
      t(xt(e)), t(n > 0), e = Wt(e);
      var r = 0, i = [], s = {}, u = {}, a = [], f = {};
      return function (e, t) {
        var n = tt(), r = o("Waiting in the throttling queue.", { cancel: V(p, n) });
        return s[n] = r, u[n] = e, h(n, t), l(), r.promise;
      };
    }
    function Sn(e) {
      t(xt(e));
      var n = null;
      return function () {
        return n || (n = e());
      };
    }
    function xn(e, n) {
      function s(e, n, i) {
        t(St(e)), t(i instanceof o);
        var s = 0;
        while (s < r.length && e > r[s].priority)
          s++;
        r.splice(s, 0, {
          priority: e,
          request: n,
          task: i
        });
      }
      function u(e) {
        t(e > 0), t(r.length > 0);
        var n, i = [], s = [];
        for (n = r.length - 1; n >= 0 && i.length < e; n--)
          i.push(r[n].request), s.push(r[n].task);
        return r.splice(n + 1, e), {
          requests: i,
          tasks: s
        };
      }
      function a(e, t) {
        var n;
        for (n = 0; n < r.length; n++)
          if (r[n].task === e)
            break;
        n < r.length ? (r.splice(n, 1), e.reject(t)) : (e.cancelled = !0, e.reject(t));
      }
      function f() {
        function r(e) {
          it(t.tasks, function (t, n) {
            t.cancelled || e(t, n);
          });
        }
        var t = u(n);
        o.wait(e(t.requests)).then(function (e) {
          r(function (t, n) {
            var r = bt(e) ? e[n] : e;
            o.wait(r).then(function (e) {
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
      t(n > 0);
      var r = [], i;
      return function (e, t) {
        var n = o("Waiting in the batching queue.", {
          cancel: function (e) {
            a(n, e);
          }
        });
        return i || (i = v(function () {
          i = null;
          while (r.length > 0)
            f();
        }, 0)), s(t, e, n), n.promise;
      };
    }
    function Cn(e) {
      function n(e) {
        t(Et(e));
        var n = e.split("\r\n"), r, i, o, u;
        for (var a = 0; a < n.length; a++)
          if (u = rt(n[a]))
            r = u.indexOf(":"), r >= 0 && (i = rt(u.substr(0, r)), o = rt(u.substr(r + 1)), s(i, o));
      }
      function r(e) {
        t(yt(e));
        for (var n in e)
          s(n, e[n] + "");
      }
      function i(e) {
        return t(Nt(e)), u[e.toLowerCase()];
      }
      function s(e, n) {
        t(Nt(e)), t(Nt(n)), e = e.toLowerCase(), u[e] ? u[e] += "\n" + n : u[e] = n;
      }
      function o() {
        var e, t, n, r = "";
        for (t in u) {
          n = u[t].split("\n");
          for (e = 0; e < n.length; e++)
            n[e] && (r += t + ": " + n[e] + "\r\n");
        }
        return r + "\r\n";
      }
      var u = {};
      return Nt(e) ? n(e) : yt(e) && r(e), {
        get: i,
        add: s,
        toString: o
      };
    }
    function kn(e) {
      var t = u("data:" + e.replace(/\s/g, "") + ",");
      return {
        mimeType: t.mime,
        attributes: t.attributes
      };
    }
    function Ln(e) {
      if (!e)
        return e;
      var t = /\d+/.exec(e);
      return new g(t && +t[0]);
    }
    function An(e) {
      return e ? "/Date(" + +e + ")/" : e;
    }
    function On(e, t) {
      function n(e, t) {
        for (var n = 0; n < e.length; n++)
          if ($(t, e[n]) < 0)
            return !1;
        return !0;
      }
      return n(e, t) && n(t, e);
    }
    var e = this, t = H, n = B, r = Ft, i = zt, s = Xt, o = $t, u = on, a = un, f = fn, l = hn, c = pn, h = vn, p = bn, d = window.ttt ? ttt.window : window, v = d.setTimeout, m = d.clearTimeout, g = d.Date, y = d.Math, b = d.console, w = d.performance && d.performance.now ? function () {
        return performance.now();
      } : function () {
        return g.now();
      };
    d = null;
    var E = typeof SkypeWebTests != "undefined", S = j("async"), x = Z("Skype.Web.Utils", { replacePrototype: !0 }), T = {
        log: function () {
          if (!E)
            try {
              b.log.apply(b, arguments);
            } catch (e) {
            }
        }
      };
    t.is = function (e, n) {
      if (n instanceof RegExp)
        t(n.test(e), "DoesNotMatchPattern", {
          value: e,
          pattern: n
        });
      else if (n && !r(e, n)) {
        debugger;
        throw C(e, n);
      }
    }, t.args = function (e, t) {
      it(t, function (t, n) {
        var i = e && e[n];
        if (!r(i, t)) {
          debugger;
          throw k(n, i, t);
        }
      });
    }, n.equals = function (e, t) {
      if (e != t)
        throw L(e, t);
    }, n.state = function (e, t) {
      if (bt(t)) {
        if ($(t, e) == -1)
          throw O(e, t);
      } else if (e != t)
        throw O(e, t);
    }, n.belongs = function (e, t) {
      if (!(e in t))
        throw M(e, t);
    };
    var q = I();
    r.types = {
      String: Et,
      NotEmptyString: Nt,
      Function: xt,
      Dictionary: yt,
      Object: gt,
      Array: bt,
      Boolean: Tt,
      Void: Ct,
      Number: St
    }, i.entities = {
      lt: "<",
      gt: ">",
      amp: "&",
      nbsp: "\xA0",
      quot: "\""
    }, Y(Vt.prototype, {
      dispose: function () {
        this.event.off(this.listener);
      }
    }), s.prototype = function () {
    }, Y(s.prototype, {
      constructor: s,
      fire: function () {
        var e = this;
        if (e._enqueue(e, e._fire, arguments))
          return;
        e._fire.apply(e, arguments), e._dequeue();
      },
      _fire: function () {
        var e, t = this;
        for (e = 0; e < t._listeners.length; e++)
          t._invoke(t._listeners[e], arguments, t._modes[e]);
      },
      _invoke: function (e, t, n) {
        var r = this;
        if (n == "async" && !E)
          R.call(r, r.invoke, e, t, "sync");
        else
          try {
            e.apply(null, t);
          } catch (i) {
            if (i !== r._ie) {
              b && b.log;
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
          this._addListener(e, t), n._dequeue();
        },
        _addListener: function (e, n) {
          var r = this._event;
          t(xt(e)), r.adding && r.adding.call(r.context, e), r._listeners.push(e), r._modes.push(n), r.added && r.added.call(r.context, e), r._listeners.length == 1 && r.subscribed && r.subscribed.call(r.context);
        },
        off: function (e) {
          var t = this._event;
          if (t._enqueue(this, this._removeListener, [e]))
            return;
          this._removeListener(e), t._dequeue();
        },
        _removeListener: function (e) {
          var t = this._event, n = $(t._listeners, e);
          n >= 0 && (t._listeners.splice(n, 1), t._modes.splice(n, 1), t._listeners.length == 0 && t.unsubscribed && t.unsubscribed.call(t.context));
        }
      }
    }), Y(o.prototype, {
      resolve: function (e) {
        var t = this, r = t._;
        return n.state(r.state, "pending"), r.value = e, r.state = "resolved", r.$state && r.$state._set(r.state), r.promise.result = e, t._complete();
      },
      reject: function (e) {
        var t = this, r = t._;
        return n.state(r.state, "pending"), r.value = e, r.state = "rejected", r.$state && r.$state._set(r.state), r.promise.error = e, t._complete();
      },
      _complete: function () {
        var e = this, t = e._;
        t.status(null);
        for (var n = 0; n < t.leafs.length; n++)
          t.leafs[n]();
        return t.fnCancel = null, e;
      }
    }), o.Promise = function (e) {
      this.task = e, Object.defineProperty(this, "state", { get: this._getState }), Object.defineProperty(this, "status", { get: this._getStatus });
    }, o.Promise.prototype = vt(Jt.prototype, {
      _getState: function () {
        var e = this.task._;
        return e.$state || (e.$state = h({
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
        var t = this.task, r = t._;
        n.state(r.state, "pending"), r.fnCancel ? r.fnCancel(e) : t.reject(e);
      },
      then: function (e, t, n) {
        function f() {
          i.status.changed.off(l);
          try {
            if (i.state == "resolved")
              s = xt(e) ? e(i.value) : i.value;
            else {
              if (!xt(t)) {
                u.reject(i.value);
                return;
              }
              s = t(i.value);
            }
          } catch (n) {
            u.reject(n);
            return;
          }
          It(s) ? u.promise.from(o.wait(s)) : u.resolve(s);
        }
        function l(e, t) {
          i.state == "pending" && (u.status(e, t), xt(n) && n(e, t));
        }
        function c(e) {
          if (i.leafs.length < 2)
            i.promise.cancel(e);
          else {
            J(i.leafs, $(i.leafs, a)), i.status.changed.off(l);
            try {
              xt(t) ? u.promise.from(o.wait(t(e))) : u.reject(e);
            } catch (n) {
              u.reject(n);
            }
          }
        }
        var r = this.task, i = r._, s, u = o({ cancel: c }), a = i.mode == "sync" ? f : V(R, f);
        return i.state == "pending" ? (i.status.changed(l), i.leafs.push(a)) : a(), u.promise;
      }
    }), o.waitAny = function (e) {
      function i(t) {
        it(e, function (e) {
          try {
            e.cancel(t);
          } catch (n) {
          }
        });
      }
      var t = e.length, n = o({ cancel: i }), r = n.promise;
      return t == 1 ? r = o.wait(e[0]) : t == 0 ? n.reject(Error()) : it(e, function (r) {
        r.then(function (e) {
          t--, n && (n.resolve(e), n = null, i(N("CompetingTaskResolved")));
        }, function (e) {
          t--, t || (n.reject(e), n = null);
        }, function () {
          var t = dt(e, function (e, t) {
            return e.status() || "#" + t;
          });
          n.status(t.join(" || "));
        });
      }), r;
    }, o.waitAll = function (e) {
      function u(t) {
        for (var n = 0; n < e.length; n++)
          try {
            e[n].state() == "pending" && e[n].cancel(t);
          } catch (r) {
            debugger;
          }
      }
      function a() {
        var e = dt(s, function (e, t) {
          return e.status() || "#" + t;
        });
        r.status(ot(e).join(" && "));
      }
      var t = e.length, n = [], r = o({ cancel: u }), i = r.promise, s = {};
      return n.length = e.length, t == 0 ? r.resolve([]) : t == 1 ? i = o.wait(e[0]).then(function (e) {
        return [e];
      }) : (it(e, function (t, n) {
        s[n] = e[n] = o.wait(t);
      }), a(), it(e, function (e, i) {
        e.then(function (e) {
          n[i] = e, delete s[i], a(), t--, t || (r.resolve(n), r = null);
        }, function (e) {
          delete s[i], t--, r && (r.reject(e), r = null, u(e));
        }, a);
      })), i;
    }, o.wait = function (e, t) {
      return Pt(e) ? e : It(e) ? Jt(V.call(e, e.then)) : o({ mode: t }).resolve(e).promise;
    }, Y(Jt.prototype, {
      "catch": function (e) {
        return this.then(null, e || function () {
        });
      },
      "finally": function (e) {
        return this.then(function (t) {
          return o.wait(e()).then(function () {
            return t;
          });
        }, function (t) {
          return o.wait(e()).then(function () {
            throw t;
          });
        });
      }
    }), Y(Kt.prototype, {
      then: function (e) {
        var t = this.exec;
        return Kt(function (n, r) {
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
    }), u.encodeData = function (e) {
      return encodeURIComponent(e).replace(/%20/gm, "+");
    }, u.decodeData = function (e) {
      return decodeURIComponent(e.replace(/\+/gm, " "));
    }, u.pattern = function () {
      var e = Gt(/[^()<>@,;:\\\x22\/\[\]?=\s]+/), t = en(e, Qt("/"), e).merge(), n = Gt(/[^\uffff]*/).then(u.decodeData), r = sn(Qt("\""), Qt("\"")), i = en(Gt(/\s*=\s*/), tn(r, e)).select(1), s = en(Gt(/\s*;\s*/), e, Yt(i, !0));
      return en(Qt("data:"), Yt(t), nn(s).join(1, 2), Gt(/\s*,\s*/), n).as({
        mime: 1,
        attributes: 2,
        data: 4
      });
    }(), a.prototype.toString = function () {
      return "[object XmlNode]";
    }, a.prototype.attr = function (e) {
      return t(e in this.attrs, "Attribute does not exist: " + this.name() + "." + e), this.attrs[e];
    }, a.prototype.selectOne = function (e, n) {
      var r = st(this.nodes, xt(e) ? e : function (t) {
        var r, i;
        if (n)
          for (r in n) {
            i = r.toLowerCase();
            if (n[i] != t.attrs[i])
              return !1;
          }
        return t.name() == e.toLowerCase();
      });
      return t(r.length == 1, "Single node expected: " + e), r[0];
    }, a.pattern = function () {
      var e, t = Gt(/[\x00-\x20]*/), n = Gt(/\x22[^\x22]*\x22/).then(function (e) {
          return e.slice(1, -1);
        }), r = Gt(/[^\s<>\x22]+/), s = tn(n, r).then(i), o = Gt(/[^<]+/m).then(i), u = Gt(/[\w\d:-]+/).then(function (e) {
          return e.toLowerCase();
        }), a = en(u, Yt(en(t, Qt("="), t, s).select(3))), f = rn(a, t).join(0, 1), l = en(Qt("<"), t, u, t, f, t, Qt(">")).as({
          name: 2,
          attrs: 4
        }), c = en(Qt("<"), t, u, t, f, t, Qt("/>")).as({
          name: 2,
          attrs: 4
        }), h = en(Qt("</"), t, u, t, Qt(">")).select(2), p = Kt(function (t, n) {
          return e.exec(t, n);
        }), d = en(l, nn(tn(p, o)), h).then(function (e) {
          if (e[0].name == e[2])
            return {
              name: e[2],
              nodes: e[1],
              attrs: e[0].attrs
            };
          throw new SyntaxError("</" + e[2] + "> does not match <" + e[0].name + ">");
        });
      return e = tn(d, c);
    }(), f.pattern = function () {
      var e = Gt(/[\s,]*/), t = Gt(/[^\s,=]+/), n = sn(Qt("\""), Qt("\"")), r = en(t, Gt(/\s*=\s*/), n), i = rn(r, e).join(0, 2), s = en(t, e, i);
      return rn(s, e).join(0, 2);
    }(), h.sUpdated = {}, h.prototype = function () {
    }, Y(h.prototype, {
      constructor: h,
      toString: function () {
        return "[Property: value = " + this() + "]";
      },
      map: function (e) {
        var t = this, n, r = h({
            get: ln(function () {
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
          }, i = xt(e) ? e : function (t) {
            return t === e;
          };
        return n(s), r;
      },
      once: function (e, t) {
        return this.when(e, function () {
          this.dispose(), t.apply(null, arguments);
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
          return at(e, function (e) {
            return e == t;
          });
        });
      },
      fork: function (e) {
        var t = this, n, r = e.enabled || mn(!0), i = r === mn(!1), s = h({
            value: t(),
            reason: t.reason,
            readOnly: i,
            set: !i && ln(function (n, r) {
              return Wt(e)(n, r).then(function (e) {
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
        return e._ro || (e._ro = e.fork(c())), e._ro;
      },
      observed: function () {
        var e = this, t = e._changed;
        return t && t.observed();
      },
      subscribe: function () {
        var e = this;
        return e.subscribe = dn(e._subscribed, e._unsubscribed), e.subscribe();
      }
    }), Y(h.prototype, {
      _set: function (e, t) {
        var n = this, r = n._value, i, s = n._forks, o = n._changed;
        if (!qt(e, r) || !qt(t, n.reason)) {
          n._value = e, n.reason = t, o && o.fire(e, t, r);
          if (s)
            for (i = 0; i < s.length; i++)
              s[i]._set(e, t);
        }
        return e;
      },
      _getChanged: function () {
        var e = this;
        return e._changed || (e._changed = new s({
          context: e,
          added: e._listenerAdded
        })), e._changed.observer;
      },
      _listenerAdded: function (e) {
        var t = this, n = t._value, r = t.reason;
        n !== void 0 && e(n, r);
      },
      _getAsync: Wt(function () {
        var e = this, t = e._getter, n = e._value;
        return t ? t.call(e, n, e.reason).then(function (t) {
          return e._set(t, e.reason), e._value;
        }) : n;
      }),
      _setAsync: Wt(function (e, n) {
        var r = this, i = r._check, s = r._setter;
        return t(arguments.length > 0), i && i(e), s ? s.call(r, e, n).then(function (e) {
          return r._set(e, n);
        }) : r._set(e, n);
      }, "sync"),
      _write: function (e, t) {
        var n = this, r = n._check, i = n._setter;
        r && r(e);
        if (!n.set.enabled())
          throw Error("This is a read-only property.");
        i && t !== h.sUpdated ? i.call(n, e, t).then(function (e) {
          n._set(e, t);
        }) : n._set(e, t);
      }
    }), h.true = h({
      value: !0,
      readOnly: !0
    }), h.false = h({
      value: !1,
      readOnly: !0
    }), h.true.get.enabled = h.true, h.true.set.enabled = h.false, h.false.get.enabled = h.true, h.false.set.enabled = h.false, c.instance.enabled = h.false, h.null = h({
      value: null,
      readOnly: !0
    }), p.prototype = function () {
    }, Y(p.prototype, {
      _init: function () {
        var e = this;
        Object.defineProperties(e, {
          added: {
            enumerable: !0,
            get: e._initAddedEvent,
            set: function (t) {
              e._initAddedEvent(), e._.added.observer = t;
            }
          },
          removed: {
            enumerable: !0,
            get: e._initRemovedEvent,
            set: function (t) {
              e._initRemovedEvent(), e._.removed.observer = t;
            }
          },
          changed: {
            enumerable: !0,
            get: e._initChangedEvent,
            set: function (t) {
              e._initChangedEvent(), e._.changed.observer = t;
            }
          },
          size: {
            enumerable: !0,
            get: e._initSizeProperty,
            set: function (t) {
              e._initSizeProperty(), e._.size.observer = t;
            }
          }
        });
      },
      _initAddedEvent: function () {
        var e = this, t = e._, n = "added", r;
        return t[n] = t[n] || new s({
          context: e,
          adding: e._addedListenerAdding
        }), r = t[n].observer, r;
      },
      _addedListenerAdding: function (e) {
        var t = this, n = t._;
        it(n.vals, function (t, r) {
          e(t, n.keys[r], r);
        });
      },
      _initRemovedEvent: function () {
        var e = this, t = e._, n = "removed", r;
        return t[n] = t[n] || new s(), r = t[n].observer, r;
      },
      _initChangedEvent: function () {
        var e = this, t = e._, n = "changed", r;
        return t[n] = t[n] || new s({ added: e._changedListenerAdded }), r = t[n].observer, r;
      },
      _changedListenerAdded: function (e) {
        e();
      },
      _initSizeProperty: function () {
        var e = this, t = e._, n = "size", r;
        return t[n] = t[n] || gn(t.vals.length), r = t[n].asReadOnly(), r;
      },
      subscribe: function () {
        var e = this, t = e._;
        return e.subscribe = dn(t.subscribed, t.unsubscribed), e.subscribe();
      },
      observed: function () {
        var e = this._, t = e.added, n = e.removed, r = e.changed;
        return t && t.observed() || n && n.observed() || r && r.observed();
      },
      _insert: function (e, t, n) {
        var r, i = this._, s = i.vals.length;
        for (r = n; r < s; r++)
          i.idxs[i.keys[r]]++;
        K(i.vals, n, e), K(i.keys, n, t), i.idxs[t] = n;
      },
      add: function (e, t, n) {
        var r = this._, i = r.vals.length;
        t = t || (r.key || tt)(e);
        if (t in r.idxs)
          throw _(t);
        return n = kt(n) ? n : i, n < 0 && (n = 0), n > i && (n = i), this._insert(e, t, n), r.size && r.size.inc(), r.added && r.added.fire(e, t, n), r.changed && r.changed.fire(), t;
      },
      remove: function (e) {
        var t = this._, n, r, i;
        kt(e) ? (n = e, e = t.keys[n]) : n = t.idxs[e], r = t.vals[n];
        if (n >= 0 && n < t.vals.length) {
          for (i = n + 1; i < t.keys.length; i++)
            t.idxs[t.keys[i]]--;
          J(t.vals, n), J(t.keys, n), delete t.idxs[e], t.size && t.size.dec(), t.removed && t.removed.fire(r, e, n), t.changed && t.changed.fire();
        }
      },
      _getFromCache: function (e) {
        var t = this._;
        return Et(e) ? t.vals[t.idxs[e]] : t.vals[e];
      },
      get: function (e) {
        var t = this, n = t._.get, r = n && n().then(function (e) {
            return t._setNewItems(e);
          });
        return o.wait(r).then(function () {
          return Ct(e) ? t._asArray() : t._getFromCache(e);
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
        if (!yt(e))
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
        e.vals = [], e.keys = [], e.idxs = {}, e.size && e.size(0), e.changed && e.changed.fire();
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
        return F(e, t), e._init(), e.add = null, e.remove = null, e.empty = null, e;
      },
      fork: function (e) {
        function r(e) {
          return jt(e) ? ln(Wt(e), e.enabled) : xt(e) ? cn(Wt(e)) : c(P());
        }
        function i(e) {
          return arguments.length == 0 ? n() : n(e);
        }
        var t = i, n = this;
        return F(t, n), Y(t, {
          add: r(e.add),
          remove: r(e.remove)
        }), t._init(), t;
      },
      asWritable: function (e) {
        return this.fork(e);
      }
    }), Y(p.prototype, {
      constructor: p,
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
        function s(e, t) {
          r[t] = e, delete i[t], u();
        }
        function o(e, t) {
          i[t] = e, delete r[t], u();
        }
        function u() {
          t || (t = v(function () {
            var n = r, s = i;
            r = {}, i = {}, t = null, e(n, s);
          }, 0));
        }
        function a() {
          t && (m(t), t = null);
        }
        var t, n = this, r = {}, i = {};
        return n.added(s), n.removed(o), {
          dispose: function () {
            a(), n.added.off(s), n.removed.off(o);
          }
        };
      },
      map: function (e) {
        var t = this, n, r = p({
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
        var t = this, n, r = p({
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
          o = s + 1, u = t.size();
          while (o < u && !e(t(o)))
            o++;
          a = o < u ? r.index(t.key(o)) : r.size(), r.add(n, i, a);
        }), t.removed(function (e, t) {
          r.remove(t);
        }), r.asReadOnly();
      },
      sort: function (e) {
        function i(t, n) {
          return e(t, n) || !e(n, t);
        }
        var t = this, n, r = p({
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
    }), p.empty = p().asReadOnly();
    var Tn = function (t) {
      function r(e) {
        var t = function (t) {
          return arguments.length == 0 ? (n[e] || "") + "" : (n[e] = (t || "") + "", this);
        };
        return t.toString = function () {
          return t();
        }, t;
      }
      var n;
      if (!(e instanceof Tn))
        return new Tn(t);
      n = Tn.pattern.exec((t || "") + "");
      if (!n)
        throw new SyntaxError("Invalid URI: " + t);
      e.scheme = r("scheme"), e.user = r("user"), e.host = r("host"), e.port = r("port"), e.path = r("path"), e.query = r("query"), e.hash = r("hash");
    };
    Tn.prototype.toString = function () {
      function e(e, t) {
        return t ? e + t : "";
      }
      var t = (this.user() ? this.user() + "@" : "") + (this.host() || "") + e(":", this.port());
      return (this.scheme() ? this.scheme() + ":" : "") + e("//", t) + this.path() + e("?", this.query()) + e("#", this.hash());
    }, Tn.pattern = {
      regexp: /^(?:([a-zA-Z][\w+-.]*):)?(?:\/\/(?:([^\/@]*)@)?([^:\/?#]*)(?:\:(\d*))?)?([^?#]*)(?:\?([^#]*))?(?:#(.*))?$/,
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
    }, Tn.Query = function (e) {
      if (!(this instanceof Tn.Query))
        return new Tn.Query(e);
      var t = this;
      Et(e) ? it(e.split("&"), function (e) {
        var n, r, i = e.indexOf("=");
        i < 0 ? (n = e, r = "") : (n = e.slice(0, i), r = e.slice(i + 1)), n && (t[decodeURIComponent(n)] = decodeURIComponent(r));
      }) : e && it(mt(e), function (e, n) {
        t[n] = e + "";
      });
    }, Tn.Query.prototype.toString = function () {
      var e = [];
      return it(mt(this), function (t, n) {
        e.push(t ? encodeURIComponent(n) + "=" + encodeURIComponent(t) : encodeURIComponent(n));
      }), e.join("&");
    };
    var Nn = {
      isInfo: V(At, 100, 199),
      isSuccess: V(At, 200, 299),
      isRedirection: V(At, 300, 399),
      isClientError: V(At, 400, 499),
      isServerError: V(At, 500, 599),
      isError: V(At, 400, 599),
      Unauthorized: 401,
      ProxyAuthenticationRequired: 407,
      ExpectationFailed: 417,
      TooManyRequests: 429,
      InternalServerError: 500
    };
    try {
      return {
        isPromise: Pt,
        isCommand: jt,
        isProperty: Bt,
        isCollection: Ht,
        command: ln,
        disabledAsyncCommand: c,
        disabledCommand: l,
        enabledCommand: cn,
        event: s,
        async: Wt,
        promise: Jt,
        task: o,
        collection: p,
        property: h,
        constProperty: mn,
        boolProperty: yn,
        numProperty: gn
      };
    } catch (Mn) {
    }
  }();
  return i;
})

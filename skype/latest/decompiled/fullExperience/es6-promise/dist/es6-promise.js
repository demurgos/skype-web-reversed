function () {
  function e(e) {
    return typeof e == "function" || typeof e == "object" && e !== null;
  }
  function t(e) {
    return typeof e == "function";
  }
  function n(e) {
    return typeof e == "object" && e !== null;
  }
  function l(e) {
    a = e;
  }
  function c(e) {
    f = e;
  }
  function g() {
    var e = process.nextTick, t = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
    return Array.isArray(t) && t[1] === "0" && t[2] === "10" && (e = setImmediate), function () {
      e(x);
    };
  }
  function y() {
    return function () {
      u(x);
    };
  }
  function b() {
    var e = 0, t = new d(x), n = document.createTextNode("");
    return t.observe(n, { characterData: !0 }), function () {
      n.data = e = ++e % 2;
    };
  }
  function w() {
    var e = new MessageChannel();
    return e.port1.onmessage = x, function () {
      e.port2.postMessage(0);
    };
  }
  function E() {
    return function () {
      setTimeout(x, 1);
    };
  }
  function x() {
    for (var e = 0; e < s; e += 2) {
      var t = S[e], n = S[e + 1];
      t(n), S[e] = undefined, S[e + 1] = undefined;
    }
    s = 0;
  }
  function T() {
    try {
      var e = require, t = e("vertx");
      return u = t.runOnLoop || t.runOnContext, y();
    } catch (n) {
      return E();
    }
  }
  function C() {
  }
  function M() {
    return new TypeError("You cannot resolve a promise with itself");
  }
  function _() {
    return new TypeError("A promises callback cannot return that same promise.");
  }
  function D(e) {
    try {
      return e.then;
    } catch (t) {
      return O.error = t, O;
    }
  }
  function P(e, t, n, r) {
    try {
      e.call(t, n, r);
    } catch (i) {
      return i;
    }
  }
  function H(e, t, n) {
    f(function (e) {
      var r = !1, i = P(n, t, function (n) {
          if (r)
            return;
          r = !0, t !== n ? F(e, n) : q(e, n);
        }, function (t) {
          if (r)
            return;
          r = !0, R(e, t);
        }, "Settle: " + (e._label || " unknown promise"));
      !r && i && (r = !0, R(e, i));
    }, e);
  }
  function B(e, t) {
    t._state === L ? q(e, t._result) : t._state === A ? R(e, t._result) : U(t, undefined, function (t) {
      F(e, t);
    }, function (t) {
      R(e, t);
    });
  }
  function j(e, n) {
    if (n.constructor === e.constructor)
      B(e, n);
    else {
      var r = D(n);
      r === O ? R(e, O.error) : r === undefined ? q(e, n) : t(r) ? H(e, n, r) : q(e, n);
    }
  }
  function F(t, n) {
    t === n ? R(t, M()) : e(n) ? j(t, n) : q(t, n);
  }
  function I(e) {
    e._onerror && e._onerror(e._result), z(e);
  }
  function q(e, t) {
    if (e._state !== k)
      return;
    e._result = t, e._state = L, e._subscribers.length !== 0 && f(z, e);
  }
  function R(e, t) {
    if (e._state !== k)
      return;
    e._state = A, e._result = t, f(I, e);
  }
  function U(e, t, n, r) {
    var i = e._subscribers, s = i.length;
    e._onerror = null, i[s] = t, i[s + L] = n, i[s + A] = r, s === 0 && e._state && f(z, e);
  }
  function z(e) {
    var t = e._subscribers, n = e._state;
    if (t.length === 0)
      return;
    var r, i, s = e._result;
    for (var o = 0; o < t.length; o += 3)
      r = t[o], i = t[o + n], r ? $(n, r, i, s) : i(s);
    e._subscribers.length = 0;
  }
  function W() {
    this.error = null;
  }
  function V(e, t) {
    try {
      return e(t);
    } catch (n) {
      return X.error = n, X;
    }
  }
  function $(e, n, r, i) {
    var s = t(r), o, u, a, f;
    if (s) {
      o = V(r, i), o === X ? (f = !0, u = o.error, o = null) : a = !0;
      if (n === o) {
        R(n, _());
        return;
      }
    } else
      o = i, a = !0;
    n._state === k && (s && a ? F(n, o) : f ? R(n, u) : e === L ? q(n, o) : e === A && R(n, o));
  }
  function J(e, t) {
    try {
      t(function (n) {
        F(e, n);
      }, function (n) {
        R(e, n);
      });
    } catch (n) {
      R(e, n);
    }
  }
  function K(e, t) {
    var n = this;
    n._instanceConstructor = e, n.promise = new e(C), n._validateInput(t) ? (n._input = t, n.length = t.length, n._remaining = t.length, n._init(), n.length === 0 ? q(n.promise, n._result) : (n.length = n.length || 0, n._enumerate(), n._remaining === 0 && q(n.promise, n._result))) : R(n.promise, n._validationError());
  }
  function G(e) {
    return new Q(this, e).promise;
  }
  function Z(e) {
    function s(e) {
      F(n, e);
    }
    function o(e) {
      R(n, e);
    }
    var t = this, n = new t(C);
    if (!i(e))
      return R(n, new TypeError("You must pass an array to race.")), n;
    var r = e.length;
    for (var u = 0; n._state === k && u < r; u++)
      U(t.resolve(e[u]), undefined, s, o);
    return n;
  }
  function tt(e) {
    var t = this;
    if (e && typeof e == "object" && e.constructor === t)
      return e;
    var n = new t(C);
    return F(n, e), n;
  }
  function rt(e) {
    var t = this, n = new t(C);
    return R(n, e), n;
  }
  function ot() {
    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
  }
  function ut() {
    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
  }
  function ft(e) {
    this._id = st++, this._state = undefined, this._result = undefined, this._subscribers = [], C !== e && (t(e) || ot(), this instanceof ft || ut(), J(this, e));
  }
  function lt() {
    var e;
    if (typeof global != "undefined")
      e = global;
    else if (typeof self != "undefined")
      e = self;
    else
      try {
        e = Function("return this")();
      } catch (t) {
        throw new Error("polyfill failed because global object is unavailable in this environment");
      }
    var n = e.Promise;
    if (n && Object.prototype.toString.call(n.resolve()) === "[object Promise]" && !n.cast)
      return;
    e.Promise = at;
  }
  var r;
  Array.isArray ? r = Array.isArray : r = function (e) {
    return Object.prototype.toString.call(e) === "[object Array]";
  };
  var i = r, s = 0, o = {}.toString, u, a, f = function (t, n) {
      S[s] = t, S[s + 1] = n, s += 2, s === 2 && (a ? a(x) : N());
    }, h = typeof window != "undefined" ? window : undefined, p = h || {}, d = p.MutationObserver || p.WebKitMutationObserver, v = typeof process != "undefined" && {}.toString.call(process) === "[object process]", m = typeof Uint8ClampedArray != "undefined" && typeof importScripts != "undefined" && typeof MessageChannel != "undefined", S = new Array(1000), N;
  v ? N = g() : d ? N = b() : m ? N = w() : h === undefined && typeof require == "function" ? N = T() : N = E();
  var k = void 0, L = 1, A = 2, O = new W(), X = new W();
  K.prototype._validateInput = function (e) {
    return i(e);
  }, K.prototype._validationError = function () {
    return new Error("Array Methods must be provided an Array");
  }, K.prototype._init = function () {
    this._result = new Array(this.length);
  };
  var Q = K;
  K.prototype._enumerate = function () {
    var e = this, t = e.length, n = e.promise, r = e._input;
    for (var i = 0; n._state === k && i < t; i++)
      e._eachEntry(r[i], i);
  }, K.prototype._eachEntry = function (e, t) {
    var r = this, i = r._instanceConstructor;
    n(e) ? e.constructor === i && e._state !== k ? (e._onerror = null, r._settledAt(e._state, t, e._result)) : r._willSettleAt(i.resolve(e), t) : (r._remaining--, r._result[t] = e);
  }, K.prototype._settledAt = function (e, t, n) {
    var r = this, i = r.promise;
    i._state === k && (r._remaining--, e === A ? R(i, n) : r._result[t] = n), r._remaining === 0 && q(i, r._result);
  }, K.prototype._willSettleAt = function (e, t) {
    var n = this;
    U(e, undefined, function (e) {
      n._settledAt(L, t, e);
    }, function (e) {
      n._settledAt(A, t, e);
    });
  };
  var Y = G, et = Z, nt = tt, it = rt, st = 0, at = ft;
  ft.all = Y, ft.race = et, ft.resolve = nt, ft.reject = it, ft._setScheduler = l, ft._setAsap = c, ft._asap = f, ft.prototype = {
    constructor: ft,
    then: function (e, t) {
      var n = this, r = n._state;
      if (r === L && !e || r === A && !t)
        return this;
      var i = new this.constructor(C), s = n._result;
      if (r) {
        var o = arguments[r - 1];
        f(function () {
          $(r, i, o, s);
        });
      } else
        U(n, i, e, t);
      return i;
    },
    "catch": function (e) {
      return this.then(null, e);
    }
  };
  var ct = lt, ht = {
      Promise: at,
      polyfill: ct
    };
  typeof define == "function" && define.amd ? define("es6-promise/dist/es6-promise", [], function () {
    return ht;
  }) : typeof module != "undefined" && module.exports ? module.exports = ht : typeof this != "undefined" && (this.ES6Promise = ht), ct();
}.call(this)

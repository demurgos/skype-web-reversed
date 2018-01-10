(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/common/utils", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function n(e, t) {
    for (var n in e)
      e.hasOwnProperty(n) && t(e[n], n);
  }
  function r(e, t) {
    var n;
    return e.some(function (r, i) {
      return t(r, i, e) ? (n = r, !0) : !1;
    }), n;
  }
  function i(e, t) {
    var n;
    return e.some(function (r, i) {
      return t(r, i, e) ? (n = i, !0) : !1;
    }), n;
  }
  function s(e, t) {
    var n = !1;
    for (var r = e.length; r-- > 0;)
      t(e[r], r, e) && (e.splice(r, 1), n = !0);
    return n;
  }
  function o(e) {
    var t = [];
    for (var n in e)
      e.hasOwnProperty(n) && t.push(e[n]);
    return t;
  }
  function u(e) {
    return !Object.keys(e).length;
  }
  function a(e) {
    var t = {};
    return n(e, function (e, n) {
      t[n] = e;
    }), t;
  }
  function f(e) {
    var t;
    if (!e || typeof e != "object")
      return e;
    if (e instanceof Date)
      return t = new Date(), t.setTime(e.getTime()), t;
    if (e instanceof Array) {
      t = [];
      for (var r = 0, i = e.length; r < i; r++)
        t[r] = f(e[r]);
      return t;
    }
    if (e instanceof Object)
      return t = {}, n(e, function (e, n) {
        t[n] = f(e);
      }), t;
    throw new Error("Unable to copy: " + e);
  }
  function l() {
    function e() {
      return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
    }
    return e() + e() + e() + "4" + e().substring(1) + "b" + e().substring(1) + e() + e() + e();
  }
  function c(e, t) {
    var n, r = typeof e, i = typeof t;
    if (e === t)
      return !0;
    if (r !== i || r !== "object" && r !== "function")
      return !1;
    if (e === null || t === null)
      return e === t;
    if (e instanceof Date && t instanceof Date)
      return +e == +t;
    for (n in e)
      if (!(n in t) || !c(e[n], t[n]))
        return !1;
    for (n in t)
      if (!(n in e) || !c(e[n], t[n]))
        return !1;
    return !0;
  }
  t.__esModule = !0;
  t["default"] = {
    forOwn: n,
    find: r,
    findIndex: i,
    remove: s,
    values: o,
    isEmpty: u,
    shallowClone: a,
    deepClone: f,
    uniqueId: l,
    deepEqual: c,
    noop: Function.prototype
  };
}));

(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-chat/lib/urlValidator", [
      "require",
      "exports",
      "lodash-compat",
      "swx-constants"
    ], e);
}(function (e, t) {
  function o(e, t) {
    t === void 0 && (t = null);
    if (!e)
      return !1;
    var r = n.clone(s);
    t && n.extend(r, t);
    var i = l(e);
    return i ? !n.isEmpty(r.allowedProtocols) && !n.some(r.allowedProtocols, function (e) {
      return f(e)(i.scheme);
    }) ? !1 : !n.isEmpty(r.allowedDomains) && !n.some(r.allowedDomains, function (e) {
      return f(e)(i.host);
    }) ? !1 : !n.isEmpty(r.allowedPorts) && !n.some(r.allowedPorts, function (e) {
      return f(e)(i.port);
    }) ? !1 : !0 : !1;
  }
  function u(e) {
    return e.toString().replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }
  function a(e) {
    var t = u(e);
    return t = t.replace("\\*\\*", "[^\\/]*"), t = t.replace("\\*", "[^.\\/]*"), t = t.replace("\\?", "."), "^" + t + "$";
  }
  function f(e) {
    if (n.isUndefined(e))
      throw new Error("`undefined` is not a valid argument");
    return e === t.ALLOW_EMPTY ? n.isUndefined : n.isFunction(e) ? e : (n.isRegExp(e) || (e = new RegExp(a(e), "i")), e.test.bind(e));
  }
  function l(e) {
    e = e.toString().trim();
    var t = e.split("#", 2)[1];
    e = e.split("#", 2)[0];
    var n = i.exec(e);
    return n && {
      scheme: n[1],
      user: n[2],
      host: n[3],
      port: n[4],
      path: n[5],
      query: n[6],
      hash: t
    };
  }
  var n = e("lodash-compat"), r = e("swx-constants"), i = /^(?:([^:\/?#]+):)?(?:\/\/(?:([\S][^\/]*)(?:[\@]))?([^\/\\?:#]*)(?:\:(\d*)?)?)?([^?#]*)(?:(?:\?)([^#]*))?(?:#(.*))?/;
  t.ALLOW_EMPTY = r.COMMON.urlValidator.ALLOW_EMPTY;
  var s = {
    allowedDomains: ["**"],
    allowedProtocols: [
      t.ALLOW_EMPTY,
      "http",
      "https"
    ],
    allowedPorts: [t.ALLOW_EMPTY]
  };
  t.validate = o;
  t.$unit = {
    escapeRegExp: u,
    wildcardToRegExp: a,
    asMatcher: f,
    explodeURL: l
  };
}));

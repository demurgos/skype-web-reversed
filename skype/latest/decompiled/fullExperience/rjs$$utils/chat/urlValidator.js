define("utils/chat/urlValidator", [
  "require",
  "lodash-compat",
  "constants/common"
], function (e) {
  function s(e) {
    return e.toString().replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }
  function o(e) {
    var t = s(e);
    return t = t.replace("\\*\\*", "[^\\/]*"), t = t.replace("\\*", "[^.\\/]*"), t = t.replace("\\?", "."), "^" + t + "$";
  }
  function u(e) {
    if (t.isUndefined(e))
      throw new Error("`undefined` is not a valid argument");
    return e === n ? t.isUndefined : t.isFunction(e) ? e : (t.isRegExp(e) || (e = new RegExp(o(e), "i")), e.test.bind(e));
  }
  function a(e) {
    var t, n;
    return e = e.toString().trim(), n = e.split("#", 2)[1], e = e.split("#", 2)[0], t = i.exec(e), t && {
      scheme: t[1],
      user: t[2],
      host: t[3],
      port: t[4],
      path: t[5],
      query: t[6],
      hash: n
    };
  }
  function f(e, n) {
    var i, s;
    return e ? (i = t.extend(t.clone(r), n || {}), s = a(e), s ? !t.isEmpty(i.allowedProtocols) && !t.any(i.allowedProtocols, function (e) {
      return u(e)(s.scheme);
    }) ? !1 : !t.isEmpty(i.allowedDomains) && !t.any(i.allowedDomains, function (e) {
      return u(e)(s.host);
    }) ? !1 : !t.isEmpty(i.allowedPorts) && !t.any(i.allowedPorts, function (e) {
      return u(e)(s.port);
    }) ? !1 : !0 : !1) : !1;
  }
  var t = e("lodash-compat"), n = e("constants/common").urlValidator.ALLOW_EMPTY, r = {
      allowedDomains: ["**"],
      allowedProtocols: [
        n,
        "http",
        "https"
      ],
      allowedPorts: [n]
    }, i = /^(?:([^:\/?#]+):)?(?:\/\/(?:([\S]*)(?:[\@]))?([^\/\\?:#]*)(?:\:(\d*)?)?)?([^?#]*)(?:(?:\?)([^#]*))?(?:#(.*))?/;
  return {
    validate: f,
    ALLOW_EMPTY: n,
    $unit: {
      escapeRegExp: s,
      wildcardToRegExp: o,
      asMatcher: u,
      explodeURL: a
    }
  };
})

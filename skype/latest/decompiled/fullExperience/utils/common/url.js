define("utils/common/url", [
  "require",
  "exports",
  "module",
  "lodash-compat"
], function (e, t) {
  function r(e, t) {
    return e + n.reduce(n.pairs(t || {}), function (e, t) {
      return e ? e += "&" : e = "?", n.isUndefined(t[1]) || t[1] === null ? e += encodeURIComponent(t[0]) : e = e + encodeURIComponent(t[0]) + "=" + encodeURIComponent(t[1]), e;
    }, "");
  }
  var n = e("lodash-compat");
  t.buildUrl = r;
})

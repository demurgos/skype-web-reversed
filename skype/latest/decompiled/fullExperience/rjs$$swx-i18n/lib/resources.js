(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-i18n/lib/resources", [
      "require",
      "exports",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function i(e) {
    if (!e)
      throw new Error("[i18n / resources] Specified destination for localizations resources is not reachable");
  }
  function s(e) {
    i(e);
    r = e;
  }
  function o(e) {
    i(e);
    r = n.merge(r, e);
  }
  function u() {
    return r;
  }
  var n = e("lodash-compat"), r = {};
  t.set = s;
  t.merge = o;
  t.get = u;
}));

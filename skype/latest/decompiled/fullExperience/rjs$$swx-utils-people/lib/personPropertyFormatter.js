(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-people/lib/personPropertyFormatter", [
      "require",
      "exports",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function i(e) {
    return n.isString(e) ? e.replace(/^((\d+):)+/, "") : undefined;
  }
  function s(e, t) {
    t === void 0 && (t = r);
    t || (t = r);
    if (!e)
      return e;
    if (e.length <= t)
      return e.trim();
    var n = e.substring(0, t).lastIndexOf(" ");
    return n === -1 && (n = t), e.substring(0, n).trim();
  }
  var n = e("lodash-compat"), r = 15;
  t.getId = i;
  t.truncateDisplayName = s;
}));

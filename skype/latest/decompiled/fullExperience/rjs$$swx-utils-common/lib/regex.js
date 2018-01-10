(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-utils-common/lib/regex", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function n(e) {
    return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
  function r(e, t) {
    return new RegExp(e.join(""), t);
  }
  t.escapeSpecialChars = n;
  t.multilineRegExp = r;
}));

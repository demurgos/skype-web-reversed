function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-browser-globals/lib/globals", [
      "require",
      "exports",
      "global-portable"
    ], e);
}(function (e, t) {
  function s() {
    return r;
  }
  function o() {
    return i;
  }
  var n = e("global-portable"), r = n["default"].window, i = n["default"].document;
  t.getWindow = s, t.getDocument = o;
})

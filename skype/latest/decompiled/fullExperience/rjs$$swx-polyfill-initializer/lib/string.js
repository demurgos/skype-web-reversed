(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-polyfill-initializer/lib/string", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function n(e) {
    var t = this;
    return t < e ? -1 : t > e ? 1 : 0;
  }
  t.localeCompare = n;
}));

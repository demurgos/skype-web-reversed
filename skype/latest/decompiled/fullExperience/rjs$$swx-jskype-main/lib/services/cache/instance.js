(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/cache/instance", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function r() {
    return n;
  }
  function i(e) {
    n = e;
  }
  var n;
  t.get = r;
  t.set = i;
}));

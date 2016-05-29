(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("msr-crypto/lib/ConvertHelper", [
      "require",
      "exports"
    ], e);
}(function () {
  return function () {
    var e = {
      tryParseInt: function (t) {
        var n = parseInt(t, 10);
        return isNaN(n) ? -1 : n;
      },
      parseHexInt: function (t) {
        var n = parseInt(t, 16);
        return isNaN(n) ? 0 : n;
      }
    };
    return e;
  }();
}));

(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/searchResult", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  var n = function () {
    function e(e) {
      this.matches = {};
      this.relevance = 0;
      this.result = e;
    }
    return e;
  }();
  t.__esModule = !0;
  t["default"] = n;
}));

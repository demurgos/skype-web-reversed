(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/mediaStreamSource", [
      "require",
      "exports",
      "../../lib/models/mediaStreamSink"
    ], e);
}(function (e, t) {
  var n = e("../../lib/models/mediaStreamSink"), r = function () {
      function e() {
        this.sink = new n["default"]();
      }
      return e;
    }();
  t.__esModule = !0;
  t["default"] = r;
}));

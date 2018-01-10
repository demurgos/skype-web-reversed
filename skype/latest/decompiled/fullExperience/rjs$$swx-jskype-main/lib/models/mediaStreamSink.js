(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/mediaStreamSink", [
      "require",
      "exports",
      "jcafe-property-model"
    ], e);
}(function (e, t) {
  var n = e("jcafe-property-model"), r = function () {
      function e() {
        this.container = n.property();
      }
      return e;
    }();
  t.__esModule = !0;
  t["default"] = r;
}));

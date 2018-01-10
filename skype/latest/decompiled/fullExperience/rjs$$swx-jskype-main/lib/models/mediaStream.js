(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/mediaStream", [
      "require",
      "exports",
      "jcafe-property-model",
      "../../lib/models/mediaStreamSource",
      "swx-enums"
    ], e);
}(function (e, t) {
  var n = e("jcafe-property-model"), r = e("../../lib/models/mediaStreamSource"), i = e("swx-enums"), s = function () {
      function e() {
        this.state = n.property({
          readOnly: !0,
          value: i.mediaStreamState.Stopped
        });
        this.source = new r["default"]();
        this.width = n.property({
          readOnly: !0,
          value: 0
        });
        this.height = n.property({
          readOnly: !0,
          value: 0
        });
      }
      return e;
    }();
  t.__esModule = !0;
  t["default"] = s;
}));

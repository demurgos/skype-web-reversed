(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/device", [
      "require",
      "exports",
      "jcafe-property-model",
      "../../lib/services/calling/callingFacade"
    ], e);
}(function (e, t) {
  var n = e("jcafe-property-model"), r = e("../../lib/services/calling/callingFacade"), i = function () {
      function e(e, t, i) {
        this.name = n.property({
          get: function () {
            return r.getDeviceName(t, e);
          },
          value: e
        });
        this.id = n.property({ value: t });
        this.type = n.property({ value: i });
      }
      return e;
    }();
  t.__esModule = !0;
  t["default"] = i;
}));

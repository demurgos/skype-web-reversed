(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/statistics/mediaLegId", [
      "require",
      "exports",
      "../common/utils"
    ], e);
}(function (e, t) {
  function r() {
    var e;
    this.process = function (t) {
      return e || (e = t || n["default"].uniqueId().toUpperCase()), e;
    };
  }
  var n = e("../common/utils");
  t.__esModule = !0;
  t["default"] = {
    build: function () {
      return new r();
    }
  };
}));

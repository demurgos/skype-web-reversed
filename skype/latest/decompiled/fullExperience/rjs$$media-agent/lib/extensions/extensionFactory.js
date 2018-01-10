(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/extensions/extensionFactory", [
      "require",
      "exports",
      "./dominantSpeakerHistoryExtension",
      "./videoStreamControlExtension",
      "../constants"
    ], e);
}(function (e, t) {
  var n = e("./dominantSpeakerHistoryExtension"), r = e("./videoStreamControlExtension"), i = e("../constants"), s = function () {
      function e() {
      }
      return e.getExtension = function (e) {
        if (i["default"].EXTENSION_TYPE.dominantSpeakerHistory === e)
          return new n["default"]();
        if (i["default"].EXTENSION_TYPE.videoStreamControl === e)
          return new r["default"]();
        throw new Error("Extension of type " + e + " is not found");
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = s;
}));

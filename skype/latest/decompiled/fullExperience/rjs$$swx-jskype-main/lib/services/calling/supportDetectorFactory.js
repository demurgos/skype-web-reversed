(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/calling/supportDetectorFactory", [
      "require",
      "exports",
      "swx-util-calling-stack",
      "../../../lib/services/plugin/pluginSupportDetector",
      "../../../lib/services/pluginless/pluginlessSupportDetector",
      "../../../lib/services/outOfBrowser/outOfBrowserSupportDetector"
    ], e);
}(function (e, t) {
  function o() {
    return n.get().isPluginlessCallingSupported() ? i.build() : n.get().isInBrowserPluginSupported() ? r.build() : s.build();
  }
  var n = e("swx-util-calling-stack"), r = e("../../../lib/services/plugin/pluginSupportDetector"), i = e("../../../lib/services/pluginless/pluginlessSupportDetector"), s = e("../../../lib/services/outOfBrowser/outOfBrowserSupportDetector");
  t.buildSupportDetector = o;
}));

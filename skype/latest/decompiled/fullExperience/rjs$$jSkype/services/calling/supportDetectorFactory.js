define("jSkype/services/calling/supportDetectorFactory", [
  "require",
  "exports",
  "module",
  "utils/calling/callingStack",
  "jSkype/services/plugin/pluginSupportDetector",
  "jSkype/services/pluginless/pluginlessSupportDetector",
  "jSkype/services/outOfBrowser/outOfBrowserSupportDetector"
], function (e, t) {
  function o() {
    return n.get().isInBrowserPluginSupported() ? r.build() : s.build();
  }
  var n = e("utils/calling/callingStack"), r = e("jSkype/services/plugin/pluginSupportDetector"), i = e("jSkype/services/pluginless/pluginlessSupportDetector"), s = e("jSkype/services/outOfBrowser/outOfBrowserSupportDetector");
  t.buildSupportDetector = function () {
    return n.get().isPluginlessCallingSupported() ? i.build() : o();
  };
  t.buildPluginBasedSupportDetector = o;
});

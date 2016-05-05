define("utils/calling/callingStack", [
  "require",
  "exports",
  "module",
  "browser/detect",
  "constants/common"
], function (e, t) {
  function o() {
    function t() {
      var e = n.getBrowserInfo(), t = n.getSystemInfo();
      return e.browserName === n.BROWSERS.FIREFOX && s.featureFlags[r.featureFlags.PLUGINLESS_CALLING_FIREFOX] ? !0 : e.browserName === n.BROWSERS.CHROME && s.featureFlags[r.featureFlags.PLUGINLESS_CALLING_CHROME] ? !0 : e.browserName === n.BROWSERS.EDGE && s.featureFlags[r.featureFlags.PLUGINLESS_CALLING_EDGE] && s.pluginless.allowedEdgeVersion.lowerBound <= e.browserMajorVersion && s.pluginless.allowedEdgeVersion.upperBound >= e.browserMajorVersion ? !0 : e.browserName === n.BROWSERS.ELECTRON && s.featureFlags[r.featureFlags.PLUGINLESS_CALLING_ELECTRON] ? !0 : t.osName === n.OPERATING_SYSTEMS.LINUX && e.browserName === n.BROWSERS.CHROME && s.featureFlags[r.featureFlags.PLUGINLESS_CALLING_CHROME_LINUX] ? !0 : !1;
    }
    function i() {
      var e = n.getBrowserInfo();
      return s.featureFlags[r.featureFlags.NG_CALLING] ? e.isPluginlessCallingSupported && t() : !1;
    }
    var e = this;
    e.isPluginlessEnabledInCurrentBrowser = t, e.isPluginlessCallingSupported = i, e.isInBrowserPluginSupported = function () {
      return n.getBrowserInfo().isInBrowserPluginSupported;
    }, e.isInBrowserCallingSupported = function () {
      return n.getBrowserInfo().isInBrowserPluginSupported || i();
    }, e.isOutofBrowserCallingSupported = function () {
      return !n.getBrowserInfo().isInBrowserPluginSupported && !i();
    };
  }
  var n = e("browser/detect"), r = e("constants/common"), i, s;
  t.init = function (e) {
    s = e;
  }, t.get = function () {
    if (!s)
      throw new Error("No settings found for calling stack!");
    return i = i || new o(), i;
  };
})

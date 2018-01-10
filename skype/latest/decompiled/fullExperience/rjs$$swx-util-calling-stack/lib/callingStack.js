(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-util-calling-stack/lib/callingStack", [
      "require",
      "exports",
      "swx-browser-detect",
      "swx-constants"
    ], e);
}(function (e, t) {
  var n = e("swx-browser-detect"), r = e("swx-constants"), i = null, s = null, o = function () {
      function e() {
      }
      return e.prototype.isPluginlessEnabledInCurrentBrowser = function () {
        var e = n["default"].getBrowserInfo(), t = n["default"].getSystemInfo();
        return e.browserName === n["default"].BROWSERS.FIREFOX && s.featureFlags[r.COMMON.featureFlags.PLUGINLESS_CALLING_FIREFOX] ? !0 : e.browserName === n["default"].BROWSERS.CHROME && s.featureFlags[r.COMMON.featureFlags.PLUGINLESS_CALLING_CHROME] ? !0 : e.browserName === n["default"].BROWSERS.EDGE && s.featureFlags[r.COMMON.featureFlags.PLUGINLESS_CALLING_EDGE] && e.browserMajorVersion >= s.pluginless.allowedMinEdgeVersion ? !0 : e.browserName === n["default"].BROWSERS.ELECTRON && s.featureFlags[r.COMMON.featureFlags.PLUGINLESS_CALLING_ELECTRON] ? !0 : t.osName === n["default"].OPERATING_SYSTEMS.LINUX && e.browserName === n["default"].BROWSERS.CHROME && s.featureFlags[r.COMMON.featureFlags.PLUGINLESS_CALLING_CHROME_LINUX] ? !0 : !1;
      }, e.prototype.isPluginlessCallingSupported = function () {
        var e = n["default"].getBrowserInfo();
        return s.featureFlags[r.COMMON.featureFlags.NG_CALLING] ? e.isPluginlessCallingSupported && this.isPluginlessEnabledInCurrentBrowser() : !1;
      }, e.prototype.isInBrowserPluginSupported = function () {
        return n["default"].getBrowserInfo().isInBrowserPluginSupported;
      }, e.prototype.isInBrowserCallingSupported = function () {
        return n["default"].getBrowserInfo().isInBrowserPluginSupported || this.isPluginlessCallingSupported();
      }, e.prototype.isOutofBrowserCallingSupported = function () {
        return !n["default"].getBrowserInfo().isInBrowserPluginSupported && !this.isPluginlessCallingSupported();
      }, e.prototype.isPluginlessOnly = function () {
        var e = n["default"].getBrowserInfo(), t = n["default"].getSystemInfo();
        return e.browserName === n["default"].BROWSERS.EDGE && e.browserMajorVersion > 13 || t.osName === n["default"].OPERATING_SYSTEMS.LINUX;
      }, e;
    }();
  t.init = function (e) {
    return s = e;
  };
  t.get = function () {
    if (!s)
      throw new Error("No settings found for calling stack!");
    return i = i || new o(), i;
  };
  t.__esModule = !0;
  t["default"] = {
    get: t.get,
    init: t.init
  };
}));

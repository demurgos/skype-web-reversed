(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-client-info/lib/index", [
      "require",
      "exports",
      "jskype-settings-instance",
      "swx-browser-detect",
      "swx-constants",
      "swx-service-locator-instance"
    ], e);
}(function (e, t) {
  function o() {
    return n.settings.biAppName;
  }
  function u() {
    return n.settings.uiVersion;
  }
  function a() {
    return n.settings.countryCode;
  }
  function f() {
    var e = r["default"].getSystemInfo(), t = n.settings.lcid || "en-us", o = n.settings.countryCode || "n/a", u = "os=" + e.osName + "; osVer=" + e.osVersion + "; proc=" + e.platform + "; lcid=" + t + "; deviceType=" + e.deviceType + "; country=" + o + "; clientName=" + n.settings.biAppName + "; clientVer=" + n.settings.uiVersion, a = s["default"].resolve(i.COMMON.serviceLocator.FEATURE_FLAGS);
    return a.isFeatureOn(i.COMMON.featureFlags.TIMEZONE_IN_CHATSERVICE_REQUEST) && n.settings.utcOffset && (u += "; utcOffset=" + n.settings.utcOffset), u;
  }
  var n = e("jskype-settings-instance"), r = e("swx-browser-detect"), i = e("swx-constants"), s = e("swx-service-locator-instance");
  t.getBIAppName = o;
  t.getBIVersion = u;
  t.getCountryCode = a;
  t.getClientInfo = f;
}));

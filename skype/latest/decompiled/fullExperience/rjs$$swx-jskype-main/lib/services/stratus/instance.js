(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/stratus/instance", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "jskype-settings-instance",
      "swx-client-info",
      "swx-constants",
      "../serviceAccessLayer/decorations/reporting",
      "swx-stratus-web-service"
    ], e);
}(function (e, t) {
  function f() {
    var e;
    return a || (e = n.get().signInManager._skypeToken, a = u.build(e, {
      host: r.settings.stratusService.host,
      appName: i.getBIAppName(),
      useSkypeOnlySearch: !r.isFeatureOn(s.COMMON.featureFlags.DIRECTORY_SEARCH_SKYPE_AND_LYNC),
      decorations: [o]
    })), a;
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("jskype-settings-instance"), i = e("swx-client-info"), s = e("swx-constants"), o = e("../serviceAccessLayer/decorations/reporting"), u = e("swx-stratus-web-service"), a;
  t.get = f;
}));

(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/contactSearch/instance", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "jskype-settings-instance",
      "swx-constants",
      "../../services/serviceAccessLayer/decorations/reporting",
      "swx-contact-search-web-service"
    ], e);
}(function (e, t) {
  function a() {
    var e, t;
    return u || (e = n.get().signInManager._skypeToken, t = {
      host: r.settings.contactSearchWebService.host,
      appName: r.settings.biAppName,
      appVersion: r.settings.version,
      locale: r.settings.initParams.locale,
      includeLync: r.isFeatureOn(i.COMMON.featureFlags.DIRECTORY_SEARCH_SKYPE_AND_LYNC),
      decorations: [s]
    }, r.isFeatureOn(i.COMMON.featureFlags.GRAPH_SEARCH_MIRRORING_ENABLED) && (t.mirroringHost = r.settings.contactSearchWebService.mirroringHost), u = o.build(e, t)), u;
  }
  function f() {
    u = null;
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("jskype-settings-instance"), i = e("swx-constants"), s = e("../../services/serviceAccessLayer/decorations/reporting"), o = e("swx-contact-search-web-service"), u;
  t.get = a;
  t.reset = f;
}));

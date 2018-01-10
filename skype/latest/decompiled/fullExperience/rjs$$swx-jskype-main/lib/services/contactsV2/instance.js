(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/contactsV2/instance", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "jskype-settings-instance",
      "swx-client-info",
      "../serviceAccessLayer/decorations/reporting",
      "swx-contacts-web-service",
      "swx-constants"
    ], e);
}(function (e, t) {
  function f() {
    var e;
    return a || (e = n.get().signInManager._skypeToken, a = o.build(e, {
      host: r.settings.contactsService.host,
      appName: i.getBIAppName(),
      decorations: [s],
      pageSize: r.settings.contactsService.pageSize,
      fetchingByPageEnabled: r.isFeatureOn(u.COMMON.featureFlags.FETCH_CONTACTS_BY_PAGE)
    })), a;
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("jskype-settings-instance"), i = e("swx-client-info"), s = e("../serviceAccessLayer/decorations/reporting"), o = e("swx-contacts-web-service"), u = e("swx-constants"), a;
  t.get = f;
}));

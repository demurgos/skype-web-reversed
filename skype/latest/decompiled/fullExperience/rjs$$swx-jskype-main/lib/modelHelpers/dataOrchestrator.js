(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/dataOrchestrator", [
      "require",
      "exports",
      "../services/cache/instance",
      "./contacts/dataHandlers/contactNotification",
      "./contacts/dataHandlers/profileNotification",
      "./account/notificationHandlers",
      "./presence/presenceDataEvents",
      "./presence/presenceDataStorage",
      "./contacts/dataHandlers/rawViewCacheDataHandler",
      "swx-jskype-internal-application-instance",
      "jskype-settings-instance",
      "swx-constants",
      "./oneToOneConversationFavoritesProcessor",
      "jskype-constants/lib/data"
    ], e);
}(function (e, t) {
  function v() {
    return f.get().personsAndGroupsManager.mePerson.id.get().then(function () {
      return r.build(), s.build(), l.isFeatureOn(c.COMMON.featureFlags.PROFILE_UPDATE_NOTIFICATIONS_ENABLED) && i.build(), o.init(), f.get().conversationsManager._init(), a.restore().then(function () {
        return y().then(m, m);
      }, function () {
        return g().then(m, m).then(y, y);
      }).then(h.process);
    });
  }
  function m() {
    return f.get().personsAndGroupsManager._contactsCacheRestored(!0), f.get().personsAndGroupsManager.all.persons.get();
  }
  function g() {
    return n.get().removeItem(d.CONTACTS_RAW_VIEW_ETAG);
  }
  function y() {
    return u.restoreData();
  }
  var n = e("../services/cache/instance"), r = e("./contacts/dataHandlers/contactNotification"), i = e("./contacts/dataHandlers/profileNotification"), s = e("./account/notificationHandlers"), o = e("./presence/presenceDataEvents"), u = e("./presence/presenceDataStorage"), a = e("./contacts/dataHandlers/rawViewCacheDataHandler"), f = e("swx-jskype-internal-application-instance"), l = e("jskype-settings-instance"), c = e("swx-constants"), h = e("./oneToOneConversationFavoritesProcessor"), p = e("jskype-constants/lib/data"), d = p["default"].storageKeys;
  t.initialize = v;
}));

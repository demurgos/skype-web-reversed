(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/oneToOneConversationFavoritesProcessor", [
      "require",
      "exports",
      "lodash-compat",
      "swx-jskype-internal-application-instance",
      "../modelHelpers/contacts/groupHelper",
      "jskype-settings-instance",
      "swx-constants",
      "swx-enums"
    ], e);
}(function (e, t) {
  function f() {
    var e = [];
    return s.isFeatureOn(o.COMMON.featureFlags.FAVORITES_CONVERSATION_ENABLED) && s.isFeatureOn(o.COMMON.featureFlags.FAVORITE_CONTACTS_ENABLED) && n.forEach(r.get().conversationsManager.conversations(), function (t) {
      if (l(t)) {
        var n = t._isFavorited.set(!1, a);
        n.then(function () {
          var e = c(t);
          return i.addPersonToGroup(u.groupType.Favorites, e);
        });
        e.push(n);
      }
    }), Promise.all(e);
  }
  function l(e) {
    var t;
    return e.isGroupConversation() || !e._isFavorited || !e._isFavorited() ? !1 : (t = c(e), !!t && !i.isPersonInGroup(u.groupType.Favorites, t));
  }
  function c(e) {
    var t = e.participants();
    return t && t.length && t[0].person;
  }
  var n = e("lodash-compat"), r = e("swx-jskype-internal-application-instance"), i = e("../modelHelpers/contacts/groupHelper"), s = e("jskype-settings-instance"), o = e("swx-constants"), u = e("swx-enums"), a = !0;
  t.process = f;
}));

define("notifications/settings", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "vendor/knockout",
  "swx-constants",
  "swx-service-locator-instance",
  "swx-cafe-application-instance"
], function (e, t) {
  function h() {
    var e = this, t;
    e.value = r.observable(!1);
    e.init = function (n) {
      c && (t = p(n), e.value(d(t)));
    };
  }
  function p(e) {
    var t, r, i;
    return t = o.get().personsAndGroupsManager.mePerson, r = t.preferences(), i = n.find(r, { description: { id: e } }), i === void 0 ? void 0 : i.value();
  }
  function d(e) {
    return e === undefined ? !1 : !e;
  }
  var n = e("lodash-compat"), r = e("vendor/knockout"), i = e("swx-constants").COMMON, s = e("swx-service-locator-instance").default, o = e("swx-cafe-application-instance"), u = new h(), a = new h(), f = new h(), l = new h(), c;
  t.init = function () {
    var e = s.resolve(i.serviceLocator.FEATURE_FLAGS), t = i.userSettings.preferences;
    c = e.isFeatureOn(i.featureFlags.NOTIFICATIONS_SETTINGS_ENABLED);
    u.init(t.NOTIFICATIONS);
    a.init(t.NOTIFICATIONS_SOUND);
    f.init(t.CHAT_NOTIFICATIONS_SOUND);
    l.init(t.CALL_NOTIFICATIONS);
  };
  t.chatNotificationsMuted = u.value;
  t.notificationsSoundMuted = a.value;
  t.chatNotificationsSoundMuted = f.value;
  t.callNotificationsMuted = l.value;
});

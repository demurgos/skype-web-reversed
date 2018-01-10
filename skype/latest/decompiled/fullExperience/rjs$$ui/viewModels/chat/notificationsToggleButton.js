define("ui/viewModels/chat/notificationsToggleButton", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "notifications/settings",
  "swx-constants",
  "ui/telemetry/actions/actionNames",
  "swx-service-locator-instance",
  "swx-i18n"
], function (e, t) {
  function a(e) {
    function a(e, t) {
      var n = o.resolve(i.serviceLocator.ACTION_TELEMETRY);
      n.recordAction(e, t);
    }
    var t = this;
    t.notificationsMuted = r.chatNotificationsMuted;
    t.toggleNotificationsTitle = n.computed(function () {
      return u.fetch({ key: t.notificationsMuted() ? "turnOnChatNotifications_tooltip" : "turnOffChatNotifications_tooltip" });
    });
    t.isDisabled = e.isDisabled ? e.isDisabled : n.observable(!1);
    t.toggleNotifications = function () {
      r.chatNotificationsMuted() ? a(s.chat.notificationsEnabled) : a(s.chat.notificationsDisabled);
      r.chatNotificationsMuted(!r.chatNotificationsMuted());
    };
    t.dispose = function () {
      t.toggleNotificationsTitle.dispose();
    };
  }
  var n = e("vendor/knockout"), r = e("notifications/settings"), i = e("swx-constants").COMMON, s = e("ui/telemetry/actions/actionNames"), o = e("swx-service-locator-instance").default, u = e("swx-i18n").localization;
  t.build = function (e) {
    return new a(e);
  };
});

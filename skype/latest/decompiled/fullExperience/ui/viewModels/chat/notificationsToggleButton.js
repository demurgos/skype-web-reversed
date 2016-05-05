define("ui/viewModels/chat/notificationsToggleButton", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "notifications/settings",
  "swx-i18n"
], function (e, t) {
  function s(e) {
    var t = this;
    t.notificationsMuted = r.chatNotificationsMuted, t.toggleNotificationsTitle = n.computed(function () {
      return i.fetch({ key: t.notificationsMuted() ? "turnOnChatNotifications_tooltip" : "turnOffChatNotifications_tooltip" });
    }), t.isDisabled = e.isDisabled ? e.isDisabled : n.observable(!1), t.toggleNotifications = function () {
      r.chatNotificationsMuted(!r.chatNotificationsMuted());
    }, t.dispose = function () {
      t.toggleNotificationsTitle.dispose();
    };
  }
  var n = e("vendor/knockout"), r = e("notifications/settings"), i = e("swx-i18n").localization;
  t.build = function (e) {
    return new s(e);
  };
})

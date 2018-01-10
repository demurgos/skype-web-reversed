define("ui/contextMenu/items/mutingConversation", [
  "require",
  "exports",
  "module",
  "ui/telemetry/actions/actionNames",
  "swx-constants",
  "ui/contextMenu/menuItem",
  "swx-i18n",
  "swx-service-locator-instance"
], function (e, t) {
  function u(e) {
    return function (t) {
      function f() {
        t.chatService._updateNotificationSettings(!e);
        l();
      }
      function l() {
        var t = o.resolve(r.serviceLocator.ACTION_TELEMETRY);
        t.recordAction(e ? n.contextMenu.recents.notificationsMuted : n.contextMenu.recents.notificationsUnmuted);
      }
      this.prototype = Object.create(i.prototype);
      this.TYPE = e ? "MuteConversationMenuItem" : "UnmuteConversationMenuItem";
      var u = s.fetch({ key: e ? "recentItemMenuItem_text_muteConversation" : "recentItemMenuItem_text_unmuteConversation" }), a = o.resolve(r.serviceLocator.FEATURE_FLAGS);
      i.call(this, this.TYPE, u, f);
      this.isEnabled = function () {
        return a.isFeatureOn(r.featureFlags.MUTE_SPECIFIC_CONVERSATIONS_ENABLED) && t._notificationsEnabled() === e;
      };
    };
  }
  var n = e("ui/telemetry/actions/actionNames"), r = e("swx-constants").COMMON, i = e("ui/contextMenu/menuItem"), s = e("swx-i18n").localization, o = e("swx-service-locator-instance").default;
  t.MuteConversationMenuItem = u(!0);
  t.UnmuteConversationMenuItem = u(!1);
});

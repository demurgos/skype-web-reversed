define("ui/viewModels/chat/muteConversationSettingItem", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "utils/common/eventMixin",
  "swx-i18n",
  "swx-service-locator-instance",
  "swx-constants",
  "utils/common/eventHelper",
  "ui/telemetry/actions/actionNames"
], function (e) {
  function f(e) {
    var t = e.conversationModel, r = this, f = s.resolve(o.serviceLocator.FEATURE_FLAGS);
    r.muteConversationEnabled = n.observable(f.isFeatureOn(o.featureFlags.MUTE_SPECIFIC_CONVERSATIONS_ENABLED));
    r.muteConversationEnabled() && (r.conversationMuted = n.observable(!t._notificationsEnabled()), t._notificationsEnabled.changed(r.conversationMuted), r.isContactProfile = n.observable(!!e.contactProfile), r.muteConversationToggleAriaLabel = n.computed(function () {
      var e = r.conversationMuted() ? "header_narrator_notifications_on" : "header_narrator_notifications_off";
      return i.fetch({ key: e });
    }), r.muteConversationKeydown = function (e, t) {
      var n = u.isActivation(t);
      return n && r.muteConversationHandler(), !n;
    }, r.muteConversationHandler = function () {
      if (t.chatService._updateNotificationSettings) {
        var e = !r.conversationMuted(), n = s.resolve(o.serviceLocator.ACTION_TELEMETRY);
        n.recordAction(a.conversation.mute, { status: e });
        t.chatService._updateNotificationSettings(e);
      }
    }, r.dispose = function () {
      t._notificationsEnabled.changed.off(r.conversationMuted);
      r.muteConversationToggleAriaLabel.dispose();
    });
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("utils/common/eventMixin"), i = e("swx-i18n").localization, s = e("swx-service-locator-instance").default, o = e("swx-constants").COMMON, u = e("utils/common/eventHelper"), a = e("ui/telemetry/actions/actionNames");
  return t.assign(f.prototype, r), f;
});

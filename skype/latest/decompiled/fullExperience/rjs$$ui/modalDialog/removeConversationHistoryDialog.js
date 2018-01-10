define("ui/modalDialog/removeConversationHistoryDialog", [
  "require",
  "exports",
  "module",
  "swx-cafe-application-instance",
  "swx-i18n",
  "ui/modalDialog/confirmationDialog",
  "swx-service-locator-instance",
  "swx-constants",
  "telemetry/chat/removeConversationHistoryTelemetry",
  "text!views/chat/removeConversationHistoryDialogContent.html",
  "ui/modelHelpers/conversationHelper",
  "utils/common/accessibility"
], function (e, t) {
  function c(e) {
    this.text = d();
    this.avatar = e.avatarUrl();
    this.isGroupConversation = e.isGroupConversation();
    this.isAgentConversation = f.isOneToOneConversationWithAgent(e);
    this.topic = e.topic();
  }
  function h() {
    return s.resolve(o.serviceLocator.FEATURE_FLAGS).isFeatureOn(o.featureFlags.USE_BUSINESS_WORDING);
  }
  function p(e) {
    return e + "_4b";
  }
  function d() {
    var e = "remove_conversation_confirmation_text";
    return h() ? r.fetch({ key: p(e) }) : r.fetch({ key: e });
  }
  function v() {
    var e = "remove_conversation_confirmation_title";
    return h() ? r.fetch({ key: p(e) }) : r.fetch({ key: e });
  }
  function m() {
    var e = "action_button_delete";
    return h() ? r.fetch({ key: p(e) }) : r.fetch({ key: e });
  }
  var n = e("swx-cafe-application-instance"), r = e("swx-i18n").localization, i = e("ui/modalDialog/confirmationDialog"), s = e("swx-service-locator-instance").default, o = e("swx-constants").COMMON, u = e("telemetry/chat/removeConversationHistoryTelemetry"), a = e("text!views/chat/removeConversationHistoryDialogContent.html"), f = e("ui/modelHelpers/conversationHelper"), l = e("utils/common/accessibility").narrator;
  t.start = function (e, t) {
    function g() {
      e.historyService.removeAll.enabled() && (h.started(), l.announce({ key: "accessibility_remove_conversation_confirmation" }), e.historyService.removeAll().then(function () {
        f.conversations.remove(e).finally(function () {
          h.completed();
          var t = {
            model: e,
            page: "swx-conversation"
          };
          p.publish(o.events.navigation.FRAGMENT_REMOVE, t);
        });
      }));
    }
    function y() {
      h.canceled();
    }
    var r, f = n.get().conversationsManager, h, p, d;
    p = s.resolve(o.serviceLocator.PUBSUB);
    d = s.resolve(o.serviceLocator.FEATURE_FLAGS);
    h = u.build(t, e);
    d.isFeatureOn(o.featureFlags.DISABLE_REMOVE_CONVERSATION_CONFIRMATION) ? g() : (r = i.build({
      title: v(),
      content: a,
      contentViewModel: new c(e),
      avatar: e.avatarUrl(),
      onConfirm: g,
      onCancel: y,
      confirmButtonTitle: m()
    }), r.show());
  };
  t.canDeleteConversation = function (e) {
    var t = s.resolve(o.serviceLocator.FEATURE_FLAGS), n = t.isFeatureOn(o.featureFlags.REMOVE_CONVERSATION_HISTORY);
    return n && e.historyService.removeAll.enabled();
  };
});

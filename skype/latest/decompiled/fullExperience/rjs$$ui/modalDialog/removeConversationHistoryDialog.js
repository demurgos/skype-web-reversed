define("ui/modalDialog/removeConversationHistoryDialog", [
  "require",
  "exports",
  "module",
  "cafe/applicationInstance",
  "swx-i18n",
  "ui/modalDialog/confirmationDialog",
  "services/serviceLocator",
  "constants/common",
  "telemetry/chat/removeConversationHistoryTelemetry",
  "text!views/chat/removeConversationHistoryDialogContent.html"
], function (e, t) {
  function f(e) {
    this.text = h(), this.avatar = e.avatarUrl(), this.isGroupConversation = e.isGroupConversation();
  }
  function l() {
    return s.resolve(o.serviceLocator.FEATURE_FLAGS).isFeatureOn(o.featureFlags.USE_BUSINESS_WORDING);
  }
  function c(e) {
    return e + "_4b";
  }
  function h() {
    var e = "remove_conversation_confirmation_text";
    return l() ? r.fetch({ key: c(e) }) : r.fetch({ key: e });
  }
  function p() {
    var e = "remove_conversation_confirmation_title";
    return l() ? r.fetch({ key: c(e) }) : r.fetch({ key: e });
  }
  function d() {
    var e = "action_button_delete";
    return l() ? r.fetch({ key: c(e) }) : r.fetch({ key: e });
  }
  var n = e("cafe/applicationInstance"), r = e("swx-i18n").localization, i = e("ui/modalDialog/confirmationDialog"), s = e("services/serviceLocator"), o = e("constants/common"), u = e("telemetry/chat/removeConversationHistoryTelemetry"), a = e("text!views/chat/removeConversationHistoryDialogContent.html");
  t.start = function (e, t) {
    function v() {
      e.historyService.removeAll.enabled() && (c.started(), e.historyService.removeAll().then(function () {
        l.conversations.remove(e).finally(function () {
          c.completed();
          var t = {
            model: e,
            page: "swx-conversation"
          };
          h.publish(o.events.navigation.FRAGMENT_REMOVE, t);
        });
      }));
    }
    function m() {
      c.canceled();
    }
    var r, l = n.get().conversationsManager, c, h;
    h = s.resolve(o.serviceLocator.PUBSUB), c = u.build(t, e), r = i.build({
      title: p(),
      content: a,
      contentViewModel: new f(e),
      avatar: e.avatarUrl(),
      onConfirm: v,
      onCancel: m,
      confirmButtonTitle: d()
    }), r.show();
  }, t.canDeleteConversation = function (e) {
    var t = s.resolve(o.serviceLocator.FEATURE_FLAGS), n = t.isFeatureOn(o.featureFlags.REMOVE_CONVERSATION_HISTORY);
    return n && e.historyService.removeAll.enabled();
  };
})

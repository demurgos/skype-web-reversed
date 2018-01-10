define("ui/modalDialog/leaveConversationDialog", [
  "require",
  "exports",
  "module",
  "swx-i18n",
  "ui/modalDialog/confirmationDialog",
  "swx-constants",
  "swx-service-locator-instance",
  "telemetry/chat/leaveConversationTelemetry",
  "swx-utils-chat",
  "ui/modelHelpers/conversationHelper",
  "text!views/chat/leaveConversationDialogContent.html"
], function (e, t) {
  function l(e) {
    function t() {
      var e = "leave_conversation_confirmation_text";
      return p() ? n.fetch({ key: d(e) }) : n.fetch({ key: e });
    }
    this.text = t();
    this.avatar = e.avatarUrl();
    this.isGroupConversation = e.isGroupConversation();
    this.isAgentConversation = a.isOneToOneConversationWithAgent(e);
  }
  function c(e) {
    return e || i.telemetry.NOT_AVAILABLE;
  }
  function h(e) {
    var t = "leave_conversation_confirmation_title", r = n.fetch({ key: "conversation_header_topic_untitled_conversation" }), i = e.topic() ? u.getSanitizedTopic(e.topic()) : r;
    return p() ? n.fetch({ key: d(t) }) : n.fetch({
      key: t,
      params: { topic: i }
    });
  }
  function p() {
    return s.resolve(i.serviceLocator.FEATURE_FLAGS).isFeatureOn(i.featureFlags.USE_BUSINESS_WORDING);
  }
  function d(e) {
    return e + "_4b";
  }
  var n = e("swx-i18n").localization, r = e("ui/modalDialog/confirmationDialog"), i = e("swx-constants").COMMON, s = e("swx-service-locator-instance").default, o = e("telemetry/chat/leaveConversationTelemetry"), u = e("swx-utils-chat").messageSanitizer, a = e("ui/modelHelpers/conversationHelper"), f = e("text!views/chat/leaveConversationDialogContent.html");
  t.start = function (e, t) {
    var i, s;
    i = o.build(c(t), e);
    s = {
      title: h(e),
      content: f,
      contentViewModel: new l(e),
      confirmButtonTitle: n.fetch({ key: "action_button_leave" }),
      onConfirm: function () {
        e.leave.enabled() && (i.started(), e.leave().finally(function () {
          i.completed();
        }));
      },
      onCancel: function () {
        i.canceled();
      }
    };
    r.build(s).show();
  };
  t.canLeaveConversation = function (e) {
    var t = s.resolve(i.serviceLocator.FEATURE_FLAGS), n = !t.isFeatureOn(i.featureFlags.DISABLE_LEAVE_CONVERSATION);
    return n && e.leave.enabled();
  };
});

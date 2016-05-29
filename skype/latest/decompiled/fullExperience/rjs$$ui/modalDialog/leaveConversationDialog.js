define("ui/modalDialog/leaveConversationDialog", [
  "require",
  "exports",
  "module",
  "swx-i18n",
  "ui/modalDialog/confirmationDialog",
  "constants/common",
  "services/serviceLocator",
  "telemetry/chat/leaveConversationTelemetry",
  "utils/chat/messageSanitizer",
  "text!views/chat/leaveConversationDialogContent.html"
], function (e, t) {
  function f(e) {
    function t() {
      var e = "leave_conversation_confirmation_text";
      return h() ? n.fetch({ key: p(e) }) : n.fetch({ key: e });
    }
    this.text = t();
    this.avatar = e.avatarUrl();
    this.isGroupConversation = e.isGroupConversation();
  }
  function l(e) {
    return e || i.telemetry.NOT_AVAILABLE;
  }
  function c(e) {
    var t = "leave_conversation_confirmation_title", r = n.fetch({ key: "conversation_header_topic_untitled_conversation" }), i = e.topic() ? u.getSanitizedTopic(e.topic()) : r;
    return h() ? n.fetch({ key: p(t) }) : n.fetch({
      key: t,
      params: { topic: i }
    });
  }
  function h() {
    return s.resolve(i.serviceLocator.FEATURE_FLAGS).isFeatureOn(i.featureFlags.USE_BUSINESS_WORDING);
  }
  function p(e) {
    return e + "_4b";
  }
  var n = e("swx-i18n").localization, r = e("ui/modalDialog/confirmationDialog"), i = e("constants/common"), s = e("services/serviceLocator"), o = e("telemetry/chat/leaveConversationTelemetry"), u = e("utils/chat/messageSanitizer"), a = e("text!views/chat/leaveConversationDialogContent.html");
  t.start = function (e, t) {
    var i, s;
    i = o.build(l(t), e);
    s = {
      title: c(e),
      content: a,
      contentViewModel: new f(e),
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

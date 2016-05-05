define("telemetry/chat/messageSent", [
  "require",
  "exports",
  "module",
  "experience/settings",
  "constants/common",
  "ui/telemetry/telemetryClient",
  "telemetry/chat/telemetryEnumerator",
  "browser/window",
  "swx-enums"
], function (e, t) {
  function h(e, t, r, a) {
    function m(e) {
      return e ? c.PRESENT : c.NOT_PRESENT;
    }
    function g() {
      return y() - p;
    }
    function y() {
      return new u.Date().getTime();
    }
    function b() {
      var n = e._translatorSettings;
      return n && n.isEnabled ? n.meLanguage.code + "-" + n.participantLanguage.code : t.translations()[0].key;
    }
    function w(e) {
      switch (e) {
      case l.TextMessage:
        return "Text";
      case l.PictureMessage:
        return "Photo";
      case l.VideoMessage:
        return "Video_message";
      case l.FileTransfer:
        return "File";
      case l.ContactInfoMessage:
        return "Contact";
      case l.MojiMessage:
        return "Moji";
      case l.PollMessage:
        return "Poll";
      default:
        return f;
      }
    }
    function E() {
      return a || a === 0 ? a : t.type() !== l.TextMessage ? f : t.html().length;
    }
    var h = this, p = y(), d = !1, v = {};
    h.heartEvent = function () {
      d = !0;
    }, h.publish = function (u) {
      var a = g(), f = i.TYPE, l = e.participantsCount(), c = E(), h = t.translations && t.translations.size() > 0;
      v.group_conversation = m(e.isGroupConversation()), e.isGroupConversation() && (v.conversation_id = e.conversationId.replace("19:", "")), v.conversation_members_number = l + 1, v.send_timestamp = t.timestamp().getTime(), v.message_type = w(t.type()), v.send_context = "chat_view", d && (v.message_type = "Heart_" + v.message_type.toLowerCase()), v.translation_action = m(h), h && (v.translation_value = b()), v.swx_messageLength = c, v.swx_isRemove = c === 0, v.swx_isEdit = !!r && !v.swx_isRemove, v.swx_participantsCountGroup = o.getParticipantCountGroup(l), v.swx_responseCode = u, v.swx_isError = o.isError(u), v.swx_tts = a, v.swx_ttsGroup = o.getSecondsDurationGroupFromMs(a), v.swx_isFavorite = !!e._isFavorited && e._isFavorited(), s.get().sendEvent(n.telemetry.uiTenantToken, f, v);
    };
  }
  var n = e("experience/settings"), r = e("constants/common"), i = r.telemetry.messageSent, s = e("ui/telemetry/telemetryClient"), o = e("telemetry/chat/telemetryEnumerator"), u = e("browser/window"), a = e("swx-enums"), f = r.telemetry.NOT_AVAILABLE, l = a.activityType, c = {
      PRESENT: "Yes",
      NOT_PRESENT: "No"
    };
  t.build = function (e, t, n, r) {
    return new h(e, t, n, r);
  }, t.presenceType = c;
})

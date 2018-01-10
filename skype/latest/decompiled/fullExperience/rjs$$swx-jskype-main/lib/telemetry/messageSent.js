(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/telemetry/messageSent", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "jskype-settings-instance",
      "swx-constants",
      "swx-utils-chat",
      "swx-telemetry-buckets",
      "swx-browser-globals",
      "swx-enums"
    ], e);
}(function (e, t) {
  function v(e, t, n, r) {
    return new d(e, t, n, r);
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("jskype-settings-instance"), i = e("swx-constants"), s = e("swx-utils-chat"), o = e("swx-telemetry-buckets"), u = e("swx-browser-globals"), a = e("swx-enums"), f = i.COMMON.telemetry.messageSent, l = i.COMMON.telemetry.conversationOrigin, c = i.COMMON.telemetry.NOT_AVAILABLE, h = a.activityType, p = {
      PRESENT: "Yes",
      NOT_PRESENT: "No"
    }, d = function () {
      function e(e, t, i, s) {
        var u = this;
        this.wasLiked = !1;
        this.data = {};
        this.heartEvent = function () {
          u.wasLiked = !0;
        };
        this.publish = function (e) {
          var t = u.getTts(), i = f.TYPE, s = u.conversation.participantsCount(), a = u.getContentLength(), l = u.activityItem.translations && u.activityItem.translations.size() > 0;
          u.data.group_conversation = u.getPresence(u.conversation.isGroupConversation());
          u.conversation.isGroupConversation() && (u.data.conversation_id = u.conversation.conversationId.replace("19:", ""));
          u.data.conversation_members_number = s + 1;
          u.data.send_timestamp = u.activityItem.timestamp().getTime();
          u.data.message_type = u.getMessageType(u.activityItem.type());
          u.data.send_context = "chat_view";
          u.wasLiked && (u.data.message_type = "Heart_" + u.data.message_type.toLowerCase());
          u.data.translation_action = u.getPresence(l);
          l && (u.data.translation_value = u.getTranslationValue());
          u.data.swx_messageLength = a;
          u.data.swx_isRemove = a === 0;
          u.data.swx_isEdit = !!u.skypeeditedid && !u.data.swx_isRemove;
          u.data.swx_participantsCountGroup = o.getParticipantCountGroup(s);
          u.data.swx_responseCode = e;
          u.data.swx_isError = o.isError(e);
          u.data.swx_tts = t;
          u.data.swx_ttsGroup = o.getSecondsDurationGroupFromMs(t);
          u.data.swx_isFavorite = !!u.conversation._isFavorited && u.conversation._isFavorited();
          u.data.swx_conversationOrigin = u.getConversationOrigin(u.conversation);
          n.get()._telemetryManager.sendEvent(r.settings.telemetry.jSkypeTenantToken, i, u.data);
        };
        this.conversation = e;
        this.activityItem = t;
        this.skypeeditedid = i;
        this.contentLength = s;
        this.postStart = this.getCurrentTime();
      }
      return e.prototype.getPresence = function (e) {
        return e ? p.PRESENT : p.NOT_PRESENT;
      }, e.prototype.getTts = function () {
        return this.getCurrentTime() - this.postStart;
      }, e.prototype.getCurrentTime = function () {
        var e = u.getWindow().Date;
        return new e().getTime();
      }, e.prototype.getTranslationValue = function () {
        var e = this.conversation._translatorSettings;
        return e && e.isEnabled ? e.meLanguage.code + "-" + e.participantLanguage.code : this.activityItem.translations()[0].key;
      }, e.prototype.getConversationOrigin = function (e) {
        return s.conversation.isGuestHostConversation(e.conversationId) ? l.GUEST_HOST : l.NORMAL;
      }, e.prototype.getMessageType = function (e) {
        switch (e) {
        case h.TextMessage:
          return "Text";
        case h.PictureMessage:
          return "Photo";
        case h.VideoMessage:
          return "Video_message";
        case h.FileTransfer:
          return "File";
        case h.ContactInfoMessage:
          return "Contact";
        case h.MojiMessage:
          return "Moji";
        case h.PollMessage:
          return "Poll";
        default:
          return c;
        }
      }, e.prototype.getContentLength = function () {
        return this.contentLength || this.contentLength === 0 ? this.contentLength : this.activityItem.type() !== h.TextMessage ? c : this.activityItem.html().length;
      }, e;
    }();
  t.MessageSent = d;
  t.build = v;
  t.presenceType = p;
}));

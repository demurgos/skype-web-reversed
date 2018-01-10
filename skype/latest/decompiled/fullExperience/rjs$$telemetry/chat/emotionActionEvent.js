define("telemetry/chat/emotionActionEvent", [
  "require",
  "exports",
  "module",
  "swx-constants",
  "experience/settings",
  "swx-telemetry-buckets",
  "ui/telemetry/telemetryClient"
], function (e, t) {
  function o() {
    var e = this, t = "message_emotions_action";
    e.enums = {
      EMOTION_TYPE: { HEARTS: "hearts" },
      ACTION_TYPE: {
        SET: "set",
        UNSET: "unset"
      }
    };
    e.publish = function () {
      s.get().sendEvent(r.telemetry.chatTenantToken, t, e.data);
      e.init();
    };
    e.init = function () {
      e.data = {
        emotionType: n.telemetry.NOT_AVAILABLE,
        action: n.telemetry.NOT_AVAILABLE,
        timeDelta: n.telemetry.NOT_AVAILABLE,
        tts: n.telemetry.NOT_AVAILABLE,
        annotationsCount: n.telemetry.NOT_AVAILABLE,
        result: n.telemetry.NOT_AVAILABLE,
        participantsCount: n.telemetry.NOT_AVAILABLE,
        participantsCountGroup: n.telemetry.NOT_AVAILABLE,
        messageType: n.telemetry.NOT_AVAILABLE
      };
    };
    e.setDuration = function (t) {
      e.data.tts = t;
      e.data.timeDelta = i.getDurationGroup(t);
    };
    e.setParticipantCount = function (t) {
      e.data.participantsCount = t;
      e.data.participantsCountGroup = i.getParticipantCountGroup(t);
    };
    e.setMessageType = function (t) {
      e.data.messageType = i.getMessageType(t);
    };
    e.init();
  }
  var n = e("swx-constants").COMMON, r = e("experience/settings"), i = e("swx-telemetry-buckets"), s = e("ui/telemetry/telemetryClient");
  t.build = function () {
    return new o();
  };
});

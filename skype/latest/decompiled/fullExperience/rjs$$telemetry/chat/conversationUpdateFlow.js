define("telemetry/chat/conversationUpdateFlow", [
  "require",
  "swx-constants",
  "experience/settings",
  "services/telemetry/common/analyticsInfo",
  "services/telemetry/common/telemetryContext",
  "services/telemetry/skypeData",
  "usertiming"
], function (e) {
  function p() {
    function a() {
      e.cta = t.telemetry.NOT_AVAILABLE;
      e.failedParticipants = t.telemetry.NOT_AVAILABLE;
      e.addedParticipantsCount = 0;
      e.ttc = t.telemetry.NOT_AVAILABLE;
      e.tts = t.telemetry.NOT_AVAILABLE;
      e.conversationType = f.UNKNOWN;
      e.isSuccess = !0;
      e.isCompleted = !1;
      e.isStarted = !1;
    }
    function p() {
      for (var e in r.CONVERSATION_UPDATE)
        r.CONVERSATION_UPDATE.hasOwnProperty(e) && l.clearMarks(r.CONVERSATION_UPDATE[e]);
      for (var t in i.CONVERSATION_UPDATE)
        i.CONVERSATION_UPDATE.hasOwnProperty(t) && l.clearMeasures(i.CONVERSATION_UPDATE[t]);
    }
    function d(e, n, r) {
      l.measure(e, n, r);
      var i = l.getEntriesByName(e);
      return i && i.length > 0 ? i[0] : t.telemetry.NOT_AVAILABLE;
    }
    function v() {
      e.ttc = d(i.CONVERSATION_UPDATE.TTC, r.CONVERSATION_UPDATE.UPDATE_START, r.CONVERSATION_UPDATE.UPDATE_END);
      e.isCompleted && (e.tts = d(i.CONVERSATION_UPDATE.TTS, r.CONVERSATION_UPDATE.UPDATE_END, r.CONVERSATION_UPDATE.SYNC_END));
    }
    function m() {
      l.mark(r.CONVERSATION_UPDATE.SYNC_END);
      try {
        v();
        p();
      } catch (t) {
      }
      var i = {
        type: c,
        data: {
          stage: e.stage,
          cta: e.cta,
          contactsCount: e.contactsCount,
          originalParticipantCount: e.originalParticipantCount,
          addedParticipantsCount: e.addedParticipantsCount,
          conversationType: e.conversationType,
          failedParticipants: e.failedParticipants,
          ttc: e.ttc,
          tts: e.tts,
          ttr: "n/a",
          isSuccess: e.isSuccess
        }
      };
      u.push(i, n.telemetry.chatTenantToken);
      e.isStarted = !1;
    }
    function g(t, n) {
      e.stage = t;
      l.mark(r.CONVERSATION_UPDATE.UPDATE_END);
      n && m();
    }
    var e = this;
    e.start = function (t, n) {
      a();
      e.isStarted = !0;
      var i = new s();
      e.originalParticipantCount = t;
      e.contactsCount = i.contactsInfo().totalContacts;
      e.conversationType = n ? f.GROUP : f.DIALOG;
      l.mark(r.CONVERSATION_UPDATE.UPDATE_START);
    };
    e.abandoned = function () {
      var t;
      if (!e.isStarted || e.isCompleted)
        return;
      t = o.get();
      e.cta = t.historyLoadOrigin;
      g(h.ABANDONED, !0);
    };
    e.cancelled = function () {
      g(h.CANCELLED, !0);
    };
    e.completed = function (t) {
      e.addedParticipantsCount = t;
      e.isCompleted = !0;
      g(h.COMPLETED, !1);
    };
    e.performed = function (t) {
      e.isSuccess = t > 0;
      e.failedParticipants = t;
      m();
    };
    a();
  }
  var t = e("swx-constants").COMMON, n = e("experience/settings"), r = t.telemetry.performanceMarks, i = t.telemetry.measurements, s = e("services/telemetry/common/analyticsInfo"), o = e("services/telemetry/common/telemetryContext"), u = e("services/telemetry/skypeData"), a = t.telemetry.stages, f = t.telemetry.conversationType, l = e("usertiming"), c = "chat_conversation_update", h = a.CONVERSATION_UPDATE;
  return p;
});

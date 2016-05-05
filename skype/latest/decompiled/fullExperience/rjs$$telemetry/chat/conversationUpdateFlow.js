define("telemetry/chat/conversationUpdateFlow", [
  "require",
  "constants/common",
  "services/telemetry/common/analyticsInfo",
  "services/telemetry/common/telemetryContext",
  "services/telemetry/skypeData",
  "usertiming"
], function (e) {
  function h() {
    function u() {
      e.cta = t.telemetry.NOT_AVAILABLE, e.failedParticipants = t.telemetry.NOT_AVAILABLE, e.addedParticipantsCount = 0, e.ttc = t.telemetry.NOT_AVAILABLE, e.tts = t.telemetry.NOT_AVAILABLE, e.conversationType = a.UNKNOWN, e.isSuccess = !0, e.isCompleted = !1, e.isStarted = !1;
    }
    function h() {
      for (var e in n.CONVERSATION_UPDATE)
        n.CONVERSATION_UPDATE.hasOwnProperty(e) && f.clearMarks(n.CONVERSATION_UPDATE[e]);
      for (var t in r.CONVERSATION_UPDATE)
        r.CONVERSATION_UPDATE.hasOwnProperty(t) && f.clearMeasures(r.CONVERSATION_UPDATE[t]);
    }
    function p(e, n, r) {
      f.measure(e, n, r);
      var i = f.getEntriesByName(e);
      return i && i.length > 0 ? i[0] : t.telemetry.NOT_AVAILABLE;
    }
    function d() {
      e.ttc = p(r.CONVERSATION_UPDATE.TTC, n.CONVERSATION_UPDATE.UPDATE_START, n.CONVERSATION_UPDATE.UPDATE_END), e.isCompleted && (e.tts = p(r.CONVERSATION_UPDATE.TTS, n.CONVERSATION_UPDATE.UPDATE_END, n.CONVERSATION_UPDATE.SYNC_END));
    }
    function v() {
      f.mark(n.CONVERSATION_UPDATE.SYNC_END);
      try {
        d(), h();
      } catch (t) {
      }
      var r = {
        type: l,
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
      o.push(r), e.isStarted = !1;
    }
    function m(t, r) {
      e.stage = t, f.mark(n.CONVERSATION_UPDATE.UPDATE_END), r && v();
    }
    var e = this;
    e.start = function (t, r) {
      u(), e.isStarted = !0;
      var s = new i();
      e.originalParticipantCount = t, e.contactsCount = s.contactsInfo().totalContacts, e.conversationType = r ? a.GROUP : a.DIALOG, f.mark(n.CONVERSATION_UPDATE.UPDATE_START);
    }, e.abandoned = function () {
      var t;
      if (!e.isStarted || e.isCompleted)
        return;
      t = s.get(), e.cta = t.historyLoadOrigin, m(c.ABANDONED, !0);
    }, e.cancelled = function () {
      m(c.CANCELLED, !0);
    }, e.completed = function (t) {
      e.addedParticipantsCount = t, e.isCompleted = !0, m(c.COMPLETED, !1);
    }, e.performed = function (t) {
      e.isSuccess = t > 0, e.failedParticipants = t, v();
    }, u();
  }
  var t = e("constants/common"), n = t.telemetry.performanceMarks, r = t.telemetry.measurements, i = e("services/telemetry/common/analyticsInfo"), s = e("services/telemetry/common/telemetryContext"), o = e("services/telemetry/skypeData"), u = t.telemetry.stages, a = t.telemetry.conversationType, f = e("usertiming"), l = "chat_conversation_update", c = u.CONVERSATION_UPDATE;
  return h;
})

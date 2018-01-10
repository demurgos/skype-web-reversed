define("telemetry/chat/newConversationFlow", [
  "require",
  "swx-constants",
  "experience/settings",
  "services/telemetry/skypeData",
  "services/telemetry/common/telemetryContext",
  "services/telemetry/common/analyticsInfo",
  "usertiming"
], function (e) {
  function l() {
    function h() {
      for (var e in r.NEW_CONVERSATION)
        r.NEW_CONVERSATION.hasOwnProperty(e) && f.clearMarks(r.NEW_CONVERSATION[e]);
      for (var t in s.NEW_CONVERSATION)
        s.NEW_CONVERSATION.hasOwnProperty(t) && f.clearMeasures(s.NEW_CONVERSATION[t]);
    }
    function p() {
      try {
        var e = f.getEntriesByName(r.NEW_CONVERSATION.CREATION_END_OK).length > 0;
        if (e) {
          c = !0;
          f.measure(s.NEW_CONVERSATION.TTS, r.NEW_CONVERSATION.CREATION_START, r.NEW_CONVERSATION.CREATION_END_OK);
          return;
        }
        c = !1;
        f.measure(s.NEW_CONVERSATION.TTS, r.NEW_CONVERSATION.CREATION_START, r.NEW_CONVERSATION.CREATION_END_ERROR);
      } catch (t) {
      }
    }
    var e = i.STARTED, l = 0, c = t.telemetry.NOT_AVAILABLE;
    this.participantsCountUpdated = function (e) {
      l = e;
    };
    this.publish = function () {
      function x() {
        try {
          f.mark(r.NEW_CONVERSATION.RENDER_END);
          f.measure(s.NEW_CONVERSATION.TTC, r.NEW_CONVERSATION.FLOW_START, r.NEW_CONVERSATION.RENDER_END);
          f.measure(s.NEW_CONVERSATION.TTR, r.NEW_CONVERSATION.CREATION_START, r.NEW_CONVERSATION.RENDER_END);
          var e = f.getEntriesByName(s.NEW_CONVERSATION.TTC), t = f.getEntriesByName(s.NEW_CONVERSATION.TTR);
          e && e.length > 0 && (g = e[0].duration);
          t && t.length > 0 && (b = t[0].duration);
        } catch (n) {
        }
      }
      var d = u.get(), v = a.get(), m = v.contactsInfo(), g = t.telemetry.NOT_AVAILABLE, y = t.telemetry.NOT_AVAILABLE, b = t.telemetry.NOT_AVAILABLE, w = [
          t.telemetry.historyLoadOrigin.NEW_CHAT_OPEN_EXISTING,
          t.telemetry.historyLoadOrigin.CALLING
        ], E = w.indexOf(d.historyLoadOrigin) > -1, S = d.historyLoadOrigin === t.telemetry.historyLoadOrigin.NEW_CHAT_CREATION;
      if (E)
        e = i.REDIRECTED, x();
      else if (S) {
        e = i.CREATED;
        x();
        p();
        y = t.telemetry.NOT_AVAILABLE;
        var T = f.getEntriesByName(s.NEW_CONVERSATION.TTS);
        T && T.length && (y = T[0].duration);
      } else
        e = i.ABANDONED;
      var N = {
        type: "chat_conversation_new",
        data: {
          stage: e,
          contactsCount: m.totalContacts,
          participantsCount: l,
          CTA: d.historyLoadOrigin,
          TTC: g,
          TTS: y,
          TTR: b,
          success: c
        }
      };
      h();
      o.push(N, n.telemetry.chatTenantToken);
    };
  }
  var t = e("swx-constants").COMMON, n = e("experience/settings"), r = t.telemetry.performanceMarks, i = t.telemetry.stages.NEW_CONVERSATION, s = t.telemetry.measurements, o = e("services/telemetry/skypeData"), u = e("services/telemetry/common/telemetryContext"), a = e("services/telemetry/common/analyticsInfo"), f = e("usertiming");
  return l;
});

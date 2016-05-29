define("telemetry/chat/newConversationFlow", [
  "require",
  "constants/common",
  "services/telemetry/skypeData",
  "services/telemetry/common/telemetryContext",
  "services/telemetry/common/analyticsInfo",
  "usertiming"
], function (e) {
  function f() {
    function c() {
      for (var e in n.NEW_CONVERSATION)
        n.NEW_CONVERSATION.hasOwnProperty(e) && a.clearMarks(n.NEW_CONVERSATION[e]);
      for (var t in i.NEW_CONVERSATION)
        i.NEW_CONVERSATION.hasOwnProperty(t) && a.clearMeasures(i.NEW_CONVERSATION[t]);
    }
    function h() {
      try {
        var e = a.getEntriesByName(n.NEW_CONVERSATION.CREATION_END_OK).length > 0;
        if (e) {
          l = !0;
          a.measure(i.NEW_CONVERSATION.TTS, n.NEW_CONVERSATION.CREATION_START, n.NEW_CONVERSATION.CREATION_END_OK);
          return;
        }
        l = !1;
        a.measure(i.NEW_CONVERSATION.TTS, n.NEW_CONVERSATION.CREATION_START, n.NEW_CONVERSATION.CREATION_END_ERROR);
      } catch (t) {
      }
    }
    var e = r.STARTED, f = 0, l = t.telemetry.NOT_AVAILABLE;
    this.participantsCountUpdated = function (e) {
      f = e;
    };
    this.publish = function () {
      function S() {
        try {
          a.mark(n.NEW_CONVERSATION.RENDER_END);
          a.measure(i.NEW_CONVERSATION.TTC, n.NEW_CONVERSATION.FLOW_START, n.NEW_CONVERSATION.RENDER_END);
          a.measure(i.NEW_CONVERSATION.TTR, n.NEW_CONVERSATION.CREATION_START, n.NEW_CONVERSATION.RENDER_END);
          var e = a.getEntriesByName(i.NEW_CONVERSATION.TTC), t = a.getEntriesByName(i.NEW_CONVERSATION.TTR);
          e && e.length > 0 && (m = e[0].duration);
          t && t.length > 0 && (y = t[0].duration);
        } catch (r) {
        }
      }
      var p = o.get(), d = u.get(), v = d.contactsInfo(), m = t.telemetry.NOT_AVAILABLE, g = t.telemetry.NOT_AVAILABLE, y = t.telemetry.NOT_AVAILABLE, b = [
          t.telemetry.historyLoadOrigin.NEW_CHAT_OPEN_EXISTING,
          t.telemetry.historyLoadOrigin.CALLING
        ], w = b.indexOf(p.historyLoadOrigin) > -1, E = p.historyLoadOrigin === t.telemetry.historyLoadOrigin.NEW_CHAT_CREATION;
      if (w)
        e = r.REDIRECTED, S();
      else if (E) {
        e = r.CREATED;
        S();
        h();
        g = t.telemetry.NOT_AVAILABLE;
        var x = a.getEntriesByName(i.NEW_CONVERSATION.TTS);
        x && x.length && (g = x[0].duration);
      } else
        e = r.ABANDONED;
      var T = {
        type: "chat_conversation_new",
        data: {
          stage: e,
          contactsCount: v.totalContacts,
          participantsCount: f,
          CTA: p.historyLoadOrigin,
          TTC: m,
          TTS: g,
          TTR: y,
          success: l
        }
      };
      c();
      s.push(T);
    };
  }
  var t = e("constants/common"), n = t.telemetry.performanceMarks, r = t.telemetry.stages.NEW_CONVERSATION, i = t.telemetry.measurements, s = e("services/telemetry/skypeData"), o = e("services/telemetry/common/telemetryContext"), u = e("services/telemetry/common/analyticsInfo"), a = e("usertiming");
  return f;
});

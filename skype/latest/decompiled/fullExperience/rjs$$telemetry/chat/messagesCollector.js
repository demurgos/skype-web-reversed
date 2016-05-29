define("telemetry/chat/messagesCollector", [
  "require",
  "constants/common",
  "usertiming",
  "telemetry/chat/activityItemHelper",
  "telemetry/chat/messagesSent",
  "telemetry/chat/messagesReceived",
  "services/telemetry/common/telemetryContext",
  "utils/common/styleModeHelper"
], function (e) {
  function p() {
    function d() {
      function t() {
        h = new o();
        h.publish(e.sentMessagesInfo);
        e.sentMessagesInfo = [];
        window.setTimeout(t, l);
      }
      function n() {
        p = new u();
        p.publish(e.receivedMessagesInfo);
        e.receivedMessagesInfo = [];
        window.setTimeout(n, c);
      }
      window.setTimeout(t, l);
      window.setTimeout(n, c);
    }
    var e = a.get(), h, p, v = function (s) {
        var o = r.IM_SEND.TTS + s, u = r.IM_SEND.TTS404 + s, a = n.IM_SEND.POST_START + s, f = n.IM_SEND.POST_END_OK + s, l = n.IM_SEND.POST_END_404 + s, c = n.IM_SEND.POST_END_ERROR + s, h = i.getEntriesByName(f), p = h.length > 0;
        p ? (i.measure(o, a, f), i.clearMarks(f)) : (i.measure(o, a, c), i.clearMarks(c));
        var d = t.telemetry.NOT_AVAILABLE, v = i.getEntriesByName(o);
        v && v.length > 0 && (d = v[0].duration);
        var m = t.telemetry.NOT_AVAILABLE, g = i.getEntriesByName(l), y = g.length > 0;
        return y && (i.measure(u, a, c), i.getEntriesByName(u) && i.getEntriesByName(u).length > 0 && (m = i.getEntriesByName(u)[0].duration), i.clearMeasures(u)), i.clearMarks(a), i.clearMeasures(o), {
          cmid: s,
          tts: d,
          t404: m,
          isSuccess: p
        };
      };
    this.enqueueSentMessageInfo = function (n) {
      var r = v(n.clientmessageid);
      r.typeId = s.getTelemetryMessageTypeObsolete(n);
      e.sentMessagesInfo.push(r);
    };
    this.enqueueReceivedMessageInfo = function (n) {
      var r = { cmid: n.clientmessageid };
      r.typeId = s.getTelemetryMessageTypeObsolete(n);
      r.appIsActive = f.get().appIsVisible();
      e.receivedMessagesInfo.push(r);
    };
    d();
  }
  var t = e("constants/common"), n = t.telemetry.performanceMarks, r = t.telemetry.measurements, i = e("usertiming"), s = e("telemetry/chat/activityItemHelper"), o = e("telemetry/chat/messagesSent"), u = e("telemetry/chat/messagesReceived"), a = e("services/telemetry/common/telemetryContext"), f = e("utils/common/styleModeHelper"), l = 20000, c = 30000, h;
  return p.get = function () {
    return h || (h = new p()), h;
  }, p;
});

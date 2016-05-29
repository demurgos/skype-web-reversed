define("telemetry/chat/timelineLoad", [
  "require",
  "usertiming",
  "browser/detect",
  "constants/common",
  "experience/settings",
  "services/telemetry/common/analyticsInfo",
  "services/telemetry/common/telemetryContext",
  "telemetry/chat/telemetryEnumerator",
  "telemetry/utils/telemetryUtils",
  "ui/telemetry/telemetryClient"
], function (e) {
  function p() {
    var e = r.telemetry.NOT_AVAILABLE, p = r.telemetry.NOT_AVAILABLE, d = r.telemetry.NOT_AVAILABLE, v = function () {
        t.mark(c.TIMELINE.RENDER_END);
        var r = t.getEntriesByName(c.TIMELINE.SYNC_END_OK);
        if (r.length > 0) {
          t.measure(h.TIMELINE.TTL, c.TIMELINE.SYNC_START, c.TIMELINE.SYNC_END_OK);
          var i = t.getEntriesByName(h.TIMELINE.TTL);
          i && i.length > 0 && (e = i[0].duration);
        } else {
          t.measure(h.TIMELINE.TTL, c.TIMELINE.SYNC_START, c.TIMELINE.SYNC_END_ERROR);
          var s = t.getEntriesByName(h.TIMELINE.TTL);
          s && s.length > 0 && (e = s[0].duration);
        }
        var o = t.getEntriesByName(c.TIMELINE.SYNC_END_404), u = o.length > 0;
        if (u) {
          t.measure(h.TIMELINE.TTL404, c.TIMELINE.SYNC_START, c.TIMELINE.SYNC_END_404);
          var a = t.getEntriesByName(h.TIMELINE.TTR);
          a && a.length && (d = a[0].duration);
        }
        t.measure(h.TIMELINE.TTR, c.TIMELINE.SYNC_START, c.TIMELINE.RENDER_END);
        var f = t.getEntriesByName(h.TIMELINE.TTR);
        f && f.length > 0 && (p = f[0].duration);
      };
    this.publish = function () {
      var c = o.get(), h = s.get(), m = h.conversationsInfo(), g = h.contactsInfo();
      try {
        v();
      } catch (y) {
      }
      var b = l.TYPE, w = a.stringify({
          contactsCount: g.totalContacts,
          conv1Count: m.conversation1Count,
          conv30Count: m.conversation30Count,
          thread1Count: m.thread1Count,
          threads30Count: m.thread30Count,
          unreadCount: m.unreadConversationsCount,
          origin: c.historyLoadOrigin,
          activeEndpoints: c.activeEndpoints,
          isPinned: n.getBrowserInfo().isPinnedSite,
          ttl: e,
          ttr: p,
          t404: d,
          responseCode: c.timelineLoadStatusCode,
          contactsCountGroup: u.getContactsGroup(g.totalContacts),
          conv1CountGroup: u.getConversationCountGroup(m.conversation1Count),
          conv30CountGroup: u.getConversationCountGroup(m.conversation30Count),
          thread1CountGroup: u.getConversationCountGroup(m.thread1Count),
          thread30CountGroup: u.getConversationCountGroup(m.thread30Count),
          unreadCountGroup: u.getMessageCountGroup(m.unreadConversationsCount),
          ttlDurationGroup: u.getSecondsDurationGroupFromMs(e),
          ttrDurationGroup: u.getSecondsDurationGroupFromMs(p),
          t404DurationGroup: u.getSecondsDurationGroupFromMs(d),
          originDescription: a.getOriginDescription(c.historyLoadOrigin, r.telemetry.timelineLoadOrigin),
          isError: u.isError(c.timelineLoadStatusCode)
        });
      f.get().sendEvent(i.telemetry.uiTenantToken, b, w);
    };
  }
  var t = e("usertiming"), n = e("browser/detect"), r = e("constants/common"), i = e("experience/settings"), s = e("services/telemetry/common/analyticsInfo"), o = e("services/telemetry/common/telemetryContext"), u = e("telemetry/chat/telemetryEnumerator"), a = e("telemetry/utils/telemetryUtils"), f = e("ui/telemetry/telemetryClient"), l = r.telemetry.timelineLoadEvent, c = r.telemetry.performanceMarks, h = r.telemetry.measurements;
  return p;
});

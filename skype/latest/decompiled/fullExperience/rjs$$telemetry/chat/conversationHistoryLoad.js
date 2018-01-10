define("telemetry/chat/conversationHistoryLoad", [
  "require",
  "swx-constants",
  "experience/settings",
  "services/telemetry/skypeData",
  "services/telemetry/common/telemetryContext",
  "telemetry/utils/telemetryUtils",
  "swx-telemetry-buckets",
  "telemetry/chat/activityItemHelper"
], function (e) {
  function f(e) {
    var f = this;
    f._context = {
      timer: null,
      startTime: null,
      syncEndTime: null,
      renderEndTime: null,
      SYNC_TIMEOUT: 10000,
      conversationLoaded: e,
      pageNumber: 0,
      isUnread: 0,
      hasError: !1,
      isCached: t.telemetry.NOT_AVAILABLE,
      timeInStale: t.telemetry.NOT_AVAILABLE
    };
    (function () {
      var n = e.historyService.activityItems(), r = n[n.length - 1];
      f._context.isUnread = !1;
      if (!r)
        return;
      f._context.isUnread = !r.isRead();
      f._context.timeInStale = 0;
      if (f._context.isUnread) {
        var i = +new Date();
        f._context.timeInStale = (i - r.timestamp()) / 1000;
      }
    }());
    f.start = function () {
      f._context.startTime = new Date().getTime();
      f._context.timer = setTimeout(f.publish, f._context.SYNC_TIMEOUT);
    };
    f.registerSync = function () {
      f._context.timer || (f._context.pageNumber++, f.start());
      f._context.syncEndTime = new Date().getTime();
      f._context.renderEndTime = f._context.syncEndTime;
    };
    f.registerRender = function () {
      f._context.renderEndTime = new Date().getTime();
    };
    f.registerError = function () {
      f._context.hasError = !0;
      f._context.syncEndTime = new Date().getTime();
      f.publish();
    };
    f.dispose = function () {
      f._context.conversationLoaded = null;
    };
    f.publish = function () {
      f._context.timer && (clearTimeout(f._context.timer), f._context.timer = null);
      var l = u.processConversation(e), c = i.get(), h = a.TYPE, p, d = c.chatHistoryLoadResult[e.conversationId];
      return l.participantsCount = e.participants().length, l.participantsCountGroup = o.getParticipantCountGroup(e.participants().length), l.isFavorite = !!e._isFavorited && e._isFavorited(), l.ttl = f._context.syncEndTime - f._context.startTime, l.ttlDurationGroup = o.getSecondsDurationGroupFromMs(l.ttl), l.tis = f._context.timeInStale, l.isUnread = f._context.isUnread, l.pageNumber = f._context.pageNumber, l.responseCode = d, f._context.hasError ? l.ttr = t.telemetry.NOT_AVAILABLE : l.ttr = f._context.renderEndTime - f._context.startTime, l.ttrDurationGroup = o.getSecondsDurationGroupFromMs(l.ttr), l.origin = c.historyLoadOrigin, l.originDescription = s.getOriginDescription(c.historyLoadOrigin, t.telemetry.historyLoadOrigin), l.t404 = c.isChatHistoryLoad404, l.isError = o.isError(d), p = {
        type: h,
        data: l
      }, r.push(p, n.telemetry.uiTenantToken), f.dispose(), l;
    };
  }
  var t = e("swx-constants").COMMON, n = e("experience/settings"), r = e("services/telemetry/skypeData"), i = e("services/telemetry/common/telemetryContext"), s = e("telemetry/utils/telemetryUtils"), o = e("swx-telemetry-buckets"), u = e("telemetry/chat/activityItemHelper"), a = t.telemetry.conversationHistoryLoadEvent;
  return f;
});

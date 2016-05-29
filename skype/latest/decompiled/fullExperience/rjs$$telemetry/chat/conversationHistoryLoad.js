define("telemetry/chat/conversationHistoryLoad", [
  "require",
  "constants/common",
  "services/telemetry/skypeData",
  "services/telemetry/common/telemetryContext",
  "telemetry/utils/telemetryUtils",
  "telemetry/chat/telemetryEnumerator",
  "telemetry/chat/activityItemHelper"
], function (e) {
  function a(e) {
    var a = this;
    a._context = {
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
      a._context.isUnread = !1;
      if (!r)
        return;
      a._context.isUnread = !r.isRead();
      a._context.timeInStale = 0;
      if (a._context.isUnread) {
        var i = +new Date();
        a._context.timeInStale = (i - r.timestamp()) / 1000;
      }
    }());
    a.start = function () {
      a._context.startTime = new Date().getTime();
      a._context.timer = setTimeout(a.publish, a._context.SYNC_TIMEOUT);
    };
    a.registerSync = function () {
      a._context.timer || (a._context.pageNumber++, a.start());
      a._context.syncEndTime = new Date().getTime();
      a._context.renderEndTime = a._context.syncEndTime;
    };
    a.registerRender = function () {
      a._context.renderEndTime = new Date().getTime();
    };
    a.registerError = function () {
      a._context.hasError = !0;
      a._context.syncEndTime = new Date().getTime();
      a.publish();
    };
    a.dispose = function () {
      a._context.conversationLoaded = null;
    };
    a.publish = function () {
      a._context.timer && (clearTimeout(a._context.timer), a._context.timer = null);
      var f = o.processConversation(e), l = r.get(), c = u.TYPE, h, p = l.chatHistoryLoadResult[e.conversationId];
      return f.participantsCount = e.participants().length, f.participantsCountGroup = s.getParticipantCountGroup(e.participants().length), f.isFavorite = !!e._isFavorited && e._isFavorited(), f.ttl = a._context.syncEndTime - a._context.startTime, f.ttlDurationGroup = s.getSecondsDurationGroupFromMs(f.ttl), f.tis = a._context.timeInStale, f.isUnread = a._context.isUnread, f.pageNumber = a._context.pageNumber, f.responseCode = p, a._context.hasError ? f.ttr = t.telemetry.NOT_AVAILABLE : f.ttr = a._context.renderEndTime - a._context.startTime, f.ttrDurationGroup = s.getSecondsDurationGroupFromMs(f.ttr), f.origin = l.historyLoadOrigin, f.originDescription = i.getOriginDescription(l.historyLoadOrigin, t.telemetry.historyLoadOrigin), f.t404 = l.isChatHistoryLoad404, f.isError = s.isError(p), h = {
        type: c,
        data: f
      }, n.push(h), a.dispose(), f;
    };
  }
  var t = e("constants/common"), n = e("services/telemetry/skypeData"), r = e("services/telemetry/common/telemetryContext"), i = e("telemetry/utils/telemetryUtils"), s = e("telemetry/chat/telemetryEnumerator"), o = e("telemetry/chat/activityItemHelper"), u = t.telemetry.conversationHistoryLoadEvent;
  return a;
});

define("ui/viewModels/chat/conversationProcessor", [
  "require",
  "lodash-compat",
  "swx-utils-chat",
  "swx-constants"
], function (e) {
  var t = e("lodash-compat"), n = e("swx-utils-chat").dateTime, r = e("swx-constants").COMMON, i = 300000, s = function (e) {
      return n.getMidnight(e);
    }, o = function (e, t) {
      return t === undefined ? !0 : e !== t;
    }, u = function (e, t) {
      return s(t) !== s(e);
    }, a = function (e, t, n) {
      var r = e > t, s = e - n;
      return r && s >= i;
    }, f = function (e) {
      if (e && e.isMeCommandMessage)
        return !1;
      if (e && t.isFunction(e.group))
        switch (e.group()) {
        case r.activityItemGroups.TEXT:
        case r.activityItemGroups.MEDIA:
        case r.activityItemGroups.CONTACT_INFO:
        case r.activityItemGroups.POLL:
        case r.activityItemGroups.TRANSCRIPT:
        case r.activityItemGroups.CALL:
        case r.activityItemGroups.PSTN:
          return !0;
        }
      return !1;
    }, l = function (e) {
      return !!(e && e.messageDeliveryStatusEnabled && e.deliveryFailed());
    }, c = function (e) {
      return !!e && !!(e.playerId || t.isFunction(e.group) && e.group() === r.activityItemGroups.MEDIA);
    };
  return function () {
    this.processMessage = function (e, t) {
      var i = e.group() === r.activityItemGroups.TEXT, h = e.group() === r.activityItemGroups.MEDIA, p = e.group() === r.activityItemGroups.CONTACT_INFO, d = e.group() === r.activityItemGroups.CALL, v = e.group() === r.activityItemGroups.POLL, m = e.group() === r.activityItemGroups.PSTN, g = e.group() === r.activityItemGroups.PARTICIPANT, y = e.group() === r.activityItemGroups.TRANSCRIPT, b = i || h || p || v || y, w = f(e), E = d || h || m, S = e.author && e.author.id(), x = o(t.previousAuthor, S), T = t.midnight || s(new Date().getTime()), N = u(t.previousTimestamp, e.timestamp), C = E || x || N || c(e) || a(e.timestamp, T, t.lastShowedTimestamp), k = x || N || g || c(t.previousMessage), L = !e.isMyself, A = b && (x || !!t.suppressedLastAuthor), O = w && (C || !!t.suppressedLastTimestamp), M = n.formatTimestamp(e.timestamp, T), _ = n.formatTimestampLong(e.timestamp, T), D = n.formatTimestampForceLong(e.timestamp), P = t.previousMessage && O && !A && !t.previousMessage.showTimestamp() || g, H = f(t.previousMessage) && k && !l(t.previousMessage);
      return e.isFirstMessage(b && (e.isDisjoined || t.previousIsDisjoined || A)), e.isLastMessage(!0), e.showAuthorInfo(L && e.isFirstMessage()), e.showTimestamp(O), e.setTimestamp(M), e.showBottomTimestamp(w && !l(e)), e.setBottomTimestamp(_), e.setLongTimestamp(D), O && (t.lastShowedTimestamp = e.timestamp), t.previousMessage && (t.previousMessage.isLastMessageInBubble(P), t.previousMessage.showBottomTimestamp(H)), t.previousAuthor = S, t.previousTimestamp = e.timestamp, t.suppressedLastAuthor = !b, t.suppressedLastTimestamp = !w || h, t.midnight = T, t.previousIsDisjoined = e.isDisjoined, t.previousMessage = e, t;
    };
    this.processMyLastMessageIfAny = function (e) {
      var t;
      if (e.length <= 0)
        return;
      for (t = e.length - 1; t >= 0; t--)
        if (e[t].isMyself) {
          e[t].isMyLastMessageInChat(!0);
          e[t].showBottomTimestamp(!e[t].messageDeliveryStatusEnabled && e[t].showBottomTimestamp());
          return;
        }
    };
    this.processMyBeforeLastMessageIfAny = function (e) {
      var t, n = !1;
      if (e.length <= 1)
        return;
      for (t = e.length - 1; t >= 0; t--) {
        if (!e[t].isMyself || !e[t].isMyLastMessageInChat())
          continue;
        if (!!n) {
          e[t].isMyLastMessageInChat(!1);
          return;
        }
        n = !0;
      }
    };
  };
});

define("ui/viewModels/chat/conversationProcessor", [
  "require",
  "utils/chat/dateTime",
  "constants/common"
], function (e) {
  var t = e("utils/chat/dateTime"), n = e("constants/common"), r = 300000, i = function (e) {
      return t.getMidnight(e);
    }, s = function (e, t) {
      return t === undefined ? !0 : e !== t;
    }, o = function (e, t) {
      return i(t) !== i(e);
    }, u = function (e, t, n) {
      var i = e > t, s = e - n;
      return i && s >= r;
    };
  return function () {
    this.processMessage = function (e, r) {
      var a = e.group() === n.activityItemGroups.TEXT, f = e.group() === n.activityItemGroups.MEDIA, l = e.group() === n.activityItemGroups.CONTACT_INFO, c = e.group() === n.activityItemGroups.CALL, h = e.group() === n.activityItemGroups.POLL, p = e.group() === n.activityItemGroups.PSTN, d = e.group() === n.activityItemGroups.PARTICIPANT, v = a || f || l || h, m = v || c || p, g = c || f || p, y = e.author && e.author.id(), b = s(r.previousAuthor, y), w = r.midnight || i(new Date().getTime()), E = o(r.previousTimestamp, e.timestamp), S = e.playerId || f, x = g || b || E || S || u(e.timestamp, w, r.lastShowedTimestamp), T = !e.isMyself, N = v && (b || !!r.suppressedLastAuthor), C = m && (x || !!r.suppressedLastTimestamp), k = t.formatTimestamp(e.timestamp, w), L = r.previousMessage && C && !N && !r.previousMessage.showTimestamp() || d;
      return e.isFirstMessage(e.isDisjoined || r.previousIsDisjoined || N), e.isLastMessage(!0), e.showAuthorInfo(T && e.isFirstMessage()), e.showTimestamp(C), e.setTimestamp(k), C && (r.lastShowedTimestamp = e.timestamp), r.previousIsLastMessage && r.previousIsLastMessage(e.isFirstMessage()), r.previousMessage && r.previousMessage.isLastMessageInBubble(L), r.previousAuthor = y, r.previousTimestamp = e.timestamp, r.suppressedLastAuthor = !v, r.suppressedLastTimestamp = !m || f, r.midnight = w, r.previousIsLastMessage = e.isLastMessage, r.previousIsDisjoined = e.isDisjoined, r.previousMessage = e, r;
    }, this.processMyLastMessageIfAny = function (e) {
      var t;
      if (e.length <= 0)
        return;
      for (t = e.length - 1; t >= 0; t--)
        if (e[t].isMyself) {
          e[t].isMyLastMessageInChat(!0);
          return;
        }
    }, this.processMyBeforeLastMessageIfAny = function (e) {
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
})

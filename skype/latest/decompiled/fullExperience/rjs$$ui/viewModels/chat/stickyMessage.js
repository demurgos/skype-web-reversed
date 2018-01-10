define("ui/viewModels/chat/stickyMessage", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "utils/common/eventMixin",
  "swx-constants",
  "swx-enums",
  "telemetry/chat/poll",
  "swx-i18n"
], function (e) {
  function p(e, r) {
    var a = this, f = r.conversationModel, p, d, v, m, g = [], y = function () {
        var e = h(g), t = !0;
        a.latestPoll() !== e && (a.latestPoll(e), a.latestPoll() ? a.showStickyMessageData({
          isActive: !0,
          isVisible: t
        }) : a.showStickyMessageData(null));
      };
    a.latestPoll = n.observable(null);
    a.pollQuestion = n.observable();
    a.pollAuthor = n.observable();
    a.statsMessageText = n.observable();
    a.ongoingPoll = n.pureComputed(function () {
      return u.fetch({
        key: "poll_sticky_message_new_poll",
        params: { author: a.pollAuthor() }
      });
    });
    a.showStickyMessageData = n.observable({
      isVisible: !1,
      isActive: !1
    });
    a.showStickyMessage = n.observable(!1);
    a.showStickyMessageData.subscribe(function (e) {
      a.showStickyMessage(e !== null && e.isActive && !e.isVisible);
    });
    v = a.latestPoll.subscribe(function (e) {
      if (!e)
        return;
      m && m.dispose();
      a.pollQuestion(e.pollQuestion());
      a.pollAuthor(e.sender.firstName());
      a.statsMessageText(l(e));
      m = e.poll.changed(function () {
        a.statsMessageText(l(e));
      });
    });
    p = f.historyService.activityItems.added(function (e) {
      e.type() === s.activityType.PollMessage && (g.push(e), y());
    });
    d = f.historyService.activityItems.removed(function (e) {
      e.type() === s.activityType.PollMessage && (g = t.reject(g, function (t) {
        return t.key() === e.key();
      }), y());
    });
    a.scrollToPoll = function () {
      o.stickyMessageClicked(a.latestPoll());
      e.scrollToLastPollElement();
    };
    a.dispose = function () {
      v.dispose();
      p.dispose();
      d.dispose();
      a.ongoingPoll.dispose();
      m && m.dispose();
    };
    a.init = function () {
      a.registerEvent(i.events.conversation.VIEWPORT_CHANGED, function (t) {
        var n, r;
        a.latestPoll() && (n = c(a.latestPoll()), r = e.checkPollIsVisible(a.latestPoll(), t), a.showStickyMessageData({
          isActive: n,
          isVisible: r
        }));
      });
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("utils/common/eventMixin"), i = e("swx-constants").COMMON, s = e("swx-enums"), o = e("telemetry/chat/poll"), u = e("swx-i18n").localization, a = 1800, f = 86400, l = function (e) {
      var n = e.meCheckedAnswerPositions(), r = t.isEmpty(n) ? -1 : n[0], i = e.pollAnswers(), s;
      return i && r >= 0 && r < i.length ? s = u.fetch({
        key: "poll_sticky_message_me_voted",
        params: { answerText: i[r].answerText }
      }) : s = u.fetch({ key: "poll_sticky_message_me_not_voted" }), s + " \xB7 " + u.fetch({
        key: "poll_message_people_voted",
        params: { count: e.peopleVotedNum() }
      });
    }, c = function (e) {
      if (!e)
        return !1;
      var n = a;
      return t.isEmpty(e.meCheckedAnswerPositions()) && (n = f), t.now() - e.timestamp().getTime() < n * 1000;
    }, h = function (e) {
      var n = t.filter(e, function (e) {
        return c(e);
      });
      return n.length === 0 ? null : n.sort(function (e, t) {
        return t.timestamp() - e.timestamp();
      })[0];
    };
  return t.assign(p.prototype, r), p;
});

define("ui/modelHelpers/meetingScheduler", [
  "require",
  "exports",
  "module",
  "ui/modelHelpers/conversationHelper",
  "ui/viewModels/chat/conversationTopic",
  "swx-i18n",
  "constants/common",
  "experience/settings",
  "services/serviceLocator"
], function (e, t) {
  function a(e) {
    return e ? e.isGroupConversation() ? e.isJoiningEnabled() ? e : l(e) : f(e) : l();
  }
  function f(e) {
    var t = c(e);
    return h(t, e);
  }
  function l(e) {
    return h([], e);
  }
  function c(e) {
    var t, n = [];
    if (e)
      for (t = 0; t < e.participants.size(); ++t)
        n.push(e.participants(t).person);
    return n;
  }
  function h(e, t) {
    var r = n.createConversation(e, !0), i = p(t);
    return r.topic.set.enabled.once(!0, function () {
      r.topic.set(i);
    }), r;
  }
  function p(e) {
    var t, n;
    return !e || e.participants.size() === 0 ? i.fetch({ key: "schedule_call_new_conversation_topic" }) : (t = r.build(e), n = t.topic(), t.dispose(), i.fetch({
      key: "schedule_call_subject_text",
      params: { topic: n }
    }));
  }
  function d(e) {
    var t = u.resolve(s.serviceLocator.PUBSUB);
    t.publish(s.events.navigation.OPEN_CONVERSATION, {
      model: e,
      origin: s.telemetry.historyLoadOrigin.CREATE_CONVERSATION_FOR_SCHEDULED_CALL
    });
  }
  function v(e) {
    return new Promise(function (t) {
      e.isJoiningEnabled.set.enabled.once(!0, function () {
        e.isJoiningEnabled.set(!0).then(function () {
          e.uri.get().then(t);
        });
      });
    });
  }
  function m(e, t, n) {
    var r, i, s;
    return n ? (s = o.legacyCalendarUrl, r = g(e, t)) : (s = o.calendarUrl, r = y(e, t)), i = Object.keys(r).map(function (e) {
      return e + "=" + encodeURIComponent(r[e]);
    }), s + i.join("&");
  }
  function g(e, t) {
    var n = p(t);
    return {
      summary: n,
      description: b(e, n),
      location: n,
      dtstart: x(w()),
      dtend: x(E())
    };
  }
  function y(e, t) {
    var n = p(t);
    return {
      subject: n,
      location: n,
      body: b(e, n),
      startdt: S(w()),
      enddt: S(E())
    };
  }
  function b(e, t) {
    return t + "\n" + e.uri();
  }
  function w() {
    var e = new Date();
    return e.setUTCDate(e.getUTCDate() + 7), e;
  }
  function E() {
    var e = w();
    return e.setUTCHours(e.getUTCHours() + 1), e;
  }
  function S(e) {
    var t = e.getUTCFullYear(), n = T(e.getUTCMonth() + 1), r = T(e.getUTCDate()), i = T(e.getUTCHours()), s = T(e.getUTCMinutes()), o = T(e.getUTCSeconds()), u = i + ":" + s + ":" + o;
    return t + "-" + n + "-" + r + "T" + u;
  }
  function x(e) {
    var t = e.getUTCFullYear(), n = T(e.getUTCMonth() + 1), r = T(e.getUTCDate()), i = T(e.getUTCHours()), s = T(e.getUTCMinutes()), o = T(e.getUTCSeconds()), u = i.toString() + s.toString() + o.toString();
    return t.toString() + n.toString() + r.toString() + "T" + u;
  }
  function T(e) {
    return ("0" + e).slice(-2);
  }
  var n = e("ui/modelHelpers/conversationHelper"), r = e("ui/viewModels/chat/conversationTopic"), i = e("swx-i18n").localization, s = e("constants/common"), o = e("experience/settings"), u = e("services/serviceLocator");
  t.generateMeetingUri = function (t, n) {
    var r = a(t);
    return d(r), v(r).then(function () {
      return m(r, t, n);
    });
  };
});

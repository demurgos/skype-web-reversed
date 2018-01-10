define("ui/modelHelpers/meetingScheduler", [
  "require",
  "exports",
  "module",
  "swx-cafe-application-instance",
  "swx-utils-chat",
  "ui/viewModels/chat/conversationTopic",
  "swx-i18n",
  "swx-constants",
  "experience/settings",
  "swx-service-locator-instance"
], function (e, t) {
  function f(e) {
    return e ? e.isGroupConversation() ? e.isJoiningEnabled() ? e : c(e) : l(e) : c();
  }
  function l(e) {
    var t = h(e);
    return p(t, e);
  }
  function c(e) {
    return p([], e);
  }
  function h(e) {
    var t, n = [];
    if (e)
      for (t = 0; t < e.participants.size(); ++t)
        n.push(e.participants(t).person);
    return n;
  }
  function p(e, t) {
    var i = n.get().conversationsManager, s = r.createConversation(e, i, !0), o = d(t);
    return s.topic.set.enabled.once(!0, function () {
      s.topic.set(o);
    }), s;
  }
  function d(e) {
    var t, n;
    return !e || e.participants.size() === 0 ? s.fetch({ key: "schedule_call_new_conversation_topic" }) : (t = i.build(e), n = t.topic(), t.dispose(), s.fetch({
      key: "schedule_call_subject_text",
      params: { topic: n }
    }));
  }
  function v(e) {
    var t = a.resolve(o.serviceLocator.PUBSUB);
    t.publish(o.events.navigation.OPEN_CONVERSATION, {
      model: e,
      origin: o.telemetry.historyLoadOrigin.CREATE_CONVERSATION_FOR_SCHEDULED_CALL
    });
  }
  function m(e) {
    return new Promise(function (t) {
      e.isJoiningEnabled.set.enabled.once(!0, function () {
        e.isJoiningEnabled.set(!0).then(function () {
          e.uri.get().then(t);
        });
      });
    });
  }
  function g(e, t, n) {
    var r, i, s;
    return n ? (s = u.legacyCalendarUrl, r = y(e, t)) : (s = u.calendarUrl, r = b(e, t)), i = Object.keys(r).map(function (e) {
      return e + "=" + encodeURIComponent(r[e]);
    }), s + i.join("&");
  }
  function y(e, t) {
    var n = d(t);
    return {
      summary: n,
      description: w(e, n),
      location: n,
      dtstart: T(E()),
      dtend: T(S())
    };
  }
  function b(e, t) {
    var n = d(t);
    return {
      subject: n,
      location: n,
      body: w(e, n),
      startdt: x(E()),
      enddt: x(S())
    };
  }
  function w(e, t) {
    return t + "\n" + e.uri();
  }
  function E() {
    var e = new Date();
    return e.setUTCDate(e.getUTCDate() + 7), e;
  }
  function S() {
    var e = E();
    return e.setUTCHours(e.getUTCHours() + 1), e;
  }
  function x(e) {
    var t = e.getUTCFullYear(), n = N(e.getUTCMonth() + 1), r = N(e.getUTCDate()), i = N(e.getUTCHours()), s = N(e.getUTCMinutes()), o = N(e.getUTCSeconds()), u = i + ":" + s + ":" + o;
    return t + "-" + n + "-" + r + "T" + u;
  }
  function T(e) {
    var t = e.getUTCFullYear(), n = N(e.getUTCMonth() + 1), r = N(e.getUTCDate()), i = N(e.getUTCHours()), s = N(e.getUTCMinutes()), o = N(e.getUTCSeconds()), u = i.toString() + s.toString() + o.toString();
    return t.toString() + n.toString() + r.toString() + "T" + u;
  }
  function N(e) {
    return ("0" + e).slice(-2);
  }
  var n = e("swx-cafe-application-instance"), r = e("swx-utils-chat").conversation, i = e("ui/viewModels/chat/conversationTopic"), s = e("swx-i18n").localization, o = e("swx-constants").COMMON, u = e("experience/settings"), a = e("swx-service-locator-instance").default;
  t.generateMeetingUri = function (t, n) {
    var r = f(t);
    return v(r), m(r).then(function () {
      return g(r, t, n);
    });
  };
});

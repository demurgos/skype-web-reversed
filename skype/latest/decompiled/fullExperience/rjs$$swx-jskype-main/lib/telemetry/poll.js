(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/telemetry/poll", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "jskype-settings-instance",
      "swx-constants"
    ], e);
}(function (e, t) {
  function s(e) {
    var t = u(e, i.COMMON.telemetry.poll.activityType.SEND);
    n.get()._telemetryManager.sendEvent(r.settings.telemetry.jSkypeTenantToken, i.COMMON.telemetry.poll.eventName.ACTIVITY, t);
    e.pollAnswers().forEach(function (t) {
      var s = {};
      s[i.COMMON.telemetry.poll.property.CONVERSATION_ID] = e.conversationId();
      s[i.COMMON.telemetry.poll.property.ANSWER_LENGTH] = t.answerText.length;
      n.get()._telemetryManager.sendEvent(r.settings.telemetry.jSkypeTenantToken, i.COMMON.telemetry.poll.eventName.ANSWER_LENGTH, s);
    });
  }
  function o(e, t, s, o) {
    var u = {};
    u[i.COMMON.telemetry.poll.property.CONVERSATION_ID] = e;
    t && (u[i.COMMON.telemetry.poll.property.MESSAGE_ID] = t);
    u[i.COMMON.telemetry.poll.property.XMM_TYPE] = s;
    u[i.COMMON.telemetry.poll.property.ERROR_TYPE] = o;
    n.get()._telemetryManager.sendEvent(r.settings.telemetry.jSkypeTenantToken, i.COMMON.telemetry.poll.eventName.ERROR, u);
  }
  function u(e, t) {
    var n = {};
    return n[i.COMMON.telemetry.poll.property.CONVERSATION_ID] = e.conversationId(), n[i.COMMON.telemetry.poll.property.MESSAGE_ID] = e.key(), n[i.COMMON.telemetry.poll.property.ACTIVITY_TYPE] = t, n[i.COMMON.telemetry.poll.property.XMM_TYPE] = e.xmmType(), n[i.COMMON.telemetry.poll.property.QUESTION_LENGTH] = e.pollQuestion().length, n[i.COMMON.telemetry.poll.property.ANSWERS_COUNT] = e.pollAnswers().length, n[i.COMMON.telemetry.poll.property.MULTI_VOTE] = e.multipleVotes(), n[i.COMMON.telemetry.poll.property.TIME_SINCE_CREATION] = new Date().getTime() - e.timestamp(), n;
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("jskype-settings-instance"), i = e("swx-constants");
  t.sendPoll = s;
  t.error = o;
}));

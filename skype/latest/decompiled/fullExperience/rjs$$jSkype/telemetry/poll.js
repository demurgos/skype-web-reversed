define("jSkype/telemetry/poll", [
  "require",
  "jSkype/client",
  "constants/common",
  "jSkype/settings"
], function (e) {
  function i() {
    this.sendPoll = function (s) {
      var o = e(s, n.telemetry.poll.activityType.SEND);
      t.get()._telemetryManager.sendEvent(r.settings.telemetry.jSkypeTenantToken, n.telemetry.poll.eventName.ACTIVITY, o);
      s.pollAnswers().forEach(function (e) {
        var i = {};
        i[n.telemetry.poll.property.CONVERSATION_ID] = s.conversationId();
        i[n.telemetry.poll.property.ANSWER_LENGTH] = e.answerText.length;
        t.get()._telemetryManager.sendEvent(r.settings.telemetry.jSkypeTenantToken, n.telemetry.poll.eventName.ANSWER_LENGTH, i);
      });
    };
    this.error = function (i, s, o, u) {
      var a = {};
      a[n.telemetry.poll.property.CONVERSATION_ID] = i;
      s && (a[n.telemetry.poll.property.MESSAGE_ID] = s);
      a[n.telemetry.poll.property.XMM_TYPE] = o;
      a[n.telemetry.poll.property.ERROR_TYPE] = u;
      t.get()._telemetryManager.sendEvent(r.settings.telemetry.jSkypeTenantToken, n.telemetry.poll.eventName.ERROR, a);
    };
    var e = function (t, r) {
      var i = {};
      return i[n.telemetry.poll.property.CONVERSATION_ID] = t.conversationId(), i[n.telemetry.poll.property.MESSAGE_ID] = t.key(), i[n.telemetry.poll.property.ACTIVITY_TYPE] = r, i[n.telemetry.poll.property.XMM_TYPE] = t.xmmType(), i[n.telemetry.poll.property.QUESTION_LENGTH] = t.pollQuestion().length, i[n.telemetry.poll.property.ANSWERS_COUNT] = t.pollAnswers().length, i[n.telemetry.poll.property.MULTI_VOTE] = t.multipleVotes(), i[n.telemetry.poll.property.TIME_SINCE_CREATION] = new Date().getTime() - t.timestamp(), i;
    };
  }
  var t = e("jSkype/client"), n = e("constants/common"), r = e("jSkype/settings");
  return new i();
});

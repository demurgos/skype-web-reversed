define("telemetry/chat/poll", [
  "require",
  "experience/settings",
  "swx-constants",
  "ui/telemetry/telemetryClient",
  "swx-service-locator-instance",
  "utils/common/styleModeHelper"
], function (e) {
  function o() {
    this.pollDesignerOpened = function (o) {
      var u = {};
      u[n.telemetry.poll.property.CONVERSATION_ID] = o;
      u.mediaBarV2Enabled = i.resolve(n.serviceLocator.FEATURE_FLAGS).isFeatureOn(n.featureFlags.MEDIA_BAR_V2_ENABLED);
      u.styleMode = s.get().currentMode();
      r.get().sendEvent(t.telemetry.chatTenantToken, n.telemetry.poll.eventName.DESIGNER_OPENED, u);
    };
    this.stickyMessageClicked = function (i) {
      var s = {};
      s[n.telemetry.poll.property.CONVERSATION_ID] = i.conversationId();
      s[n.telemetry.poll.property.MESSAGE_ID] = i.key();
      r.get().sendEvent(t.telemetry.chatTenantToken, n.telemetry.poll.eventName.STICKY_MESSAGE_CLICKED, s);
    };
    this.avatarElipsisClicked = function (i) {
      var s = {};
      s[n.telemetry.poll.property.CONVERSATION_ID] = i.conversationId();
      s[n.telemetry.poll.property.MESSAGE_ID] = i.key();
      r.get().sendEvent(t.telemetry.chatTenantToken, n.telemetry.poll.eventName.AVATAR_ELIPSIS_CLICKED, s);
    };
    this.activityVote = function (s) {
      var o = e(s, n.telemetry.poll.activityType.VOTE);
      o[n.telemetry.poll.property.IS_NEW_VOTE] = !0;
      r.get().sendEvent(t.telemetry.chatTenantToken, n.telemetry.poll.eventName.ACTIVITY, o);
    };
    var e = function (t, r) {
      var i = {};
      return i[n.telemetry.poll.property.CONVERSATION_ID] = t.conversationId(), i[n.telemetry.poll.property.MESSAGE_ID] = t.key(), i[n.telemetry.poll.property.ACTIVITY_TYPE] = r, i[n.telemetry.poll.property.XMM_TYPE] = t.xmmType(), i[n.telemetry.poll.property.QUESTION_LENGTH] = t.pollQuestion().length, i[n.telemetry.poll.property.ANSWERS_COUNT] = t.pollAnswers().length, i[n.telemetry.poll.property.MULTI_VOTE] = t.multipleVotes(), i[n.telemetry.poll.property.TIME_SINCE_CREATION] = new Date().getTime() - t.timestamp(), i;
    };
  }
  var t = e("experience/settings"), n = e("swx-constants").COMMON, r = e("ui/telemetry/telemetryClient"), i = e("swx-service-locator-instance").default, s = e("utils/common/styleModeHelper");
  return new o();
});

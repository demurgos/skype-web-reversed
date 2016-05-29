define("telemetry/chat/youtubeActionEvent", [
  "require",
  "experience/settings",
  "services/telemetry/hashingService",
  "ui/telemetry/telemetryClient"
], function (e) {
  function i() {
    var e = "message_youtube_action";
    this.publish = function (i, s, o, u) {
      var a = {
        messageIdHash: n.getHash(i.contentId),
        videoId: i.youtubeId,
        meSender: i.isMyself,
        batchOrdinal: i.ordinal,
        timeInStale: (u - i.messageTimestamp) / 1000,
        playerWidth: s.getIframe().clientWidth,
        playerHeight: s.getIframe().clientHeight,
        playerMode: !!s.inFullScreenMode,
        participantsCount: o.participantsCount,
        playerActionType: o.type,
        videoLength: o.videoLength,
        playerActionDuration: o.duration
      };
      o.startTime && (a.startTime = o.startTime);
      r.get().sendEvent(t.telemetry.uiTenantToken, e, a);
    };
  }
  var t = e("experience/settings"), n = e("services/telemetry/hashingService"), r = e("ui/telemetry/telemetryClient");
  return new i();
});

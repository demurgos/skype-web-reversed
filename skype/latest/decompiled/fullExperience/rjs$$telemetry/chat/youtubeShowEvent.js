define("telemetry/chat/youtubeShowEvent", [
  "require",
  "experience/settings",
  "services/telemetry/hashingService",
  "ui/telemetry/telemetryClient"
], function (e) {
  function i() {
    var e = "message_youtube_show";
    this.publish = function (i, s, o, u) {
      var a = {
        messageIdHash: n.getHash(i.contentId),
        videoId: i.youtubeId,
        participantsCount: u,
        meSender: i.isMyself,
        batchOrdinal: i.ordinal,
        videoLength: o,
        playerWidth: s.getIframe().clientWidth,
        playerHeight: s.getIframe().clientHeight
      };
      r.get().sendEvent(t.telemetry.uiTenantToken, e, a);
    };
  }
  var t = e("experience/settings"), n = e("services/telemetry/hashingService"), r = e("ui/telemetry/telemetryClient");
  return new i();
});

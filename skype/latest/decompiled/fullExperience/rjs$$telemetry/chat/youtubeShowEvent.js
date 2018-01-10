define("telemetry/chat/youtubeShowEvent", [
  "require",
  "experience/settings",
  "services/telemetry/hashingService",
  "ui/telemetry/telemetryClient",
  "swx-log-tracer"
], function (e) {
  function s() {
    var e = "message_youtube_show";
    this.publish = function (s, o, u, a) {
      try {
        var f = {
          messageIdHash: n.getHash(s.contentId),
          videoId: s.youtubeId,
          participantsCount: a,
          meSender: s.isMyself,
          batchOrdinal: s.ordinal,
          videoLength: u,
          playerWidth: o.getIframe().clientWidth,
          playerHeight: o.getIframe().clientHeight,
          preferencesEnabled: s.ytEnabled
        };
        r.get().sendEvent(t.telemetry.chatTenantToken, e, f);
      } catch (l) {
        i.error("Unable to send YT show telemetry: ");
        i.error(l);
      }
    };
  }
  var t = e("experience/settings"), n = e("services/telemetry/hashingService"), r = e("ui/telemetry/telemetryClient"), i = e("swx-log-tracer").getLogger();
  return new s();
});

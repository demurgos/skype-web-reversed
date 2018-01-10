define("telemetry/chat/youtubeActionEvent", [
  "require",
  "experience/settings",
  "services/telemetry/hashingService",
  "ui/telemetry/telemetryClient",
  "swx-log-tracer"
], function (e) {
  function s() {
    var e = "message_youtube_action";
    this.publish = function (s, o, u, a) {
      try {
        var f = {
          messageIdHash: n.getHash(s.contentId),
          videoId: s.youtubeId,
          meSender: s.isMyself,
          batchOrdinal: s.ordinal,
          timeInStale: (a - s.messageTimestamp) / 1000,
          playerWidth: o.getIframe().clientWidth,
          playerHeight: o.getIframe().clientHeight,
          playerMode: !!o.inFullScreenMode,
          participantsCount: u.participantsCount,
          playerActionType: u.type,
          videoLength: u.videoLength,
          playerActionDuration: u.duration,
          preferencesEnabled: s.ytEnabled
        };
        u.startTime && (f.startTime = u.startTime);
        r.get().sendEvent(t.telemetry.chatTenantToken, e, f);
      } catch (l) {
        i.error("Unable to send YT action telemetry: ");
        i.error(l);
      }
    };
  }
  var t = e("experience/settings"), n = e("services/telemetry/hashingService"), r = e("ui/telemetry/telemetryClient"), i = e("swx-log-tracer").getLogger();
  return new s();
});

define("telemetry/chat/quoteMessageEvent", [
  "require",
  "experience/settings",
  "ui/telemetry/telemetryClient",
  "swx-log-tracer",
  "swx-constants"
], function (e) {
  function s() {
    var e;
    this.publish = function (s, o, u) {
      e = i.events.actions.messageQuoted;
      try {
        var a = {
          source: o,
          timeInStale: Math.round((new Date().getTime() - (s && s.timestamp().getTime())) / 1000),
          lengthOfQuote: s && s.text().length,
          actionSuccess: u
        };
        n.get().sendEvent(t.telemetry.chatTenantToken, e, a);
      } catch (f) {
        r.error("Unable to send quote action telemetry: ");
        r.error(f);
      }
    };
  }
  var t = e("experience/settings"), n = e("ui/telemetry/telemetryClient"), r = e("swx-log-tracer").getLogger(), i = e("swx-constants").COMMON;
  return new s();
});

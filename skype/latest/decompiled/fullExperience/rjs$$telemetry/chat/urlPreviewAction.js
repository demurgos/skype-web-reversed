define("telemetry/chat/urlPreviewAction", [
  "require",
  "exports",
  "module",
  "experience/settings",
  "swx-constants",
  "ui/telemetry/telemetryClient",
  "swx-telemetry-buckets",
  "browser/window",
  "services/telemetry/hashingService"
], function (e, t) {
  var n = e("experience/settings"), r = e("swx-constants").COMMON, i = r.telemetry.urlPreviewClicked, s = e("ui/telemetry/telemetryClient"), o = e("swx-telemetry-buckets"), u = e("browser/window"), a = e("services/telemetry/hashingService");
  t.publishActionEvent = function (e) {
    function r() {
      var t = f();
      return {
        messageIdHash: a.getHash(e.contentId),
        contentType: o.getUrlContentType(e.url),
        ttc: t,
        ttcGroup: o.getMessageLifeDurationGroup(t),
        participantCount: e.participantCount,
        participantCountGroup: o.getParticipantCountGroup(e.participantCount)
      };
    }
    function f() {
      return l(e.timestamp, c());
    }
    function l(e, t) {
      return t - e;
    }
    function c() {
      return new u.Date().getTime();
    }
    function h(e) {
      var t = i.TYPE, r = e;
      s.get().sendEvent(n.telemetry.chatTenantToken, t, r);
    }
    var t;
    t = r();
    h(t);
  };
});

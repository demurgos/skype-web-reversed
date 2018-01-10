define("telemetry/chat/urlPreviewShow", [
  "require",
  "exports",
  "module",
  "experience/settings",
  "swx-constants",
  "ui/telemetry/telemetryClient",
  "swx-telemetry-buckets",
  "services/telemetry/hashingService"
], function (e, t) {
  function a(e) {
    function l() {
      return {
        messageIdHash: u.getHash(e.contentId),
        urlCount: e.urlCount,
        hasThumbnail: !1,
        urlPosition: e.urlPosition,
        contentType: o.getUrlContentType(e.url),
        result: f,
        ttl: f,
        ttlGroup: f,
        participantCount: e.participantsCount,
        participantCountGroup: o.getParticipantCountGroup(e.participantsCount)
      };
    }
    function c() {
      t.data.ttl = h(a, p());
      t.data.ttlGroup = o.getSecondsDurationGroup(t.data.ttl);
      var e = i.TYPE, r = t.data;
      s.get().sendEvent(n.telemetry.chatTenantToken, e, r);
    }
    function h(e, t) {
      return t - e;
    }
    function p() {
      return new Date().getTime();
    }
    var t = this, a = p(), f = r.telemetry.NOT_AVAILABLE;
    t.data = l();
    t.error = function (e) {
      e && (t.data.result = e);
      c();
    };
    t.succeeded = function (e, n) {
      t.data.hasThumbnail = n;
      t.data.result = e;
      c();
    };
  }
  var n = e("experience/settings"), r = e("swx-constants").COMMON, i = r.telemetry.urlPreviewShown, s = e("ui/telemetry/telemetryClient"), o = e("swx-telemetry-buckets"), u = e("services/telemetry/hashingService");
  t.build = function (e) {
    return new a(e);
  };
});

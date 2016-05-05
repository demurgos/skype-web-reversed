define("telemetry/chat/urlPreviewShow", [
  "require",
  "exports",
  "module",
  "experience/settings",
  "constants/common",
  "ui/telemetry/telemetryClient",
  "telemetry/chat/telemetryEnumerator"
], function (e, t) {
  function u(e) {
    function f() {
      return {
        urlCount: e.urlCount,
        hasThumbnail: !1,
        urlPosition: e.urlPosition,
        contentType: o.getUrlContentType(e.url),
        result: a,
        ttl: a,
        ttlGroup: a,
        participantCount: e.participantCount,
        participantCountGroup: o.getParticipantCountGroup(e.participantCount)
      };
    }
    function l() {
      t.data.ttl = c(u, h()), t.data.ttlGroup = o.getSecondsDurationGroup(t.data.ttl);
      var e = i.TYPE, r = t.data;
      s.get().sendEvent(n.telemetry.uiTenantToken, e, r);
    }
    function c(e, t) {
      return t - e;
    }
    function h() {
      return new Date().getTime();
    }
    var t = this, u = h(), a = r.telemetry.NOT_AVAILABLE;
    t.data = f(), t.error = function (e) {
      e && (t.data.result = e), l();
    }, t.succeeded = function (e, n) {
      t.data.hasThumbnail = n, t.data.result = e, l();
    };
  }
  var n = e("experience/settings"), r = e("constants/common"), i = r.telemetry.urlPreviewShown, s = e("ui/telemetry/telemetryClient"), o = e("telemetry/chat/telemetryEnumerator");
  t.build = function (e) {
    return new u(e);
  };
})

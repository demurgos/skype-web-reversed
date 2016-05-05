define("telemetry/chat/urlPreviewAction", [
  "require",
  "exports",
  "module",
  "experience/settings",
  "constants/common",
  "ui/telemetry/telemetryClient",
  "telemetry/chat/telemetryEnumerator",
  "browser/window"
], function (e, t) {
  var n = e("experience/settings"), r = e("constants/common"), i = r.telemetry.urlPreviewClicked, s = e("ui/telemetry/telemetryClient"), o = e("telemetry/chat/telemetryEnumerator"), u = e("browser/window");
  t.publishActionEvent = function (e) {
    function r() {
      var t = a();
      return {
        contentType: o.getUrlContentType(e.url),
        ttc: t,
        ttcGroup: o.getMessageLifeDurationGroup(t),
        participantCount: e.participantCount,
        participantCountGroup: o.getParticipantCountGroup(e.participantCount)
      };
    }
    function a() {
      return f(e.receivedTime, l());
    }
    function f(e, t) {
      return t - e;
    }
    function l() {
      return new u.Date().getTime();
    }
    function c(e) {
      var t = i.TYPE, r = e;
      s.get().sendEvent(n.telemetry.uiTenantToken, t, r);
    }
    var t;
    t = r(), c(t);
  };
})

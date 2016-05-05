define("telemetry/authentication/signIn", [
  "require",
  "exports",
  "module",
  "ui/telemetry/telemetryClient",
  "experience/settings",
  "swx-utils-common"
], function (e, t) {
  function s() {
    function t(t) {
      var i = "signIn", s = {};
      s.duration = e.duration(), s.authType = t.authType, s.success = t.hasSucceed, s.hostname = location.hostname, s.retry = t.retry || !1, t.isExternalSignIn && (s.isExternalSignIn = t.isExternalSignIn), t.hasSucceed || (s.error = t.error, s.jCafeStatus = t.jCafeStatus || "", t.details && (s.reason = t.details.reason || "", s.request = t.details.request || "", s.response = t.details.response || "")), t.flow && (s.flow = t.flow), n.get().sendEvent(r.telemetry.uiTenantToken, i, s), n.get().setAuthType && n.get().setAuthType(t.authType);
    }
    var e = i.build();
    return { send: t };
  }
  var n = e("ui/telemetry/telemetryClient"), r = e("experience/settings"), i = e("swx-utils-common").stopwatch;
  t.build = function () {
    return new s();
  };
})

define("telemetry/authentication/setAuthProvider", [
  "require",
  "exports",
  "module",
  "ui/telemetry/telemetryClient",
  "experience/settings"
], function (e, t) {
  function i() {
    function e(e) {
      var t = "setAuthProvider", i = {};
      i.authType = e.authType, i.success = e.hasSucceed, i.implicitSignIn = e.implicitSignIn, i.hostname = location.hostname, e.hasSucceed || (i.error = e.error, e.details && (i.details = e.details)), n.get().sendEvent(r.telemetry.uiTenantToken, t, i), n.get().setAuthType && n.get().setAuthType(e.authType);
    }
    return { send: e };
  }
  var n = e("ui/telemetry/telemetryClient"), r = e("experience/settings");
  t.build = function () {
    return new i();
  };
})

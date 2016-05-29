define("telemetry/authentication/linking", [
  "require",
  "exports",
  "module",
  "ui/telemetry/telemetryClient",
  "experience/settings"
], function (e, t) {
  function i() {
    function e(e) {
      var t = "linking";
      n.get().sendEvent(r.telemetry.uiTenantToken, t, { flow: e });
    }
    return { send: e };
  }
  var n = e("ui/telemetry/telemetryClient"), r = e("experience/settings");
  t.build = function () {
    return new i();
  };
});

define("telemetry/translator/translatorTelemetry", [
  "require",
  "exports",
  "module",
  "experience/settings",
  "ui/telemetry/telemetryClient"
], function (e, t) {
  function i() {
    var e = this;
    e.send = function (e, t) {
      var i = t || {};
      r.get().sendEvent(n.telemetry.uiTenantToken, e, i);
    };
  }
  var n = e("experience/settings"), r = e("ui/telemetry/telemetryClient");
  t.build = function () {
    return new i();
  };
})

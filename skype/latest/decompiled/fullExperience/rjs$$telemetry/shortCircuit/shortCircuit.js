define("telemetry/shortCircuit/shortCircuit", [
  "require",
  "exports",
  "module",
  "ui/telemetry/telemetryClient",
  "constants/common",
  "experience/settings"
], function (e, t) {
  function s() {
    this.sendStartEvent = function () {
      n.get().sendEvent(i.telemetry.uiTenantToken, r.shortCircuit.START, {});
    };
    this.sendFinishedEvent = function () {
      n.get().sendEvent(i.telemetry.uiTenantToken, r.shortCircuit.FINISHED, {});
    };
  }
  var n = e("ui/telemetry/telemetryClient"), r = e("constants/common").telemetry.contacts, i = e("experience/settings");
  t.build = function () {
    return new s();
  };
});

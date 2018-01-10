define("telemetry/shortCircuit/shortCircuit", [
  "require",
  "exports",
  "module",
  "ui/telemetry/telemetryClient",
  "swx-constants",
  "experience/settings"
], function (e, t) {
  function s() {
    this.sendStartEvent = function (e) {
      n.get().sendEvent(i.telemetry.uiTenantToken, r.shortCircuit.START, e || {});
    };
    this.sendFinishedEvent = function (e) {
      n.get().sendEvent(i.telemetry.uiTenantToken, r.shortCircuit.FINISHED, e || {});
    };
    this.sendAddressBookAddedEvent = function (e) {
      n.get().sendEvent(i.telemetry.uiTenantToken, r.shortCircuit.ADDRESS_BOOK_ADDED, e || {});
    };
    this.sendVisibleEvent = function (e) {
      n.get().sendEvent(i.telemetry.uiTenantToken, r.shortCircuit.VISIBLE, e || {});
    };
  }
  var n = e("ui/telemetry/telemetryClient"), r = e("swx-constants").COMMON.telemetry.contacts, i = e("experience/settings");
  t.build = function () {
    return new s();
  };
});

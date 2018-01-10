define("telemetry/settings/settingsPageTelemetry", [
  "require",
  "lodash-compat",
  "swx-utils-common",
  "swx-constants",
  "experience/settings",
  "ui/telemetry/telemetryClient"
], function (e) {
  function o() {
  }
  function u(e) {
    var t = {};
    return t[r.telemetry.userSettings.property.ITEM_NAME] = (e ? e : r.telemetry.userSettings.UNKNOWN).toString(), t[r.telemetry.userSettings.property.ITEM_VALUE] = r.telemetry.userSettings.UNKNOWN, t[r.telemetry.userSettings.property.OPERATION_OUTCOME] = r.telemetry.userSettings.outcomeNames.SUCCESS, t;
  }
  var t = e("lodash-compat"), n = e("swx-utils-common").builderMixin, r = e("swx-constants").COMMON, i = e("experience/settings"), s = e("ui/telemetry/telemetryClient");
  return o.prototype.sendShowPanelEvent = function (t) {
    var n = u(t);
    s.get().sendEvent(i.telemetry.uiTenantToken, r.telemetry.userSettings.eventName.PANEL_SHOWN, n);
  }, o.prototype.sendDismissPageEvent = function (t) {
    var n = u("");
    n[r.telemetry.userSettings.property.OPERATION_DURATION] = isNaN(parseInt(t)) ? r.telemetry.userSettings.UNKNOWN : parseInt(t);
    s.get().sendEvent(i.telemetry.uiTenantToken, r.telemetry.userSettings.eventName.PAGE_DISMISSED, n);
  }, t.assign(o, n), o;
});

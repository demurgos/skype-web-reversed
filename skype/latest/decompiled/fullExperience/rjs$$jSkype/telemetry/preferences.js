define("jSkype/telemetry/preferences", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "jSkype/client",
  "constants/common",
  "jSkype/settings"
], function (e, t) {
  function o(e, t, r, s) {
    var o = {};
    return n.isObject(t) && (t = Object.prototype.toString.call(t)), o[i.telemetry.userSettings.property.ITEM_NAME] = (e == null ? i.telemetry.userSettings.UNKNOWN : e).toString(), o[i.telemetry.userSettings.property.ITEM_VALUE] = (t == null ? i.telemetry.userSettings.UNKNOWN : t).toString(), o[i.telemetry.userSettings.property.OPERATION_DURATION] = isNaN(parseInt(s)) ? i.telemetry.userSettings.UNKNOWN : s, o[i.telemetry.userSettings.property.OPERATION_OUTCOME] = r ? i.telemetry.userSettings.outcomeNames.SUCCESS : i.telemetry.userSettings.outcomeNames.FAILURE, o;
  }
  var n = e("lodash-compat"), r = e("jSkype/client"), i = e("constants/common"), s = e("jSkype/settings");
  t.fetchPreference = function (t, n, u, a) {
    var f = o(t, n, u, a);
    r.get()._telemetryManager.sendEvent(s.settings.telemetry.jSkypeTenantToken, i.telemetry.userSettings.eventName.PREFERENCE_FETCHED, f);
  };
  t.changePreference = function (t, n, u, a) {
    var f = o(t, n, u, a);
    r.get()._telemetryManager.sendEvent(s.settings.telemetry.jSkypeTenantToken, i.telemetry.userSettings.eventName.PREFERENCE_CHANGED, f);
  };
});

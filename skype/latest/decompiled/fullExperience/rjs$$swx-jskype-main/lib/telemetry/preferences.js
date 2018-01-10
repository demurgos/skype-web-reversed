(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/telemetry/preferences", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "jskype-settings-instance",
      "swx-constants",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function o(e, t, n, r) {
    var o = {};
    return s.isObject(t) && (t = Object.prototype.toString.call(t)), o[i.COMMON.telemetry.userSettings.property.ITEM_NAME] = (e == null ? i.COMMON.telemetry.userSettings.UNKNOWN : e).toString(), o[i.COMMON.telemetry.userSettings.property.ITEM_VALUE] = (t == null ? i.COMMON.telemetry.userSettings.UNKNOWN : t).toString(), o[i.COMMON.telemetry.userSettings.property.OPERATION_DURATION] = isNaN(parseInt(r)) ? i.COMMON.telemetry.userSettings.UNKNOWN : r, o[i.COMMON.telemetry.userSettings.property.OPERATION_OUTCOME] = n ? i.COMMON.telemetry.userSettings.outcomeNames.SUCCESS : i.COMMON.telemetry.userSettings.outcomeNames.FAILURE, o;
  }
  function u(e, t, s, u) {
    var a = o(e, t, s, u);
    n.get()._telemetryManager.sendEvent(r.settings.telemetry.jSkypeTenantToken, i.COMMON.telemetry.userSettings.eventName.PREFERENCE_FETCHED, a);
  }
  function a(e, t, s, u) {
    var a = o(e, t, s, u);
    n.get()._telemetryManager.sendEvent(r.settings.telemetry.jSkypeTenantToken, i.COMMON.telemetry.userSettings.eventName.PREFERENCE_CHANGED, a);
    if (e === i.COMMON.userSettings.preferences.DARK_THEME && s) {
      var f = i.COMMON.telemetry.themeEvent, l = t ? f.theme.DARK : f.theme.DEFAULT;
      n.get()._telemetryManager.setCommonProperty(f.TYPE, l);
    }
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("jskype-settings-instance"), i = e("swx-constants"), s = e("lodash-compat");
  t.fetchPreference = u;
  t.changePreference = a;
}));

define("notifications/ringingDeferrer/ringingDeferrerUtil", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "ui/telemetry/actions/actionNames",
  "swx-cafe-application-instance",
  "jskype-settings-instance",
  "swx-constants",
  "swx-enums",
  "notifications/ringingDeferrer/ringingDeferrerSetting",
  "swx-service-locator-instance"
], function (e, t) {
  function l() {
    if (t.isFeatureEnabled())
      return i.get().personsAndGroupsManager.mePerson.preferences(o.userSettings.preferences.DEFER_RINGING_SOUND);
  }
  function c() {
    var e = t.getCurrentSetting();
    return e && e.option !== u.ringingDeferrerOptions.Unset ? e.untilTimestamp : 0;
  }
  function h(e) {
    var t = f.resolve(o.serviceLocator.ACTION_TELEMETRY);
    t.recordAction(r.notificationsSettings.changeRingingDeferrerSetting, { option: e });
  }
  var n = e("lodash-compat"), r = e("ui/telemetry/actions/actionNames"), i = e("swx-cafe-application-instance"), s = e("jskype-settings-instance"), o = e("swx-constants").COMMON, u = e("swx-enums"), a = e("notifications/ringingDeferrer/ringingDeferrerSetting"), f = e("swx-service-locator-instance").default;
  t.isFeatureEnabled = function () {
    return s.isFeatureOn(o.featureFlags.RINGING_DEFERRING);
  };
  t.getCurrentSetting = function () {
    var e = l();
    if (e) {
      var t = e.value();
      if (n.has(t, "option") && n.has(t, "untilTimestamp"))
        return t;
    }
  };
  t.areRingingSoundsDeferred = function () {
    return new Date().getTime() < c();
  };
  t.applyOption = function (e) {
    function r(e) {
      var t = 3600000;
      return e ? new Date().getTime() + e * t : 0;
    }
    var t = l();
    if (!t)
      return Promise.reject();
    var n = t.value();
    return e === u.ringingDeferrerOptions.Unset && n && n.option === e ? Promise.resolve() : (n = new a(e, r(e)), h(e), t.value.set(n));
  };
});

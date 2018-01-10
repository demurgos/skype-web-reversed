(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/utils/preferences/preference", [
      "require",
      "exports",
      "../../telemetry/preferences",
      "swx-enums",
      "jskype-settings-instance",
      "swx-constants",
      "jcafe-property-model",
      "swx-utils-common"
    ], e);
}(function (e, t) {
  function l(e) {
    return new f(e);
  }
  var n = e("../../telemetry/preferences"), r = e("swx-enums"), i = e("jskype-settings-instance"), s = e("swx-constants"), o = e("jcafe-property-model"), u = e("swx-utils-common"), a = r.preferenceValueState, f = function () {
      function e(e) {
        this.state = o.property({
          readOnly: !0,
          value: a.Unknown
        });
        this.params = e;
        this.id = e.id;
        this.preferenceType = e.type;
        this.provider = e.provider;
        this.defaultValue = e.defaultValue;
        this.telemetryName = e.telemetryName || e.id;
        this.areUserSettingsEnabled() || this.state._set(a.Unset);
        this.description = {
          id: this.id,
          type: this.preferenceType
        };
        var t = o.command(this.getPreference.bind(this), o.property({ value: !e.getDisabled }));
        this.value = o.property({
          readOnly: !this.areUserSettingsEnabled(),
          value: this.defaultValue,
          get: this.areUserSettingsEnabled() ? t : undefined,
          set: this.areUserSettingsEnabled() ? this.setPreference.bind(this) : undefined
        });
        this.value.state = this.state;
      }
      return e.prototype.getPreference = function () {
        var e = this, t = u.stopwatch.build();
        return this.provider.read().then(function (n) {
          var r = e.defaultValue;
          return n === null ? e.state._set(a.Unset) : (e.state._set(a.Defined), r = n), e.sendTelemetryOnGet(r, !0, t), r;
        })["catch"](function () {
          var n = e.value();
          return e.state._set(a.Unset), e.sendTelemetryOnGet(n, !1, t), n;
        });
      }, e.prototype.setPreference = function (e) {
        var t = this, n = u.stopwatch.build();
        return this.setValuePromise ? this.setValuePromise : (this.state._set(a.Saving), this.setValuePromise = Promise.resolve(this.provider.update(e)).then(function () {
          return t.state._set(a.Defined), t.sendTelemetryOnSet(e, !0, n), t.setValuePromise = null, e;
        })["catch"](function () {
          return t.state._set(a.Unset), t.sendTelemetryOnSet(e, !1, n), t.setValuePromise = null, e;
        }), this.setValuePromise);
      }, e.prototype.areUserSettingsEnabled = function () {
        return i.isFeatureOn(s.COMMON.featureFlags.USER_SETTINGS_ENABLED);
      }, e.prototype.sendTelemetryOnGet = function (e, t, r) {
        this.params.disableReporting || n.fetchPreference(this.telemetryName, e, t, r.duration());
      }, e.prototype.sendTelemetryOnSet = function (e, t, r) {
        this.params.disableReporting || n.changePreference(this.telemetryName, e, t, r.duration());
      }, e;
    }();
  t.Preference = f;
  t.build = l;
}));

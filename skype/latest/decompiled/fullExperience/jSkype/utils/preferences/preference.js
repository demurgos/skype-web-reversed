define("jSkype/utils/preferences/preference", [
  "require",
  "exports",
  "module",
  "swx-enums",
  "jSkype/settings",
  "constants/common",
  "jcafe-property-model",
  "jSkype/telemetry/preferences",
  "swx-utils-common"
], function (e, t) {
  function f(e) {
    function g() {
      var e = a.build();
      return c.read().then(function (t) {
        var n = h;
        return t === null ? m._set(o.Unset) : (m._set(o.Defined), n = t), w(n, !0, e), n;
      }).catch(function () {
        var n = t.value();
        return m._set(o.Unset), w(n, !1, e), n;
      });
    }
    function y(e) {
      var t = a.build();
      return n ? n : (m._set(o.Saving), n = Promise.resolve(c.update(e)).then(function () {
        return m._set(o.Defined), E(e, !0, t), n = null, e;
      }).catch(function () {
        return m._set(o.Unset), E(e, !1, t), n = null, e;
      }), n);
    }
    function b() {
      return r.isFeatureOn(i.featureFlags.USER_SETTINGS_ENABLED);
    }
    function w(t, n, r) {
      e.disableReporting || u.fetchPreference(p, t, n, r.duration());
    }
    function E(t, n, r) {
      e.disableReporting || u.changePreference(p, t, n, r.duration());
    }
    var t = this, n, f = e.id, l = e.type, c = e.provider, h = e.defaultValue, p = e.telemetryName || e.id, d = g, v = y, m = s.property({
        readOnly: !0,
        value: o.Unknown
      });
    b() || (d = undefined, v = undefined, m._set(o.Unset)), t.description = {
      id: f,
      type: l
    }, t.value = s.property({
      readOnly: !b(),
      value: h,
      get: d,
      set: v
    }), t.value.state = m;
  }
  var n = e("swx-enums"), r = e("jSkype/settings"), i = e("constants/common"), s = e("jcafe-property-model"), o = n.preferenceValueState, u = e("jSkype/telemetry/preferences"), a = e("swx-utils-common").stopwatch;
  t.build = function (e) {
    return new f(e);
  };
})

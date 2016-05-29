define("jSkype/modelHelpers/presence/presenceDataStorage", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "jSkype/settings",
  "constants/common",
  "jSkype/modelHelpers/presence/cache/local",
  "jSkype/modelHelpers/presence/cache/session"
], function (e, t) {
  function u() {
    return r.isFeatureOn(i.featureFlags.PRESENCE_DATA_CACHE);
  }
  function a() {
    return o.destroy(), s.restore();
  }
  var n = e("lodash-compat"), r = e("jSkype/settings"), i = e("constants/common"), s = e("jSkype/modelHelpers/presence/cache/local"), o = e("jSkype/modelHelpers/presence/cache/session");
  t.getCache = function () {
    return u() ? s : o;
  };
  t.restoreData = function () {
    if (u()) {
      var e = o.restore();
      if (!n.isEmpty(e)) {
        var t = Object.keys(e).map(function (t) {
          return s.set(t, e[t]);
        });
        return Promise.all(t).then(function () {
          return a();
        });
      }
      return a();
    }
    return s.restore().then(function (e) {
      return n.isEmpty(e) || e.forEach(function (e) {
        o.set(e.id, n.omit(e, "id"));
      }), o.restore(), s.destroy();
    });
  };
});

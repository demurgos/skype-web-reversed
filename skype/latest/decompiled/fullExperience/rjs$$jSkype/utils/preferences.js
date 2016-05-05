define("jSkype/utils/preferences", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "jSkype/settings",
  "jSkype/utils/preferences/config",
  "jSkype/utils/preferences/preference"
], function (e, t) {
  function o(e) {
    var t = this;
    t.addPreference = function (t) {
      e(t.id) || e.add(s.build(t), t.id);
    }, t.init = function () {
      i.forEach(function (e) {
        if (u(e.featureFlag)) {
          var r = n.clone(e), i = e.provider;
          r.provider = i.const.build.apply(i.const, i.args), t.addPreference(r);
        }
      });
    };
  }
  function u(e) {
    return r.isFeatureOn(e);
  }
  var n = e("lodash-compat"), r = e("jSkype/settings"), i = e("jSkype/utils/preferences/config").preferences, s = e("jSkype/utils/preferences/preference");
  t.build = function (e) {
    var t = new o(e);
    t.init();
  }, t.Preferences = o;
})

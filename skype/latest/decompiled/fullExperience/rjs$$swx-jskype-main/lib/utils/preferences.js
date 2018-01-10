(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/utils/preferences", [
      "require",
      "exports",
      "lodash-compat",
      "jskype-settings-instance",
      "../../lib/utils/preferences/config",
      "../../lib/utils/preferences/preference"
    ], e);
}(function (e, t) {
  function o(e) {
    i.preferences.forEach(function (r) {
      if (u(r.featureFlag)) {
        var i = n.clone(r), s = r.provider;
        i.provider = s.builder.build.apply(s.builder, s.args);
        t.addPreference(i, e);
      }
    });
  }
  function u(e) {
    return r.isFeatureOn(e);
  }
  var n = e("lodash-compat"), r = e("jskype-settings-instance"), i = e("../../lib/utils/preferences/config"), s = e("../../lib/utils/preferences/preference");
  t.addPreference = function (e, t) {
    function n(e) {
      return t(e.id) || t.add(s.build(e), e.id), Promise.resolve();
    }
    return e.isDisplayable ? e.isDisplayable().then(function (t) {
      return t ? n(e) : undefined;
    }) : n(e);
  };
  t.init = o;
}));

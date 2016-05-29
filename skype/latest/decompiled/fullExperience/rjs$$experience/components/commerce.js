define("experience/components/commerce", [
  "require",
  "exports",
  "module",
  "constants/common",
  "services/serviceLocator",
  "ui/components/commerce/index",
  "ui/components/registrar"
], function (e, t) {
  function o() {
    var e = r.resolve(n.serviceLocator.FEATURE_FLAGS);
    e.isFeatureOn(n.featureFlags.PSTN_ENABLED) && s.register(i);
  }
  var n = e("constants/common"), r = e("services/serviceLocator"), i = e("ui/components/commerce/index"), s = e("ui/components/registrar");
  t.init = function (e) {
    o();
    e();
  };
});

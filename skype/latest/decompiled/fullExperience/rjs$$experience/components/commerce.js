define("experience/components/commerce", [
  "require",
  "exports",
  "module",
  "swx-constants",
  "swx-service-locator-instance",
  "ui/components/commerce/index",
  "ui/components/registrar"
], function (e, t) {
  function o() {
    var e = r.resolve(n.serviceLocator.FEATURE_FLAGS);
    e.isFeatureOn(n.featureFlags.PSTN_ENABLED) && s.register(i);
  }
  var n = e("swx-constants").COMMON, r = e("swx-service-locator-instance").default, i = e("ui/components/commerce/index"), s = e("ui/components/registrar");
  t.init = function (e) {
    o();
    e();
  };
});

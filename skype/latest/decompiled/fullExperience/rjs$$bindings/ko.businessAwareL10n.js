define("bindings/ko.businessAwareL10n", [
  "require",
  "vendor/knockout",
  "swx-constants",
  "swx-service-locator-instance"
], function (e) {
  function i() {
    t.bindingHandlers.businessAwareL10n = {
      update: function (e, n, r, i, o) {
        var u = t.utils.unwrapObservable(n());
        if (s()) {
          var a = u.key;
          u.key = a + "_4b";
        }
        t.bindingHandlers.l10n.update(e, function () {
          return u;
        }, r, i, o);
      }
    };
  }
  function s() {
    return r.resolve(n.serviceLocator.FEATURE_FLAGS).isFeatureOn(n.featureFlags.USE_BUSINESS_WORDING);
  }
  var t = e("vendor/knockout"), n = e("swx-constants").COMMON, r = e("swx-service-locator-instance").default;
  return { register: i };
});

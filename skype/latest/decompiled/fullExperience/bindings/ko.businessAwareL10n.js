define("bindings/ko.businessAwareL10n", [
  "require",
  "vendor/knockout",
  "constants/common",
  "services/serviceLocator"
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
  var t = e("vendor/knockout"), n = e("constants/common"), r = e("services/serviceLocator");
  return { register: i };
})

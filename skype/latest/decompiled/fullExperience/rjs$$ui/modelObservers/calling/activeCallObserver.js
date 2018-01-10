define("ui/modelObservers/calling/activeCallObserver", [
  "require",
  "exports",
  "module",
  "swx-constants",
  "swx-service-locator-instance",
  "vendor/knockout"
], function (e, t) {
  function s() {
    function u(t) {
      e.isCallActive(t.length > 0);
    }
    var e = this, t, s, o;
    s = r.resolve(n.serviceLocator.FEATURE_FLAGS).isFeatureOn(n.featureFlags.DISABLE_CONCURRENT_ACTIVE_CALLS);
    o = r.resolve(n.serviceLocator.MODEL_UI_OBSERVER).conversationsCallStateObserver;
    e.isCallActive = i.observable(s && o.activeCalls().length > 0);
    e.dispose = function () {
      s && t.dispose();
    };
    s && (t = o.activeCalls.subscribe(u));
  }
  var n = e("swx-constants").COMMON, r = e("swx-service-locator-instance").default, i = e("vendor/knockout");
  t.build = function () {
    return new s();
  };
});

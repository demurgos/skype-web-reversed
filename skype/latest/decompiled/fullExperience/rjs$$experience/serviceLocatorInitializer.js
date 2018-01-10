define("experience/serviceLocatorInitializer", [
  "require",
  "exports",
  "module",
  "swx-service-locator",
  "swx-constants",
  "experience/featureFlags/api",
  "services/controls/controlsBuilder",
  "services/navigation/navigationContext",
  "ui/modelObservers/modelObserver",
  "services/pes/mruService",
  "services/pes/bingSearch/bingSearchService",
  "utils/common/cache/instance",
  "swx-giphy-service",
  "services/pes/config",
  "swx-pubsub-instance",
  "swx-service-locator-instance",
  "ui/viewModels/experience/splashScreen",
  "services/subscriptions/subscriptionProvider",
  "swx-utils-people",
  "services/pes/bingSearch/urlPreviewService",
  "ui/telemetry/actions/actionTelemetryApi",
  "services/store/pes/storeService",
  "ui/telemetry/telemetryClient",
  "ui/telemetry/identityTelemetry",
  "swx-local-storage",
  "browser/window"
], function (e, t) {
  function C(e) {
    return n.serviceLocatorBuilder().withServiceInstance(e, { name: N.SETTINGS }).withService({
      name: N.PUBSUB,
      build: function () {
        return p;
      }
    }).withService({
      name: N.FEATURE_FLAGS,
      build: function () {
        return new i(e);
      }
    }).buildSync(d);
  }
  function k(e, t) {
    var r, i = E.get(), s = !0;
    t && t.initParams && t.initParams.disableTelemetry === !0 && (s = !1);
    i.enabled(s);
    S.addIdentityToAllEvents(i);
    r = x.build({ serviceLocator: e });
    n.serviceLocatorBuilder().withServiceInstance(i, { name: N.TELEMETRY_MANAGER }).withServiceInstance(r, { name: N.LOCAL_STORAGE }).buildSync(d);
    l.set(r);
  }
  function L(e) {
    return n.serviceLocatorBuilder().withService({
      name: N.CONTROLS_BUILDER,
      build: function () {
        return new s();
      }
    }).withService({
      name: N.NAVIGATION_CONTEXT,
      build: function () {
        return new o();
      }
    }).withService({
      name: N.MODEL_UI_OBSERVER,
      build: function () {
        return u.build();
      }
    }).withService({
      name: N.SUBSCRIPTION_PROVIDER,
      build: function () {
        return new m();
      }
    }).withService({
      name: N.ACTION_TELEMETRY,
      build: function () {
        return b.build();
      }
    }).withService({
      name: N.PROGRESSIVE_TIMEOUT,
      build: function () {
        return new g(T);
      }
    }).withService({
      name: N.PES_BING_SEARCH_SERVICE,
      build: function () {
        return f.build();
      }
    }).withService({
      name: N.PES_GIPHY_SEARCH_SERVICE,
      build: function () {
        return c.build(e.pesSearchServices.giphy);
      }
    }).withService({
      name: N.URL_PREVIEW_SERVICE,
      build: function () {
        return y.build();
      }
    }).buildSync(d), n.serviceLocatorBuilder().withService({
      name: N.PES_MRU_SERVICE,
      build: function () {
        return a.build();
      }
    }).withService({
      name: N.PES_CONFIG_SERVICE,
      build: function () {
        return h.build();
      }
    }).withService({
      name: N.PES_STORE_SERVICE,
      build: function () {
        return w.build();
      }
    }).buildSync(d), n.serviceLocatorBuilder().withService({
      name: N.SPLASH_SCREEN,
      build: function () {
        return new v();
      }
    }).buildSync(d), d;
  }
  var n = e("swx-service-locator"), r = e("swx-constants").COMMON, i = e("experience/featureFlags/api"), s = e("services/controls/controlsBuilder"), o = e("services/navigation/navigationContext"), u = e("ui/modelObservers/modelObserver"), a = e("services/pes/mruService"), f = e("services/pes/bingSearch/bingSearchService"), l = e("utils/common/cache/instance"), c = e("swx-giphy-service"), h = e("services/pes/config"), p = e("swx-pubsub-instance").default, d = e("swx-service-locator-instance").default, v = e("ui/viewModels/experience/splashScreen"), m = e("services/subscriptions/subscriptionProvider"), g = e("swx-utils-people").progressiveTimeout.default, y = e("services/pes/bingSearch/urlPreviewService"), b = e("ui/telemetry/actions/actionTelemetryApi"), w = e("services/store/pes/storeService"), E = e("ui/telemetry/telemetryClient"), S = e("ui/telemetry/identityTelemetry"), x = e("swx-local-storage"), T = e("browser/window"), N = r.serviceLocator;
  t._registerAll = function (e) {
    return C(e), k(d, e), L(e);
  };
  t.registerDependencies = L;
  t.registerSharedServices = k;
  t.registerCoreServices = C;
});

define("experience/serviceLocatorInitializer", [
  "require",
  "exports",
  "module",
  "swx-service-locator",
  "constants/common",
  "experience/featureFlags/api",
  "services/controls/controlsBuilder",
  "services/navigation/navigationContext",
  "ui/modelObservers/modelObserver",
  "services/pes/mruService",
  "experience/settings",
  "services/pes.v2/mruService",
  "services/pes.v2/bingSearch/bingSearchService",
  "swx-giphy-service",
  "services/pes/config",
  "services/pes.v2/config",
  "services/pubSub/pubSub",
  "services/serviceLocator",
  "ui/viewModels/experience/splashScreen",
  "services/subscriptions/subscriptionProvider",
  "utils/people/progressiveTimeout",
  "services/pes.v2/bingSearch/urlPreviewService",
  "ui/telemetry/actions/actionTelemetryApi",
  "services/store/pes/storeService"
], function (e, t) {
  var n = e("swx-service-locator"), r = e("constants/common"), i = e("experience/featureFlags/api"), s = e("services/controls/controlsBuilder"), o = e("services/navigation/navigationContext"), u = e("ui/modelObservers/modelObserver"), a = e("services/pes/mruService"), f = e("experience/settings"), l = e("services/pes.v2/mruService"), c = e("services/pes.v2/bingSearch/bingSearchService"), h = e("swx-giphy-service"), p = e("services/pes/config"), d = e("services/pes.v2/config"), v = e("services/pubSub/pubSub"), m = e("services/serviceLocator"), g = e("ui/viewModels/experience/splashScreen"), y = e("services/subscriptions/subscriptionProvider"), b = e("utils/people/progressiveTimeout").classFunction, w = e("services/pes.v2/bingSearch/urlPreviewService"), E = e("ui/telemetry/actions/actionTelemetryApi"), S = e("services/store/pes/storeService");
  t.registerDependencies = function (e) {
    var t = e && e.settings || f, x = r.serviceLocator;
    return n.serviceLocatorBuilder().withService({
      name: x.PUBSUB,
      build: function () {
        return v;
      }
    }).withService({
      name: x.FEATURE_FLAGS,
      build: function () {
        return new i(t);
      }
    }).buildSync(m), n.serviceLocatorBuilder().withService({
      name: x.CONTROLS_BUILDER,
      build: function () {
        return new s();
      }
    }).withService({
      name: x.NAVIGATION_CONTEXT,
      build: function () {
        return new o();
      }
    }).withService({
      name: x.MODEL_UI_OBSERVER,
      build: function () {
        return u.build();
      }
    }).withService({
      name: x.SUBSCRIPTION_PROVIDER,
      build: function () {
        return new y();
      }
    }).withService({
      name: x.ACTION_TELEMETRY,
      build: function () {
        return E.build();
      }
    }).withService({
      name: x.PROGRESSIVE_TIMEOUT,
      build: function () {
        return new b();
      }
    }).withService({
      name: x.PES_MRU_SERVICE,
      build: function () {
        return a.build();
      }
    }).withService({
      name: x.PES_CONFIG_SERVICE,
      build: function () {
        return p.build();
      }
    }).withService({
      name: x.PES_BING_SEARCH_SERVICE,
      build: function () {
        return c.build();
      }
    }).withService({
      name: x.PES_GIPHY_SEARCH_SERVICE,
      build: function () {
        return h.build(t.pesSearchServices.giphy);
      }
    }).withService({
      name: x.URL_PREVIEW_SERVICE,
      build: function () {
        return w.build();
      }
    }).buildSync(m), n.serviceLocatorBuilder().withService({
      name: x.PES_2_MRU_SERVICE,
      build: function () {
        return l.build();
      }
    }).withService({
      name: x.PES_2_CONFIG_SERVICE,
      build: function () {
        return d.build();
      }
    }).withService({
      name: x.PES_STORE_SERVICE,
      build: function () {
        return S.build();
      }
    }).buildSync(m), n.serviceLocatorBuilder().withService({
      name: x.SPLASH_SCREEN,
      build: function () {
        return new g();
      }
    }).buildSync(m), m;
  };
});

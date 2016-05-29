define("experience/experience", [
  "require",
  "exports",
  "module",
  "helpers/polyfills",
  "lodash-compat",
  "usertiming",
  "browser/detect",
  "browser/window",
  "constants/common",
  "swx-enums",
  "cafe/applicationInstance",
  "jCafe",
  "experience/api/builder",
  "experience/componentsLoader",
  "experience/settings",
  "experience/telemetryFactory",
  "experience/koBindingsRegistrar",
  "notifications/init",
  "utils/calling/callingStack",
  "services/calling/autoCalling",
  "services/g11n/init",
  "services/i18n/init",
  "services/pes.v2/configSync",
  "services/serviceLocator",
  "experience/serviceLocatorInitializer",
  "utils/common/appVisibilityProvider",
  "utils/common/applicationFocusManager",
  "utils/common/applicationReactivationManager",
  "utils/common/activityReportManager",
  "utils/common/elementQueryHelper",
  "swx-utils-common",
  "swx-utils-common",
  "utils/common/prefetcher",
  "swx-utils-common",
  "telemetry/usage/inAppActivityTracker",
  "ui/telemetry/identityTelemetry",
  "ui/telemetry/telemetryClient",
  "ui/viewModels/calling/helpers/conversationTracker",
  "telemetry/errors/runtimeErrorsHandler",
  "ui/modalDialog/welcomeDialog",
  "utils/common/styleModeHelper"
], function (e, t) {
  function q() {
    var e = h.platformId, t = R(), n = h.biAppName;
    h.uiVersion = e + "/" + t + "//" + n;
    h.displayAppVersion && !F.get().isIntegratedProperty() && (document.title = "Skype " + t);
  }
  function R() {
    try {
      var e = h.version.split(".");
      return e.length < 4 ? e[0] + "." + e[1] + ".0." + e[2] : h.version;
    } catch (t) {
      return "0.0.0.0";
    }
  }
  function U(e, t) {
    var n = E.resolve(o.serviceLocator.PUBSUB);
    n.publish(o.events.system.EXPERIENCE_INITIALIZED, {
      configLoadDuration: e.configLoadDuration,
      packageLoadDuration: e.packageLoadDuration,
      experienceInitializeDuration: t.duration()
    });
    r.mark(I.EXPERIENCE.TTL_START);
  }
  function z() {
    var e = P.get(), t;
    D.addIdentityToAllEvents(e);
    t = f.Application.create({
      settings: h,
      telemetryManager: e
    });
    a.set(t);
  }
  function W() {
    var e = {};
    return e.serviceLocatorInitializer = S.registerDependencies({ settings: h }), e.initApplication = z(), e.overrideSettings = Q(), e.runtimeErrorsHandler = B.init(), e.instrumentTelemetryEvents = K(), e.loadCss = et(), e.initCallingStack = $(), e.initAutoCalling = J(), e.prefetcher = O.prefetchAssets(), e.appVisibilityProvider = x.init(), e.inAppActivityTracker = _.init(a.get().signInManager), e.appReactivationManager = N.init(), e.activityReportManager = C.init(), e.elementQueryHelper = k.initialiseSelectors(), e.notifications = v.init(), e.conversationTracker = H.init(), e.welcomeDialog = j.init(), e.subscribeVisibilityProvider = it(), e.loadYoutubePlayerAPI = Z(), e.initTranslatorService = G(), e.initUserPreferences = Y(), e;
  }
  function X(e) {
    n.merge(h, e.config);
    n.merge(h.initParams, e.initParams);
    [
      "locale",
      "variant"
    ].forEach(function (e) {
      h.initParams[e] = h.initParams[e].toLowerCase();
    });
    h.sessionId = L.create();
    V();
  }
  function V() {
    var e = i.getBrowserInfo();
    e.isShellApp && (h.mode = undefined, h.featureFlags.showSplashScreen = !1, h.isPollingEnabled = !1);
  }
  function $() {
    m.init(h);
  }
  function J() {
    g.init();
  }
  function K() {
    var e = p.build();
    e.init("experience");
    e.init("people");
  }
  function Q() {
    var e = i.getBrowserInfo(), t = E.resolve(o.serviceLocator.FEATURE_FLAGS);
    if (t.isFeatureOn(o.featureFlags.URL_OVERRIDE_ENABLED)) {
      var n = e.getUrlParams();
      n.locale && (h.initParams.locale = n.locale.toLowerCase());
      n.variant && (h.initParams.variant = n.variant.toLowerCase());
    }
  }
  function G() {
    var e = a.get().translatorService;
    return e ? new Promise(function (e) {
      a.get().signInManager.state.once(u.loginState.SignedIn, e);
    }).then(function () {
      return e.supportedLanguages.get();
    }) : Promise.resolve();
  }
  function Y() {
    var e, t;
    return e = new Promise(function (e) {
      function t() {
        n.unsubscribe(o.apiUIEvents.SWX_TIMELINE_LOADED, t);
        e();
      }
      var n = E.resolve(o.serviceLocator.PUBSUB);
      n.subscribe(o.apiUIEvents.SWX_TIMELINE_LOADED, t);
    }), t = new Promise(function (e) {
      a.get().signInManager.state.once(u.loginState.SignedIn, e);
    }), Promise.all([
      e,
      t
    ]).then(function () {
      var e = a.get().personsAndGroupsManager.mePerson.preferences(), t = n.map(e, function (e) {
          return e.value.get();
        });
      return Promise.all(t);
    });
  }
  function Z() {
    var e = E.resolve(o.serviceLocator.FEATURE_FLAGS);
    (e.isFeatureOn(o.featureFlags.YOUTUBE_PLAYER_ENABLED) || e.isFeatureOn(o.featureFlags.URL_PREVIEW_LOAD_YOUTUBE_PLAYER)) && A.loadScript(h.youtubeApiUrl);
  }
  function et() {
    var e = h.assetsBaseUrl, t = h.appBaseUrl;
    A.loadStyle(e + "/css/common.css");
    A.loadStyle(t + "/css/swx.css");
  }
  function tt() {
    var e = i.getBrowserInfo(), t = E.resolve(o.serviceLocator.FEATURE_FLAGS);
    return t.isFeatureOn(o.featureFlags.FAIL_INITIALIZATION_FOR_IE_AND_EDGE) && (e.isEdge || e.isIeEngine);
  }
  function nt() {
    rt();
    a.get()._standbyMode && a.get()._standbyMode(!1);
  }
  function rt() {
    T.focusTrackingEnabled = !0;
  }
  function it() {
    var e = E.resolve(o.serviceLocator.PUBSUB);
    e.subscribe(o.apiUIEvents.SWX_TIMELINE_LOADED, nt);
  }
  e("helpers/polyfills");
  var n = e("lodash-compat"), r = e("usertiming"), i = e("browser/detect"), s = e("browser/window"), o = e("constants/common"), u = e("swx-enums"), a = e("cafe/applicationInstance"), f = e("jCafe"), l = e("experience/api/builder"), c = e("experience/componentsLoader"), h = e("experience/settings"), p = e("experience/telemetryFactory"), d = e("experience/koBindingsRegistrar"), v = e("notifications/init"), m = e("utils/calling/callingStack"), g = e("services/calling/autoCalling"), y = e("services/g11n/init"), b = e("services/i18n/init"), w = e("services/pes.v2/configSync"), E = e("services/serviceLocator"), S = e("experience/serviceLocatorInitializer"), x = e("utils/common/appVisibilityProvider"), T = e("utils/common/applicationFocusManager"), N = e("utils/common/applicationReactivationManager"), C = e("utils/common/activityReportManager"), k = e("utils/common/elementQueryHelper"), L = e("swx-utils-common").guid, A = e("swx-utils-common").loader, O = e("utils/common/prefetcher"), M = e("swx-utils-common").stopwatch, _ = e("telemetry/usage/inAppActivityTracker"), D = e("ui/telemetry/identityTelemetry"), P = e("ui/telemetry/telemetryClient"), H = e("ui/viewModels/calling/helpers/conversationTracker"), B = e("telemetry/errors/runtimeErrorsHandler"), j = e("ui/modalDialog/welcomeDialog"), F = e("utils/common/styleModeHelper"), I = o.telemetry.performanceMarks;
  s._perfRefForUserTimingPolyfill = s.performance;
  t.init = function (t, n, r) {
    function f() {
      U(t, i);
    }
    function p() {
      n(l.get());
    }
    function v() {
      var e = E.resolve(o.serviceLocator.PUBSUB);
      e.publish(o.events.system.EXPERIENCE_READY);
      a.get().signInManager.state.once(u.loginState.SignedIn, function () {
        w.init();
      });
    }
    var i = M.build(), s;
    return X(t), q(), s = W(), tt() ? (r("Failing initialize for IE and Edge enabled"), s.everything = Promise.reject(), s) : (s.i18nInit = Promise.all([
      y.init(h),
      b.init(h, document.documentElement)
    ]), s.componentsLoaderInit = s.i18nInit.then(function () {
      return Promise.all([c.init()]);
    }), s.componentsReady = s.componentsLoaderInit.then(f), s.apiReady = s.componentsReady.then(p), s.experienceReady = s.apiReady.then(v), s.everything = s.experienceReady.catch(function (e) {
      return r(e), Promise.reject(e);
    }), d.registerBindings(), s);
  };
  s.Skype && s.Skype.onExperienceLoaded && s.Skype.onExperienceLoaded(t);
});

define("experience/experience", [
  "require",
  "exports",
  "module",
  "swx-polyfill-initializer",
  "lodash-compat",
  "usertiming",
  "swx-browser-detect",
  "browser/window",
  "swx-constants",
  "swx-enums",
  "swx-cafe-application-instance",
  "jCafe",
  "experience/api/builder",
  "experience/componentsLoader",
  "experience/settings",
  "services/telemetry/common/telemetry",
  "services/telemetry/experience.instrumentation",
  "experience/koBindingsRegistrar",
  "notifications/init",
  "swx-util-calling-stack",
  "services/calling/autoCalling",
  "services/g11n/init",
  "services/i18n/init",
  "services/pes/configSync",
  "swx-service-locator-instance",
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
  "telemetry/errors/runtimeErrorsHandler",
  "ui/modalDialog/welcomeDialog",
  "utils/common/styleModeHelper",
  "experience/welcomeExperience",
  "ui/viewModels/chat/messageParsers/swift/utils"
], function (e, t) {
  function q() {
    var e = h.platformId, t = R(), n = h.biAppName;
    h.uiVersion = e + "/" + t + "//" + n;
    h.displayAppVersion && !B.get().isIntegratedProperty() && (document.title = "Skype " + t);
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
    var n = S.resolve(o.serviceLocator.PUBSUB);
    n.publish(o.events.system.EXPERIENCE_INITIALIZED, {
      configLoadDuration: e.configLoadDuration,
      packageLoadDuration: e.packageLoadDuration,
      experienceInitializeDuration: t.duration()
    });
    r.mark(I.EXPERIENCE.TTL_START);
  }
  function z() {
    var e = n.pick(S, o.serviceLocator.SETTINGS, o.serviceLocator.TELEMETRY_MANAGER, o.serviceLocator.LOCAL_STORAGE), t = f.Application.create(e);
    a.set(t);
  }
  function W() {
    var e = {};
    return e.coreServices = x.registerCoreServices(h), e.sharedServices = x.registerSharedServices(S, h), e.initApplication = z(), e.overrideSettings = G(), e.registeredServices = x.registerDependencies(h), e.runtimeErrorsHandler = P.init(), e.instrumentTelemetryEvents = Q(), e.loadCss = rt(), e.initCallingStack = J(), e.initAutoCalling = K(), e.prefetcher = M.prefetchAssets(), e.appVisibilityProvider = T.init(), e.inAppActivityTracker = D.init(a.get().signInManager), e.appReactivationManager = C.init(), e.activityReportManager = k.init(), e.elementQueryHelper = L.initialiseSelectors(), e.notifications = m.init(), e.welcomeDialog = H.init(), e.subscribeVisibilityProvider = ut(), e.initTranslatorService = Y(), e.initUserPreferences = Z(), e.initWelcomeExperience = j.init(), F.setSupportedSwiftCardTypes(), e;
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
    h.sessionId = A.create();
    V();
    $();
  }
  function V() {
    function n() {
      h.featureFlags.calling = !1;
      h.featureFlags.PSTN = !1;
      h.supportsAudio = !1;
      h.supportsVideo = !1;
    }
    var e = i.getBrowserInfo(), t = i.getSystemInfo();
    e.isShellApp && (h.mode = undefined, h.featureFlags.showSplashScreen = !1, h.isPollingEnabled = !1);
    !h.featureFlags.pluginlessPSTNCalling && e.browserName === i.BROWSERS.EDGE && e.browserMajorVersion > 13 && (h.featureFlags.PSTN = !1);
    e.browserName === i.BROWSERS.EDGE && e.browserMajorVersion > 13 && (h.featureFlags.outgoingScreenSharing = !1);
    !h.featureFlags.pluginlessPSTNCalling && t.osName === i.OPERATING_SYSTEMS.LINUX && (h.featureFlags.PSTN = !1);
    t.osName === i.OPERATING_SYSTEMS.LINUX && (h.featureFlags.outgoingScreenSharing = !1);
    t.osName === i.OPERATING_SYSTEMS.MACOSX && e.browserName === i.BROWSERS.CHROME && (h.featureFlags.copySelectionAsQuoteKeyboard = !1);
    e.browserName === i.BROWSERS.MSIE && h.featureFlags.disableCallingOnIE && n();
    e.browserName === i.BROWSERS.EDGE && h.featureFlags.disableCallingOnEdge && n();
    e.browserName === i.BROWSERS.CHROME && h.featureFlags.disableCallingOnChrome && n();
    e.browserName === i.BROWSERS.FIREFOX && h.featureFlags.disableCallingOnFirefox && n();
    e.browserName === i.BROWSERS.SAFARI && h.featureFlags.disableCallingOnSafari && n();
  }
  function $() {
    function e(e) {
      return e < 10 ? "0" + e : e;
    }
    var t = new Date().getTimezoneOffset();
    h.utcOffset = t < 0 ? "-" : "+";
    t *= t < 0 ? -1 : 1;
    h.utcOffset += e(Math.floor(t / 60));
    h.utcOffset += ":";
    h.utcOffset += e(t % 60);
  }
  function J() {
    g.init(h);
  }
  function K() {
    y.init();
  }
  function Q() {
    p.instrumentAllEvents(d);
  }
  function G() {
    var e = i.getBrowserInfo(), t = S.resolve(o.serviceLocator.FEATURE_FLAGS);
    if (t.isFeatureOn(o.featureFlags.URL_OVERRIDE_ENABLED)) {
      var n = e.getUrlParams();
      n.locale && (h.initParams.locale = n.locale.toLowerCase());
      n.variant && (h.initParams.variant = n.variant.toLowerCase());
    }
  }
  function Y() {
    var e = a.get().translatorService;
    return e ? new Promise(function (e) {
      a.get().signInManager.state.once(u.loginState.SignedIn, e);
    }).then(function () {
      return e.supportedLanguages.get();
    }) : Promise.resolve();
  }
  function Z() {
    var e = S.resolve(o.serviceLocator.FEATURE_FLAGS);
    return e.isFeatureOn(o.featureFlags.INIT_PREFERENCES_AFTER_SIGNIN) ? tt() : et();
  }
  function et() {
    var e, t;
    return e = new Promise(function (e) {
      function t() {
        n.unsubscribe(o.apiUIEvents.SWX_TIMELINE_LOADED, t);
        nt();
        e();
      }
      var n = S.resolve(o.serviceLocator.PUBSUB);
      n.subscribe(o.apiUIEvents.SWX_TIMELINE_LOADED, t);
    }), t = new Promise(function (e) {
      a.get().signInManager.state.once(u.loginState.SignedIn, e);
    }), Promise.all([
      e,
      t
    ]).then(function () {
      var e = a.get().personsAndGroupsManager.mePerson.preferences(), t = n.map(e, function (e) {
          return e.value.get.enabled() ? e.value.get() : Promise.resolve();
        });
      return Promise.all(t).then(function () {
        m.update();
      });
    });
  }
  function tt() {
    return new Promise(function (e) {
      a.get().signInManager.state.once(u.loginState.SignedIn, e);
    }).then(function () {
      function e() {
        i.unsubscribe(o.apiUIEvents.SWX_TIMELINE_LOADED, e);
        nt();
      }
      var t = a.get().personsAndGroupsManager.mePerson.preferences(), r = n.map(t, function (e) {
          return e.value.get.enabled() ? e.value.get() : Promise.resolve();
        }), i = S.resolve(o.serviceLocator.PUBSUB);
      return i.subscribe(o.apiUIEvents.SWX_TIMELINE_LOADED, e), Promise.all(r).then(function () {
        m.update();
      });
    });
  }
  function nt() {
    var e = S.resolve(o.serviceLocator.FEATURE_FLAGS);
    (e.isFeatureOn(o.featureFlags.YOUTUBE_PLAYER_ENABLED) || e.isFeatureOn(o.featureFlags.URL_PREVIEW_LOAD_YOUTUBE_PLAYER)) && O.loadScript(h.youtubeApiUrl);
  }
  function rt() {
    var e = h.assetsBaseUrl, t = h.appBaseUrl;
    O.loadStyle(e + "/css/common.css");
    O.loadStyle(t + "/css/swx.css");
  }
  function it() {
    var e = i.getBrowserInfo(), t = S.resolve(o.serviceLocator.FEATURE_FLAGS);
    return t.isFeatureOn(o.featureFlags.FAIL_INITIALIZATION_FOR_IE_AND_EDGE) && (e.isEdge || e.isIeEngine);
  }
  function st() {
    ot();
    a.get()._standbyMode && a.get()._standbyMode(!1);
  }
  function ot() {
    N.focusTrackingEnabled = !0;
  }
  function ut() {
    var e = S.resolve(o.serviceLocator.PUBSUB);
    e.subscribe(o.apiUIEvents.SWX_TIMELINE_LOADED, st);
  }
  e("swx-polyfill-initializer");
  var n = e("lodash-compat"), r = e("usertiming"), i = e("swx-browser-detect").default, s = e("browser/window"), o = e("swx-constants").COMMON, u = e("swx-enums"), a = e("swx-cafe-application-instance"), f = e("jCafe"), l = e("experience/api/builder"), c = e("experience/componentsLoader"), h = e("experience/settings"), p = e("services/telemetry/common/telemetry"), d = e("services/telemetry/experience.instrumentation"), v = e("experience/koBindingsRegistrar"), m = e("notifications/init"), g = e("swx-util-calling-stack"), y = e("services/calling/autoCalling"), b = e("services/g11n/init"), w = e("services/i18n/init"), E = e("services/pes/configSync"), S = e("swx-service-locator-instance").default, x = e("experience/serviceLocatorInitializer"), T = e("utils/common/appVisibilityProvider"), N = e("utils/common/applicationFocusManager"), C = e("utils/common/applicationReactivationManager"), k = e("utils/common/activityReportManager"), L = e("utils/common/elementQueryHelper"), A = e("swx-utils-common").guid, O = e("swx-utils-common").loader, M = e("utils/common/prefetcher"), _ = e("swx-utils-common").stopwatch, D = e("telemetry/usage/inAppActivityTracker"), P = e("telemetry/errors/runtimeErrorsHandler"), H = e("ui/modalDialog/welcomeDialog"), B = e("utils/common/styleModeHelper"), j = e("experience/welcomeExperience"), F = e("ui/viewModels/chat/messageParsers/swift/utils"), I = o.telemetry.performanceMarks;
  s._perfRefForUserTimingPolyfill = s.performance;
  t.init = function (t, n, r) {
    function f() {
      U(t, i);
    }
    function p() {
      n(l.get());
    }
    function d() {
      var e = S.resolve(o.serviceLocator.PUBSUB);
      e.publish(o.events.system.EXPERIENCE_READY);
      a.get().signInManager.state.once(u.loginState.SignedIn, function () {
        E.init();
      });
    }
    var i = _.build(), s;
    return X(t), q(), s = W(), it() ? (r("Failing initialize for IE and Edge enabled"), s.everything = Promise.reject(), s) : (s.i18nInit = Promise.all([
      b.init(h),
      w.init(h, document.documentElement)
    ]), s.componentsLoaderInit = s.i18nInit.then(function () {
      return Promise.all([c.init()]);
    }), s.componentsReady = s.componentsLoaderInit.then(f), s.apiReady = s.componentsReady.then(p), s.experienceReady = s.apiReady.then(d), s.everything = s.experienceReady.catch(function (e) {
      return r(e), Promise.reject(e);
    }), v.registerBindings(), s);
  };
});

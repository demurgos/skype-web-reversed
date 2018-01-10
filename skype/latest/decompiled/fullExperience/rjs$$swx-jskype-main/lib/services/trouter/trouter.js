(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/trouter/trouter", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "swx-client-info",
      "ecs-client",
      "../electron",
      "jcafe-property-model",
      "../serviceAccessLayer/requestDispatcher",
      "swx-log-tracer",
      "swx-trouter-manager",
      "swx-browser-detect",
      "swx-constants",
      "swx-utils-common",
      "jskype-settings-instance",
      "swx-enums"
    ], e);
}(function (e, t) {
  function v() {
    return p.isFeatureOn(c.COMMON.featureFlags.NG_CALLING) ? p.settings.incomingCalls.pnhNGCTemplate : p.settings.incomingCalls.pnhTemplate;
  }
  function m() {
    var e = p.settings.version.split(".", 4);
    while (e.length < 4)
      e.push("0");
    return e[3] = e[2], e[2] = p.settings.ecsClientCobrandTag, p.settings.platformId + "_" + e.join(".");
  }
  function g() {
    return new Promise(function (e, t) {
      n.get().personsAndGroupsManager.mePerson.id.get().then(function (n) {
        var r = {
          clientName: d.ecsClientNames.Skype,
          clientVersion: m(),
          endpoints: p.settings.incomingCalls.trouterTelemetryEnvironment,
          teamName: p.settings.ecsTrouterKey,
          userId: n,
          requestTimeout: 3000
        };
        i.fetchConfig(r, e, t);
      }, function () {
        t();
      });
    });
  }
  function y() {
    return n.get().signInManager.state() === d.loginState.SignedIn ? n.get().signInManager._skypeToken() : Promise.reject("User currently not signed in, can not fetch token");
  }
  function b() {
    var e = a.getLogger("Trouter"), t = {
        log: e.log,
        info: e.info,
        error: e.warn,
        debug: e.debug,
        warn: e.warn
      };
    return t;
  }
  function w() {
    return {
      registrationId: h.guid.create(),
      registrarServiceUrl: p.settings.incomingCalls.registrarServiceUrl,
      registrarTtlInSeconds: p.settings.incomingCalls.registrarTtlInSeconds,
      maxRegistrationTimeInMs: p.settings.incomingCalls.maxRegistrationTimeInMs,
      registrarRefreshTimeoutInMs: p.settings.incomingCalls.registrarRefreshTimeoutInMs,
      pnhAppId: p.settings.incomingCalls.pnhAppId,
      pnhTemplate: v(),
      platform: l["default"].getBrowserInfo().browserName,
      platformUIVersion: r.getBIVersion(),
      trouterServiceUrl: p.settings.incomingCalls.trouterServiceUrl,
      tpcServiceUrl: p.settings.incomingCalls.tpcServiceUrl,
      version: p.settings.version,
      trouterReadyTimeoutInMs: p.settings.incomingCalls.trouterReadyTimeoutInMs,
      hostTelemetryTenantToken: p.settings.telemetry.jSkypeTenantToken,
      trouterConnectTimeoutInMs: p.settings.incomingCalls.trouterConnectTimeoutInMs,
      productName: p.settings.productName,
      sessionId: p.settings.sessionId,
      environment: p.settings.environment,
      trouterUrl: t.trouterUrl
    };
  }
  function E() {
    return {
      getSkypeToken: y,
      logger: b(),
      requestDispatcher: u,
      customRegistrationProvider: l["default"].getBrowserInfo().isElectron ? s : null,
      sendTelemetryEvent: n.get()._telemetryManager.sendEvent
    };
  }
  function S(e) {
    return {
      eventLogger: n.get()._telemetryManager._getLogger(p.settings.telemetry.trouterTenantToken),
      eventFactory: n.get()._telemetryManager._getEventProperties,
      settings: e
    };
  }
  function x(e) {
    var t = {
      trouterSettings: w(),
      actions: E(),
      telemetryConfig: S(e)
    };
    return f.initialize(t);
  }
  function T() {
    return g().then(function (e) {
      return x(e);
    }, function () {
      return x(null);
    });
  }
  function N(e) {
    f.registerMessageHandler(e);
  }
  function C() {
    f.stop();
  }
  function k() {
    return f.getTrouterUrlAsync();
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("swx-client-info"), i = e("ecs-client"), s = e("../electron"), o = e("jcafe-property-model"), u = e("../serviceAccessLayer/requestDispatcher"), a = e("swx-log-tracer"), f = e("swx-trouter-manager"), l = e("swx-browser-detect"), c = e("swx-constants"), h = e("swx-utils-common"), p = e("jskype-settings-instance"), d = e("swx-enums");
  t.trouterUrl = o.property({ value: null });
  t.initialize = T;
  t.registerMessageHandler = N;
  t.stop = C;
  t.getTrouterUrlAsync = k;
}));

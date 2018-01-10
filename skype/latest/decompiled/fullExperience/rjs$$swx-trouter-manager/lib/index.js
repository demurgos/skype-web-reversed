(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-trouter-manager/lib/index", [
      "require",
      "exports",
      "swx-registrar",
      "swx-trouter",
      "swx-browser-globals"
    ], e);
}(function (e, t) {
  function g() {
    var e = i.getWindow();
    l = e.setTimeout(w.bind(null, s.TROUTER_READY_TIMEOUT), v.trouterSettings.trouterReadyTimeoutInMs);
  }
  function y() {
    var e = i.getWindow();
    e.clearTimeout(l);
  }
  function b(e) {
    var t = [];
    for (var n = 1; n < arguments.length; n++)
      t[n - 1] = arguments[n];
    return t.forEach(function (t) {
      for (var n in t)
        t.hasOwnProperty(n) && (e[n] = t[n]);
    }), e;
  }
  function w(e, t) {
    var n = {
      type: e,
      registrationId: v.trouterSettings.registrationId
    };
    o && o.getServerState() && (n.connectionId = o.getServerState().connectionId, n.connectedClientId = o.getServerState().connectedClientId);
    b(n, t);
    v.actions.sendTelemetryEvent(v.trouterSettings.hostTelemetryTenantToken, s.TROUTER_INIT, n);
  }
  function E() {
    return new Date().getTime();
  }
  function S(e) {
    return Math.ceil((E() - e) / 1000);
  }
  function x() {
    o.subscribe("AUTH_SUCCESS", function (e) {
      p = E();
      y();
      g();
      w(s.AUTHENTICATION_SUCCEEDED);
      m = 0;
    });
    o.subscribe("AUTH_FAILURE", k);
    o.subscribe("AUTH", L);
    o.subscribe("RECONNECTING", N);
    o.subscribe("DISCONNECTED", T);
    o.subscribe("READY", function (e) {
      v.actions.logger.log("[Trouter event] ready");
      var t = {};
      y();
      t.isNewUrl = e.isNewUrl;
      e.isNewUrl ? (t.authenticatedToReadyTime = S(p), v.trouterSettings.trouterUrl(e.url)) : t.reconnectingToReadyTime = S(h);
      f && (t.initToReadyTime = S(c), f = !1);
      w(s.TROUTER_READY_EVENT, t);
    });
    o.subscribe("TROUTER_URL_CHANGED", function (e) {
      A(e.url);
    });
    o.start();
  }
  function T() {
    v.trouterSettings.trouterUrl(null);
  }
  function N() {
    v.actions.logger.log("[Trouter event] reconnecting");
    h = E();
    w(s.TROUTER_RECONNECTING);
  }
  function C() {
    var e = i.getWindow();
    e.setTimeout(function () {
      o.start();
    }, Math.min(Math.pow(2, m) * 1000, 600000));
    m++;
  }
  function k(e) {
    v.actions.logger.log("[Trouter event] authentication failed");
    var t;
    e && (t = {
      tpcFailureCode: e.status,
      tpcFailureText: e.statusText,
      tpcFailureMessage: e.responseText
    });
    w(s.AUTHENTICATION_FAILED, t);
    e.status === 401 ? (v.actions.logger.log("[Trouter event] Handling authentication failure, getting new skype token"), v.actions.getSkypeToken(!0).then(function () {
      C();
    })) : (v.actions.logger.log("[Trouter event] Handling authentication failure, restarting trouter"), C());
  }
  function L() {
    v.actions.logger.log("[Trouter event] auth required");
    w(s.TROUTER_AUTH_EVENT);
  }
  function A(e) {
    u.registerEndpoint(e, v.trouterSettings.registrationId);
  }
  function O(e) {
    v.actions.logger.log("[Trouter event] endpoint registered");
    var t = {}, n = e ? s.RENEWAL : s.NEW_CONNECTION;
    a && (t.initToRegisteredTime = S(c), a = !1);
    w(n, t);
  }
  function M(e) {
    v.actions.logger.log("[Trouter event] endpoint registration failed");
    var t;
    e && (t = {
      registrarFailureCode: e.status,
      registrarFailureMessage: e.responseText
    });
    w(s.ENDPOINT_REGISTRATION_FAILED, t);
  }
  function _(e) {
    return v = e, o = r.build({
      settings: {
        trouterServiceUrl: v.trouterSettings.trouterServiceUrl,
        tpcServiceUrl: v.trouterSettings.tpcServiceUrl,
        connectTimeout: v.trouterSettings.trouterConnectTimeoutInMs,
        version: v.trouterSettings.version,
        userAgent: v.trouterSettings.productName,
        correlationId: v.trouterSettings.sessionId,
        environment: v.trouterSettings.environment,
        eventLogger: v.telemetryConfig.eventLogger,
        eventFactory: v.telemetryConfig.eventFactory
      },
      skypetokenProvider: v.actions.getSkypeToken,
      requestDispatcherProvider: v.actions.requestDispatcher,
      telemetryConfig: v.telemetryConfig.settings,
      logProvider: v.actions.logger
    }), u = n.build({
      settings: {
        registrarServiceUrl: v.trouterSettings.registrarServiceUrl,
        registrarTtlInSeconds: v.trouterSettings.registrarTtlInSeconds,
        maxRegistrationTimeInMs: v.trouterSettings.maxRegistrationTimeInMs,
        registrarRefreshTimeoutInMs: v.trouterSettings.registrarRefreshTimeoutInMs,
        pnhAppId: v.trouterSettings.pnhAppId,
        pnhTemplate: v.trouterSettings.pnhTemplate,
        platform: v.trouterSettings.platform,
        platformUIVersion: v.trouterSettings.platformUIVersion
      },
      skypetokenProvider: v.actions.getSkypeToken,
      requestDispatcherProvider: v.actions.requestDispatcher,
      onRegistrationSuccess: O,
      onRegistrationError: M,
      logProvider: v.actions.logger,
      customRegistrationProvider: v.actions.customRegistrationProvider
    }), d.length > 0 && d.forEach(o.registerMessageHandler), {
      start: x,
      registerMessageHandler: o.registerMessageHandler
    };
  }
  function D(e) {
    o ? o.registerMessageHandler(e) : d.push(e);
  }
  function P() {
    o && o.stop();
    u && u.unregisterEndpoint(v.trouterSettings.registrationId);
  }
  function H() {
    return o ? o.getTrouterUrlAsync() : Promise.reject(new Error("trouterServiceInstance is not yet initialized"));
  }
  var n = e("swx-registrar"), r = e("swx-trouter"), i = e("swx-browser-globals"), s = {
      AUTHENTICATION_SUCCEEDED: "authenticationSucceeded",
      AUTHENTICATION_FAILED: "authenticationFailed",
      TROUTER_INIT: "trouterinit",
      TROUTER_READY_EVENT: "trouterReadyEvent",
      TROUTER_READY_TIMEOUT: "trouterReadyTimeout",
      TROUTER_AUTH_EVENT: "trouterAuthEvent",
      TROUTER_RECONNECTING: "trouterReconnecting",
      RENEWAL: "renewal",
      NEW_CONNECTION: "newConnection",
      ENDPOINT_REGISTRATION_FAILED: "endpointRegistrationFailed"
    }, o, u, a, f, l, c, h, p, d = [], v, m = 0;
  t.initialize = _;
  t.registerMessageHandler = D;
  t.stop = P;
  t.getTrouterUrlAsync = H;
}));

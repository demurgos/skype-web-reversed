define("jSkype/services/trouter/trouter", [
  "require",
  "jcafe-property-model",
  "jSkype/client",
  "swx-utils-common",
  "trouter-client",
  "jSkype/settings",
  "jSkype/services/trouter/registrar",
  "constants/common",
  "jSkype/services/trouter/requestBuilder",
  "lodash-compat"
], function (e) {
  function T(e) {
    var t = {}, n = e ? u.telemetry.trouter.RENEWAL : u.telemetry.trouter.NEW_CONNECTION;
    v && (t.initToRegisteredTime = z(w), v = !1), q(n, t);
  }
  function N() {
    d = !1, q(u.telemetry.trouter.AUTHENTICATION_FAILED);
  }
  function C() {
    d = !1, q(u.telemetry.trouter.ENDPOINT_REGISTRATION_FAILED);
  }
  function k(e, t) {
    var n = {};
    I();
    if (t) {
      var r = g.getServerState().surl;
      p = o.build(y, T, C), p.registerPresence(r), x(r);
    }
    n.isNewUrl = t, t ? n.authenticatedToReadyTime = z(S) : n.reconnectingToReadyTime = z(E), m && (n.initToReadyTime = z(w), m = !1), q(u.telemetry.trouter.TROUTER_READY_EVENT, n);
  }
  function L(e, t) {
    q(u.telemetry.trouter.TROUTER_AUTH_EVENT), a.authenticateUrl(e).then(function (e) {
      q(u.telemetry.trouter.AUTHENTICATION_SUCCEEDED), S = U(), F(), t(e.response);
    }, N);
  }
  function A(e, t) {
    var n = D(e), r = M(n);
    _(t, r.resultCode);
  }
  function O() {
    E = U(), q(u.telemetry.trouter.TROUTER_RECONNECTING);
  }
  function M(e) {
    var t;
    for (var n = 0; n < h.length; n++) {
      t = P(h[n], e);
      if (t.isHandled === !0)
        return t;
    }
    return {
      isHandled: !1,
      resultCode: l
    };
  }
  function _(e, t) {
    e.writeHead(t), e.end();
  }
  function D(e) {
    var t = JSON.parse(e.body);
    return {
      eventId: t.evt ? t.evt : null,
      url: e.url,
      body: t
    };
  }
  function P(e, t) {
    try {
      return e.handleMessage(t);
    } catch (n) {
      return {
        isHandled: !0,
        resultCode: c
      };
    }
  }
  function H() {
    if (d === !0)
      throw new Error("Trouter session already started. You are calling start twice");
    d = !0, v = !0, m = !0, w = U(), y = r.create(), g = i.createServer(null, {
      clientInfo: {
        ua: s.settings.productName,
        v: s.settings.version
      },
      ioOptions: {
        requireMtls: !0,
        "connect timeout": s.settings.incomingCalls.trouterConnectTimeoutInMs
      }
    }), g.on("ready", k), g.on("auth", L), g.on("request", A), g.on("reconnecting", O), g.open(s.settings.incomingCalls.trouterServiceUrl);
  }
  function B() {
    d = !1, g && g.close();
  }
  function j(e) {
    if (e === null)
      throw new Error("Cannot register a null handler.");
    if (!e.handleMessage)
      throw new Error("Cannot register a handler which does not conform to the API. Must have a handleMessage function");
    h.forEach(function (t) {
      if (t === e)
        throw new Error("Registering the same handler twice is not allowed");
    }), h.push(e);
  }
  function F() {
    b = f.delay(q.bind(null, u.telemetry.trouter.TROUTER_READY_TIMEOUT), s.settings.incomingCalls.trouterReadyTimeoutInMs);
  }
  function I() {
    clearTimeout(b);
  }
  function q(e, t) {
    var r = {
      type: e,
      registrationId: y
    };
    g && g.getServerState() && (r.connectionId = g.getServerState().connectionId, r.connectedClientId = g.getServerState().connectedClientId), f.extend(r, t), n.get()._telemetryManager.sendEvent(s.settings.telemetry.jSkypeTenantToken, u.telemetry.trouter.TROUTER_INIT, r);
  }
  function R() {
    h = [];
  }
  function U() {
    return +new Date();
  }
  function z(e) {
    return parseInt((U() - e) / 1000, 10);
  }
  var t = e("jcafe-property-model"), n = e("jSkype/client"), r = e("swx-utils-common").guid, i = e("trouter-client"), s = e("jSkype/settings"), o = e("jSkype/services/trouter/registrar"), u = e("constants/common"), a = e("jSkype/services/trouter/requestBuilder"), f = e("lodash-compat"), l = 400, c = 500, h = [], p, d = !1, v, m, g, y, b, w, E, S, x = t.property({ value: null });
  return {
    start: H,
    stop: B,
    registerMessageHandler: j,
    clearMessageHandlers: R,
    trouterUrl: x
  };
})

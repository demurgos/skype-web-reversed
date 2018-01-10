define("experience/api/authentication", [
  "require",
  "swx-cafe-application-instance",
  "swx-constants",
  "experience/settings",
  "experience/api/auth/linking",
  "experience/api/error",
  "telemetry/authentication/signIn",
  "telemetry/authentication/setAuthProvider",
  "experience/api/auth/authEventHandler",
  "experience/authContext",
  "swx-service-locator-instance",
  "lodash-compat",
  "swx-pubsub-instance",
  "swx-enums"
], function (e) {
  function E() {
    y = !0;
    a.init();
  }
  function S() {
    y = !1;
    a.destroy();
  }
  function x(e) {
    if (c.isFunction(e))
      try {
        e.apply(null, [].slice.call(arguments, 1));
      } catch (t) {
      }
  }
  function T(e, t, n) {
    function s() {
      _(i, e, r);
      x(t);
    }
    function o(t) {
      _(i, e, r, t);
      x(n, t);
    }
    var r = t !== !1, i = u.build();
    d = !1;
    v = e;
    r ? (f.get().implicitSignIn = !0, N(s, o)) : _(i, e, r);
  }
  function N(e, t, n) {
    try {
      k(O(v), e, t, n);
    } catch (r) {
      x(t, s(r, "signIn"));
    }
  }
  function C(e, r) {
    function u() {
      y = !1;
      f.reset();
      o.status(p.onlineStatus.Offline);
      x(e);
    }
    function a(e) {
      f.reset();
      x(r, s(e, "signOut"));
    }
    var i = t.get().signInManager, o = t.get().personsAndGroupsManager.mePerson;
    d = !1;
    i.signOut.enabled() ? i.signOut().then(u, a) : a(n.api.auth.errorMessages.ALREADY_SIGNED_OUT);
  }
  function k(e, i, u, l) {
    function E() {
      f.reset();
      window.clearTimeout(p);
      x(i);
    }
    function S(e) {
      f.reset();
      j(e) ? D(e, i, u) : (x(u, s(e)), a.deferActionOnSplashscreen(function () {
        h.publish(n.events.auth.SIGNIN_FAILED, e);
      }, e));
      d = !0;
    }
    function T() {
      P(A(w));
      i = null;
      u = null;
    }
    function N() {
      var e = n.api.auth.DEFAULT_SIGNIN_TIMEOUT;
      return r.authentication && r.authentication.signInTimeout && (e = r.authentication.signInTimeout), e;
    }
    function C() {
      p || (p = window.setTimeout(T, N()));
    }
    function k() {
      p && (window.clearTimeout(p), p = undefined);
    }
    function O() {
      window.addEventListener(n.events.browser.FOCUS, C);
      window.addEventListener(n.events.browser.BLUR, k);
    }
    function _() {
      window.removeEventListener(n.events.browser.FOCUS, C);
      window.removeEventListener(n.events.browser.BLUR, k);
    }
    function P(t) {
      if (b)
        return;
      b = !0;
      k();
      _();
      M(g, e.type, t, l.isExternalSignIn);
      t ? S(t) : E();
    }
    var p, v = t.get().signInManager, m = c.defaults(e, {
        id: r.application.endpointId,
        version: B()
      }), g = o.build(), b = !1, w;
    l = l || {};
    if (!y) {
      S(new Error(n.api.auth.errorMessages.AUTH_DISABLED));
      return;
    }
    if (!v.signIn.enabled()) {
      S(new Error(n.api.auth.errorMessages.ALREADY_SIGNED_IN));
      return;
    }
    C();
    O();
    v.signIn(m).then(function () {
      P(null);
    }, function (t) {
      P(L(t));
    }, function (t) {
      w = t;
    });
  }
  function L(e) {
    var t, r, i, s;
    e = e || {};
    m = e.rps_token;
    g = e.site_name;
    t = e.reason;
    r = e.req || e.request;
    i = e.rsp || e.response;
    s = new Error(e.error || e.code || e.message || "");
    a.setErrorType(s);
    s.details = {};
    t && (s.details.reason = JSON.stringify(t));
    r && (s.details.request = JSON.stringify(r));
    if (i) {
      s.details.response = JSON.stringify(i);
      if (i.status === b || i.data && i.data.subcode === w)
        s.name = n.api.auth.errorTypes.TOO_MANY_CONNECTIONS_ERROR;
    }
    return s;
  }
  function A(e) {
    var t = new Error(n.silentLogin.errorMessages.TIMED_OUT);
    return t.jCafeStatus = e, t;
  }
  function O(e) {
    var i = t.get().signInManager, s, o = r.implicitOAuthParams && { client_id: r.implicitOAuthParams.client_id } || {};
    if (e.type === n.api.auth.authProviderType.SKYPE_TOKEN)
      return c.merge({}, o, i.createTokenSignInParameter({
        getToken: e.getToken,
        getExpiryTime: e.getExpiryTime
      }));
    if (e.type === n.api.auth.authProviderType.IMPLICIT_AUTH)
      return i.createImplicitOAuthSignInParameter(r.implicitOAuthParams);
    if (e.type === n.api.auth.authProviderType.PASSWORD)
      return c.merge({}, o, i.createPasswordSignInParameter({
        username: e.username,
        password: e.password
      }));
    if (e.type === n.api.auth.authProviderType.ANONYMOUS)
      return s = {
        type: "Anonymous",
        meeting: e.options.conferenceUri,
        name: e.options.displayName
      }, e.options.useInternalAnonFlow && (s.xmscwt = e.options.useInternalAnonFlow), e.options.discoverUri && (s.root = { user: e.options.discoverUri }), s;
    throw new Error("invalid auth type");
  }
  function M(e, t, n, r) {
    var i;
    i = {
      authType: t,
      hasSucceed: !0,
      retry: d,
      isExternalSignIn: Boolean(r)
    };
    n && (i.hasSucceed = !1, i.error = n.message, i.details = n.details, n.jCafeStatus && (i.jCafeStatus = n.jCafeStatus));
    e.send(i);
  }
  function _(e, t, n, r) {
    var i = {
      authType: t.type,
      hasSucceed: !0,
      implicitSignIn: n
    };
    r && (i.hasSucceed = !1, i.error = r.message || "Unknown error", r.data && (i.details = r.data));
    e.send(i);
  }
  function D(e, t, r) {
    function u(e) {
      return function () {
        var s = {
          rps_token: m,
          onSuccess: t,
          onFailure: r
        };
        e === n.api.auth.accountLinking.WELCOME_FLOW && (s.welcome = !0);
        e === n.api.auth.accountLinking.INLINE_NEW_USER_FLOW && (s.createTechnical = !0, s.hidden = !0);
        P(s);
        i.start(s);
      };
    }
    var s = u(n.api.auth.accountLinking.WELCOME_FLOW), o = !1;
    H() && (s = u(n.api.auth.accountLinking.INLINE_NEW_USER_FLOW), o = !0);
    a.startAuthFailedFlow(e, s, o);
  }
  function P(e) {
    !g || (e.site_name = g);
  }
  function H() {
    var e = l.resolve(n.serviceLocator.FEATURE_FLAGS);
    return e.isFeatureOn(n.featureFlags.SILENT_LINKING);
  }
  function B() {
    return "{product}({version} - {workload})".replace("{product}", r.productName || "unknown").replace("{version}", r.version || "").replace("{workload}", r.initParams.correlationIds.hostProperty || "unknown");
  }
  function j(e) {
    return e && e.name === n.api.auth.errorTypes.NOT_LINKED;
  }
  var t = e("swx-cafe-application-instance"), n = e("swx-constants").COMMON, r = e("experience/settings"), i = e("experience/api/auth/linking"), s = e("experience/api/error").asApiError, o = e("telemetry/authentication/signIn"), u = e("telemetry/authentication/setAuthProvider"), a = e("experience/api/auth/authEventHandler"), f = e("experience/authContext"), l = e("swx-service-locator-instance").default, c = e("lodash-compat"), h = e("swx-pubsub-instance").default, p = e("swx-enums"), d, v, m, g, y, b = 410, w = "LimitExceeded";
  return {
    init: E,
    destroy: S,
    setAuthProvider: T,
    signIn: N,
    signOut: C
  };
});

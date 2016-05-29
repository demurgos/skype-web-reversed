define("experience/api/auth/linking", [
  "require",
  "exports",
  "module",
  "cafe/applicationInstance",
  "experience/settings",
  "ui/appOverlay/appOverlay",
  "swx-xco",
  "constants/common",
  "swx-enums",
  "telemetry/authentication/linking",
  "telemetry/authentication/signIn",
  "experience/api/auth/authEventHandler"
], function (e, t) {
  function c(e) {
    return e.relink ? o.api.auth.accountLinking.RELINK_FLOW : e.createTechnical ? o.api.auth.accountLinking.INLINE_NEW_USER_FLOW : o.api.auth.accountLinking.WELCOME_FLOW;
  }
  function h(e) {
    var t = a.build();
    t.send(e);
  }
  function p(e) {
    var t = f.build();
    t.send(e);
  }
  function d(e) {
    var t = {
      authType: u.authType.ImplicitOAuth,
      hasSucceed: !0,
      flow: e
    };
    p(t);
  }
  function v(e, t, n) {
    var r = {
      authType: u.authType.ImplicitOAuth,
      hasSucceed: !1,
      error: t.error,
      flow: e
    };
    p(r);
    l.startAuthFailedFlow(t, n);
  }
  function m(e) {
    function u(e) {
      var t = n.get().signInManager;
      if (b(e)) {
        var i = t.createTokenImplicitOAuthSignInParameter({
          skypetoken: e.skypetoken,
          rps_token: e.rps_token,
          expires_in: e.expires_in,
          client_id: r.implicitOAuthParams.client_id,
          site_name: e.site_name
        });
        return t.signIn(i);
      }
      return Promise.reject();
    }
    var t, o = c(e);
    if (!e.rps_token)
      throw "[XCO Linking] You have to provide an rps token!";
    if (e.welcome && e.createTechnical)
      throw "[XCO Linking] You cannot start both \"createTechnical\" and \"welcome\" flows";
    t = {
      client_id: "580081",
      rps_token: e.rps_token,
      microsoft: !0,
      env: r.xcoEnv,
      setlang: r.initParams.locale,
      createTechnical: e.createTechnical || !1,
      hidden: e.hidden || !1,
      welcome: e.welcome || !1,
      relink: e.relink || !1,
      site_name: e.site_name || null,
      callback: function (t) {
        function r() {
          g(e.onSuccess);
          i.destroy();
          d(o);
        }
        function s() {
          g(e.onError, t);
          i.destroy();
        }
        var n = e.callback || u;
        return y(t) && v(o, t, n), n(t).then(r, s);
      }
    };
    h(o);
    s.init(t);
    s.load(i.create());
  }
  function g(e, t) {
    typeof e == "function" && e(t);
  }
  function y(e) {
    return e && e.error;
  }
  function b(e) {
    return e && e.skypetoken;
  }
  var n = e("cafe/applicationInstance"), r = e("experience/settings"), i = e("ui/appOverlay/appOverlay"), s = e("swx-xco").linking, o = e("constants/common"), u = e("swx-enums"), a = e("telemetry/authentication/linking"), f = e("telemetry/authentication/signIn"), l = e("experience/api/auth/authEventHandler");
  t.start = m;
});

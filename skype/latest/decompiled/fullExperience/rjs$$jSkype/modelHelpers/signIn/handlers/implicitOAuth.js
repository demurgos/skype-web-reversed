define("jSkype/modelHelpers/signIn/handlers/implicitOAuth", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-xco",
  "jSkype/settings",
  "constants/common"
], function (e, t) {
  function u(e) {
    return !!e.skypetoken && !!e.expires_in && !!e.rps_token;
  }
  function a(e) {
    var t = Promise.resolve(c(n.clone(e)));
    return f(e), t;
  }
  function f(e) {
    delete e.skypetoken;
    delete e.expires_in;
    delete e.rps_token;
    delete e.site_name;
  }
  function l(e) {
    var t = new Promise(function (t, n) {
      function o(e) {
        e && e.skypetoken ? t(c(e)) : n(e || "unknown_error");
      }
      r.init({
        env: i.settings.xcoEnv,
        client_id: e.client_id,
        microsoft: !0,
        use_azure: i.isFeatureOn(s.featureFlags.USE_AZURE_BASED_SILENT_LOGIN)
      });
      r.setCallback(o);
      r.load();
    });
    return t;
  }
  function c(e) {
    function r() {
      return e.skypetoken;
    }
    function i() {
      var r = e.expires_in;
      return n.isNumber(r) ? t + h(r) : t + h(o);
    }
    function s() {
      return e.rps_token;
    }
    function u() {
      return e.site_name;
    }
    var t = Date.now();
    return {
      getToken: r,
      getExpiryTime: i,
      getRpsToken: s,
      getSiteName: u
    };
  }
  function h(e) {
    return e * 1000;
  }
  var n = e("lodash-compat"), r = e("swx-xco").silentLogin, i = e("jSkype/settings"), s = e("constants/common"), o = 3600;
  t.handler = function (e) {
    var t;
    return u(e) ? t = a(e) : t = l(e), t;
  };
});

(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/signIn/handlers/implicitOAuth", [
      "require",
      "exports",
      "lodash-compat",
      "swx-xco",
      "jskype-settings-instance",
      "swx-constants"
    ], e);
}(function (e, t) {
  function f(e) {
    var t;
    return l(e) ? t = c(e) : t = p(e), t;
  }
  function l(e) {
    return !!e.skypetoken && !!e.expires_in && !!e.rps_token;
  }
  function c(e) {
    var t = Promise.resolve(v(n.clone(e)));
    return h(e), t;
  }
  function h(e) {
    delete e.skypetoken;
    delete e.expires_in;
    delete e.rps_token;
    delete e.site_name;
  }
  function p(e) {
    var t = 0, n = new Promise(function (n, o) {
        function f(e) {
          t++;
          if (e && e.skypetoken) {
            a = a.filter(function (e) {
              return e !== f;
            });
            var s = v(e, t);
            n(s);
          } else if (t < i.settings.maxSilentLoginRetries && (!e || e.error !== u))
            r.silentLogin.load();
          else {
            a = a.filter(function (e) {
              return e !== f;
            });
            var s = e || { error: "unknown_error" };
            s.retryCount = t;
            o(s);
          }
        }
        r.silentLogin.init({
          env: i.settings.xcoEnv,
          client_id: e.client_id,
          clientVersion: i.settings.uiVersion,
          microsoft: !0,
          use_azure: i.isFeatureOn(s.COMMON.featureFlags.USE_AZURE_BASED_SILENT_LOGIN)
        });
        r.silentLogin.setCallback(d);
        a.push(f);
        r.silentLogin.load();
      });
    return n;
  }
  function d(e) {
    a.forEach(function (t) {
      t(e);
    });
  }
  function v(e, t) {
    function i() {
      return e.skypetoken;
    }
    function s() {
      var t = e.expires_in;
      if (n.isNumber(t))
        return r + m(t);
      var i = parseInt(t);
      return i ? r + m(i) : r + m(o);
    }
    function u() {
      return e.rps_token;
    }
    function a() {
      return e.site_name;
    }
    function f() {
      return t || 0;
    }
    var r = Date.now();
    return {
      getToken: i,
      getExpiryTime: s,
      getRpsToken: u,
      getSiteName: a,
      getRetryCount: f
    };
  }
  function m(e) {
    return e * 1000;
  }
  var n = e("lodash-compat"), r = e("swx-xco"), i = e("jskype-settings-instance"), s = e("swx-constants"), o = 3600, u = "invalid_grant", a = [];
  t.handler = f;
}));

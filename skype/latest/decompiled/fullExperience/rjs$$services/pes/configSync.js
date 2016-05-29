define("services/pes/configSync", [
  "require",
  "lodash-compat",
  "reqwest",
  "browser/window",
  "cafe/applicationInstance",
  "swx-enums",
  "constants/common",
  "experience/settings",
  "services/ecs/configLoader",
  "services/pes/configProcessor",
  "services/pes/constants",
  "services/i18n/cultureInfo",
  "services/pubSub/pubSub",
  "services/serviceLocator",
  "utils/chat/pesUtils"
], function (e) {
  function v() {
    function y() {
      function t() {
        return new Promise(function (e) {
          v = r.setTimeout(e, u.pesCDNAuthentication.cdnTokenTtlMs);
        }).then(function () {
          return Promise.resolve(i.get().signInManager._skypeToken());
        }).then(b).then(E).then(t);
      }
      m.isFeatureOn(o.featureFlags.PES_CDN_AUTH_ENABLED) && u.pesCDNAuthentication.cdnTokenTtlMs > 0 && (t().catch(function (e) {
      }).then(t), i.get().signInManager.state.when(s.loginState.SignedOut, function () {
        e.dispose();
      }));
    }
    function b(t) {
      var r = "https://" + u.pesCDNAuthentication.skypeServiceHost + u.pesCDNAuthentication.tokenSourceEndpoint, i = {
          headers: { Authorization: "skype_token " + t },
          url: r,
          dataType: "json",
          crossOrigin: !0
        };
      return Promise.resolve(n.compat(i)).catch(function () {
        return { token: "dummy_token" };
      }).then(function (t) {
        return e.latestToken = t.token, h.publish(o.events.personalExpression.CDN_TOKEN_UPDATED, t.token), t.token;
      });
    }
    function w(e) {
      var t;
      return t = "https://" + u.pesCDNAuthentication.cdnServiceHost + u.pesCDNAuthentication.cookieSourceEndpoint + "?vdms_skype_token=" + e, {
        url: t,
        dataType: "json",
        crossOrigin: !0,
        withCredentials: !0
      };
    }
    function E(e) {
      var t = w(e);
      return Promise.resolve(n.compat(t)).catch(function () {
      }).then(function () {
        return !0;
      });
    }
    var e = this, v = 0, m, g;
    e.latestToken = "";
    e.init = function () {
      function r() {
        var e;
        if (u.pesConfigUrl)
          e = Promise.resolve({ pes_config: u.pesConfigUrl });
        else {
          var t = i.get().personsAndGroupsManager.mePerson;
          e = Promise.resolve(a.loadConfig(s.ecsClientNames.Skype, u.ecsPesKey, t.id()));
        }
        return e;
      }
      function h(r) {
        if (m.isFeatureOn(o.featureFlags.PES_CDN_AUTH_ENABLED) && m.isFeatureOn(o.featureFlags.PES_CDN_AUTH_URL_FALLBACK_ENABLED)) {
          var i, s, a = t.find(r.items, function (e) {
              return e.type === l.itemTypes.moji.id;
            });
          if (a)
            return s = r.itemsRoot + "/" + a.id + "/views/meta.default", i = {
              dataType: "json",
              withCredentials: !0,
              url: d.rewriteUrls(s, u.pesCDNAuthentication.rewriteRules),
              crossOrigin: !0
            }, Promise.resolve(n.compat(i)).then(function () {
              g.init(r);
              var e = f.prefetch(g.getConfiguration());
              f.register(e);
            }).catch(function () {
              r._requiresCDNUrlAuthentication = !0;
              r._cdnToken = e.latestToken;
              g.init(r);
              var t = f.prefetch(g.getConfiguration());
              f.register(t);
            });
        } else {
          g.init(r);
          var c = f.prefetch(g.getConfiguration());
          f.register(c);
        }
      }
      function v(e) {
        throw new Error("Error while retrieving the pes configuration data");
      }
      function b(t) {
        var n = new Promise(function (t) {
          i.get().signInManager.state.once(s.loginState.SignedIn, t);
        }).then(e.fetchConfiguration.bind(null, t.pes_config)).then(h).then(y).catch(v);
        return { configurationLoaded: n };
      }
      return m = p.resolve(o.serviceLocator.FEATURE_FLAGS), u.locale = u.locale || {}, u.initParams = u.initParams || {}, u.locale.pes = c.getPesLocale(u.initParams.locale), g = p.resolve(o.serviceLocator.PES_CONFIG_SERVICE), r().then(b).catch(v);
    };
    e.fetchConfiguration = function (r) {
      function s() {
        var e, t = Promise.resolve();
        return m.isFeatureOn(o.featureFlags.PES_CDN_AUTH_ENABLED) && (e = i.get().signInManager._skypeToken(), t = Promise.resolve(e).then(b).then(E)), t;
      }
      function a(r, i) {
        var s, a = t.extend(i || {}, {
            dataType: "json",
            crossOrigin: !0
          });
        return m.isFeatureOn(o.featureFlags.PES_CDN_AUTH_ENABLED) && (r = d.rewriteUrls(r, u.pesCDNAuthentication.rewriteRules), a.withCredentials = !0), a.url = r, s = Promise.resolve(n.compat(a)), m.isFeatureOn(o.featureFlags.PES_CDN_AUTH_ENABLED) && (s = s.catch(function () {
          var s = t.extend(i || {}, {
            dataType: "json",
            crossOrigin: !0
          });
          return s.url = r + "?" + e.latestToken, Promise.resolve(n.compat(s));
        })), s;
      }
      function f() {
        throw new Error("no pes configuration service endpoint");
      }
      function l() {
        return r.replace("/default", "/" + u.locale.pes);
      }
      return s().then(function () {
        return a(l());
      }).catch(function () {
        return a(r);
      }).catch(f);
    };
    e.dispose = function () {
      v && r.clearTimeout(v);
    };
  }
  var t = e("lodash-compat"), n = e("reqwest"), r = e("browser/window"), i = e("cafe/applicationInstance"), s = e("swx-enums"), o = e("constants/common"), u = e("experience/settings"), a = e("services/ecs/configLoader"), f = e("services/pes/configProcessor"), l = e("services/pes/constants"), c = e("services/i18n/cultureInfo"), h = e("services/pubSub/pubSub"), p = e("services/serviceLocator"), d = e("utils/chat/pesUtils");
  return new v();
});

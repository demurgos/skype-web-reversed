define("services/pes/configSync", [
  "require",
  "lodash-compat",
  "swx-cafe-application-instance",
  "services/ecs/configLoader",
  "services/pes/configProcessor",
  "swx-constants",
  "services/i18n/cultureInfo",
  "swx-enums",
  "services/pes/constants",
  "utils/chat/pesUtils",
  "swx-pubsub-instance",
  "reqwest",
  "swx-service-locator-instance",
  "experience/settings",
  "browser/window"
], function (e) {
  function v() {
    function g() {
      function t() {
        return new Promise(function (e) {
          v = d.setTimeout(e, p.pesCDNAuthentication.cdnTokenTtlMs);
        }).then(function () {
          return n.get().signInManager._skypeToken();
        }).then(y).then(w).then(t);
      }
      m.isFeatureOn(s.featureFlags.PES_CDN_AUTH_ENABLED) && p.pesCDNAuthentication.cdnTokenTtlMs > 0 && (t().catch(function (e) {
      }).then(t), n.get().signInManager.state.when(u.loginState.SignedOut, function () {
        e.dispose();
      }));
    }
    function y(t) {
      var n = "https://" + p.pesCDNAuthentication.skypeServiceHost + p.pesCDNAuthentication.tokenSourceEndpoint, r = {
          headers: { Authorization: "skype_token " + t },
          url: n,
          dataType: "json",
          crossOrigin: !0
        };
      return Promise.resolve(c.compat(r)).catch(function () {
        return { token: "dummy_token" };
      }).then(function (t) {
        var n = h.resolve(s.serviceLocator.PES_CONFIG_SERVICE);
        return e.latestToken = t.token, n.cdnTokenUpdated(t.token), l.publish(s.events.personalExpression.CDN_TOKEN_UPDATED, t.token), t.token;
      });
    }
    function b(e) {
      var t;
      return t = "https://" + p.pesCDNAuthentication.cdnServiceHost + p.pesCDNAuthentication.cookieSourceEndpoint + "?vdms_skype_token=" + e, {
        url: t,
        dataType: "json",
        crossOrigin: !0,
        withCredentials: !0
      };
    }
    function w(e) {
      var t = b(e);
      return Promise.resolve(c.compat(t)).catch(function () {
        return !0;
      });
    }
    var e = this, v = 0, m;
    e.latestToken = "";
    e.init = function () {
      function d() {
        var e, t;
        return p.pesConfigUrl ? t = Promise.resolve({ pes_config: p.pesConfigUrl }) : (e = n.get().personsAndGroupsManager.mePerson, t = e.id.get().then(function (e) {
          return r.loadConfig(u.ecsClientNames.Skype, p.ecsPesKey, e);
        })), t;
      }
      function v(n) {
        if (m.isFeatureOn(s.featureFlags.PES_CDN_AUTH_ENABLED) && m.isFeatureOn(s.featureFlags.PES_CDN_AUTH_URL_FALLBACK_ENABLED)) {
          var r, o, u = t.find(n.items, function (e) {
              return e.type === a.itemTypes.moji.id;
            });
          if (u)
            return o = n.itemsRoot + "/" + u.id + "/views/meta.default", r = {
              dataType: "json",
              withCredentials: !0,
              url: f.rewriteUrls(o, p.pesCDNAuthentication.rewriteRules),
              crossOrigin: !0
            }, Promise.resolve(c.compat(r)).then(function () {
              l.init(n);
              var e = i.prefetch(l.getConfiguration());
              i.register(e);
            }).catch(function () {
              e._requiresCDNUrlAuthentication = !0;
              n._requiresCDNUrlAuthentication = !0;
              n._cdnToken = e.latestToken;
              l.init(n);
              var t = i.prefetch(l.getConfiguration());
              i.register(t);
            });
        } else {
          l.init(n);
          var h = i.prefetch(l.getConfiguration());
          i.register(h);
        }
      }
      function y(e) {
        throw e;
      }
      function b(t) {
        var r = new Promise(function (t) {
          n.get().signInManager.state.once(u.loginState.SignedIn, t);
        }).then(e.fetchConfiguration.bind(null, t.pes_config)).then(v).then(g).catch(y);
        return { configurationLoaded: r };
      }
      var l;
      return m = h.resolve(s.serviceLocator.FEATURE_FLAGS), p.locale = p.locale || {}, p.initParams = p.initParams || {}, p.locale.pes = o.getPesLocale(p.initParams.locale), l = h.resolve(s.serviceLocator.PES_CONFIG_SERVICE), d().then(b).catch(y);
    };
    e.fetchConfiguration = function (r) {
      function i() {
        var e, t = Promise.resolve();
        return m.isFeatureOn(s.featureFlags.PES_CDN_AUTH_ENABLED) && (e = n.get().signInManager._skypeToken(), t = Promise.resolve(e).then(y).then(w)), t;
      }
      function o(n, r) {
        var i, o = t.extend(r || {}, {
            dataType: "json",
            crossOrigin: !0
          });
        return m.isFeatureOn(s.featureFlags.PES_CDN_AUTH_ENABLED) && (n = f.rewriteUrls(n, p.pesCDNAuthentication.rewriteRules), o.withCredentials = !0), o.url = n, i = Promise.resolve(c.compat(o)), m.isFeatureOn(s.featureFlags.PES_CDN_AUTH_ENABLED) && (i = i.catch(function () {
          var i = t.extend(r || {}, {
            dataType: "json",
            crossOrigin: !0
          });
          return i.url = n + "?" + e.latestToken, Promise.resolve(c.compat(i));
        })), i;
      }
      function u() {
        throw new Error("no pes configuration service endpoint");
      }
      function a() {
        return r.replace("/default", "/" + p.locale.pes);
      }
      return i().then(function () {
        return o(a());
      }).catch(function () {
        return o(r);
      }).catch(u);
    };
    e.dispose = function () {
      v && d.clearTimeout(v);
    };
  }
  var t = e("lodash-compat"), n = e("swx-cafe-application-instance"), r = e("services/ecs/configLoader"), i = e("services/pes/configProcessor"), s = e("swx-constants").COMMON, o = e("services/i18n/cultureInfo"), u = e("swx-enums"), a = e("services/pes/constants"), f = e("utils/chat/pesUtils"), l = e("swx-pubsub-instance").default, c = e("reqwest"), h = e("swx-service-locator-instance").default, p = e("experience/settings"), d = e("browser/window");
  return new v();
});

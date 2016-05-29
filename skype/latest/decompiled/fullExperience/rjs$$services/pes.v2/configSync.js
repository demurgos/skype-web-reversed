define("services/pes.v2/configSync", [
  "require",
  "lodash-compat",
  "cafe/applicationInstance",
  "services/ecs/configLoader",
  "services/pes.v2/configProcessor",
  "constants/common",
  "services/i18n/cultureInfo",
  "swx-enums",
  "services/pes/constants",
  "utils/chat/pesUtils",
  "services/pubSub/pubSub",
  "services/pes/configSync",
  "reqwest",
  "services/serviceLocator",
  "experience/settings",
  "browser/window"
], function (e) {
  function m() {
    function y() {
      function t() {
        return new Promise(function (e) {
          m = v.setTimeout(e, d.pesCDNAuthentication.cdnTokenTtlMs);
        }).then(function () {
          return Promise.resolve(n.get().signInManager._skypeToken());
        }).then(b).then(E).then(t);
      }
      g.isFeatureOn(s.featureFlags.PES_CDN_AUTH_ENABLED) && d.pesCDNAuthentication.cdnTokenTtlMs > 0 && (t().catch(function (e) {
      }).then(t), n.get().signInManager.state.when(u.loginState.SignedOut, function () {
        e.dispose();
      }));
    }
    function b(t) {
      var n = "https://" + d.pesCDNAuthentication.skypeServiceHost + d.pesCDNAuthentication.tokenSourceEndpoint, r = {
          headers: { Authorization: "skype_token " + t },
          url: n,
          dataType: "json",
          crossOrigin: !0
        };
      return Promise.resolve(h.compat(r)).catch(function () {
        return { token: "dummy_token" };
      }).then(function (t) {
        var n = p.resolve(s.serviceLocator.PES_2_CONFIG_SERVICE);
        return e.latestToken = t.token, c.latestToken = t.token, n.cdnTokenUpdated(t.token), l.publish(s.events.personalExpression.CDN_TOKEN_UPDATED, t.token), t.token;
      });
    }
    function w(e) {
      var t;
      return t = "https://" + d.pesCDNAuthentication.cdnServiceHost + d.pesCDNAuthentication.cookieSourceEndpoint + "?vdms_skype_token=" + e, {
        url: t,
        dataType: "json",
        crossOrigin: !0,
        withCredentials: !0
      };
    }
    function E(e) {
      var t = w(e);
      return Promise.resolve(h.compat(t)).catch(function () {
      }).then(function () {
        return !0;
      });
    }
    var e = this, m = 0, g;
    e.latestToken = "";
    e.init = function () {
      function v() {
        var e, t;
        return d.pesConfigUrl ? t = Promise.resolve({ pes_config: d.pesConfigUrl }) : (e = n.get().personsAndGroupsManager.mePerson, t = e.id.get().then(function (e) {
          return r.loadConfig(u.ecsClientNames.Skype, d.ecsPesKey, e);
        })), t;
      }
      function m(n) {
        if (g.isFeatureOn(s.featureFlags.PES_CDN_AUTH_ENABLED) && g.isFeatureOn(s.featureFlags.PES_CDN_AUTH_URL_FALLBACK_ENABLED)) {
          var r, o, u = t.find(n.items, function (e) {
              return e.type === a.itemTypes.moji.id;
            });
          if (u)
            return o = n.itemsRoot + "/" + u.id + "/views/meta.default", r = {
              dataType: "json",
              withCredentials: !0,
              url: f.rewriteUrls(o, d.pesCDNAuthentication.rewriteRules),
              crossOrigin: !0
            }, Promise.resolve(h.compat(r)).then(function () {
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
          var c = i.prefetch(l.getConfiguration());
          i.register(c);
        }
      }
      function b(e) {
        throw new Error("Error while retrieving the pes configuration data");
      }
      function w(t) {
        var r = new Promise(function (t) {
          n.get().signInManager.state.once(u.loginState.SignedIn, t);
        }).then(e.fetchConfiguration.bind(null, t.pes_config)).then(m).then(y).catch(b);
        return { configurationLoaded: r };
      }
      var l;
      return g = p.resolve(s.serviceLocator.FEATURE_FLAGS), g.isFeatureOn(s.featureFlags.PES_V2_ENABLED) ? (d.locale = d.locale || {}, d.initParams = d.initParams || {}, d.locale.pes = o.getPesLocale(d.initParams.locale), l = p.resolve(s.serviceLocator.PES_2_CONFIG_SERVICE), v().then(w).catch(b)) : c.init();
    };
    e.fetchConfiguration = function (r) {
      function i() {
        var e, t = Promise.resolve();
        return g.isFeatureOn(s.featureFlags.PES_CDN_AUTH_ENABLED) && (e = n.get().signInManager._skypeToken(), t = Promise.resolve(e).then(b).then(E)), t;
      }
      function o(n, r) {
        var i, o = t.extend(r || {}, {
            dataType: "json",
            crossOrigin: !0
          });
        return g.isFeatureOn(s.featureFlags.PES_CDN_AUTH_ENABLED) && (n = f.rewriteUrls(n, d.pesCDNAuthentication.rewriteRules), o.withCredentials = !0), o.url = n, i = Promise.resolve(h.compat(o)), g.isFeatureOn(s.featureFlags.PES_CDN_AUTH_ENABLED) && (i = i.catch(function () {
          var i = t.extend(r || {}, {
            dataType: "json",
            crossOrigin: !0
          });
          return i.url = n + "?" + e.latestToken, Promise.resolve(h.compat(i));
        })), i;
      }
      function u() {
        throw new Error("no pes configuration service endpoint");
      }
      function a() {
        return r.replace("/default", "/" + d.locale.pes);
      }
      return i().then(function () {
        return o(a());
      }).catch(function () {
        return o(r);
      }).catch(u);
    };
    e.dispose = function () {
      m && v.clearTimeout(m);
    };
  }
  var t = e("lodash-compat"), n = e("cafe/applicationInstance"), r = e("services/ecs/configLoader"), i = e("services/pes.v2/configProcessor"), s = e("constants/common"), o = e("services/i18n/cultureInfo"), u = e("swx-enums"), a = e("services/pes/constants"), f = e("utils/chat/pesUtils"), l = e("services/pubSub/pubSub"), c = e("services/pes/configSync"), h = e("reqwest"), p = e("services/serviceLocator"), d = e("experience/settings"), v = e("browser/window");
  return new m();
});

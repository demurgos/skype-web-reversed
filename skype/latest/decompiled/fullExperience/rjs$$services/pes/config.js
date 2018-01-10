define("services/pes/config", [
  "require",
  "lodash-compat",
  "swx-constants",
  "swx-i18n",
  "services/pes/constants",
  "utils/chat/pesUtils",
  "swx-service-locator-instance",
  "swx-utils-common",
  "swx-utils-common",
  "swx-utils-chat",
  "experience/settings",
  "reqwest"
], function (e) {
  function p() {
    function d() {
      return {
        itemsRoot: "",
        emoticonsRoot: "",
        packsRoot: "",
        items: [],
        packs: [],
        tabs: []
      };
    }
    function v(e) {
      p.hasOwnProperty(r.personalExpression.CONFIG_INITIALIZED) && t.forEach(p[r.personalExpression.CONFIG_INITIALIZED], function (t) {
        t(e);
      });
    }
    function m(e, t) {
      var r = (t || "#") + "/" + e.id + "/views/thumbnail", i = u.resolve(n.serviceLocator.FEATURE_FLAGS);
      return i.isFeatureOn(n.featureFlags.PES_CDN_AUTH_ENABLED) && (r = o.rewriteUrls(r, c.pesCDNAuthentication.rewriteRules)), {
        id: e.id,
        type: s.itemTypes.tab.id,
        title: e.title,
        thumbnailUrl: r,
        packs: [e]
      };
    }
    function g(e, n) {
      return t.find(e, { id: n });
    }
    function y(e) {
      return (e.title || "").indexOf(s.FEATURED_IN_PREFIX) === 0;
    }
    function b(e, n) {
      var r = [];
      return e && (e.forEach(function (e) {
        if (!y(e)) {
          var t = m(e, n);
          r.push(t);
        }
      }), e.forEach(function (e) {
        if (y(e)) {
          var o = e.title.replace(s.FEATURED_IN_PREFIX, ""), u = t.find(r, { title: o });
          u ? (e.title = i.fetch({ key: "pes_featured_title" }), e.isHidden = !1, u.packs.splice(0, 0, e)) : e.isHidden === !1 && (e.title = o, u = m(e, n), r.push(u));
        }
      })), r;
    }
    function w(e) {
      e.packs.forEach(function (t) {
        var n = [];
        t.items.forEach(function (t) {
          n.push(g(e.items, t));
        });
        t.items = n;
      });
    }
    function E(e) {
      e.tabs.forEach(function (t) {
        var n = [];
        t.sections.forEach(function (t) {
          var r = g(e.packs, t.pack);
          r && r.items && r.items.length && n.push(r);
        });
        t.packs = n;
        t.type = s.itemTypes.tab.id;
        t.thumbnailUrl = m(t, e.tabsRoot).thumbnailUrl;
      });
    }
    function S(t) {
      var n = "default";
      return c.locale && c.locale.pes && (n = c.locale.pes), t.type === s.itemTypes.emoticon.id ? e.emoticonsRoot + "/" + t.id + "/views/meta." + n : t.type === s.itemTypes.moji.id ? e.itemsRoot + "/" + t.id + "/views/meta." + n : null;
    }
    function x(t) {
      var r = u.resolve(n.serviceLocator.FEATURE_FLAGS);
      return t.type !== s.itemTypes.moji.id ? t : (t.auxiliaryUrl = t.auxiliaryUrl || "", l.validate(t.auxiliaryUrl) || (t.auxiliaryUrl = ""), t.description = t.description || "", t.auxiliaryText = t.auxiliaryText || t.auxiliaryUrl, t.copyright = t.copyright || "", t._mojiURL = e.itemsRoot + "/" + t.id + "/views/default", t._thumbnailURL = e.itemsRoot + "/" + t.id + "/views/thumbnail", r.isFeatureOn(n.featureFlags.PES_CDN_AUTH_ENABLED) && (t._mojiURL = o.rewriteUrls(t._mojiURL, c.pesCDNAuthentication.rewriteRules), t._thumbnailURL = o.rewriteUrls(t._thumbnailURL, c.pesCDNAuthentication.rewriteRules), e._requiresCDNUrlAuthentication && (t._mojiURL = t._mojiURL + "?" + e._cdnToken, t._thumbnailURL = t._thumbnailURL + "?" + e._cdnToken)), t);
    }
    var e, a = f.build(), p = {};
    this.getConfiguration = function () {
      return e;
    };
    this.init = function (n) {
      return e = d(), t.assign(e, n), w(e), n.tabs ? E(e) : e.tabs = b(e.packs, e.packsRoot), v(e), a.resolve(), e;
    };
    this.cdnTokenUpdated = function (t) {
      if (e._cdnToken === t)
        return;
      e._cdnToken = t;
      e._requiresCDNUrlAuthentication && v(e);
    };
    this.fetchMetadata = function (r) {
      return a.then(function () {
        var i, s, a, f = "default", p = u.resolve(n.serviceLocator.FEATURE_FLAGS);
        return l.validate(r) ? (c.locale && c.locale.pes && (f = c.locale.pes), s = r.replace(/\/views\/[^]+$/, "/views/meta." + f), a = t.find(e.items, function (e) {
          return S(e) === s;
        }), a ? Promise.resolve(x(a)) : (p.isFeatureOn(n.featureFlags.PES_CDN_AUTH_ENABLED) && (s = o.rewriteUrls(s, c.pesCDNAuthentication.rewriteRules), e._requiresCDNUrlAuthentication && (s = s + "?" + e._cdnToken)), i = {
          url: s,
          dataType: "json",
          crossOrigin: !0
        }, p.isFeatureOn(n.featureFlags.PES_CDN_AUTH_ENABLED) && (i.withCredentials = !0), Promise.resolve(h.compat(i)).then(function (n) {
          var i = r.match(/\/([^\/]+)\/views\/[^\/]+$/);
          return i ? (n.id = i[1], t.any(e.items, { id: n.id }) || (e.items.push(n), v(e)), x(n)) : Promise.reject(new Error("Moji ID not found"));
        }))) : Promise.reject(new Error("URL is not valid"));
      });
    };
    this.on = function (n, r) {
      if (!n || !r)
        return;
      return p.hasOwnProperty(n) || (p[n] = []), t.any(p[n], function (e) {
        return e === r;
      }) || p[n].push(r), { cancel: this.off.bind(this, n, r) };
    };
    this.off = function (n, r) {
      return p.hasOwnProperty(n) ? t.first(t.remove(p[n], function (e) {
        return e === r;
      })) : null;
    };
    e = d();
  }
  var t = e("lodash-compat"), n = e("swx-constants").COMMON, r = n.events, i = e("swx-i18n").localization, s = e("services/pes/constants"), o = e("utils/chat/pesUtils"), u = e("swx-service-locator-instance").default, a = e("swx-utils-common").builderMixin, f = e("swx-utils-common").settablePromise, l = e("swx-utils-chat").urlValidator, c = e("experience/settings"), h = e("reqwest");
  return t.assign(p, a), p;
});

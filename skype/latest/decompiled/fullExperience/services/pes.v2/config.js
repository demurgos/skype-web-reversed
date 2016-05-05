define("services/pes.v2/config", [
  "require",
  "lodash-compat",
  "constants/common",
  "swx-i18n",
  "services/pes/constants",
  "utils/chat/pesUtils",
  "services/serviceLocator",
  "utils/common/builderMixin",
  "experience/settings"
], function (e) {
  function l() {
    function c() {
      return {
        itemsRoot: "",
        emoticonsRoot: "",
        packsRoot: "",
        items: [],
        packs: [],
        tabs: []
      };
    }
    function h(e) {
      a.hasOwnProperty(r.personalExpression.CONFIG_INITIALIZED) && t.forEach(a[r.personalExpression.CONFIG_INITIALIZED], function (t) {
        t(e);
      });
    }
    function p(e, t) {
      var r = (t || "#") + "/" + e.id + "/views/thumbnail", i = u.resolve(n.serviceLocator.FEATURE_FLAGS);
      return i.isFeatureOn(n.featureFlags.PES_CDN_AUTH_ENABLED) && (r = o.rewriteUrls(r, f.pesCDNAuthentication.rewriteRules)), {
        id: e.id,
        type: s.itemTypes.tab.id,
        title: e.title,
        thumbnailUrl: r,
        packs: [e]
      };
    }
    function d(e, n) {
      return t.find(e, { id: n });
    }
    function v(e) {
      return (e.title || "").indexOf(s.FEATURED_IN_PREFIX) === 0;
    }
    function m(e, n) {
      var r = [];
      return e && (e.forEach(function (e) {
        if (!v(e)) {
          var t = p(e, n);
          r.push(t);
        }
      }), e.forEach(function (e) {
        if (v(e)) {
          var o = e.title.replace(s.FEATURED_IN_PREFIX, ""), u = t.find(r, { title: o });
          u ? (e.title = i.fetch({ key: "pes_featured_title" }), e.isHidden = !1, u.packs.splice(0, 0, e)) : e.isHidden === !1 && (e.title = o, u = p(e, n), r.push(u));
        }
      })), r;
    }
    function g(e) {
      e.packs.forEach(function (t) {
        var n = [];
        t.items.forEach(function (t) {
          n.push(d(e.items, t));
        }), t.items = n;
      });
    }
    function y(e) {
      e.tabs.forEach(function (t) {
        var n = [];
        t.sections.forEach(function (t) {
          var r = d(e.packs, t.pack);
          r && r.items && r.items.length && n.push(r);
        }), t.packs = n, t.type = s.itemTypes.tab.id, t.thumbnailUrl = p(t, e.tabsRoot).thumbnailUrl;
      });
    }
    var e, a = {}, l;
    this.getConfiguration = function () {
      return e;
    }, this.init = function (n) {
      return e = c(), t.assign(e, n), g(e), n.tabs ? y(e) : e.tabs = m(e.packs, e.packsRoot), h(e), e;
    }, this.cdnTokenUpdated = function (t) {
      if (e._cdnToken === t)
        return;
      e._cdnToken = t, e._requiresCDNUrlAuthentication && h(e);
    }, this.on = function (n, r) {
      if (!n || !r)
        return;
      return a.hasOwnProperty(n) || (a[n] = []), t.any(a[n], function (e) {
        return e === r;
      }) || a[n].push(r), { cancel: this.off.bind(this, n, r) };
    }, this.off = function (n, r) {
      return a.hasOwnProperty(n) ? t.first(t.remove(a[n], function (e) {
        return e === r;
      })) : null;
    }, e = c(), u.resolve(n.serviceLocator.FEATURE_FLAGS).isFeatureOn(n.featureFlags.PES_V2_ENABLED) && (l = u.resolve(n.serviceLocator.PES_CONFIG_SERVICE), l.getConfiguration = this.getConfiguration.bind(this));
  }
  var t = e("lodash-compat"), n = e("constants/common"), r = n.events, i = e("swx-i18n").localization, s = e("services/pes/constants"), o = e("utils/chat/pesUtils"), u = e("services/serviceLocator"), a = e("utils/common/builderMixin"), f = e("experience/settings");
  return t.assign(l, a), l;
})

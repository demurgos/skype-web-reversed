define("services/pes/config", [
  "require",
  "lodash-compat",
  "utils/common/cache/instance",
  "constants/common",
  "constants/common",
  "swx-i18n",
  "services/pes/constants",
  "utils/chat/pesUtils",
  "services/pubSub/pubSub",
  "services/serviceLocator",
  "experience/settings",
  "utils/common/builderMixin"
], function (e) {
  function p() {
    function h(e, t) {
      for (var n in e)
        e.hasOwnProperty(n) && (t[n] = e[n]);
    }
    function p() {
      return {
        itemsRoot: "",
        emoticonsRoot: "",
        packsRoot: "",
        items: [],
        packs: [],
        tabs: []
      };
    }
    function d() {
      return {
        id: u.mru.TAB_ID,
        type: u.itemTypes.tab.id,
        title: o.fetch({ key: u.itemTypes.tab.titleLocKey }),
        ariaLabel: o.fetch({ key: u.itemTypes.tab.ariaLabelLocKey }),
        thumbnailUrl: (c.appBaseUrl || "#") + "/assets/images/components/chat/pes/tab_mru.png",
        showHiddenItems: !0,
        packs: []
      };
    }
    function v(e) {
      return {
        ariaLabel: o.fetch({ key: u.itemTypes[e].ariaLabelLocKey }),
        title: o.fetch({ key: u.itemTypes[e].titleLocKey }),
        id: b(e),
        isHidden: !1,
        items: []
      };
    }
    function m() {
      return [
        v(u.itemTypes.emoticon.id),
        v(u.itemTypes.moji.id)
      ];
    }
    function g(e, t) {
      var n = (t || "#") + "/" + e.id + "/views/thumbnail", r = l.resolve(i.serviceLocator.FEATURE_FLAGS);
      return r.isFeatureOn(i.featureFlags.PES_CDN_AUTH_ENABLED) && (n = a.rewriteUrls(n, c.pesCDNAuthentication.rewriteRules)), {
        id: e.id,
        type: u.itemTypes.tab.id,
        title: e.title,
        thumbnailUrl: n,
        packs: [e]
      };
    }
    function y(e, t) {
      return n.find(e, function (e) {
        return e.id === t;
      });
    }
    function b(e) {
      return u.mru.PACK_PREFIX + e;
    }
    function w(e) {
      return (e.title || "").indexOf(u.FEATURED_IN_PREFIX) === 0;
    }
    function E(e, t) {
      return e.items.slice(0, u.itemTypes[t].mruLimit);
    }
    function S() {
      return r.get().getSensitiveItem(t);
    }
    function x(e) {
      return S().then(function (t) {
        var n = e.tabs[0].packs;
        t && t.mruItems && t.mruItems.forEach(function (t) {
          var r = y(e.items, t);
          if (r) {
            var i = y(n, b(r.type));
            i && i.items.push(r);
          }
        });
      });
    }
    function T(e, t) {
      var r = [d()];
      return e && (e.forEach(function (e) {
        w(e) || (e.parentTab = g(e, t), r.push(e.parentTab));
      }), e.forEach(function (e) {
        if (w(e)) {
          var i = e.title.replace(u.FEATURED_IN_PREFIX, "");
          e.isFeatured = !0;
          var s = n.find(r, function (e) {
            return e.title === i;
          });
          s ? (e.title = o.fetch({ key: "pes_featured_title" }), e.isHidden = !1, e.parentTab = s, s.packs.splice(0, 0, e)) : e.isHidden === !1 && (e.title = i, e.parentTab = g(e, t), r.push(e.parentTab));
        }
      })), r;
    }
    function N(e) {
      e.packs.forEach(function (t) {
        var n = [];
        t.items.forEach(function (t) {
          n.push(y(e.items, t));
        });
        t.items = n;
      });
    }
    function C(e) {
      var i = n.flatten(e.tabs[0].packs.map(function (e) {
        return e.items.map(function (e) {
          return e.id;
        });
      }));
      return r.get().setSensitiveItem(t, {
        mruItems: i,
        version: u.SAVED_DATA_VERSION
      }, 0);
    }
    function k(e) {
      e.tabs.forEach(function (t) {
        var n = [];
        t.sections.forEach(function (t) {
          var r = y(e.packs, t.pack);
          r.isHidden = !1;
          n.push(r);
        });
        t.packs = n;
        t.type = u.itemTypes.tab.id;
        t.thumbnailUrl = g(t, e.tabsRoot).thumbnailUrl;
      });
    }
    var e;
    this.addItemToMru = function (t) {
      var n = y(e.items, t);
      if (!n)
        return Promise.resolve();
      var r = y(e.packs, b(n.type));
      if (r) {
        var i = r.items.indexOf(n);
        return i >= 0 ? r.items.splice(0, 0, r.items.splice(i, 1)[0]) : r.items.splice(0, 0, n), r.items = E(r, n.type), C(e);
      }
      return Promise.resolve();
    };
    this.getConfiguration = function () {
      return e;
    };
    this.init = function (t) {
      e = p();
      h(t, e);
      N(e);
      t.tabs ? (k(e), e.tabs.unshift(d())) : e.tabs = T(e.packs, e.packsRoot);
      var n = y(e.tabs, u.mru.TAB_ID);
      return n.packs = m(), e.packs = e.packs.concat(n.packs), f.publish(s.personalExpression.CONFIG_INITIALIZED, e), x(e);
    };
    e = p();
    e.tabs.push(d());
    e.packs = e.tabs[0].packs = m();
  }
  var t = "pes", n = e("lodash-compat"), r = e("utils/common/cache/instance"), i = e("constants/common"), s = e("constants/common").events, o = e("swx-i18n").localization, u = e("services/pes/constants"), a = e("utils/chat/pesUtils"), f = e("services/pubSub/pubSub"), l = e("services/serviceLocator"), c = e("experience/settings"), h = e("utils/common/builderMixin");
  return n.extend(p, h), p;
});

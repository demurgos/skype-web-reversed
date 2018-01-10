define("services/pes/interactors/mru", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-constants",
  "swx-i18n",
  "utils/common/interactor",
  "services/pes/constants",
  "swx-service-locator-instance",
  "experience/settings"
], function (e, t) {
  var n = e("lodash-compat"), r = e("swx-constants").COMMON, i = e("swx-i18n").localization, s = e("utils/common/interactor"), o = e("services/pes/constants"), u = e("swx-service-locator-instance").default, a = e("experience/settings");
  t.createMRUTab = s.defineInteractor(function (e) {
    function t() {
      return {
        id: o.mru.TAB_ID,
        type: o.itemTypes.tab.id,
        title: i.fetch({ key: o.itemTypes.tab.titleLocKey }),
        ariaLabel: i.fetch({ key: o.itemTypes.tab.ariaLabelLocKey }),
        emptyTabMessageKey: "expressionPicker_mruTab_emptyText",
        thumbnailUrl: a.appBaseUrl + "/assets/images/components/chat/pes/tab_mru.png",
        packs: []
      };
    }
    function s(e) {
      return o.mru.PACK_PREFIX + e;
    }
    function f(e) {
      return {
        ariaLabel: i.fetch({ key: o.itemTypes[e].ariaLabelLocKey }),
        title: i.fetch({ key: o.itemTypes[e].titleLocKey }),
        id: s(e),
        isHidden: !1,
        items: []
      };
    }
    function l() {
      return [
        f(o.itemTypes.emoticon.id),
        f(o.itemTypes.moji.id)
      ];
    }
    e(function (e) {
      var i = u.resolve(r.serviceLocator.PES_MRU_SERVICE), o = i.getMRUItems(), a = t(), f = l();
      n.forEach(o, function (t) {
        var r = n.find(f, { id: s(t.type) }), i = n.find(e._configuredItems, { id: t.id });
        i && r.items.push(i);
      });
      a.packs = n.reject(f, function (e) {
        return e.items.length === 0;
      });
      e.mruTab = a;
    });
  });
  t.putMRUTab = s.defineSimpleInteractor(function (e) {
    var r = t.createMRUTab.run(n.pick(e, "_configuredItems"));
    n.remove(e.tabs, { id: o.mru.TAB_ID });
    e.tabs.unshift(r.mruTab);
  });
});

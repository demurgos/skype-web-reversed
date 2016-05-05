define("services/pes.v2/interactors/picker", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "services/pes.v2/interactors/bing",
  "services/pes.v2/interactors/giphy",
  "services/pes.v2/interactors/cloud",
  "constants/common",
  "experience/settings",
  "utils/common/interactor",
  "services/pes.v2/interactors/mru",
  "services/pes.v2/interactors/localSearch",
  "services/pes/constants",
  "services/serviceLocator"
], function (e, t) {
  var n = e("lodash-compat"), r = e("services/pes.v2/interactors/bing"), i = e("services/pes.v2/interactors/giphy"), s = e("services/pes.v2/interactors/cloud"), o = e("constants/common"), u = e("experience/settings"), a = e("utils/common/interactor"), f = e("services/pes.v2/interactors/mru"), l = e("services/pes.v2/interactors/localSearch"), c = e("services/pes/constants"), h = e("services/serviceLocator");
  t.clearContext = a.defineSimpleInteractor(function (t) {
    t.tabs = [], t.selectedTab = null, t.selectedItem = null, t.selectedTabId = null, t.selectedItemId = null, t._configuredItems = [];
  }), t.fillTabProperties = a.defineSimpleInteractor(function (e) {
    n.forEach(e.tabs, function (e) {
      n.defaults(e, {
        ariaLabel: e.title,
        htmlClass: "tab_id_" + e.id,
        styleOverride: "",
        emptyTabMessageKey: "expressionPicker_tab_emptyText"
      });
    });
  }), t.fillPackProperties = a.defineSimpleInteractor(function (e) {
    n(e.tabs).pluck("packs").flatten().forEach(function (e) {
      e.items["@Meta"] = n.assign(e.items["@Meta"] || {}, { typeKey: c.itemTypes.typeKeyName });
    }).value();
  }), t.paginateTabs = a.defineInteractor(function (e) {
    function t() {
      return { tabs: [] };
    }
    function r(e) {
      if (e.length < 7) {
        var r = t(!0);
        return r.tabs = n.map(e, function (e) {
          return n.pick(e, [
            "id",
            "title",
            "ariaLabel",
            "htmlClass",
            "type"
          ]);
        }), [r];
      }
      var i = e.reduce(function (e, r, i) {
          var s = e[e.length - 1];
          return s.tabs.length >= 4 && i !== 4 && (s = t(), e.push(s)), s.tabs.push(n.pick(r, [
            "id",
            "title",
            "ariaLabel",
            "htmlClass",
            "type"
          ])), e;
        }, [t()]), s = i[i.length - 1];
      return s.tabs.length === 1 && (i[i.length - 2].tabs.push(s.tabs[0]), i.pop()), i;
    }
    e(function (e) {
      e.pagedTabs = r(e.tabs);
    });
  }), t.setSelectedTab = a.defineSimpleInteractor(function (e) {
    e.selectedTab = n.find(e.tabs, { id: e.currentTabId }) || n.first(n.dropWhile(e.tabs, { id: c.mru.TAB_ID })) || n.first(e.tabs);
  }), t.scrollToSelectedTab = a.defineSimpleInteractor(function (e) {
    e.selectedPageIndex = n.findIndex(e.pagedTabs, function (t) {
      return n.any(t.tabs, { id: e.selectedTab.id });
    });
  }), t.setNormalTabProperties = a.defineSimpleInteractor(function (e) {
    e.pickerMaximized = !1, e.searchCapabilityEnabled = !1;
  }), t.selectItemAction = a.defineSimpleInteractor(function (e) {
    e.selectedItem = n.find(e._configuredItems, { id: e.selectedItemId }) || null;
  }), t.setSelectionState = a.defineComposer([
    t.setSelectedTab,
    t.setNormalTabProperties,
    r.setBingTabProperties,
    i.setGiphyTabProperties,
    l.setLocalSearchTabProperties,
    t.fillPackProperties
  ]), t.numberTabs = a.defineSimpleInteractor(function (t) {
    n.forEach(t.tabs, function (e, t) {
      e._index = t;
    });
  }), t.placeTab = a.defineSimpleInteractor(function (t, r, i) {
    var s = n.remove(t.tabs, { id: r });
    s.length && (i === -1 ? t.tabs.push(s[0]) : t.tabs.splice(i, 0, s[0]));
  }), t.applyTabPlacementOverrides = a.defineSimpleInteractor(function (r) {
    var i = r.pesTabPlacementOverrides || u.pesPicker.tabPlacementOverrides;
    n.forOwn(i, function (e, n) {
      t.placeTab.run(r, n, e);
    });
  }), t.pickerStateConstructor = function () {
    var e = h.resolve(o.serviceLocator.FEATURE_FLAGS), n = [
        t.clearContext,
        s.putPesTabs
      ];
    return e.isFeatureOn(o.featureFlags.PES_BING_IMAGE_SEARCH_ENABLED) && n.push(r.putBingTab), e.isFeatureOn(o.featureFlags.PES_GIPHY_IMAGE_SEARCH_ENABLED) && n.push(i.putGiphyTab), e.isFeatureOn(o.featureFlags.PES_LOCAL_SEARCH_ENABLED) && n.push(l.putLocalSearchTab), n = n.concat([
      f.putMRUTab,
      t.fillTabProperties,
      t.fillPackProperties,
      t.applyTabPlacementOverrides,
      t.paginateTabs,
      t.numberTabs,
      t.setSelectionState
    ]), a.defineComposer(n);
  }, t.mruStateUpdater = a.defineComposer([
    f.putMRUTab,
    t.fillTabProperties,
    t.fillPackProperties,
    t.paginateTabs,
    t.numberTabs,
    t.setSelectionState
  ]);
})

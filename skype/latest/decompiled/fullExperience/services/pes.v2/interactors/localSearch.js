define("services/pes.v2/interactors/localSearch", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-i18n",
  "utils/common/interactor",
  "experience/settings",
  "services/pes/constants"
], function (e, t) {
  var n = e("lodash-compat"), r = e("swx-i18n").localization, i = e("utils/common/interactor"), s = e("experience/settings"), o = e("services/pes/constants");
  t.putLocalSearchTab = i.defineSimpleInteractor(function (e) {
    var t = {
      id: o.localSearch.TAB_ID,
      type: o.itemTypes.tab.id,
      title: r.fetch({ key: "expressionPicker_localSearchTab_title" }),
      ariaLabel: r.fetch({ key: "expressionPicker_localSearchTab_ariaLabel" }),
      emptyTabMessageKey: "expressionPicker_localSearchTab_emptyText",
      thumbnailUrl: s.appBaseUrl + "/assets/images/components/chat/pes/tab_search.png",
      styleOverride: "",
      packs: []
    };
    e.tabs = e.tabs || [], n.remove(e.tabs, { id: o.localSearch.TAB_ID }), e.tabs.push(t);
  }), t.setLocalSearchTabProperties = i.defineSimpleInteractor(function (e) {
    e.selectedTab && e.selectedTab.id === o.localSearch.TAB_ID && (e.searchCapabilityEnabled = !0);
  }), t.groupByType = i.defineSimpleInteractor(function (e) {
    var t = n([
      "emoticon",
      "flik"
    ]).reduce(function (e, t) {
      return e[t] = {
        ariaLabel: r.fetch({ key: o.itemTypes[t].ariaLabelLocKey }),
        title: r.fetch({ key: o.itemTypes[t].titleLocKey }),
        id: o.localSearch.PACK_PREFIX + o.itemTypes[t].id,
        items: []
      }, e;
    }, {});
    n(e.packs).pluck("items").flatten().reduce(function (e, t) {
      return t.type in e && e[t.type].items.push(t), e;
    }, t), e.packs = n(t).map(function (e) {
      return e;
    }).value(), n.forEach(e.packs, function (e) {
      e.items.length === 0 && e.items.push({
        id: "",
        type: o.itemTypes.message.id,
        htmlClass: "",
        text: r.fetch({ key: "message_text_emptySearchResults" })
      });
    });
  });
})

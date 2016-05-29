define("ui/components/chat/pes.v2/localSearchTab/localSearchTab", [
  "require",
  "lodash-compat",
  "constants/common",
  "swx-i18n",
  "services/pes/constants",
  "services/serviceLocator",
  "experience/settings",
  "services/pes.v2/interactors/picker",
  "services/pes.v2/interactors/localSearch"
], function (e) {
  function f(e, n) {
    var r = t([
        e.keywords || [],
        e.shortcut || [],
        e.description.split(/\s/),
        (e.copyright || "").split(/\s/),
        (e.pickerTitle || "").split(/\s/),
        (e.transcript || "").split(/\s/)
      ]).flatten().compact().map(function (e) {
        return e.toLowerCase();
      }).value(), i = t(n.split(/\s/)).compact().map(function (t) {
        return t.toLowerCase();
      }).value();
    return t.any(i, function (e) {
      return t.any(r, function (t) {
        return t.search(e) === 0;
      });
    });
  }
  function l(e, n, r, i) {
    i.packs = [];
    var s = {};
    t.forEach(e.tabs, function (e) {
      t.forEach(e.packs, function (e) {
        var o = t.filter(e.items, t.bind(f, null, t, n)), u;
        o = t.filter(o, function (e) {
          var t = e.id in s;
          return t || (s[e.id] = !0), !t;
        });
        o.length && (u = t.cloneDeep(e), u.items = t.map(o, function (e) {
          return t.find(r._configuredItems, { id: e.id });
        }), i.packs.push(u));
      });
    });
    o.pesSearchServices.localSearchGroupByType && a.groupByType.run(i);
  }
  function c(e, n) {
    n.packs = [{
        ariaLabel: r.fetch({ key: i.localSearch.ariaLabelLocKey }),
        title: r.fetch({ key: i.localSearch.titleLocKey }),
        id: i.localSearch.PACK_PREFIX + "categories"
      }];
    n.packs[0].items = t(o.pesSearchServices.localSearchCategories).map(function (e) {
      return {
        id: e,
        type: i.itemTypes.message.id,
        htmlClass: "clickable",
        text: e
      };
    }).value();
  }
  function h(e, r, o) {
    var a = t.find(r.tabs, { id: i.localSearch.TAB_ID }), f = s.resolve(n.serviceLocator.PES_2_CONFIG_SERVICE), h = f.getConfiguration();
    e = (e || "").toLowerCase();
    a._currentQuery = e;
    e ? l(h, e, r, a) : c(r, a);
    u.setSelectionState.run(r);
    o(r, [
      "selectedTab",
      "selectedItem"
    ]);
  }
  var t = e("lodash-compat"), n = e("constants/common"), r = e("swx-i18n").localization, i = e("services/pes/constants"), s = e("services/serviceLocator"), o = e("experience/settings"), u = e("services/pes.v2/interactors/picker"), a = e("services/pes.v2/interactors/localSearch");
  return { doLocalSearch: h };
});

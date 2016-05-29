define("services/pes.v2/interactors/store", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "utils/common/interactor",
  "ui/modalDialog/modalDialog",
  "constants/common",
  "services/serviceLocator"
], function (e, t) {
  var n = e("lodash-compat"), r = e("utils/common/interactor"), i = e("ui/modalDialog/modalDialog"), s = e("constants/common"), o = e("services/serviceLocator");
  t.setStoreTabProperties = r.defineSimpleInteractor(function (e) {
    e.pickerState.storeEnabled || (e.pickerState.storeEnabled = !0, e.storeDialog = i, e.pickerState.purchasedTabs = [], e.pickerState.purchasedTabIds = [], i.build("pes-store", e, "<div id=\"pes-store\" class=\"swx-hide\"><swx-expressionstore-v2-browsepacks id=\"pes-store-comp\" params=\"pickerState: pickerState, pickerVM: pickerVM, storeModalDialog: storeDialog\"></swx-expressionstore-browsepacks></div>"));
  });
  t.disposeStore = r.defineSimpleInteractor(function () {
  });
  t.showStore = r.defineSimpleInteractor(function (e) {
    e.showStore && e.showStore();
  });
  t.downloadPreviouslyPurchasedTabs = r.defineSimpleInteractor(function (e, t) {
    var n = o.resolve(s.serviceLocator.PES_STORE_SERVICE), r = 0, i, u;
    i = e.purchasedTabs = e.purchasedTabs || [];
    u = e.purchasedTabIds = e.purchasedTabIds || {};
    n.downloadPurchasedTabsFromEntitlement().then(function (n) {
      n.forEach(function (s) {
        s.pesConfig.then(function (o) {
          i[s.id] = o.tabs[0];
          e._configuredItems = e._configuredItems.concat(o.items);
          r++;
          r === n.length && typeof t == "function" && t();
        });
        u.push(s.id);
      });
    });
  });
  t.putPurchasedTabs = r.defineSimpleInteractor(function (e) {
    if (!e.purchasedTabs)
      return;
    var t = e.purchasedTabIds, r = e.purchasedTabs;
    t.forEach(function (t) {
      n.remove(e.tabs, { id: t });
      e.tabs.splice(4, 0, r[t]);
    });
  });
  t.putNewPurchasedTab = r.defineSimpleInteractor(function (e, t, n) {
    var r = e.purchasedTabIds, i = e.purchasedTabs;
    r.push(t);
    i[t] = n.tabs[0];
    e._configuredItems = e._configuredItems.concat(n.items);
    e.tabs.splice(4, 0, i[t]);
  });
});

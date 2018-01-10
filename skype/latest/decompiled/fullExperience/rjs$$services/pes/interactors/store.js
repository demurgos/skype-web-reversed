define("services/pes/interactors/store", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "utils/common/interactor",
  "ui/modalDialog/modalDialog",
  "swx-constants",
  "swx-service-locator-instance"
], function (e, t) {
  var n = e("lodash-compat"), r = e("utils/common/interactor"), i = e("ui/modalDialog/modalDialog"), s = e("swx-constants").COMMON, o = e("swx-service-locator-instance").default;
  t.setStoreTabProperties = r.defineSimpleInteractor(function (e) {
    e.pickerState.storeEnabled || (e.pickerState.storeEnabled = !0, e.storeDialog = i, e.pickerState.purchasedTabs = [], e.pickerState.purchasedTabIds = [], i.build("pes-store", e, "<div id=\"pes-store\" class=\"swx-hide\"><swx-expressionstore-v2-browsepacks id=\"pes-store-comp\" params=\"pickerState: pickerState, pickerVM: pickerVM, storeModalDialog: storeDialog\"></swx-expressionstore-browsepacks></div>"));
  });
  t.disposeStore = r.defineSimpleInteractor(function () {
  });
  t.showStore = r.defineSimpleInteractor(function (e) {
    e.showStore && e.showStore();
  });
  t.downloadPreviouslyPurchasedTabs = r.defineSimpleInteractor(function (e, t) {
    var n = o.resolve(s.serviceLocator.PES_STORE_SERVICE), r = 0, i, u, a;
    i = e.purchasedTabs = e.purchasedTabs || {};
    u = e.purchasedTabIds = e.purchasedTabIds || [];
    a = e.hiddenTabIds = e.hiddenTabIds || [];
    n.downloadPurchasedTabsFromEntitlement().then(function (s) {
      n.getHiddenTabs().then(function (n) {
        a.push.apply(a, n);
        s.forEach(function (n) {
          n.pesConfig.then(function (o) {
            i[n.id] = o.tabs[0];
            e._configuredItems = e._configuredItems.concat(o.items);
            r++;
            r === s.length && typeof t == "function" && t();
          });
          u.push(n.id);
        });
      });
    });
  });
  t.putPurchasedTabs = r.defineSimpleInteractor(function (e) {
    if (!e.purchasedTabs)
      return;
    var t = e.purchasedTabIds, r = e.purchasedTabs;
    t.forEach(function (t) {
      e.hiddenTabIds.indexOf(t) === -1 && (n.remove(e.tabs, { id: t }), e.tabs.splice(4, 0, r[t]));
    });
  });
  t.putNewPurchasedTab = r.defineSimpleInteractor(function (e, t, n) {
    var r = e.purchasedTabIds, i = e.purchasedTabs;
    r.indexOf(t) === -1 && (r.push(t), i[t] = n.tabs[0]);
    e._configuredItems = e._configuredItems.concat(n.items);
    e.tabs.splice(4, 0, i[t]);
  });
  t.hidePurchasedTabOnPicker = r.defineSimpleInteractor(function (e, t) {
    var r = e.hiddenTabIds;
    r.push(t);
    n.remove(e.tabs, { id: t });
  });
});

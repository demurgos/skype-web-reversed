define("ui/viewModels/chat/pes/store/browseTabs", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "swx-constants",
  "browser/dom",
  "utils/common/scroll",
  "swx-service-locator-instance",
  "swx-constants",
  "utils/common/eventHelper",
  "services/pes/interactors/store",
  "services/pes/interactors/picker",
  "services/pes/configSync",
  "services/store/pes/catalogItemProcessor",
  "utils/common/outsideClickHandler"
], function (e) {
  function d(e, d) {
    function x() {
      v.showSpinner(!1);
      v.showErrorText(!1);
      v.showTabList(!0);
      v.showTabDetails(!0);
    }
    function T(t) {
      v.showSpinner(!1);
      v.showErrorText(!1);
      v.showTabDetails(!0);
      v.showTabList(!0);
      v.selectedTab(t);
      y.scrollToElement(i.getElement(".store-tab-item-details", e));
    }
    function N() {
      p.remove("overlaySlideContent");
    }
    function C() {
      p.add("overlaySlideContent", v.close);
    }
    function k() {
      v.showSpinner(!0);
      v.showErrorText(!1);
      v.showTabDetails(!1);
      v.showTabList(!1);
    }
    function L(e) {
      e.isDownloaded = n.observable(!1);
      e.showDownloadSpinner = n.observable(!1);
      e.thumbnailUrl = e.thumbnail;
      e.configData = n.observable(!1);
      e.showInList = n.observable(!0);
      e.cdnToken = n.observable(!1);
      e.isSelectedCSS = n.pureComputed(function () {
        return this.selectedTab().id === e.id ? "selected" : "";
      }, v);
      E.indexOf(e.id) !== -1 && S.indexOf(e.id) === -1 && e.isDownloaded(!0);
    }
    function A() {
      v.tabs().length || k();
      E = v.pickerState && v.pickerState.purchasedTabIds ? v.pickerState.purchasedTabIds : [];
      S = v.pickerState && v.pickerState.hiddenTabIds ? v.pickerState.hiddenTabIds : [];
      b.loadCatalog().then(function (e) {
        var t, n;
        x();
        for (t = 0; e && t < e.length; t++)
          n = e[t], m.indexOf(n.id) === -1 && (L(n), v.tabs.push(n), m.push(n.id));
        !v.selectedTab() && v.tabs()[0] && v.tabSelected(v.tabs()[0]);
      }, function () {
        v.showSpinner(!1);
        v.tabs().length || v.showErrorText(!0);
      });
    }
    function O(e) {
      return Promise.resolve(b.getItems(e.items)).then(function (t) {
        return e.configData(t), t;
      }).catch(function () {
        return [];
      });
    }
    function M(e) {
      return e.itemsLoaded ? Promise.resolve(e.configData()) : O(e);
    }
    function D(e) {
      var t = e.configData();
      h.loadStyles(t, c.latestToken, c._requiresCDNUrlAuthentication);
      f.putNewPurchasedTab.run(v.pickerState, e.id, t);
      l.mruStateUpdater.run(v.pickerState);
      v.pickerVM.applyState(v.pickerState);
      e.showDownloadSpinner(!1);
      e.isDownloaded(!0);
    }
    function P(e, t) {
      var n = [
          e.name,
          e.description
        ].concat(e.keywords), r;
      for (r = 0; r < n.length; r++)
        if (n[r] && n[r].toLowerCase().indexOf(t.toLowerCase()) > -1)
          return !0;
      return !1;
    }
    function H(e) {
      f.hidePurchasedTabOnPicker.run(v.pickerState, e.id);
      l.mruStateUpdater.run(v.pickerState);
    }
    var v = this, m = [], g = s.build(i.getElement(".tabs-list", e)), y = s.build(i.getElement(".tabs-details-wrapper", e)), b = o.resolve(u.serviceLocator.PES_STORE_SERVICE), w = o.resolve(u.serviceLocator.FEATURE_FLAGS), E = [], S = [];
    g.init();
    y.init();
    v.showSpinner = n.observable(!1);
    v.showErrorText = n.observable(!1);
    v.showTabList = n.observable(!1);
    v.showTabDetails = n.observable(!1);
    v.tabs = n.observableArray();
    v.selectedTab = n.observable(!1);
    v.searchQuery = n.observable("");
    d && (v.modalDialog = d.storeModalDialog || !1, v.pickerVM = d.pickerVM || !1, v.pickerState = d.pickerState || !1);
    v.showStore = function () {
      v.modalDialog && (C(), v.modalDialog.show("pes-store-comp"), g.adjustToRTLLayout(), y.adjustToRTLLayout(), A());
    };
    v.pickerState && (v.pickerState.showStore = v.showStore);
    v.tabSelected = function (e) {
      if (e.id === v.selectedTab().id)
        return;
      w.isFeatureOn(u.featureFlags.PES_CDN_AUTH_ENABLED) && w.isFeatureOn(u.featureFlags.PES_CDN_AUTH_URL_FALLBACK_ENABLED) && e.cdnToken(c.latestToken);
      if (e.itemsLoaded) {
        T(e);
        return;
      }
      O(e).then(function () {
        T(e);
        e.itemsLoaded = !0;
      }).catch(function () {
        v.showErrorText(!0);
        v.showTabDetails(!1);
        v.selectedTab(e);
      });
    };
    v.goToTabList = function () {
      v.selectedTab(!1);
      x();
    };
    v.buyOrDownloadTab = function (e) {
      if (e.isDownloaded())
        return e.isDownloaded(!1), H(e), !1;
      e.showDownloadSpinner(!0);
      if (E.indexOf(e.id) !== -1)
        return e.isDownloaded(!0), t.remove(v.pickerState.hiddenTabIds, function (t) {
          return t === e.id;
        }), M(e).then(function () {
          D(e);
        }), !1;
      b.buyTab(e).then(function () {
        M(e).then(function () {
          D(e);
        });
      });
    };
    v.doLocalSearch = t.debounce(function () {
      v.tabs().length && v.tabs().forEach(function (e) {
        if (!v.searchQuery()) {
          e.showInList(!0);
          return;
        }
        e.showInList(P(e, v.searchQuery()));
      });
    }, 400);
    v.onSearchBoxKeyDown = function (e, t) {
      var n = a.getKeyCode(t);
      if (n === r.ESCAPE) {
        v.searchQuery() && v.resetSearchBox();
        t.stopPropagation();
        return;
      }
      if (n === r.BACKSPACE && !v.searchQuery()) {
        a.swallow(t);
        return;
      }
      return n === r.ENTER ? !1 : (v.doLocalSearch(), !0);
    };
    v.close = function () {
      v.modalDialog.hide("pes-store-comp");
      v.pickerState && v.pickerState.hiddenTabIds && b.postHiddenTabs(v.pickerState.hiddenTabIds);
      N();
    };
    v.resetSearchBox = function () {
      v.searchQuery("");
    };
    v.dispose = function () {
      g.dispose();
      y.dispose();
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("swx-constants").KEYS, i = e("browser/dom"), s = e("utils/common/scroll"), o = e("swx-service-locator-instance").default, u = e("swx-constants").COMMON, a = e("utils/common/eventHelper"), f = e("services/pes/interactors/store"), l = e("services/pes/interactors/picker"), c = e("services/pes/configSync"), h = e("services/store/pes/catalogItemProcessor"), p = e("utils/common/outsideClickHandler");
  return d.build = function (e, t) {
    return new d(e, t);
  }, d;
});

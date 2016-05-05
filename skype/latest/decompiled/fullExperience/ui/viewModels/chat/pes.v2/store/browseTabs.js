define("ui/viewModels/chat/pes.v2/store/browseTabs", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "constants/keys",
  "browser/dom",
  "utils/common/scroll",
  "services/serviceLocator",
  "constants/common",
  "utils/common/eventHelper",
  "services/pes.v2/interactors/store",
  "services/pes.v2/interactors/picker",
  "services/pes.v2/configSync",
  "services/store/pes/catalogItemProcessor"
], function (e) {
  function p(e, p) {
    function E() {
      d.showSpinner(!1), d.showErrorText(!1), d.showTabList(!0), d.showTabDetails(!0);
    }
    function S(t) {
      d.showSpinner(!1), d.showErrorText(!1), d.showTabDetails(!0), d.showTabList(!0), d.selectedTab(t), g.scrollToElement(i.getElement(".store-tab-item-details", e));
    }
    function x() {
      d.showSpinner(!0), d.showErrorText(!1), d.showTabDetails(!1), d.showTabList(!1);
    }
    function T(e) {
      e.isDownloaded = n.observable(!1), e.showDownloadSpinner = n.observable(!1), e.thumbnailUrl = e.thumbnail, e.configData = n.observable(!1), e.showInList = n.observable(!0), e.cdnToken = n.observable(!1), e.isSelectedCSS = n.pureComputed(function () {
        return this.selectedTab().id === e.id ? "selected" : "";
      }, d), w.indexOf(e.id) !== -1 && e.isDownloaded(!0);
    }
    function N() {
      d.tabs().length || x(), w = d.pickerState && d.pickerState.purchasedTabIds ? d.pickerState.purchasedTabIds : [], y.loadCatalog().then(function (e) {
        var t, n;
        E();
        for (t = 0; e && t < e.length; t++)
          n = e[t], v.indexOf(n.id) === -1 && (T(n), d.tabs.push(n), v.push(n.id));
        !d.selectedTab() && d.tabs()[0] && d.tabSelected(d.tabs()[0]);
      }, function () {
        d.showSpinner(!1), d.tabs().length || d.showErrorText(!0);
      });
    }
    function C(e) {
      return Promise.resolve(y.getItems(e.items)).then(function (t) {
        return e.configData(t), t;
      }).catch(function () {
        return [];
      });
    }
    function k(e) {
      var t = e.configData();
      h.loadStyles(t, c.latestToken, c._requiresCDNUrlAuthentication), f.putNewPurchasedTab.run(d.pickerState, e.id, t), l.mruStateUpdater.run(d.pickerState), d.pickerVM.applyState(d.pickerState), e.showDownloadSpinner(!1), e.isDownloaded(!0);
    }
    function L(e, t) {
      var n = [
          e.name,
          e.description
        ].concat(e.keywords), r;
      for (r = 0; r < n.length; r++)
        if (n[r] && n[r].toLowerCase().indexOf(t.toLowerCase()) > -1)
          return !0;
      return !1;
    }
    function A(e) {
      t.remove(d.pickerState.tabs, { id: e.id }), l.mruStateUpdater.run(d.pickerState);
    }
    var d = this, v = [], m = s.build(i.getElement(".tabs-list", e)), g = s.build(i.getElement(".tabs-details-wrapper", e)), y = o.resolve(u.serviceLocator.PES_STORE_SERVICE), b = o.resolve(u.serviceLocator.FEATURE_FLAGS), w = [];
    m.init(), g.init(), d.showSpinner = n.observable(!1), d.showErrorText = n.observable(!1), d.showTabList = n.observable(!1), d.showTabDetails = n.observable(!1), d.tabs = n.observableArray(), d.selectedTab = n.observable(!1), d.searchQuery = n.observable(""), p && (d.modalDialog = p.storeModalDialog || !1, d.pickerVM = p.pickerVM || !1, d.pickerState = p.pickerState || !1), d.showStore = function () {
      d.modalDialog && (d.modalDialog.show("pes-store-comp"), m.adjustToRTLLayout(), g.adjustToRTLLayout(), N());
    }, d.pickerState && (d.pickerState.showStore = d.showStore), d.tabSelected = function (e) {
      if (e.id === d.selectedTab().id)
        return;
      b.isFeatureOn(u.featureFlags.PES_CDN_AUTH_ENABLED) && b.isFeatureOn(u.featureFlags.PES_CDN_AUTH_URL_FALLBACK_ENABLED) && e.cdnToken(c.latestToken);
      if (e.itemsLoaded) {
        S(e);
        return;
      }
      C(e).then(function () {
        S(e), e.itemsLoaded = !0;
      }).catch(function () {
        d.showErrorText(!0), d.showTabDetails(!1), d.selectedTab(e);
      });
    }, d.goToTabList = function () {
      d.selectedTab(!1), E();
    }, d.buyOrDownloadTab = function (e) {
      if (e.isDownloaded())
        return e.isDownloaded(!1), A(e), !1;
      e.showDownloadSpinner(!0);
      if (w.indexOf(e.id) !== -1 && e.itemsLoaded)
        return e.isDownloaded(!0), k(e), !1;
      y.buyTab(e).then(function () {
        e.itemsLoaded ? k(e) : C(e).then(function () {
          k(e);
        });
      });
    }, d.doLocalSearch = t.debounce(function () {
      d.tabs().length && d.tabs().forEach(function (e) {
        if (!d.searchQuery()) {
          e.showInList(!0);
          return;
        }
        e.showInList(L(e, d.searchQuery()));
      });
    }, 400), d.onSearchBoxKeyDown = function (e, t) {
      var n = a.getKeyCode(t);
      if (n === r.ESCAPE) {
        if (d.searchQuery()) {
          t.stopPropagation();
          return;
        }
        return;
      }
      if (n === r.BACKSPACE && !d.searchQuery()) {
        a.swallow(t);
        return;
      }
      return n === r.ENTER ? !1 : (d.doLocalSearch(), !0);
    }, d.close = function () {
      d.modalDialog.hide("pes-store-comp");
    }, d.dispose = function () {
      m.dispose(), g.dispose();
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("constants/keys"), i = e("browser/dom"), s = e("utils/common/scroll"), o = e("services/serviceLocator"), u = e("constants/common"), a = e("utils/common/eventHelper"), f = e("services/pes.v2/interactors/store"), l = e("services/pes.v2/interactors/picker"), c = e("services/pes.v2/configSync"), h = e("services/store/pes/catalogItemProcessor");
  return p.build = function (e, t) {
    return new p(e, t);
  }, p;
})

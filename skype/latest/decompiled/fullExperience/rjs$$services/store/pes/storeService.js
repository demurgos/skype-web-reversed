define("services/store/pes/storeService", [
  "require",
  "lodash-compat",
  "services/store/pes/catalogItemProcessor",
  "experience/settings",
  "swx-cafe-application-instance",
  "swx-utils-common",
  "services/pes/configSync",
  "reqwest"
], function (e) {
  function l(e) {
    var n = {
      dataType: "json",
      crossOrigin: !0
    };
    return e && t.extend(n, e), n;
  }
  function c() {
    return o.get().signInManager._skypeToken();
  }
  function h() {
  }
  var t = e("lodash-compat"), n = e("services/store/pes/catalogItemProcessor"), r = e("experience/settings"), i = r.pesStoreServices, s = r.entitlementService, o = e("swx-cafe-application-instance"), u = e("swx-utils-common").builderMixin, a = e("services/pes/configSync"), f = e("reqwest");
  return h.prototype.loadCatalog = function () {
    var t = l({
      url: "https://" + i.catalogApiHost + i.catalogServiceEndpoint.replace("${lang}", r.locale.pes),
      headers: { Accept: "application/json; ver=" + i.catalogServiceVersion }
    });
    return i.catalogDogfoodContentEnabled && (t.headers["X-Skype-Config-Namespace"] = "showNonDiscoverable"), Promise.resolve(f.compat(t)).then(function (e) {
      var t = e.skus;
      return n.processSKUs(t), t;
    }).catch(function () {
      return [];
    });
  }, h.prototype.getItems = function (t) {
    var r;
    return t ? (r = l({ url: t }), Promise.resolve(f.compat(r)).then(function (e) {
      return n.processTabConfig(e), n.loadStyles(e, a.latestToken, a._requiresCDNUrlAuthentication), e;
    }).catch(function () {
      return null;
    })) : Promise.reject("No valid config url Specified");
  }, h.prototype.getItemsForTabs = function (t) {
    var n = this;
    return Promise.resolve(n.loadCatalog()).then(function (e) {
      return t.forEach(function (t) {
        var r, i;
        for (r = 0; r < e.length; r++) {
          i = e[r];
          if (i.id === t.id) {
            t.pesConfig = n.getItems(i.items);
            break;
          }
        }
      }), t;
    });
  }, h.prototype.getHiddenTabs = function () {
    var t, n = o.get().personsAndGroupsManager.mePerson;
    return t = l({ url: r.userOptionsService.host + r.userOptionsService.optionsEndpoint.replace("${userId}", n.id()).replace("${optionName}", "OPT_HIDDEN_EXPRESSION_TABS") }), Promise.resolve(c()).catch(function () {
      return null;
    }).then(function (e) {
      return e ? (t.headers = {
        "X-Skypetoken": e,
        Accept: "application/json; ver=1.0"
      }, f.compat(t)) : Promise.reject("Invalid Skype token");
    }).catch(function () {
    }).then(function (e) {
      var t = [];
      return e && e.optionStr && (t = JSON.parse(e.optionStr)), t;
    });
  }, h.prototype.postHiddenTabs = function (t) {
    var n, i = o.get().personsAndGroupsManager.mePerson;
    return n = l({
      url: r.userOptionsService.host + r.userOptionsService.optionsEndpoint.replace("${userId}", i.id()).replace("${optionName}", "OPT_HIDDEN_EXPRESSION_TABS"),
      type: "post",
      data: "stringValue=" + JSON.stringify(t)
    }), Promise.resolve(c()).catch(function () {
      return null;
    }).then(function (e) {
      return e ? (n.headers = { "X-Skypetoken": e }, f.compat(n)) : Promise.reject("Invalid Skype token");
    }).catch(function () {
    }).then(function () {
      return "success";
    });
  }, h.prototype.getTabsFromEntitlement = function () {
    var e = o.get().personsAndGroupsManager.mePerson, t;
    return t = l({ url: s.host + s.listingEndpoint.substring(1).replace("${username}", e.id()) }), Promise.resolve(c()).catch(function () {
      return null;
    }).then(function (e) {
      return e ? (t.headers = {
        "X-Skypetoken": e,
        Accept: "application/json; ver=3.0"
      }, f.compat(t)) : Promise.reject("Invalid Skype token");
    }).catch(function () {
    }).then(function (e) {
      var t = [];
      return e && (t = e.reduce(function (e, t) {
        var n, r;
        return t.service === "sticker" && t.attributes && t.attributes.pack && (n = t.attributes.pack, r = new Date(t.start).getTime(), e.push({
          id: n,
          purchaseDateTime: r
        })), e.sort(function (e, t) {
          return e.purchaseDateTime - t.purchaseDateTime;
        });
      }, t)), t;
    });
  }, h.prototype.downloadPurchasedTabsFromEntitlement = function () {
    var t = this;
    return Promise.resolve(t.getTabsFromEntitlement()).then(function (e) {
      return t.getItemsForTabs(e);
    }).then(function (e) {
      var t = [];
      return e.forEach(function (e) {
        e.pesConfig && t.push(e);
      }), t;
    });
  }, h.prototype.buyTab = function (t) {
    var n, r;
    return t ? (r = t.__metadata.links.apiPurchase, n = l({
      url: r.hrefFull,
      type: "post",
      data: r.data
    }), Promise.resolve(c()).catch(function () {
      return null;
    }).then(function (e) {
      return e ? (n.headers = {
        "X-Skypetoken": e,
        Accept: "application/json; ver=" + i.catalogPurchaseApiVersion
      }, f.compat(n)) : Promise.reject("Invalid Skype token");
    }).catch(function () {
      return null;
    }).then(function (e) {
      return e ? "success" : Promise.reject("error purchasing tab");
    })) : Promise.reject("Not a valid tab");
  }, t.extend(h, u), h;
});

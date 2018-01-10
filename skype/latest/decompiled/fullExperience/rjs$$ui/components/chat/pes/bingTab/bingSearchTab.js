define("ui/components/chat/pes/bingTab/bingSearchTab", [
  "require",
  "lodash-compat",
  "swx-cafe-application-instance",
  "utils/common/cancelation",
  "swx-constants",
  "services/pes/constants",
  "swx-service-locator-instance",
  "services/pes/interactors/bing",
  "services/pes/interactors/picker",
  "experience/settings"
], function (e) {
  function l(e, t) {
    var n = o.resolve(i.serviceLocator.PES_BING_SEARCH_SERVICE);
    return Promise.all([
      n.search(e + " meme", { cancelationToken: t }),
      n.search(e + " gif", { cancelationToken: t })
    ]);
  }
  function c(e, r, s) {
    return n.get().signInManager._skypeToken ? n.get().signInManager._skypeToken().then(function (n) {
      var u = o.resolve(i.serviceLocator.URL_PREVIEW_SERVICE), a = t.map(e, function (e) {
          if (e.contentType === "image/animatedgif") {
            var t = u.getPreviewFor(e.url, {
                cancelationToken: r,
                skypeToken: n
              }), i = function (t) {
                s && s(e, t);
              };
            return t.then(i).catch(function () {
            });
          }
          return Promise.resolve();
        });
      return Promise.all(a);
    }) : Promise.resolve([]);
  }
  function h(e, n, r, i) {
    function g(n, r) {
      if (r.thumbnail && r.content_type === "image/gif") {
        var i = t.find(e._configuredItems, { id: n.id });
        i && (i.thumbnail = r.thumbnail, d());
      }
    }
    var o = n[0], a = n[1], l = f.pesSearchServices.bingPickFirst === "gif", h = !!f.pesSearchServices.bingMergeItems, p = u.createBingPacks.run({
        featureGifsFirst: l,
        featureCombine: h,
        gifResults: a,
        memeResults: o
      }), d = t.throttle(function () {
        i.isCanceled || r(e);
      }, 400), v;
    i.throwIfCanceled();
    t.remove(e._configuredItems, function (e) {
      return e.type === s.itemTypes.image.id && t.find(p.items, { id: e.id });
    });
    e._configuredItems = e._configuredItems.concat(p.items);
    v = t.find(e.tabs, { id: s.bingSearch.TAB_ID });
    var m = t.every(p.packs, function (e) {
      return e.items.length === 0;
    });
    return m ? v.emptyTabMessageKey = "message_text_emptySearchResults" : (v.packs = p.packs, v.emptyTabMessageKey = "expressionPicker_bingTab_emptyText"), r(e), c(p.items, i, g);
  }
  function p(e, n, i) {
    var o, u;
    u = t.find(n.tabs, { id: s.bingSearch.TAB_ID });
    u && (u.emptyTabMessageKey = "expressionPicker_bingTab_loadingText");
    v(n);
    o = r.cancelableOperation();
    n._currentOperation = o;
    u._currentQuery = e;
    u.packs = [];
    i(n);
    l(e, o.getToken()).then(function (e) {
      h(n, e, i, o.getToken());
    }).catch(function (e) {
      if (e instanceof r.OperationCanceledError)
        return;
      var o = t.find(n.tabs, { id: s.bingSearch.TAB_ID });
      o.emptyTabMessageKey = "expressionPicker_bingTab_errorText";
      i(n);
    });
  }
  function d(e, n, r) {
    var i = t.map(f.pesSearchServices.bingTriggerWords, function (e) {
        return e.toLowerCase();
      }), o = (e || "").toLowerCase().split(/\s/), u = t.remove(o, t.includes.bind(t, i)), l, c;
    t.any(u) && (l = t.compact(o).join(" "), c = t.find(n.tabs, { id: s.bingSearch.TAB_ID }), c._currentQuery = l, n.currentTabId = s.bingSearch.TAB_ID, n = a.setSelectionState.run(n), r(n));
  }
  function v(e) {
    var n;
    e._currentOperation && (n = t.find(e.tabs, { id: s.bingSearch.TAB_ID }), n && (n._currentQuery = ""), e._currentOperation.cancel());
  }
  var t = e("lodash-compat"), n = e("swx-cafe-application-instance"), r = e("utils/common/cancelation"), i = e("swx-constants").COMMON, s = e("services/pes/constants"), o = e("swx-service-locator-instance").default, u = e("services/pes/interactors/bing"), a = e("services/pes/interactors/picker"), f = e("experience/settings");
  return {
    highlightTabOnBingKeywords: d,
    doBingSearch: p,
    cancelBingSearch: v,
    getResultsFromBing: l,
    getImagesFromURLPService: c,
    processResultsFromBing: h
  };
});

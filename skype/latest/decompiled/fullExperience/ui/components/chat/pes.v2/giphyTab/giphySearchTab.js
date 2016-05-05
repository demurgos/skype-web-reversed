define("ui/components/chat/pes.v2/giphyTab/giphySearchTab", [
  "require",
  "lodash-compat",
  "utils/common/cancelation",
  "constants/common",
  "services/pes/constants",
  "services/serviceLocator",
  "experience/settings",
  "services/pes.v2/interactors/giphy"
], function (e) {
  function c(e) {
    return t.isArray(e.data) ? e : (e.data = [e.data], e);
  }
  function h(e) {
    return t.isArray(e.data) ? e : (e.data.images = {
      downsized: {
        width: e.data.fixed_height_downsampled_width,
        height: e.data.fixed_height_downsampled_height,
        url: e.data.fixed_height_downsampled_url
      },
      original: { url: e.data.image_url }
    }, e);
  }
  function p(e, t, n) {
    var i = s.resolve(r.serviceLocator.PES_GIPHY_SEARCH_SERVICE);
    return Promise.all(t.map(function (t) {
      var r = i[t];
      return r ? (t in f ? r = r.bind(i) : r = r.bind(i, e), r({
        cancelationToken: n,
        limit: a
      }).then(l[t])) : Promise.resolve([{ data: [] }]);
    }));
  }
  function d(e, n) {
    var r = e ? o.pesSearchServices.giphy.withQuerySources : o.pesSearchServices.giphy.withoutQuerySources, i = p(e, r, n);
    return i.then(function (e) {
      var n = t(e).map(function (e) {
        return e.data;
      }).flatten().reduce(function (e, n) {
        return t.find(e, { id: n.id }) || e.push(n), e;
      }, []);
      return { data: t.take(n, a) };
    });
  }
  function v(e, n, r, s) {
    var o = u.createGiphyPacks.run(n), a;
    s.throwIfCanceled(), t.remove(e._configuredItems, function (e) {
      return e.type === i.itemTypes.image.id && t.find(o.items, { id: e.id });
    }), e._configuredItems = e._configuredItems.concat(o.items), a = t.find(e.tabs, { id: i.giphyImageSearch.TAB_ID });
    var f = t.every(o.packs, function (e) {
      return e.items.length === 0;
    });
    f ? a.emptyTabMessageKey = "message_text_emptySearchResults" : (a.packs = o.packs, a.emptyTabMessageKey = "expressionPicker_giphyImgTab_emptyText"), r(e);
  }
  function m(e, r, s) {
    var o, u;
    u = t.find(r.tabs, { id: i.giphyImageSearch.TAB_ID }), u && (u.emptyTabMessageKey = "expressionPicker_giphyImgTab_loadingText"), g(r), o = n.cancelableOperation(), r._currentOperation = o, u._currentQuery = e, u.packs = [], s(r), d(e, o.getToken()).then(function (e) {
      v(r, e, s, o.getToken());
    }).catch(function (e) {
      if (e instanceof n.OperationCanceledError)
        return;
      var o = t.find(r.tabs, { id: i.giphyImageSearch.TAB_ID });
      o.emptyTabMessageKey = "expressionPicker_giphyImgTab_errorText", s(r);
    });
  }
  function g(e) {
    var n;
    e._currentOperation && (n = t.find(e.tabs, { id: i.giphyImageSearch.TAB_ID }), n && (n._currentQuery = ""), e._currentOperation.cancel());
  }
  var t = e("lodash-compat"), n = e("utils/common/cancelation"), r = e("constants/common"), i = e("services/pes/constants"), s = e("services/serviceLocator"), o = e("experience/settings"), u = e("services/pes.v2/interactors/giphy"), a = 20, f = { trending: !0 }, l = {
      translate: c,
      random: h,
      search: t.identity,
      trending: t.identity
    };
  return {
    doGiphySearch: m,
    cancelGiphySearch: g,
    getResultsFromGiphy: d,
    processResultsFromGiphy: v
  };
})

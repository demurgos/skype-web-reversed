define("ui/components/chat/pes/giphyTab/giphySearchTab", [
  "require",
  "lodash-compat",
  "utils/common/cancelation",
  "swx-constants",
  "services/pes/constants",
  "swx-service-locator-instance",
  "experience/settings",
  "services/pes/interactors/giphy",
  "telemetry/chat/giphyServiceQOS"
], function (e) {
  function h(e) {
    return t.isArray(e.data) ? e : (e.data = [e.data], e);
  }
  function p(e) {
    return t.isArray(e.data) ? e : (e.data.images = {
      downsized: {
        width: e.data.fixed_height_downsampled_width,
        height: e.data.fixed_height_downsampled_height,
        url: e.data.fixed_height_downsampled_url
      },
      original: { url: e.data.image_url }
    }, e.data = [e.data], e);
  }
  function d(e, t, n) {
    var i = s.resolve(r.serviceLocator.PES_GIPHY_SEARCH_SERVICE);
    return Promise.all(t.map(function (t) {
      var r = i[t], s;
      return r ? (t in l ? r = r.bind(i) : r = r.bind(i, e), s = a.build(), r({
        cancelationToken: n,
        limit: f
      }).catch(function (e) {
        throw s.publish({
          querySource: t,
          success: !1,
          responseCode: e.status
        }), e;
      }).then(c[t]).then(function (e) {
        return s.publish({
          querySource: t,
          success: !0,
          count: e.data.length,
          responseCode: 200
        }), e;
      }).then(function (e) {
        return e.data.forEach(function (e) {
          e.querySource = t;
        }), e;
      })) : Promise.resolve([{ data: [] }]);
    }));
  }
  function v(e, n) {
    var r = e ? o.pesSearchServices.giphy.withQuerySources : o.pesSearchServices.giphy.withoutQuerySources, i = d(e, r, n);
    return i.then(function (e) {
      var n = t(e).map(function (e) {
        return e.data;
      }).flatten().reduce(function (e, n) {
        return t.find(e, { id: n.id }) || e.push(n), e;
      }, []);
      return { data: t.take(n, f) };
    });
  }
  function m(e, n, r, s) {
    var o = u.createGiphyPacks.run(n), a;
    s.throwIfCanceled();
    t.remove(e._configuredItems, function (e) {
      return e.type === i.itemTypes.image.id && t.find(o.items, { id: e.id });
    });
    e._configuredItems = e._configuredItems.concat(o.items);
    a = t.find(e.tabs, { id: i.giphyImageSearch.TAB_ID });
    var f = t.every(o.packs, function (e) {
      return e.items.length === 0;
    });
    f ? a.emptyTabMessageKey = "message_text_emptySearchResults" : (a.packs = o.packs, a.emptyTabMessageKey = "expressionPicker_giphyImgTab_emptyText");
    r(e);
  }
  function g(e, r, s) {
    var o, u;
    u = t.find(r.tabs, { id: i.giphyImageSearch.TAB_ID });
    u && (u.emptyTabMessageKey = "expressionPicker_giphyImgTab_loadingText");
    y(r);
    o = n.cancelableOperation();
    r._currentOperation = o;
    u._currentQuery = e;
    u.packs = [];
    s(r);
    v(e, o.getToken()).then(function (e) {
      m(r, e, s, o.getToken());
    }).catch(function (e) {
      if (e instanceof n.OperationCanceledError)
        return;
      var o = t.find(r.tabs, { id: i.giphyImageSearch.TAB_ID });
      o.emptyTabMessageKey = "expressionPicker_giphyImgTab_errorText";
      s(r);
    });
  }
  function y(e) {
    var n;
    e._currentOperation && (n = t.find(e.tabs, { id: i.giphyImageSearch.TAB_ID }), n && (n._currentQuery = ""), e._currentOperation.cancel());
  }
  var t = e("lodash-compat"), n = e("utils/common/cancelation"), r = e("swx-constants").COMMON, i = e("services/pes/constants"), s = e("swx-service-locator-instance").default, o = e("experience/settings"), u = e("services/pes/interactors/giphy"), a = e("telemetry/chat/giphyServiceQOS"), f = 20, l = { trending: !0 }, c = {
      translate: h,
      random: p,
      search: t.identity,
      trending: t.identity
    };
  return {
    doGiphySearch: g,
    cancelGiphySearch: y,
    getResultsFromGiphy: v,
    processResultsFromGiphy: m
  };
});

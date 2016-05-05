define("services/pes.v2/interactors/cloud", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "constants/common",
  "utils/common/interactor",
  "services/pes/constants",
  "utils/chat/pesUtils",
  "services/serviceLocator",
  "experience/settings"
], function (e, t) {
  var n = e("lodash-compat"), r = e("constants/common"), i = e("utils/common/interactor"), s = e("services/pes/constants"), o = e("utils/chat/pesUtils"), u = e("services/serviceLocator"), a = e("experience/settings");
  t.pesGetConfig = i.defineSimpleInteractor(function (t) {
    var i = u.resolve(r.serviceLocator.PES_2_CONFIG_SERVICE);
    n.assign(t, n.cloneDeep(i.getConfiguration()));
  }), t.pesDecorateTabs = i.defineSimpleInteractor(function (t) {
    var r = { emptyTabMessageKey: "expressionPicker_tab_emptyText" };
    t.tabs.forEach(function (e) {
      n.defaults(e, r);
    });
  }), t.pesRemoveHiddenItems = i.defineSimpleInteractor(function (t) {
    n(t.tabs).map("packs").flatten().forEach(function (e) {
      e.items = n.reject(e.items, { visible: !1 });
    }).value();
  }), t.pesDecorateEmoticons = i.defineSimpleInteractor(function (e) {
    e.items.forEach(function (e) {
      e.type === s.itemTypes.emoticon.id && (e.staticHtmlClass = e.id, e.staticExtraLargeHtmlClass = e.staticHtmlClass + " extraLarge", e.animatedExtraLargeHtmlClass = e.staticExtraLargeHtmlClass + " animated", e.shortcut = n.first(e.shortcuts) || "", [
        "etag",
        "facebook",
        "keywords",
        "media",
        "shortcuts",
        "useInSms",
        "visible"
      ].forEach(function (t) {
        e.hasOwnProperty(t) && delete e[t];
      }));
    });
  }), t.pesDecorateMojis = i.defineSimpleInteractor(function (e) {
    e.items.forEach(function (t) {
      t.type === s.itemTypes.moji.id && (t.thumbnailClass = "id_" + t.id + " thumbnail", t.keyframeClass = "id_" + t.id + " keyframe", t.contentUrl = e.itemsRoot + "/" + t.id + "/views/" + s.profiles.moji.content, e._requiresCDNUrlAuthentication && (t.contentUrl += "?" + e._cdnToken), [
        "etag",
        "auxiliaryUrl",
        "isSponsored",
        "keywords"
      ].forEach(function (e) {
        t.hasOwnProperty(e) && delete t[e];
      }));
    });
  }), t.pesRewriteMojiPaths = i.defineSimpleInteractor(function (e) {
    var t = u.resolve(r.serviceLocator.FEATURE_FLAGS);
    t.isFeatureOn(r.featureFlags.PES_CDN_AUTH_ENABLED) && e.items.forEach(function (e) {
      e.type === s.itemTypes.moji.id && (e.contentUrl = o.rewriteUrls(e.contentUrl, a.pesCDNAuthentication.rewriteRules));
    });
  }), t.pesConfigPipeline = i.defineComposer([
    t.pesGetConfig,
    t.pesRemoveHiddenItems,
    t.pesDecorateTabs,
    t.pesDecorateEmoticons,
    t.pesDecorateMojis,
    t.pesRewriteMojiPaths
  ]), t.putPesTabs = i.defineSimpleInteractor(function (e) {
    var n = t.pesConfigPipeline.run({});
    e.tabs = e.tabs.concat(n.tabs), e._configuredItems = e._configuredItems.concat(n.items);
  });
})

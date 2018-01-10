define("services/pes/interactors/cloud", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-constants",
  "utils/common/interactor",
  "services/pes/constants",
  "ui/modelHelpers/personHelper",
  "utils/chat/pesUtils",
  "swx-service-locator-instance",
  "experience/settings"
], function (e, t) {
  var n = e("lodash-compat"), r = e("swx-constants").COMMON, i = e("utils/common/interactor"), s = e("services/pes/constants"), o = e("ui/modelHelpers/personHelper"), u = e("utils/chat/pesUtils"), a = e("swx-service-locator-instance").default, f = e("experience/settings");
  t.pesGetConfig = i.defineSimpleInteractor(function (t) {
    var i = a.resolve(r.serviceLocator.PES_CONFIG_SERVICE);
    n.assign(t, n.cloneDeep(i.getConfiguration()));
  });
  t.pesDecorateTabs = i.defineSimpleInteractor(function (t) {
    var r = { emptyTabMessageKey: "expressionPicker_tab_emptyText" };
    t.tabs.forEach(function (e) {
      n.defaults(e, r);
    });
  });
  t.pesHideMojis = i.defineSimpleInteractor(function (t) {
    var r = t.conversationModel;
    if (!r || !r.participants().length)
      return;
    var i = r.participants(0).person, u = o.isAgent(i), a = !!i && !!i.capabilities._mojiSend && i.capabilities._mojiSend();
    !r.isGroupConversation() && u && !a && n.forEach(t.items, function (e) {
      e.type === s.itemTypes.moji.id && (e.visible = !1);
    });
  });
  t.pesRemoveHiddenItems = i.defineSimpleInteractor(function (t) {
    n(t.tabs).map("packs").flatten().forEach(function (e) {
      e.items = n.reject(e.items, { visible: !1 });
    }).value();
  });
  t.pesDecorateEmoticons = i.defineSimpleInteractor(function (e) {
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
  });
  t.pesDecorateMojis = i.defineSimpleInteractor(function (e) {
    e.items.forEach(function (t) {
      t.type === s.itemTypes.moji.id && (t.mojiId = e.itemsRoot + "/" + t.id, t.thumbnailClass = "id_" + t.id + " thumbnail", t.keyframeClass = "id_" + t.id + " keyframe", t.contentUrl = e.itemsRoot + "/" + t.id + "/views/" + s.profiles.moji.content, e._requiresCDNUrlAuthentication && (t.contentUrl += "?" + e._cdnToken), [
        "etag",
        "auxiliaryUrl",
        "isSponsored",
        "keywords"
      ].forEach(function (e) {
        t.hasOwnProperty(e) && delete t[e];
      }));
    });
  });
  t.pesRewriteMojiPaths = i.defineSimpleInteractor(function (e) {
    var t = a.resolve(r.serviceLocator.FEATURE_FLAGS);
    t.isFeatureOn(r.featureFlags.PES_CDN_AUTH_ENABLED) && e.items.forEach(function (e) {
      e.type === s.itemTypes.moji.id && (e.contentUrl = u.rewriteUrls(e.contentUrl, f.pesCDNAuthentication.rewriteRules));
    });
  });
  t.pesConfigPipeline = i.defineComposer([
    t.pesGetConfig,
    t.pesHideMojis,
    t.pesRemoveHiddenItems,
    t.pesDecorateTabs,
    t.pesDecorateEmoticons,
    t.pesDecorateMojis,
    t.pesRewriteMojiPaths
  ]);
  t.putPesTabs = i.defineSimpleInteractor(function (e) {
    var n = t.pesConfigPipeline.run({ conversationModel: e.conversationModel });
    e.tabs = e.tabs.concat(n.tabs);
    e._configuredItems = e._configuredItems.concat(n.items);
  });
});

define("services/pes.v2/interactors/giphy", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-i18n",
  "utils/common/interactor",
  "services/pes.v2/interactors/bing",
  "experience/settings",
  "services/pes/constants"
], function (e, t) {
  var n = e("lodash-compat"), r = e("swx-i18n").localization, i = e("utils/common/interactor"), s = e("services/pes.v2/interactors/bing"), o = e("experience/settings"), u = e("services/pes/constants");
  t.putGiphyTab = i.defineSimpleInteractor(function (e) {
    var t = {
      id: u.giphyImageSearch.TAB_ID,
      type: u.itemTypes.tab.id,
      title: r.fetch({ key: "expressionPicker_giphyImgTab_title" }),
      ariaLabel: r.fetch({ key: "expressionPicker_giphyImgTab_ariaLabel" }),
      emptyTabMessageKey: "expressionPicker_giphyImgTab_emptyText",
      thumbnailUrl: o.appBaseUrl + "/assets/images/components/chat/pes/tab_giphy.png",
      styleOverride: "large-tab",
      packs: []
    };
    n.remove(e.tabs, { id: u.giphyImageSearch.TAB_ID });
    e.tabs.push(t);
  });
  t.setGiphyTabProperties = i.defineSimpleInteractor(function (e) {
    e.selectedTab && e.selectedTab.id === u.giphyImageSearch.TAB_ID && (e.pickerMaximized = !0, e.searchCapabilityEnabled = !0);
  });
  t.mapGiphyAPIResults = i.defineSimpleInteractor(function (e) {
    e.items = n.map(e.data, function (e) {
      return {
        width: e.images.downsized.width,
        height: e.images.downsized.height,
        thumbnail: e.images.downsized.url,
        id: e.id,
        url: e.images.original.url
      };
    });
  });
  t.createGiphyPacks = i.defineSimpleInteractor(function (e) {
    var r = i.defineComposer([
      t.mapGiphyAPIResults,
      s.computeAspectRatios,
      function (e) {
        s.computeGridLayoutSizes.run(e, 6, 99, 200);
      },
      s.assignImageItemProperties,
      s.collectItemsToPack
    ]);
    e.packs = [];
    e.items = [];
    var o = r.run(n.assign({
      data: e.data,
      packTitleKey: "expressionPicker_giphyImgPack_title",
      packAriaLabelKey: "expressionPicker_giphyImgPack_ariaLabel",
      packID: u.giphyImageSearch.PACK_PREFIX + "items"
    }, n.pick(e, [
      "desiredRows",
      "idealWidth",
      "availableHeight",
      "lossToPadding"
    ])));
    o.pack && (e.packs.push(o.pack), e.items = e.items.concat(o.items));
  });
});

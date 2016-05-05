define("services/pes/constants", [
  "require",
  "browser/detect"
], function (e) {
  function n() {
    var e = t.getScreenInfo().pixelRatio > 1;
    this.CACHE_KEY = "swx|pes", this.SAVED_DATA_VERSION = "v1.0", this.FEATURED_IN_PREFIX = "FeaturedIn-", this.itemTypes = {
      typeKeyName: "type",
      tab: {
        id: "tab",
        ariaLabelLocKey: "expressionPicker_mruTab_ariaLabel",
        titleLocKey: "expressionPicker_mruTab_title"
      },
      emoticon: {
        id: "emoticon",
        ariaLabelLocKey: "expressionPicker_mruEmoticonPack_ariaLabel",
        titleLocKey: "expressionPicker_mruEmoticonPack_title",
        mruLimit: 27
      },
      moji: {
        id: "flik",
        ariaLabelLocKey: "expressionPicker_mruMojiPack_ariaLabel",
        titleLocKey: "expressionPicker_mruMojiPack_title",
        mruLimit: 10
      },
      image: { id: "image" },
      message: { id: "message" },
      sticker: { id: "sticker" }
    }, this.itemTypes.flik = this.itemTypes.moji, this.mru = {
      TAB_ID: "mru",
      PACK_PREFIX: "mru:"
    }, this.bingSearch = {
      TAB_ID: "bing",
      PACK_PREFIX: "bing:"
    }, this.giphyImageSearch = {
      TAB_ID: "giphyImages",
      PACK_PREFIX: "giphy-imh:"
    }, this.localSearch = {
      TAB_ID: "localSearch",
      PACK_PREFIX: "local:",
      titleLocKey: "expressionPicker_localSearchPack_title",
      ariaLabelLocKey: "expressionPicker_localSearchPack_ariaLabel"
    }, this.frameHeights = {
      emoticons: {
        SMALL: 20,
        LARGE: 40,
        EXTRA_LARGE: 80
      },
      moji: {
        THUMBNAIL: 40,
        KEYFRAME: 80
      },
      packs: { TAB: 19 }
    }, this.profiles = {
      emoticons: {
        getSmall: function () {
          return e ? "default_40" : "default_20";
        },
        getLarge: function () {
          return e ? "default_80" : "default_40";
        },
        getExtraLarge: function () {
          return e ? "default_160" : "default_80";
        },
        getSmallAnimated: function () {
          return e ? "default_40_anim" : "default_20_anim";
        },
        getLargeAnimated: function () {
          return e ? "default_80_anim" : "default_40_anim";
        },
        getExtraLargeAnimated: function () {
          return e ? "default_160_anim" : "default_80_anim";
        }
      },
      moji: {
        thumbnail: "thumbnail",
        content: "default"
      }
    };
  }
  var t = e("browser/detect");
  return new n();
})

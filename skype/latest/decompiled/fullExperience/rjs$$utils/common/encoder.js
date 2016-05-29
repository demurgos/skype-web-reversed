define("utils/common/encoder", [
  "require",
  "exports",
  "module",
  "swx-encoder",
  "constants/common",
  "services/pes/emoticons/encoder",
  "services/serviceLocator"
], function (e, t) {
  var n = e("swx-encoder"), r = e("constants/common"), i = e("services/pes/emoticons/encoder"), s = e("services/serviceLocator");
  t.build = function (e) {
    var t = s.resolve(r.serviceLocator.FEATURE_FLAGS), o = {
        app: e,
        emoticons: i
      };
    return t.isFeatureOn(r.featureFlags.PES_USE_EXTRA_LARGE_EMOTICONS) && (o.largeEmoticonClass = "extraLarge"), n.build(o);
  };
});

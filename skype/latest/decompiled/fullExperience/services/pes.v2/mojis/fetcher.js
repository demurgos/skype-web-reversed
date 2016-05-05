define("services/pes.v2/mojis/fetcher", [
  "require",
  "services/pes/constants",
  "services/pes.v2/mojis/stylesFactory",
  "utils/chat/pesUtils",
  "services/serviceLocator",
  "constants/common",
  "experience/settings"
], function (e) {
  function u() {
    var e = this;
    e.process = function () {
      return null;
    }, e.getResources = function (e, u) {
      var a = [];
      if (e.type !== t.itemTypes.moji.id)
        return null;
      var f = u.itemsRoot + "/" + e.id + "/views/", l = i.resolve(s.serviceLocator.FEATURE_FLAGS);
      return l.isFeatureOn(s.featureFlags.PES_CDN_AUTH_ENABLED) && (f = r.rewriteUrls(f, o.pesCDNAuthentication.rewriteRules)), e.thumbnailUrl = f + t.profiles.moji.thumbnail, u._requiresCDNUrlAuthentication && (e.thumbnailUrl = e.thumbnailUrl + "?" + u._cdnToken), l.isFeatureOn(s.featureFlags.PES_FETCH_MOJI_ASSETS_ON_DEMAND) || a.push(e.thumbnailUrl), {
        styleDef: n.create(e),
        prefetchUrls: a,
        encoderMaps: []
      };
    };
  }
  var t = e("services/pes/constants"), n = e("services/pes.v2/mojis/stylesFactory"), r = e("utils/chat/pesUtils"), i = e("services/serviceLocator"), s = e("constants/common"), o = e("experience/settings");
  return new u();
})

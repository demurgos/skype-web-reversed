define("services/pes/mojis/fetcher", [
  "require",
  "vendor/knockout",
  "services/pes/constants",
  "services/pes/mojis/stylesFactory",
  "utils/chat/pesUtils",
  "services/serviceLocator",
  "constants/common",
  "experience/settings"
], function (e) {
  function a() {
    function a(e, r) {
      var a = r.itemsRoot + "/" + e.id + "/views/", f = s.resolve(o.serviceLocator.FEATURE_FLAGS);
      f.isFeatureOn(o.featureFlags.PES_CDN_AUTH_ENABLED) && (a = i.rewriteUrls(a, u.pesCDNAuthentication.rewriteRules));
      e.thumbnailUrl = a + n.profiles.moji.thumbnail;
      e.contentUrl = a + n.profiles.moji.content;
      r._requiresCDNUrlAuthentication && (e.thumbnailUrl = e.thumbnailUrl + "?" + r._cdnToken, e.contentUrl = e.contentUrl + "?" + r._cdnToken);
      e.text = "/moji " + e.id;
      e.thumbnailClass = "id_" + e.id + " thumbnail";
      e.keyframeClass = "id_" + e.id + " keyframe";
      e.isPlaying = t.observable(!1);
      e.isPlayed = t.observable(!1);
      e.isLocked = t.observable(!1);
      e.onPlayed = function () {
      };
      e.visible = !0;
    }
    var e = this;
    e.process = function (e, t) {
      return e.type !== n.itemTypes.moji.id ? null : (a(e, t), e);
    };
    e.getResources = function (e, t) {
      var a = [];
      if (e.type !== n.itemTypes.moji.id)
        return null;
      var f = t.itemsRoot + "/" + e.id + "/views/", l = s.resolve(o.serviceLocator.FEATURE_FLAGS);
      return l.isFeatureOn(o.featureFlags.PES_CDN_AUTH_ENABLED) && (f = i.rewriteUrls(f, u.pesCDNAuthentication.rewriteRules)), e.thumbnailUrl = f + n.profiles.moji.thumbnail, t._requiresCDNUrlAuthentication && (e.thumbnailUrl = e.thumbnailUrl + "?" + t._cdnToken), l.isFeatureOn(o.featureFlags.PES_FETCH_MOJI_ASSETS_ON_DEMAND) || a.push(e.thumbnailUrl), {
        styleDef: r.create(e),
        prefetchUrls: a,
        encoderMaps: []
      };
    };
  }
  var t = e("vendor/knockout"), n = e("services/pes/constants"), r = e("services/pes/mojis/stylesFactory"), i = e("utils/chat/pesUtils"), s = e("services/serviceLocator"), o = e("constants/common"), u = e("experience/settings");
  return new a();
});

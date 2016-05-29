define("services/pes.v2/emoticons/fetcher", [
  "require",
  "lodash-compat",
  "services/pes.v2/emoticons/stylesFactory",
  "services/pes/constants",
  "utils/chat/pesUtils",
  "services/serviceLocator",
  "utils/common/url",
  "constants/common",
  "experience/settings"
], function (e) {
  function f() {
    function f(e, t) {
      return o.buildUrl(e, { etag: t });
    }
    function l(e, t) {
      var n = s.resolve(u.serviceLocator.FEATURE_FLAGS);
      return n.isFeatureOn(u.featureFlags.PES_CDN_AUTH_ENABLED) && (e = i.rewriteUrls(e, a.pesCDNAuthentication.rewriteRules)), {
        smallStaticUrl: f(e + r.profiles.emoticons.getSmall(), t),
        largeStaticUrl: f(e + r.profiles.emoticons.getLarge(), t),
        extraLargeStaticUrl: f(e + r.profiles.emoticons.getExtraLarge(), t),
        smallUrl: f(e + r.profiles.emoticons.getSmallAnimated(), t),
        largeUrl: f(e + r.profiles.emoticons.getLargeAnimated(), t),
        extraLargeUrl: f(e + r.profiles.emoticons.getExtraLargeAnimated(), t)
      };
    }
    var e = this;
    e.process = function () {
      return null;
    };
    e.getResources = function (e, i) {
      var o, a, f = [], c = s.resolve(u.serviceLocator.FEATURE_FLAGS), h;
      return e.type !== r.itemTypes.emoticon.id ? null : (a = [], h = i.emoticonsRoot + "/" + e.id + "/views/", e.shortcuts.forEach(function (t) {
        a.push({
          shortcut: t,
          id: e.id,
          type: r.itemTypes.emoticon.id
        });
      }), o = l(h, e.etag), t.extend(e, o), c.isFeatureOn(u.featureFlags.PES_FETCH_SMALL_ASSETS_ON_DEMAND) || (f.push(e.smallUrl), f.push(e.smallStaticUrl)), c.isFeatureOn(u.featureFlags.PES_FETCH_MEDIUM_ASSETS_ON_DEMAND) || (f.push(e.largeUrl), f.push(e.largeStaticUrl)), c.isFeatureOn(u.featureFlags.PES_FETCH_LARGE_ASSETS_ON_DEMAND) || (f.push(e.extraLargeUrl), f.push(e.extraLargeStaticUrl)), {
        styleDef: n.create(e),
        prefetchUrls: f,
        encoderMaps: a
      });
    };
  }
  var t = e("lodash-compat"), n = e("services/pes.v2/emoticons/stylesFactory"), r = e("services/pes/constants"), i = e("utils/chat/pesUtils"), s = e("services/serviceLocator"), o = e("utils/common/url"), u = e("constants/common"), a = e("experience/settings");
  return new f();
});

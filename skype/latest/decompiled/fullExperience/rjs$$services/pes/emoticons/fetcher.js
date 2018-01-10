define("services/pes/emoticons/fetcher", [
  "require",
  "lodash-compat",
  "swx-constants",
  "services/pes/constants",
  "utils/chat/pesUtils",
  "swx-service-locator-instance",
  "experience/settings",
  "services/pes/emoticons/stylesFactory",
  "utils/common/url"
], function (e) {
  function f() {
    function f(e, t) {
      return a.buildUrl(e, { etag: t });
    }
    function l(e, t) {
      var u = s.resolve(n.serviceLocator.FEATURE_FLAGS);
      return u.isFeatureOn(n.featureFlags.PES_CDN_AUTH_ENABLED) && (e = i.rewriteUrls(e, o.pesCDNAuthentication.rewriteRules)), {
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
      var o, a, f = [], c = s.resolve(n.serviceLocator.FEATURE_FLAGS), h;
      return e.type !== r.itemTypes.emoticon.id ? null : (a = [], h = i.emoticonsRoot + "/" + e.id + "/views/", e.shortcuts.forEach(function (t) {
        a.push({
          shortcut: t,
          id: e.id,
          type: r.itemTypes.emoticon.id
        });
      }), o = l(h, e.etag), t.extend(e, o), c.isFeatureOn(n.featureFlags.PES_FETCH_SMALL_ASSETS_ON_DEMAND) || (f.push(e.smallUrl), f.push(e.smallStaticUrl)), c.isFeatureOn(n.featureFlags.PES_FETCH_MEDIUM_ASSETS_ON_DEMAND) || (f.push(e.largeUrl), f.push(e.largeStaticUrl)), c.isFeatureOn(n.featureFlags.PES_FETCH_LARGE_ASSETS_ON_DEMAND) || (f.push(e.extraLargeUrl), f.push(e.extraLargeStaticUrl)), {
        styleDef: c.isFeatureOn(n.featureFlags.CANVAS_EMOTICONS_ENABLED) ? "" : u.create(e),
        prefetchUrls: f,
        encoderMaps: a
      });
    };
  }
  var t = e("lodash-compat"), n = e("swx-constants").COMMON, r = e("services/pes/constants"), i = e("utils/chat/pesUtils"), s = e("swx-service-locator-instance").default, o = e("experience/settings"), u = e("services/pes/emoticons/stylesFactory"), a = e("utils/common/url");
  return new f();
});

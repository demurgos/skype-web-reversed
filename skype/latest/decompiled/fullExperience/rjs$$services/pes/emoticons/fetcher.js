define("services/pes/emoticons/fetcher", [
  "require",
  "vendor/knockout",
  "lodash-compat",
  "services/pes/emoticons/stylesFactory",
  "services/pes/constants",
  "utils/chat/pesUtils",
  "services/serviceLocator",
  "constants/common",
  "experience/settings"
], function (e) {
  function f() {
    function f(e) {
      var t = o.resolve(u.serviceLocator.FEATURE_FLAGS);
      return t.isFeatureOn(u.featureFlags.PES_CDN_AUTH_ENABLED) && (e = s.rewriteUrls(e, a.pesCDNAuthentication.rewriteRules)), {
        smallStaticUrl: e + i.profiles.emoticons.getSmall(),
        smallUrl: e + i.profiles.emoticons.getSmallAnimated(),
        largeUrl: e + i.profiles.emoticons.getLargeAnimated(),
        extraLargeUrl: e + i.profiles.emoticons.getExtraLargeAnimated()
      };
    }
    function l(e, r) {
      function s(e) {
        return e.id + " extraLarge animated";
      }
      function o(e) {
        return e.id + " large animated";
      }
      function u(e) {
        return e.id + " animated";
      }
      function a(e) {
        return e.id;
      }
      function l(e) {
        return e.id + " large";
      }
      function c(e) {
        return e.id + " extraLarge";
      }
      e.ariaLabel = e.description;
      e.shortcut = e.shortcuts[0];
      e.text = e.shortcut;
      e.staticHtmlClass = a(e);
      e.staticLargeHtmlClass = l(e);
      e.staticExtraLargeHtmlClass = c(e);
      e.animatedHtmlClass = u(e);
      e.animatedLargeHtmlClass = o(e);
      e.animatedExtraLargeHtmlClass = s(e);
      e.htmlClass = t.observable(a(e));
      e.htmlLargeClass = t.observable(o(e));
      e.htmlExtraLargeClass = t.observable(s(e));
      var i = f(r.emoticonsRoot + "/" + e.id + "/views/");
      n.extend(e, i);
      e.isLocked = t.observable(!1);
    }
    var e = this;
    e.process = function (e, t) {
      return e.type !== i.itemTypes.emoticon.id ? null : (l(e, t), e);
    };
    e.getResources = function (e, t) {
      var s, a, l = [], c = o.resolve(u.serviceLocator.FEATURE_FLAGS);
      return e.type !== i.itemTypes.emoticon.id ? null : (a = [], e.shortcuts.forEach(function (t) {
        a.push({
          shortcut: t,
          id: e.id,
          type: i.itemTypes.emoticon.id
        });
      }), s = f(t.emoticonsRoot + "/" + e.id + "/views/"), n.extend(e, s), c.isFeatureOn(u.featureFlags.PES_FETCH_SMALL_ASSETS_ON_DEMAND) || l.push(e.smallUrl), c.isFeatureOn(u.featureFlags.PES_FETCH_MEDIUM_ASSETS_ON_DEMAND) || l.push(e.largeUrl), c.isFeatureOn(u.featureFlags.PES_FETCH_LARGE_ASSETS_ON_DEMAND) || l.push(e.extraLargeUrl), {
        styleDef: r.create(e),
        prefetchUrls: l,
        encoderMaps: a
      });
    };
  }
  var t = e("vendor/knockout"), n = e("lodash-compat"), r = e("services/pes/emoticons/stylesFactory"), i = e("services/pes/constants"), s = e("utils/chat/pesUtils"), o = e("services/serviceLocator"), u = e("constants/common"), a = e("experience/settings");
  return new f();
});

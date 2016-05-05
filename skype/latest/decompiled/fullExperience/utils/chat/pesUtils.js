define("utils/chat/pesUtils", [
  "require",
  "lodash-compat",
  "constants/common",
  "services/pes/constants",
  "services/serviceLocator",
  "experience/settings",
  "utils/common/url"
], function (e) {
  function u() {
    function f(t) {
      var r = i.resolve(n.serviceLocator.FEATURE_FLAGS);
      return r.isFeatureOn(n.featureFlags.PES_CDN_AUTH_ENABLED) ? a = function (t) {
        return e.rewriteUrls(t, s.pesCDNAuthentication.rewriteRules);
      } : a = function (e) {
        return e;
      }, a(t);
    }
    var e = this, u = {
        small: "getSmall",
        large: "getLarge",
        extraLarge: "getExtraLarge"
      }, a = f;
    this.buildEmoticonUrl = function (t, n, i, s) {
      var f = t + "/" + n.id + "/views/";
      f = a(f);
      var l = u[i] + (s ? "Animated" : "");
      return o.buildUrl(f + r.profiles.emoticons[l](), { etag: n.etag });
    }, this.rewriteUrls = function (n, r) {
      if (typeof n != "string")
        return n;
      var i = n;
      return t.any(r, function (e) {
        return i.search(e.from) !== -1 ? (i = i.replace(e.from, e.to), !0) : !1;
      }), i;
    }, this._resetUrlRewriterSetup = function () {
      a = f;
    };
  }
  var t = e("lodash-compat"), n = e("constants/common"), r = e("services/pes/constants"), i = e("services/serviceLocator"), s = e("experience/settings"), o = e("utils/common/url");
  return new u();
})

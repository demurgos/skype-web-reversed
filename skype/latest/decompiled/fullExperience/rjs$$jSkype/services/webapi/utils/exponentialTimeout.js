define("jSkype/services/webapi/utils/exponentialTimeout", [
  "require",
  "exports",
  "module",
  "jSkype/settings",
  "constants/common"
], function (e, t) {
  function u() {
    o && clearTimeout(o);
  }
  var n = e("jSkype/settings"), r = e("constants/common"), i = null, s = 1, o;
  t.execute = function (e) {
    var t = 1000, a = 120000, f = 0;
    n.isFeatureOn(r.featureFlags.ENABLE_ENDPOINT_ECS_CONFIG) && (t = n.settings.webApiService.endpointRetry.base * 1000, a = n.settings.webApiService.endpointRetry.limit * 1000, f = n.settings.webApiService.endpointRetry.noiseFactor), u(), i === null && (i = t), o = setTimeout(e, i + Math.random() * f * i), i < a && (s++, i *= s);
  }, t.reset = function () {
    u(), i = null, s = 1;
  };
})

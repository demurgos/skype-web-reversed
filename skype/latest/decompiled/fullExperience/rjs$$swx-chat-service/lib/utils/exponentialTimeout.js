(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-chat-service/lib/utils/exponentialTimeout", [
      "require",
      "exports",
      "jskype-settings-instance",
      "swx-constants"
    ], e);
}(function (e, t) {
  function u() {
    o && clearTimeout(o);
  }
  function a(e) {
    var t = 1000, a = 120000, f = 0;
    n.isFeatureOn(r.COMMON.featureFlags.ENABLE_ENDPOINT_ECS_CONFIG) && (t = n.settings.webApiService.endpointRetry.base * 1000, a = n.settings.webApiService.endpointRetry.limit * 1000, f = n.settings.webApiService.endpointRetry.noiseFactor);
    u();
    i === null && (i = t);
    o = setTimeout(e, i + Math.random() * f * i);
    i < a && (s++, i *= s);
  }
  function f() {
    u();
    i = null;
    s = 1;
  }
  var n = e("jskype-settings-instance"), r = e("swx-constants"), i = null, s = 1, o;
  t.execute = a;
  t.reset = f;
}));

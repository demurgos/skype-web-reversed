(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/telemetry/endpointsTelemetry", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "../utils/chat/endpointsDataProvider",
      "jskype-settings-instance",
      "swx-constants"
    ], e);
}(function (e, t) {
  function u() {
    return o ? (n.get()._telemetryManager.sendEvent(i.settings.telemetry.jSkypeTenantToken, s.COMMON.telemetry.endpoints.TYPE, r.get()), o = !1, !0) : !1;
  }
  function a() {
    return o;
  }
  function f() {
    o = !0;
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("../utils/chat/endpointsDataProvider"), i = e("jskype-settings-instance"), s = e("swx-constants"), o = !0;
  t.publish = u;
  t.available = a;
  t.reset = f;
}));

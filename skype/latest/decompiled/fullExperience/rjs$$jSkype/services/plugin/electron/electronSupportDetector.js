define("jSkype/services/plugin/electron/electronSupportDetector", [
  "require",
  "exports",
  "module",
  "jSkype/services/electron",
  "jSkype/telemetry/logging/callingLogTracer",
  "swx-enums"
], function (e, t) {
  function s() {
  }
  function o() {
    try {
      return n.getSkypeModule(), !0;
    } catch (e) {
      return r.warn(e), !1;
    }
  }
  var n = e("jSkype/services/electron"), r = e("jSkype/telemetry/logging/callingLogTracer").get(), i = e("swx-enums");
  s.prototype.getCallingSupport = function () {
    return o() ? Promise.resolve({
      isSupported: !0,
      reason: ""
    }) : Promise.resolve({
      isSupported: !1,
      reason: i.callingNotSupportedReasons.PluginBlocked
    });
  };
  t.build = function () {
    return new s();
  };
});

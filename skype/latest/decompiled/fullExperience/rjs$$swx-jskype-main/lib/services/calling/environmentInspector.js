(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/calling/environmentInspector", [
      "require",
      "exports",
      "../../../lib/telemetry/logging/callingLogTracer",
      "../../../lib/services/calling/platformValidator",
      "../../../lib/services/calling/supportDetectorFactory",
      "jskype-settings-instance",
      "jcafe-property-model"
    ], e);
}(function (e, t) {
  function c(e) {
    f = !0;
    l = e;
    t.isCallingSupported(!1, e);
  }
  function h(e) {
    if (!a || a.promise.state() === "resolved")
      a = o.task(), p(e);
    return a.promise;
  }
  function p(e) {
    var t = r.getPlatformSupport();
    t.isSupported ? v(e).then(function (e) {
      d(e.isSupported, e.reason);
    }) : d(!1, t.reason);
  }
  function d(e, n) {
    u.log("[EnvInspector] check for calling support", e, n);
    t.isCallingSupported.set(e, n);
    a.resolve(e);
  }
  function v(e) {
    var t = i.buildSupportDetector();
    return t.getCallingSupport(e);
  }
  var n = e("../../../lib/telemetry/logging/callingLogTracer"), r = e("../../../lib/services/calling/platformValidator"), i = e("../../../lib/services/calling/supportDetectorFactory"), s = e("jskype-settings-instance"), o = e("jcafe-property-model"), u = n.get(), a = null, f = !1, l = "";
  t.disableCalling = c;
  t.isCallingSupported = o.property({
    get: function () {
      return f ? (t.isCallingSupported.reason = l, !1) : h(s.settings.plugin.loadDuringDetection);
    }
  });
  t.checkForCallingSupport = h;
}));

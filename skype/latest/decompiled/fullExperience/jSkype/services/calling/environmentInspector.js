define("jSkype/services/calling/environmentInspector", [
  "require",
  "exports",
  "module",
  "jSkype/telemetry/logging/callingLogTracer",
  "jSkype/services/calling/platformValidator",
  "jSkype/services/calling/supportDetectorFactory",
  "jcafe-property-model"
], function (e, t) {
  function f(e) {
    var t = r.getPlatformSupport();
    t.isSupported ? c(e).then(function (e) {
      l(e.isSupported, e.reason);
    }) : l(!1, t.reason);
  }
  function l(e, r) {
    n.log("[EnvInspector] check for calling support", e, r), t.isCallingSupported.set(e, r), o.resolve(e);
  }
  function c(e) {
    var t = i.buildSupportDetector();
    return t.getCallingSupport(e);
  }
  function h(e) {
    var t = i.buildPluginBasedSupportDetector();
    return t.getCallingSupport(e);
  }
  var n = e("jSkype/telemetry/logging/callingLogTracer").get(), r = e("jSkype/services/calling/platformValidator"), i = e("jSkype/services/calling/supportDetectorFactory"), s = e("jcafe-property-model"), o = null, u = !1, a = "";
  t.disableCalling = function (e) {
    u = !0, a = e, t.isCallingSupported(!1, e);
  }, t.isCallingSupported = s.property({
    get: function () {
      return u ? (t.isCallingSupported.reason = a, !1) : t.checkForCallingSupport();
    }
  }), t.checkForCallingSupport = function (e) {
    if (!o || o.promise.state() === "resolved")
      o = s.task(), f(e);
    return o.promise;
  }, t.checkForPluginBasedCallingSupport = function (e) {
    if (!o || o.promise.state() === "resolved") {
      o = s.task();
      var t = r.getPlatformSupport();
      t.isSupported ? h(e).then(function (e) {
        o.resolve(e);
      }) : o.resolve(t);
    }
    return o.promise;
  };
})

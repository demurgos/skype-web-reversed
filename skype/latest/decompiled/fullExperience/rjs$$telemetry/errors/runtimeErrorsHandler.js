define("telemetry/errors/runtimeErrorsHandler", [
  "require",
  "exports",
  "module",
  "browser/window",
  "vendor/knockout",
  "swx-constants",
  "experience/settings",
  "swx-service-locator-instance",
  "ui/telemetry/telemetryClient"
], function (e, t) {
  function a(e) {
    f(e) && h(e);
  }
  function f(e) {
    var t = e.stack || e.error && e.error.stack;
    return (l(e.filename) || l(t)) && !c(e.message);
  }
  function l(e) {
    return e && e.indexOf(s.packageUrl) >= 0;
  }
  function c(e) {
    return e && e.indexOf(t.DEFAULT_SCRIPT_ERROR_MESSAGE) >= 0;
  }
  function h(e) {
    var t = i.telemetry.runtimeErrors.TYPE, n = {
        message: e.message == null ? i.NOT_AVAILABLE : e.message,
        fileName: e.filename || i.NOT_AVAILABLE,
        lineNumber: e.lineno || e.error && e.error.lineNumber || i.NOT_AVAILABLE,
        columnNumber: e.colno || e.error && e.error.columnNumber || i.NOT_AVAILABLE,
        stack: e.stack || e.error && e.error.stack || i.NOT_AVAILABLE
      };
    u.get().sendEvent(s.telemetry.uiTenantToken, t, n);
  }
  var n = e("browser/window"), r = e("vendor/knockout"), i = e("swx-constants").COMMON, s = e("experience/settings"), o = e("swx-service-locator-instance").default, u = e("ui/telemetry/telemetryClient");
  t.DEFAULT_SCRIPT_ERROR_MESSAGE = "Script error";
  t.init = function () {
    var e = o.resolve(i.serviceLocator.FEATURE_FLAGS);
    e.isFeatureOn(i.featureFlags.TELEMETRY_RUNTIME_ERRORS_ENABLED) && (n.addEventListener("error", a), r.onError = a);
  };
});

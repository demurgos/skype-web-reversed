define("ui/telemetry/people/contactTelemetryHelper", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "experience/settings",
  "ui/telemetry/telemetryClient"
], function (e, t) {
  var n = e("lodash-compat"), r = e("experience/settings"), i = e("ui/telemetry/telemetryClient");
  t.setStart = function (e, t) {
    i.get().traceStart(e, t);
  };
  t.getTrace = function (e) {
    return i.get().traceDump(e) || {};
  };
  t.addIfDefined = function (e, t, r) {
    if (n.isNumber(r) || n.isString(r) || n.isBoolean(r))
      e[t] = r;
  };
  t.send = function (e, t) {
    if (n.isEmpty(e))
      return;
    i.get().sendEvent(r.telemetry.uiTenantToken, t, e);
  };
});

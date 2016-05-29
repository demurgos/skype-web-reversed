define("ui/telemetry/actions/actionTelemetryApi", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "experience/settings",
  "ui/telemetry/actions/registry/singleton",
  "ui/telemetry/telemetryClient"
], function (e, t) {
  function o() {
    var e = this;
    e.recordAction = function (e, t) {
      var i = n.merge({ actionName: e }, t);
      s.get().sendEvent(r.telemetry.uiTenantToken, "ui_action", i);
    };
    e.createTraceableAction = function (e) {
      var t = { actionName: e };
      return i.getInstance().createAction(t);
    };
    e.getTraceableAction = function (e) {
      return i.getInstance().getAction(e);
    };
  }
  var n = e("lodash-compat"), r = e("experience/settings"), i = e("ui/telemetry/actions/registry/singleton"), s = e("ui/telemetry/telemetryClient");
  t.build = function () {
    return new o();
  };
});

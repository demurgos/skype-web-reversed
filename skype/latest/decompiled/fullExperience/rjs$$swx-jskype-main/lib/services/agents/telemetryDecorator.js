(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/agents/telemetryDecorator", [
      "require",
      "exports",
      "lodash-compat",
      "swx-jskype-internal-application-instance",
      "jskype-settings-instance",
      "swx-constants"
    ], e);
}(function (e, t) {
  function u(e, t) {
    return function (u) {
      var f = e(u);
      return f["catch"](function (e) {
        var n = e.getResponseHeader && e.getResponseHeader("ContextId");
        r.get()._telemetryManager.sendEvent(i.settings.telemetry.jSkypeTenantToken, "ServiceFault", {
          serviceName: a(t.serviceName),
          faultCode: a(e.status),
          faultContext: o,
          errorCode: a(e.status),
          errorMessage: a(e.responseText),
          verb: a(u.type),
          host: i.settings.agentProvisioningService.host,
          contextId: n || s.COMMON.telemetry.NOT_AVAILABLE
        });
      }), f;
    };
  }
  function a(e) {
    var t = !n.isBoolean(e) && !e;
    return t ? o : e;
  }
  var n = e("lodash-compat"), r = e("swx-jskype-internal-application-instance"), i = e("jskype-settings-instance"), s = e("swx-constants"), o = s.COMMON.telemetry.NOT_AVAILABLE;
  t.name = "reporting";
  t.build = u;
}));

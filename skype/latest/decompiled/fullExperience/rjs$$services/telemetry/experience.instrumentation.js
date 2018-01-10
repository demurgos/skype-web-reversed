define("services/telemetry/experience.instrumentation", [
  "require",
  "swx-constants",
  "swx-utils-common"
], function (e) {
  function i(e, t) {
    if (e === "webapi-requestEndpointCreation" && t === 403)
      return n.get("chat-4171");
  }
  var t = e("swx-constants").COMMON, n = e("swx-utils-common").sessionStorage, r = {};
  return r[t.events.errors.SERVICE_FAILURE] = function (e) {
    return {
      type: "ServiceFault",
      data: {
        serviceName: e.serviceName,
        faultCode: e.faultCode,
        faultContext: i(e.serviceName, e.faultCode) || t.telemetry.NOT_AVAILABLE,
        errorCode: e.errorCode || t.telemetry.NOT_AVAILABLE,
        errorMessage: e.errorMessage || t.telemetry.NOT_AVAILABLE,
        verb: e.verb || t.telemetry.NOT_AVAILABLE,
        host: e.host || t.telemetry.NOT_AVAILABLE,
        contextId: e.contextId || t.telemetry.NOT_AVAILABLE
      }
    };
  }, r[t.events.system.EXPERIENCE_INITIALIZED] = function (e) {
    return {
      type: "session",
      data: {
        subType: "init",
        configLoadDuration: e.configLoadDuration,
        packageLoadDuration: e.packageLoadDuration,
        experienceInitializeDuration: e.experienceInitializeDuration
      }
    };
  }, r;
});

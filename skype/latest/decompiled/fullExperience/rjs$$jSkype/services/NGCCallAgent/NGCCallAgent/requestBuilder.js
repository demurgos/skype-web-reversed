define("jSkype/services/NGCCallAgent/NGCCallAgent/requestBuilder", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "jSkype/settings",
  "jSkype/services/serviceAccessLayer/transientFaultPolicy"
], function (e, t) {
  var n = e("lodash-compat"), r = e("jSkype/settings"), i = e("jSkype/services/serviceAccessLayer/transientFaultPolicy");
  t.get = function (e, t, s) {
    return e.signalingAgentConfig.skypeToken().then(function (o) {
      var u = {
        headers: {
          "X-Microsoft-Skype-Chain-ID": e.correlationId,
          "X-Microsoft-Skype-Client": e.signalingAgentConfig.clientInformation,
          "X-Skypetoken": o
        },
        retry: n.merge({}, r.settings.retry, {
          isTransientCheck: i.isTransientFailure,
          isSuccessCheck: i.isWebApiSuccess
        }),
        reporting: { serviceName: "ngcCallController-" + t }
      };
      return s && s.payload && (u.payload = JSON.stringify(s.payload)), e.telemetryHelper.addNetworkOperationStarted(t), u;
    });
  };
})

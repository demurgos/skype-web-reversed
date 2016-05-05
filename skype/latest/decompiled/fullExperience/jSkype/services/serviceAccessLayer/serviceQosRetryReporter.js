define("jSkype/services/serviceAccessLayer/serviceQosRetryReporter", [
  "require",
  "exports",
  "module",
  "jSkype/client",
  "jSkype/settings",
  "telemetry/chat/telemetryEnumerator"
], function (e, t) {
  function o() {
    this.publish = function (e) {
      var t = "serviceRetry_qos", s = e;
      s.ttcGroup = i.getSecondsDurationGroupFromMs(e.ttc), n.get()._telemetryManager.sendEvent(r.settings.telemetry.jSkypeTenantToken, t, s);
    };
  }
  var n = e("jSkype/client"), r = e("jSkype/settings"), i = e("telemetry/chat/telemetryEnumerator"), s;
  t.get = function () {
    return s || (s = new o()), s;
  };
})

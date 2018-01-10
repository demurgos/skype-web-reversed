define("telemetry/chat/sendSmsTelemetry", [
  "require",
  "exports",
  "module",
  "swx-constants",
  "experience/settings",
  "services/telemetry/skypeData",
  "swx-jskype-main/lib/utils/chat/smsMessageBuilder"
], function (e, t) {
  function u(e, t, u) {
    function l() {
      a.data = {
        size: f,
        count: f,
        numberOfDestinations: f,
        participantsCount: f,
        status: f
      };
    }
    function c() {
      a.data.size = e.length;
      a.data.count = o.calculateSmsFragments(e);
      a.data.numberOfDestinations = u ? u.length : f;
      a.data.participantsCount = t.participantsCount() || f;
      var n = {
        type: i.TYPE,
        data: a.data
      };
      s.push(n, r.telemetry.chatTenantToken);
      l();
    }
    var a = this, f = n.telemetry.NOT_AVAILABLE;
    a.publish = c;
    l();
  }
  var n = e("swx-constants").COMMON, r = e("experience/settings"), i = n.telemetry.sendSms, s = e("services/telemetry/skypeData"), o = e("swx-jskype-main/lib/utils/chat/smsMessageBuilder");
  t.build = function (e, t, n) {
    return new u(e, t, n);
  };
});

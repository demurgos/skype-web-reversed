define("telemetry/chat/giphyServiceQOS", [
  "require",
  "exports",
  "module",
  "swx-utils-common",
  "experience/settings",
  "swx-constants",
  "ui/telemetry/telemetryClient",
  "swx-telemetry-buckets"
], function (e, t) {
  function u() {
    function u(e) {
      return e ? e : i.telemetry.NOT_AVAILABLE;
    }
    var e = this, t = n.build();
    e.publish = function (e) {
      var n = "giphy_qos", i = t.duration(), a = {
          ttc: i,
          ttcGroup: o.getMessageLifeDurationGroup(i),
          querySource: e.querySource,
          success: e.success,
          giphyCount: u(e.count) + "",
          responseCode: u(e.responseCode) + ""
        };
      s.get().sendEvent(r.telemetry.chatTenantToken, n, a);
    };
  }
  var n = e("swx-utils-common").stopwatch, r = e("experience/settings"), i = e("swx-constants").COMMON, s = e("ui/telemetry/telemetryClient"), o = e("swx-telemetry-buckets");
  t.build = function () {
    return new u();
  };
});

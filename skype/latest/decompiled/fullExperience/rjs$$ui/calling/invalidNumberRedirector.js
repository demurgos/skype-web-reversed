define("ui/calling/invalidNumberRedirector", [
  "require",
  "exports",
  "module",
  "swx-enums",
  "constants/common",
  "constants/components",
  "services/serviceLocator",
  "browser/window"
], function (e, t) {
  function u() {
    function a() {
      t && (o.clearTimeout(t), t = null, u.unsubscribe(r.events.navigation.NAVIGATE, a));
    }
    var e = 5000, t, u = s.resolve(r.serviceLocator.PUBSUB);
    this.process = function (s, f, l, c) {
      if (c !== n.callConnectionState.Disconnected || l !== n.callDisconnectionReason.InvalidNumber)
        return;
      if (s.participants.size() > 1)
        return;
      t || (u.subscribe(r.events.navigation.NAVIGATE, a), t = o.setTimeout(function () {
        u.publish(r.events.navigation.NAVIGATE, {
          page: i.calling.SKYPEOUT_PAGE,
          origin: r.telemetry.historyLoadOrigin.SKYPEOUT_PAGE
        });
      }, e));
    };
    this.dispose = function () {
      a();
    };
  }
  var n = e("swx-enums"), r = e("constants/common"), i = e("constants/components"), s = e("services/serviceLocator"), o = e("browser/window");
  t.build = function () {
    return new u();
  };
});

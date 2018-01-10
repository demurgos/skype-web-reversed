define("ui/calling/invalidNumberRedirector", [
  "require",
  "exports",
  "module",
  "swx-enums",
  "swx-constants",
  "constants/components",
  "swx-service-locator-instance",
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
  var n = e("swx-enums"), r = e("swx-constants").COMMON, i = e("constants/components"), s = e("swx-service-locator-instance").default, o = e("browser/window");
  t.build = function () {
    return new u();
  };
});

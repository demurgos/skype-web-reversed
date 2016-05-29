define("telemetry/notifications/notificationActions", [
  "require",
  "exports",
  "module",
  "ui/telemetry/telemetryClient",
  "experience/settings",
  "constants/common"
], function (e, t) {
  function s() {
    function e(e) {
      var t = i.telemetry.notificationActionsEvent.TYPE, s = {};
      s.type = e.type;
      s.action = e.action;
      n.get().sendEvent(r.telemetry.uiTenantToken, t, s);
    }
    return { send: e };
  }
  var n = e("ui/telemetry/telemetryClient"), r = e("experience/settings"), i = e("constants/common");
  t.build = function () {
    return new s();
  };
});

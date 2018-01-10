define("telemetry/notifications/notificationActions", [
  "require",
  "exports",
  "module",
  "ui/telemetry/telemetryClient",
  "experience/settings",
  "swx-constants"
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
  var n = e("ui/telemetry/telemetryClient"), r = e("experience/settings"), i = e("swx-constants").COMMON;
  t.build = function () {
    return new s();
  };
});

define("telemetry/chat/profileCards", [
  "require",
  "experience/settings",
  "ui/telemetry/telemetryClient",
  "constants/common"
], function (e) {
  function i() {
    function e(e, i) {
      var s = { Entry_Point: (i ? i : r.NOT_AVAILABLE).toString() };
      n.get().sendEvent(t.telemetry.uiTenantToken, e, s);
    }
    this.profileOpened = function (t) {
      e(r.contacts.name.PROFILE_OPENED, t);
    };
  }
  var t = e("experience/settings"), n = e("ui/telemetry/telemetryClient"), r = e("constants/common").telemetry;
  return new i();
})

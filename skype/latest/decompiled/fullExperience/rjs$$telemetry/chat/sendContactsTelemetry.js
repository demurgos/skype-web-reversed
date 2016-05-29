define("telemetry/chat/sendContactsTelemetry", [
  "require",
  "exports",
  "module",
  "constants/common",
  "ui/telemetry/telemetryClient",
  "telemetry/utils/telemetryUtils",
  "experience/settings",
  "utils/chat/dateTime"
], function (e, t) {
  function a(e) {
    function c() {
      t.data = {
        cta: l || f,
        action: f,
        participantsCount: e.participantsCount() || f,
        statusCodestatusCode: f,
        timeBeforeActionTaken: f,
        numberOfContacts: f
      };
    }
    function h() {
      t.data.timeBeforeActionTaken = p(a, u.getDate());
      var e = s.stringify(t.data);
      i.get().sendEvent(o.telemetry.uiTenantToken, r.TYPE, e);
      c();
    }
    function p(e, t) {
      return t - e;
    }
    var t = this, a = u.getDate(), f = n.telemetry.NOT_AVAILABLE, l = r.cta.MEDIABAR;
    t.canceled = function () {
      t.data.action = r.action.CANCELED;
      h();
    };
    t.confirmed = function () {
      t.data.action = r.action.CONFIRMED;
      h();
    };
    c();
  }
  var n = e("constants/common"), r = n.telemetry.sendContacts, i = e("ui/telemetry/telemetryClient"), s = e("telemetry/utils/telemetryUtils"), o = e("experience/settings"), u = e("utils/chat/dateTime");
  t.build = function (e) {
    return new a(e);
  };
});

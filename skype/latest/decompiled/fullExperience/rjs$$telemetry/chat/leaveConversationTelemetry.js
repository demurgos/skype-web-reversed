define("telemetry/chat/leaveConversationTelemetry", [
  "require",
  "exports",
  "module",
  "swx-constants",
  "experience/settings",
  "services/telemetry/skypeData",
  "services/telemetry/common/telemetryContext"
], function (e, t) {
  function u(e, t) {
    function p() {
      u.data = {
        cta: e || c,
        action: c,
        participantsCount: t.participantsCount() || c,
        statusCode: c,
        tim: c,
        ttd: c,
        lmg: c
      };
    }
    function d() {
      var e = {
        type: i.TYPE,
        data: u.data
      };
      s.push(e, r.telemetry.chatTenantToken);
      p();
    }
    function v(e, t) {
      return t - e;
    }
    function m() {
      return new Date().getTime();
    }
    var u = this, a = m(), f, l, c = n.telemetry.NOT_AVAILABLE, h = o.get();
    t.historyService._lastMessageFromServer && (f = t.historyService._lastMessageFromServer.timestamp());
    u.started = function () {
      l = m();
    };
    u.canceled = function () {
      var e = m();
      u.data.action = i.action.CANCELED;
      u.data.tim = v(a, m());
      f && (u.data.lmg = v(f, e));
      d();
    };
    u.completed = function () {
      u.data.action = i.action.CONFIRMED;
      var e = m();
      u.data.statusCode = h.statusCode;
      u.data.tim = v(a, e);
      f && (u.data.lmg = v(f, e));
      l && (u.data.ttd = v(l, e));
      d();
    };
    p();
  }
  var n = e("swx-constants").COMMON, r = e("experience/settings"), i = n.telemetry.leaveConversation, s = e("services/telemetry/skypeData"), o = e("services/telemetry/common/telemetryContext");
  t.build = function (e, t) {
    return new u(e, t);
  };
});

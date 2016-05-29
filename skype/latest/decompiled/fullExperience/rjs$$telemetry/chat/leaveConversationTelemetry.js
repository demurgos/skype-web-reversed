define("telemetry/chat/leaveConversationTelemetry", [
  "require",
  "exports",
  "module",
  "constants/common",
  "services/telemetry/skypeData",
  "services/telemetry/common/telemetryContext"
], function (e, t) {
  function o(e, t) {
    function h() {
      o.data = {
        cta: e || l,
        action: l,
        participantsCount: t.participantsCount() || l,
        statusCode: l,
        tim: l,
        ttd: l,
        lmg: l
      };
    }
    function p() {
      var e = {
        type: r.TYPE,
        data: o.data
      };
      i.push(e);
      h();
    }
    function d(e, t) {
      return t - e;
    }
    function v() {
      return new Date().getTime();
    }
    var o = this, u = v(), a, f, l = n.telemetry.NOT_AVAILABLE, c = s.get();
    t.historyService._lastMessageFromServer && (a = t.historyService._lastMessageFromServer.timestamp());
    o.started = function () {
      f = v();
    };
    o.canceled = function () {
      var e = v();
      o.data.action = r.action.CANCELED;
      o.data.tim = d(u, v());
      a && (o.data.lmg = d(a, e));
      p();
    };
    o.completed = function () {
      o.data.action = r.action.CONFIRMED;
      var e = v();
      o.data.statusCode = c.statusCode;
      o.data.tim = d(u, e);
      a && (o.data.lmg = d(a, e));
      f && (o.data.ttd = d(f, e));
      p();
    };
    h();
  }
  var n = e("constants/common"), r = n.telemetry.leaveConversation, i = e("services/telemetry/skypeData"), s = e("services/telemetry/common/telemetryContext");
  t.build = function (e, t) {
    return new o(e, t);
  };
});

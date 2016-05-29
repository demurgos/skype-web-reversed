define("jSkype/services/calling/incomingCallMessageProxy", [
  "require",
  "exports",
  "module",
  "jSkype/client",
  "jSkype/settings",
  "jSkype/services/callController",
  "utils/calling/callingStack",
  "constants/common",
  "usertiming",
  "browser/window",
  "lodash-compat"
], function (e, t) {
  function d() {
    function v(e, t) {
      return f.some(e, function (e) {
        return e === t;
      });
    }
    function m() {
      var e = u.getEntriesByName(h.CALLING.INCOMING.TBN), t = e && e.length > 0 && e[0].duration ? e[0].duration : "undefined", i = {
          name: p.P2P_TO_NGC_NOTIFICATION_DURATION,
          duration: t
        };
      n.get()._telemetryManager.sendEvent(r.settings.telemetry.jSkypeTenantToken, p.MASTER_EVENT, i);
    }
    function g(e) {
      v(o, e.convoCallId) || (t.push(e.convoCallId), u.mark(c.CALLING.INCOMING.P2P_IN_PLUGINLESS_START));
    }
    function y(e) {
      o.push(e.convoCallId);
      v(t, e.convoCallId) && (u.mark(c.CALLING.INCOMING.P2P_IN_PLUGINLESS_END), u.measure(h.CALLING.INCOMING.TBN, c.CALLING.INCOMING.P2P_IN_PLUGINLESS_START, c.CALLING.INCOMING.P2P_IN_PLUGINLESS_END), m(), u.clearMarks(c.CALLING.INCOMING.P2P_IN_PLUGINLESS_START), u.clearMarks(c.CALLING.INCOMING.P2P_IN_PLUGINLESS_END), u.clearMeasures(h.CALLING.INCOMING.TBN));
    }
    function b() {
      a.clearTimeout(d);
      i.handleIncoming(e);
      e = null;
    }
    var e = null, t = [], o = [], d;
    this.handleMessage = function (t) {
      e = t;
      s.get().isPluginlessCallingSupported() && t.evt === l.INCOMING_CALL ? (g(t), d = a.setTimeout(function () {
        b();
      }, r.settings.incomingCalls.p2pToNgcNotificationTimeout)) : (y(t), b());
    };
  }
  var n = e("jSkype/client"), r = e("jSkype/settings"), i = e("jSkype/services/callController"), s = e("utils/calling/callingStack"), o = e("constants/common"), u = e("usertiming"), a = e("browser/window"), f = e("lodash-compat"), l = o.events.trouter, c = o.telemetry.performanceMarks, h = o.telemetry.measurements, p = o.telemetry.calling;
  t.build = function () {
    return new d();
  };
});

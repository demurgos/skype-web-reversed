define("jSkype/telemetry/callInfoTelemetry", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "jSkype/client",
  "jSkype/settings",
  "jSkype/modelHelpers/contacts/dataMappers/dataMaps",
  "utils/calling/callingStack",
  "swx-enums",
  "swx-utils-common",
  "constants/common"
], function (e, t) {
  function c(e, t) {
    function p(r) {
      var s = n.extend({
        callCorrelationId: l,
        name: f.telemetry.calling.CALL_INFO,
        callState: r,
        direction: t,
        callTechnology: e._callData.callTechnology()
      }, d());
      c.sendEvent(i.settings.telemetry.jSkypeTenantToken, f.telemetry.calling.MASTER_EVENT, s);
    }
    function d() {
      var t = f.telemetry.calling.PARTICIPANTS_COUNT_PREFIX, n = {}, r = e.participants().map(function (e) {
          return o[e.person._type()] || f.telemetry.calling.UNKNOWN_CONTACT_TYPE;
        });
      return r.forEach(function (e) {
        n.hasOwnProperty(t + e) ? n[t + e] += 1 : n[t + e] = 1;
      }), n;
    }
    var o = n.invert(s.contactTypes), l = a.create(), c = r.get()._telemetryManager, h = e.selfParticipant.audio.state.once(u.callConnectionState.Connected, function () {
        p(f.telemetry.calling.CONNECTED_CALL);
      });
    this.dispose = function () {
      h.dispose();
    };
  }
  function h(e, t) {
    return o.get().isInBrowserCallingSupported() ? new c(e, t) : {
      dispose: function () {
      }
    };
  }
  var n = e("lodash-compat"), r = e("jSkype/client"), i = e("jSkype/settings"), s = e("jSkype/modelHelpers/contacts/dataMappers/dataMaps"), o = e("utils/calling/callingStack"), u = e("swx-enums"), a = e("swx-utils-common").guid, f = e("constants/common"), l = {};
  t.build = function (e, t) {
    return l[e.conversationId] || (l[e.conversationId] = h(e, t)), l[e.conversationId];
  }, t.dispose = function (e) {
    l[e.conversationId] && (l[e.conversationId].dispose(), delete l[e.conversationId]);
  };
})

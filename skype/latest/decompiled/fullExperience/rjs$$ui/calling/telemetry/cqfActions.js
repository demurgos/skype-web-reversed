define("ui/calling/telemetry/cqfActions", [
  "require",
  "exports",
  "module",
  "swx-constants",
  "swx-log-tracer",
  "experience/settings",
  "ui/telemetry/telemetryClient"
], function (e, t) {
  function u() {
    function e(e) {
      var o = {
        call_id: e.callId,
        call_mos_score_questionary_id: e.questionaryId,
        call_mos_score: e.score,
        call_mos_score_tracking_reason: e.reason,
        call_mos_score_problem_tokens: t(e)
      };
      e.nodeId && (o.node_id = e.nodeId);
      e.ngcEndpointId && (o.endpoint_id = e.ngcEndpointId);
      e.ngcParticipantId && (o.participant_id = e.ngcParticipantId);
      r.log("[CQF Telemetry] event", n.MASTER_EVENT, "data", o);
      s.get().sendEvent(i.telemetry.uiTenantToken, n.MASTER_EVENT, o);
    }
    function t(e) {
      var t = n.PROBLEM_TOKEN_PREFIX, r = "%20", i = e.tokensSelected || [], s = e.othersSelected || [];
      return t += i.concat(s).map(function (e) {
        return e.token;
      }).join(r), s.forEach(function (e) {
        e.token && e.value && (t += "&" + e.token + "=" + encodeURIComponent(e.value).replace(/'/g, escape));
      }), t;
    }
    this.submit = function (t) {
      if (typeof t.score != "number")
        return this.cancel(t);
      t.reason = n.reason.RANDOM;
      e(t);
    };
    this.cancel = function (t) {
      t.score = "";
      t.reason = n.reason.CANCEL;
      t.problemTokens = n.PROBLEM_TOKEN_PREFIX;
      t.tokensSelected = [];
      t.othersSelected = [];
      e(t);
    };
  }
  var n = e("swx-constants").COMMON.telemetry.callQualityFeedback, r = e("swx-log-tracer").getLogger(), i = e("experience/settings"), s = e("ui/telemetry/telemetryClient"), o;
  t.get = function () {
    return o || (o = new u()), o;
  };
});

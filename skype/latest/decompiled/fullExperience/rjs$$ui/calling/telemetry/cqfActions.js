define("ui/calling/telemetry/cqfActions", [
  "require",
  "exports",
  "module",
  "constants/common",
  "experience/settings",
  "ui/telemetry/telemetryClient"
], function (e, t) {
  function o() {
    function e(e) {
      var s = n.NA, o = {
          call_id: e.callId || s,
          node_id: e.nodeId || s,
          endpoint_id: e.ngcEndpointId || s,
          participant_id: e.ngcParticipantId || s,
          call_mos_score_questionary_id: e.questionaryId || s,
          call_mos_score: e.score,
          call_mos_score_tracking_reason: e.reason,
          call_mos_score_problem_tokens: t(e)
        };
      i.get().sendEvent(r.telemetry.uiTenantToken, n.MASTER_EVENT, o);
    }
    function t(e) {
      var t = n.PROBLEM_TOKEN_PREFIX, r = "%20", i = e.tokensSelected || [];
      i.forEach(function (e) {
        e.token && (t += r + e.token);
      });
      var s = e.othersSelected || [];
      return s.forEach(function (e) {
        e.token && e.value && (t += r + e.token + "&" + e.token + "=" + encodeURIComponent(e.value));
      }), t;
    }
    this.submit = function (t) {
      if (typeof t.score != "number")
        return this.cancel(t);
      t.reason = n.reason.RANDOM;
      e(t);
    };
    this.cancel = function (t) {
      t.score = n.CANCEL_SCORE;
      t.reason = n.reason.CANCEL;
      t.problemTokens = n.PROBLEM_TOKEN_PREFIX;
      t.tokensSelected = [];
      t.othersSelected = [];
      e(t);
    };
  }
  var n = e("constants/common").telemetry.callQualityFeedback, r = e("experience/settings"), i = e("ui/telemetry/telemetryClient"), s;
  t.get = function () {
    return s || (s = new o()), s;
  };
});

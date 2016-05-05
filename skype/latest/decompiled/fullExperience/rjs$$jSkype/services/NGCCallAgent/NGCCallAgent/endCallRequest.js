define("jSkype/services/NGCCallAgent/NGCCallAgent/endCallRequest", [
  "require",
  "jSkype/services/NGCCallAgent/NGCCallAgent/utils"
], function (e) {
  var t = e("jSkype/services/NGCCallAgent/NGCCallAgent/utils"), n = {};
  return n.getPayload = function (e, n) {
    t.assertNotNull(e, "signalingSession cannot be null"), t.assertCallEndReason(n);
    var r = {
      payload: {
        callEnd: n,
        debugContent: {
          callId: e.correlationId,
          endpointId: e.participantManager.localParticipant.endpointId,
          participantId: e.participantManager.localParticipant.participantId
        }
      }
    };
    return r;
  }, n;
})

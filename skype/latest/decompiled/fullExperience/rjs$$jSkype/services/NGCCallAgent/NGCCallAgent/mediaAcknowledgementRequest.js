define("jSkype/services/NGCCallAgent/NGCCallAgent/mediaAcknowledgementRequest", [
  "require",
  "jSkype/services/NGCCallAgent/NGCCallAgent/utils"
], function (e) {
  var t = e("jSkype/services/NGCCallAgent/NGCCallAgent/utils"), n = {};
  return n.getPayload = function (e) {
    t.assertNotNull(e, "signalingSession cannot be null");
    var n = {
      payload: {
        debugContent: {
          callId: e.correlationId,
          endpointId: e.participantManager.localParticipant.endpointId,
          participantId: e.participantManager.localParticipant.participantId
        }
      }
    };
    return n;
  }, n;
});

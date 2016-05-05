define("jSkype/services/NGCCallAgent/NGCCallAgent/callProgressRequest", [
  "require",
  "jSkype/services/NGCCallAgent/NGCCallAgent/utils"
], function (e) {
  var t = e("jSkype/services/NGCCallAgent/NGCCallAgent/utils"), n = {};
  return n.getPayload = function (e) {
    t.assertNotNull(e, "signalingSession cannot be null");
    var n = {
      payload: {
        callProgress: {
          sender: {
            id: e.participantManager.localParticipant.id,
            displayName: e.participantManager.localParticipant.displayName,
            endpointId: e.participantManager.localParticipant.endpointId,
            languageId: e.participantManager.localParticipant.languageId
          },
          status: "ringing",
          phrase: "ringing"
        },
        debugContent: {
          callId: e.correlationId,
          endpointId: e.participantManager.localParticipant.endpointId,
          participantId: e.participantManager.localParticipant.participantId
        }
      }
    };
    return n;
  }, n;
})

define("jSkype/services/NGCCallAgent/NGCCallAgent/provisionalMediaResponse", [
  "require",
  "jSkype/services/NGCCallAgent/NGCCallAgent/utils"
], function (e) {
  var t = e("jSkype/services/NGCCallAgent/NGCCallAgent/utils"), n = {};
  return n.getPayload = function (e, n) {
    t.assertNotNull(e, "signalingSession cannot be null");
    var r = {
      payload: {
        mediaAnswer: {
          sender: {
            id: e.participantManager.localParticipant.id,
            displayName: e.participantManager.localParticipant.displayName,
            endpointId: e.participantManager.localParticipant.endpointId,
            languageId: e.participantManager.localParticipant.languageId
          },
          mediaContent: n
        },
        debugContent: {
          callId: e.correlationId,
          endpointId: e.participantManager.localParticipant.endpointId,
          participantId: e.participantManager.localParticipant.participantId
        }
      }
    };
    return r;
  }, n;
});

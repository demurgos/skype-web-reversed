define("jSkype/services/NGCCallAgent/NGCCallAgent/removeParticipantRequest", [
  "require",
  "jSkype/services/NGCCallAgent/NGCCallAgent/utils",
  "jSkype/services/NGCCallAgent/NGCCallAgent/urlBuilder",
  "jSkype/services/NGCCallAgent/NGCCallAgent/constants"
], function (e) {
  var t = e("jSkype/services/NGCCallAgent/NGCCallAgent/utils"), n = e("jSkype/services/NGCCallAgent/NGCCallAgent/urlBuilder"), r = e("jSkype/services/NGCCallAgent/NGCCallAgent/constants"), i = {};
  return i.getPayload = function (e, i) {
    t.assertNotNull(e, "signalingSession cannot be null");
    t.assertNotNull(i, "remoteParticipant cannot be null");
    var s = {
      payload: {
        participants: {
          from: {
            id: e.participantManager.localParticipant.id,
            displayName: e.participantManager.localParticipant.displayName,
            endpointId: e.participantManager.localParticipant.endpointId,
            languageId: e.participantManager.localParticipant.languageId
          },
          to: [{
              id: i.id,
              displayName: i.displayName
            }]
        },
        links: {
          removeParticipantSuccess: n.get(e, r.URL_PATH.CONV_REMOVE_PARTICIPANT_SUCCESS),
          removeParticipantFailure: n.get(e, r.URL_PATH.CONV_REMOVE_PARTICIPANT_FAILURE)
        },
        debugContent: {
          callId: e.correlationId,
          endpointId: e.participantManager.localParticipant.endpointId,
          participantId: e.participantManager.localParticipant.participantId
        }
      }
    };
    return s;
  }, i;
});

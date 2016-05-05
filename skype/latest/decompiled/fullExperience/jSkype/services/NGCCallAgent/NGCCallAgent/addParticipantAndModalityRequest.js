define("jSkype/services/NGCCallAgent/NGCCallAgent/addParticipantAndModalityRequest", [
  "require",
  "jSkype/services/NGCCallAgent/NGCCallAgent/utils",
  "jSkype/services/NGCCallAgent/NGCCallAgent/urlBuilder",
  "jSkype/services/NGCCallAgent/NGCCallAgent/constants"
], function (e) {
  var t = e("jSkype/services/NGCCallAgent/NGCCallAgent/utils"), n = e("jSkype/services/NGCCallAgent/NGCCallAgent/urlBuilder"), r = e("jSkype/services/NGCCallAgent/NGCCallAgent/constants"), i = {};
  return i.getPayload = function (e, i) {
    t.assertNotNull(e, "signalingSession cannot be null"), t.assertNotNull(i, "remoteParticipant cannot be null"), t.assertNotNullOrEmpty(e.threadId, "threadId should be set prior to adding participant");
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
        groupChat: {
          threadId: e.threadId,
          messageId: e.spacesMessageId
        },
        links: {
          addParticipantSuccess: n.get(e, r.URL_PATH.CONV_ADD_PARTICIPANT_SUCCESS),
          addParticipantFailure: n.get(e, r.URL_PATH.CONV_ADD_PARTICIPANT_FAILURE)
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
})

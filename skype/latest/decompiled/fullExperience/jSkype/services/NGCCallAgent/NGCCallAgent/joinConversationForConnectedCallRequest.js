define("jSkype/services/NGCCallAgent/NGCCallAgent/joinConversationForConnectedCallRequest", [
  "require",
  "jSkype/services/NGCCallAgent/NGCCallAgent/utils",
  "jSkype/services/NGCCallAgent/NGCCallAgent/urlBuilder",
  "jSkype/services/NGCCallAgent/NGCCallAgent/constants"
], function (e) {
  var t = e("jSkype/services/NGCCallAgent/NGCCallAgent/utils"), n = e("jSkype/services/NGCCallAgent/NGCCallAgent/urlBuilder"), r = e("jSkype/services/NGCCallAgent/NGCCallAgent/constants"), i = {};
  return i.getPayload = function (e) {
    t.assertNotNull(e, "signalingSession cannot be null");
    var i = {
        type: "full",
        rosterUpdate: n.get(e, r.URL_PATH.CONV_ROSTER_UPDATE)
      }, s = {
        payload: {
          participants: {
            from: {
              id: e.participantManager.localParticipant.id,
              displayName: e.participantManager.localParticipant.displayName,
              endpointId: e.participantManager.localParticipant.endpointId,
              languageId: e.participantManager.localParticipant.languageId
            }
          },
          conversationRequest: {
            roster: i,
            links: {
              conversationEnd: n.get(e, r.URL_PATH.CONV_END),
              conversationUpdate: n.get(e, r.URL_PATH.CONV_UPDATE),
              addParticipantSuccess: n.get(e, r.URL_PATH.CONV_ADD_PARTICIPANT_SUCCESS),
              addParticipantFailure: n.get(e, r.URL_PATH.CONV_ADD_PARTICIPANT_FAILURE)
            }
          },
          capabilities: {
            cloudAudioVideoConference: e.isGVCJoiningEnabled ? "enabled" : "disabled",
            cloudScreenSharing: e.signalingAgentConfig.cloudScreenSharingFlag
          }
        }
      };
    return s;
  }, i;
})

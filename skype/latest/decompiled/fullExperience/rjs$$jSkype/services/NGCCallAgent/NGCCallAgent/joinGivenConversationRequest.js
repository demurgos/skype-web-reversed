define("jSkype/services/NGCCallAgent/NGCCallAgent/joinGivenConversationRequest", [
  "require",
  "jSkype/services/NGCCallAgent/NGCCallAgent/utils",
  "jSkype/services/NGCCallAgent/NGCCallAgent/urlBuilder",
  "jSkype/services/NGCCallAgent/NGCCallAgent/constants"
], function (e) {
  var t = e("jSkype/services/NGCCallAgent/NGCCallAgent/utils"), n = e("jSkype/services/NGCCallAgent/NGCCallAgent/urlBuilder"), r = e("jSkype/services/NGCCallAgent/NGCCallAgent/constants"), i = {};
  return i.getPayload = function (e, i, s) {
    t.assertNotNull(e, "signalingSession cannot be null");
    var o = t.getMediaTypes(s);
    e.telemetryHelper.addOutgoingModalities(o);
    var u = {
      payload: {
        callInvitation: {
          callModalities: o,
          replaces: null,
          transferor: null,
          links: {
            progress: n.get(e, r.URL_PATH.PROGRESS),
            mediaAnswer: n.get(e, r.URL_PATH.MEDIA_ANSWER),
            acceptance: n.get(e, r.URL_PATH.ACCEPT),
            redirection: n.get(e, r.URL_PATH.REDIRECTION),
            end: n.get(e, r.URL_PATH.END),
            p2pForkNotification: n.get(e, r.URL_PATH.P2P_FORK_NOTIFICATION)
          },
          mediaContent: i
        },
        conversationRequest: {
          roster: {
            type: "full",
            rosterUpdate: n.get(e, r.URL_PATH.CONV_ROSTER_UPDATE)
          },
          links: {
            conversationEnd: n.get(e, r.URL_PATH.CONV_END),
            conversationUpdate: n.get(e, r.URL_PATH.CONV_UPDATE),
            addParticipantSuccess: n.get(e, r.URL_PATH.CONV_ADD_PARTICIPANT_SUCCESS),
            addParticipantFailure: n.get(e, r.URL_PATH.CONV_ADD_PARTICIPANT_FAILURE)
          }
        },
        participants: {
          from: {
            id: e.participantManager.localParticipant.id,
            displayName: e.participantManager.localParticipant.displayName,
            endpointId: e.participantManager.localParticipant.endpointId,
            languageId: e.participantManager.localParticipant.languageId
          }
        },
        capabilities: {
          cloudAudioVideoConference: e.isGVCJoiningEnabled ? "enabled" : "disabled",
          cloudScreenSharing: e.signalingAgentConfig.cloudScreenSharingFlag
        },
        debugContent: {
          callId: e.correlationId,
          endpointId: e.participantManager.localParticipant.endpointId,
          participantId: e.participantManager.localParticipant.participantId
        }
      }
    };
    return u;
  }, i;
});

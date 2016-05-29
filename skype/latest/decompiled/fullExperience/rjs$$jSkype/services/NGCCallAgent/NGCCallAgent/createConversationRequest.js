define("jSkype/services/NGCCallAgent/NGCCallAgent/createConversationRequest", [
  "require",
  "jSkype/services/NGCCallAgent/NGCCallAgent/utils",
  "jSkype/services/NGCCallAgent/NGCCallAgent/urlBuilder",
  "jSkype/services/NGCCallAgent/NGCCallAgent/constants"
], function (e) {
  var t = e("jSkype/services/NGCCallAgent/NGCCallAgent/utils"), n = e("jSkype/services/NGCCallAgent/NGCCallAgent/urlBuilder"), r = e("jSkype/services/NGCCallAgent/NGCCallAgent/constants"), i = {};
  return i.getPayload = function (e, i, s, o) {
    t.assertNotNull(e, "signalingSession cannot be null");
    var u = e.participantManager.getParticipantsToInitiateCallWith();
    e.signalingAgentConfig.doHostlessCalling || t.assert(u.length > 0, "remoteParticipants need to be set before a call can be made");
    var a = {
        type: "full",
        rosterUpdate: n.get(e, r.URL_PATH.CONV_ROSTER_UPDATE)
      }, f = e.threadId ? {
        threadId: e.threadId,
        messageId: e.spacesMessageId || null
      } : null;
    e.signalingAgentConfig.doHostlessCalling || u.length > 1 ? t.assertNotNullOrEmpty(e.threadId, "threadId should be set prior to making a multiparty call") : u.length === 1 && e.telemetryHelper.setCalleeType(u[0].id);
    var l = [];
    u.forEach(function (e) {
      l.push({
        id: e.id,
        displayName: e.displayName
      });
    });
    var c = t.getMediaTypes(s);
    e.telemetryHelper.addOutgoingModalities(c);
    var h = {
      payload: {
        callInvitation: {
          callModalities: c,
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
          subject: e.convSubject,
          suppressDialout: o || !1,
          roster: a,
          properties: {
            allowConversationWithoutHost: e.signalingAgentConfig.doHostlessCalling,
            enableGroupCallEventMessages: e.signalingAgentConfig.shouldServiceSendCallEventMessages
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
          },
          to: l
        },
        capabilities: {
          cloudAudioVideoConference: e.isGVCOutgoingEnabled ? "enabled" : "disabled",
          cloudScreenSharing: e.signalingAgentConfig.cloudScreenSharingFlag
        },
        groupChat: f,
        debugContent: {
          callId: e.correlationId,
          endpointId: e.participantManager.localParticipant.endpointId,
          participantId: e.participantManager.localParticipant.participantId
        }
      }
    };
    return h;
  }, i;
});

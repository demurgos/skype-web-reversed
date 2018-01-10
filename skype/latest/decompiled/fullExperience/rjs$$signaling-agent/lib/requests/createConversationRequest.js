(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/requests/createConversationRequest", [
      "require",
      "exports",
      "../utilities/utils",
      "../utilities/urlBuilder",
      "../utilities/constants"
    ], e);
}(function (e, t) {
  function s(e, t, s, o) {
    n.assertNotNull(e, "signalingSession cannot be null");
    var u = e.participantManager.getParticipantsToInitiateCallWith();
    e.signalingAgentConfig.doHostlessCalling || n.assert(u.length > 0, "remoteParticipants need to be set before a call can be made");
    var a = {
        type: "multiPartyEndpoint",
        rosterUpdate: r.get(e, i["default"].URL_PATH.CONV_ROSTER_UPDATE)
      }, f = e.threadId ? {
        threadId: e.threadId,
        messageId: e.teamsMessageId || null
      } : null, l = e.contentSharingManager.getContentSharingInfoToStartSharing(), c = l === null ? null : {
        identifier: l.contentIdentifier,
        subject: l.subject,
        sessionState: l.sessionState,
        sessionUpdateSequenceNumber: l.sequenceNumber,
        links: {
          sessionUpdate: r.get(e, i["default"].URL_PATH.CONV_CONTENT_SHARING_UPDATE),
          sessionEnd: r.get(e, i["default"].URL_PATH.CONV_CONTENT_SHARING_END)
        }
      };
    u.length !== 1 ? n.assertNotNullOrEmpty(e.threadId, "threadId should be set prior to making a multiparty call") : e.telemetryHelper.setCalleeType(u[0].id);
    e.numberOfOriginalInvitees = u.length;
    var h = [];
    u.forEach(function (e) {
      h.push({
        id: e.id,
        displayName: e.displayName
      });
    });
    var p = n.getMediaTypes(s);
    e.telemetryHelper.addOutgoingModalities(p);
    var d = e.transferContext ? e.transferContext.transferor : null, v = {
        payload: {
          callInvitation: {
            callModalities: p,
            replaces: null,
            transferor: d || null,
            links: {
              progress: r.get(e, i["default"].URL_PATH.PROGRESS),
              mediaAnswer: r.get(e, i["default"].URL_PATH.MEDIA_ANSWER),
              acceptance: r.get(e, i["default"].URL_PATH.ACCEPT),
              redirection: r.get(e, i["default"].URL_PATH.REDIRECTION),
              end: r.get(e, i["default"].URL_PATH.END)
            },
            clientContentForMediaController: e.webRtcSignalingManager.getClientUrls(),
            mediaContent: t,
            pstnContent: e.pstnContent,
            onBehalfOf: e.onBehalfOf
          },
          conversationRequest: {
            conversationType: o.castCall ? "cast" : null,
            subject: e.convSubject,
            suppressDialout: o.suppressDialout,
            roster: a,
            properties: {
              allowConversationWithoutHost: e.signalingAgentConfig.doHostlessCalling,
              enableGroupCallEventMessages: e.signalingAgentConfig.shouldServiceSendCallEventMessages,
              enableGroupCallUpgradeMessage: e.signalingAgentConfig.shouldServiceSendNGCUpgradeMessages,
              enableGroupCallMeetupGeneration: e.enableGroupCallMeetupGeneration
            },
            links: {
              conversationEnd: r.get(e, i["default"].URL_PATH.CONV_END),
              conversationUpdate: r.get(e, i["default"].URL_PATH.CONV_UPDATE),
              addParticipantSuccess: r.get(e, i["default"].URL_PATH.CONV_ADD_PARTICIPANT_SUCCESS),
              addParticipantFailure: r.get(e, i["default"].URL_PATH.CONV_ADD_PARTICIPANT_FAILURE),
              addModalitySuccess: r.get(e, i["default"].URL_PATH.CONV_ADD_MODALITY_SUCCESS),
              addModalityFailure: r.get(e, i["default"].URL_PATH.CONV_ADD_MODALITY_FAILURE),
              confirmUnmute: r.get(e, i["default"].URL_PATH.CONV_CONFIRM_UNMUTE)
            }
          },
          contentSharing: c,
          participants: {
            from: {
              id: e.participantManager.localParticipant.id,
              displayName: e.participantManager.localParticipant.displayName,
              endpointId: e.participantManager.localParticipant.endpointId,
              participantId: e.participantManager.localParticipant.participantId,
              languageId: e.participantManager.localParticipant.languageId
            },
            to: h
          },
          capabilities: {
            cloudAudioVideoConference: e.signalingAgentConfig.isGVCOutgoingEnabled ? "enabled" : "disabled",
            cloudScreenSharing: e.signalingAgentConfig.cloudScreenSharingFlag,
            hostlessConference: e.signalingAgentConfig.supportsHostlessGroupCalls ? "enabled" : "disabled"
          },
          groupChat: f,
          meetingInfo: e.getMeetingInfo()
        }
      };
    return v;
  }
  var n = e("../utilities/utils"), r = e("../utilities/urlBuilder"), i = e("../utilities/constants");
  t.getPayload = s;
}));

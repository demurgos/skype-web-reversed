(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/requests/joinGivenConversationRequest", [
      "require",
      "exports",
      "../utilities/utils",
      "../utilities/urlBuilder",
      "../utilities/constants"
    ], e);
}(function (e, t) {
  function s(e, t, s, o) {
    n.assertNotNull(e, "signalingSession cannot be null");
    var u = n.getMediaTypes(s);
    e.telemetryHelper.addOutgoingModalities(u);
    var a = e.threadId ? {
        threadId: e.threadId,
        messageId: e.teamsMessageId || null
      } : null, f = {
        payload: {
          callInvitation: {
            callModalities: u,
            replaces: null,
            transferor: null,
            links: {
              progress: r.get(e, i["default"].URL_PATH.PROGRESS),
              mediaAnswer: r.get(e, i["default"].URL_PATH.MEDIA_ANSWER),
              acceptance: r.get(e, i["default"].URL_PATH.ACCEPT),
              redirection: r.get(e, i["default"].URL_PATH.REDIRECTION),
              end: r.get(e, i["default"].URL_PATH.END)
            },
            clientContentForMediaController: e.webRtcSignalingManager.getClientUrls(),
            mediaContent: t
          },
          conversationRequest: {
            conversationType: o.castCall ? "cast" : null,
            subject: e.convSubject,
            suppressDialout: o.suppressDialout,
            roster: {
              type: "multiPartyEndpoint",
              rosterUpdate: r.get(e, i["default"].URL_PATH.CONV_ROSTER_UPDATE)
            },
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
              addParticipantFailure: r.get(e, i["default"].URL_PATH.CONV_ADD_PARTICIPANT_FAILURE)
            }
          },
          participants: {
            from: {
              id: e.participantManager.localParticipant.id,
              displayName: e.participantManager.localParticipant.displayName,
              endpointId: e.participantManager.localParticipant.endpointId,
              participantId: e.participantManager.localParticipant.participantId,
              languageId: e.participantManager.localParticipant.languageId
            }
          },
          capabilities: {
            cloudAudioVideoConference: e.signalingAgentConfig.isGVCJoiningEnabled ? "enabled" : "disabled",
            cloudScreenSharing: e.signalingAgentConfig.cloudScreenSharingFlag,
            hostlessConference: e.signalingAgentConfig.supportsHostlessGroupCalls ? "enabled" : "disabled"
          },
          groupChat: a,
          meetingInfo: e.getMeetingInfo()
        }
      };
    return f;
  }
  var n = e("../utilities/utils"), r = e("../utilities/urlBuilder"), i = e("../utilities/constants");
  t.getPayload = s;
}));

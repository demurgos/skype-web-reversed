(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/requests/joinGivenConversationWithoutCallModalityRequest", [
      "require",
      "exports",
      "../utilities/utils",
      "../utilities/urlBuilder",
      "../utilities/constants"
    ], e);
}(function (e, t) {
  function s(e) {
    n.assertNotNull(e, "signalingSession cannot be null");
    var t = e.threadId ? {
        threadId: e.threadId,
        messageId: e.teamsMessageId || null
      } : null, s = {
        payload: {
          conversationRequest: {
            roster: {
              type: "multiPartyEndpoint",
              rosterUpdate: r.get(e, i["default"].URL_PATH.CONV_ROSTER_UPDATE)
            },
            links: {
              conversationEnd: r.get(e, i["default"].URL_PATH.CONV_END),
              conversationUpdate: r.get(e, i["default"].URL_PATH.CONV_UPDATE)
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
          groupChat: t,
          meetingInfo: e.getMeetingInfo()
        }
      };
    return s;
  }
  var n = e("../utilities/utils"), r = e("../utilities/urlBuilder"), i = e("../utilities/constants");
  t.getPayload = s;
}));

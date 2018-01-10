(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/requests/attachAndJoinRequest", [
      "require",
      "exports",
      "../utilities/utils",
      "../utilities/urlBuilder",
      "../utilities/constants"
    ], e);
}(function (e, t) {
  function s(e, t) {
    n.assertNotNull(e, "signalingSession cannot be null");
    n.assertNotNull(t, "joinUrl cannot be null");
    var s = {
        type: "multiPartyEndpoint",
        rosterUpdate: r.get(e, i["default"].URL_PATH.CONV_ROSTER_UPDATE)
      }, o = {
        payload: {
          attach: {
            requireMediaContent: !0,
            links: { end: r.get(e, i["default"].URL_PATH.END) }
          },
          capabilities: {
            cloudAudioVideoConference: e.signalingAgentConfig.isGVCJoiningEnabled ? "enabled" : "disabled",
            cloudScreenSharing: e.signalingAgentConfig.cloudScreenSharingFlag,
            hostlessConference: e.signalingAgentConfig.supportsHostlessGroupCalls ? "enabled" : "disabled"
          },
          additionalActions: [{
              input: {
                capabilities: {
                  cloudAudioVideoConference: e.signalingAgentConfig.isGVCJoiningEnabled ? "enabled" : "disabled",
                  cloudScreenSharing: e.signalingAgentConfig.cloudScreenSharingFlag,
                  hostlessConference: e.signalingAgentConfig.supportsHostlessGroupCalls ? "enabled" : "disabled"
                },
                conversationRequest: {
                  roster: s,
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
                }
              },
              name: "join",
              url: t,
              waitForResponse: !0
            }]
        }
      };
    return o;
  }
  var n = e("../utilities/utils"), r = e("../utilities/urlBuilder"), i = e("../utilities/constants");
  t.getPayload = s;
}));

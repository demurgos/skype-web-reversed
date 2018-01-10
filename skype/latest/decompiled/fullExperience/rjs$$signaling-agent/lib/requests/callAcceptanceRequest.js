(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/requests/callAcceptanceRequest", [
      "require",
      "exports",
      "../utilities/utils",
      "../utilities/urlBuilder",
      "../utilities/constants"
    ], e);
}(function (e, t) {
  function s(e, t, s) {
    n.assertNotNull(e, "signalingSession cannot be null");
    var o = n.getMediaTypes(s);
    e.telemetryHelper.addOutgoingModalities(o);
    var u = {
      payload: {
        callAcceptance: {
          acceptedBy: {
            id: e.participantManager.localParticipant.id,
            displayName: e.participantManager.localParticipant.displayName,
            endpointId: e.participantManager.localParticipant.endpointId,
            participantId: e.participantManager.localParticipant.participantId,
            languageId: e.participantManager.localParticipant.languageId
          },
          acceptedCallModalities: o,
          capabilities: {
            cloudAudioVideoConference: e.signalingAgentConfig.isGVCJoiningEnabled ? "enabled" : "disabled",
            cloudScreenSharing: e.signalingAgentConfig.cloudScreenSharingFlag,
            hostlessConference: e.signalingAgentConfig.supportsHostlessGroupCalls ? "enabled" : "disabled"
          },
          links: {
            mediaRenegotiation: r.get(e, i["default"].URL_PATH.MEDIA_RENEGOTIATION),
            transfer: r.get(e, i["default"].URL_PATH.TRANSFER),
            replacement: r.get(e, i["default"].URL_PATH.REPLACE),
            balanceUpdate: r.get(e, i["default"].URL_PATH.BALANCE_UPDATE),
            retargetCompletion: r.get(e, i["default"].URL_PATH.RETARGET_COMPLETION),
            controlVideoStreaming: r.get(e, i["default"].URL_PATH.CONTROL_VIDEO_STREAMING)
          },
          clientContentForMediaController: e.webRtcSignalingManager.getClientUrls(),
          mediaContent: t,
          pstnContent: e.pstnContent,
          callKeepAliveInterval: null
        }
      }
    };
    return u;
  }
  var n = e("../utilities/utils"), r = e("../utilities/urlBuilder"), i = e("../utilities/constants");
  t.getPayload = s;
}));

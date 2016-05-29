define("jSkype/services/NGCCallAgent/NGCCallAgent/attachCallRequest", [
  "require",
  "jSkype/services/NGCCallAgent/NGCCallAgent/utils",
  "jSkype/services/NGCCallAgent/NGCCallAgent/urlBuilder",
  "jSkype/services/NGCCallAgent/NGCCallAgent/constants"
], function (e) {
  var t = e("jSkype/services/NGCCallAgent/NGCCallAgent/utils"), n = e("jSkype/services/NGCCallAgent/NGCCallAgent/urlBuilder"), r = e("jSkype/services/NGCCallAgent/NGCCallAgent/constants"), i = {};
  return i.getPayload = function (e) {
    t.assertNotNull(e, "signalingSession cannot be null");
    var i = {
      payload: {
        attach: {
          requireMediaContent: !0,
          links: { end: n.get(e, r.URL_PATH.END) }
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
    return i;
  }, i;
});

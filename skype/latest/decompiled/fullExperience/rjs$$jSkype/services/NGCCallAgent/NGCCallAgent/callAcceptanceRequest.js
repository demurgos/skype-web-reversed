define("jSkype/services/NGCCallAgent/NGCCallAgent/callAcceptanceRequest", [
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
        callAcceptance: {
          acceptedBy: {
            id: e.participantManager.localParticipant.id,
            displayName: e.participantManager.localParticipant.displayName,
            endpointId: e.participantManager.localParticipant.endpointId,
            languageId: e.participantManager.localParticipant.languageId
          },
          acceptedCallModalities: o,
          capabilities: {
            cloudAudioVideoConference: e.isGVCJoiningEnabled ? "enabled" : "disabled",
            cloudScreenSharing: e.signalingAgentConfig.cloudScreenSharingFlag
          },
          links: {
            mediaRenegotiation: n.get(e, r.URL_PATH.MEDIA_RENEGOTIATION),
            transfer: n.get(e, r.URL_PATH.TRANSFER),
            replacement: n.get(e, r.URL_PATH.REPLACE),
            retargetCompletion: n.get(e, r.URL_PATH.RETARGET_COMPLETION)
          },
          mediaContent: i,
          callKeepAliveInterval: null
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
})

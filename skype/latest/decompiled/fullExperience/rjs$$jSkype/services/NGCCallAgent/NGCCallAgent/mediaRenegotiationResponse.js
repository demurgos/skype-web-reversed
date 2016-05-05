define("jSkype/services/NGCCallAgent/NGCCallAgent/mediaRenegotiationResponse", [
  "require",
  "jSkype/services/NGCCallAgent/NGCCallAgent/utils",
  "jSkype/services/NGCCallAgent/NGCCallAgent/urlBuilder",
  "jSkype/services/NGCCallAgent/NGCCallAgent/constants"
], function (e) {
  var t = e("jSkype/services/NGCCallAgent/NGCCallAgent/utils"), n = e("jSkype/services/NGCCallAgent/NGCCallAgent/urlBuilder"), r = e("jSkype/services/NGCCallAgent/NGCCallAgent/constants"), i = {};
  return i.getPayload = function (e, i, s) {
    t.assertNotNull(e, "signalingSession cannot be null");
    var o = [];
    s && (o = t.getMediaTypes(s), e.telemetryHelper.addOutgoingModalities(o));
    var u = {
      payload: {
        mediaAnswer: {
          callModalities: o,
          sender: {
            id: e.participantManager.localParticipant.id,
            displayName: e.participantManager.localParticipant.displayName,
            endpointId: e.participantManager.localParticipant.endpointId,
            languageId: e.participantManager.localParticipant.languageId
          },
          links: { mediaAcknowledgement: n.get(e, r.URL_PATH.MEDIA_ACKNOWLEDGEMENT) },
          mediaContent: i
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

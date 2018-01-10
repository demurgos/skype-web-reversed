(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/responses/mediaRenegotiationResponse", [
      "require",
      "exports",
      "../utilities/utils",
      "../utilities/urlBuilder",
      "../utilities/constants"
    ], e);
}(function (e, t) {
  function s(e, t, s) {
    n.assertNotNull(e, "signalingSession cannot be null");
    var o = [];
    s && (o = n.getMediaTypes(s), e.telemetryHelper.addOutgoingModalities(o));
    var u = {
      payload: {
        mediaAnswer: {
          callModalities: o,
          sender: {
            id: e.participantManager.localParticipant.id,
            displayName: e.participantManager.localParticipant.displayName,
            endpointId: e.participantManager.localParticipant.endpointId,
            participantId: e.participantManager.localParticipant.participantId,
            languageId: e.participantManager.localParticipant.languageId
          },
          links: { mediaAcknowledgement: r.get(e, i["default"].URL_PATH.MEDIA_ACKNOWLEDGEMENT) },
          clientContentForMediaController: e.webRtcSignalingManager.getClientUrls(),
          mediaContent: t
        },
        debugContent: {
          callId: e.correlationId,
          endpointId: e.participantManager.localParticipant.endpointId
        }
      }
    };
    return u;
  }
  var n = e("../utilities/utils"), r = e("../utilities/urlBuilder"), i = e("../utilities/constants");
  t.getPayload = s;
}));

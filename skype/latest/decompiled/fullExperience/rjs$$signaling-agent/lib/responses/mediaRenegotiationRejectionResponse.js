(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/responses/mediaRenegotiationRejectionResponse", [
      "require",
      "exports",
      "../utilities/utils"
    ], e);
}(function (e, t) {
  function r(e, t) {
    n.assertNotNull(e, "signalingSession cannot be null");
    n.assertCallEndReason(t);
    var r = {
      payload: {
        mediaNegotiationFailure: {
          sender: {
            id: e.participantManager.localParticipant.id,
            displayName: e.participantManager.localParticipant.displayName,
            endpointId: e.participantManager.localParticipant.endpointId,
            participantId: e.participantManager.localParticipant.participantId,
            languageId: e.participantManager.localParticipant.languageId
          },
          code: t.code,
          subCode: t.subCode,
          phrase: t.phrase
        },
        debugContent: {
          callId: e.correlationId,
          endpointId: e.participantManager.localParticipant.endpointId
        }
      }
    };
    return r;
  }
  var n = e("../utilities/utils");
  t.getPayload = r;
}));

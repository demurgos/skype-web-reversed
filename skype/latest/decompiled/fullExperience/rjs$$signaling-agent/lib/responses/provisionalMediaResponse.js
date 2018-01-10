(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/responses/provisionalMediaResponse", [
      "require",
      "exports",
      "../utilities/utils"
    ], e);
}(function (e, t) {
  function r(e, t) {
    n.assertNotNull(e, "signalingSession cannot be null");
    var r = {
      payload: {
        mediaAnswer: {
          sender: {
            id: e.participantManager.localParticipant.id,
            displayName: e.participantManager.localParticipant.displayName,
            endpointId: e.participantManager.localParticipant.endpointId,
            participantId: e.participantManager.localParticipant.participantId,
            languageId: e.participantManager.localParticipant.languageId
          },
          mediaContent: t,
          pstnContent: e.pstnContent
        }
      }
    };
    return r;
  }
  var n = e("../utilities/utils");
  t.getPayload = r;
}));

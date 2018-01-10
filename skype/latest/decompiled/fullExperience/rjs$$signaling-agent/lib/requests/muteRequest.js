(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/requests/muteRequest", [
      "require",
      "exports",
      "../utilities/utils"
    ], e);
}(function (e, t) {
  function r(e, t, r) {
    n.assertNotNull(e, "signalingSession cannot be null");
    n.assertNotNull(t, "muteScope be null");
    n.assertNotNull(r, "participantList cannot be null");
    var i = {
      payload: {
        from: {
          id: e.participantManager.localParticipant.id,
          displayName: e.participantManager.localParticipant.displayName,
          endpointId: e.participantManager.localParticipant.endpointId,
          participantId: e.participantManager.localParticipant.participantId,
          languageId: e.participantManager.localParticipant.languageId
        },
        scope: t,
        muteParticipants: r,
        mediaTypes: ["audio"]
      }
    };
    return i;
  }
  var n = e("../utilities/utils");
  t.getPayload = r;
}));

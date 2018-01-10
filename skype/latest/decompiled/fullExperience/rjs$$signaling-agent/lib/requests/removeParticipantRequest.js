(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/requests/removeParticipantRequest", [
      "require",
      "exports",
      "../utilities/utils",
      "../utilities/urlBuilder",
      "../utilities/constants"
    ], e);
}(function (e, t) {
  function s(e, t) {
    n.assertNotNull(e, "signalingSession cannot be null");
    n.assertNotNull(t, "remoteParticipant cannot be null");
    var s = {
      payload: {
        participants: {
          from: {
            id: e.participantManager.localParticipant.id,
            displayName: e.participantManager.localParticipant.displayName,
            endpointId: e.participantManager.localParticipant.endpointId,
            participantId: e.participantManager.localParticipant.participantId,
            languageId: e.participantManager.localParticipant.languageId
          },
          to: [{
              id: t.id,
              displayName: t.displayName
            }]
        },
        links: {
          removeParticipantSuccess: r.get(e, i["default"].URL_PATH.CONV_REMOVE_PARTICIPANT_SUCCESS),
          removeParticipantFailure: r.get(e, i["default"].URL_PATH.CONV_REMOVE_PARTICIPANT_FAILURE)
        }
      }
    };
    return s;
  }
  var n = e("../utilities/utils"), r = e("../utilities/urlBuilder"), i = e("../utilities/constants");
  t.getPayload = s;
}));

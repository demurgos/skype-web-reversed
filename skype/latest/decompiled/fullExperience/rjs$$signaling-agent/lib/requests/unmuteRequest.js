(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/requests/unmuteRequest", [
      "require",
      "exports",
      "../utilities/utils",
      "../utilities/urlBuilder",
      "../utilities/constants"
    ], e);
}(function (e, t) {
  function s(e) {
    n.assertNotNull(e, "signalingSession cannot be null");
    var t = {
      payload: {
        from: {
          id: e.participantManager.localParticipant.id,
          displayName: e.participantManager.localParticipant.displayName,
          endpointId: e.participantManager.localParticipant.endpointId,
          participantId: e.participantManager.localParticipant.participantId,
          languageId: e.participantManager.localParticipant.languageId
        },
        mediaTypes: ["audio"],
        links: {
          unmuteSuccess: r.get(e, i["default"].URL_PATH.CONV_UNMUTE_SUCCESS),
          unmuteFailure: r.get(e, i["default"].URL_PATH.CONV_UNMUTE_FAILURE)
        }
      }
    };
    return t;
  }
  var n = e("../utilities/utils"), r = e("../utilities/urlBuilder"), i = e("../utilities/constants");
  t.getPayload = s;
}));

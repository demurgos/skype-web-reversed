(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/requests/leaveConversationRequest", [
      "require",
      "exports",
      "../utilities/utils",
      "../utilities/constants"
    ], e);
}(function (e, t) {
  function i(e, t) {
    n.assertNotNull(e, "signalingSession cannot be null");
    n.assertCallEndReason(t);
    var i = {
      payload: {
        participants: {
          from: {
            id: e.participantManager.localParticipant.id,
            displayName: e.participantManager.localParticipant.displayName,
            endpointId: e.participantManager.localParticipant.endpointId,
            languageId: e.participantManager.localParticipant.languageId
          }
        },
        conversationTransactionEnd: {
          reason: "noError",
          code: r["default"].CALL_END_CODE.SUCCESS,
          phrase: r["default"].CALL_END_PHRASE.CONV_END_NO_MODALITY
        },
        callTransactionEnd: t
      }
    };
    return i;
  }
  var n = e("../utilities/utils"), r = e("../utilities/constants");
  t.getPayload = i;
}));

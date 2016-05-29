define("jSkype/services/NGCCallAgent/NGCCallAgent/leaveConversationRequest", [
  "require",
  "jSkype/services/NGCCallAgent/NGCCallAgent/utils",
  "jSkype/services/NGCCallAgent/NGCCallAgent/constants"
], function (e) {
  var t = e("jSkype/services/NGCCallAgent/NGCCallAgent/utils"), n = e("jSkype/services/NGCCallAgent/NGCCallAgent/constants"), r = {};
  return r.getPayload = function (e, r) {
    t.assertNotNull(e, "signalingSession cannot be null");
    t.assertCallEndReason(r);
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
          code: n.CALL_END_CODE.SUCCESS,
          phrase: n.CALL_END_PHRASE.CONV_END_NO_MODALITY
        },
        callTransactionEnd: r
      }
    };
    return i;
  }, r;
});

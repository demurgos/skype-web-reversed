(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/requests/addParticipantAndModalityRequest", [
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
    n.assertNotNullOrEmpty(e.threadId, "threadId should be set prior to adding participant");
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
        groupChat: {
          threadId: e.threadId,
          messageId: e.teamsMessageId || null
        },
        links: {
          addParticipantSuccess: r.get(e, i["default"].URL_PATH.CONV_ADD_PARTICIPANT_SUCCESS),
          addParticipantFailure: r.get(e, i["default"].URL_PATH.CONV_ADD_PARTICIPANT_FAILURE)
        }
      }
    };
    return s;
  }
  var n = e("../utilities/utils"), r = e("../utilities/urlBuilder"), i = e("../utilities/constants");
  t.getPayload = s;
}));

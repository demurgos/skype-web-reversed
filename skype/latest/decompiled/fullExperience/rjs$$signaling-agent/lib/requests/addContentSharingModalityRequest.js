(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/requests/addContentSharingModalityRequest", [
      "require",
      "exports",
      "../utilities/constants",
      "../utilities/utils",
      "../utilities/urlBuilder"
    ], e);
}(function (e, t) {
  function s(e, t) {
    r.assertNotNull(e, "signalingSession cannot be null");
    r.assertNotNull(t, "content cannot be null");
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
          to: []
        },
        contentSharing: {
          identifier: t.contentIdentifier,
          subject: t.subject,
          sessionState: t.sessionState,
          sequenceNumber: t.sequenceNumber,
          links: {
            sessionUpdate: i.get(e, n["default"].URL_PATH.CONV_CONTENT_SHARING_UPDATE),
            sessionEnd: i.get(e, n["default"].URL_PATH.CONV_CONTENT_SHARING_END)
          }
        },
        links: {
          addModalitySuccess: i.get(e, n["default"].URL_PATH.CONV_ADD_MODALITY_SUCCESS),
          addModalityFailure: i.get(e, n["default"].URL_PATH.CONV_ADD_MODALITY_FAILURE)
        }
      }
    };
    return s;
  }
  var n = e("../utilities/constants"), r = e("../utilities/utils"), i = e("../utilities/urlBuilder");
  t.getPayload = s;
}));

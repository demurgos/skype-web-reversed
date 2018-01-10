(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/requests/joinContentSharingRequest", [
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
        contentSharing: {
          links: {
            sessionUpdate: r.get(e, i["default"].URL_PATH.CONV_CONTENT_SHARING_UPDATE),
            sessionEnd: r.get(e, i["default"].URL_PATH.CONV_CONTENT_SHARING_END)
          }
        },
        participants: {
          from: {
            id: e.participantManager.localParticipant.id,
            displayName: e.participantManager.localParticipant.displayName,
            endpointId: e.participantManager.localParticipant.endpointId,
            participantId: e.participantManager.localParticipant.participantId,
            languageId: e.participantManager.localParticipant.languageId
          }
        }
      }
    };
    return t;
  }
  var n = e("../utilities/utils"), r = e("../utilities/urlBuilder"), i = e("../utilities/constants");
  t.getPayload = s;
}));

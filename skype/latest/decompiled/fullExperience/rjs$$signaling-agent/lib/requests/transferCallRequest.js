(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/requests/transferCallRequest", [
      "require",
      "exports",
      "../utilities/utils",
      "../utilities/urlBuilder",
      "../utilities/constants"
    ], e);
}(function (e, t) {
  function s(e, t, s) {
    n.assertNotNull(t, "signalingSession cannot be null");
    n.assertNotNullOrEmpty(e, "transferTarget cannot be null OR empty");
    var o = s ? { replaces: s.replaces } : null, u = {
        payload: {
          callTransfer: {
            target: { id: e },
            transferor: {
              details: {
                id: t.participantManager.localParticipant.id,
                endpointId: t.participantManager.localParticipant.endpointId
              },
              authorizationToken: null
            },
            newCallModalities: [
              "audio",
              "video"
            ],
            links: {
              transferAcceptance: r.get(t, i["default"].URL_PATH.TRANSFER_ACCEPTANCE),
              transferCompletion: r.get(t, i["default"].URL_PATH.TRANSFER_COMPLETION)
            },
            replacementDetails: o
          }
        }
      };
    return u;
  }
  var n = e("../utilities/utils"), r = e("../utilities/urlBuilder"), i = e("../utilities/constants");
  t.getPayload = s;
}));

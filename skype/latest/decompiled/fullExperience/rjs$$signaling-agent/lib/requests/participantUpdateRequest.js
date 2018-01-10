(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/requests/participantUpdateRequest", [
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
        callParticipantUpdate: {
          links: {
            mediaRenegotiation: r.get(e, i["default"].URL_PATH.MEDIA_RENEGOTIATION),
            transfer: r.get(e, i["default"].URL_PATH.TRANSFER),
            replacement: r.get(e, i["default"].URL_PATH.REPLACE),
            end: r.get(e, i["default"].URL_PATH.END),
            balanceUpdate: r.get(e, i["default"].URL_PATH.BALANCE_UPDATE),
            retargetCompletion: r.get(e, i["default"].URL_PATH.RETARGET_COMPLETION)
          },
          clientContentForMediaController: e.webRtcSignalingManager.getClientUrls()
        }
      }
    };
    return t;
  }
  var n = e("../utilities/utils"), r = e("../utilities/urlBuilder"), i = e("../utilities/constants");
  t.getPayload = s;
}));

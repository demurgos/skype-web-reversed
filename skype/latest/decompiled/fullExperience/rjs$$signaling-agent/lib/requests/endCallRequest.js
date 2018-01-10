(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/requests/endCallRequest", [
      "require",
      "exports",
      "../utilities/utils"
    ], e);
}(function (e, t) {
  function r(e, t) {
    n.assertNotNull(e, "signalingSession cannot be null");
    n.assertCallEndReason(t);
    var r = { payload: { callEnd: t } };
    return r;
  }
  var n = e("../utilities/utils");
  t.getPayload = r;
}));

(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/requests/transferAcceptanceRequest", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function n() {
    var e = { payload: { transferAcceptance: {} } };
    return e;
  }
  t.getPayload = n;
}));

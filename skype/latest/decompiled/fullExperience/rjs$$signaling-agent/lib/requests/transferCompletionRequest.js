(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/requests/transferCompletionRequest", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  function n(e) {
    var t = { payload: { transferCompletion: e } };
    return t;
  }
  t.getPayload = n;
}));

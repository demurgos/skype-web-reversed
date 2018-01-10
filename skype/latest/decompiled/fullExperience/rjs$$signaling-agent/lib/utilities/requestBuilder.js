(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/utilities/requestBuilder", [
      "require",
      "exports",
      "./constants",
      "./utils"
    ], e);
}(function (e, t) {
  function i(e, t, i) {
    return e.signalingAgentConfig.skypeToken().then(function (s) {
      if (e.disposed)
        throw "skypeToken Getter returned too late. Object is already disposed";
      var o = {};
      o[n["default"].HEADERS.CORRELATION_ID] = e.correlationId;
      o[n["default"].HEADERS.MESSAGE_ID] = r.newGuid();
      o[n["default"].HEADERS.CLIENT_USER_AGENT] = e.signalingAgentConfig.clientInformation;
      o[n["default"].HEADERS.SKYPE_TOKEN] = s;
      e.contentSharingManager.contentSharingCorrelationId && (o[n["default"].HEADERS.CONTENT_SHARING_CORRELATION_ID] = e.contentSharingManager.contentSharingCorrelationId);
      var u = e.signalingAgentConfig.httpRequestDispatcher.getRequestOptions(t, o, i && i.payload ? JSON.stringify(i.payload) : null);
      return e.telemetryHelper.addNetworkOperationStarted(t), u;
    }, function (e) {
      throw e.skypeTokenError = !0, e;
    });
  }
  var n = e("./constants"), r = e("./utils");
  t.get = i;
}));

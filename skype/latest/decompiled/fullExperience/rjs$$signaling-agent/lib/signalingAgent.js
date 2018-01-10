(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/signalingAgent", [
      "require",
      "exports",
      "./signalingSession",
      "./utilities/constants",
      "./utilities/utils"
    ], e);
}(function (e, t) {
  var n = e("./signalingSession"), r = e("./utilities/constants"), i = e("./utilities/utils"), s = function () {
      function e(e) {
        var t = this;
        this.signalingSessions = {};
        this.getNewSignalingSession = function (e, r) {
          i.assertNotNull(e, "selfParticipant should be a non null value");
          i.assertNotNull(r, "signalingSessionCallback should be a non null value");
          var s = i.newGuid();
          i.assertNotNullOrEmpty(s, "signalingSession id generated cannot be null or empty");
          var o = n.build(e, r, t.signalingAgentConfig, s, t);
          return t.signalingSessions[s] = o, t.logger.log("created new signalingSession with id " + s), o;
        };
        this.handleIncomingNotification = function (e) {
          i.assertNotNull(e, "request should be a non null value");
          t.logger.log("handleIncomingNotification to : " + e.url);
          if (!e.body)
            return t.logger.error("request has no body"), r["default"].HTTP_STATUS_CODES.BAD_REQUEST;
          var n = r["default"].HTTP_STATUS_CODES.OK, s = e.url.match(new RegExp("/" + i.escapeRegExp(r["default"].URL_BASE.CALLAGENT) + "/+([^/]+)", "i"));
          if (s) {
            var o = s[1];
            t.signalingSessions.hasOwnProperty(o) ? setTimeout(function () {
              t.signalingSessions.hasOwnProperty(o) && t.signalingSessions[o].handleIncomingMsgAsync(e)["catch"](function (e) {
                t.logger.error("handling IncomingMsg failed with error: " + e);
              });
            }, 0) : (t.logger.log("Incoming message for call id " + o + ". But call not found !"), n = r["default"].HTTP_STATUS_CODES.NOT_FOUND);
          } else
            t.logger.error("could not retrieve callId from Url path . Path = " + e.url), n = r["default"].HTTP_STATUS_CODES.BAD_REQUEST;
          return n;
        };
        this.onCallCompleted = function (e) {
          t.signalingSessions.hasOwnProperty(e) ? (delete t.signalingSessions[e], t.logger.log("Call id " + e + " found. Deleted from signalingSession table")) : t.logger.error("Call id " + e + " not found. Could not delete from signalingSession table");
        };
        this.signalingAgentConfig = e;
        this.logger = e.logger.createChild("SignalingAgent");
        i.assertNotNull(e, "signalingAgentConfig should be a non null value");
        this.logger.log(e.isWebRtcEnabled ? "webRTC enabled" : "ORTC enabled");
      }
      return e;
    }();
  t.__esModule = !0;
  t["default"] = s;
}));

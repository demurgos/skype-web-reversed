(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/webRtcSignalingManager", [
      "require",
      "exports",
      "./utilities/constants",
      "./telemetry/telemetryConstants",
      "./utilities/urlBuilder",
      "./utilities/utils",
      "./utilities/requestBuilder",
      "./utilities/stopwatch"
    ], e);
}(function (e, t) {
  var n = e("./utilities/constants"), r = e("./telemetry/telemetryConstants"), i = e("./utilities/urlBuilder"), s = e("./utilities/utils"), o = e("./utilities/requestBuilder"), u = e("./utilities/stopwatch"), a = function () {
      function e(e, t) {
        var a = this;
        this.disposed = !1;
        this.lastSeenSeqNumbers = {};
        this.getClientUrls = function () {
          var e = null;
          return a.isWebRtcCall && (e = {
            controlVideoStreaming: i.get(a.signalingSession, n["default"].URL_PATH.CONTROL_VIDEO_STREAMING),
            dominantSpeakerInfo: i.get(a.signalingSession, n["default"].URL_PATH.DOMINANT_SPEAKER_INFO),
            csrcInfo: i.get(a.signalingSession, n["default"].URL_PATH.CSRC_INFO)
          }), e;
        };
        this.handleDominantSpeakerInfo = function (e) {
          a.logger.log("handleDominantSpeakerInfo");
          a.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_DOMINANT_SPEAKER_INFO);
          a.handleWebRtcNotification(n["default"].WEBRTC_NOTIFICATION_TYPE.DOMINANT_SPEAKER_INFO, e.dominantSpeakerInformation);
        };
        this.handleControlVideoStreaming = function (e) {
          a.logger.log("handleControlVideoStreaming");
          a.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_CONTROL_VIDEO_STREAMING);
          a.handleWebRtcNotification(n["default"].WEBRTC_NOTIFICATION_TYPE.CONTROL_VIDEO_STREAMING, e.controlVideoStreaming);
        };
        this.handleCsrcInfo = function (e) {
          a.logger.log("handleCsrcInfo");
          a.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_CSRC_INFO);
          a.handleWebRtcNotification(n["default"].WEBRTC_NOTIFICATION_TYPE.CSRC_INFO, e.csrcInfo);
        };
        this.sendControlVideoStreamingAsync = function (e, t) {
          a.logger.log("sendControlVideoStreamingAsync");
          s.assert(a.isWebRtcCall, "this is not a webrtc call");
          s.assertNotNullOrEmpty(e, "correct controlVideoStreaming requestUrl is not provided");
          s.assertNotNullOrEmpty(t, "controlVideoStreaming requestBody cannot be null or empty");
          var i = s.defer(), f = r["default"].NETWORK_REQUESTS.SEND_CONTROL_VIDEO_STREAMING, l = u.build(), c = { payload: t };
          return o.get(a.signalingSession, f, c).then(function (t) {
            return a.signalingSession.signalingAgentConfig.httpRequestDispatcher.postAsync(e, t);
          }).then(function () {
            a.disposed || (a.signalingSession.telemetryHelper.addNetworkOperationCompleted(f, !0, l.duration()), i.resolve());
          })["catch"](function (e) {
            var t = s.getPrintableObject(e);
            a.logger.error("sendControlVideoStreamingAsync failed because : " + t);
            if (!a.disposed) {
              a.signalingSession.telemetryHelper.addNetworkOperationCompleted(f, !1, l.duration());
              var r = new Error(e);
              r.endCode = n["default"].CALL_END_NETWORK_ERROR;
              i.reject(r);
            }
          }), i.promise;
        };
        this.dispose = function () {
          a.logger.log("WebRtcSignalingManager :: dispose");
          a.disposed = !0;
        };
        this.signalingSession = e;
        this.signalingSessionCallback = t;
        this.isWebRtcCall = e.signalingAgentConfig.isWebRtcEnabled;
        this.logger = e.logger;
        this.lastSeenSeqNumbers[n["default"].WEBRTC_NOTIFICATION_TYPE.CONTROL_VIDEO_STREAMING] = -1;
        this.lastSeenSeqNumbers[n["default"].WEBRTC_NOTIFICATION_TYPE.DOMINANT_SPEAKER_INFO] = -1;
        this.lastSeenSeqNumbers[n["default"].WEBRTC_NOTIFICATION_TYPE.CSRC_INFO] = -1;
      }
      return e.prototype.handleWebRtcNotification = function (e, t) {
        s.assert(this.isWebRtcCall, "ignoring message in non-webrtc call");
        var n = this.lastSeenSeqNumbers[e];
        if (t.sequenceNumber <= n) {
          this.logger.log("ignoring " + e + " . Last seen seq = " + n + " current seq = " + t.sequenceNumber);
          return;
        }
        this.lastSeenSeqNumbers[e] = t.sequenceNumber;
        this.signalingSessionCallback.onWebRtcMediaNotification(e, t);
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = a;
}));

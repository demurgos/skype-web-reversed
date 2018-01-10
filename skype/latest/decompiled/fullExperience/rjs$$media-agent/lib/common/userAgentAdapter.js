(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/common/userAgentAdapter", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  var n = undefined;
  if (typeof window != "undefined" && typeof navigator != "undefined") {
    n = window;
    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    window.MediaStream = window.MediaStream || window.webkitMediaStream || window.mozMediaStream || window.msMediaStream;
    window.attachMediaStream = function (e, t) {
      typeof e.srcObject != "undefined" ? e.srcObject = t : typeof e.src != "undefined" && (e.src = window.URL.createObjectURL(t));
    };
    window.detachMediaStream = function (e) {
      if (typeof e.srcObject != "undefined")
        e.srcObject = null;
      else if (typeof e.src != "undefined" && e.src) {
        var t = e.src;
        e.src = "";
        window.URL.revokeObjectURL(t);
      }
    };
    typeof navigator.mozGetUserMedia != "undefined" && typeof window.mozRTCPeerConnection != "undefined" ? navigator.getUserMedia = function (e, t, n) {
      return navigator.mediaDevices.getUserMedia(e).then(t)["catch"](n);
    } : typeof navigator.webkitGetUserMedia != "undefined" && typeof webkitRTCPeerConnection != "undefined" && (window.RTCPeerConnection = webkitRTCPeerConnection, navigator.getUserMedia = function (e, t, n) {
      var r = function (e) {
        e && e.deviceId && e.deviceId.exact && (e.optional || (e.optional = []), e.optional.push({ sourceId: e.deviceId.exact }), delete e.deviceId);
      };
      return e && (r(e.audio), r(e.video)), navigator.webkitGetUserMedia(e, t, n);
    });
    if (typeof RTCIceGatherer != "undefined") {
      var r = function () {
        return Promise.resolve();
      };
      RTCRtpSender.prototype.getStats || (RTCRtpSender.prototype.getStats = r);
      RTCRtpSender.prototype.msGetStats || (RTCRtpSender.prototype.msGetStats = r);
      RTCRtpReceiver.prototype.getStats || (RTCRtpReceiver.prototype.getStats = r);
      RTCRtpReceiver.prototype.msGetStats || (RTCRtpReceiver.prototype.msGetStats = r);
      RTCIceTransport.prototype.getStats || (RTCIceTransport.prototype.getStats = r);
      RTCIceTransport.prototype.msGetStats || (RTCIceTransport.prototype.msGetStats = r);
      RTCRtpReceiver.prototype.getContributingSources || (RTCRtpReceiver.prototype.getContributingSources = function () {
        return [];
      });
      RTCRtpReceiver.prototype.requestSendCSRC || (RTCRtpReceiver.prototype.requestSendCSRC = function () {
      });
    }
  }
  t.__esModule = !0;
  t["default"] = { window: n };
}));

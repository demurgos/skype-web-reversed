define("jSkype/services/mediaAgent/userAgentAdapter", [], function () {
  window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL, window.MediaStream = window.MediaStream || window.webkitMediaStream || window.mozMediaStream || window.msMediaStream, window.attachMediaStream = function (e, t) {
    typeof e.srcObject != "undefined" ? e.srcObject = t : typeof e.src != "undefined" && (e.src = window.URL.createObjectURL(t));
  }, window.detachMediaStream = function (e) {
    if (typeof e.srcObject != "undefined")
      e.srcObject = null;
    else if (typeof e.src != "undefined" && e.src) {
      var t = e.src;
      e.src = "", window.URL.revokeObjectURL(t);
    }
  }, window.stopMediaStream = function (e) {
    var t = e.getTracks();
    for (var n = 0; n < t.length; ++n) {
      var r = t[n];
      r.stop();
    }
  };
  if (typeof navigator.mozGetUserMedia != "undefined" && typeof mozRTCPeerConnection != "undefined") {
    window.RTCPeerConnection = mozRTCPeerConnection, window.RTCSessionDescription = mozRTCSessionDescription;
    var e = function () {
      var e = window.RTCPeerConnection.prototype.setRemoteDescription;
      window.RTCPeerConnection.prototype.setRemoteDescription = function (t) {
        var n = function (e) {
          var t = r.getLocalStreams() || [];
          return t.find(function (t) {
            var n = ("audio" === e.kind ? t.getAudioTracks() : t.getVideoTracks()) || [];
            return n.some(function (t) {
              return t.id === e.id;
            });
          });
        };
        if ("offer" === t.type) {
          var r = this, i = r.getSenders() || [];
          i.forEach(function (e) {
            var t = e.track, i = n(t);
            i && (r.removeTrack(e), r.addTrack(t, i));
          });
        }
        e.apply(this, arguments);
      };
    };
    e(), navigator.getUserMedia = function (e, t, n) {
      return navigator.mozGetUserMedia(e, t, n);
    };
  } else
    typeof navigator.webkitGetUserMedia != "undefined" && typeof webkitRTCPeerConnection != "undefined" && (window.RTCPeerConnection = webkitRTCPeerConnection, navigator.getUserMedia = function (e, t, n) {
      var r = function (e) {
        e && e.deviceId && e.deviceId.exact && (e.optional || (e.optional = []), e.optional.push({ sourceId: e.deviceId.exact }), delete e.deviceId);
      };
      return e && (r(e.audio), r(e.video)), navigator.webkitGetUserMedia(e, t, n);
    });
  window.RTCPeerConnection && [
    {
      name: "createOffer",
      reverseArgs: !0
    },
    "createAnswer",
    "setRemoteDescription",
    "setLocalDescription"
  ].forEach(function (e) {
    var t = e.name || e, n = window.RTCPeerConnection.prototype[t];
    window.RTCPeerConnection.prototype[t] = function () {
      var t = this, r = arguments;
      return new Promise(function (i, s) {
        var o = [
          i,
          s
        ];
        r.length > 0 && o.splice(e.reverseArgs ? o.length : 0, 0, r[0]), n.apply(t, o);
      });
    };
  });
  if (typeof RTCIceGatherer != "undefined") {
    var t = function () {
      return Promise.resolve();
    };
    RTCRtpSender.prototype.getStats || (RTCRtpSender.prototype.getStats = t), RTCRtpSender.prototype.msGetStats || (RTCRtpSender.prototype.msGetStats = t), RTCRtpReceiver.prototype.getStats || (RTCRtpReceiver.prototype.getStats = t), RTCRtpReceiver.prototype.msGetStats || (RTCRtpReceiver.prototype.msGetStats = t), RTCIceTransport.prototype.getStats || (RTCIceTransport.prototype.getStats = t), RTCIceTransport.prototype.msGetStats || (RTCIceTransport.prototype.msGetStats = t), RTCRtpReceiver.prototype.getContributingSources || (RTCRtpReceiver.prototype.getContributingSources = function () {
      return [];
    }), RTCRtpReceiver.prototype.requestSendCSRC || (RTCRtpReceiver.prototype.requestSendCSRC = function () {
    });
  }
  return { window: window };
})

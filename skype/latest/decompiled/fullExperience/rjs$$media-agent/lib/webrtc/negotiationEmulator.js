(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/webrtc/negotiationEmulator", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  var n = function () {
    function e(e, t, n, r) {
      this.webRtcAdapter = e;
      this.sessionDescription = t;
      this.negotiationQueue = n;
      this.logger = r;
      this.logger.createChild("emul");
    }
    return e.prototype.dispose = function () {
      this.logger = null;
      this.peerConnection = null;
    }, e.prototype.configure = function (e) {
      this.peerConnection = e;
    }, e.prototype.renegotiate = function (e) {
      if (!this.peerConnection)
        throw new Error("trying to renegotiate during empty peerConnection");
      return this.negotiationQueue.add(this.createNegotiationTask(e));
    }, e.prototype.createNegotiationTask = function (e) {
      var t = this, n = function () {
          if (!t.peerConnection)
            throw new Error("trying to renegotiate during empty peerConnection");
        };
      return function () {
        return Promise.resolve().then(function () {
          n();
          var r = new t.webRtcAdapter.RTCSessionDescription({
            sdp: t.peerConnection.remoteDescription.sdp,
            type: "offer"
          });
          return e && (e.forEach(function (e) {
            r = e.modifyDescriptor(r);
          }), t.logger.log("modified description:", r.sdp)), t.peerConnection.setRemoteDescription(r);
        }).then(function () {
          return n(), t.peerConnection.createAnswer();
        }).then(function (e) {
          n();
          var r = t.sessionDescription.createLocalAnswer(e.sdp), i = new t.webRtcAdapter.RTCSessionDescription({
              sdp: r.toLocal(),
              type: "answer"
            });
          return t.peerConnection.setLocalDescription(i), Promise.resolve();
        });
      };
    }, e;
  }();
  t.__esModule = !0;
  t["default"] = n;
}));

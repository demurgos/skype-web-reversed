(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/webrtc/webRtcDtmfSender", [
      "require",
      "exports",
      "../common/dtmfUtils"
    ], e);
}(function (e, t) {
  var n = e("../common/dtmfUtils"), r = function () {
      function e(e, t) {
        this.webRtcSender = null;
        this.queue = new n.DTMFQueue(e);
        this.settings = t ? t : n.defaultSettings;
      }
      return e.prototype.sendDtmf = function (e, t) {
        return !e || !e.getSenders ? Promise.reject(new Error("bad peerConnection")) : (this.syncSender(e), this.webRtcSender ? (this.webRtcSender.ontonechange = this.onToneChange.bind(this), this.webRtcSender.insertDTMF(this.webRtcSender.toneBuffer + t, this.settings.toneDuration, this.settings.toneGap), this.queue.waitForNotification(t)) : Promise.reject(new Error("not available")));
      }, e.prototype.canSendDtmf = function (e) {
        return !e || !e.getSenders ? !1 : (this.syncSender(e), this.webRtcSender ? this.webRtcSender.canInsertDTMF : !1);
      }, e.prototype.dispose = function () {
        this.queue.cleanup();
      }, e.prototype.syncSender = function (e) {
        var t = e.getSenders().filter(function (e) {
          return e.dtmf && e.dtmf.canInsertDTMF;
        })[0];
        this.webRtcSender && t && t.dtmf != this.webRtcSender && (this.webRtcSender.ontonechange = null, this.queue.cleanup());
        this.webRtcSender = t ? t.dtmf : null;
      }, e.prototype.onToneChange = function (e) {
        e.tone && this.queue.toneSent(e.tone);
      }, e;
    }();
  t.WebRtcDTMFSender = r;
  t.__esModule = !0;
  t["default"] = {
    build: function (e, t) {
      return new r(e, t);
    }
  };
}));

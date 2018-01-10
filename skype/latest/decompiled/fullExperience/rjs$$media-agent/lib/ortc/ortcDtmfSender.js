(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/ortc/ortcDtmfSender", [
      "require",
      "exports",
      "../common/dtmfUtils"
    ], e);
}(function (e, t) {
  var n = e("../common/dtmfUtils"), r = function () {
      function e(e, t) {
        this.queue = new n.DTMFQueue(e);
        this.settings = t ? t : n.defaultSettings;
      }
      return e.prototype.sendDtmf = function (e, t) {
        return e ? (this.syncSender(e), this.ortcSender.canInsertDTMF ? (this.ortcSender.insertDTMF(this.ortcSender.toneBuffer + t, this.settings.toneDuration, this.settings.toneGap), this.queue.waitForNotification(t)) : Promise.reject(new Error("not available"))) : Promise.reject(new Error("bad sender"));
      }, e.prototype.canSendDtmf = function (e) {
        return e ? (this.syncSender(e), this.ortcSender ? this.ortcSender.canInsertDTMF : !1) : !1;
      }, e.prototype.dispose = function () {
        this.queue.cleanup();
      }, e.prototype.syncSender = function (e) {
        if (!this.ortcSender || this.ortcSender.sender !== e)
          this.ortcSender && (this.ortcSender.ontonechange = null, this.queue.cleanup(), this.ortcSender = null), this.ortcSender = new RTCDtmfSender(e), this.ortcSender.ontonechange = this.onToneChange.bind(this);
      }, e.prototype.onToneChange = function (e) {
        e.tone && this.queue.toneSent(e.tone);
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = r;
}));

(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-web-calling/lib/callHandlerProxy", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  var n = function () {
    function e(e) {
      var t = this;
      this.callHandlerInstance = null;
      this.isPluginless = function () {
        return t.callHandlerInstance.isPluginless();
      };
      this.transferFrom = function (e) {
        e.callHandlerInstance.updateConversation(t.callHandlerInstance.conversation);
        t.callHandlerInstance = e.callHandlerInstance;
      };
      this.acceptCall = function (e) {
        return t.callHandlerInstance.acceptCall(e);
      };
      this.placeCall = function (e) {
        return t.callHandlerInstance.placeCall(e);
      };
      this.acknowledge = function () {
        return t.callHandlerInstance.acknowledge();
      };
      this.rejectCall = function () {
        return t.callHandlerInstance.rejectCall();
      };
      this.cancelCall = function () {
        return t.callHandlerInstance.cancelCall();
      };
      this.extendCall = function (e, n) {
        return t.callHandlerInstance.extendCall(e, n);
      };
      this.endCall = function (e) {
        return t.callHandlerInstance.endCall(e);
      };
      this.mute = function () {
        return t.callHandlerInstance.mute();
      };
      this.unmute = function () {
        return t.callHandlerInstance.unmute();
      };
      this.sendDtmf = function (e) {
        return t.callHandlerInstance.sendDtmf(e);
      };
      this.setSoundLevelEventMode = function (e) {
        return t.callHandlerInstance.setSoundLevelEventMode(e);
      };
      this.startScreenSharing = function (e) {
        return t.callHandlerInstance.startScreenSharing(e);
      };
      this.stopScreenSharing = function (e) {
        return t.callHandlerInstance.stopScreenSharing(e);
      };
      this.attachParticipantVideo = function (e, n, r) {
        return t.callHandlerInstance.attachParticipantVideo(e, n, r);
      };
      this.detachParticipantVideo = function (e, n) {
        return t.callHandlerInstance.detachParticipantVideo(e, n);
      };
      this.requestCallInfo = function () {
        return t.callHandlerInstance.requestCallInfo();
      };
      this.dispose = function () {
        t.callHandlerInstance.dispose();
      };
      this.callHandlerInstance = e;
    }
    return e;
  }();
  t.__esModule = !0;
  t["default"] = n;
}));

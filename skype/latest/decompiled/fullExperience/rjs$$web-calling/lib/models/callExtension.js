(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("web-calling/lib/models/callExtension", [
      "require",
      "exports",
      "media-agent"
    ], e);
}(function (e, t) {
  var n = e("media-agent"), r = function () {
      function e(e) {
        this.callSession = e;
        this.callSession.addSignalingSessionListener(this);
      }
      return e.prototype.configure = function (e) {
        var t = this;
        if (!e)
          throw new Error("Call extension cannot be configured: " + e);
        this.extensionsManager = e.getExtensionsManager();
        this.extensionsManager.configureExtension(n.Constants.EXTENSION_TYPE.videoStreamControl, {
          sender: {
            send: function (e) {
              return t.callSession.signaling() ? t.callSession.signaling().sendWebRtcMediaNotificationAsync(e) : Promise.reject(new Error("no signaling session"));
            }
          }
        });
      }, e.prototype.dispose = function () {
        this.callSession = null;
        this.extensionsManager = null;
      }, e.prototype.onWebRtcMediaNotification = function (e, t) {
        if (!this.extensionsManager)
          return;
        this.extensionsManager.processNotification(e, t);
      }, e.prototype.onOffer = function (e) {
      }, e.prototype.onAnswer = function (e) {
      }, e.prototype.onCallStatusChanged = function (e, t) {
      }, e.prototype.onParticipantJoined = function (e) {
      }, e.prototype.onParticipantRemoved = function (e) {
      }, e.prototype.onParticipantUpdated = function (e) {
      }, e.prototype.onMediaAcknowledgementSuccess = function (e) {
      }, e.prototype.onMediaAcknowledgementFailure = function (e, t) {
      }, e.prototype.onMediaRenegotiationRejection = function (e) {
      }, e.prototype.onConversationUpdated = function (e) {
      }, e.prototype.onReTargetCompletedSuccess = function () {
      }, e.prototype.onReTargetCompletedFailure = function (e) {
      }, e.prototype.onContentSharingStarted = function (e) {
      }, e.prototype.onContentSharingUpdated = function (e) {
      }, e.prototype.onContentSharingStopped = function (e) {
      }, e.prototype.onChatModalitySetupFailed = function (e) {
      }, e.prototype.onUnmuteRequested = function (e) {
      }, e.prototype.onCallForwarded = function (e) {
      }, e.prototype.onPSTNBalanceUpdate = function (e) {
      }, e.prototype.getRemoteParticipantCollection = function () {
        return null;
      }, e.prototype.onTransferRequested = function (e) {
        return null;
      }, e.prototype.onIncomingCallReplacement = function (e) {
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = r;
}));

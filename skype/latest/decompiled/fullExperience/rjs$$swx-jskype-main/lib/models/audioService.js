(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/audioService", [
      "require",
      "exports",
      "jcafe-property-model",
      "jskype-settings-instance",
      "swx-enums",
      "./callingServiceBase"
    ], e);
}(function (e, t) {
  function a(e, t) {
    return new u(e);
  }
  var n = e("jcafe-property-model"), r = e("jskype-settings-instance"), i = e("swx-enums"), s = e("./callingServiceBase"), o = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "*",
      "#"
    ], u = function (e) {
      function t(t) {
        var r = e.call(this, t, !1) || this;
        return r.callConnected = n.property({
          readOnly: !0,
          value: null
        }), r.disconnectionReason = n.property({ readOnly: !0 }), r.sendDtmf = n.command(r.sendDtmfCommandImpl.bind(r), r.callConnected), r.callId = n.property({ readOnly: !0 }), r._dispose = function () {
          r.callConnectedSubscription.dispose();
          r.callConnectingSubscription.dispose();
        }, r.callConnectingSubscription = r.conversation.selfParticipant.audio.state.when(i.callConnectionState.Connecting, r.onCallConnecting.bind(r)), r.callConnectedSubscription = r.conversation.selfParticipant.audio.state.when(i.callConnectionState.Connected, r.onCallConnected.bind(r)), r;
      }
      return __extends(t, e), t.prototype.onCallConnecting = function (e) {
        e !== i.callDisconnectionReason.CallEscalated && this.callConnected._set(null);
      }, t.prototype.onCallConnected = function (e) {
        e !== i.callDisconnectionReason.CallEscalated && this.callConnected._set(new Date());
      }, t.prototype.sendDtmfCommandImpl = function (e) {
        var t = this;
        return new Promise(function (n, r) {
          o.indexOf(e) !== -1 ? t.conversation._callHandler.sendDtmf(e).then(function () {
            n(e);
          }, function () {
            r(e);
          }) : r(e);
        });
      }, t.prototype._hasTooManyParticipants = function () {
        return this.conversation.participantsCount() >= r.settings.maximumParticipantsAudio;
      }, t.prototype._activeConversationModality = function () {
        return this.conversation.activeModalities.audio();
      }, t;
    }(s["default"]);
  t.AudioService = u;
  t.build = a;
}));

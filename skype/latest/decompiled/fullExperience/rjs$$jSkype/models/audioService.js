define("jSkype/models/audioService", [
  "require",
  "exports",
  "module",
  "jcafe-property-model",
  "jSkype/settings",
  "swx-enums",
  "jSkype/models/callingServiceBase"
], function (e, t) {
  function o(e) {
    function l() {
      t.callConnected._set(null);
    }
    function c(e) {
      e !== i.callDisconnectionReason.CallEscalated && t.callConnected._set(new Date());
    }
    function h(t) {
      return new Promise(function (n, r) {
        u.indexOf(t) !== -1 ? e._callHandler.sendDtmf(t).then(function () {
          n(t);
        }, function () {
          r(t);
        }) : r(t);
      });
    }
    var t = this, o = new s(e, !1), u = [
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
      ];
    t.callConnected = n.property({
      readOnly: !0,
      value: null
    }), t.disconnectionReason = n.property({ readOnly: !0 }), t.sendDtmf = n.command(h, t.callConnected), t.callId = n.property({ readOnly: !0 }), t.start = o.start, t.stop = o.stop, t.accept = o.accept, t.reject = o.reject, t._canHandlePluginlessCall = o._canHandlePluginlessCall, t._isCallWithP2PEndpoint = o._isCallWithP2PEndpoint, t._setMediaConnectionType = o._setMediaConnectionType, t._hasPSTNParticipants = o._hasPSTNParticipants, t._setPSTNParticipants = o._setPSTNParticipants, t._membershipChanged = o._membershipChanged, t._checkPluginBasedCapabilitiesSupport = o._checkPluginBasedCapabilitiesSupport;
    var a = e.selfParticipant.audio.state.when(i.callConnectionState.Connecting, l), f = e.selfParticipant.audio.state.when(i.callConnectionState.Connected, c);
    return t._dispose = function () {
      f.dispose(), a.dispose();
    }, o._hasTooManyParticipants = function () {
      return e.participantsCount() >= r.settings.maximumParticipantsAudio;
    }, o._activeConversationModality = function () {
      return e.activeModalities.audio();
    }, t;
  }
  var n = e("jcafe-property-model"), r = e("jSkype/settings"), i = e("swx-enums"), s = e("jSkype/models/callingServiceBase");
  t.build = function (e, t) {
    return new o(e, t);
  };
})

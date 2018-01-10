(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/participantAudio", [
      "require",
      "exports",
      "jcafe-property-model",
      "../../lib/modelHelpers/propertyModelHelper",
      "../../lib/modelHelpers/personsAndGroupsHelper",
      "swx-enums"
    ], e);
}(function (e, t) {
  function u(e, t) {
    return new o(e, t.id());
  }
  var n = e("jcafe-property-model"), r = e("../../lib/modelHelpers/propertyModelHelper"), i = e("../../lib/modelHelpers/personsAndGroupsHelper"), s = e("swx-enums"), o = function () {
      function e(e, t) {
        var o = this;
        this.isMuted = r.createPropertyWithSetter(!1, this.isMutedSetter.bind(this), !0);
        this.isMuteEnabledProperty = this.isMuted.set._enabled;
        this.state = n.property({
          readOnly: !0,
          value: s.callConnectionState.Disconnected
        });
        this.isSpeaking = n.property({
          readOnly: !0,
          value: !1
        });
        this.importance = n.property({
          readOnly: !0,
          value: 0
        });
        this.isOnHold = n.property({ value: !1 });
        this._isFailedCall = n.property({ value: !1 });
        this._sourceId = n.property();
        this.handleConnectionStateChanged = function (e, t, n) {
          if (n === undefined || t === s.callDisconnectionReason.CallEscalated)
            return;
          e === s.callConnectionState.Connecting && (o.isMuteEnabledProperty(!0), o.isMuted._set(!1));
          e === s.callConnectionState.Disconnected && (o.isMuteEnabledProperty(!1), o.isMuted._set(!1));
        };
        this._dispose = function () {
          o.isSelfParticipant && o.state.changed.off(o.handleConnectionStateChanged);
        };
        this.conversation = e;
        this.participantId = t;
        this.endpoint = n.property({ value: t });
        this.isSelfParticipant = i.isMePerson(t);
        this.isSelfParticipant && this.state.changed(this.handleConnectionStateChanged);
      }
      return e.prototype.isMutedSetter = function (e) {
        var t = this, n;
        return this.isMuteEnabledProperty(!1), this.isSelfParticipant && (e ? n = this.conversation._callHandler.mute() : n = this.conversation._callHandler.unmute()), n.then(function (e) {
          t.isMuted._set(e);
          t.isMuteEnabledProperty(!0);
        }), n;
      }, e;
    }();
  t.ParticipantAudio = o;
  t.build = u;
}));

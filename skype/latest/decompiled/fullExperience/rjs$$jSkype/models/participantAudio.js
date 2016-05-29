define("jSkype/models/participantAudio", [
  "require",
  "exports",
  "module",
  "jcafe-property-model",
  "jSkype/modelHelpers/propertyModelHelper",
  "jSkype/modelHelpers/personsAndGroupsHelper",
  "swx-enums"
], function (e, t) {
  function o(e, t) {
    function l(t) {
      var n;
      return a(!1), f && (t ? n = e._callHandler.mute() : n = e._callHandler.unmute()), n.then(function (e) {
        u._set(e);
        a(!0);
      }), n;
    }
    function c(e, t, n) {
      if (n === undefined || t === s.callDisconnectionReason.CallEscalated)
        return;
      e === s.callConnectionState.Connecting && (a(!0), u._set(!1));
      e === s.callConnectionState.Disconnected && (a(!1), u._set(!1));
    }
    var o = n.property({
        readOnly: !0,
        value: s.callConnectionState.Disconnected
      }), u = r.createPropertyWithSetter(!1, l, !0), a = u.set._enabled, f = i.isMePerson(t);
    return f && o.changed(c), this.state = o, this.isSpeaking = n.property({
      readOnly: !0,
      value: !1
    }), this.isOnHold = n.property({ value: !1 }), this.isMuted = u, this.endpoint = n.property({ value: t }), this._isFailedCall = n.property({ value: !1 }), this._sourceId = n.property(), this._dispose = function () {
      f && o.changed.off(c);
    }, this;
  }
  var n = e("jcafe-property-model"), r = e("jSkype/modelHelpers/propertyModelHelper"), i = e("jSkype/modelHelpers/personsAndGroupsHelper"), s = e("swx-enums");
  t.build = function (e, t) {
    return new o(e, t.id());
  };
});

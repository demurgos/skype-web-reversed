define("jSkype/models/videoChannel", [
  "require",
  "jcafe-property-model",
  "jSkype/modelHelpers/personsAndGroupsHelper",
  "jSkype/modelHelpers/propertyModelHelper",
  "jSkype/models/mediaStream",
  "swx-enums",
  "constants/calling"
], function (e) {
  function u(e, u, a) {
    function g() {
      var t = !1;
      !d && !e.isGroupConversation() && (t = !0);
      h = r.createPropertyWithSetter(t, x, !0);
      c = t;
      p = h.set._enabled;
    }
    function y() {
      return e._callHandler && f.state() !== s.mediaStreamState.Stopped && f.source.sink.container() && c;
    }
    function b() {
      return e._callHandler && u() !== s.callConnectionState.Disconnected && (f.state() === s.mediaStreamState.Stopped || !f.source.sink.container());
    }
    function w() {
      y() && e._callHandler.attachParticipantVideo(a, f.source.sink.container(), o.PLUGIN_MEDIA_TYPES.VIDEO);
    }
    function E() {
      b() && e._callHandler.detachParticipantVideo(a, o.PLUGIN_MEDIA_TYPES.VIDEO);
    }
    function S() {
      v.push(f.source.sink.container.changed(function () {
        y() ? w() : b() && E();
      }));
      v.push(f.state.when(s.mediaStreamState.Started, w));
      v.push(f.state.when(s.mediaStreamState.Stopped, E));
      m = u.when(s.callConnectionState.Disconnected, T);
    }
    function x(t) {
      return d && e.selfParticipant.audio.state() === s.callConnectionState.Connected && p(!1), e._callHandler ? (c = t, t ? (d && f.state._set(s.mediaStreamState.Started), e._callHandler.startParticipantVideo(a, o.PLUGIN_MEDIA_TYPES.VIDEO)) : e._callHandler.stopParticipantVideo(a, o.PLUGIN_MEDIA_TYPES.VIDEO), t) : t;
    }
    function T(e, t) {
      if (t === undefined)
        return;
      f.state._set(s.mediaStreamState.Stopped);
      p(!0);
      h._set(!1);
    }
    var f = new i(), l = t.property({ value: !1 }), c, h, p, d = n.isMePerson(a), v = [], m;
    return g(), this._dispose = function () {
      f.state._set(s.mediaStreamState.Stopped);
      v.forEach(function (e) {
        e.dispose();
      });
      v.length = 0;
      m.dispose();
    }, this.camera = null, this.stream = f, this.isOnHold = l, this.isStarted = h, this._toggleIsStarted = x, this._init = S, this;
  }
  var t = e("jcafe-property-model"), n = e("jSkype/modelHelpers/personsAndGroupsHelper"), r = e("jSkype/modelHelpers/propertyModelHelper"), i = e("jSkype/models/mediaStream"), s = e("swx-enums"), o = e("constants/calling");
  return u;
});

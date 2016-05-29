define("jSkype/models/participantScreenSharing", [
  "require",
  "exports",
  "module",
  "swx-enums",
  "constants/calling",
  "jcafe-property-model",
  "jSkype/models/mediaStream",
  "jSkype/modelHelpers/personsAndGroupsHelper"
], function (e, t) {
  function u(e, t) {
    function c() {
      return e._callHandler && f.state() !== n.mediaStreamState.Stopped && f.source.sink.container();
    }
    function h() {
      return e._callHandler && u.state() !== n.callConnectionState.Disconnected && (f.state() === n.mediaStreamState.Stopped || !f.source.sink.container());
    }
    function p() {
      return e._callHandler && f.state() === n.mediaStreamState.Stopped;
    }
    function d() {
      return e._callHandler && f.state() !== n.mediaStreamState.Stopped;
    }
    function v() {
      c() && e._callHandler.attachParticipantVideo(t, f.source.sink.container(), r.PLUGIN_MEDIA_TYPES.SCREEN_SHARING);
    }
    function m() {
      h() && e._callHandler.detachParticipantVideo(t, r.PLUGIN_MEDIA_TYPES.SCREEN_SHARING);
    }
    function g() {
      p() && e._callHandler.startParticipantVideo(t, r.PLUGIN_MEDIA_TYPES.SCREEN_SHARING);
    }
    function y() {
      d() && e._callHandler.stopParticipantVideo(t, r.PLUGIN_MEDIA_TYPES.SCREEN_SHARING);
    }
    function b() {
      u.state._set(n.callConnectionState.Notified);
    }
    function w() {
      u.state._set(n.callConnectionState.Connected);
    }
    function E() {
      u.state() !== n.callConnectionState.Disconnecting && u.state() !== n.callConnectionState.Disconnected && u.state._set(n.callConnectionState.Disconnecting);
      u.state._set(n.callConnectionState.Disconnected);
    }
    function S() {
      a ? g() : v();
    }
    function x() {
      a ? y() : m();
    }
    var u = this, a = o.isMePerson(t), f = new s(), l = [];
    return u.state = i.property({
      readOnly: !0,
      value: n.callConnectionState.Disconnected
    }), u.stream = f, u.isControlling = i.property({ value: !1 }), l.push(f.source.sink.container.changed(function () {
      c() ? v() : h() && m();
    })), l.push(f.state.when(n.mediaStreamState.Started, b)), l.push(f.state.when(n.mediaStreamState.Active, w)), l.push(f.state.when(n.mediaStreamState.Stopped, E)), l.push(u.state.when(n.callConnectionState.Connecting, S)), l.push(u.state.when(n.callConnectionState.Disconnecting, x)), u._dispose = function () {
      E();
      l.forEach(function (e) {
        e.dispose();
      });
      l.length = 0;
    }, u;
  }
  var n = e("swx-enums"), r = e("constants/calling"), i = e("jcafe-property-model"), s = e("jSkype/models/mediaStream"), o = e("jSkype/modelHelpers/personsAndGroupsHelper");
  t.build = function (e, t) {
    return new u(e, t.id());
  };
});

define("ui/viewModels/chat/conversationActivity", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "swx-enums",
  "browser/window",
  "constants/common",
  "constants/calling",
  "services/serviceLocator"
], function (e, t) {
  function a(e) {
    function h(e) {
      t.isOnCall(e === r.callConnectionState.Connected);
    }
    function p() {
      var n = !!e.activeModalities.audio(), i = e.selfParticipant.audio.state() === r.callConnectionState.Disconnected || e.selfParticipant.audio.state() === r.callConnectionState.Notified, a = e.isGroupConversation(), f = u.resolve(s.serviceLocator.FEATURE_FLAGS), l = f.isFeatureOn(o.FEATURE_FLAGS.CALLING);
      t.canJoinCall(a && n && i && l);
    }
    function d(e) {
      h(e), p(e);
      switch (e) {
      case r.callConnectionState.Connected:
        g();
        break;
      case r.callConnectionState.Disconnected:
        y();
      }
    }
    function v(e, n) {
      var i = !e, s = n !== r.callingNotSupportedReasons.PluginNotInstalled;
      t.isCallingDisabled(i && s);
    }
    function m(e, n) {
      var i = !e, s = n !== r.callingNotSupportedReasons.PluginNotInstalled;
      t.isVideoCallingDisabled(i && s);
    }
    function g() {
      t.callDuration(c), f = e.audioService.callConnected(), a = i.setInterval(b, l);
    }
    function y() {
      a && i.clearInterval(a), t.callDuration(c);
    }
    function b() {
      var e = new Date(), n = e - f;
      t.callDuration(n);
    }
    function w() {
      return t.isCallingDisabled() || !t.canJoinCall();
    }
    var t = this, a, f, l = 1000, c = -1;
    t.callDuration = n.observable(c), t.isOnCall = n.observable(!1), t.isCallingDisabled = n.observable(!0), t.isVideoCallingDisabled = n.observable(!0), t.canJoinCall = n.observable(!1), t.isJoinCallDisabled = n.computed(w), e.selfParticipant.audio.state.changed(d), e.activeModalities.audio.changed(p), e.audioService.start.enabled.changed(v), e.videoService.start.enabled.changed(m), t.dispose = function () {
      t.isJoinCallDisabled.dispose(), e.selfParticipant.audio.state.changed.off(d), e.activeModalities.audio.changed.off(p), e.audioService.start.enabled.changed.off(v), e.videoService.start.enabled.changed.off(m), a && i.clearInterval(a);
    };
  }
  var n = e("vendor/knockout"), r = e("swx-enums"), i = e("browser/window"), s = e("constants/common"), o = e("constants/calling"), u = e("services/serviceLocator");
  t.classFunction = a, t.build = function (e) {
    return new a(e);
  };
})

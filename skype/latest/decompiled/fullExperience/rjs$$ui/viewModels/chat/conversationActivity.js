define("ui/viewModels/chat/conversationActivity", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "swx-enums",
  "browser/window",
  "ui/modelObservers/calling/activeCallObserver"
], function (e, t) {
  function o(e) {
    function c(e) {
      t.isOnCall(e === r.callConnectionState.Connected);
    }
    function h() {
      var n = !!e.activeModalities.audio(), i = e.selfParticipant.audio.state() === r.callConnectionState.Disconnected || e.selfParticipant.audio.state() === r.callConnectionState.Notified, s = e.isGroupConversation();
      l.isCallActive() ? t.canJoinCall(!1) : t.canJoinCall(s && n && i);
    }
    function p(e) {
      c(e);
      h(e);
      switch (e) {
      case r.callConnectionState.Connected:
        m();
        break;
      case r.callConnectionState.Disconnected:
        g();
      }
    }
    function d(e, n) {
      var i = !e, s = n !== r.callingNotSupportedReasons.PluginNotInstalled;
      t.isCallingDisabled(i && s);
    }
    function v(e, n) {
      var i = !e, s = n !== r.callingNotSupportedReasons.PluginNotInstalled;
      t.isVideoCallingDisabled(i && s);
    }
    function m() {
      o || (t.callDuration(f), u = e.audioService.callConnected(), o = i.setInterval(y, a));
    }
    function g() {
      o && (i.clearInterval(o), o = null, t.callDuration(f));
    }
    function y() {
      var e = new Date(), n = e - u;
      t.callDuration(n);
    }
    function b() {
      return t.isCallingDisabled() || !t.canJoinCall();
    }
    function w() {
      return t.isVideoCallingDisabled() || !t.canJoinCall();
    }
    var t = this, o, u, a = 1000, f = -1, l = s.build();
    t.callDuration = n.observable(f);
    t.isOnCall = n.observable(!1);
    t.isCallingDisabled = n.observable(!0);
    t.isVideoCallingDisabled = n.observable(!0);
    t.canJoinCall = n.observable(!1);
    t.isJoinCallDisabled = n.computed(b);
    t.isJoinCallWithVideoDisabled = n.computed(w);
    e.selfParticipant.audio.state.changed(p);
    e.activeModalities.audio.changed(h);
    e.audioService.start.enabled.changed(d);
    e.videoService.start.enabled.changed(v);
    t.dispose = function () {
      l.dispose();
      t.isJoinCallDisabled.dispose();
      t.isJoinCallWithVideoDisabled.dispose();
      e.selfParticipant.audio.state.changed.off(p);
      e.activeModalities.audio.changed.off(h);
      e.audioService.start.enabled.changed.off(d);
      e.videoService.start.enabled.changed.off(v);
      o && (i.clearInterval(o), o = null);
    };
  }
  var n = e("vendor/knockout"), r = e("swx-enums"), i = e("browser/window"), s = e("ui/modelObservers/calling/activeCallObserver");
  t.classFunction = o;
  t.build = function (e) {
    return new o(e);
  };
});

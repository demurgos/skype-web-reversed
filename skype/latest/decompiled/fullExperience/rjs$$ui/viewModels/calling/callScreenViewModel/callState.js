define("ui/viewModels/calling/callScreenViewModel/callState", [
  "require",
  "swx-constants",
  "swx-enums",
  "vendor/knockout"
], function (e) {
  function s(e) {
    function c() {
      s.state() === t.ENDING ? o = window.setTimeout(h, i) : window.clearTimeout(o);
    }
    function h() {
      s.state(t.ENDED);
    }
    function p() {
      s.state() !== t.ENDING && s.state(t.CONNECTING);
    }
    function d(r, i) {
      if (!i || i === n.callConnectionState.Disconnected)
        return;
      e.selfParticipant.audio.state.reason !== n.callDisconnectionReason.CallEscalated ? (s.totalCallDuration = s.getCurrentDuration(), s.state(t.ENDING)) : s.state(t.ENDED);
    }
    function v() {
      s.state() !== t.EARLY_MEDIA && s.state() !== t.ENDING && s.state(t.CALLING);
    }
    function m() {
      s.state() !== t.ENDING && (v(), s.state(t.EARLY_MEDIA));
    }
    function g() {
      s.state() !== t.ENDING && (l = e.audioService.callConnected(), s.state(t.CONNECTED), y());
    }
    function y() {
      x(f);
      x(a);
    }
    function b(e) {
      function t(t, n) {
        var r = e.audio.state.when(t, n);
        r.participant = e;
        f.push(r);
      }
      t(n.callConnectionState.Ringing, v);
      t(n.callConnectionState.EarlyMedia, m);
      t(n.callConnectionState.Disconnected, E);
    }
    function w(e) {
      for (var t = f.length; t--;) {
        var n = f[t];
        n.participant === e && (f.splice(t, 1), n.dispose());
      }
      E();
    }
    function E() {
      var r = e.participants().some(function (e) {
        return e.audio.state() === n.callConnectionState.EarlyMedia;
      });
      s.state() === t.EARLY_MEDIA && !r && s.state(t.CALLING);
    }
    function S() {
      u.push(s.state.subscribe(c), e.selfParticipant.audio.state.when(n.callConnectionState.Connecting, p), e.selfParticipant.audio.state.when(n.callConnectionState.Connected, g), e.selfParticipant.audio.state.when(n.callConnectionState.Disconnecting, d), e.selfParticipant.audio.state.when(n.callConnectionState.Disconnected, d));
      e.selfParticipant.audio.state() !== n.callConnectionState.Connected && a.push(e.participants.added(b));
      a.push(e.participants.removed(w));
    }
    function x(e) {
      e.forEach(function (e) {
        e.dispose();
      });
      e.length = 0;
    }
    var s = this, o, u = [], a = [], f = [], l = null;
    this.state = r.observable(t.CONNECTING);
    this.totalCallDuration = null;
    this.dispose = function () {
      x(u);
      y();
      window.clearTimeout(o);
    };
    this.getCurrentDuration = function () {
      return l !== null ? Date.now() - l : null;
    };
    S();
  }
  var t = e("swx-constants").CALLING.CALL_STATES, n = e("swx-enums"), r = e("vendor/knockout"), i = 3500;
  return {
    build: function (e) {
      return new s(e);
    }
  };
});

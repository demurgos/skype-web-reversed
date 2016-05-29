define("ui/viewModels/calling/callScreenViewModel/callState", [
  "require",
  "vendor/knockout",
  "swx-enums",
  "constants/calling"
], function (e) {
  function s(e) {
    function c() {
      s.state() === r.ENDING ? o = window.setTimeout(h, i) : window.clearTimeout(o);
    }
    function h() {
      s.state(r.ENDED);
    }
    function p() {
      s.state(r.CONNECTING);
    }
    function d(t, i) {
      if (!i || i === n.callConnectionState.Disconnected)
        return;
      e.selfParticipant.audio.state.reason !== n.callDisconnectionReason.CallEscalated ? (s.totalCallDuration = s.getCurrentDuration(), s.state(r.ENDING)) : s.state(r.ENDED);
    }
    function v() {
      s.state() !== r.EARLY_MEDIA && s.state(r.CALLING);
    }
    function m() {
      v();
      s.state(r.EARLY_MEDIA);
    }
    function g() {
      l = e.audioService.callConnected();
      s.state(r.CONNECTED);
      y();
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
      var t = e.participants().some(function (e) {
        return e.audio.state() === n.callConnectionState.EarlyMedia;
      });
      s.state() === r.EARLY_MEDIA && !t && s.state(r.CALLING);
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
    this.state = t.observable(r.CONNECTING);
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
  var t = e("vendor/knockout"), n = e("swx-enums"), r = e("constants/calling").CALL_STATES, i = 3500;
  return {
    build: function (e) {
      return new s(e);
    }
  };
});

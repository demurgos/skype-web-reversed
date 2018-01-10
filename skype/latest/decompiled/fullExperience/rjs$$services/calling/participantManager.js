define("services/calling/participantManager", [
  "require",
  "swx-enums",
  "swx-constants"
], function (e) {
  function r(e) {
    function l() {
      return e.selfParticipant.audio.state() === t.callConnectionState.Connected;
    }
    function c(e) {
      return e === t.callConnectionState.Connecting || e === t.callConnectionState.Ringing || e === t.callConnectionState.Connected;
    }
    function h(e, n) {
      return n === t.callConnectionState.Disconnecting && e === t.callConnectionState.Disconnected;
    }
    function p(e) {
      if (!a[e.person.id()]) {
        var t = window.setTimeout(m.bind(r, e), n.PARTICIPANT_REMOVE_FROM_CALLSCREEN_TIMEOUT);
        a[e.person.id()] = t;
      }
    }
    function d(e) {
      var t = e.person.id();
      a[t] && (window.clearTimeout(a[t]), delete a[t]);
      if (s[t])
        return;
      s[t] = !0;
      o(e);
    }
    function v(e) {
      function t(t, n, r) {
        if (r === t)
          return;
        l() && (d(e), p(e));
        c(t) && d(e);
        h(t, r) && p(e);
      }
      e.person.id.get().then(function () {
        f[e.person.id()] = function () {
          e.audio.state.changed.off(t);
        };
        e.audio.state.changed(t);
      });
    }
    function m(e) {
      var t = e.person.id();
      delete a[t];
      delete s[t];
      u(e);
    }
    function g(e) {
      var t = e.person.id();
      f[t] && (f[t](), delete f[t]);
      a[t] && (window.clearTimeout(a[t]), delete a[t]);
      delete s[t];
      u(e);
    }
    var r = this, i = function () {
      }, s = {}, o = i, u = i, a = {}, f = {};
    return r.onParticipantAddedToCall = function (e) {
      o = e;
    }, r.onParticipantRemovedFromCall = function (e) {
      u = e;
    }, r.dispose = function () {
      Object.keys(f).forEach(function (e) {
        f[e]();
      });
      f = {};
      Object.keys(a).forEach(function (e) {
        window.clearTimeout(a[e]);
      });
      a = {};
      e.participants.added.off(v);
      e.participants.removed.off(g);
      o = i;
      u = i;
    }, r.init = function () {
      e.participants.added(v);
      e.participants.removed(g);
    }, r;
  }
  var t = e("swx-enums"), n = e("swx-constants").CALLING;
  return {
    build: function (e) {
      return new r(e);
    }
  };
});

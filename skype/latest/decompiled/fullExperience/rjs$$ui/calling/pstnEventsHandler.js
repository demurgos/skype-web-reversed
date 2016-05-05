define("ui/calling/pstnEventsHandler", [
  "require",
  "exports",
  "module",
  "swx-enums",
  "lodash-compat"
], function (e, t) {
  function i(e) {
    function o(e) {
      e === n.callConnectionState.Disconnected ? (s && s.dispose(), t.participants().forEach(f)) : e === n.callConnectionState.Connecting && (s = t.participants.observe(u), t.participants().forEach(a));
    }
    function u(e, t) {
      r.forIn(e, function (e) {
        a(e);
      }), r.forIn(t, function (e) {
        f(e);
      });
    }
    function a(n) {
      function s(r) {
        var i = n.audio.state.reason;
        e.process(t, n, i, r);
      }
      if (!l(n.audio.endpoint()))
        return;
      var r = n.person.id();
      if (r in i)
        return;
      i[r] = s, n.audio.state.changed(s);
    }
    function f(e) {
      var t, n;
      n = e.person.id(), n in i && (t = i[n], e.audio.state.changed.off(t), delete i[n]);
    }
    function l(e) {
      return /^(\+)?\d+$/.test(e);
    }
    var t, i = {}, s;
    this.subscribeToConversation = function (e) {
      t = e, t.selfParticipant.audio.state.changed(o);
    }, this.dispose = function () {
      s && s.dispose(), t.participants().forEach(f), i = null, t.selfParticipant.audio.state.changed.off(o);
    };
  }
  var n = e("swx-enums"), r = e("lodash-compat");
  t.build = function (e) {
    return new i(e);
  };
})

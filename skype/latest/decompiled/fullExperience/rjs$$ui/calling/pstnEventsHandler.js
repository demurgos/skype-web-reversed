define("ui/calling/pstnEventsHandler", [
  "require",
  "exports",
  "module",
  "swx-enums",
  "lodash-compat",
  "ui/modelHelpers/personHelper"
], function (e, t) {
  function s(e) {
    function u(e) {
      e === n.callConnectionState.Disconnected ? (o && o.dispose(), t.participants().forEach(l)) : e === n.callConnectionState.Connecting && (o = t.participants.observe(a), t.participants().forEach(f));
    }
    function a(e, t) {
      r.forIn(e, function (e) {
        f(e);
      });
      r.forIn(t, function (e) {
        l(e);
      });
    }
    function f(n) {
      function o(r) {
        var i = n.audio.state.reason;
        e.process(t, n, i, r);
      }
      if (!c(n.audio.endpoint()) && !i.isPstn(n.person))
        return;
      var r = n.person.id();
      if (r in s)
        return;
      s[r] = o;
      n.audio.state.changed(o);
    }
    function l(e) {
      var t, n;
      n = e.person.id();
      n in s && (t = s[n], e.audio.state.changed.off(t), delete s[n]);
    }
    function c(e) {
      return /^(\+)?\d+$/.test(e);
    }
    var t, s = {}, o;
    this.subscribeToConversation = function (e) {
      t = e;
      t.selfParticipant.audio.state.changed(u);
    };
    this.dispose = function () {
      o && o.dispose();
      t.participants().forEach(l);
      s.length = 0;
      t.selfParticipant.audio.state.changed.off(u);
    };
  }
  var n = e("swx-enums"), r = e("lodash-compat"), i = e("ui/modelHelpers/personHelper");
  t.build = function (e) {
    return new s(e);
  };
});

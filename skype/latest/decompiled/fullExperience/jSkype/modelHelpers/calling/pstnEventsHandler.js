define("jSkype/modelHelpers/calling/pstnEventsHandler", [
  "require",
  "exports",
  "module",
  "swx-enums",
  "lodash-compat"
], function (e, t) {
  function i(e) {
    function o() {
      s && s.dispose(), t && (t.participants().forEach(l), t.selfParticipant.audio.state.changed.off(u)), i = {}, t = null;
    }
    function u(e) {
      e === n.callConnectionState.Disconnected ? (s && s.dispose(), t.participants().forEach(l)) : e === n.callConnectionState.Connecting && (s = t.participants.observe(a), t.participants().forEach(f));
    }
    function a(e, t) {
      r.forIn(e, function (e) {
        f(e);
      }), r.forIn(t, function (e) {
        l(e);
      });
    }
    function f(n) {
      function s(r) {
        var i = n.audio.state.reason;
        e.process(t, n, i, r);
      }
      if (!c(n.audio.endpoint()))
        return;
      var r = n.person.id();
      if (r in i)
        return;
      i[r] = s, n.audio.state.changed(s);
    }
    function l(e) {
      var t, n;
      n = e.person.id(), n in i && (t = i[n], e.audio.state.changed.off(t), delete i[n]);
    }
    function c(e) {
      return /^(\+)?\d+$/.test(e);
    }
    var t, i = {}, s;
    this.subscribeToConversation = function (e) {
      o(), t = e, t.selfParticipant.audio.state.changed(u);
    }, this.dispose = o;
  }
  var n = e("swx-enums"), r = e("lodash-compat");
  t.build = function (e) {
    return new i(e);
  };
})

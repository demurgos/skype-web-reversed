define("jSkype/models/participant", [
  "require",
  "jcafe-property-model",
  "swx-enums",
  "jSkype/models/participantAudio",
  "jSkype/models/participantVideo",
  "jSkype/models/participantChat",
  "jSkype/models/participantScreenSharing"
], function (e) {
  function u(e) {
    return /^guest:/.test(e);
  }
  function a(e) {
    return e.chat.state() === n.callConnectionState.Disconnected && e.audio.state() === n.callConnectionState.Disconnected && e.video.state() === n.callConnectionState.Disconnected && e.screenSharing.state() === n.callConnectionState.Disconnected ? n.participantState.Disconnected : n.participantState.Connected;
  }
  function f(e, f, l) {
    function d() {
      c.state._set(a(c));
    }
    function v(e) {
      c.isAnonymous._set(u(e));
    }
    function m(e) {
      h(e === n.participantRole.Leader);
    }
    function g(e) {
      return c.role() === e || !n.participantRole[e] ? c.role() : (l.addParticipant(f.conversationId, c.person.id(), e), e);
    }
    var c = this, h = t.boolProperty(f.selfParticipant && f.selfParticipant.role() === n.participantRole.Leader), p = t.command(g, h);
    c.isAnonymous = t.property({
      readOnly: !0,
      value: u(e.id())
    }), c.role = t.property({
      value: n.participantRole.Attendee,
      set: p
    }), f.selfParticipant && f.selfParticipant.role.changed(m), c.person = e, c.chat = s.build(f), c.audio = r.build(f, e), c.video = i.build(f, e), c.screenSharing = o.build(f, e), c.lastReadTimestamp = t.property({
      readOnly: !0,
      value: null
    }), c.state = t.property({
      readOnly: !0,
      value: a(c)
    }), c.chat.state.changed(d), c.audio.state.changed(d), c.video.state.changed(d), c.screenSharing.state.changed(d), e.id.changed(v), c._dispose = function () {
      c.chat.state.changed.off(d), c.audio.state.changed.off(d), c.video.state.changed.off(d), c.screenSharing.state.changed.off(d), f.selfParticipant.role.changed.off(m), c.chat._dispose(), c.audio._dispose(), c.video._dispose(), c.screenSharing._dispose(), e.id.changed.off(v);
    };
  }
  var t = e("jcafe-property-model"), n = e("swx-enums"), r = e("jSkype/models/participantAudio"), i = e("jSkype/models/participantVideo"), s = e("jSkype/models/participantChat"), o = e("jSkype/models/participantScreenSharing");
  return f;
})

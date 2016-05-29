define("jSkype/modelHelpers/calling/escalationHelper", [
  "require",
  "exports",
  "module",
  "swx-enums",
  "jSkype/modelHelpers/participantHelper"
], function (e, t) {
  function i(e) {
    e.selfParticipant.video.channels(0) && e.selfParticipant.video.channels(0).isStarted.set._enabled(!0);
    e.selfParticipant.audio.isMuted.set.enabled._set(!0);
  }
  function s(e, t) {
    var r = e.screenSharing.stream.state(), i = e.video.channels, s = null;
    i(0) && (s = i(0).stream.state());
    t.audio.isMuted._set(e.audio.isMuted());
    t.audio.isSpeaking._set(e.audio.isSpeaking());
    t.audio.isOnHold._set(e.audio.isOnHold());
    t.audio.endpoint._set(e.audio.endpoint());
    s && s !== n.mediaStreamState.Stopped && (t.video.channels(0).isStarted.set(!0), t.video.channels(0).isStarted.set._enabled(!0), t.video.channels(0).stream.state._set(s));
    r !== n.mediaStreamState.Stopped && (t.screenSharing.isControlling._set(e.screenSharing.isControlling()), t.screenSharing.stream.state._set(r));
  }
  function o(e) {
    r.updateParticipantAudioVideoState(e, n.callConnectionState.Connecting, n.callDisconnectionReason.CallEscalated);
    r.updateParticipantAudioVideoState(e, n.callConnectionState.Connected, n.callDisconnectionReason.CallEscalated);
  }
  var n = e("swx-enums"), r = e("jSkype/modelHelpers/participantHelper");
  t.escalateCall = function (e, t) {
    if (!t._callHandler)
      return;
    t.audioService.callConnected._set(e.audioService.callConnected());
    e.spawnedConversation._set(t);
    var u = e.participants(0), a = r.getOrCreateParticipantInConversation(t, u.person.id()), f = e.selfParticipant, l = t.selfParticipant;
    o(a);
    s(u, a);
    o(l);
    s(f, l);
    t._callHandler.canToggleMute && t._callHandler.canToggleMute._set(e._callHandler.canToggleMute());
    r.handleParticipantLeavingStateTransition(u, n.callDisconnectionReason.CallEscalated);
    r.handleParticipantLeavingStateTransition(f, n.callDisconnectionReason.CallEscalated);
    i(e);
  };
});

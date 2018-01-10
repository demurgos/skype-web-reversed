(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/calling/escalationHelper", [
      "require",
      "exports",
      "swx-enums",
      "./participantHelper"
    ], e);
}(function (e, t) {
  function s(e, t) {
    if (!t._callHandler)
      return;
    t.audioService.callConnected._set(e.audioService.callConnected());
    var s = e.participants(0), l = r.getOrCreateParticipantInConversation(t, s.person.id()), c = e.selfParticipant, h = t.selfParticipant, p = e.screenSharingService.sharer();
    i = t._callHandler.isPluginless();
    p && (t.screenSharingService.sharer(p === s ? l : h), e.screenSharingService.sharer(null));
    f(l);
    a(s, l);
    f(h);
    a(c, h);
    u(e, t);
    t._callHandler.transferFrom(e._callHandler);
    t._callHandler.canToggleMute && t._callHandler.canToggleMute._set(e._callHandler.canToggleMute());
    r.handleParticipantLeavingStateTransition(s, n.callDisconnectionReason.CallEscalated);
    r.handleParticipantLeavingStateTransition(c, n.callDisconnectionReason.CallEscalated);
    o(e);
  }
  function o(e) {
    e.selfParticipant.video.channels(0) && e.selfParticipant.video.channels(0).isStarted.set._enabled(!0);
    e.selfParticipant.audio.isMuted.set.enabled._set(!0);
  }
  function u(e, t) {
    t.audioService.callId._set(e.audioService.callId());
    t._callData.nodeId(e._callData.nodeId());
    t._callData.ngcEndpointId(e._callData.ngcEndpointId());
    t._callData.ngcParticipantId(e._callData.ngcParticipantId());
  }
  function a(e, t) {
    var r = e.screenSharing.stream.state(), s = e.video.channels, o = null;
    s(0) && (o = s(0).stream.state());
    t.audio.isMuted._set(e.audio.isMuted());
    t.audio.isSpeaking._set(e.audio.isSpeaking());
    t.audio.isOnHold._set(e.audio.isOnHold());
    t.audio.endpoint._set(e.audio.endpoint());
    o && o !== n.mediaStreamState.Stopped && (t.video.channels(0).isStarted.set(!0), t.video.channels(0).isStarted.set._enabled(!0), i || t.video.channels(0).stream.state._set(o));
    r !== n.mediaStreamState.Stopped && (t.screenSharing.isControlling._set(e.screenSharing.isControlling()), i || t.screenSharing.stream.state._set(r), e.screenSharing.stream.state._set(n.mediaStreamState.Stopped));
  }
  function f(e) {
    r.updateParticipantAudioVideoState(e, n.callConnectionState.Connecting, n.callDisconnectionReason.CallEscalated);
    r.updateParticipantAudioVideoState(e, n.callConnectionState.Connected, n.callDisconnectionReason.CallEscalated);
  }
  var n = e("swx-enums"), r = e("./participantHelper"), i;
  t.escalateCall = s;
}));

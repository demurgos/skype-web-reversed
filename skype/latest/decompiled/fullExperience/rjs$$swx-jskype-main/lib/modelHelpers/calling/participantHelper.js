(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/calling/participantHelper", [
      "require",
      "exports",
      "swx-enums",
      "../../modelHelpers/personsAndGroupsHelper",
      "../../telemetry/logging/callingLogTracer",
      "swx-utils-chat"
    ], e);
}(function (e, t) {
  function u(e, t, n) {
    if (!t) {
      o.warn("Trying to update to undefined state!, ignoring");
      return;
    }
    o.log("Updating participant", e.person.id(), " state to:", t, ", from:", e.audio.state(), "reason: ", n);
    e.audio.state._set(t, n);
    e.video.state._set(t, n);
  }
  function a(e, t, n) {
    e.participants().forEach(function (e) {
      u(e, t, n);
    });
  }
  function f(e, t) {
    e.audio.state() === n.callConnectionState.Disconnected && u(e, n.callConnectionState.Connecting);
    e.audio.state() === n.callConnectionState.Connecting && !t._callData.isCurrentCallIncoming() && u(e, n.callConnectionState.Ringing);
  }
  function l(e, t) {
    f(e, t);
    u(e, n.callConnectionState.Connected);
  }
  function c(e, t) {
    e.forEach(function (e) {
      h(e, t);
    });
  }
  function h(e, t) {
    t = t || n.callDisconnectionReason.Terminated;
    e.audio.state() !== n.callConnectionState.Disconnected && (e.audio.state() !== n.callConnectionState.Disconnecting && u(e, n.callConnectionState.Disconnecting, t), u(e, n.callConnectionState.Disconnected, t));
    e.screenSharing.stream.state() !== n.mediaStreamState.Stopped && e.screenSharing.stream.state._set(n.mediaStreamState.Stopped, t);
    e.screenSharing.state() !== n.callConnectionState.Disconnected && (e.screenSharing.state() !== n.callConnectionState.Disconnecting && e.screenSharing.state._set(n.callConnectionState.Disconnecting, t), e.screenSharing.state._set(n.callConnectionState.Disconnected, t));
  }
  function p(e, t) {
    var n;
    e.selfParticipant.person.id() === t ? n = e.selfParticipant : n = s.conversation.getParticipantFromConversation(e, t);
    if (!n) {
      var i = r.getPerson(t);
      e._addParticipant(i);
      n = s.conversation.getParticipantFromConversation(e, t);
    }
    return n;
  }
  function d(e) {
    return e.some(function (e) {
      var t = e.audio.state();
      return t !== n.callConnectionState.Disconnecting && t !== n.callConnectionState.Disconnected;
    });
  }
  var n = e("swx-enums"), r = e("../../modelHelpers/personsAndGroupsHelper"), i = e("../../telemetry/logging/callingLogTracer"), s = e("swx-utils-chat"), o = i.get();
  t.updateParticipantAudioVideoState = u;
  t.updateParticipantsAudioVideoState = a;
  t.handleParticipantRingingStateTransition = f;
  t.handleParticipantJoiningStateTransition = l;
  t.handleRemoteParticipantsLeavingStateTransition = c;
  t.handleParticipantLeavingStateTransition = h;
  t.getOrCreateParticipantInConversation = p;
  t.isAnyRemoteParticipantConnected = d;
}));

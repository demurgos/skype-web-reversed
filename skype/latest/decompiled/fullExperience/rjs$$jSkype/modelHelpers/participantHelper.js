define("jSkype/modelHelpers/participantHelper", [
  "require",
  "exports",
  "module",
  "swx-enums",
  "jSkype/modelHelpers/personsAndGroupsHelper",
  "jSkype/telemetry/logging/callingLogTracer",
  "jSkype/client"
], function (e, t) {
  var n = e("swx-enums"), r = e("jSkype/modelHelpers/personsAndGroupsHelper"), i = e("jSkype/telemetry/logging/callingLogTracer").get(), s = e("jSkype/client");
  t.updateParticipantAudioVideoState = function (e, t, n) {
    if (!t) {
      i.warn("Trying to update to undefined state!, ignoring");
      return;
    }
    i.log("Updating participant", e.person.id(), " state to:", t, ", from:", e.audio.state(), "reason: ", n), e.audio.state._set(t, n), e.video.state._set(t, n);
  }, t.updateParticipantsAudioVideoState = function (e, n, r) {
    e.participants().forEach(function (e) {
      t.updateParticipantAudioVideoState(e, n, r);
    });
  }, t.handleParticipantRingingStateTransition = function (e, r) {
    e.audio.state() === n.callConnectionState.Disconnected && t.updateParticipantAudioVideoState(e, n.callConnectionState.Connecting), e.audio.state() === n.callConnectionState.Connecting && !r._callData.isCurrentCallIncoming() && t.updateParticipantAudioVideoState(e, n.callConnectionState.Ringing);
  }, t.handleParticipantJoiningStateTransition = function (e, r) {
    t.handleParticipantRingingStateTransition(e, r), t.updateParticipantAudioVideoState(e, n.callConnectionState.Connected);
  }, t.handleRemoteParticipantsLeavingStateTransition = function (e, n) {
    e.forEach(function (e) {
      t.handleParticipantLeavingStateTransition(e, n);
    });
  }, t.handleParticipantLeavingStateTransition = function (e, r) {
    r = r || n.callDisconnectionReason.Terminated, e.audio.state() === n.callConnectionState.Disconnected ? t.updateParticipantAudioVideoState(e, n.callConnectionState.Disconnected, r) : (e.audio.state() !== n.callConnectionState.Disconnecting && t.updateParticipantAudioVideoState(e, n.callConnectionState.Disconnecting, r), t.updateParticipantAudioVideoState(e, n.callConnectionState.Disconnected, r));
  }, t.getOrCreateParticipantInConversation = function (e, n) {
    var i;
    e.selfParticipant.person.id() === n ? i = e.selfParticipant : i = t.getParticipantFromConversation(e, n);
    if (!i) {
      var s = r.getPerson(n);
      e._addParticipant(s), i = t.getParticipantFromConversation(e, n);
    }
    return i;
  }, t.getParticipantFromConversation = function (e, t) {
    return e.participants.filter(function (e) {
      return e.person.id() === t;
    })(0);
  }, t.isMeParticipant = function (e) {
    return s.get().personsAndGroupsManager.mePerson.id() === e.person.id();
  };
})

(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/plugin/pluginEventDispatcher", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "jskype-settings-instance",
      "./participantVoiceState",
      "./participantVideoState",
      "../../../lib/services/plugin/mappers/callStateMapper",
      "../../../lib/services/plugin/mappers/callLeaveReasonMapper",
      "swx-constants",
      "swx-enums",
      "swx-constants",
      "swx-constants",
      "../../../lib/services/callRegister",
      "../../../lib/modelHelpers/calling/participantHelper",
      "../../../lib/modelHelpers/calling/deviceHelper",
      "swx-utils-chat",
      "swx-mri/lib/mriMaps",
      "../../../lib/modelHelpers/propertyValidator",
      "../../../lib/telemetry/logging/callingLogTracer",
      "../../../lib/services/preferences/settingsUtils/privacySettingsUtil",
      "./pluginDominantSpeaker"
    ], e);
}(function (e, t) {
  function L(e) {
    e.onCallStatusChanged = P(H);
    e.onParticipantVoiceStatusChanged = P(q);
    e.onParticipantVideoStatusChanged = P(U);
    e.onParticipantSoundLevelChanged = P(B);
    e.onParticipantSpeakerStatusChanged = P(I);
    e.onParticipantLeaveReasonChanged = P(R);
    e.onParticipantJoined = P(G);
    e.onParticipantLeft = P(Y);
    e.onMicrophoneMuted = P(Z);
    e.onMicrophoneUnmuted = P(et);
    e.onErrorOccured = P(V);
    e.onCallIsHostlessChanged = P(tt);
    e.onCallTechnologyChanged = P(nt);
    e.onTextMessage = P(J);
    e.onCallMoved = K;
    e.onConvoIdentityReceived = Q;
    e.onConnectionStatusChanged = $;
  }
  function A(e) {
    e.onLocalResolutionChanged = z;
    e.onResolutionChanged = W;
  }
  function O(e, t, n) {
    x[e] || (x[e] = []);
    x[e].push({
      handlerFn: t,
      data: n
    });
  }
  function M(e) {
    e ? delete x[e] : x = {};
  }
  function _(e, t) {
    x[e] && (x[e].forEach(function (e) {
      e.data.convoIdentity = t;
      e.handlerFn(e.data);
    }), M(e));
  }
  function D(e) {
    return /^#/.test(e);
  }
  function P(e) {
    return function (t) {
      if (D(t.convoIdentity)) {
        O(t.convoIdentity, e, t);
        return;
      }
      e(t);
    };
  }
  function H(e) {
    var t = it(e), n = at(e.convoIdentity) || ct(e.callId);
    if (!n)
      return;
    n.audioService.callId._set(e.callId);
    n._callData.nodeId(S);
    ot(e.callStatus, n);
    switch (e.callStatus) {
    case o.CALL_STATES.ringingForMe:
      n._internalCallTelemetry.recordStep(o.CALL_STATES.ringingForMe), n.isGroupConversation() && n._callData.pluginOthersAreLive(!0), n._callData.pluginAwaitCall() ? (n._callData.pluginAwaitCall(!1), p.updateParticipantAudioVideoState(n.selfParticipant, f.callConnectionState.Notified, t)) : n._callData.pluginRingingForMe(!0);
      break;
    case o.CALL_STATES.othersAreLive:
      n._callData.pluginOthersAreLive(!0), n._callData.pluginAwaitCall() && (n._callData.pluginAwaitCall(!1), p.updateParticipantAudioVideoState(n.selfParticipant, f.callConnectionState.Notified, t)), n.selfParticipant.audio.state() === f.callConnectionState.Disconnecting && n.selfParticipant.audio.state.reason === f.callDisconnectionReason.Terminated && p.handleParticipantLeavingStateTransition(n.selfParticipant, t), n.selfParticipant.audio.state() === f.callConnectionState.Connected && !p.isAnyRemoteParticipantConnected(n.participants()) && p.handleParticipantLeavingStateTransition(n.selfParticipant, st());
      break;
    case o.CALL_STATES.finished:
      n._internalCallTelemetry.recordStep(o.CALL_STATES.finished), e.callLeaveReason === f.callDisconnectionReason.Terminated ? n._callData.pluginOthersAreLive(!1) : e.callLeaveReason === f.callDisconnectionReason.Failed && n.selfParticipant.audio._isFailedCall(!0), p.handleParticipantLeavingStateTransition(n.selfParticipant, t), p.handleRemoteParticipantsLeavingStateTransition(n.participants(), t);
      break;
    default:
      o.toCafeState(e.callStatus) && n.selfParticipant.audio.state() !== f.callConnectionState.Disconnected && (n._internalCallTelemetry.recordStep("CallStatus_" + e.callStatus), p.updateParticipantAudioVideoState(n.selfParticipant, o.toCafeState(e.callStatus), t));
    }
  }
  function B(e) {
    if (!e.convoIdentity)
      return;
    var t = at(e.convoIdentity), n = p.getOrCreateParticipantInConversation(t, e.participantId), i = r.SoundLevelEventMode || l.CALLING.SOUND_LEVEL_EVENT_MODE.Boolean, s = parseInt(e.soundLevel, 10);
    if (!n) {
      E.warn("Unable to get participant", e.participantId);
      return;
    }
    if (i === l.CALLING.SOUND_LEVEL_EVENT_MODE.None)
      return;
    i === l.CALLING.SOUND_LEVEL_EVENT_MODE.Boolean ? n.audio.isSpeaking._set(s === l.CALLING.PLUGIN_MAX_SOUND_LEVEL) : i === l.CALLING.SOUND_LEVEL_EVENT_MODE.Full && n.audio.isSpeaking._set(Boolean(s));
    F().setSources(n, t);
  }
  function j(e, t) {
    t.videoService.activeSpeaker.participant._set(e);
  }
  function F() {
    return k || (k = new w.DominantSpeakerManager(r.settings.pluginless.mediaAgent.activeSpeaker, j)), k;
  }
  function I(e) {
    var t = at(e.convoIdentity), n = p.getOrCreateParticipantInConversation(t, e.participantId);
    if (!n) {
      E.warn("Unable to get participant", e.participantId);
      return;
    }
    n.audio.isSpeaking._set(e.isActiveSpeaker);
    F().setSources(n, t);
  }
  function q(e) {
    if (!e.convoIdentity)
      return undefined;
    var t = at(e.convoIdentity), r = p.getOrCreateParticipantInConversation(t, e.participantId), s = [
        i["default"].speaking,
        i["default"].listening,
        i["default"].hold
      ];
    return r ? C.isMeParticipant(r, n.get().personsAndGroupsManager) ? !1 : (t._internalCallTelemetry.recordStep("VoiceStatus_" + e.voiceStatus), e.voiceStatus === i["default"].ringing && p.handleParticipantRingingStateTransition(r, t), e.voiceStatus === i["default"].joining && t.isGroupConversation() && p.handleParticipantRingingStateTransition(r, t), e.voiceStatus === i["default"].leaving && p.handleParticipantLeavingStateTransition(r, e.callLeaveReason), e.voiceStatus === i["default"].earlyMedia && p.updateParticipantAudioVideoState(r, f.callConnectionState.EarlyMedia), s.indexOf(e.voiceStatus) > -1 && p.handleParticipantJoiningStateTransition(r, t), undefined) : (E.warn("Unable to get participant", e.participantId), undefined);
  }
  function R(e) {
    if (!e.convoIdentity)
      return undefined;
    var t = at(e.convoIdentity), r = p.getOrCreateParticipantInConversation(t, e.participantId);
    return r ? C.isMeParticipant(r, n.get().personsAndGroupsManager) ? !1 : ((r.audio.state() === f.callConnectionState.Disconnecting || r.audio.state() === f.callConnectionState.Disconnected) && e.callLeaveReason !== f.callDisconnectionReason.Unknown && p.updateParticipantAudioVideoState(r, r.audio.state(), e.callLeaveReason), undefined) : (E.warn("Unable to get participant", e.participantId), undefined);
  }
  function U(e) {
    if (!e.convoIdentity || !e.participantId)
      return;
    if (e.mediaType === l.CALLING.PLUGIN_MEDIA_TYPES.SCREEN_SHARING && !r.isFeatureOn(a.COMMON.featureFlags.INCOMING_SCREEN_SHARING))
      return;
    var t = at(e.convoIdentity), i = p.getOrCreateParticipantInConversation(t, e.participantId), o = e.mediaType === l.CALLING.PLUGIN_MEDIA_TYPES.SCREEN_SHARING, u = i.video.channels(0), c = u.stream, h = i.screenSharing.stream, d = C.isMeParticipant(i, n.get().personsAndGroupsManager);
    if (!i) {
      E.warn("Unable to get participant", e.participantId);
      return;
    }
    if (u && h) {
      var v = o ? h : c;
      b.checkVideoPolicySettings(i).then(function (t) {
        E.warn("Updating stream state : ", e.participantId, e.videoStatus, " current state", v.state());
        switch (e.videoStatus) {
        case s["default"].available:
          if (t || d)
            d ? (v.state() !== f.mediaStreamState.Stopped && o && v.state._set(f.mediaStreamState.Stopped), o || u.isStarted.set._enabled(!0)) : (o || u.isVideoOn._set(!0), v.state._set(f.mediaStreamState.Started));
          break;
        case s["default"].starting:
          t && (d ? v.state._set(f.mediaStreamState.Active) : v.state._set(f.mediaStreamState.Inactive));
          break;
        case s["default"].rendering:
          t && (v.state._set(f.mediaStreamState.Active), o || u.isStarted.set._enabled(!0), !d && !o && u.isVideoOn._set(!0));
          break;
        case s["default"].stopping:
        case s["default"].notAvailable:
          o || (u.isStarted.set._enabled(!0), d || u.isVideoOn._set(!1)), v.state._set(f.mediaStreamState.Stopped);
        }
      });
    }
  }
  function z(e) {
    var t = h.get().activeCalls()[0];
    if (!t)
      return;
    var n = t.selfParticipant.video.channels(0);
    n.stream.width._set(e.width);
    n.stream.height._set(e.height);
  }
  function W(e, t, n) {
    var r = h.get().activeCalls()[0];
    if (!r) {
      E.warn("Unable to get active conversation, ignoring event");
      return;
    }
    var i = p.getOrCreateParticipantInConversation(r, t);
    if (!i) {
      E.warn("Unable to get participant", t, "ignoring event");
      return;
    }
    var s = n === l.CALLING.PLUGIN_MEDIA_TYPES.SCREEN_SHARING ? i.screenSharing.stream : i.video.channels(0).stream;
    s.state() !== f.mediaStreamState.Stopped && s.state._set(f.mediaStreamState.Active);
    s.width._set(e.width);
    s.height._set(e.height);
  }
  function X(e) {
    ht(function (t) {
      var n = t.participants.subscribe();
      p.handleRemoteParticipantsLeavingStateTransition(t.participants(), e);
      M();
      n.dispose();
      p.handleParticipantLeavingStateTransition(t.selfParticipant, e);
      t._callData.pluginOthersAreLive(!1);
    });
  }
  function V(e) {
    var t = n.get().devicesManager.selectedCamera();
    e.reason === c.PLUGIN_CONST.PLUGIN_ERRORS.REASON_CANNOT_CAPTURE && t !== null && ht(function (e) {
      e.selfParticipant.video.channels(0).stream.state._set(f.mediaStreamState.Stopped);
    });
  }
  function $(e) {
    e.nodeId && (S = e.nodeId);
  }
  function J(e) {
    if (e.senderIdentity === "sys" && e.messageBody && /CallInformation/.test(e.messageBody)) {
      var t = at(e.convoIdentity);
      t._callData.pluginCallInfo(e.messageBody);
    }
  }
  function K(e) {
    if (!r.isFeatureOn(a.COMMON.featureFlags.GVC_ESCALATION))
      return;
    var t = at(e.oldConvoIdentity);
    t.selfParticipant.video.channels(0).isStarted.set._enabled(!1);
    t.selfParticipant.audio.isMuted.set.enabled._set(!1);
    if (!D(e.newConvoIdentity)) {
      var n = at(e.newConvoIdentity);
      t.spawnedConversation._set(n);
    } else
      T[e.newConvoIdentity] = e.oldConvoIdentity;
  }
  function Q(e) {
    var t = e.tempConvoIdentity, n = e.realConvoIdentity;
    if (!T[t])
      return;
    var r = at(T[t]), i = at(n);
    r.spawnedConversation._set(i);
    _(t, n);
  }
  function G(e) {
    var t = at(e.convoIdentity);
    p.getOrCreateParticipantInConversation(t, e.participantId);
  }
  function Y(e) {
    var t = at(e.convoIdentity), n = N.getParticipantFromConversation(t, e.participantId);
    if (!n) {
      E.warn("Unable to get participant", e.participantId);
      return;
    }
    p.handleParticipantLeavingStateTransition(n);
    t._removeParticipant(n.person);
  }
  function Z(e) {
    var t = at(e.convoIdentity);
    if (!t) {
      E.error("Trying to mute microphone but conversation does not exist", e.convoIdentity);
      return;
    }
    ut(t, !0);
  }
  function et(e) {
    var t = at(e.convoIdentity);
    if (!t) {
      E.error("Trying to unmute microphone but conversation does not exist", e.convoIdentity);
      return;
    }
    ut(t, !1);
  }
  function tt(e) {
    var t = at(e.convoIdentity);
    if (!t) {
      E.error("Call hostless flag changed for conversation that does not exist", e.convoIdentity);
      return;
    }
    t._callData.isHostless = e.callIsHostless;
  }
  function nt(e) {
    var t = at(e.convoIdentity) || ct(e.callId);
    if (!t) {
      E.error("Call technology changed for conversation that does not exist", e.convoIdentity);
      return;
    }
    t._callData.callTechnology(e.callTechnology);
    t.mediaConnectionType(rt(e.callTechnology));
  }
  function rt(e) {
    switch (e) {
    case f.callTechnology.P2P:
      return f.mediaConnectionType.PluginBasedP2P;
    case f.callTechnology.NGC:
      return f.mediaConnectionType.PluginBasedNGC;
    default:
      return f.mediaConnectionType.Unknown;
    }
  }
  function it(e) {
    var t;
    return e.callLeaveReason && (t = u.toCafeReason(e.callLeaveReason), t === f.callDisconnectionReason.Terminated && (t = st())), t;
  }
  function st() {
    return d.isSpeakerAvailable() ? d.isMicrophoneAvailable() ? f.callDisconnectionReason.Terminated : f.callDisconnectionReason.MissingMicrophone : f.callDisconnectionReason.MissingSpeaker;
  }
  function ot(e, t) {
    if (!t._callHandler) {
      E.warn("Trying to update canMute in conversation without active call", t.conversationId);
      return;
    }
    (e === o.CALL_STATES.ringingForMe || e === o.CALL_STATES.othersAreLive || e === o.CALL_STATES.inProgress || e === o.CALL_STATES.ringingIn || e === o.CALL_STATES.ringingOut) && t._callHandler.canToggleMute(!0);
  }
  function ut(e, t) {
    if (!e._callHandler) {
      E.warn("[setMicrophoneMuted] Unable to find callHandler, ignoring event");
      return;
    }
    var n = e._callHandler.toggleMuteTask;
    n && n.promise.state() === "pending" && n.resolve(t);
  }
  function at(e) {
    if (!e)
      return;
    e = lt(e);
    if (!ft(e)) {
      var t = g.isPhoneNumber(e) ? m.contactMriTypes.pstn + ":" : m.contactMriTypes.skype + ":";
      e = t + e;
    }
    return n.get().conversationsManager._getOrCreateConversation(e);
  }
  function ft(e) {
    return /^(?:1|19|8|4):/.test(e);
  }
  function lt(e) {
    return e.replace(/#\w\//, "");
  }
  function ct(e) {
    return e ? h.get().getConversationByCallId(e) : undefined;
  }
  function ht(e) {
    var t = h.get().activeCalls();
    t.forEach(e);
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("jskype-settings-instance"), i = e("./participantVoiceState"), s = e("./participantVideoState"), o = e("../../../lib/services/plugin/mappers/callStateMapper"), u = e("../../../lib/services/plugin/mappers/callLeaveReasonMapper"), a = e("swx-constants"), f = e("swx-enums"), l = e("swx-constants"), c = e("swx-constants"), h = e("../../../lib/services/callRegister"), p = e("../../../lib/modelHelpers/calling/participantHelper"), d = e("../../../lib/modelHelpers/calling/deviceHelper"), v = e("swx-utils-chat"), m = e("swx-mri/lib/mriMaps"), g = e("../../../lib/modelHelpers/propertyValidator"), y = e("../../../lib/telemetry/logging/callingLogTracer"), b = e("../../../lib/services/preferences/settingsUtils/privacySettingsUtil"), w = e("./pluginDominantSpeaker"), E = y.get(), S = null, x = {}, T = {}, N = v.conversation, C = v.participant, k = null;
  t.startListeningOnSkypeCore = L;
  t.startListeningOnVideoManager = A;
  t.clearTempConversationEvents = M;
  t.onManagerComponentCrashed = X;
}));

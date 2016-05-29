define("jSkype/services/plugin/pluginEventDispatcher", [
  "require",
  "exports",
  "module",
  "jSkype/client",
  "jSkype/settings",
  "jSkype/services/plugin/participantVoiceState",
  "jSkype/services/plugin/participantVideoState",
  "jSkype/services/plugin/mappers/callStateMapper",
  "jSkype/services/plugin/mappers/callLeaveReasonMapper",
  "constants/common",
  "swx-enums",
  "constants/calling",
  "constants/plugin.const",
  "jSkype/services/callRegister",
  "jSkype/services/callController",
  "jSkype/modelHelpers/participantHelper",
  "jSkype/modelHelpers/calling/escalationHelper",
  "jSkype/modelHelpers/contacts/dataMappers/dataMaps",
  "jSkype/modelHelpers/propertyValidator",
  "jSkype/telemetry/logging/callingLogTracer",
  "jSkype/services/preferences/settingsUtils/privacySettingsUtil"
], function (e, t) {
  function x(e, t, n) {
    E[e] || (E[e] = []);
    E[e].push({
      handlerFn: t,
      data: n
    });
  }
  function T(e) {
    e ? delete E[e] : E = {};
  }
  function N(e, t) {
    E[e] && (E[e].forEach(function (e) {
      e.data.convoIdentity = t;
      e.handlerFn(e.data);
    }), T(e));
  }
  function C(e) {
    return /^#/.test(e);
  }
  function k(e) {
    return function (t) {
      if (C(t.convoIdentity)) {
        x(t.convoIdentity, e, t);
        return;
      }
      e(t);
    };
  }
  function L(e) {
    var t = $(e), n = Q(e.convoIdentity) || Z(e.callId);
    if (!n)
      return;
    n.audioService.callId._set(e.callId);
    n._callData.nodeId(w);
    J(e.callStatus, n);
    switch (e.callStatus) {
    case o.CALL_STATES.ringingForMe:
      n.isGroupConversation() && n._callData.pluginOthersAreLive(!0), n._callData.pluginAwaitCall() ? (n._callData.pluginAwaitCall(!1), d.updateParticipantAudioVideoState(n.selfParticipant, f.callConnectionState.Notified, t)) : n._callData.pluginRingingForMe(!0);
      break;
    case o.CALL_STATES.othersAreLive:
      n._callData.pluginOthersAreLive(!0), n.selfParticipant.audio.state() === f.callConnectionState.Disconnecting && n.selfParticipant.audio.state.reason === f.callDisconnectionReason.Terminated && d.handleParticipantLeavingStateTransition(n.selfParticipant, t);
      break;
    case o.CALL_STATES.finished:
      e.callLeaveReason === f.callDisconnectionReason.Terminated ? n._callData.pluginOthersAreLive(!1) : e.callLeaveReason === f.callDisconnectionReason.Failed && n.selfParticipant.audio._isFailedCall(!0), d.handleParticipantLeavingStateTransition(n.selfParticipant, t), d.handleRemoteParticipantsLeavingStateTransition(n.participants(), t);
      break;
    default:
      o.toCafeState(e.callStatus) && d.updateParticipantAudioVideoState(n.selfParticipant, o.toCafeState(e.callStatus), t);
    }
  }
  function A(e) {
    if (!e.convoIdentity)
      return;
    var t = Q(e.convoIdentity), n = d.getOrCreateParticipantInConversation(t, e.participantId), i = r.SoundLevelEventMode || l.SOUND_LEVEL_EVENT_MODE.Boolean, s = parseInt(e.soundLevel, 10);
    if (!n) {
      y.warn("Unable to get participant", e.participantId);
      return;
    }
    if (i === l.SOUND_LEVEL_EVENT_MODE.None)
      return;
    i === l.SOUND_LEVEL_EVENT_MODE.Boolean ? n.audio.isSpeaking._set(s === l.PLUGIN_MAX_SOUND_LEVEL) : i === l.SOUND_LEVEL_EVENT_MODE.Full && n.audio.isSpeaking._set(Boolean(s));
  }
  function O(e) {
    if (!e.convoIdentity)
      return;
    var t = Q(e.convoIdentity), n = d.getOrCreateParticipantInConversation(t, e.participantId), r = [
        i.speaking,
        i.listening,
        i.hold
      ];
    if (!n) {
      y.warn("Unable to get participant", e.participantId);
      return;
    }
    if (d.isMeParticipant(n))
      return !1;
    e.voiceStatus === i.ringing && d.handleParticipantRingingStateTransition(n, t);
    e.voiceStatus === i.leaving && d.handleParticipantLeavingStateTransition(n, e.callLeaveReason);
    e.voiceStatus === i.earlyMedia && d.updateParticipantAudioVideoState(n, f.callConnectionState.EarlyMedia);
    r.indexOf(e.voiceStatus) > -1 && d.handleParticipantJoiningStateTransition(n, t);
  }
  function M(e) {
    if (!e.convoIdentity)
      return;
    var t = Q(e.convoIdentity), n = d.getOrCreateParticipantInConversation(t, e.participantId);
    if (!n) {
      y.warn("Unable to get participant", e.participantId);
      return;
    }
    if (d.isMeParticipant(n))
      return !1;
    (n.audio.state() === f.callConnectionState.Disconnecting || n.audio.state() === f.callConnectionState.Disconnected) && e.callLeaveReason !== f.callDisconnectionReason.Unknown && d.updateParticipantAudioVideoState(n, n.audio.state(), e.callLeaveReason);
  }
  function _(e) {
    if (!e.convoIdentity)
      return;
    if (e.mediaType === l.PLUGIN_MEDIA_TYPES.SCREEN_SHARING && !r.isFeatureOn(a.featureFlags.INCOMING_SCREEN_SHARING))
      return;
    var t = Q(e.convoIdentity), n = d.getOrCreateParticipantInConversation(t, e.participantId), i = e.mediaType === l.PLUGIN_MEDIA_TYPES.SCREEN_SHARING, o = n.video.channels(0), u = o.stream, c = n.screenSharing.stream, h;
    if (!n) {
      y.warn("Unable to get participant", e.participantId);
      return;
    }
    o && c && (h = i ? c : u, b.checkVideoPolicySettings(n).then(function (t) {
      switch (e.videoStatus) {
      case s.available:
        t && (d.isMeParticipant(n) || h.state._set(f.mediaStreamState.Started));
        break;
      case s.starting:
        t && (d.isMeParticipant(n) ? h.state._set(f.mediaStreamState.Active) : h.state._set(f.mediaStreamState.Inactive));
        break;
      case s.rendering:
        t && (h.state._set(f.mediaStreamState.Active), i || o.isStarted.set._enabled(!0));
        break;
      case s.stopping:
      case s.notAvailable:
        h.state._set(f.mediaStreamState.Stopped), i || o.isStarted.set._enabled(!0);
      }
    }));
  }
  function D(e) {
    var t = h.get().activeCalls()[0], n;
    if (!t)
      return;
    n = t.selfParticipant.video.channels(0);
    n.stream.width._set(e.width);
    n.stream.height._set(e.height);
  }
  function P(e, t, n) {
    var r = h.get().activeCalls()[0], i = d.getOrCreateParticipantInConversation(r, t), s;
    if (!i) {
      y.warn("Unable to get participant", t);
      return;
    }
    s = n === l.PLUGIN_MEDIA_TYPES.SCREEN_SHARING ? i.screenSharing.stream : i.video.channels(0).stream;
    s.state() !== f.mediaStreamState.Stopped && s.state._set(f.mediaStreamState.Active);
    s.width._set(e.width);
    s.height._set(e.height);
  }
  function H() {
    et(function (e) {
      d.handleParticipantLeavingStateTransition(e.selfParticipant);
      e._callData.pluginOthersAreLive(!1);
      var t = e.participants.subscribe();
      d.handleRemoteParticipantsLeavingStateTransition(e.participants());
      T();
      t.dispose();
    });
  }
  function B(e) {
    var t = n.get().devicesManager.selectedCamera();
    e.reason === c.PLUGIN_ERRORS.REASON_CANNOT_CAPTURE && t !== null && et(function (e) {
      e.selfParticipant.video.channels(0).stream.state._set(f.mediaStreamState.Stopped);
    });
  }
  function j(e) {
    e.nodeId && (w = e.nodeId);
  }
  function F(e) {
    if (e.senderIdentity === "sys" && e.messageBody && /CallInformation/.test(e.messageBody)) {
      var t = Q(e.convoIdentity);
      t._callData.pluginCallInfo(e.messageBody);
    }
  }
  function I(e) {
    if (!r.isFeatureOn(a.featureFlags.GVC_ESCALATION))
      return;
    var t = Q(e.oldConvoIdentity);
    t.selfParticipant.video.channels(0).isStarted.set._enabled(!1);
    t.selfParticipant.audio.isMuted.set.enabled._set(!1);
    if (!C(e.newConvoIdentity)) {
      var i = Q(e.newConvoIdentity);
      p.setupCall(i);
      n.get().conversationsManager.conversations.add(i);
      v.escalateCall(t, i);
    } else
      S[e.newConvoIdentity] = e.oldConvoIdentity;
  }
  function q(e) {
    var t = e.tempConvoIdentity, r = e.realConvoIdentity;
    if (!S[t])
      return;
    var i = Q(S[t]), s = Q(r);
    p.setupCall(s);
    n.get().conversationsManager.conversations.add(s);
    v.escalateCall(i, s);
    N(t, r);
  }
  function R(e) {
    var t = Q(e.convoIdentity);
    d.getOrCreateParticipantInConversation(t, e.participantId);
  }
  function U(e) {
    var t = Q(e.convoIdentity), n = d.getParticipantFromConversation(t, e.participantId);
    if (!n) {
      y.warn("Unable to get participant", e.participantId);
      return;
    }
    d.handleParticipantLeavingStateTransition(n);
  }
  function z(e) {
    var t = Q(e.convoIdentity);
    if (!t) {
      y.error("Trying to mute microphone but conversation does not exist", e.convoIdentity);
      return;
    }
    K(t, !0);
  }
  function W(e) {
    var t = Q(e.convoIdentity);
    if (!t) {
      y.error("Trying to unmute microphone but conversation does not exist", e.convoIdentity);
      return;
    }
    K(t, !1);
  }
  function X(e) {
    var t = Q(e.convoIdentity) || Z(e.callId);
    if (!t) {
      y.error("Call technology changed for conversation that does not exist", e.convoIdentity);
      return;
    }
    t._callData.callTechnology(e.callTechnology);
    t.mediaConnectionType(V(e.callTechnology));
  }
  function V(e) {
    switch (e) {
    case f.callTechnology.P2P:
      return f.mediaConnectionType.PluginBasedP2P;
    case f.callTechnology.NGC:
      return f.mediaConnectionType.PluginBasedNGC;
    default:
      return f.mediaConnectionType.Unknown;
    }
  }
  function $(e) {
    var t;
    return e.callLeaveReason && (t = u.toCafeReason(e.callLeaveReason), t === f.callDisconnectionReason.Terminated && n.get().devicesManager.speakers().length === 0 && (t = f.callDisconnectionReason.MissingSpeaker)), t;
  }
  function J(e, t) {
    if (!t._callHandler) {
      y.warn("Trying to update canMute in conversation without active call", t);
      return;
    }
    (e === o.CALL_STATES.ringingForMe || e === o.CALL_STATES.othersAreLive || e === o.CALL_STATES.inProgress || e === o.CALL_STATES.ringingIn || e === o.CALL_STATES.ringingOut) && t._callHandler.canToggleMute(!0);
  }
  function K(e, t) {
    var n = e._callHandler.toggleMuteTask;
    n && n.promise.state() === "pending" && n.resolve(t);
  }
  function Q(e) {
    if (!e)
      return;
    e = Y(e);
    if (!G(e)) {
      var t = g.isPhoneNumber(e) ? m.contactTypes[m.contactTypeNames.pstn] + ":" : m.contactTypes[m.contactTypeNames.skype] + ":";
      e = t + e;
    }
    return n.get().conversationsManager._getOrCreateConversation(e);
  }
  function G(e) {
    return /^(?:1|19|8|4):/.test(e);
  }
  function Y(e) {
    return e.replace(/#\w\//, "");
  }
  function Z(e) {
    if (!e)
      return;
    return h.get().getConversationByCallId(e);
  }
  function et(e) {
    var t = h.get().activeCalls();
    t.forEach(e);
  }
  var n = e("jSkype/client"), r = e("jSkype/settings"), i = e("jSkype/services/plugin/participantVoiceState"), s = e("jSkype/services/plugin/participantVideoState"), o = e("jSkype/services/plugin/mappers/callStateMapper"), u = e("jSkype/services/plugin/mappers/callLeaveReasonMapper"), a = e("constants/common"), f = e("swx-enums"), l = e("constants/calling"), c = e("constants/plugin.const"), h = e("jSkype/services/callRegister"), p = e("jSkype/services/callController"), d = e("jSkype/modelHelpers/participantHelper"), v = e("jSkype/modelHelpers/calling/escalationHelper"), m = e("jSkype/modelHelpers/contacts/dataMappers/dataMaps"), g = e("jSkype/modelHelpers/propertyValidator"), y = e("jSkype/telemetry/logging/callingLogTracer").get(), b = e("jSkype/services/preferences/settingsUtils/privacySettingsUtil"), w = null, E = {}, S = {};
  t.startListeningOnSkypeCore = function (e) {
    e.onCallStatusChanged = k(L);
    e.onParticipantVoiceStatusChanged = k(O);
    e.onParticipantVideoStatusChanged = k(_);
    e.onParticipantSoundLevelChanged = k(A);
    e.onParticipantLeaveReasonChanged = k(M);
    e.onParticipantJoined = k(R);
    e.onParticipantLeft = k(U);
    e.onMicrophoneMuted = k(z);
    e.onMicrophoneUnmuted = k(W);
    e.onErrorOccured = k(B);
    e.onCallTechnologyChanged = k(X);
    e.onTextMessage = k(F);
    e.onCallMoved = I;
    e.onConvoIdentityReceived = q;
    e.onConnectionStatusChanged = j;
  };
  t.startListeningOnVideoManager = function (e) {
    e.onLocalResolutionChanged = D;
    e.onResolutionChanged = P;
  };
  t.onManagerComponentCrashed = H;
  t.clearTempConversationEvents = T;
});

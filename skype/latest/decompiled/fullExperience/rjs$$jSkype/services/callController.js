define("jSkype/services/callController", [
  "require",
  "exports",
  "module",
  "jcafe-property-model",
  "jSkype/client",
  "constants/calling",
  "jSkype/modelHelpers/calling/fallbackMessageHelper",
  "jSkype/settings",
  "jSkype/services/callHandlerFactory",
  "utils/calling/callingStack",
  "jSkype/telemetry/logging/callingLogTracer",
  "jSkype/services/callRegister",
  "jSkype/telemetry/callInfoTelemetry",
  "constants/common",
  "swx-enums",
  "jSkype/modelHelpers/participantHelper",
  "jSkype/services/preferences/settingsUtils/privacySettingsUtil"
], function (e, t) {
  function y(e) {
    return a.get().isPluginlessEnabledInCurrentBrowser() && !a.get().isPluginlessCallingSupported() && s.sendWindowsUpdateFallbackMessage(e), Promise.resolve(e);
  }
  function b(e, t) {
    e.audioService.callId._set(t.convoCallId);
  }
  function w(e) {
    e.audioService.callId._set(null);
  }
  function E(e, t) {
    var n = t || p.callDisconnectionReason.Terminated;
    d.handleParticipantLeavingStateTransition(e.selfParticipant, n);
  }
  function S(e) {
    return a.get().isPluginlessCallingSupported() && (e.autoCall() || e._autoCallingService.callId()) && e.selfParticipant.audio.state.reason !== p.callDisconnectionReason.OutOfBrowserCall ? (e.selfParticipant.audio.state.reason = p.callDisconnectionReason.OutOfBrowserCall, e.selfParticipant.video.state.reason = p.callDisconnectionReason.OutOfBrowserCall, Promise.reject(new Error(i.ERRORS.P2P_FALLBACK))) : e._autoCallingService.handleAutoCall();
  }
  function x(e) {
    return e.selfParticipant.audio.state.reason !== p.callDisconnectionReason.OutOfBrowserCall && a.get().isPluginlessCallingSupported() && e.activeModalities.audio() && !e._ngcJoinUrl ? (e.selfParticipant.audio.state.reason = p.callDisconnectionReason.OutOfBrowserCall, e.selfParticipant.video.state.reason = p.callDisconnectionReason.OutOfBrowserCall, Promise.reject(new Error(i.ERRORS.P2P_FALLBACK))) : Promise.resolve(e);
  }
  function T(e, t) {
    return new Promise(function (n, r) {
      e.selfParticipant.audio.state.reason === p.callDisconnectionReason.OutOfBrowserCall ? (W(e), Promise.all([
        e.audioService._checkPluginBasedCapabilitiesSupport(),
        e.videoService._checkPluginBasedCapabilitiesSupport()
      ]).then(function () {
        r(t);
      }, function () {
        r(t);
      }), E(e, p.callDisconnectionReason.OutOfBrowserCall)) : (E(e, p.callDisconnectionReason.Failed), r(t));
    });
  }
  function N(e) {
    return new Promise(function (t, n) {
      l.get().canPlaceCall() ? (f.log("[Call controller] checkIfCanPlaceCall: true"), t(e)) : (f.log("[Call controller] checkIfCanPlaceCall: false"), n());
    });
  }
  function C(e) {
    return c.build(e, h.telemetry.calling.direction.OUTGOING), Promise.resolve(e);
  }
  function k(e) {
    return f.log("[Call Controller] Clean conversation state"), e._callData.resetCallData(), w(e), Promise.resolve(e);
  }
  function L(e, t) {
    return f.log("[Call Controller] Place call, withVideo", t), e._callHandler.placeCall(t);
  }
  function A(e) {
    var t = o.SoundLevelEventMode || i.SOUND_LEVEL_EVENT_MODE.Boolean, n = o.SoundLevelThreshold || i.SOUND_LEVEL_DEFAULT_THRESHOLD;
    e._callHandler.setSoundLevelEventMode({
      mode: t,
      threshold: n
    });
  }
  function O(e) {
    a.get().isPluginlessCallingSupported() && e._callData.hasIncomingP2PNotification() && !e._callData.hasIncomingNGCNotification() && (e.selfParticipant.audio.state.reason = p.callDisconnectionReason.OutOfBrowserCall, e.selfParticipant.video.state.reason = p.callDisconnectionReason.OutOfBrowserCall);
  }
  function M(e) {
    var t;
    return f.log("[Call Controller] Setup call"), e._callHandler ? (f.log("[Call Controller] Setup call, callHandler exists!"), Promise.resolve(e)) : (O(e), t = u.createCallHandler(e), e._setCallHandler(t), l.get().registerCall(e), R(e), U(e), A(e), Promise.resolve(e));
  }
  function _(e) {
    var t = [
      p.callConnectionState.Disconnected,
      p.callConnectionState.Notified
    ];
    return t.indexOf(e.selfParticipant.audio.state()) > -1;
  }
  function D(e) {
    return e.selfParticipant.audio.state() !== p.callConnectionState.Notified && (e.audioService._setMediaConnectionType(), a.get().isPluginlessCallingSupported() && !e.audioService._canHandlePluginlessCall() ? d.updateParticipantAudioVideoState(e.selfParticipant, p.callConnectionState.Notified, p.callDisconnectionReason.OutOfBrowserCall) : d.updateParticipantAudioVideoState(e.selfParticipant, p.callConnectionState.Notified)), Promise.resolve();
  }
  function P(e) {
    var t = e.conversationId, n;
    return I(e) && (t = e.conversationId.replace("8:#T/", "")), n = r.get().conversationsManager._getOrCreateConversation(t), n._callData.addIncomingCallPayload(e), r.get().conversationsManager.conversations.add(n), n;
  }
  function H(e) {
    return e.audioService._setMediaConnectionType(), M(e).then(e._callHandler.acknowledge).catch(function (t) {
      return f.log("[Call Controller] Failed to process incomingCall", t), q(e), Promise.reject();
    });
  }
  function B(e) {
    e.audioService.accept.enabled._set(!0);
    e.audioService.stop.enabled._set(!0);
    e.videoService.accept.enabled._set(!0);
    e.videoService.stop.enabled._set(!0);
  }
  function j(e, t) {
    var i = n.task();
    return r.get().personsAndGroupsManager.mePerson.capabilities.audio.get().then(e.audioService._checkPluginBasedCapabilitiesSupport).then(function (n) {
      var i = g.callingAllowed, s = r.get().personsAndGroupsManager.mePerson.capabilities.audio;
      l.get().canProcessIncomingCall(t.conversationId) || (f.log("[Call Controller] Call Register is not allowing calls. Ignoring incoming call"), i = g.ignore);
      if (!s() || !n && !e._callData.hasIncomingNGCNotification())
        f.log("[Call Controller] Calling is not supported because:", s.reason), F(s.reason) || F(e.audioService.accept.enabled.reason) ? (f.log("[Call Controller] Notify Only"), i = g.notifyOnly) : (f.log("[Call Controller] Ignoring call"), i = g.ignore);
      return s() && !n && e._callData.hasIncomingNGCNotification() && !e.audioService._hasPSTNParticipants() && B(e), e._callData.isGroupIncomingCall() && !o.isFeatureOn(h.featureFlags.GVC_JOINING) && (f.log("[Call Controller] This is a group call, but the feature flag is off. Ignoring call"), i = g.ignore), a.get().isPluginlessCallingSupported() && e.audioService._hasPSTNParticipants() && !n && (f.log("[Call Controller] PSTN call in plugin-less env, no plugin installed, notify user"), i = g.notifyOnly), l.get().wasCallEnded(t) && (f.log("[Call Controller] This call was already ended/rejected, ignoring"), i = g.ignore), v.checkCallPolicySettings(e).then(function (e) {
        return e ? i : g.ignore;
      });
    }).then(function (e) {
      f.log("[Call Controller] Incoming call policy is ", e);
      i.resolve(e);
    }).catch(function () {
      i.resolve(g.ignore);
    }), i.promise;
  }
  function F(e) {
    switch (e) {
    case p.callingNotSupportedReasons.PluginNotInstalled:
      return !0;
    case p.callingNotSupportedReasons.OSNotSupported:
      return !0;
    case p.callingNotSupportedReasons.BrowserNotSupported:
      return !0;
    }
    return !1;
  }
  function I(e) {
    return e.conversationId !== "8:" + e.callerId;
  }
  function q(e) {
    f.log("[Call Controller] Calling unregister with", e.conversationId);
    l.get().unregisterCall(e, e._callData.getCallIdFromCurrentCall());
    e._callHandler && (e._callHandler.dispose(), e._callHandler = null);
    e._autoCallingService.reset(e.selfParticipant.audio.state.reason);
    k(e);
    e._callData.resetPluginCallState();
    z(e);
    w(e);
    c.dispose(e);
    m[e.conversationId] && (m[e.conversationId].dispose(), delete m[e.conversationId]);
  }
  function R(e) {
    function r(t, r, i) {
      f.log("[Call Controller] Audio state changed", t, r, i);
      i !== undefined && t === p.callConnectionState.Disconnected && (q(e), n.dispose());
    }
    var t = e.selfParticipant.audio.state, n = e.participants.subscribe();
    f.log("[Call Controller] subscribe to audio state");
    m[e.conversationId] = t.changed(r);
  }
  function U(e) {
    function n() {
      e._callHandler.dispose();
      c.dispose(e);
      t(!1);
    }
    var t = e.selfParticipant.audio._isFailedCall;
    t.once(!0, function () {
      l.get().unregisterCall(e);
      e._callHandler.cancelCall(e).then(n, n);
    });
  }
  function z(e) {
    if (!e.isGroupConversation()) {
      var t = e.participants(0);
      t.audio.endpoint(t.person.id());
    }
  }
  function W(e) {
    if (!a.get().isPluginlessCallingSupported() || e.audioService._hasPSTNParticipants())
      return;
    e.selfParticipant.audio.state.reason === p.callDisconnectionReason.OutOfBrowserCall && s.sendOutgoingP2PCallFallbackMessage(e);
  }
  function X(e) {
    y(e);
    if (!a.get().isPluginlessCallingSupported() || e.audioService._hasPSTNParticipants())
      return;
    e._callData.hasIncomingNGCNotification() || s.sendIncomingP2PCallFallbackMessage(e);
  }
  var n = e("jcafe-property-model"), r = e("jSkype/client"), i = e("constants/calling"), s = e("jSkype/modelHelpers/calling/fallbackMessageHelper"), o = e("jSkype/settings"), u = e("jSkype/services/callHandlerFactory"), a = e("utils/calling/callingStack"), f = e("jSkype/telemetry/logging/callingLogTracer").get(), l = e("jSkype/services/callRegister"), c = e("jSkype/telemetry/callInfoTelemetry"), h = e("constants/common"), p = e("swx-enums"), d = e("jSkype/modelHelpers/participantHelper"), v = e("jSkype/services/preferences/settingsUtils/privacySettingsUtil"), m = {}, g = {
      callingAllowed: 1,
      notifyOnly: 2,
      ignore: 3
    };
  t.placeCall = function (e, n) {
    return N(e).then(y).then(k).then(t.setupCall).then(x).then(S).then(C).then(L.bind(null, e, n)).catch(function (t) {
      return f.log("[Call Controller] Failed to process placeCall", t), T(e, t);
    });
  };
  t.handleIncoming = function (t) {
    var n = P(t);
    return l.get().registerCallIdMapping(n, t) ? j(n, t).then(function (e) {
      c.build(n, h.telemetry.calling.direction.INCOMING);
      switch (e) {
      case g.callingAllowed:
        return b(n, t), X(n), H(n);
      case g.notifyOnly:
        return b(n, t), X(n), D(n);
      case g.ignore:
        return n._callData.markIncomingPayloadsAsProcessed(t), Promise.resolve();
      }
      return Promise.reject();
    }) : (k(n), Promise.resolve());
  };
  t.cancelCall = function (t) {
    function n() {
      return t._callHandler ? t._callHandler.cancelCall(t) : Promise.resolve();
    }
    return f.log("[Call Controller] cancel call, audio cancellable", _(t)), _(t) ? n().then(function () {
      E(t, p.callDisconnectionReason.Canceled);
      q(t);
    }) : Promise.resolve();
  };
  t.endCall = function (e) {
    return e._callHandler ? e._callHandler.endCall() : (e.autoCall() && (f.log("[Call controller] No call handler, fake disconnect"), E(e)), Promise.resolve());
  };
  t.abortAutoCall = function (e) {
    E(e, p.callDisconnectionReason.AutoCallFailed);
  };
  t.setupCall = M;
});

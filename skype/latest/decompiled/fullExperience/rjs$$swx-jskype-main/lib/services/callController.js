(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/callController", [
      "require",
      "exports",
      "jcafe-property-model",
      "swx-jskype-internal-application-instance",
      "swx-constants",
      "../../lib/services/calling/callNotificationTimeout",
      "jskype-settings-instance",
      "swx-util-calling-stack",
      "../../lib/telemetry/logging/callingLogTracer",
      "../../lib/services/callRegister",
      "../../lib/telemetry/callInfoTelemetry",
      "swx-constants",
      "swx-enums",
      "../../lib/modelHelpers/calling/escalationHelper",
      "../../lib/modelHelpers/calling/participantHelper",
      "../../lib/services/preferences/settingsUtils/privacySettingsUtil"
    ], e);
}(function (e, t) {
  function S(e) {
    g = e;
  }
  function x(e) {
    var t;
    return m.log("[Call Controller] Setup call"), e._callHandler ? (m.log("[Call Controller] Setup call, callHandler exists!"), Promise.resolve(e)) : (t = g.createCallHandler(e), e._setCallHandler(t), f.get().registerCall(e), G(e), Y(e), Z(e), R(e), Promise.resolve(e));
  }
  function T(e, t) {
    return j(e).then(I).then(x).then(B).then(F).then(M.bind(null, e, t))["catch"](function (t) {
      return m.log("[Call Controller] Failed to process placeCall", t), H(e, h.callDisconnectionReason.Failed), Promise.reject(t);
    });
  }
  function N(e, t) {
    return x(e).then(function () {
      return e._callHandler.acceptCall(t);
    })["catch"](function (t) {
      return m.log("[Call Controller] Failed to acceptCall", t), Q(e), Promise.reject(undefined);
    });
  }
  function C(e) {
    if (f.get().wasCallEnded(e))
      return m.log("[Call Controller] This call was already ended/rejected, ignoring"), Promise.resolve();
    var t = W(e);
    return f.get().registerCallIdMapping(t, e) ? (s.observe(t, O.bind(null, t)), V(t, e).then(function (n) {
      l.build(t, c.COMMON.telemetry.calling.direction.INCOMING);
      switch (n) {
      case E.callingAllowed:
        return D(t, e), X(t);
      case E.notifyOnly:
        return D(t, e), z(t);
      case E.ignore:
        return s.clearTimeout(t), t._callData.markIncomingPayloadsAsProcessed(e), Promise.resolve();
      }
      return Promise.reject(undefined);
    })) : (I(t), Promise.resolve());
  }
  function k(e) {
    function t() {
      return e._callHandler ? e._callHandler.cancelCall(e) : Promise.resolve();
    }
    return m.log("[Call Controller] cancel call, audio cancellable", U(e)), U(e) ? t().then(function () {
      H(e, h.callDisconnectionReason.Canceled);
      Q(e);
    }) : Promise.resolve();
  }
  function L(e, t) {
    return e._callHandler ? e._callHandler.endCall(t) : (e.autoCall() && (m.log("[Call controller] No call handler, fake disconnect"), H(e)), Promise.resolve());
  }
  function A(e) {
    H(e, h.callDisconnectionReason.AutoCallFailed);
  }
  function O(e) {
    e.selfParticipant.audio.state() === h.callConnectionState.Notified && H(e, h.callDisconnectionReason.NotificationTimeout);
  }
  function M(e, t) {
    var n, r = new Promise(function (e, t) {
        n = t;
      });
    return b[e.conversationId] = { reject: n }, Promise.race([
      q(e, t),
      r
    ]);
  }
  function _(e) {
    if (b[e]) {
      try {
        b[e].reject(i.CALLING.ERRORS.CALL_ABORTED);
      } catch (t) {
        m.warn("[CallController] rejecting active call error", t);
      }
      delete b[e];
    }
  }
  function D(e, t) {
    e.audioService.callId._set(t.convoCallId);
  }
  function P(e) {
    e.audioService.callId._set(null);
  }
  function H(e, t) {
    var n = t || h.callDisconnectionReason.Terminated;
    d.handleParticipantLeavingStateTransition(e.selfParticipant, n);
  }
  function B(e) {
    return e._autoCallingService.handleAutoCall();
  }
  function j(e) {
    return new Promise(function (t, n) {
      f.get().canPlaceCall() ? (m.log("[Call controller] checkIfCanPlaceCall: true"), t(e)) : (m.log("[Call controller] checkIfCanPlaceCall: false"), n());
    });
  }
  function F(e) {
    return l.build(e, c.COMMON.telemetry.calling.direction.OUTGOING), Promise.resolve(e);
  }
  function I(e) {
    return m.log("[Call Controller] Clean conversation state"), e._callData.resetCallData(), P(e), Promise.resolve(e);
  }
  function q(e, t) {
    return m.log("[Call Controller] Place call, withVideo", t), e._callHandler.placeCall(t);
  }
  function R(e) {
    var t = o.SoundLevelEventMode || i.CALLING.SOUND_LEVEL_EVENT_MODE.Boolean, n = o.SoundLevelThreshold || i.CALLING.SOUND_LEVEL_DEFAULT_THRESHOLD;
    e._callHandler.setSoundLevelEventMode({
      mode: t,
      threshold: n
    });
  }
  function U(e) {
    var t = [
      h.callConnectionState.Disconnected,
      h.callConnectionState.Notified
    ];
    return t.indexOf(e.selfParticipant.audio.state()) > -1;
  }
  function z(e) {
    return e.selfParticipant.audio.state() !== h.callConnectionState.Notified && (e.audioService._setMediaConnectionType(), d.updateParticipantAudioVideoState(e.selfParticipant, h.callConnectionState.Notified)), Promise.resolve();
  }
  function W(e) {
    var t = e.conversationId;
    J(e) && (t = e.conversationId.replace("8:#T/", ""));
    var n = r.get().conversationsManager._getOrCreateConversation(t);
    return n._callData.addIncomingCallPayload(e), r.get().conversationsManager.conversations.add(n), n;
  }
  function X(e) {
    return e.audioService._setMediaConnectionType(), x(e).then(e._callHandler.acknowledge)["catch"](function (t) {
      throw m.log("[Call Controller] Failed to process incomingCall", t), Q(e), t;
    });
  }
  function V(e, t) {
    var i = n.task();
    return r.get().personsAndGroupsManager.mePerson.capabilities.audio.get().then(function () {
      var n = E.callingAllowed, i = r.get().personsAndGroupsManager.mePerson.capabilities.audio;
      return f.get().canProcessIncomingCall(t.conversationId) || (m.log("[Call Controller] Call Register is not allowing calls. Ignoring incoming call"), n = E.ignore), i() || (m.log("[Call Controller] Calling is not supported because:", i.reason), $(i.reason) || $(e.audioService.accept.enabled.reason) ? (m.log("[Call Controller] Notify Only"), n = E.notifyOnly) : (m.log("[Call Controller] Ignoring call"), n = E.ignore)), e._callData.isGroupIncomingCall() && !o.isFeatureOn(c.COMMON.featureFlags.GVC_JOINING) && (m.log("[Call Controller] This is a group call, but the feature flag is off. Ignoring call"), n = E.ignore), !o.isFeatureOn(c.COMMON.featureFlags.PLUGINLESS_PSTN_CALLING) && u.get().isPluginlessCallingSupported() && e.audioService._hasPSTNParticipants() && (m.log("[Call Controller] PSTN call in plugin-less env, no plugin installed, notify user"), n = E.notifyOnly), u.get().isPluginlessCallingSupported() && !e._callData.hasIncomingNGCNotification() && (m.log("[Call Controller] Incoming P2P calls are not supported on this platform"), n = E.ignore), f.get().wasCallEnded(t) && (m.log("[Call Controller] This call was already ended/rejected, ignoring"), n = E.ignore), v.checkCallPolicySettings(e).then(function (e) {
        return e ? n : E.ignore;
      });
    }).then(function (e) {
      m.log("[Call Controller] Incoming call policy is ", e);
      i.resolve(e);
    })["catch"](function () {
      i.resolve(E.ignore);
    }), i.promise;
  }
  function $(e) {
    switch (e) {
    case h.callingNotSupportedReasons.PluginNotInstalled:
    case h.callingNotSupportedReasons.PluginBlocked:
    case h.callingNotSupportedReasons.OSNotSupported:
    case h.callingNotSupportedReasons.BrowserNotSupported:
      return !0;
    default:
      return !1;
    }
  }
  function J(e) {
    return e.conversationId !== "8:" + e.callerId;
  }
  function K(e) {
    var t = e._internalCallTelemetry.getData();
    !e.isGroupConversation() && t && (m.log("[Call Controller] Internal telemetry", t), r.get()._telemetryManager.sendEvent(o.settings.telemetry.jSkypeTenantToken, c.COMMON.telemetry.calling.INTERNAL_PLUGIN_TELEMETRY, t));
    e._internalCallTelemetry.reset();
  }
  function Q(e) {
    _(e.conversationId);
    m.log("[Call Controller] Calling unregister with", e.conversationId);
    f.get().unregisterCall(e, e._callData.getCallIdFromCurrentCall());
    K(e);
    e._callHandler && (e._callHandler.dispose(), e._callHandler = null);
    e._autoCallingService.reset(e.selfParticipant.audio.state.reason);
    s.clearTimeout(e);
    I(e);
    e._callData.resetPluginCallState();
    et(e);
    P(e);
    l.dispose(e);
    y[e.conversationId] && (y[e.conversationId].dispose(), delete y[e.conversationId]);
    w && w.dispose();
  }
  function G(e) {
    function r(t, r, i) {
      m.log("[Call Controller] Audio state changed", t, r, i);
      i !== undefined && t === h.callConnectionState.Disconnected && (Q(e), n.dispose());
    }
    var t = e.selfParticipant.audio.state, n = e.participants.subscribe();
    m.log("[Call Controller] subscribe to audio state");
    y[e.conversationId] = t.changed(r);
  }
  function Y(e) {
    function n() {
      t(!1);
    }
    function r() {
      f.get().unregisterCall(e);
      e._callHandler.cancelCall(e).then(n, n);
    }
    var t = e.selfParticipant.audio._isFailedCall;
    t.once(!0, r);
  }
  function Z(e) {
    e.isGroupConversation() || (w = e.spawnedConversation.changed(function (t) {
      t && x(t).then(function () {
        r.get().conversationsManager.conversations.add(t);
        p.escalateCall(e, t);
        e.spawnedConversation._set(undefined);
      });
    }));
  }
  function et(e) {
    if (!e.isGroupConversation()) {
      var t = e.participants(0);
      t.audio.endpoint(t.person.id());
    }
  }
  var n = e("jcafe-property-model"), r = e("swx-jskype-internal-application-instance"), i = e("swx-constants"), s = e("../../lib/services/calling/callNotificationTimeout"), o = e("jskype-settings-instance"), u = e("swx-util-calling-stack"), a = e("../../lib/telemetry/logging/callingLogTracer"), f = e("../../lib/services/callRegister"), l = e("../../lib/telemetry/callInfoTelemetry"), c = e("swx-constants"), h = e("swx-enums"), p = e("../../lib/modelHelpers/calling/escalationHelper"), d = e("../../lib/modelHelpers/calling/participantHelper"), v = e("../../lib/services/preferences/settingsUtils/privacySettingsUtil"), m = a.get(), g, y = {}, b = {}, w, E = {
      callingAllowed: 1,
      notifyOnly: 2,
      ignore: 3
    };
  t.initialize = S;
  t.setupCall = x;
  t.placeCall = T;
  t.acceptCall = N;
  t.handleIncoming = C;
  t.cancelCall = k;
  t.endCall = L;
  t.abortAutoCall = A;
}));

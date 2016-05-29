define("jSkype/models/callingServiceBase", [
  "require",
  "jSkype/client",
  "browser/detect",
  "jSkype/settings",
  "jSkype/services/callController",
  "utils/calling/callingStack",
  "jSkype/services/callRegister",
  "constants/common",
  "swx-enums",
  "jSkype/services/calling/environmentInspector",
  "jSkype/modelHelpers/participantHelper",
  "jcafe-property-model",
  "jSkype/modelHelpers/propertyModelHelper",
  "jSkype/services/trouter/trouter"
], function (e) {
  function d(e, d) {
    function C() {
      return v._isCallWithP2PEndpoint() ? v._checkPluginBasedCapabilitiesSupport() : m[d ? "video" : "audio"].get();
    }
    function k() {
      g(!0);
      b(!0);
      y(!0);
    }
    function L(e) {
      g(!1, e);
      b(!1, e);
      y(!1, e);
    }
    function A(e) {
      g(!1, e);
    }
    function O() {
      return N;
    }
    function M() {
      e.isGroupConversation.once(!0, I);
    }
    function _(e) {
      e ? I() : g(!1);
    }
    function D() {
      o.get().canPlaceCall.changed(_);
    }
    function P() {
      m.audio.changed(I);
      m.video.changed(I);
    }
    function H() {
      e.participantsCount.changed(I);
    }
    function B() {
      e.activeModalities.audio.changed(I);
      e.activeModalities.video.changed(I);
    }
    function j() {
      s.get().isPluginlessCallingSupported() && p.trouterUrl.changed(I);
    }
    function F() {
      return n.getSystemInfo().osName === n.OPERATING_SYSTEMS.LINUX;
    }
    function I() {
      if (!x)
        return L(a.callingNotSupportedReasons.FeatureDisabled), !1;
      if (e.isGroupConversation() && !E)
        return L(a.callingNotSupportedReasons.FeatureDisabled), !1;
      if (O() && !S)
        return A(a.callingNotSupportedReasons.FeatureDisabled), !1;
      if (!T)
        return L(a.callingNotSupportedReasons.NotInConversation), !1;
      if (v._hasTooManyParticipants() && !v._activeConversationModality())
        return L(a.callingNotSupportedReasons.TooManyParticipants), !1;
      if (!m.audio())
        return L(m.audio.reason), !1;
      if (d && !m.video())
        return L(m.video.reason), !1;
      if (d && F())
        return L(a.callingNotSupportedReasons.FeatureDisabled), !1;
      if (!p.trouterUrl() && s.get().isPluginlessCallingSupported())
        return L(a.callingNotSupportedReasons.TrouterNotInitialized), !1;
      k();
      o.get().canPlaceCall() || g(!1);
    }
    function q() {
      I();
      x && (M(), D(), P(), H(), B(), j());
    }
    function R() {
      v.callStarted._set(new Date());
      s.get().isPluginlessCallingSupported() && !v._canHandlePluginlessCall() || v._isCallWithP2PEndpoint() ? l.updateParticipantAudioVideoState(e.selfParticipant, a.callConnectionState.Connecting, a.callDisconnectionReason.OutOfBrowserCall) : (l.updateParticipantsAudioVideoState(e, a.callConnectionState.Disconnected), l.updateParticipantAudioVideoState(e.selfParticipant, a.callConnectionState.Connecting));
    }
    var v = this, m = t.get().personsAndGroupsManager.mePerson.capabilities, g = c.property({
        get: C,
        value: !0
      }), y = c.property({
        get: C,
        value: !0
      }), b = c.property({
        get: C,
        value: !0
      }), w = c.property({ value: !0 }), E = r.isFeatureOn(u.featureFlags.GVC_OUTGOING), S = r.isFeatureOn(u.featureFlags.PSTN_ENABLED), x = r.isFeatureOn(u.featureFlags.CALLING), T = !0, N = !1;
    return v._setMediaConnectionType = function () {
      var t = a.mediaConnectionType.Unknown;
      v._canHandlePluginlessCall() ? t = a.mediaConnectionType.Pluginless : e._callData.isCurrentCallIncoming() && (t = e._callData.hasIncomingNGCNotification() ? a.mediaConnectionType.PluginBasedNGC : a.mediaConnectionType.PluginBasedP2P);
      e.mediaConnectionType(t);
    }, v._checkPluginBasedCapabilitiesSupport = function () {
      return f.checkForPluginBasedCallingSupport().then(function (e) {
        return o.get().canPlaceCall() && (g._set(e.isSupported, e.reason), y._set(e.isSupported, e.reason), b._set(e.isSupported, e.reason)), e.isSupported;
      });
    }, v._setPSTNParticipants = function (e) {
      N = e;
      I();
    }, v._hasPSTNParticipants = function () {
      return N;
    }, v._isCallWithP2PEndpoint = function () {
      return e.selfParticipant.audio.state.reason === a.callDisconnectionReason.OutOfBrowserCall;
    }, v._canHandlePluginlessCall = function () {
      var t = e._callData.isCurrentCallIncoming() && !e._callData.hasIncomingNGCNotification();
      return s.get().isPluginlessCallingSupported() ? v._isCallWithP2PEndpoint() ? !1 : t ? !1 : v._hasPSTNParticipants() ? !1 : !0 : !1;
    }, v._membershipChanged = function (e) {
      T = e;
      I();
    }, v._hasTooManyParticipants = function () {
      return !1;
    }, v._activeConversationModality = function () {
      return !1;
    }, v.callStarted = c.property({ readOnly: !0 }), v.sendDtmf = c.command(), v.start = h.createCommandWithSetter(function () {
      return v._setMediaConnectionType(), R(), i.placeCall(e, d);
    }, g), v.stop = c.command(function () {
      return l.updateParticipantAudioVideoState(e.selfParticipant, a.callConnectionState.Disconnecting, a.callDisconnectionReason.Terminated), i.endCall(e);
    }, y), v.accept = h.createCommandWithSetter(function () {
      return R(), e._callHandler.acceptCall(d);
    }, b), v.reject = c.command(function () {
      return e._callHandler ? e._callHandler.rejectCall() : (l.handleParticipantLeavingStateTransition(e.selfParticipant, a.callDisconnectionReason.Busy), l.handleRemoteParticipantsLeavingStateTransition(e.participants()), Promise.resolve());
    }, w), q(), this;
  }
  var t = e("jSkype/client"), n = e("browser/detect"), r = e("jSkype/settings"), i = e("jSkype/services/callController"), s = e("utils/calling/callingStack"), o = e("jSkype/services/callRegister"), u = e("constants/common"), a = e("swx-enums"), f = e("jSkype/services/calling/environmentInspector"), l = e("jSkype/modelHelpers/participantHelper"), c = e("jcafe-property-model"), h = e("jSkype/modelHelpers/propertyModelHelper"), p = e("jSkype/services/trouter/trouter");
  return d;
});

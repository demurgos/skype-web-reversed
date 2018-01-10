(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/callingServiceBase", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "swx-browser-detect",
      "jskype-settings-instance",
      "swx-enums",
      "jcafe-property-model",
      "swx-constants",
      "../../lib/services/callController",
      "swx-util-calling-stack",
      "../../lib/services/callRegister",
      "../../lib/utils/chat/conversation",
      "../../lib/modelHelpers/calling/participantHelper",
      "../../lib/modelHelpers/propertyModelHelper",
      "../../lib/services/trouter/trouter",
      "../../lib/services/calling/callTimeout"
    ], e);
}(function (e, t) {
  var n = e("swx-jskype-internal-application-instance"), r = e("swx-browser-detect"), i = e("jskype-settings-instance"), s = e("swx-enums"), o = e("jcafe-property-model"), u = e("swx-constants"), a = e("../../lib/services/callController"), f = e("swx-util-calling-stack"), l = e("../../lib/services/callRegister"), c = e("../../lib/utils/chat/conversation"), h = e("../../lib/modelHelpers/calling/participantHelper"), p = e("../../lib/modelHelpers/propertyModelHelper"), d = e("../../lib/services/trouter/trouter"), v = e("../../lib/services/calling/callTimeout"), m = function () {
      function e(e, t) {
        var r = this;
        this.meCapabilities = n.get().personsAndGroupsManager.mePerson.capabilities;
        this.startEnabled = o.property({ value: !0 });
        this.stopEnabled = o.property({ value: !0 });
        this.acceptEnabled = o.property({ value: !0 });
        this.rejectEnabled = o.property({ value: !0 });
        this.isGVCOutgoingEnabled = i.isFeatureOn(u.COMMON.featureFlags.GVC_OUTGOING);
        this.isGroupVideoChromeLinuxEnabled = i.isFeatureOn(u.COMMON.featureFlags.PLUGINLESS_GROUP_VIDEO_CALLING_CHROME_LINUX);
        this.isPSTNEnabled = i.isFeatureOn(u.COMMON.featureFlags.PSTN_ENABLED);
        this.isPluginlessPSTNEnabled = i.isFeatureOn(u.COMMON.featureFlags.PLUGINLESS_PSTN_CALLING);
        this.isCallingEnabled = i.isFeatureOn(u.COMMON.featureFlags.CALLING);
        this.iAmInConversation = !0;
        this.pstnParticipantInConversation = !1;
        this.callStarted = o.property({ readOnly: !0 });
        this.start = p.createCommandWithSetter(function () {
          return r._setMediaConnectionType(), r.resetDevicesPermission(), r.setCallToConnectingState(), r.startCallConnectTimeout(), a.placeCall(r.conversation, r.withVideo);
        }, this.startEnabled);
        this.stop = o.command(this.stopCall.bind(this), this.stopEnabled);
        this.accept = p.createCommandWithSetter(function () {
          return r.resetDevicesPermission(), r.setCallToConnectingState(), r.startCallConnectTimeout(), a.acceptCall(r.conversation, r.withVideo);
        }, this.acceptEnabled);
        this.reject = o.command(function () {
          return r.conversation._callHandler ? r.conversation._callHandler.rejectCall() : (h.handleParticipantLeavingStateTransition(r.conversation.selfParticipant, s.callDisconnectionReason.Busy), h.handleRemoteParticipantsLeavingStateTransition(r.conversation.participants()), Promise.resolve());
        }, this.rejectEnabled);
        this._setMediaConnectionType = function () {
          var e = s.mediaConnectionType.Unknown;
          r._canHandlePluginlessCall() ? e = s.mediaConnectionType.Pluginless : r.conversation._callData.isCurrentCallIncoming() && (e = r.conversation._callData.hasIncomingNGCNotification() ? s.mediaConnectionType.PluginBasedNGC : s.mediaConnectionType.PluginBasedP2P);
          r.conversation.mediaConnectionType(e);
        };
        this._setPSTNParticipants = function (e) {
          r.pstnParticipantInConversation = e;
          r.handleCallingCommands();
        };
        this._hasPSTNParticipants = function () {
          return r.pstnParticipantInConversation;
        };
        this._canHandlePluginlessCall = function () {
          var e = r.conversation._callData.isCurrentCallIncoming() && !r.conversation._callData.hasIncomingNGCNotification();
          return f.get().isPluginlessCallingSupported() ? e ? !1 : !r.isPluginlessPSTNEnabled && (r._hasPSTNParticipants() || c.isPstnOnlyConversation(r.conversation)) ? !1 : !0 : !1;
        };
        this._membershipChanged = function (e) {
          r.iAmInConversation = e;
          r.handleCallingCommands();
        };
        this.conversation = e;
        this.withVideo = t;
        this.setupCallingCommands();
      }
      return e.prototype.enableCallingCommand = function () {
        this.startEnabled(!0);
        this.acceptEnabled(!0);
        this.stopEnabled(!0);
      }, e.prototype.disableCallingCommand = function (e) {
        this.startEnabled(!1, e);
        this.acceptEnabled(!1, e);
        this.stopEnabled(!1, e);
      }, e.prototype.disableStartForPSTN = function (e) {
        this.startEnabled(!1, e);
      }, e.prototype.isPSTNConversation = function () {
        return this.pstnParticipantInConversation;
      }, e.prototype.subscribeToGroupConversation = function () {
        this.conversation.isGroupConversation.once(!0, this.handleCallingCommands.bind(this));
      }, e.prototype.handleCanPlaceCallChange = function (e) {
        e ? this.handleCallingCommands() : this.startEnabled(!1);
      }, e.prototype.subscribeToCallRegisterEvents = function () {
        l.get().canPlaceCall.changed(this.handleCanPlaceCallChange.bind(this));
      }, e.prototype.subscribeToMeAVCapabilities = function () {
        this.meCapabilities.audio.changed(this.handleCallingCommands.bind(this));
        this.meCapabilities.video.changed(this.handleCallingCommands.bind(this));
      }, e.prototype.subscribeToParticipantsCount = function () {
        this.conversation.participantsCount.changed(this.handleCallingCommands.bind(this));
      }, e.prototype.subscribeToActiveConversationAVModality = function () {
        this.conversation.activeModalities.audio.changed(this.handleCallingCommands.bind(this));
        this.conversation.activeModalities.video.changed(this.handleCallingCommands.bind(this));
      }, e.prototype.subscribeToTrouterUrl = function () {
        f.get().isPluginlessCallingSupported() && d.trouterUrl.changed(this.handleCallingCommands.bind(this));
      }, e.prototype.isChromeOnLinux = function () {
        return r["default"].getSystemInfo().osName === r["default"].OPERATING_SYSTEMS.LINUX && (r["default"].getBrowserInfo().browserName === r["default"].BROWSERS.CHROME || r["default"].getBrowserInfo().browserName === r["default"].BROWSERS.ELECTRON);
      }, e.prototype.handleCallingCommands = function () {
        if (!this.isCallingEnabled)
          return this.disableCallingCommand(s.callingNotSupportedReasons.FeatureDisabled), !1;
        if (this.conversation.isGroupConversation()) {
          if (!this.isGVCOutgoingEnabled)
            return this.disableCallingCommand(s.callingNotSupportedReasons.FeatureDisabled), !1;
          if (this.withVideo && this.isChromeOnLinux() && !this.isGroupVideoChromeLinuxEnabled)
            return this.disableCallingCommand(s.callingNotSupportedReasons.FeatureDisabled), !1;
        }
        return this.isPSTNConversation() && !this.isPSTNEnabled ? (this.disableStartForPSTN(s.callingNotSupportedReasons.FeatureDisabled), !1) : this.iAmInConversation ? this._hasTooManyParticipants() && !this._activeConversationModality() ? (this.disableCallingCommand(s.callingNotSupportedReasons.TooManyParticipants), !1) : this.meCapabilities.audio() ? this.withVideo && !this.meCapabilities.video() ? (this.disableCallingCommand(this.meCapabilities.video.reason), !1) : !d.trouterUrl() && f.get().isPluginlessCallingSupported() ? (this.disableCallingCommand(s.callingNotSupportedReasons.TrouterNotInitialized), !1) : (this.enableCallingCommand(), l.get().canPlaceCall() || this.startEnabled(!1), undefined) : (this.disableCallingCommand(this.meCapabilities.audio.reason), !1) : (this.disableCallingCommand(s.callingNotSupportedReasons.NotInConversation), !1);
      }, e.prototype.setupCallingCommands = function () {
        this.handleCallingCommands();
        this.isCallingEnabled && (this.subscribeToGroupConversation(), this.subscribeToCallRegisterEvents(), this.subscribeToMeAVCapabilities(), this.subscribeToParticipantsCount(), this.subscribeToActiveConversationAVModality(), this.subscribeToTrouterUrl());
      }, e.prototype.resetDevicesPermission = function () {
        n.get().devicesManager.mediaCapabilities.isMicrophoneEnabled._set(!0);
        n.get().devicesManager.mediaCapabilities.isCameraEnabled._set(!0);
      }, e.prototype.setCallToConnectingState = function () {
        this.callStarted._set(new Date());
        h.updateParticipantsAudioVideoState(this.conversation, s.callConnectionState.Disconnected);
        h.updateParticipantAudioVideoState(this.conversation.selfParticipant, s.callConnectionState.Connecting);
      }, e.prototype.startCallConnectTimeout = function () {
        var e = this;
        v.callStart(this.conversation, function () {
          e.stopCall(s.callDisconnectionReason.CallConnectTimeout);
        });
      }, e.prototype.stopCall = function (e) {
        var t = e || s.callDisconnectionReason.Terminated;
        return h.updateParticipantAudioVideoState(this.conversation.selfParticipant, s.callConnectionState.Disconnecting, t), a.endCall(this.conversation, t);
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = m;
}));

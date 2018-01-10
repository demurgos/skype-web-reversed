(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/outOfBrowser/outOfBrowserFacade", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "swx-browser-detect",
      "jskype-settings-instance",
      "swx-constants",
      "swx-enums",
      "../../../lib/services/outOfBrowser/extensionLifecycleFacade",
      "swx-constants",
      "swx-utils-common/lib/version"
    ], e);
}(function (e, t) {
  function c(e, t, n) {
    return new l(e, t, n);
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("swx-browser-detect"), i = e("jskype-settings-instance"), s = e("swx-constants"), o = e("swx-enums"), u = e("../../../lib/services/outOfBrowser/extensionLifecycleFacade"), a = e("swx-constants"), f = e("swx-utils-common/lib/version"), l = function () {
      function e(e, t, n) {
        var r = this;
        this.subscribedSettingsKey = s.COMMON.userSettings.preferences.SKYPE_VIDEO_CALLING_POLICY_SUPPORT;
        this.initialize = function () {
          return r.initializePromise || (r.extensionLifecycleFacade = u.build(r.shellAppPageUrl), r.extensionLifecycleFacade.onExtensionDisconnected(r.dispose.bind(r)), r.extensionLifecycleFacade.onShellAppWindowHidden(r.onShellAppWindowHidden.bind(r)), r.extensionLifecycleFacade.onShellAppCallEscalated(r.onShellAppCallEscalated.bind(r)), r.initializePromise = r.extensionLifecycleFacade.getVersion().then(r.onShellAppVersionReceived.bind(r))), r.initializePromise;
        };
        this.start = function (e) {
          return r.setActiveConversation(e.conversation), r.initialize().then(r.openShellApp.bind(r)).then(r.subscribeToSettingsChange.bind(r)).then(r.subscribeToTopicChange.bind(r)).then(r.subscibeToParticipantsAuthorizedChange.bind(r)).then(r.syncParticipants.bind(r)).then(function () {
            var t = Boolean(e.callHostId || e.accessToken), n = Boolean(e.conversation.autoCall()), i = e.conversation._autoCallingService.autoCallingMode(), s = e.conversation._autoCallingService.partnerId(), o = e.conversation._autoCallingService.callId();
            return r.sendCommand(a.OUT_OF_BROWSER.commands.START, {
              withVideo: e.withVideo,
              joinCall: t,
              autoCall: n,
              autoCallMode: i,
              autoCallPartnerId: s,
              autoCallId: o,
              callHostId: e.callHostId,
              accessToken: e.accessToken,
              endpoint: e.endpoint
            });
          });
        };
        this.joinCall = function (e) {
          return r.activeConversation || r.setActiveConversation(e.conversation), r.initialize().then(function () {
            var t = Boolean(e.callHostId || e.accessToken), n = Boolean(e.conversation.autoCall());
            return r.sendCommand(a.OUT_OF_BROWSER.commands.JOIN_CALL, {
              withVideo: e.withVideo,
              joinCall: t,
              autoCall: n,
              callHostId: e.callHostId,
              accessToken: e.accessToken,
              endpoint: e.endpoint
            });
          });
        };
        this.accept = function (e, t) {
          return r.setActiveConversation(e), r.initialize().then(r.openShellApp.bind(r)).then(r.subscribeToSettingsChange.bind(r)).then(r.subscribeToTopicChange.bind(r)).then(r.subscibeToParticipantsAuthorizedChange.bind(r)).then(r.syncParticipants.bind(r)).then(function () {
            return r.sendCommand(a.OUT_OF_BROWSER.commands.ACCEPT, {
              incomingCallData: e._callData.getUnprocessedIncomingCallPayloads(),
              withVideo: t
            });
          });
        };
        this.updateIncomingCallPayload = function (e) {
          return r.initialize().then(function () {
            return r.sendCommand(a.OUT_OF_BROWSER.commands.UPDATE_INCOMING_PAYLOAD, { incomingCallData: e._callData.getUnprocessedIncomingCallPayloads() });
          });
        };
        this.cancel = function () {
          return i.isFeatureOn(s.COMMON.featureFlags.PRELOAD_SHELL_APP) ? r.initialize().then(function (e) {
            return e.initializesAsHidden ? r.sendCommand(a.OUT_OF_BROWSER.commands.HIDE) : r.extensionLifecycleFacade.disconnect();
          }) : Promise.resolve();
        };
        this.stop = function () {
          return r.sendCommand(a.OUT_OF_BROWSER.commands.STOP);
        };
        this.reject = function (e) {
          return r.setActiveConversation(e), r.sendCommand(a.OUT_OF_BROWSER.commands.REJECT);
        };
        this.mute = function () {
          return r.sendCommand(a.OUT_OF_BROWSER.commands.MUTE);
        };
        this.unmute = function () {
          return r.sendCommand(a.OUT_OF_BROWSER.commands.UNMUTE);
        };
        this.requestCallInfo = function () {
          return r.activeConversation ? r.sendCommand(a.OUT_OF_BROWSER.commands.CALL_INFO) : Promise.reject(undefined);
        };
        this.updateSettings = function (e, t) {
          return r.sendCommand(a.OUT_OF_BROWSER.commands.SETTINGS_UPDATE, {
            settingsType: e,
            value: t
          });
        };
        this.dispose = function (e) {
          e = e || {};
          r.initShellAppPromise = null;
          r.initializePromise = null;
          r.extensionLifecycleFacade.onShellAppWindowHidden(null);
          r.extensionLifecycleFacade.onExtensionDisconnected(null);
          r.extensionLifecycleFacade.onShellAppCallEscalated(null);
          r.extensionLifecycleFacade.dispose();
          r.activeConversation && (r.activeConversation.topic.changed.off(r.onTopicChanged), r.activeConversation.selfParticipant.audio.state.changed.off(r.onActiveConversationStateChanged), r.activeConversation.selfParticipant.audio.state._set(o.callConnectionState.Disconnected));
          !e.preventReinitialisation && i.isFeatureOn(s.COMMON.featureFlags.PERSISTENT_SHELL_APP) && r.initialize();
          r.settingsSubscription && r.settingsSubscription.dispose();
          r.participantAuthorizeSubscription && r.participantAuthorizeSubscription.dispose();
        };
        this.onActiveConversationStateChanged = function (e, t, n) {
          n && e === o.callConnectionState.Disconnected && r.resetActiveConversation();
        };
        this.onTopicChanged = function (e) {
          return r.sendCommand(a.OUT_OF_BROWSER.commands.TOPIC_UPDATE, { topic: e });
        };
        this.onParticipantAuthorizedChanged = function (e) {
          return r.activeConversation ? r.sendCommand(a.OUT_OF_BROWSER.commands.PARTICIPANT_AUTHORIZE, { authorized: e }) : Promise.resolve();
        };
        this.onSettingsValueChanged = function (e) {
          r.updateSettings(r.subscribedSettingsKey, e);
        };
        this.shellAppPageUrl = e;
        this.environment = t;
        this.locale = n;
      }
      return e.prototype.initShellApp = function () {
        var e = this;
        return this.initShellAppPromise || (this.initShellAppPromise = n.get().signInManager._skypeToken().then(function (t) {
          return e.sendCommand(a.OUT_OF_BROWSER.commands.INIT, {
            token: t,
            tokenExpiration: n.get().signInManager._tokenExpiration / 1000,
            environment: e.environment,
            locale: e.locale
          });
        })), this.initShellAppPromise;
      }, e.prototype.openShellApp = function (e) {
        var t = this.initShellApp(), n = { shellAppHost: r["default"].getBrowserInfo().browserName };
        return e.initializesAsHidden && (t = t.then(this.sendCommand.bind(this, a.OUT_OF_BROWSER.commands.SHOW, n))), t;
      }, e.prototype.sendCommand = function (e, t) {
        var n = [
            a.OUT_OF_BROWSER.commands.JOIN_CALL,
            a.OUT_OF_BROWSER.commands.START,
            a.OUT_OF_BROWSER.commands.ACCEPT,
            a.OUT_OF_BROWSER.commands.STOP,
            a.OUT_OF_BROWSER.commands.REJECT,
            a.OUT_OF_BROWSER.commands.MUTE,
            a.OUT_OF_BROWSER.commands.UNMUTE,
            a.OUT_OF_BROWSER.commands.CALL_INFO,
            a.OUT_OF_BROWSER.commands.TOPIC_UPDATE,
            a.OUT_OF_BROWSER.commands.SYNC_PARTICIPANTS,
            a.OUT_OF_BROWSER.commands.PARTICIPANT_AUTHORIZE
          ], r = n.indexOf(e) >= 0;
        return t = t || {}, r && (t.conversationId = this.activeConversation.conversationId), this.extensionLifecycleFacade.getMessagingChannel().then(function (n) {
          return n.sendCommand(e, t);
        });
      }, e.prototype.setActiveConversation = function (e) {
        this.activeConversation = e;
        this.activeConversation.selfParticipant.audio.state.changed(this.onActiveConversationStateChanged);
      }, e.prototype.onShellAppVersionReceived = function (e) {
        function c() {
          t({
            version: e,
            initializesAsHidden: o
          });
        }
        var t, n = f.parse(e), r = f.parse(a.OUT_OF_BROWSER.shellAppPreloadEnabledVersion), o = n.compareTo(r) >= 0, u = o && i.isFeatureOn(s.COMMON.featureFlags.PRELOAD_SHELL_APP), l = new Promise(function (e) {
            t = e;
          });
        return u ? this.initShellApp().then(c) : c(), l;
      }, e.prototype.onShellAppWindowHidden = function () {
        if (i.isFeatureOn(s.COMMON.featureFlags.PERSISTENT_SHELL_APP))
          return;
        this.dispose();
      }, e.prototype.resetActiveConversation = function () {
        this.activeConversation && (this.activeConversation.topic.changed.off(this.onTopicChanged), this.activeConversation.selfParticipant.audio.state.changed.off(this.onActiveConversationStateChanged), this.activeConversation = null);
      }, e.prototype.moveConversation = function (e, t) {
        e.spawnedConversation._set(t);
        this.resetActiveConversation();
        this.setActiveConversation(t);
        window.setTimeout(this.subscribeToTopicChange.bind(this), a.OUT_OF_BROWSER.ESCALATION_TOPIC_SUBSCRIPTION_DELAY);
      }, e.prototype.onShellAppCallEscalated = function (e) {
        var t = this, r = n.get().conversationsManager.conversations(e.oldConversationId), i = n.get().conversationsManager.conversations(e.newConversationId);
        if (!i)
          var s = n.get().conversationsManager.conversations.added(function (n) {
            n.conversationId === e.newConversationId && (t.moveConversation(r, n), s.dispose());
          });
        else
          this.moveConversation(r, i);
      }, e.prototype.subscribeToTopicChange = function () {
        this.activeConversation.topic.changed(this.onTopicChanged);
      }, e.prototype.subscibeToParticipantsAuthorizedChange = function () {
        this.activeConversation.isGroupConversation() || (this.participantAuthorizeSubscription = this.activeConversation.participants()[0].person._authorization.changed(this.onParticipantAuthorizedChanged));
      }, e.prototype.syncParticipants = function () {
        if (!this.activeConversation.isGroupConversation())
          return undefined;
        var e = this.activeConversation.participants().map(function (e) {
          return e.person.id();
        });
        return this.sendCommand(a.OUT_OF_BROWSER.commands.SYNC_PARTICIPANTS, { participantsData: e });
      }, e.prototype.subscribeToSettingsChange = function () {
        if (!i.isFeatureOn(s.COMMON.featureFlags.SKYPE_VIDEO_CALLING_POLICY_SUPPORT))
          return;
        this.settingsSubscription || (this.settingsSubscription = n.get().personsAndGroupsManager.mePerson.preferences(this.subscribedSettingsKey).value.changed(this.onSettingsValueChanged));
      }, e;
    }();
  t.OutOfBrowserFacade = l;
  t.build = c;
}));

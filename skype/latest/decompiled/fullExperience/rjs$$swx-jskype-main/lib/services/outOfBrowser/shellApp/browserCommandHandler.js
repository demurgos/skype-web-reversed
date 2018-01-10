(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/outOfBrowser/shellApp/browserCommandHandler", [
      "require",
      "exports",
      "jcafe-property-model",
      "swx-constants",
      "../../../../lib/telemetry/logging/callingLogTracer",
      "../../../../lib/services/callController",
      "../../../../lib/services/callRegister",
      "../../../../lib/modelHelpers/calling/deviceHelper",
      "../../../../lib/modelHelpers/calling/pstnEventsHandler",
      "../../../../lib/services/outOfBrowser/shellApp/pstnEventsDispatcher",
      "swx-jskype-internal-application-instance",
      "jskype-settings-instance",
      "../../../../lib/modelHelpers/calling/participantHelper",
      "swx-enums",
      "swx-constants",
      "../../../../lib/services/outOfBrowser/extension",
      "swx-browser-globals"
    ], e);
}(function (e, t) {
  function b(e) {
    return new y(e);
  }
  var n = e("jcafe-property-model"), r = e("swx-constants"), i = e("../../../../lib/telemetry/logging/callingLogTracer"), s = e("../../../../lib/services/callController"), o = e("../../../../lib/services/callRegister"), u = e("../../../../lib/modelHelpers/calling/deviceHelper"), a = e("../../../../lib/modelHelpers/calling/pstnEventsHandler"), f = e("../../../../lib/services/outOfBrowser/shellApp/pstnEventsDispatcher"), l = e("swx-jskype-internal-application-instance"), c = e("jskype-settings-instance"), h = e("../../../../lib/modelHelpers/calling/participantHelper"), p = e("swx-enums"), d = e("swx-constants"), v = e("../../../../lib/services/outOfBrowser/extension"), m = e("swx-browser-globals"), g = i.get(), y = function () {
      function e(e) {
        var t = this;
        this.isPstnEnabled = c.isFeatureOn(d.COMMON.featureFlags.PSTN_ENABLED);
        this.handlers = {
          show: this.showHandler.bind(this),
          hide: this.hideHandler.bind(this),
          start: this.startHandler.bind(this),
          joinCall: this.joinCallHandler.bind(this),
          accept: this.acceptHandler.bind(this),
          updateIncomingCallPayload: this.updateIncomingCallPayload.bind(this),
          mute: this.createMuteHandler(!0),
          unmute: this.createMuteHandler(!1),
          stop: this.stopHandler.bind(this),
          reject: this.rejectHandler.bind(this),
          callInfo: this.callInfoHandler.bind(this),
          contactsData: this.contactsDataHandler.bind(this),
          topicUpdate: this.topicUpdateHandler.bind(this),
          syncParticipants: this.syncParticipantsHandler.bind(this),
          participantAuthorize: this.participantAuthorizeHandler.bind(this),
          settings: this.settingsHandler.bind(this)
        };
        this.onShellAppClosing = function () {
          var e = o.get().activeCalls(), n = !1;
          return e.length === 0 && (n = !0), t.clearContactsPolling(), e.forEach(function (e) {
            e.selfParticipant.audio.state() === p.callConnectionState.Disconnected ? n = !0 : e.audioService.stop();
          }), n;
        };
        this.messagingChannel = e;
        this.pstnEventHandler = a.build(new f["default"](e));
        e.registerCommandHandler(r.OUT_OF_BROWSER.commands.SHOW, this.handlers.show);
        e.registerCommandHandler(r.OUT_OF_BROWSER.commands.HIDE, this.handlers.hide);
        e.registerCommandHandler(r.OUT_OF_BROWSER.commands.START, this.handlers.start);
        e.registerCommandHandler(r.OUT_OF_BROWSER.commands.JOIN_CALL, this.handlers.joinCall);
        e.registerCommandHandler(r.OUT_OF_BROWSER.commands.ACCEPT, this.handlers.accept);
        e.registerCommandHandler(r.OUT_OF_BROWSER.commands.UPDATE_INCOMING_PAYLOAD, this.handlers.updateIncomingCallPayload);
        e.registerCommandHandler(r.OUT_OF_BROWSER.commands.MUTE, this.handlers.mute);
        e.registerCommandHandler(r.OUT_OF_BROWSER.commands.UNMUTE, this.handlers.unmute);
        e.registerCommandHandler(r.OUT_OF_BROWSER.commands.STOP, this.handlers.stop);
        e.registerCommandHandler(r.OUT_OF_BROWSER.commands.REJECT, this.handlers.reject);
        e.registerCommandHandler(r.OUT_OF_BROWSER.commands.CALL_INFO, this.handlers.callInfo);
        e.registerCommandHandler(r.OUT_OF_BROWSER.commands.CONTACTS_DATA_RESPONSE, this.handlers.contactsData);
        e.registerCommandHandler(r.OUT_OF_BROWSER.commands.TOPIC_UPDATE, this.handlers.topicUpdate);
        e.registerCommandHandler(r.OUT_OF_BROWSER.commands.SYNC_PARTICIPANTS, this.handlers.syncParticipants);
        e.registerCommandHandler(r.OUT_OF_BROWSER.commands.PARTICIPANT_AUTHORIZE, this.handlers.participantAuthorize);
        e.registerCommandHandler(r.OUT_OF_BROWSER.commands.SETTINGS_UPDATE, this.handlers.settings);
      }
      return e.prototype.topicUpdateHandler = function (e) {
        var t = this;
        return this.waitForConversationSync().then(function () {
          if (e.conversationId && e.topic) {
            var n = t.getConversation(e.conversationId);
            n.topic._set(e.topic);
          }
        });
      }, e.prototype.syncParticipantsHandler = function (e) {
        var t = this;
        return this.waitForConversationSync().then(function () {
          if (e.conversationId && e.participantsData)
            try {
              var n = t.getConversation(e.conversationId), r = n.participants().filter(function (t) {
                  return e.participantsData.indexOf(t.person.id()) < 0;
                });
              r.forEach(function (e) {
                n._removeParticipant(e.person);
              });
            } catch (i) {
              g.warn("Unable to sync participants");
            }
        });
      }, e.prototype.participantAuthorizeHandler = function (e) {
        var t = this;
        return this.waitForConversationSync().then(function () {
          var n = t.getConversation(e.conversationId);
          n.participants()[0].person._authorization._set(e.authorized);
        });
      }, e.prototype.contactsDataHandler = function (e) {
        return e.contactsData && l.get().personsAndGroupsManager.all.persons().forEach(function (t) {
          try {
            e.contactsData[t.id()] && t.status._set(e.contactsData[t.id()].status);
          } catch (n) {
            g.warn("Unable to apply contact data");
          }
        }), this.isContactsDataPollingEnabled && (this.contactsDataPollInterval = m.getWindow().setTimeout(this.pollForContats.bind(this), c.settings.shellApp.contactPollingInterval)), Promise.resolve();
      }, e.prototype.clearContactsPolling = function () {
        this.contactsDataPollInterval && m.getWindow().clearTimeout(this.contactsDataPollInterval);
        this.contactsDataPollInterval = null;
        this.isContactsDataPollingEnabled = !1;
      }, e.prototype.pollForContats = function () {
        this.messagingChannel.sendCommand({
          name: r.OUT_OF_BROWSER.commands.CONTACTS_DATA_REQUEST,
          type: r.OUT_OF_BROWSER.commandTypes.REQUEST
        });
      }, e.prototype.showHandler = function (e) {
        var t = this;
        l.get()._telemetryManager.setCommonProperty("shellAppHost", e.shellAppHost);
        var n = function () {
            g.log("[BrowserCommandHelper] creating hidePromise");
            s.shellAppInfo.hidePromise = new Promise(function (e, t) {
              if (s.shellAppInfo.hidePromise || s.shellAppInfo.hidePromiseResolve) {
                t("Previous shellApp visibility session is not resolved");
                return;
              }
              s.shellAppInfo.hidePromiseResolve = e;
              s.setTimeout(i, 100);
            }).then(function () {
              s.shellAppInfo.hidePromise = null;
              s.shellAppInfo.hidePromiseResolve = null;
              g.log("[BrowserCommandHelper] hidePromise resolved");
            });
          }, i = function () {
            var e = c.isFeatureOn(d.COMMON.featureFlags.CALLING_FULL_SCREEN_ENABLED) ? 1 : v.extensionConstants.SHELL_APP_SIZE_FACTOR, n = {
                width: s.screen.width / e,
                height: s.screen.height / e
              }, i = s.shellApp;
            i.invoke(r.OUT_OF_BROWSER.shellAppMethods.ShowWindow, n);
            i.addEventListener(r.OUT_OF_BROWSER.shellAppEvents.WindowClosing, t.onShellAppClosing);
            c.isFeatureOn(d.COMMON.featureFlags.GVC_LOCAL_ESCALATION) && (t.isContactsDataPollingEnabled = !0, t.pollForContats());
          }, s = m.getWindow();
        return s.shellAppInfo.hidePromise ? s.shellAppInfo.hidePromise.then(n) : (n(), Promise.resolve());
      }, e.prototype.hideHandler = function () {
        var e = m.getWindow();
        return e.shellApp.removeEventListener(r.OUT_OF_BROWSER.shellAppEvents.WindowClosing, this.onShellAppClosing), e.shellApp.invoke(r.OUT_OF_BROWSER.shellAppMethods.HideWindow), this.clearContactsPolling(), n.task().resolve().promise;
      }, e.prototype.joinCallHandler = function (e) {
        var t = this;
        return this.waitForConversationSync().then(function () {
          var n = t.getConversation(e.conversationId);
          return e.joinCall ? n._setCanJoinCall(!0, e.callHostId, { AccessToken: e.accessToken }) : n._setCanJoinCall(!1), n._autoCallingService.shellAppCanJoin(!0), Promise.resolve();
        });
      }, e.prototype.startHandler = function (e) {
        var t = this;
        return g.log("[BrowserCommandHelper] startHandler", e), this.waitForConversationSync().then(function () {
          g.log("[BrowserCommandHelper] startHandler, conversation synced", e.conversationId);
          var n = t.getConversation(e.conversationId), r = t.getCallingService(n, e.withVideo);
          return t.isPstnEnabled && t.isOneToOnePstnConversation(e, n) && n.participants(0).audio.endpoint(e.endpoint), h.updateParticipantsAudioVideoState(n, p.callConnectionState.Disconnected), t.pstnEventHandler.subscribeToConversation(n), e.autoCall ? n._autoCallingService.setupAutoCalling(e.autoCallMode, e.autoCallPartnerId, e.autoCallId) : e.joinCall ? n._setCanJoinCall(!0, e.callHostId, { AccessToken: e.accessToken }) : n._setCanJoinCall(!1), t.subscribeToConversationStates(n), r.start();
        });
      }, e.prototype.acceptHandler = function (e) {
        var t = this;
        return g.log("[BrowserCommandHelper] acceptHandler", e), this.waitForConversationSync().then(function () {
          var r = t.getConversation(e.conversationId), i = t.getCallingService(r, e.withVideo), o = n.task(), u, a;
          g.log("[BrowserCommandHelper] acceptHandler, conversation synced", e.conversationId);
          var f = function () {
              i.accept();
              o.resolve();
            }, l = function (e) {
              e !== p.callDisconnectionReason.CallEscalated && t.closeShellApp();
            }, c = function (e, t, n) {
              n && e === p.callConnectionState.Disconnected && (o.promise.state() === "pending" && (o.reject(t), l(t)), u && u.dispose(), a && a.dispose());
            };
          return t.subscribeToConversationStates(r), e.incomingCallData.length || g.log("[BrowserCommandHandler] acceptHandler, incoming call payload already processed"), u = r.selfParticipant.audio.state.once(p.callConnectionState.Notified, f), a = r.selfParticipant.audio.state.changed(c), e.incomingCallData.forEach(function (e) {
            s.handleIncoming(e)["catch"](o.reject.bind(o));
          }), o.promise;
        });
      }, e.prototype.updateIncomingCallPayload = function (e) {
        return this.waitForConversationSync().then(function () {
          return e.incomingCallData.forEach(function (e) {
            s.handleIncoming(e);
          }), Promise.resolve();
        });
      }, e.prototype.createMuteHandler = function (e) {
        var t = this;
        return function (n) {
          var r = t.getConversation(n.conversationId);
          return r.selfParticipant.audio.isMuted.set(e);
        };
      }, e.prototype.closeShellApp = function () {
        var e = m.getWindow();
        this.clearContactsPolling();
        e.shellAppInfo.supportsPreloading ? e.shellApp.invoke(r.OUT_OF_BROWSER.shellAppMethods.HideWindow) : e.shellApp.invoke(r.OUT_OF_BROWSER.shellAppMethods.CloseWindow);
      }, e.prototype.stopHandler = function (e) {
        var t = m.getWindow();
        t.shellApp.removeEventListener(r.OUT_OF_BROWSER.shellAppEvents.WindowClosing, this.onShellAppClosing);
        var n = this.getConversation(e.conversationId);
        return this.pstnEventHandler.dispose(), n.audioService.stop();
      }, e.prototype.rejectHandler = function (e) {
        var t = this.getConversation(e.conversationId);
        return t._callHandler.rejectCall();
      }, e.prototype.callInfoHandler = function (e) {
        var t = this.getConversation(e.conversationId);
        return t._callHandler ? t._callHandler.requestCallInfo() : Promise.reject(undefined);
      }, e.prototype.waitForConversationSync = function () {
        return l.get().conversationsManager._conversationsSynced.promise;
      }, e.prototype.isOneToOnePstnConversation = function (e, t) {
        return e.endpoint && e.endpoint !== t.conversationId && !t.isGroupConversation();
      }, e.prototype.subscribeToConversationStates = function (e) {
        var t = this, n = [], i = function (n, i, s, o) {
            if (!o)
              return;
            t.messagingChannel.sendCommand({
              name: r.OUT_OF_BROWSER.commands.UPDATE_PARTICIPANT_STATE,
              type: r.OUT_OF_BROWSER.commandTypes.REQUEST,
              data: {
                state: i,
                conversationId: e.conversationId,
                personId: n,
                reason: s
              }
            });
          }, s = function (e) {
            n.push(e.audio.state.changed(i.bind(null, e.person.id())));
          }, o = function (i, h, d) {
            if (!d)
              return;
            if (i === p.callConnectionState.Notified)
              return;
            i === p.callConnectionState.Disconnecting && l.get().devicesManager._initializedDevices && (u.isSpeakerAvailable() ? u.isMicrophoneAvailable() || (h = p.callDisconnectionReason.MissingMicrophone) : h = p.callDisconnectionReason.MissingSpeaker);
            i === p.callConnectionState.Disconnected && (e.selfParticipant.audio.state.changed.off(o), e.selfParticipant.audio.isMuted.changed.off(a), e.spawnedConversation.changed.off(f), e._callData.pluginCallInfo.changed.off(c), n.forEach(function (e) {
              e.dispose();
            }), e.participants.added.off(s));
            if (h === p.callDisconnectionReason.CallEscalated)
              return;
            t.messagingChannel.sendCommand({
              name: r.OUT_OF_BROWSER.commands.CHANGE_STATE,
              type: r.OUT_OF_BROWSER.commandTypes.REQUEST,
              data: {
                state: i,
                conversationId: e.conversationId,
                reason: h
              }
            });
          }, a = function (n) {
            var i;
            if (n === undefined)
              return;
            n ? i = r.OUT_OF_BROWSER.commands.MUTE : i = r.OUT_OF_BROWSER.commands.UNMUTE;
            t.messagingChannel.sendCommand({
              name: i,
              type: r.OUT_OF_BROWSER.commandTypes.REQUEST,
              data: { conversationId: e.conversationId }
            });
          }, f = function (n) {
            t.messagingChannel.sendCommand({
              name: r.OUT_OF_BROWSER.commands.ESCALATE_CONVERSATION,
              type: r.OUT_OF_BROWSER.commandTypes.REQUEST,
              data: {
                newConversationId: n.conversationId,
                oldConversationId: e.conversationId
              }
            });
            t.subscribeToConversationStates(n);
          }, c = function () {
            t.messagingChannel.sendCommand({
              name: r.OUT_OF_BROWSER.commands.CALL_INFO,
              type: r.OUT_OF_BROWSER.commandTypes.REQUEST,
              data: {
                conversationId: e.conversationId,
                messageBody: e._callData.pluginCallInfo()
              }
            });
          };
        e.selfParticipant.audio.state.changed(o);
        e.participants.added(s);
        e.selfParticipant.audio.isMuted.changed(a);
        e.spawnedConversation.changed(f);
        e._callData.pluginCallInfo.changed(c);
      }, e.prototype.getConversation = function (e) {
        var t = l.get().conversationsManager._getOrCreateConversation(e);
        return l.get().conversationsManager.conversations.add(t), t;
      }, e.prototype.getCallingService = function (e, t) {
        var n;
        return t ? n = e.videoService : n = e.audioService, n;
      }, e.prototype.settingsHandler = function (e) {
        var t = e.settingsType, n = e.value;
        l.get().personsAndGroupsManager.mePerson.preferences(t).value.set(n);
      }, e;
    }();
  t.BrowserCommandHandler = y;
  t.build = b;
}));

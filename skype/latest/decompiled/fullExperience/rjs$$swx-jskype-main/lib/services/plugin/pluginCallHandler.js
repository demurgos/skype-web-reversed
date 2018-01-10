(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/plugin/pluginCallHandler", [
      "require",
      "exports",
      "jskype-settings-instance",
      "swx-constants",
      "swx-constants",
      "../../../lib/utils/chat/conversation",
      "swx-enums",
      "../../../lib/telemetry/logging/callingLogTracer",
      "jcafe-property-model",
      "./pluginLifecycleFacade",
      "../../../lib/modelHelpers/calling/participantHelper",
      "swx-utils-common",
      "swx-browser-globals"
    ], e);
}(function (e, t) {
  function v() {
    return n.isFeatureOn(r.COMMON.featureFlags.PRELOAD_PLUGIN) ? f.initialize() : undefined;
  }
  function m(e) {
    return new d(e);
  }
  var n = e("jskype-settings-instance"), r = e("swx-constants"), i = e("swx-constants"), s = e("../../../lib/utils/chat/conversation"), o = e("swx-enums"), u = e("../../../lib/telemetry/logging/callingLogTracer"), a = e("jcafe-property-model"), f = e("./pluginLifecycleFacade"), l = e("../../../lib/modelHelpers/calling/participantHelper"), c = e("swx-utils-common"), h = e("swx-browser-globals"), p = u.get(), d = function () {
      function e(e) {
        var t = this;
        this.callEnded = !1;
        this.wasAcknowledged = !1;
        this.wasAcceptPromiseFulfilled = !1;
        this.isAttachingLocalVideo = !1;
        this.isDetachingLocalVideo = !1;
        this.localVideoOperationPromise = c.settablePromise.build();
        this.isPSTNEnabled = n.isFeatureOn(r.COMMON.featureFlags.PSTN_ENABLED);
        this.startVideoOnChannel = function (e) {
          t.conversation.selfParticipant.video.channels.added.off(t.startVideoOnChannel);
          e.isStarted() || (t.startVideoSubscription = e.isStarted.set.enabled.once(!0, function () {
            e.isStarted.set(!0);
          }));
        };
        this.placeCall = function (e) {
          return t.resetLocalPreviewState(), p.log("[PluginCallHandler] place call", e), f.createPlugin().then(function (n) {
            var r = t.getParticipantIdentities(t.conversation), i = [t.conversation.conversationId];
            p.log("[PluginCallHandler] placing call, plugin ready");
            p.log("[PluginCallHandler] isGroupConversation", t.conversation.isGroupConversation());
            p.log("[PluginCallHandler] autoCall", t.conversation.autoCall());
            p.log("[PluginCallHandler] activeModalities.audio", t.conversation.activeModalities.audio());
            if (t.callEnded) {
              p.log("[PluginCallHandler] call was already ended, ignoring");
              return;
            }
            t.conversation.isGroupConversation() ? t.conversation.autoCall() ? t.handleAutoCall(n) : t.conversation.activeModalities.audio() ? t.joinConversation(n) : n.skypeCore.placeCall(i, r, t.getVideoState()) : (t.conversation._internalCallTelemetry.setCallDirection("outgoing"), t.conversation._internalCallTelemetry.recordStep("placeCall"), n.skypeCore.placeCall(i, r, t.getVideoState()));
            e && t.enableVideoWhenAvailable();
          });
        };
        this.acknowledge = function () {
          return t.wasAcknowledged = !0, f.createPlugin().then(function (e) {
            p.log("[PluginCallHandler:acknowledge]");
            t.conversation._internalCallTelemetry.setCallDirection("incoming");
            t.conversation.selfParticipant.audio.state() === o.callConnectionState.Notified ? (p.log("[PluginCallHandler:acknowledge] state is Notified, do not pass payload to plugin"), t.conversation._callData.markAllIncomingPayloadsAsProcessed()) : t.conversation._callData.pluginRingingForMe() ? (p.log("[PluginCallHandler:acknowledge] plugin already ringing, updating state to Notified"), t.conversation._callData.pluginRingingForMe(!1), l.updateParticipantAudioVideoState(t.conversation.selfParticipant, o.callConnectionState.Notified), t.conversation._callData.markAllIncomingPayloadsAsProcessed()) : t.conversation.selfParticipant.audio.state() === o.callConnectionState.Disconnected && (p.log("[PluginCallHandler:acknowledge] processing incoming call"), t.conversation._internalCallTelemetry.recordStep("acknowledge"), t.processIncomingPayloads(e), t.conversation._callData.pluginAwaitCall(!0));
          });
        };
        this.setSoundLevelEventMode = function (e) {
          return new Promise(function (n, r) {
            function i(t) {
              t.skypeCore.setSoundLevelEventMode(e, n, r);
            }
            f.createPlugin().then(i, t.getPluginCreationFailureHandler(r));
          });
        };
        this.acceptCall = function (e) {
          var n = function (n) {
            t.conversation._internalCallTelemetry.recordStep("acceptCall");
            n.skypeCore.acceptCall(t.getConversationId(), t.getVideoState());
            e && t.enableVideoWhenAvailable();
          };
          return t.resetLocalPreviewState(), t.wasAcknowledged ? f.createPlugin().then(n) : (t.acceptCallPromise = c.settablePromise.build(), f.createPlugin().then(function (e) {
            var r = function () {
              t.wasAcceptPromiseFulfilled || (n(e), t.acceptCallPromise.resolve(), t.wasAcceptPromiseFulfilled = !0);
            };
            t.processIncomingPayloads(e);
            t.pluginRingingForMeSubscription = t.conversation._callData.pluginRingingForMe.once(!0, r);
            t.pluginOthersAreLiveSubscription = t.conversation._callData.pluginOthersAreLive.once(!0, r);
          })["catch"](function () {
            t.acceptCallPromise.reject();
            t.wasAcceptPromiseFulfilled = !0;
          }), t.acceptCallPromise);
        };
        this.rejectCall = function () {
          return t.disposeSubscription(t.joinSubscription), f.createPlugin().then(function (e) {
            t.conversation._internalCallTelemetry.recordStep("rejectCall");
            e.skypeCore.rejectCall(t.getConversationId());
            t.disconnectAllParticipants(o.callDisconnectionReason.Busy);
          })["catch"](t.disconnectAllParticipants.bind(t, o.callDisconnectionReason.Busy));
        };
        this.extendCall = function (e) {
          return f.createPlugin().then(function (t) {
            t.skypeCore.extendCall(e);
          });
        };
        this.endCall = function (e) {
          t.callEnded = !0;
          t.disposeSubscription(t.joinSubscription);
          var n = function (n) {
              t.conversation._internalCallTelemetry.recordStep("concludeCall");
              n.skypeCore.concludeCall();
              t.disconnectAllParticipants(e);
            }, r = f.createPlugin().then(n)["catch"](t.disconnectAllParticipants.bind(t));
          return r;
        };
        this.cancelCall = function () {
          t.disposeSubscription(t.joinSubscription);
          var e = a.task();
          return f.createPlugin().then(function (n) {
            return t.conversation._internalCallTelemetry.recordStep("cancelCall"), n.skypeCore.forgetCall(t.conversation._callData.getFirstPayload().convoCallId, e.resolve.bind(e), e.reject.bind(e)), e.promise;
          });
        };
        this.mute = function () {
          return t.toggleMute(!0);
        };
        this.unmute = function () {
          return t.toggleMute(!1);
        };
        this.sendDtmf = function (e) {
          var t = a.task();
          return f.createPlugin().then(function (n) {
            return n.skypeCore.sendDtmf(e, t.resolve.bind(t)), t.promise;
          });
        };
        this.startScreenSharing = function (e) {
          return t.isSelfParticipant(e) ? t.startSendingLocalVideo(i.CALLING.PLUGIN_MEDIA_TYPES.SCREEN_SHARING) : Promise.resolve(!0);
        };
        this.stopScreenSharing = function (e) {
          return t.isSelfParticipant(e) ? t.stopSendingLocalVideo(i.CALLING.PLUGIN_MEDIA_TYPES.SCREEN_SHARING) : Promise.resolve(!0);
        };
        this.attachParticipantVideo = function (e, n, r) {
          return t.isSelfParticipant(e) ? t.startSendingLocalVideo(r).then(function () {
            return t.attachLocalVideo(n);
          }) : t.showParticipantVideo(e, n, r);
        };
        this.detachParticipantVideo = function (e, n) {
          return t.isSelfParticipant(e) ? t.stopSendingLocalVideo(n).then(function () {
            return t.detachLocalVideo();
          }) : t.hideParticipantVideo(e, n);
        };
        this.requestCallInfo = function () {
          var e = a.task(), n = t.conversation._callData.oncePluginCallInfoReady(function () {
              h.getWindow().clearTimeout(r);
              e.resolve(t.conversation._callData.pluginCallInfo());
            }), r = h.getWindow().setTimeout(function () {
              n.dispose();
              e.reject("Call info request timeout");
            }, 5000);
          return f.createPlugin().then(function (t) {
            t.skypeCore.requestCallInfo(null, function () {
              n.dispose();
              h.getWindow().clearTimeout(r);
              e.reject("Failed to send command to plugin");
            });
          }), e.promise;
        };
        this.transferFrom = function (e) {
          return;
        };
        this.dispose = function () {
          t.canToggleMute(!1);
          t.toggleMuteTask = null;
          t.disposeSubscription(t.startVideoSubscription);
          t.disposeSubscription(t.joinSubscription);
          t.disposeSubscription(t.canMuteSubscription);
          t.disposeSubscription(t.pluginRingingForMeSubscription);
          t.disposeSubscription(t.pluginOthersAreLiveSubscription);
          t.disposeVideoChannelSubscription();
          t.callEscalated() || f.dispose(!1);
          t.acceptCallPromise && !t.wasAcceptPromiseFulfilled && t.acceptCallPromise.reject();
          t.conversation.mediaConnectionType(o.mediaConnectionType.Unknown);
        };
        this.conversation = e;
        this.canToggleMute = a.property({ value: e._callData.pluginRingingForMe() });
        this.localVideoOperationPromise.resolve();
      }
      return e.prototype.isPluginless = function () {
        return !1;
      }, e.prototype.processIncomingPayloads = function (e) {
        var t = this;
        this.conversation._callData.getUnprocessedIncomingCallPayloads().forEach(function (n) {
          p.log("[awaitCall] payload: ", n);
          e.skypeCore.awaitCall(n.evt, t.getConversationId(), n.convoCallId, n.nsp, n.body.gp);
        });
      }, e.prototype.resetLocalPreviewState = function () {
        this.isAttachingLocalVideo = !1;
        this.isDetachingLocalVideo = !1;
        this.localVideoOperationPromise = c.settablePromise.build();
        this.localVideoOperationPromise.resolve();
      }, e.prototype.disconnectAllParticipants = function (e) {
        l.handleParticipantLeavingStateTransition(this.conversation.selfParticipant, e);
        l.handleRemoteParticipantsLeavingStateTransition(this.conversation.participants());
      }, e.prototype.disposeSubscription = function (e) {
        e && e.dispose();
      }, e.prototype.handleConversationJoining = function (e) {
        p.log("[PluginCallHandler] handleConversationJoining", this.conversation.activeModalities.audio());
        this.conversation.activeModalities.audio() ? e.skypeCore.joinCall(this.conversation.conversationId, this.getVideoState(), this.conversation._callHostId, this.conversation._callPayload.AccessToken) : (this.updateSelfParticipantAVState(o.callConnectionState.Disconnecting, o.callDisconnectionReason.Terminated), this.updateSelfParticipantAVState(o.callConnectionState.Disconnected, o.callDisconnectionReason.Terminated));
      }, e.prototype.joinConversation = function (e) {
        p.log("[PluginCallHandler] join conversation, pluginOthersAreLive:", this.conversation._callData.pluginOthersAreLive());
        this.joinSubscription = this.conversation._callData.pluginOthersAreLive.once(!0, this.handleConversationJoining.bind(this, e));
      }, e.prototype.handleAutoCall = function (e) {
        p.log("[PluginCallHandler] handleAutoCall");
        e.skypeCore.goLive(this.conversation.conversationId, this.getVideoState());
      }, e.prototype.enableVideoWhenAvailable = function () {
        this.conversation.selfParticipant.video.channels.added(this.startVideoOnChannel);
      }, e.prototype.disposeVideoChannelSubscription = function () {
        this.conversation.selfParticipant.video.channels.added.off(this.startVideoOnChannel);
      }, e.prototype.getVideoState = function () {
        return this.isPSTNEnabled && s.isPstnOnlyConversation(this.conversation) ? !1 : this.conversation.selfParticipant.video.channels(0) ? this.conversation.selfParticipant.video.channels(0).isStarted() : !1;
      }, e.prototype.updateSelfParticipantAVState = function (e, t) {
        this.conversation.selfParticipant.audio.state._set(e, t);
        this.conversation.selfParticipant.video.state._set(e, t);
      }, e.prototype.pluginSkypeCoreToggleMic = function (e) {
        f.createPlugin().then(function (t) {
          t.skypeCore.muteMicrophone(e);
        }, this.logPluginCreationFailure);
      }, e.prototype.toggleMute = function (e) {
        return this.toggleMuteTask && this.toggleMuteTask.promise.state() === "pending" ? this.toggleMuteTask.promise : (this.toggleMuteTask = a.task(), this.canToggleMute() ? this.pluginSkypeCoreToggleMic(e) : this.canMuteSubscription = this.canToggleMute.once(!0, this.pluginSkypeCoreToggleMic.bind(this, e)), this.toggleMuteTask.promise);
      }, e.prototype.isSelfParticipant = function (e) {
        return this.conversation.selfParticipant.person.id() === e;
      }, e.prototype.updateLocalVideoStreamState = function (e) {
        this.conversation.selfParticipant.video.channels(0).stream.state._set(e);
      }, e.prototype.startSendingLocalVideo = function (e) {
        var t = this;
        return new Promise(function (n, r) {
          e === i.CALLING.PLUGIN_MEDIA_TYPES.VIDEO && (t.resetLocalPreviewState(), t.disposeVideoChannelSubscription());
          f.createPlugin().then(function (t) {
            t.videoManager.startSendingLocalVideo(e, n);
          }, t.getPluginCreationFailureHandler(r));
        });
      }, e.prototype.stopSendingLocalVideo = function (e) {
        var t = this;
        return this.resetLocalPreviewState(), new Promise(function (n, r) {
          if (t.callEscalated()) {
            n(!0);
            return;
          }
          var s, u = function () {
              t.updateLocalVideoStreamState(o.mediaStreamState.Stopped);
              n(!0);
            }, a = function () {
              n(!0);
            };
          e === i.CALLING.PLUGIN_MEDIA_TYPES.SCREEN_SHARING ? s = a : (t.disposeVideoChannelSubscription(), s = u);
          f.createPlugin().then(function (t) {
            t.videoManager.stopSendingLocalVideo(e, s);
          }, t.getPluginCreationFailureHandler(r));
        });
      }, e.prototype.attachLocalVideo = function (e) {
        var t = this;
        return this.isAttachingLocalVideo ? this.attachingLocalVideoPromise : (this.attachingLocalVideoPromise = c.settablePromise.build(), this.isAttachingLocalVideo = !0, this.localVideoOperationPromise.then(f.createPlugin).then(function (n) {
          t.localVideoOperationPromise = c.settablePromise.build();
          n.videoManager.showLocalPreview(e, t.conversation.conversationId, function () {
            t.conversation.selfParticipant.audio.state() === o.callConnectionState.Connecting && t.updateLocalVideoStreamState(o.mediaStreamState.Active);
            t.isAttachingLocalVideo = !1;
            t.attachingLocalVideoPromise.resolve();
            t.localVideoOperationPromise.resolve();
          });
        }, function (e) {
          t.isAttachingLocalVideo = !1;
          t.logPluginCreationFailure();
          t.attachingLocalVideoPromise.reject(e);
        }), this.attachingLocalVideoPromise);
      }, e.prototype.detachLocalVideo = function () {
        var e = this;
        return this.isDetachingLocalVideo ? this.detachingLocalVideoPromise : (this.detachingLocalVideoPromise = c.settablePromise.build(), this.isDetachingLocalVideo = !0, this.localVideoOperationPromise.then(f.createPlugin).then(function (t) {
          e.localVideoOperationPromise = c.settablePromise.build();
          t.videoManager.hideLocalPreview(e.conversation.conversationId, function () {
            e.isDetachingLocalVideo = !1;
            e.detachingLocalVideoPromise.resolve();
            e.localVideoOperationPromise.resolve();
          });
        }, function (t) {
          e.isDetachingLocalVideo = !1;
          e.logPluginCreationFailure();
          e.detachingLocalVideoPromise.reject(t);
        }), this.detachingLocalVideoPromise);
      }, e.prototype.showParticipantVideo = function (e, t, n) {
        var r = this;
        return new Promise(function (i, s) {
          f.createPlugin().then(function (r) {
            r.videoManager.showParticipant(e, t, n);
            i();
          }, r.getPluginCreationFailureHandler(s));
        });
      }, e.prototype.hideParticipantVideo = function (e, t) {
        var n = this;
        return new Promise(function (r, i) {
          f.createPlugin().then(function (i) {
            i.videoManager.hideParticipant(e, t, n.callEscalated());
            r(!0);
          }, n.getPluginCreationFailureHandler(i));
        });
      }, e.prototype.getConversationId = function () {
        var e = this.conversation.conversationId;
        return this.conversation.isGroupConversation() || (e = e.replace(/^\d+:/, "")), e;
      }, e.prototype.getParticipantIdentities = function (e) {
        if (!this.isPSTNEnabled)
          return undefined;
        var t = {};
        return e.participants().forEach(function (e) {
          var n = e.person.id(), r = e.audio.endpoint();
          n !== r && (t[n] = r);
        }), t;
      }, e.prototype.callEscalated = function () {
        var e = this.conversation.selfParticipant.audio.state;
        return e.reason === o.callDisconnectionReason.CallEscalated && (e() === o.callConnectionState.Disconnecting || e() === o.callConnectionState.Disconnected);
      }, e.prototype.logPluginCreationFailure = function (e) {
        this.isDetachingLocalVideo = !1;
        this.resetLocalPreviewState();
        p.log("[PluginCallHandler] Failed to create plugin:", e);
      }, e.prototype.getPluginCreationFailureHandler = function (e) {
        var t = this;
        return function (n) {
          t.logPluginCreationFailure(n);
          e && e(n);
        };
      }, e;
    }();
  t.PluginCallHandler = d;
  t.initialize = v;
  t.build = m;
}));

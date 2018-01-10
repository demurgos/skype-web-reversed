(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-web-calling/lib/callHandler", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "swx-enums",
      "swx-constants",
      "swx-constants",
      "jcafe-property-model",
      "swx-mri/lib/mriMaps",
      "swx-mri",
      "swx-jskype-main/lib/modelHelpers/calling/fallbackMessageHelper",
      "web-calling",
      "lodash-compat",
      "swx-jskype-main/lib/services/preferences/settingsUtils/privacySettingsUtil",
      "./callEndReasonMapping",
      "swx-jskype-main/lib/modelHelpers/personsAndGroupsHelper"
    ], e);
}(function (e, t) {
  var n = e("swx-jskype-internal-application-instance"), r = e("swx-enums"), i = e("swx-constants"), s = e("swx-constants"), o = e("jcafe-property-model"), u = e("swx-mri/lib/mriMaps"), a = e("swx-mri"), f = e("swx-jskype-main/lib/modelHelpers/calling/fallbackMessageHelper"), l = e("web-calling"), c = e("lodash-compat"), h = e("swx-jskype-main/lib/services/preferences/settingsUtils/privacySettingsUtil"), p = e("./callEndReasonMapping"), d = e("swx-jskype-main/lib/modelHelpers/personsAndGroupsHelper"), v = function () {
      function e(e, t) {
        var f = this;
        this._callRingingTask = o.task();
        this._rosterUpdatePromise = Promise.resolve();
        this._rosterUpdateSuspensionTask = null;
        this._wasConnected = !1;
        this._wasRinging = !1;
        this._endCallReason = "unknown";
        this._noVideoCapabilityMessageSent = !1;
        this._videoCompatibilityMessageSent = !1;
        this._noScreensharingCapabilityMessageSent = !1;
        this._noMicrophoneMessageSent = !1;
        this._explicitEndCallReason = null;
        this._localParticipantVideoStarted = !1;
        this._callEventSubscriptions = [];
        this._participantEventSubscriptions = {};
        this._participantActive = {};
        this._newConversationThreadId = null;
        this._setCallToConnectedState = function () {
          f._wasConnected = !0;
          f._updateParticipantAVState(f.conversation.selfParticipant, r.callConnectionState.Connected);
        };
        this._isAnyParticipantConnectedToCall = function () {
          return f._webCallingCall.participants.some(function (e) {
            return e.state === l.ParticipantState.Connected;
          });
        };
        this.placeCall = function (e) {
          if (f.conversation.isGroupConversation() && f.conversation.activeModalities.audio() && f.conversation._ngcJoinUrl)
            return f._logger.log("placeCall : joining existing conversation"), f._webCallingCall.join({
              conversationUrl: f.conversation._ngcJoinUrl,
              conversationId: f.conversation.conversationId,
              conversationType: null,
              groupCallInitiator: null,
              expiration: null,
              status: null,
              isHostless: null
            }, e);
          var t = f.conversation.participants;
          return t().forEach(function (e) {
            var t = a.getKey(e.audio.endpoint(), e.person._type()), n = e.person.displayName();
            f._logger.log("addParticipant", e.person.id());
            f._updateParticipantAVState(e, r.callConnectionState.Connecting);
            f._callRingingTask.promise.then(function () {
              f._updateParticipantAVState(e, r.callConnectionState.Ringing);
            });
            f._webCallingCall.addParticipantForInitiation(t, n)["catch"](function (t) {
              f._updateParticipantAVState(e, r.callConnectionState.Disconnected, r.callDisconnectionReason.Refused);
            });
          }), f._webCallingCall.start({
            ringOthers: !f.conversation._autoCall,
            withVideo: e
          });
        };
        this.acknowledge = function () {
          if (f.conversation._callData.wasNGCPayloadProcessed())
            return f._logger.log("acknowledge, NGC payload was processed"), Promise.resolve();
          var e = f.conversation._callData.getIncomingNGCPayload();
          return f._webCallingCall.acknowledge(e);
        };
        this.acceptCall = function (e) {
          return f._webCallingCall.accept(e);
        };
        this.extendCall = function (e, t) {
          f._logger.log("extendCall with", e);
          var n = e.map(function (e) {
            var t = d.getPerson(e), n = a.getKey(t.id(), t._type()), r = t.displayName();
            return {
              id: n,
              displayName: r
            };
          });
          return t && (f._newConversationThreadId = t), f._webCallingCall.addParticipantsWhileConnected(n, t)["catch"](function (e) {
            f._logger.log("participant could not be added to the call", e);
          });
        };
        this.rejectCall = function () {
          return f._logger.log("rejectCall"), f._endCallReason = "rejectCall", f._rejectAllPendingTasks(new Error("call rejected by user")), f._webCallingCall.reject()["catch"](function (e) {
            f._updateParticipantAVState(f.conversation.selfParticipant, r.callConnectionState.Disconnected, r.callDisconnectionReason.Failed);
            f._logger.error("rejectCall failed", "error:", e);
          });
        };
        this.cancelCall = function () {
          return f._logger.log("cancelCall"), f._endCallReason = "cancelCall", f._rejectAllPendingTasks(new Error("call canceled by user")), f._wasRinging ? Promise.resolve() : f._webCallingCall.stop()["catch"](function (e) {
            f._updateParticipantAVState(f.conversation.selfParticipant, r.callConnectionState.Disconnected, r.callDisconnectionReason.Failed);
            f._logger.error("cancelCall failed", "error:", e);
          });
        };
        this.endCall = function (e) {
          return f._logger.log("endCall"), f._endCallReason = "endCall", f._explicitEndCallReason = e, f._rejectAllPendingTasks(new Error("call ended by user")), f._webCallingCall.stop()["catch"](function (e) {
            f._updateParticipantAVState(f.conversation.selfParticipant, r.callConnectionState.Disconnected, r.callDisconnectionReason.Failed);
            f._logger.error("endCall failed", "error:", e);
          });
        };
        this.dispose = function () {
          f.conversation.selfParticipant.audio.state.reason === r.callDisconnectionReason.CallEscalated ? f._logger.log("Call was escalated, do not dispose") : (f._disposeWebCallingEventSubscriptions(), f._logger.log("dispose"), f._rejectAllPendingTasks(new Error("terminated")), f._stopAllParticipantStreams()["catch"](function () {
          }), f._selectedCameraSubscription.dispose(), f._selectedMicrophoneSubscription.dispose(), f._camerasSubscription.dispose(), f.conversation.mediaConnectionType(r.mediaConnectionType.Unknown));
        };
        this.setSoundLevelEventMode = function (e) {
          return f._logger.log("setSoundLevelEventMode", "options:", e), o.task().resolve(null).promise;
        };
        this.mute = function () {
          return f._webCallingCall.mute();
        };
        this.unmute = function () {
          return f._webCallingCall.unmute();
        };
        this.sendDtmf = function (e) {
          return f._webCallingCall.sendDtmf(e);
        };
        this.startScreenSharing = function (e) {
          return Promise.reject("ScreenSharing not supported");
        };
        this.stopScreenSharing = function (e) {
          return Promise.reject("ScreenSharing not supported");
        };
        this.attachParticipantVideo = function (e, t, n) {
          return f._logger.log("attachParticipantVideo", e, n, t, f._webCallingCall.hasVideoCapability(), f._isStreamRendering(e, n)), n != i.CALLING.PLUGIN_MEDIA_TYPES.VIDEO && n != i.CALLING.PLUGIN_MEDIA_TYPES.SCREEN_SHARING ? Promise.reject("unsupported mediatype") : f._webCallingCall.hasVideoCapability() && !f._isStreamRendering(e, n) ? f._startParticipantStream(e, n, { container: t })["catch"](function (e) {
            f._updateChannelStreamState(i.CALLING.PLUGIN_MEDIA_TYPES.VIDEO, f.conversation.selfParticipant, f._mapMediaStreamState(!1));
            f._logger.error("startParticipantStream failed", "error:", e);
          }) : Promise.resolve(!0);
        };
        this.detachParticipantVideo = function (e, t) {
          return f._logger.log("detachParticipantVideo", e, t), f._stopParticipantStream(e, t);
        };
        this.requestCallInfo = function () {
          f._logger.log("requestCallInfo");
          var e = o.task();
          if (f._webCallingCall.correlationId()) {
            var t = "\r\nCallInformation\r\n * CallId=" + f._webCallingCall.correlationId() + "\r\n" + " * Establishment Technology=NGC (plugin-free)";
            e.resolve(t);
          } else
            e.reject("CallInformation not available");
          return e.promise;
        };
        this.updateConversation = function (e) {
          f.conversation = e;
        };
        this._handleParticipantJoined = function (e) {
          f._logger.log("_handleParticipantJoined", e.id);
          !f._webCallingCall.isIncoming && !f._wasConnected && f._isAnyParticipantConnectedToCall() && f._setCallToConnectedState();
          f._rosterUpdatePromise = f._rosterUpdatePromise.then(function () {
            f._subscribeToParticipantAndStreamEvents(e);
            var t = f._getOrCreateParticipant(a.getId(e.id));
            f._syncParticipantState(t, e);
          });
        };
        this._handleParticipantUpdated = function (e) {
          f._logger.log("_handleParticipantUpdated", e.id);
          f._rosterUpdatePromise = f._rosterUpdatePromise.then(function () {
            var t = f._getParticipantById(a.getId(e.id));
            f._syncParticipantState(t, e);
          });
        };
        this._handleParticipantRemoved = function (e) {
          f._logger.log("_handleParticipantRemoved", e.id);
          f._rosterUpdatePromise = f._rosterUpdatePromise.then(function () {
            f._disposeParticipantSubscriptions(e.id);
            var t = f._getParticipantById(a.getId(e.id));
            t && (t.video._sourceId(0), t.audio._sourceId(0), t.screenSharing._sourceId(0), f._updateChannelStreamState(i.CALLING.PLUGIN_MEDIA_TYPES.VIDEO, t, r.mediaStreamState.Stopped), f._updateChannelStreamState(i.CALLING.PLUGIN_MEDIA_TYPES.SCREEN_SHARING, t, r.mediaStreamState.Stopped), f._updateParticipantAVState(t, r.callConnectionState.Disconnected));
          });
        };
        this._handleConversationUpdated = function (e) {
          f._logger.log("_handleConversationUpdated", "threadId:", e.threadId);
          f._newConversationThreadId = e.threadId;
        };
        this._handleCallStatusChanged = function (e) {
          f._logger.log("_handleCallStatusChanged", f._webCallingCall.state);
          f._webCallingCall.correlationId() && f.conversation.audioService.callId._set(f._webCallingCall.correlationId());
          f._webCallingCall.participantId && f.conversation._callData.ngcParticipantId(f._webCallingCall.participantId);
          f._webCallingCall.endpointId && f.conversation._callData.ngcEndpointId(f._webCallingCall.endpointId);
          switch (f._webCallingCall.state) {
          case l.CallState.Ringing:
            f._webCallingCall.isIncoming && (f._updateParticipantAVState(f.conversation.selfParticipant, r.callConnectionState.Notified), f._wasRinging = !0), f._callRingingTask.resolve();
            break;
          case l.CallState.Connected:
            f.conversation._callData.isHostless = f._webCallingCall.isHostlessCall, !f._webCallingCall.isIncoming && f._webCallingCall.isMultiParty() ? f._callRingingTask.resolve() : f._setCallToConnectedState();
            break;
          case l.CallState.Disconnected:
            f._handleCallTerminated(f._webCallingCall.terminatedReason, e);
          }
        };
        this.onTransferRequested = function (e) {
          return f._logger.log("onTransferRequested"), null;
        };
        this.conversation = t;
        var c = l.CSAcreateParticipant({
          displayName: t.selfParticipant.person.displayName(),
          id: a.getKey(t.selfParticipant.audio.endpoint(), t.selfParticipant.person._type())
        });
        this._webCallingCall = l.createCall(this.conversation.isGroupConversation() ? this.conversation.conversationId : undefined, this.conversation._ngcCorrelationId);
        this._subscribeToCallEvents();
        this._webCallingCall.initialize({
          selfParticipant: c,
          callbacks: {
            isRemoteClientLync: function () {
              return f.conversation.participants(0) && f.conversation.participants(0).person._type() === u.contactTypes.lync;
            },
            isRemotePersonAuthorized: function () {
              return f.conversation.participants(0) && f.conversation.participants(0).person._authorization() === s.PEOPLE.authorizationStates.AUTHORIZED;
            },
            isGroupConversation: function () {
              return f.conversation.isGroupConversation();
            }
          }
        });
        this._logger = e.getLogger().createChild("CallHandler", function () {
          return f._webCallingCall.correlationId();
        });
        this._logger.log("construct");
        this._selectedCameraSubscription = n.get().devicesManager.selectedCamera.changed(this._selectedDeviceChanged.bind(this));
        this._selectedMicrophoneSubscription = n.get().devicesManager.selectedMicrophone.changed(this._selectedDeviceChanged.bind(this));
        this._camerasSubscription = n.get().devicesManager.cameras.removed(this._cameraRemoved.bind(this));
        t.mediaConnectionType(r.mediaConnectionType.Pluginless);
      }
      return e.prototype._subscribeToCallEvents = function () {
        var e = this, t = function (t, n) {
            e._callEventSubscriptions.push(e._webCallingCall.on(t, n.bind(e)));
          };
        t(l.CallEvents.noMicrophoneAccess, this._handleNoMicrophoneAccess);
        t(l.CallEvents.localModalitiesConfigured, this._handleLocalModalitiesConfigured);
        t(l.CallEvents.mediaTypesOffered, this._handleMediaTypesOffered);
        t(l.CallEvents.activeSpeakersChanged, this._handleActiveSpeakersChanged);
        t(l.CallEvents.dominantSpeakersChanged, this._handleDominantSpeakersChanged);
        t(l.CallEvents.optimalVideoReceiversCountChanged, this._handleOptimalVideoReceiversCountChanged);
        t(l.CallEvents.localVideoStartedOrStopped, this._handleLocalVideoStartedOrStopped);
        t(l.CallEvents.localVideoSizeChanged, this._handleLocalVideoSizeChanged);
        t(l.CallEvents.conversationUpdated, this._handleConversationUpdated);
        t(l.CallEvents.callNegotiationFinished, this._handleCallNegotiationFinished);
        t(l.CallEvents.callStateChanged, this._handleCallStatusChanged);
        t(l.CallEvents.participantJoined, this._handleParticipantJoined);
        t(l.CallEvents.participantRemoved, this._handleParticipantRemoved);
        t(l.CallEvents.retargetStarted, this._handleRetargetStarted);
        t(l.CallEvents.retargetCompleted, this._handleRetargetCompleted);
        t(l.CallEvents.retargetAborted, this._handleRetargetAborted);
      }, e.prototype._subscribeToParticipantAndStreamEvents = function (e) {
        var t = this, n = function (n, r, i) {
            var s = n.type + "-" + r;
            t._participantEventSubscriptions[e.id][s] = n.on(r, i);
          };
        this._participantEventSubscriptions[e.id] || (this._participantEventSubscriptions[e.id] = {});
        this._participantEventSubscriptions[e.id][""] = e.changed(this._handleParticipantUpdated.bind(this));
        n(e.video, l.StreamEvents.videoSizeChanged, this._handleParticipantVideoSizeChanged.bind(this));
        n(e.screenShare, l.StreamEvents.videoSizeChanged, this._handleParticipantVideoSizeChanged.bind(this));
      }, e.prototype._disposeParticipantSubscriptions = function (e) {
        var t = this._participantEventSubscriptions[e];
        if (t) {
          for (var n in t)
            t[n].dispose();
          this._participantEventSubscriptions[e][""].dispose();
        }
        delete this._participantEventSubscriptions[e];
      }, e.prototype._disposeWebCallingEventSubscriptions = function () {
        this._callEventSubscriptions.forEach(function (e) {
          e.dispose();
        });
        this._callEventSubscriptions = [];
        for (var e in this._participantEventSubscriptions)
          this._disposeParticipantSubscriptions(e);
        this._participantEventSubscriptions = {};
      }, e.prototype._mapMediaStreamState = function (e) {
        return e ? r.mediaStreamState.Started : r.mediaStreamState.Stopped;
      }, e.prototype._rejectAllPendingTasks = function (e) {
        e.callHandlerTerminationInProgress = !0;
        var t = [
          this._callRingingTask,
          this._rosterUpdateSuspensionTask
        ];
        t.forEach(function (t) {
          t && t.promise.state() === "pending" && t.reject(e);
        });
      }, e.prototype._handleNoMicrophoneAccess = function () {
        this._noMicrophoneMessageSent || (this._noMicrophoneMessageSent = !0, f.sendMicrophoneAccessFallbackMessage(this.conversation));
      }, e.prototype._handleActiveSpeakersChanged = function (e) {
        var t = this;
        this.conversation.participants().forEach(function (n) {
          var r = e.indexOf(n.audio._sourceId()) !== -1, i = n.audio.isSpeaking();
          if (i !== r)
            return t._logger.log("SPEAKING status for", t._fmtParticipant(n), "to", r ? "active" : "inactive"), n.audio.isSpeaking._set(r);
        });
      }, e.prototype._handleDominantSpeakersChanged = function (e) {
        var t = this, n;
        e.some(function (e) {
          return n = c.find(t.conversation.participants(), function (t) {
            return t.audio._sourceId() === e;
          }), n;
        });
        if (!n)
          return;
        var r = this.conversation.videoService.activeSpeaker.participant;
        n && n !== r() && (this._logger.log("DOMINANT status for", this._fmtParticipant(n)), r() ? n.audio.importance = r().audio.importance + 1 : n.audio.importance = 1, r._set(n));
      }, e.prototype._handleOptimalVideoReceiversCountChanged = function (e) {
        this._logger.log("optimal video receiver count changed to", e);
        this.conversation.videoService.maxVideos.set(e);
      }, e.prototype._handleLocalVideoStartedOrStopped = function (e) {
        var t = this.conversation.selfParticipant.video.channels(0);
        t && t.isStarted.set._enabled(!0);
        this._updateChannelStreamState(i.CALLING.PLUGIN_MEDIA_TYPES.VIDEO, this.conversation.selfParticipant, this._mapMediaStreamState(e));
      }, e.prototype._handleLocalVideoSizeChanged = function (e) {
        var t = e.width > 0 && e.height > 0;
        t ? this._updateChannelStreamStateAndSize(i.CALLING.PLUGIN_MEDIA_TYPES.VIDEO, this.conversation.selfParticipant, r.mediaStreamState.Active, e.width, e.height) : this._participantActive[this.conversation.selfParticipant.person.id()] && this._updateChannelStreamState(i.CALLING.PLUGIN_MEDIA_TYPES.VIDEO, this.conversation.selfParticipant, r.mediaStreamState.Inactive);
        this._participantActive[this.conversation.selfParticipant.person.id()] = t;
      }, e.prototype._handleParticipantVideoSizeChanged = function (e) {
        var t = e.size.width > 0 && e.size.height > 0, n = this._getParticipantById(a.getId(e.participant.id)), i = this._getMediaTypeFromStreamType(e.type);
        t ? this._updateChannelStreamStateAndSize(i, n, r.mediaStreamState.Active, e.size.width, e.size.height) : this._participantActive[e.participant.id] && this._updateChannelStreamState(i, n, r.mediaStreamState.Inactive);
        this._participantActive[e.participant.id] = t;
      }, e.prototype._getMediaTypeFromStreamType = function (e) {
        switch (e) {
        case l.StreamType.Video:
          return i.CALLING.PLUGIN_MEDIA_TYPES.VIDEO;
        case l.StreamType.ScreenSharing:
          return i.CALLING.PLUGIN_MEDIA_TYPES.SCREEN_SHARING;
        }
        return this._logger.error("Unexpected stream type to map to media type!", e), "";
      }, e.prototype._handleCallTerminated = function (e, t) {
        t.remote && (this._endCallReason = "remoteTerminated");
        this._rejectAllPendingTasks(new Error("terminated"));
        var n = p.getCallEndReasons({
          reason: e,
          info: t,
          isIncoming: this._webCallingCall.isIncoming,
          wasConnected: this._wasConnected,
          oneToOne: !this._webCallingCall.isMultiParty() && this.conversation.participants(0),
          endCallReason: this._endCallReason,
          explicitEndCallReason: this._explicitEndCallReason
        });
        this._disconnectAllRemoteParticipantsFromCall(n.remote);
        this._updateParticipantAVState(this.conversation.selfParticipant, r.callConnectionState.Disconnected, n.local);
      }, e.prototype._handleCallNegotiationFinished = function (e) {
        var t = this, n = e.callNegotiationResult;
        if (n.isComplete) {
          if (!e.isMultiParty) {
            var r = this.conversation.participants(0), s = l.MediaAgentHelper.hasReceiveDirectionality(n.activeModalities.video), o = l.MediaAgentHelper.hasReceiveDirectionality(n.activeModalities.sharing);
            h.checkVideoPolicySettings(r).then(function (e) {
              s = e ? s : !1;
              o = e ? o : !1;
              t._updateChannelStreamState(i.CALLING.PLUGIN_MEDIA_TYPES.VIDEO, r, t._mapMediaStreamState(s));
              t._updateChannelStreamState(i.CALLING.PLUGIN_MEDIA_TYPES.SCREEN_SHARING, r, t._mapMediaStreamState(o));
            });
            if (this._webCallingCall.hasVideoCapability()) {
              var u = !0, a = l.MediaAgentHelper.hasSendDirectionality, f = l.MediaAgentHelper.hasReceiveDirectionality;
              n.initiator ? u = !a(n.offeredModalities.video) || a(n.activeModalities.video) : f(n.offeredModalities.video) ? u = !f(n.attemptedModalities.video) || f(n.activeModalities.video) : a(n.offeredModalities.video) && (u = !a(n.attemptedModalities.video) || a(n.activeModalities.video));
              !u && !this._webCallingCall.isNGCVoicemail() && (this._logger.warn("cannot negotiate incompatible video modality"), this._notifyVideoCompatibility());
            }
          }
          var c = l.MediaAgentHelper.hasSendDirectionality(n.activeModalities.video);
          this._updateChannelStreamState(i.CALLING.PLUGIN_MEDIA_TYPES.VIDEO, this.conversation.selfParticipant, this._mapMediaStreamState(c));
        }
      }, e.prototype._stopAllParticipantStreams = function () {
        var e = this, t = [];
        return this._webCallingCall.participants.forEach(function (n) {
          t.push(e._stopRemoteParticipantStream(n.id, i.CALLING.PLUGIN_MEDIA_TYPES.VIDEO));
          t.push(e._stopRemoteParticipantStream(n.id, i.CALLING.PLUGIN_MEDIA_TYPES.SCREEN_SHARING));
        }), t.push(this._stopSelfParticipantStream(i.CALLING.PLUGIN_MEDIA_TYPES.VIDEO)), t.push(this._stopSelfParticipantStream(i.CALLING.PLUGIN_MEDIA_TYPES.SCREEN_SHARING)), Promise.all(t);
      }, e.prototype._startParticipantStream = function (e, t, n) {
        var r = this;
        if (this._isSelfParticipant(e)) {
          switch (t) {
          case i.CALLING.PLUGIN_MEDIA_TYPES.VIDEO:
            return this._webCallingCall.setVideoContainer(n.container), this._webCallingCall.startVideo().then(function () {
              r._localParticipantVideoStarted = !0;
            })["catch"](function (e) {
              r._logger.error("failed to start preview video renderer", e);
              r._localParticipantVideoStarted = !1;
              r._updateChannelStreamState(t, r.conversation.selfParticipant, r._mapMediaStreamState(!1));
            });
          case i.CALLING.PLUGIN_MEDIA_TYPES.SCREEN_SHARING:
            return this._webCallingCall.startScreenSharing();
          }
          return Promise.reject("Unknown media type!");
        }
        var s = this._getRemoteParticipantStream(e, t);
        return s ? s.start(n) : (this._logger.error("WebCalling stream not found for start!"), Promise.reject("WebCalling stream not found for start!"));
      }, e.prototype._stopSelfParticipantStream = function (e) {
        var t = this;
        switch (e) {
        case i.CALLING.PLUGIN_MEDIA_TYPES.VIDEO:
          return this._webCallingCall.stopVideo().then(function () {
            t._localParticipantVideoStarted = !1;
          });
        case i.CALLING.PLUGIN_MEDIA_TYPES.SCREEN_SHARING:
          return this._webCallingCall.stopScreenSharing();
        }
        return Promise.resolve();
      }, e.prototype._stopRemoteParticipantStream = function (e, t) {
        var n = this._getRemoteParticipantStream(e, t);
        return n ? n.stop() : Promise.reject(new Error("WebCalling stream not found to stop"));
      }, e.prototype._stopParticipantStream = function (e, t) {
        return this._isSelfParticipant(e) ? this._stopSelfParticipantStream(t) : this._stopRemoteParticipantStream(e, t);
      }, e.prototype._isStreamRendering = function (e, t) {
        if (this._isSelfParticipant(e))
          return this._localParticipantVideoStarted;
        var n = this._getRemoteParticipantStream(e, t);
        return n ? n.state() === l.StreamState.Streaming : !1;
      }, e.prototype._getRemoteParticipantStream = function (e, t) {
        var n = this._getParticipantById(e);
        if (!n)
          return undefined;
        var r = a.getKey(n.audio.endpoint(), n.person._type()), s = c.find(this._webCallingCall.participants, function (e) {
            return e.id === r;
          });
        if (!s)
          return undefined;
        var o;
        switch (t) {
        case i.CALLING.PLUGIN_MEDIA_TYPES.VIDEO:
          o = s.video;
          break;
        case i.CALLING.PLUGIN_MEDIA_TYPES.SCREEN_SHARING:
          o = s.screenShare;
          break;
        default:
        }
        return o;
      }, e.prototype.isPluginless = function () {
        return !0;
      }, e._getCafeStreamState = function (e) {
        if (e)
          switch (e.state()) {
          case l.StreamState.None:
          case l.StreamState.Connecting:
            return r.mediaStreamState.Stopped;
          case l.StreamState.Available:
            return r.mediaStreamState.Started;
          case l.StreamState.StreamPreparing:
            return r.mediaStreamState.Inactive;
          case l.StreamState.Streaming:
            return r.mediaStreamState.Active;
          }
        return r.mediaStreamState.Stopped;
      }, e._getCafeParticipantState = function (e) {
        switch (e) {
        case l.ParticipantState.None:
          return r.callConnectionState.Disconnected;
        case l.ParticipantState.Disconnected:
          return r.callConnectionState.Disconnected;
        case l.ParticipantState.Connecting:
          return r.callConnectionState.Connecting;
        case l.ParticipantState.Connected:
          return r.callConnectionState.Connected;
        case l.ParticipantState.Ringing:
          return r.callConnectionState.Ringing;
        case l.ParticipantState.OnHold:
          return r.callConnectionState.Connected;
        }
        return r.callConnectionState.Disconnected;
      }, e.prototype._syncParticipantState = function (t, n) {
        n && t && (t.video._sourceId(n.video.id), t.audio._sourceId(n.audio.id), t.screenSharing._sourceId(n.screenShare.id), this._updateParticipantAVState(t, e._getCafeParticipantState(n.state)), this._checkSupportedMedia(l.StreamType.Video, t.video.state()) && this._updateChannelStreamState(i.CALLING.PLUGIN_MEDIA_TYPES.VIDEO, t, e._getCafeStreamState(n.video)), this._checkSupportedMedia(l.StreamType.ScreenSharing, n.screenShare.state()) && this._updateChannelStreamState(i.CALLING.PLUGIN_MEDIA_TYPES.SCREEN_SHARING, t, e._getCafeStreamState(n.screenShare)));
      }, e.prototype._handleRetargetStarted = function () {
        var e = this;
        this._logger.log("_handleRetargetStarted");
        this._rosterUpdateSuspensionTask = o.task();
        this._localParticipantVideoStarted = !1;
        this._rosterUpdatePromise = this._rosterUpdatePromise.then(function () {
          return e._rosterUpdateSuspensionTask.promise;
        })["catch"](function (t) {
          e._logger.log("roster update failed", t);
        });
        this._newConversationThreadId = this._newConversationThreadId ? this._newConversationThreadId : this._webCallingCall.threadId;
        this.conversation._setSpawnedConversation(this._newConversationThreadId);
        this._rosterUpdateSuspensionTask.resolve();
      }, e.prototype._handleRetargetCompleted = function () {
        this._logger.log("_handleRetargetCompleted");
      }, e.prototype._handleRetargetAborted = function () {
        this._logger.log("_handleRetargetAborted");
      }, e.prototype._disconnectAllRemoteParticipantsFromCall = function (e) {
        var t = this, n = this.conversation.participants, s = n.subscribe();
        n().forEach(function (n) {
          t._updateChannelStreamState(i.CALLING.PLUGIN_MEDIA_TYPES.VIDEO, n, r.mediaStreamState.Stopped);
          t._updateChannelStreamState(i.CALLING.PLUGIN_MEDIA_TYPES.SCREEN_SHARING, n, r.mediaStreamState.Stopped);
          t._updateParticipantAVState(n, r.callConnectionState.Disconnected, e);
        });
        s.dispose();
      }, e.prototype._handleLocalModalitiesConfigured = function (e) {
        l.MediaAgentHelper.hasSendDirectionality(e.video) && this._enableVideoWhenVideoChannelAdded();
      }, e.prototype._fmtParticipant = function (e) {
        return (this.conversation.selfParticipant === e ? "* " : "") + e.person.id();
      }, e.prototype._isSelfParticipant = function (e) {
        return this.conversation.selfParticipant.person.id() === e;
      }, e.prototype._getOrCreateParticipant = function (e) {
        return this._getParticipantById(e);
      }, e.prototype._getParticipantById = function (e) {
        return this._isSelfParticipant(e) ? this.conversation.selfParticipant : this._getParticipant(function (t) {
          return t.person.id() === e;
        });
      }, e.prototype._getParticipant = function (e) {
        var t = this.conversation.participants, n = t.subscribe(), r = null;
        return t().some(function (t) {
          return e(t) ? (r = t, !0) : undefined;
        }), n.dispose(), r;
      }, e.prototype._getChannelForMediaType = function (e, t) {
        switch (e) {
        case i.CALLING.PLUGIN_MEDIA_TYPES.VIDEO:
          return t.video.channels(0);
        case i.CALLING.PLUGIN_MEDIA_TYPES.SCREEN_SHARING:
          return t.screenSharing;
        default:
          this._logger.log("_getChannelForMediaType. Type does not exist: ", e);
        }
        return void 0;
      }, e.prototype._updateChannelStreamState = function (e, t, n) {
        var s = this._getChannelForMediaType(e, t);
        if (s) {
          var o = s.stream.state(), u = o === r.mediaStreamState.Active || o === r.mediaStreamState.Inactive;
          if (o === n || u && n === r.mediaStreamState.Started)
            return;
          this._logger.log("updateChannelStreamState", this._fmtParticipant(t), "type: ", e, " state:", o, "->", n);
          if (e === i.CALLING.PLUGIN_MEDIA_TYPES.VIDEO && !this._isSelfParticipant(t.person.id())) {
            var a = n !== r.mediaStreamState.Stopped;
            s.isVideoOn._set(a);
          }
          s.stream.state._set(n);
        }
      }, e.prototype._updateChannelStreamStateAndSize = function (e, t, n, r, i) {
        var s = this._getChannelForMediaType(e, t);
        if (s) {
          var o = s.stream.state();
          this._logger.log("updateChannelStreamStateAndSize", this._fmtParticipant(t), "type: ", e, "state:", o, "->", n, "size:", r, i);
          s.stream.state._set(n);
          s.stream.width._set(r);
          s.stream.height._set(i);
        }
      }, e.prototype._updateParticipantAVState = function (e, t, n) {
        var i = this, s = e.audio.state(), o = function (t, n, r) {
            return i._logger.log("updateParticipantAVState", i._fmtParticipant(e), "state:", t, "->", n, "reason", r), e.audio.state._set(n, r), e.video.state._set(n, r), e.screenSharing.state._set(n, r), n;
          };
        s === t || s === r.callConnectionState.Disconnected && t === r.callConnectionState.Disconnecting || s === r.callConnectionState.Connected && t === r.callConnectionState.Notified || s === r.callConnectionState.Connected && t === r.callConnectionState.Connecting || s === r.callConnectionState.Connected && t === r.callConnectionState.Ringing || s === r.callConnectionState.Ringing && t === r.callConnectionState.Connecting ? this._logger.log("updateParticipantAVState ignored, invalid states", this._fmtParticipant(e), "currentState:", s, "newState", t) : (t === r.callConnectionState.Disconnected && s !== r.callConnectionState.Disconnecting ? s = o(s, r.callConnectionState.Disconnecting, n) : t === r.callConnectionState.Connected && s !== r.callConnectionState.Connecting && s !== r.callConnectionState.Ringing ? s = o(s, r.callConnectionState.Connecting) : t === r.callConnectionState.Ringing && s !== r.callConnectionState.Connecting && (s = o(s, r.callConnectionState.Connecting)), o(s, t, n));
      }, e.prototype._enableVideoWhenVideoChannelAdded = function () {
        var e = this, t, n = this.conversation.selfParticipant, r = function (i) {
            t || (e._logger.log("enableVideoWhenVideoChannelAdded", e._fmtParticipant(n), "state:", i.stream.state(), "isStarted:", i.isStarted()), t = i.isStarted(!0), n.video.channels.added.off(r));
          };
        this._logger.log("enableVideoWhenVideoChannelAdded", this._fmtParticipant(n));
        n.video.channels.added(r);
      }, e.prototype._selectedDeviceChanged = function (e, t) {
        var n = this, r = function () {
            switch (n._webCallingCall.state) {
            case l.CallState.None:
            case l.CallState.Disconnecting:
            case l.CallState.Disconnected:
              return !1;
            default:
              return !0;
            }
          };
        r() && t === "UserSelection" && l.updateDeviceSelection();
      }, e.prototype._cameraRemoved = function (e) {
        var t = this.conversation.selfParticipant.video.channels(0);
        if (t && t.isStarted()) {
          var r = n.get().devicesManager;
          e.id() === r.selectedCamera().id();
        }
      }, e.prototype._checkVideoSupport = function () {
        return this._webCallingCall.hasVideoCapability() ? !0 : (this._noVideoCapabilityMessageSent || (this._logger.log("remote participant added video modality, reminding user of missing video capability"), this._webCallingCall.isMultiParty() ? f.sendNoVideoCapabilityMessage(this.conversation) : f.sendNoVideoCapabilityMessage(this.conversation), this._noVideoCapabilityMessageSent = !0), !1);
      }, e.prototype._notifyVideoCompatibility = function () {
        this._videoCompatibilityMessageSent || (f.sendVideoCompatibilityMessage(this.conversation), this._videoCompatibilityMessageSent = !0);
      }, e.prototype._checkScreensharingSupport = function () {
        return this._webCallingCall.hasScreensharingCapability() ? !0 : (this._noScreensharingCapabilityMessageSent || (this._logger.log("remote participant added screensharing modality, reminding user of missing screensharing capability"), f.sendScreenSharingFallbackMessage(this.conversation), this._noScreensharingCapabilityMessageSent = !0), !1);
      }, e.prototype._checkSupportedMedia = function (e, t) {
        if (t !== l.StreamState.None) {
          switch (e) {
          case l.StreamType.Audio:
            return !0;
          case l.StreamType.Video:
            return this._checkVideoSupport();
          case l.StreamType.ScreenSharing:
            return this._checkScreensharingSupport();
          }
          return !1;
        }
        return !0;
      }, e.prototype._handleMediaTypesOffered = function (e) {
        var t = this;
        e.isMultiParty || e.offeredMediaTypes.forEach(function (e) {
          t._checkSupportedMedia(e, l.StreamState.Available);
        });
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = v;
}));

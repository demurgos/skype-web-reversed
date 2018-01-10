(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("web-calling/lib/models/call", [
      "require",
      "exports",
      "../utilities/negotiationInfo",
      "../utilities/modelHelper",
      "../utilities/settablePromise",
      "../utilities/observableBase",
      "../utilities/typeDefs",
      "./callSession",
      "./callNegotiator",
      "./callParticipant",
      "./callModalities",
      "./callEvents",
      "media-agent",
      "signaling-agent",
      "lodash-compat"
    ], e);
}(function (e, t) {
  var n = e("../utilities/negotiationInfo"), r = e("../utilities/modelHelper"), i = e("../utilities/settablePromise"), s = e("../utilities/observableBase"), o = e("../utilities/typeDefs"), u = e("./callSession"), a = e("./callNegotiator"), f = e("./callParticipant"), l = e("./callModalities"), c = e("./callEvents"), h = e("media-agent"), p = e("signaling-agent"), d = e("lodash-compat"), v = function (e) {
      function t(t, n, r) {
        var s = e.call(this) || this;
        return s.participants = [], s.terminatedReason = o.TerminatedReason.Undefined, s.failureType = o.FailureType.Undefined, s.isHostlessCall = !1, s.isIncoming = !1, s.isVideoOn = !1, s.initialOfferTask = i.build(), s.callConnectedTask = i.build(), s.offeredMediaTypes = [], s.callSetupFailed = !1, s.callGotConnected = !1, s.callsModel = t, s.threadId = n, s.callId = r, s.state = o.CallState.None, s.logger = s.callsModel.logger.createChild("Call", function () {
          return s.callSession && s.callSession.signaling() && s.callSession.signaling().correlationId || "0";
        }), s.retargetStartedSubscription = s.on(c.CallEvents.retargetStarted, s.onReTargetStarted.bind(s)), s;
      }
      return __extends(t, e), t.prototype.correlationId = function () {
        return this.callSession.signaling() ? this.callSession.signaling().correlationId : undefined;
      }, t.prototype.hasVideoCapability = function () {
        return this.callSession.hasVideoCapability();
      }, t.prototype.hasScreensharingCapability = function () {
        return this.callSession.hasScreensharingCapability();
      }, t.prototype.isMultiParty = function () {
        return this.callSession.signaling().multiParty;
      }, t.prototype.isNGCVoicemail = function () {
        return this.callSession.isNGCVoicemail();
      }, t.prototype.initialize = function (e) {
        var t = this;
        this.callSession = new u["default"]();
        this.callSession.addMediaSessionListener(this);
        this.callSession.addSignalingSessionListener(this);
        this.callSession.initialize({
          callsModel: this.callsModel,
          callId: this.callId,
          threadId: this.threadId,
          selfParticipant: e.selfParticipant,
          isRemoteClientLync: this.isRemoteClientLync.bind(this),
          isRemotePersonAuthorized: e.callbacks.isRemotePersonAuthorized(),
          eventRaiser: this.raiseEvent.bind(this),
          logger: this.logger,
          notifications: {
            onMediaSessionCreated: function (e) {
              t.participants.forEach(function (e) {
                e.setMediaSession(t.callSession.media());
              });
            }
          }
        });
        this.callModalities = new l["default"](this.callsModel, this.callSession, this.raiseEvent.bind(this));
        this.negotiationInfo = new n["default"](this.callsModel, this.callSession.signaling(), this.logger);
        this.callNegotiator = new a.CallNegotiator({
          callsModel: this.callsModel,
          callSession: this.callSession,
          callModalities: this.callModalities,
          eventRaiser: this.raiseEvent.bind(this),
          isLocalVideoEnabled: function () {
            return t.isVideoOn;
          },
          logger: this.logger,
          notifications: {
            onAnswerProcessed: function () {
              t.initialNegotiationTask = null;
            },
            onRenegotiationSuccess: function (e) {
              return t.updateParticipantStreams(e), Promise.resolve();
            },
            onRenegotiationFatalError: function (e) {
              return t.endCallOnceWithMediaErrorAsync({
                subCode: p.CA_CONSTANTS.CALL_END_SUB_CODE.MEDIA_RENEGOTIATION_ERROR,
                phrase: p.CA_CONSTANTS.CALL_END_PHRASE.MEDIA_RENEGOTIATION_ERROR
              }, e);
            }
          }
        }, this.negotiationInfo);
        this.messageId = e.messageId;
        this.callbacks = e.callbacks;
        this.raiseChanged();
      }, t.prototype.join = function (e, t) {
        return this.logger.log("Call.join()"), this.startOrJoin({
          ringOthers: !1,
          withVideo: t,
          joinUrl: e.conversationUrl
        });
      }, t.prototype.joinCallWithoutCallModality = function (e) {
        this.logger.log("Call.joinCallWithoutCallModality()");
        this.setCallState(o.CallState.Observing);
        this.callSession.signaling().joinGivenConversationWithoutCallModality(e.conversationUrl, this.callId);
      }, t.prototype.start = function (e) {
        return this.logger.log("Call.start()"), this.isCast = e.isCast, this.label = e.label, this.startOrJoin({
          ringOthers: e.ringOthers,
          withVideo: e.withVideo
        });
      }, t.prototype.acknowledge = function (e) {
        var t = this;
        this.logger.log("Call.acknowledge()");
        var n = 0;
        return this.callSession.callOperationQueue = this.callSession.callOperationQueue.then(function () {
          t.negotiationInfo.incrementAttemps();
          t.negotiationInfo.isOfferer = !1;
          t.negotiationInfo.isRenegotiation = !1;
          t.negotiationInfo.mediaLegId = "";
          t.negotiationInfo.timeStamps.created = new Date().getTime();
          t.negotiationInfo.timeStamps.started = new Date().getTime();
          t.callerMri = e.callerId;
          t.isIncoming = !0;
          t.raiseChanged();
          t.setCallState(o.CallState.Notified);
          t.configureSignalingSession(!1);
          t.callSession.signaling().handleIncomingCall(e);
        }).then(function () {
          return t.negotiationInfo.timeStamps.incomingCallHandled = new Date().getTime(), t.initialOfferTask;
        }).then(function (e) {
          var i = e.mediaContent;
          return t.offeredMediaTypes = e.mediaTypes || [], t.negotiationInfo.timeStamps.initialOfferArrived = new Date().getTime(), t.callSession.assureMediaSessionCreated(), t.callSession.signaling().setOfferAnswerGenerationTimestamps(p.TM_CONSTANTS.LOCAL_OFFER_ANSWER_OPERATIONS.INITIAL_OFFER_PROCESSING_STARTED), r.tagAnError(n, t.callSession.media().processOfferAsync(i));
        }).then(function () {
          t.callSession.signaling().setOfferAnswerGenerationTimestamps(p.TM_CONSTANTS.LOCAL_OFFER_ANSWER_OPERATIONS.INITIAL_OFFER_PROCESSING_ENDED);
          t.negotiationInfo.timeStamps.offerProcessed = new Date().getTime();
          t.onCallStatusChanged(p.CA_CONSTANTS.CALL_STATUS.RINGING);
          t.callSession.signaling().setTimeToRingDuration();
        })["catch"](function (e) {
          return t.logger.error("acknowledge failed", "error:", e.toString()), r.isTaggedError(e) && e.tag === n ? t.endCallOnceWithMediaErrorAsync({
            subCode: p.CA_CONSTANTS.CALL_END_SUB_CODE.MEDIA_DROP_DURING_CONNECT,
            phrase: p.CA_CONSTANTS.CALL_END_PHRASE.MEDIA_DROP_DURING_CONNECT
          }, e) : t.cleanUp("Call.acknowledge() failure", {
            code: p.CA_CONSTANTS.CALL_END_CODE.UNKNOWN_ERROR,
            subCode: p.CA_CONSTANTS.CALL_END_SUB_CODE.PLACE_CALL_FAILED,
            phrase: p.CA_CONSTANTS.CALL_END_PHRASE.UNKNOWN
          }, e);
        }), this.callSession.callOperationQueue;
      }, t.prototype.accept = function (e) {
        var t = this;
        this.logger.log("Call.accept()");
        var n = 0;
        return this.callSession.callOperationQueue = this.callSession.callOperationQueue.then(function () {
          t.setCallState(o.CallState.Connecting);
        }).then(function () {
          var i = t.callModalities.getLocalModalities(!0, e);
          return r.tagAnError(n, t.callModalities.configureAsync(t.callSession.media(), i));
        }).then(function (e) {
          return t.isVideoOn = h.Helper.hasSendDirectionality(e.video), t.negotiationInfo.timeStamps.modalitiesConfigured = new Date().getTime(), t.raiseEvent(c.CallEvents.localModalitiesConfigured, e), t.raiseEvent(c.CallEvents.mediaTypesOffered, {
            offeredMediaTypes: r.modalitiesToStreamTypes(e, r.ModalityDirection.receive),
            isMultiParty: t.callSession.signaling().multiParty
          }), t.callSession.signaling().setOfferAnswerGenerationTimestamps(p.TM_CONSTANTS.LOCAL_OFFER_ANSWER_OPERATIONS.FINAL_ANSWER_GENERATION_STARTED), r.tagAnError(n, t.callSession.media().createAnswerAsync(!1));
        }).then(function (e) {
          return t.callSession.signaling().setOfferAnswerGenerationTimestamps(p.TM_CONSTANTS.LOCAL_OFFER_ANSWER_OPERATIONS.FINAL_ANSWER_GENERATION_ENDED), t.negotiationInfo.timeStamps.finalAnswerCreated = new Date().getTime(), t.negotiationInfo.mediaLegId = e.mediaLegId, t.callSession.signaling().acceptAsync(r.toSignalingMediaContent(e), r.toSignalingMediaTypes(e.modalities));
        }).then(function () {
          return t.negotiationInfo.timeStamps.signalingSessionAccepted = new Date().getTime(), t.callConnectedTask;
        }).then(function () {
          return t.negotiationInfo.timeStamps.callConnected = new Date().getTime(), r.tagAnError(n, t.callNegotiator.completeNegotiationAsync(t.callSession.media()));
        }).then(function (e) {
          t.callSession.signaling().setOfferAnswerGenerationTimestamps(p.TM_CONSTANTS.LOCAL_OFFER_ANSWER_OPERATIONS.NEGOTIATION_COMPLETED);
          t.negotiationInfo.status = "Succeeded";
          t.negotiationInfo.result = e;
          t.updateParticipantStreams(e);
          t.negotiationInfo.sendStats();
          t.logger.log("Call.accept terminated successfully");
        })["catch"](function (e) {
          return t.negotiationInfo.status = "ErrorLocalInternal-fatal", t.negotiationInfo.sendStats(), t.logger.log("Call.accept failed", "error:", e), r.isTaggedError(e) && e.tag === n ? t.endCallOnceWithMediaErrorAsync({
            subCode: p.CA_CONSTANTS.CALL_END_SUB_CODE.MEDIA_DROP_DURING_CONNECT,
            phrase: p.CA_CONSTANTS.CALL_END_PHRASE.MEDIA_DROP_DURING_CONNECT
          }, e) : t.cleanUp("Call.accept() failure", {
            code: p.CA_CONSTANTS.CALL_END_CODE.UNKNOWN_ERROR,
            subCode: p.CA_CONSTANTS.CALL_END_SUB_CODE.PLACE_CALL_FAILED,
            phrase: p.CA_CONSTANTS.CALL_END_PHRASE.UNKNOWN
          }, e);
        }), this.callSession.callOperationQueue;
      }, t.prototype.reject = function () {
        var e = this;
        this.logger.log("Call.reject()");
        if (this.state !== o.CallState.Notified && this.state !== o.CallState.Ringing)
          throw new Error("Only calls in Notified or Ringing state can be rejected");
        return this.setCallState(o.CallState.Disconnecting), this.cleanUp("user reject request", {
          code: p.CA_CONSTANTS.CALL_END_CODE.REJECT,
          subCode: p.CA_CONSTANTS.CALL_END_SUB_CODE.BEFORE_CONNECT,
          phrase: p.CA_CONSTANTS.CALL_END_PHRASE.LOCAL_USER_INITIATED
        })["catch"](function (t) {
          e.logger.log("Call.stop failed with error " + t + "!");
        }).then(function () {
          e.setCallState(o.CallState.Disconnected);
        });
      }, t.prototype.addParticipantForInitiation = function (e, t) {
        this.logger.log("Call.addParticipantForInitiation()");
        var n = this.addParticipantInternal(e, t);
        return this.raiseChanged(), n;
      }, t.prototype.addParticipantsWhileConnected = function (e, t) {
        var n = this;
        this.logger.log("Call.addParticipantsWhileConnected()");
        t && this.callSession.signaling().setThreadId(t);
        var r = [];
        return e.forEach(function (e) {
          r.push(n.addParticipantInternal(e.id, e.displayName));
        }), this.raiseChanged(), Promise.all(r);
      }, t.prototype.stop = function () {
        var e = this;
        this.logger.log("Call.stop()");
        var t = p.CA_CONSTANTS.CALL_END_CODE.SUCCESS, n = p.CA_CONSTANTS.CALL_END_SUB_CODE.SUCCESS;
        switch (this.state) {
        case o.CallState.Ringing:
        case o.CallState.Connecting:
        case o.CallState.Notified:
        case o.CallState.Observing:
          t = p.CA_CONSTANTS.CALL_END_CODE.CANCEL, n = p.CA_CONSTANTS.CALL_END_SUB_CODE.BEFORE_CONNECT;
          break;
        case o.CallState.Connected:
        case o.CallState.LocalHold:
        case o.CallState.RemoteHold:
        case o.CallState.Voicemail:
          n = p.CA_CONSTANTS.CALL_END_SUB_CODE.AFTER_CONNECT;
          break;
        default:
        }
        return this.state != o.CallState.Disconnected && this.setCallState(o.CallState.Disconnecting), this.cleanUp("user stop request", {
          code: t,
          subCode: n,
          phrase: p.CA_CONSTANTS.CALL_END_PHRASE.LOCAL_USER_INITIATED
        })["catch"](function (t) {
          e.logger.log("Call.stop failed with error " + t + "!");
        }).then(function () {
          e.setCallState(o.CallState.Disconnected);
        });
      }, t.prototype.mute = function () {
        return this.logger.log("Call.mute()"), this.toggleMuteAsync(!0);
      }, t.prototype.unmute = function () {
        return this.logger.log("Call.unmute()"), this.toggleMuteAsync(!1);
      }, t.prototype.hold = function () {
        return Promise.reject(new Error("hold/unhold not supported"));
      }, t.prototype.unhold = function () {
        return Promise.reject(new Error("hold/unhold not supported"));
      }, t.prototype.sendDtmf = function (e) {
        return this.callSession.media() ? this.callSession.media().sendDtmf(e) : Promise.reject(new Error("no media session"));
      }, t.prototype.sendLocalVideo = function (e) {
        var t = this;
        if (this.callSession.media()) {
          var n = this.callModalities.getLocalModalities(!0, e);
          return this.callModalities.configureAsync(this.callSession.media(), n).then(function (e) {
            t.isVideoOn = h.Helper.hasSendDirectionality(e.video);
            t.raiseEvent(c.CallEvents.localVideoStartedOrStopped, t.isVideoOn);
          })["catch"](function (e) {
            throw t.logger.error("sendLocalVideo failed", "error:", e), e;
          });
        }
        return Promise.reject(new Error("no media session"));
      }, t.prototype.setVideoContainer = function (e) {
        this.localVideoContainer = e;
      }, t.prototype.startVideo = function (e) {
        var t = this;
        return this.sendLocalVideo(!0).then(function () {
          return t.localVideoRenderer && t.disposeLocalVideoRenderer(), t.localVideoContainer ? (t.localVideoRenderer = t.callsModel.mediaAgent.getDeviceManager().createPreviewRenderer(t.localVideoContainer, {
            onVideoSizeChanged: function (e, n) {
              t.raiseEvent(c.CallEvents.localVideoSizeChanged, {
                width: e,
                height: n
              });
            }
          }), t.localVideoRenderer.startVideoAsync()) : (t.logger.error("Local video container not set!"), Promise.reject("Local video container not set!"));
        });
      }, t.prototype.stopVideo = function () {
        return this.disposeLocalVideoRenderer(), this.sendLocalVideo(!1).then(function () {
        }, function () {
        }), Promise.resolve(undefined);
      }, t.prototype.startScreenSharing = function (e) {
        return Promise.resolve(undefined);
      }, t.prototype.stopScreenSharing = function () {
        return Promise.resolve(undefined);
      }, t.prototype.disposeLocalVideoRenderer = function () {
        return this.localVideoRenderer && (this.localVideoRenderer.dispose(), this.localVideoRenderer = undefined), Promise.resolve(undefined);
      }, t.prototype.onOffer = function (e) {
        this.logger.log("onOffer");
        e.renegotiation || this.handleInitialOffer(e);
      }, t.prototype.onAnswer = function (e) {
        this.logger.log("onAnswer", "provisional:", e.provisional, "renegotiation:", e.renegotiation, "mediaTypes:", e.mediaTypes);
      }, t.prototype.onCallStatusChanged = function (e, t) {
        var n = !1;
        this.callSession.signaling().participantManager && this.callSession.signaling().participantManager.localParticipant && (this.endpointId = this.callSession.signaling().participantManager.localParticipant.endpointId, this.participantId = this.callSession.signaling().participantManager.localParticipant.participantId, this.raiseChanged());
        switch (e) {
        case p.CA_CONSTANTS.CALL_STATUS.RINGING:
          this.participants.forEach(function (e) {
            return e.setState(o.ParticipantState.Ringing);
          }), this.setCallState(o.CallState.Ringing);
          break;
        case p.CA_CONSTANTS.CALL_STATUS.CONNECTED:
          this.isHostlessCall = this.callSession.signaling().isHostLessCall, this.setCallState(o.CallState.Connected), this.callConnectedTask.resolve();
          break;
        case p.CA_CONSTANTS.CALL_STATUS.LOCAL_TERMINATED:
        case p.CA_CONSTANTS.CALL_STATUS.REMOTE_TERMINATED:
          t && t.code !== p.CA_CONSTANTS.CALL_END_CODE.SUCCESS && this.logger.error("Call terminated. Reject reason: " + JSON.stringify(t));
          var i = this.callSetupFailed ? o.TerminatedReason.CallSetupError : r.ngcReasonToTerminatedReason(t);
          this.setCallState(o.CallState.Disconnected, i), this.participants.forEach(function (e) {
            return e.setState(o.ParticipantState.Disconnected);
          }), n = !0;
          break;
        default:
        }
        n && this.cleanUp("call termination");
      }, t.prototype.onParticipantJoined = function (e) {
        this.logger.log("participant joined:", e);
        var t = this.getOrCreateParticipant(e.id, e.displayName);
        t.ngcParticipant = e;
        t.state === o.ParticipantState.None && t.setState(o.ParticipantState.Connecting);
        t.setState(o.ParticipantState.Connected);
        t.setMediaSession(this.callSession.media());
        if (this.isMultiParty()) {
          var n = [];
          for (var r in e.endpointDetails)
            if (e.endpointDetails.hasOwnProperty(r))
              for (var i in e.endpointDetails[r].mediaStreams)
                e.endpointDetails[r].mediaStreams.hasOwnProperty(i) && n.push(e.endpointDetails[r].mediaStreams[i]);
          t.updateStreams(n);
        }
        this.raiseEvent(c.CallEvents.participantJoined, t);
      }, t.prototype.onParticipantRemoved = function (e) {
        this.logger.log("participant removed:", e);
        var t = this.getOrCreateParticipant(e.id, e.displayName);
        this.removeParticipant(e);
        this.raiseEvent(c.CallEvents.participantRemoved, t);
      }, t.prototype.onParticipantUpdated = function (e) {
        this.logger.log("participant updated:", e);
        var t = this.getOrCreateParticipant(e.id, e.displayName), n = [];
        for (var r in e.endpointDetails)
          if (e.endpointDetails.hasOwnProperty(r))
            for (var i in e.endpointDetails[r].mediaStreams)
              e.endpointDetails[r].mediaStreams.hasOwnProperty(i) && n.push(e.endpointDetails[r].mediaStreams[i]);
        t.updateStreams(n);
        t.setState(o.ParticipantState.Connected);
      }, t.prototype.onMediaAcknowledgementSuccess = function (e) {
      }, t.prototype.onMediaAcknowledgementFailure = function (e, t) {
      }, t.prototype.onMediaRenegotiationRejection = function (e) {
        this.logger.log("onMediaRenegotiationRejection", "error:", e);
      }, t.prototype.onConversationUpdated = function (e) {
        this.threadId = e.threadId;
        this.messageId = e.teamsMessageId;
        this.raiseEvent(c.CallEvents.conversationUpdated, e);
      }, t.prototype.updateParticipantsMediaSession = function () {
        var e = this;
        this.participants.forEach(function (t) {
          t.setMediaSession(e.callSession.media());
        });
        this.raiseChanged();
      }, t.prototype.onReTargetStarted = function () {
        this.updateParticipantsMediaSession();
      }, t.prototype.onReTargetCompletedSuccess = function () {
        this.threadId = this.callSession.signaling().threadId;
        this.raiseChanged();
      }, t.prototype.onReTargetCompletedFailure = function (e) {
        this.updateParticipantsMediaSession();
      }, t.prototype.onWebRtcMediaNotification = function (e, t) {
        this.logger.log("onWebRtcMediaNotification called with :" + JSON.stringify(t));
      }, t.prototype.onContentSharingStarted = function (e) {
        this.logger.log("onContentSharingStarted, details :" + e.contentIdentifier);
      }, t.prototype.onContentSharingUpdated = function (e) {
        this.logger.log("onContentSharingUpdated, details :" + e.contentIdentifier);
      }, t.prototype.onContentSharingStopped = function (e) {
        this.logger.log("onContentSharingStopped");
      }, t.prototype.onChatModalitySetupFailed = function (e) {
        this.logger.log("onChatModalitySetupFailed");
      }, t.prototype.onUnmuteRequested = function (e) {
        this.logger.log("onUnmuteRequested");
      }, t.prototype.onCallForwarded = function (e) {
        this.logger.log("onCallForwarded");
      }, t.prototype.onPSTNBalanceUpdate = function (e) {
        this.logger.log("onPSTNBalanceUpdate");
      }, t.prototype.onTransferRequested = function (e) {
        return this.logger.log("onTransferRequested"), Promise.resolve({
          code: 405,
          subCode: 405,
          reason: "Transfer not supported"
        });
      }, t.prototype.onIncomingCallReplacement = function (e) {
        this.logger.log("onIncomingCallReplacement");
      }, t.prototype.getRemoteParticipantCollection = function () {
        var e = [];
        return this.participants.forEach(function (t) {
          var n = p.CA_CONSTANTS.PARTICIPANT_AUDIO_STATE.OTHER;
          switch (t.audio.state()) {
          case o.StreamState.Available:
            n = p.CA_CONSTANTS.PARTICIPANT_AUDIO_STATE.CONNECTED;
            break;
          case o.StreamState.Connecting:
            n = p.CA_CONSTANTS.PARTICIPANT_AUDIO_STATE.CONNECTING;
            break;
          default:
            n = p.CA_CONSTANTS.PARTICIPANT_AUDIO_STATE.OTHER;
          }
          e.push({
            id: t.id,
            mri: t.id,
            audioState: n
          });
        }), e;
      }, t.prototype.onNegotiationRequired = function () {
        this.initialNegotiationTask ? this.initialNegotiationTask.resolve() : this.renegotiate();
      }, t.prototype.onSessionErrorOccurred = function (e) {
        e.detail.type === h.Constants.MEDIA_ERROR.sourceUnavailableError ? this.sendLocalVideo(!1)["catch"](function () {
        }) : this.endCallOnceWithMediaErrorAsync({
          subCode: p.CA_CONSTANTS.CALL_END_SUB_CODE.MEDIA_DROP_AFTER_CONNECT,
          phrase: p.CA_CONSTANTS.CALL_END_PHRASE.MEDIA_DROP_AFTER_CONNECT
        }, e);
      }, t.prototype.onContributingSourcesChanged = function (e) {
        this.participants.forEach(function (t) {
          var n = e.indexOf(t.audio.id) >= 0, r = n ? 1 : 0;
          t.updateVoiceLevel(r);
        });
        this.raiseEvent(c.CallEvents.activeSpeakersChanged, e);
      }, t.prototype.onDominantSpeakerChanged = function (e) {
        this.raiseEvent(c.CallEvents.dominantSpeakersChanged, e);
      }, t.prototype.onOptimalVideoReceiversCountChanged = function (e) {
        this.raiseEvent(c.CallEvents.optimalVideoReceiversCountChanged, e);
      }, t.prototype.startOrJoin = function (e) {
        var t = this, n = 0;
        return this.setCallState(o.CallState.Connecting), this.callSession.callOperationQueue = this.callSession.callOperationQueue.then(function () {
          var s = t.callModalities.getLocalModalities(!0, e.withVideo);
          return t.initialNegotiationTask = i.build(), t.configureSignalingSession(e.ringOthers), t.callSession.assureMediaSessionCreated(), r.tagAnError(n, t.callModalities.configureAsync(t.callSession.media(), s));
        }).then(function (e) {
          return t.isVideoOn = h.Helper.hasSendDirectionality(e.video), t.negotiationInfo.timeStamps.modalitiesConfigured = new Date().getTime(), t.raiseEvent(c.CallEvents.localModalitiesConfigured, e), t.initialNegotiationTask;
        }).then(function () {
          return t.callNegotiator.negotiate({
            callId: t.callId,
            ringOthers: e.ringOthers,
            joinUrl: e.joinUrl
          });
        }).then(function (e) {
          t.updateParticipantStreams(e);
        })["catch"](function (e) {
          t.callSetupFailed = !0;
          e = e.rawError ? e.rawError : e;
          var n = e.ngcRejectReson ? e.ngcRejectReson : {
            code: p.CA_CONSTANTS.CALL_END_CODE.UNKNOWN_ERROR,
            subCode: p.CA_CONSTANTS.CALL_END_SUB_CODE.PLACE_CALL_FAILED,
            phrase: p.CA_CONSTANTS.CALL_END_PHRASE.UNKNOWN
          };
          return t.logger.error("Call.start() failed", "error:", e), t.cleanUp("Call.start() failure", n, e);
        }), this.callSession.callOperationQueue;
      }, t.prototype.addParticipantInternal = function (e, t) {
        var n = this, i = this.getOrCreateParticipant(e, t), s = [
            o.ParticipantState.None,
            o.ParticipantState.Disconnected
          ];
        if (s.indexOf(i.state) === -1)
          return Promise.resolve(i);
        i.setState(o.ParticipantState.Connecting);
        this.logger.debug("starting adding participant to call, participantId = " + i.id);
        var u = this.callSession.signaling().addParticipantAsync(p.createParticipant({
          id: i.id,
          displayName: i.displayName
        })).then(function (e) {
          return n.logger.debug("successfully added participant to call, participantId = " + i.id), i.ngcParticipant = e, n.callSession.onParticipantJoined(e), i;
        })["catch"](function (e) {
          var t;
          if (!e.endCode || !e.endCode.code)
            t = o.ParticipantStateReason.AddingFailed, n.logger.error("Error while adding participant to call, participantId = " + i.id + ", error = " + e);
          else {
            n.logger.debug("Participant was not added to call, participantId = " + i.id + ", error = " + e);
            switch (e.endCode.code) {
            case r.ADD_PARTICIPANT_FAILURE_CODES.NO_RESPONSE:
              t = o.ParticipantStateReason.NoResponse;
              break;
            case r.ADD_PARTICIPANT_FAILURE_CODES.DECLINED:
              t = o.ParticipantStateReason.Declined;
              break;
            case r.ADD_PARTICIPANT_FAILURE_CODES.NOT_REACHABLE:
              t = o.ParticipantStateReason.NotReachable;
              break;
            default:
              t = o.ParticipantStateReason.AddingFailed, n.logger.error("Error while adding participant to call, participantId = " + i.id + ", error = " + e);
            }
          }
          return n.removeParticipant(i, t), Promise.reject(e);
        });
        return u;
      }, t.prototype.configureSignalingSession = function (e) {
        !this.isIncoming && this.callbacks.isGroupConversation() && (this.participants.length > 1 || !e) && (this.logger.log("configuring outgoing call as multiparty"), this.callSession.signaling().setMultiParty());
      }, t.prototype.toggleMuteAsync = function (e) {
        var t = this;
        return this.callSession.toggleMuteAsync(e).then(function () {
          return t.isMuted = e, t.raiseChanged(), e;
        })["catch"](function (n) {
          return t.logger.error("failed to toggle microphone mute:", n), !e;
        });
      }, t.prototype.renegotiate = function () {
        var e = this;
        return this.callSession.callOperationQueue = this.callSession.callOperationQueue.then(function () {
          return e.callNegotiator.renegotiate(e.callsModel).then(function (t) {
            e.updateParticipantStreams(t);
          })["catch"](function (t) {
            t = t.rawError ? t.rawError : t;
            var n = t.ngcRejectReson ? t.ngcRejectReson : {
              subCode: p.CA_CONSTANTS.CALL_END_SUB_CODE.MEDIA_RENEGOTIATION_ERROR,
              phrase: p.CA_CONSTANTS.CALL_END_PHRASE.MEDIA_RENEGOTIATION_ERROR
            };
            return e.logger.log("renegotiation failed!", "error:", t), e.endCallOnceWithMediaErrorAsync(n, t);
          });
        }), undefined;
      }, t.prototype.rejectAllPendingTasks = function (e) {
        this.callSession.callOperationQueue["catch"](function (e) {
        });
        this.callNegotiator.rejectAllPendingTasks(e);
        var t = [
          this.initialOfferTask,
          this.initialNegotiationTask,
          this.callConnectedTask
        ];
        t.forEach(function (t) {
          t && t.state === o.SettablePromiseState.Pending && (t["catch"](function (e) {
          }), t.reject(e));
        });
      }, t.prototype.cleanUp = function (e, t, n) {
        var r = this;
        return this.retargetStartedSubscription.dispose(), this.disposeLocalVideoRenderer(), this.rejectAllPendingTasks(e), this.callSession.disposeAsync(t).then(function () {
          r.participants.forEach(function (e) {
            e.dispose();
          });
          if (n)
            throw r.logger.log("cleanUp : Error.phrase=" + n.message), n;
        });
      }, t.prototype.endCallOnceWithMediaErrorAsync = function (e, t) {
        var n = function (e, t) {
          return t.errorWrappedWithTag && (t = t.value), e.code = p.CA_CONSTANTS.CALL_END_CODE.MEDIA_ERROR, t.type === h.Constants.MEDIA_ERROR.permissionDeniedError ? (e.subCode = p.CA_CONSTANTS.CALL_END_SUB_CODE.MEDIA_PERMISSION_ERROR, e.phrase = p.CA_CONSTANTS.CALL_END_PHRASE.MEDIA_PERMISSION_ERROR, e) : (e.subCode = e.subCode || p.CA_CONSTANTS.CALL_END_SUB_CODE.MEDIA_UNKNOWN_ERROR, e.phrase = e.phrase || p.CA_CONSTANTS.CALL_END_PHRASE.MEDIA_ERROR, e);
        };
        return this.cleanUp("media error", n(e, t), t);
      }, t.prototype.isRemoteClientLync = function () {
        return !this.callSession.signaling().multiParty && this.callbacks.isRemoteClientLync();
      }, t.prototype.monitorCallStart = function () {
        this.state === o.CallState.Connected && this.participants.length && !this.callStartedAt && (this.callStartedAt = new Date());
      }, t.prototype.handleInitialOffer = function (e) {
        this.initialOfferTask.resolve(e);
      }, t.prototype.updateParticipantStreams = function (e) {
        this.isMultiParty() || this.participants.forEach(function (t) {
          t.updateStreams([
            {
              type: o.StreamTypes.audio,
              direction: r.invertDirectionality(e.activeModalities.audio),
              sourceId: undefined
            },
            {
              type: o.StreamTypes.video,
              direction: r.invertDirectionality(e.activeModalities.video),
              sourceId: undefined
            },
            {
              type: o.StreamTypes.sharing,
              direction: r.invertDirectionality(e.activeModalities.sharing),
              sourceId: undefined
            }
          ]);
        });
      }, t.prototype.removeParticipant = function (e, t) {
        t === void 0 && (t = o.ParticipantStateReason.None);
        this.logger.debug("removeParticipant: " + e.id);
        var n = d.remove(this.participants, function (t) {
          return t.id === e.id;
        })[0];
        n ? (n.setState(o.ParticipantState.Disconnected, t), n.dispose()) : this.logger.error("removeParticipant: unable to remove participant " + e.id);
        this.raiseChanged();
      }, t.prototype.getOrCreateParticipant = function (e, t) {
        var n = this.participants.filter(function (t) {
          return t.id === e;
        })[0];
        return n ? n : (n = new f["default"](e, t, this.callSession.media(), this.logger), this.participants.push(n), this.monitorCallStart(), this.raiseChanged(), n);
      }, t.prototype.setCallState = function (e, t) {
        if (this.state === e)
          return;
        var n = r.ValidStateTransitions[this.state], i = n.indexOf(e) >= 0;
        if (!i) {
          this.logger.error("Invalid state transition " + this.state + "->" + e + " attempted");
          if (e !== o.CallState.Disconnected)
            return;
        }
        this.state = e;
        var s = null;
        switch (e) {
        case o.CallState.Connected:
          this.callGotConnected = !0;
          break;
        case o.CallState.Disconnected:
          this.terminatedReason = t, r.CALL_SUCCESS_CODES.indexOf(t) === -1 && (this.failureType = this.callGotConnected ? o.FailureType.CallDropped : o.FailureType.CallSetupFailed), this.callSession.signalingTerminationInfo && (s = {
            remote: this.callSession.signalingTerminationInfo.remote,
            code: this.callSession.signalingTerminationInfo.reasonCode,
            subCode: this.callSession.signalingTerminationInfo.reasonSubCode
          });
          break;
        default:
        }
        this.monitorCallStart();
        this.raiseEvent(c.CallEvents.callStateChanged, s);
        this.raiseChanged();
      }, t;
    }(s["default"]);
  t.__esModule = !0;
  t["default"] = v;
}));

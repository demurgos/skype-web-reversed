(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("web-calling/lib/models/callNegotiator", [
      "require",
      "exports",
      "../utilities/modelHelper",
      "../utilities/settablePromise",
      "../utilities/typeDefs",
      "./callEvents",
      "media-agent",
      "signaling-agent"
    ], e);
}(function (e, t) {
  var n = e("../utilities/modelHelper"), r = e("../utilities/settablePromise"), i = e("../utilities/typeDefs"), s = e("./callEvents"), o = e("media-agent"), u = e("signaling-agent"), a = 0, f = 1, l = 2, c = function () {
      function e(e, t) {
        var n = this;
        this.offeredMediaTypes = [];
        this.callConnectedTask = r.build();
        this.mediaAcknowledgementTask = r.build();
        this.params = e;
        this.negotiationInfo = t;
        this.logger = e.logger.createChild("CallNegotiator", function () {
          return n.params.callSession && n.params.callSession.signaling() && n.params.callSession.signaling().correlationId || "0";
        });
        this.params.callSession.addSignalingSessionListener(this);
      }
      return e.prototype.rejectAllPendingTasks = function (e) {
        var t = [
          this.finalAnswerTask,
          this.renegotiationAnswerTask,
          this.callConnectedTask,
          this.mediaAcknowledgementTask
        ];
        t.forEach(function (t) {
          t && t.state === i.SettablePromiseState.Pending && (t["catch"](function (e) {
          }), t.reject(e));
        });
      }, e.prototype.negotiate = function (e) {
        var t = this;
        return this.negotiateInternal({
          initialNegotiation: !0,
          callId: e.callId,
          ringOthers: e.ringOthers,
          joinUrl: e.joinUrl
        }).then(function (e) {
          return t.negotiationInfo.sendStats(), e;
        })["catch"](function (e) {
          var r = {
            rawError: e,
            ngcRejectReson: {
              code: u.CA_CONSTANTS.CALL_END_CODE.UNKNOWN_ERROR,
              subCode: u.CA_CONSTANTS.CALL_END_SUB_CODE.PLACE_CALL_FAILED,
              phrase: u.CA_CONSTANTS.CALL_END_PHRASE.UNKNOWN
            }
          };
          if (n.isTaggedError(e))
            switch (e.tag) {
            case a:
              r.ngcRejectReson = {
                subCode: u.CA_CONSTANTS.CALL_END_SUB_CODE.MEDIA_DROP_DURING_CONNECT,
                phrase: u.CA_CONSTANTS.CALL_END_PHRASE.MEDIA_DROP_DURING_CONNECT
              };
              break;
            case f:
            case l:
            }
          throw t.logger.error("end negotiation offer (FAILED). Call.start() failed", "error:", e), t.negotiationInfo.status = "ErrorLocalInternal-fatal", t.negotiationInfo.sendStats(), r;
        });
      }, e.prototype.renegotiate = function (e) {
        var t = this;
        return this.negotiateInternal({
          initialNegotiation: !1,
          callId: null,
          ringOthers: !1
        }).then(function (e) {
          return t.negotiationInfo.sendStats(), e;
        })["catch"](function (e) {
          var r = {
            rawError: e,
            ngcRejectReson: {
              code: u.CA_CONSTANTS.CALL_END_CODE.UNKNOWN_ERROR,
              subCode: u.CA_CONSTANTS.CALL_END_SUB_CODE.AFTER_CONNECT,
              phrase: u.CA_CONSTANTS.CALL_END_PHRASE.UNKNOWN
            }
          };
          if (n.isTaggedError(e) && !e.value.callHandlerTerminationInProgress || e.type === o.Constants.MEDIA_ERROR.sourceUnavailableError) {
            var i = o.Constants.RENEGOTIATION_ERROR.local;
            t.logger.warn("end renegotiation offer (FAILED)", "error:", e);
            switch (e.tag) {
            case a:
              break;
            case f:
              i = o.Constants.RENEGOTIATION_ERROR.glare;
              break;
            case l:
              e.value.code === 491 && e.value.subCode === 10029 ? i = o.Constants.RENEGOTIATION_ERROR.glare : e.value.code === 415 ? i = o.Constants.RENEGOTIATION_ERROR.media : e.value.type === o.Constants.MEDIA_ERROR.permissionDeniedError ? i = o.Constants.RENEGOTIATION_ERROR.escalation : i = o.Constants.RENEGOTIATION_ERROR.signaling;
            }
            return t.negotiationInfo.status = "ErrorLocalInternal-" + i, t.rejectNegotiationAsync(i);
          }
          throw t.logger.warn("end renegotiation offer (FAILED)"), t.negotiationInfo.status = "ErrorLocalInternal-untagged", t.negotiationInfo.sendStats(), r;
        });
      }, e.prototype.completeNegotiationAsync = function (e) {
        var t = this;
        return e.completeNegotiationAsync().then(function (e) {
          return t.params.eventRaiser(s.CallEvents.callNegotiationFinished, {
            callNegotiationResult: e,
            isMultiParty: t.params.callSession.signaling().multiParty
          }), e;
        });
      }, e.prototype.negotiateInternal = function (e) {
        var t = this;
        return this.negotiationInfo.incrementAttemps(), this.negotiationInfo.isOfferer = !0, this.negotiationInfo.isRenegotiation = !e.initialNegotiation, this.negotiationInfo.mediaLegId = "", this.negotiationInfo.timeStamps.created = new Date().getTime(), this.logger.log("begin (re-)negotiation offer"), e.initialNegotiation && (this.negotiationInfo.timeStamps.initialNegotiationRequested = new Date().getTime()), this.params.callSession.signaling().setOfferAnswerGenerationTimestamps(e.initialNegotiation ? u.TM_CONSTANTS.LOCAL_OFFER_ANSWER_OPERATIONS.INITIAL_OFFER_GENERATION_STARTED : u.TM_CONSTANTS.LOCAL_OFFER_ANSWER_OPERATIONS.RENEGOTIATION_OFFER_GENERATION_STARTED), n.tagAnError(a, this.params.callSession.media().createOfferAsync().then(function (i) {
          return t.offeredMediaTypes = n.toSignalingMediaTypes(i.modalities), t.params.callSession.signaling().setOfferAnswerGenerationTimestamps(e.initialNegotiation ? u.TM_CONSTANTS.LOCAL_OFFER_ANSWER_OPERATIONS.INITIAL_OFFER_GENERATION_ENDED : u.TM_CONSTANTS.LOCAL_OFFER_ANSWER_OPERATIONS.RENEGOTIATION_OFFER_GENERATION_ENDED), t.negotiationInfo.mediaLegId = i.mediaLegId, t.negotiationInfo.timeStamps.offerCreated = new Date().getTime(), e.initialNegotiation ? t.finalAnswerTask = r.build() : t.renegotiationAnswerTask = r.build(), e.initialNegotiation ? t.initiateSignalingSession({
            callId: e.callId,
            joinUrl: e.joinUrl,
            ringOthers: e.ringOthers,
            mediaContent: i,
            offeredMediaTypes: t.offeredMediaTypes,
            offerGenerationTime: t.negotiationInfo.timeStamps.offerCreated - t.negotiationInfo.timeStamps.created
          }) : n.tagAnError(f, t.params.callSession.signaling().startRenegotiationAsync(n.toSignalingMediaContent(i), t.offeredMediaTypes));
        }).then(function () {
          return e.initialNegotiation || (t.negotiationInfo.timeStamps.renegotiationStarted = new Date().getTime()), n.tagAnError(l, e.initialNegotiation ? t.finalAnswerTask : t.renegotiationAnswerTask);
        }).then(function (r) {
          return t.negotiationInfo.timeStamps.answerArrived = new Date().getTime(), t.params.callSession.signaling().setOfferAnswerGenerationTimestamps(e.initialNegotiation ? u.TM_CONSTANTS.LOCAL_OFFER_ANSWER_OPERATIONS.FINAL_ANSWER_PROCESSING_STARTED : u.TM_CONSTANTS.LOCAL_OFFER_ANSWER_OPERATIONS.RENEGOTIATION_ANSWER_PROCESSING_STARTED), n.tagAnError(a, t.params.callSession.media().processAnswerAsync(r, !1));
        }).then(function () {
          return t.params.notifications.onAnswerProcessed(), e.initialNegotiation ? (t.params.callSession.signaling().setOfferAnswerGenerationTimestamps(u.TM_CONSTANTS.LOCAL_OFFER_ANSWER_OPERATIONS.FINAL_ANSWER_PROCESSING_ENDED), t.negotiationInfo.timeStamps.finalAnswerProcessed = new Date().getTime(), t.callConnectedTask.then(function () {
            return n.tagAnError(a, t.completeNegotiationAsync(t.params.callSession.media()));
          })) : (t.params.callSession.signaling().setOfferAnswerGenerationTimestamps(u.TM_CONSTANTS.LOCAL_OFFER_ANSWER_OPERATIONS.RENEGOTIATION_ANSWER_PROCESSING_ENDED), t.negotiationInfo.timeStamps.answerProcessed = new Date().getTime(), n.tagAnError(l, t.completeNegotiationAsync(t.params.callSession.media())));
        }).then(function (e) {
          return t.params.callSession.signaling().setOfferAnswerGenerationTimestamps(u.TM_CONSTANTS.LOCAL_OFFER_ANSWER_OPERATIONS.NEGOTIATION_COMPLETED), t.negotiationInfo.status = "Succeeded", t.negotiationInfo.result = e, t.logger.log("end (re-)negotiation offer (succeeded)"), Promise.resolve(e);
        }));
      }, e.prototype.onOffer = function (e) {
        var t = this;
        e.renegotiation && (this.params.callSession.callOperationQueue = this.params.callSession.callOperationQueue.then(function () {
          return t.handleMediaRenegotiationOffer(e);
        }));
      }, e.prototype.onAnswer = function (e) {
        e.renegotiation ? this.renegotiationAnswerTask.resolve(e.mediaContent) : e.provisional || this.finalAnswerTask.resolve(e.mediaContent);
      }, e.prototype.onCallStatusChanged = function (e, t) {
        switch (e) {
        case u.CA_CONSTANTS.CALL_STATUS.CONNECTED:
          this.callConnectedTask.resolve();
          break;
        default:
        }
      }, e.prototype.onParticipantJoined = function (e) {
      }, e.prototype.onParticipantRemoved = function (e) {
      }, e.prototype.onParticipantUpdated = function (e) {
      }, e.prototype.onMediaAcknowledgementSuccess = function (e) {
        this.logger.log("onMediaAcknowledgementSuccess", "isRenegotiation:", e);
        this.mediaAcknowledgementTask.resolve();
      }, e.prototype.onMediaAcknowledgementFailure = function (e, t) {
        this.logger.log("onMediaAcknowledgementFailure", "isRenegotiation:", e);
        this.mediaAcknowledgementTask.reject(t);
      }, e.prototype.onMediaRenegotiationRejection = function (e) {
        this.renegotiationAnswerTask.reject(e);
      }, e.prototype.onConversationUpdated = function (e) {
      }, e.prototype.onReTargetCompletedSuccess = function () {
      }, e.prototype.onReTargetCompletedFailure = function (e) {
      }, e.prototype.onWebRtcMediaNotification = function (e, t) {
      }, e.prototype.onContentSharingStarted = function (e) {
      }, e.prototype.onContentSharingUpdated = function (e) {
      }, e.prototype.onContentSharingStopped = function (e) {
      }, e.prototype.onChatModalitySetupFailed = function (e) {
      }, e.prototype.onUnmuteRequested = function (e) {
      }, e.prototype.onCallForwarded = function (e) {
      }, e.prototype.onPSTNBalanceUpdate = function (e) {
      }, e.prototype.getRemoteParticipantCollection = function () {
        return null;
      }, e.prototype.onTransferRequested = function (e) {
        return null;
      }, e.prototype.onIncomingCallReplacement = function (e) {
      }, e.prototype.initiateSignalingSession = function (e) {
        return e.joinUrl ? (this.logger.log("initiateSignalingSession: Join conversation"), this.params.callSession.signaling().joinGivenConversation(e.joinUrl, e.callId, n.toSignalingMediaContent(e.mediaContent), e.offeredMediaTypes, e.offerGenerationTime)) : (this.logger.log("initiateSignalingSession: New call. ringOthers=" + e.ringOthers), this.params.callSession.signaling().startOutgoingCall(n.toSignalingMediaContent(e.mediaContent), e.offeredMediaTypes, { suppressDialout: !e.ringOthers }, e.offerGenerationTime)), Promise.resolve(undefined);
      }, e.prototype.handleMediaRenegotiationOffer = function (e) {
        var t = this;
        return this.logger.log("start handleMediaRenegotiationOffer"), e.mediaContent.escalationOccurring ? this.handleEscalatedMediaRenegotiationOffer(e) : this.renegotiationProcessOffer(this.params.callSession.media(), e).then(function (e) {
          return t.renegotiationCreateAnswer(t.params.callSession.media(), e);
        }).then(function (e) {
          return t.renegotiationAccept(e);
        }).then(function () {
          return t.renegotiationMediaAcknowledgement();
        }).then(function () {
          return t.negotiationInfo.timeStamps.mediaAcknowledged = new Date().getTime(), t.completeNegotiationAsync(t.params.callSession.media());
        }).then(function (e) {
          return t.renegotiationHandleResult(e), t.params.notifications.onRenegotiationSuccess(e);
        })["catch"](function (e) {
          return t.renegotiationHandleError(e);
        })["catch"](function (e) {
          return t.negotiationInfo.status = "ErrorLocalInternal-fatal", t.logger.error("handleMediaRenegotiationOffer failed", "error:", e), t.params.notifications.onRenegotiationFatalError(e);
        }).then(function () {
          t.negotiationInfo.sendStats();
          t.logger.log("end renegotiation answer");
        });
      }, e.prototype.handleEscalatedMediaRenegotiationOffer = function (e) {
        var t = this;
        this.logger.log("starting escalation");
        if (!this.params.callsModel.featureFlags.isRemoteEscalationEnabled())
          return this.logger.error("renegotiation rejected: escalation scenario is not supported"), this.params.callSession.signaling().rejectRenegotiationAsync();
        var r = 0, i = this.params.callSession.createEscalationTask();
        return this.renegotiationProcessOffer(i.mediaSession, e).then(function () {
          var e = t.params.callModalities.getLocalModalities(!0, t.params.isLocalVideoEnabled());
          return n.tagAnError(r, t.params.callModalities.configureAsync(i.mediaSession, e));
        }).then(function (e) {
          return t.renegotiationCreateAnswer(i.mediaSession, e);
        }).then(function (e) {
          return t.renegotiationAccept(e);
        }).then(function () {
          return t.renegotiationMediaAcknowledgement();
        }).then(function () {
          return t.negotiationInfo.timeStamps.mediaAcknowledged = new Date().getTime(), t.completeNegotiationAsync(i.mediaSession);
        }).then(function (e) {
          t.renegotiationHandleResult(e);
        })["catch"](function (e) {
          return t.renegotiationHandleError(e);
        })["catch"](function (e) {
          return t.negotiationInfo.status = "ErrorLocalInternal-fatal", t.logger.error("handleMediaRenegotiationOffer failed", "error:", e), t.params.notifications.onRenegotiationFatalError(e);
        }).then(function () {
          t.renegotationComplete();
          i.complete();
        });
      }, e.prototype.renegotiationProcessOffer = function (e, t) {
        var r = 0, i = t.mediaContent;
        return this.negotiationInfo.incrementAttemps(), this.negotiationInfo.isOfferer = !1, this.negotiationInfo.isRenegotiation = !0, this.negotiationInfo.mediaLegId = "", this.negotiationInfo.timeStamps.created = new Date().getTime(), this.params.callSession.signaling().setOfferAnswerGenerationTimestamps(u.TM_CONSTANTS.LOCAL_OFFER_ANSWER_OPERATIONS.RENEGOTIATION_OFFER_PROCESSING_STARTED), n.tagAnError(r, e.processOfferAsync(i));
      }, e.prototype.renegotiationCreateAnswer = function (e, t) {
        var r = 0;
        return this.offeredMediaTypes = n.toIncomingMediaTypes(t), this.params.callSession.signaling().setOfferAnswerGenerationTimestamps(u.TM_CONSTANTS.LOCAL_OFFER_ANSWER_OPERATIONS.RENEGOTIATION_OFFER_PROCESSING_ENDED), this.negotiationInfo.timeStamps.offerProcessed = new Date().getTime(), this.params.eventRaiser(s.CallEvents.mediaTypesOffered, {
          offeredMediaTypes: n.modalitiesToStreamTypes(t, n.ModalityDirection.receive),
          isMultiParty: this.params.callSession.signaling().multiParty
        }), this.params.callSession.signaling().setOfferAnswerGenerationTimestamps(u.TM_CONSTANTS.LOCAL_OFFER_ANSWER_OPERATIONS.RENEGOTIATION_ANSWER_GENERATION_STARTED), n.tagAnError(r, e.createAnswerAsync(!1));
      }, e.prototype.renegotiationAccept = function (e) {
        var t = 1;
        return this.params.callSession.signaling().setOfferAnswerGenerationTimestamps(u.TM_CONSTANTS.LOCAL_OFFER_ANSWER_OPERATIONS.RENEGOTIATION_ANSWER_GENERATION_ENDED), this.negotiationInfo.timeStamps.answerCreated = new Date().getTime(), this.negotiationInfo.mediaLegId = e.mediaLegId, this.mediaAcknowledgementTask = r.build(), n.tagAnError(t, this.params.callSession.signaling().acceptRenegotiationAsync(n.toSignalingMediaContent(e), n.toSignalingMediaTypes(e.modalities)));
      }, e.prototype.renegotiationMediaAcknowledgement = function () {
        var e = 1;
        return this.negotiationInfo.timeStamps.renegotiationAccepted = new Date().getTime(), n.tagAnError(e, this.mediaAcknowledgementTask);
      }, e.prototype.renegotiationHandleResult = function (e) {
        this.params.callSession.signaling().setOfferAnswerGenerationTimestamps(u.TM_CONSTANTS.LOCAL_OFFER_ANSWER_OPERATIONS.NEGOTIATION_COMPLETED);
        this.negotiationInfo.status = "Succeeded";
        this.negotiationInfo.result = e;
      }, e.prototype.renegotiationHandleError = function (e) {
        var t = this, r = 0, i = 1;
        if (n.isTaggedError(e) && !e.value.callHandlerTerminationInProgress) {
          this.logger.warn("renegotiationHandleError", "error:", e);
          var s = e.tag === r ? o.Constants.RENEGOTIATION_ERROR.local : o.Constants.RENEGOTIATION_ERROR.signaling;
          return this.negotiationInfo.status = "ErrorLocalInternal-" + s, this.rejectNegotiationAsync(s).then(function () {
            return e.tag < i ? t.params.callSession.signaling().rejectRenegotiationAsync() : Promise.resolve(undefined);
          });
        }
        return this.negotiationInfo.status = "ErrorLocalInternal-untagged", Promise.resolve(undefined);
      }, e.prototype.renegotationComplete = function () {
        this.negotiationInfo.sendStats();
        this.logger.log("end renegotiation answer");
      }, e.prototype.rejectNegotiationAsync = function (e) {
        var t = this;
        return this.params.callSession.media() ? this.params.callSession.media().rejectNegotiationAsync(e).then(function (e) {
          return t.params.eventRaiser(s.CallEvents.callNegotiationFinished, {
            callNegotiationResult: e,
            isMultiParty: t.params.callSession.signaling().multiParty
          }), e;
        }) : undefined;
      }, e;
    }();
  t.CallNegotiator = c;
}));

(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("web-calling/lib/models/callSession", [
      "require",
      "exports",
      "./callEvents",
      "../utilities/modelHelper",
      "../utilities/settablePromise",
      "media-agent",
      "signaling-agent",
      "./callExtension"
    ], e);
}(function (e, t) {
  var n = e("./callEvents"), r = e("../utilities/modelHelper"), i = e("../utilities/settablePromise"), s = e("media-agent"), o = e("signaling-agent"), u = e("./callExtension"), a = {
      remote: !1,
      reasonCode: o.CA_CONSTANTS.CALL_END_CODE.SUCCESS,
      reasonSubCode: o.CA_CONSTANTS.CALL_END_SUB_CODE.SUCCESS,
      reasonPhrase: "none"
    }, f = function () {
      function e() {
        var e = this;
        this.signalingSessionActive = !1;
        this.isNGCVoicemailInternal = null;
        this.isEscalationInProgress = !1;
        this.callbacksDuringEscalationMedia = [];
        this.doMute = !1;
        this.mediaSessionListeners = [];
        this.signalingSessionListeners = [];
        this.callOperationQueue = Promise.resolve();
        this.onOffer = function (t) {
          e.signalingSessionListeners.forEach(function (e) {
            return e.onOffer(t);
          });
        };
        this.onAnswer = function (t) {
          !t.renegotiation && !t.provisional && (e.isNGCVoicemailInternal = t.callAcceptedByNGCVoicemail);
          e.signalingSessionListeners.forEach(function (e) {
            return e.onAnswer(t);
          });
        };
        this.onCallStatusChanged = function (t, n) {
          switch (t) {
          case o.CA_CONSTANTS.CALL_STATUS.LOCAL_TERMINATED:
          case o.CA_CONSTANTS.CALL_STATUS.REMOTE_TERMINATED:
            e.signalingSessionActive = !1, e.signalingTerminationInfo || (e.signalingTerminationInfo = n ? {
              remote: !1,
              reasonCode: n.code,
              reasonSubCode: n.subCode,
              reasonPhrase: n.phrase
            } : a, e.signalingTerminationInfo.remote = o.CA_CONSTANTS.CALL_STATUS.REMOTE_TERMINATED === t);
            break;
          default:
          }
          e.signalingSessionListeners.forEach(function (e) {
            return e.onCallStatusChanged(t, n);
          });
        };
        this.onParticipantJoined = function (t) {
          e.signalingSessionListeners.forEach(function (e) {
            return e.onParticipantJoined(t);
          });
        };
        this.onParticipantRemoved = function (t) {
          e.signalingSessionListeners.forEach(function (e) {
            return e.onParticipantRemoved(t);
          });
        };
        this.onParticipantUpdated = function (t) {
          e.signalingSessionListeners.forEach(function (e) {
            return e.onParticipantUpdated(t);
          });
        };
        this.onMediaAcknowledgementSuccess = function (t) {
          e.signalingSessionListeners.forEach(function (e) {
            return e.onMediaAcknowledgementSuccess(t);
          });
        };
        this.onMediaAcknowledgementFailure = function (t, n) {
          e.signalingSessionListeners.forEach(function (e) {
            return e.onMediaAcknowledgementFailure(t, n);
          });
        };
        this.onMediaRenegotiationRejection = function (t) {
          e.signalingSessionListeners.forEach(function (e) {
            return e.onMediaRenegotiationRejection(t);
          });
        };
        this.onConversationUpdated = function (t) {
          e.signalingSessionListeners.forEach(function (e) {
            return e.onConversationUpdated(t);
          });
        };
        this.onReTargetCompletedSuccess = function () {
          e.isEscalationInProgress = !1;
          e.escalationTask.handleReTargetCompletedSuccess().then(function () {
            e.signalingSessionListeners.forEach(function (e) {
              return e.onReTargetCompletedSuccess();
            });
            e.params.eventRaiser(n.CallEvents.retargetCompleted);
            e.executePostponedCallbacks(!0);
          })["catch"](function (t) {
            e.params.eventRaiser(n.CallEvents.retargetCompleted);
          });
        };
        this.onReTargetCompletedFailure = function (t) {
          e.isEscalationInProgress = !1;
          e.escalationTask.handleReTargetCompletedFailure(t).then(function () {
            e.signalingSessionListeners.forEach(function (e) {
              return e.onReTargetCompletedFailure(t);
            });
            e.params.eventRaiser(n.CallEvents.retargetAborted);
            e.executePostponedCallbacks(!1);
          })["catch"](function (t) {
            e.params.eventRaiser(n.CallEvents.retargetAborted);
          });
        };
        this.onWebRtcMediaNotification = function (t, n) {
          e.signalingSessionListeners.forEach(function (e) {
            return e.onWebRtcMediaNotification(t, n);
          });
        };
        this.onContentSharingStarted = function (t) {
          e.signalingSessionListeners.forEach(function (e) {
            return e.onContentSharingStarted(t);
          });
        };
        this.onContentSharingUpdated = function (t) {
          e.signalingSessionListeners.forEach(function (e) {
            return e.onContentSharingUpdated(t);
          });
        };
        this.onContentSharingStopped = function (t) {
          e.signalingSessionListeners.forEach(function (e) {
            return e.onContentSharingStopped(t);
          });
        };
        this.onChatModalitySetupFailed = function (t) {
          e.signalingSessionListeners.forEach(function (e) {
            return e.onChatModalitySetupFailed(t);
          });
        };
        this.onUnmuteRequested = function (t) {
          e.signalingSessionListeners.forEach(function (e) {
            return e.onUnmuteRequested(t);
          });
        };
        this.onCallForwarded = function (t) {
          e.signalingSessionListeners.forEach(function (e) {
            return e.onCallForwarded(t);
          });
        };
        this.onPSTNBalanceUpdate = function (t) {
          e.signalingSessionListeners.forEach(function (e) {
            return e.onPSTNBalanceUpdate(t);
          });
        };
        this.getRemoteParticipantCollection = function () {
          for (var t = 0, n = e.signalingSessionListeners; t < n.length; t++) {
            var r = n[t], i = r.getRemoteParticipantCollection();
            if (i !== null && i !== undefined)
              return i;
          }
          return [];
        };
        this.onNegotiationRequired = function (t) {
          var n = function () {
            e.mediaSessionListeners.forEach(function (e) {
              return e.onNegotiationRequired();
            });
          };
          e.handleMediaSessionCallback(n.bind(null), t);
        };
        this.onSessionErrorOccurred = function (t, n) {
          var r = function (t) {
            e.mediaSessionListeners.forEach(function (e) {
              return e.onSessionErrorOccurred(t);
            });
          };
          e.handleMediaSessionCallback(r.bind(null, t), n);
        };
        this.onContributingSourcesChanged = function (t, n) {
          var r = function (t) {
            e.mediaSessionListeners.forEach(function (e) {
              return e.onContributingSourcesChanged(t);
            });
          };
          e.handleMediaSessionCallback(r.bind(null, t), n);
        };
        this.onDominantSpeakerChanged = function (t, n) {
          var r = function (t) {
            e.mediaSessionListeners.forEach(function (e) {
              return e.onDominantSpeakerChanged(t);
            });
          };
          e.handleMediaSessionCallback(r.bind(null, t), n);
        };
        this.onOptimalVideoReceiversCountChanged = function (t, n) {
          var r = function (t) {
            e.mediaSessionListeners.forEach(function (e) {
              return e.onOptimalVideoReceiversCountChanged(t);
            });
          };
          e.handleMediaSessionCallback(r.bind(null, t), n);
        };
        this.executePostponedCallbacks = function (e) {
          this.callbacksDuringEscalationMedia.forEach(function (t) {
            t.execute(e);
          });
          this.callbacksDuringEscalationMedia = [];
        };
      }
      return e.prototype.initialize = function (e) {
        var t = this;
        this.params = e;
        this.signalingSession = e.callsModel.signalingAgent.getNewSignalingSession(e.selfParticipant, this);
        this.logger = e.logger.createChild("CallSession", function () {
          return t.signalingSession.correlationId || "0";
        });
        e.threadId && this.signalingSession.setThreadId(e.threadId);
        this.signalingSessionActive = !0;
      }, e.prototype.initiateSignalingSession = function (e) {
        e.joinUrl ? (this.logger.log("initiateSignalingSession: Join conversation"), this.signalingSession.joinGivenConversation(e.joinUrl, this.params.callId, r.toSignalingMediaContent(e.mediaContent), e.offeredMediaTypes, e.offerGenerationTime)) : (this.logger.log("initiateSignalingSession: New call. ringOthers=" + e.ringOthers), this.signalingSession.startOutgoingCall(r.toSignalingMediaContent(e.mediaContent), e.offeredMediaTypes, { suppressDialout: !e.ringOthers }, e.offerGenerationTime));
      }, e.prototype.assureMediaSessionCreated = function () {
        this.mediaSession || (this.mediaSession = this.createMediaSession(!1), this.callExtension = new u["default"](this), this.callExtension.configure(this.mediaSession), this.params.notifications.onMediaSessionCreated(this.mediaSession));
      }, e.prototype.createEscalationTask = function () {
        var e = this, t = this.mediaSession, r = this.createMediaSession(!0), s = i.build(), o = {
            mediaSession: r,
            escalationCompletePromise: s,
            complete: function () {
              e.callExtension.configure(r);
              s.resolve();
            },
            abort: function () {
              e.mediaSession = t;
              r.terminate();
              s.reject();
            },
            handleReTargetCompletedSuccess: function () {
              return s.then(function () {
                t.terminate();
              })["catch"](function (n) {
                e.mediaSession = t;
                r.terminate();
              });
            },
            handleReTargetCompletedFailure: function (n) {
              return e.mediaSession = t, s.then(function () {
                r.terminate();
              })["catch"](function (e) {
                r.terminate();
              });
            }
          };
        return this.escalationTask = o, this.isEscalationInProgress = !0, this.mediaSession = r, this.params.eventRaiser(n.CallEvents.retargetStarted), o;
      }, e.prototype.media = function () {
        return this.mediaSession;
      }, e.prototype.signaling = function () {
        return this.signalingSession;
      }, e.prototype.toggleMuteAsync = function (e) {
        return this.doMute = e, this.mediaSession ? e ? this.mediaSession.muteInputAsync() : this.mediaSession.unmuteInputAsync() : Promise.resolve();
      }, e.prototype.isNGCVoicemail = function () {
        return this.isNGCVoicemailInternal;
      }, e.prototype.hasScreensharingCapability = function () {
        if (this.params.callsModel.mediaAgent.getCapabilities().screensharing) {
          if (this.params.callsModel.browserDetect.getBrowserInfo().isEdge)
            return this.params.callsModel.featureFlags.isIncomingScreenSharingEdgeEnabled();
          if (this.params.callsModel.browserDetect.getBrowserInfo().isFirefox)
            return this.params.callsModel.featureFlags.isVideoCallingFirefoxEnabled();
          if (this.params.callsModel.browserDetect.getBrowserInfo().isChrome || this.params.callsModel.browserDetect.getBrowserInfo().isElectron)
            if (this.signalingSession.multiParty && this.params.callsModel.browserDetect.getSystemInfo().osName === "Linux")
              return this.params.callsModel.featureFlags.isGroupVideoCallingChromeLinuxEnabled();
          return !0;
        }
        return !1;
      }, e.prototype.hasVideoCapability = function () {
        if (this.params.callsModel.mediaAgent.getCapabilities().video) {
          if (this.params.callsModel.browserDetect.getBrowserInfo().isEdge)
            return !0;
          if (this.params.callsModel.browserDetect.getBrowserInfo().isFirefox)
            return this.params.callsModel.featureFlags.isVideoCallingFirefoxEnabled();
          if (this.params.callsModel.browserDetect.getBrowserInfo().isChrome || this.params.callsModel.browserDetect.getBrowserInfo().isElectron)
            if (this.signalingSession.multiParty && this.params.callsModel.browserDetect.getSystemInfo().osName === "Linux")
              return this.params.callsModel.featureFlags.isGroupVideoCallingChromeLinuxEnabled();
          return !0;
        }
        return !1;
      }, e.prototype.addMediaSessionListener = function (e) {
        this.mediaSessionListeners.push(e);
      }, e.prototype.addSignalingSessionListener = function (e) {
        this.signalingSessionListeners.push(e);
      }, e.prototype.disposeAsync = function (e) {
        var t = this;
        this.escalationTask && (this.escalationTask.abort(), this.escalationTask = undefined, this.isEscalationInProgress = !1, this.callbacksDuringEscalationMedia = []);
        this.callExtension && (this.callExtension.dispose(), this.callExtension = undefined);
        var n = this.mediaSession;
        this.mediaSession = undefined;
        var i = this.signalingSessionActive;
        this.signalingSessionActive = !1;
        var s = [];
        return this.signalingTerminationInfo || (this.signalingTerminationInfo = e ? {
          remote: !1,
          reasonCode: e.code,
          reasonSubCode: e.subCode,
          reasonPhrase: e.phrase
        } : a), n && s.push(n.terminate().then(function () {
          return n.getStatsAsync();
        }).then(function (e) {
          t.mediaSessionListeners = [];
          r.sendMediaSessionStats(t.params.callsModel, t.signalingTerminationInfo, e, t.isNGCVoicemailInternal);
        })["catch"](function (e) {
          t.mediaSessionListeners = [];
          t.logger.error("failed to obtain media session stats:", e);
        })), i && s.push(this.signalingSession.endAsync(e).then(function () {
          t.signalingSessionListeners = [];
        })["catch"](function (e) {
          t.signalingSessionListeners = [];
          t.logger.error("failed to end signaling session:", e);
        })), Promise.all(s);
      }, e.prototype.onTransferRequested = function (e) {
        this.logger.log("onTransferRequested");
        for (var t = 0, n = this.signalingSessionListeners; t < n.length; t++) {
          var r = n[t], i = r.onTransferRequested(e);
          if (i !== null && i !== undefined)
            return i;
        }
        return Promise.resolve({
          code: 405,
          subCode: 405,
          reason: "Transfer not supported"
        });
      }, e.prototype.onIncomingCallReplacement = function (e) {
        this.signalingSessionListeners.forEach(function (t) {
          t.onIncomingCallReplacement(e);
        });
      }, e.prototype.getIceTransportPolicy = function () {
        return this.signalingSession.multiParty || this.params.isRemotePersonAuthorized ? s.Constants.ICE_TRANSPORT_POLICY.all : s.Constants.ICE_TRANSPORT_POLICY.relay;
      }, e.prototype.handleMediaSessionCallback = function (e, t) {
        this.isEscalationInProgress ? this.callbacksDuringEscalationMedia.push(new c(t, e)) : e();
      }, e.prototype.createMediaSession = function (e) {
        var t = {
          muted: this.doMute,
          isRemoteClientLync: this.params.isRemoteClientLync(),
          isConference: this.signalingSession.multiParty,
          iceTransportPolicy: this.getIceTransportPolicy(),
          passiveModalities: {}
        };
        return this.hasScreensharingCapability() && (t.passiveModalities.sharing = s.Constants.MEDIA_STATE.receive), this.params.callsModel.mediaAgent.createSession(new l(e, this), this.signalingSession.correlationId, t);
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = f;
  var l = function () {
      function e(e, t) {
        var n = this;
        this.onNegotiationRequired = function () {
          n.callSession.onNegotiationRequired(n.isEscalatedSession);
        };
        this.onSessionErrorOccurred = function (e) {
          n.callSession.onSessionErrorOccurred(e, n.isEscalatedSession);
        };
        this.onContributingSourcesChanged = function (e) {
          n.callSession.onContributingSourcesChanged(e, n.isEscalatedSession);
        };
        this.onDominantSpeakerChanged = function (e) {
          n.callSession.onDominantSpeakerChanged(e, n.isEscalatedSession);
        };
        this.onOptimalVideoReceiversCountChanged = function (e) {
          n.callSession.onOptimalVideoReceiversCountChanged(e, n.isEscalatedSession);
        };
        this.isEscalatedSession = e;
        this.callSession = t;
      }
      return e;
    }(), c = function () {
      function e(e, t) {
        this.isEscalatedSession = e;
        this.successCallback = t;
      }
      return e.prototype.execute = function (e) {
        (e && this.isEscalatedSession || !e && !this.isEscalatedSession) && this.successCallback();
      }, e;
    }();
}));

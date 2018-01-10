(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/mediaRenegotiationManager", [
      "require",
      "exports",
      "./utilities/constants",
      "./telemetry/telemetryConstants",
      "./utilities/utils",
      "./utilities/stopwatch",
      "./utilities/requestBuilder",
      "./requests/mediaRenegotiationRequest",
      "./responses/mediaRenegotiationResponse",
      "./responses/mediaRenegotiationRejectionResponse"
    ], e);
}(function (e, t) {
  var n = e("./utilities/constants"), r = e("./telemetry/telemetryConstants"), i = e("./utilities/utils"), s = e("./utilities/stopwatch"), o = e("./utilities/requestBuilder"), u = e("./requests/mediaRenegotiationRequest"), a = e("./responses/mediaRenegotiationResponse"), f = e("./responses/mediaRenegotiationRejectionResponse"), l = function () {
      function e(e, t) {
        var f = this;
        this.vbssInitiated = !1;
        this.disposed = !1;
        this.fsmState = n["default"].MEDIA_RENEGOTIATION_FSM_STATE.IDLE;
        this.glareError = {
          code: n["default"].CALL_END_CODE.GLARE_ERROR,
          subCode: n["default"].CALL_END_SUB_CODE.GLARE_ERROR,
          phrase: n["default"].CALL_END_PHRASE.RENEGOTIATION_IN_PROGRESS
        };
        this.links = {};
        this.renegotiationOffersSeenSoFar = {};
        this.isOutgoingRenegotiationInProgress = function () {
          return f.fsmState === n["default"].MEDIA_RENEGOTIATION_FSM_STATE.OUTGOING_RENEGOTIATION || f.fsmState === n["default"].MEDIA_RENEGOTIATION_FSM_STATE.RENEGOTIATION_GLARE;
        };
        this.isIncomingRenegotiationInProgress = function () {
          return f.fsmState === n["default"].MEDIA_RENEGOTIATION_FSM_STATE.INCOMING_RENEGOTIATION || f.fsmState === n["default"].MEDIA_RENEGOTIATION_FSM_STATE.RENEGOTIATION_GLARE;
        };
        this.acceptRenegotiationAsync = function (e, t) {
          f.logger.log("acceptRenegotiationAsync called");
          t && f.logger.log("acceptRenegotiationAsync called with mediaTypes : " + i.getPrintableObject(t));
          f.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.ACCEPT_RENEGOTIATION);
          i.assertNotNullOrEmpty(f.links[n["default"].LINKS.MEDIA_ANSWER], "MediaAnswer link not set");
          var u = i.defer();
          switch (f.fsmState) {
          case n["default"].MEDIA_RENEGOTIATION_FSM_STATE.INCOMING_RENEGOTIATION:
            f.fsmState = n["default"].MEDIA_RENEGOTIATION_FSM_STATE.CALL_CONNECTED;
            break;
          case n["default"].MEDIA_RENEGOTIATION_FSM_STATE.RENEGOTIATION_GLARE:
            f.fsmState = n["default"].MEDIA_RENEGOTIATION_FSM_STATE.OUTGOING_RENEGOTIATION;
            break;
          default:
            return f.logger.log("there is no incoming media renegotiation offer to accept "), u.reject(new Error("there is no incoming media renegotiation offer to accept")), u.promise;
          }
          var l = s.build();
          return f.signalingSession.ensureLatestTrouterUrl(r["default"].NETWORK_REQUESTS.SEND_MEDIA_ANSWER).then(function () {
            return f.signalingSession.timeoutManager.startTimer(n["default"].TIMEOUT_OPERATIONS.MEDIA_ANSWER_ACKNOWLEDGEMENT, f.handleMediaAnswerAcknowledgmentTimeout.bind(f)), o.get(f.signalingSession, r["default"].NETWORK_REQUESTS.SEND_MEDIA_ANSWER, a.getPayload(f.signalingSession, e, t));
          }).then(function (e) {
            return f.signalingSession.signalingAgentConfig.httpRequestDispatcher.postAsync(f.links[n["default"].LINKS.MEDIA_ANSWER], e);
          }).then(function (e) {
            f.disposed || f.signalingSession.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.SEND_MEDIA_ANSWER, !0, l.duration());
            u.resolve(e.response);
          })["catch"](function (e) {
            var t = i.getPrintableObject(e);
            f.logger.error("acceptRenegotiationAsync failed because : " + t);
            f.disposed || (f.signalingSession.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.SEND_MEDIA_ANSWER, !1, l.duration()), f.signalingSession.timeoutManager.stopTimer(n["default"].TIMEOUT_OPERATIONS.MEDIA_ANSWER_ACKNOWLEDGEMENT));
            u.reject(new Error("acceptRenegotiationAsync failed because : " + t));
          }), u.promise;
        };
        this.startRenegotiationAsync = function (e, t, a) {
          f.logger.log("startRenegotiationAsync called ");
          f.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.START_RENEGOTIATION);
          i.assertNotNullOrEmpty(t, "MediaRenegotiation link not set");
          var l = i.defer();
          switch (f.fsmState) {
          case n["default"].MEDIA_RENEGOTIATION_FSM_STATE.CALL_CONNECTED:
            f.fsmState = n["default"].MEDIA_RENEGOTIATION_FSM_STATE.OUTGOING_RENEGOTIATION;
            break;
          case n["default"].MEDIA_RENEGOTIATION_FSM_STATE.OUTGOING_RENEGOTIATION:
          case n["default"].MEDIA_RENEGOTIATION_FSM_STATE.INCOMING_RENEGOTIATION:
          case n["default"].MEDIA_RENEGOTIATION_FSM_STATE.RENEGOTIATION_GLARE:
            return f.logger.log("media renegotiation can only be performed with no current outstanding renegotiations."), f.signalingSessionCallback.onMediaRenegotiationRejection(f.glareError), Promise.resolve(null);
          default:
            return f.logger.log("media renegotiation can only be performed on an established call"), l.reject(new Error("media renegotiation can only be performed on an established call")), l.promise;
          }
          var c = s.build(), h = a && i.arrayContains(a, n["default"].MEDIA_TYPES.SCREEN_SHARER);
          return h ? (f.vbssInitiated = !0, f.signalingSession.telemetryHelper.addVbssOperations(r["default"].VBSS_OPERATION.START)) : !h && f.vbssInitiated && (f.vbssInitiated = !1, f.signalingSession.telemetryHelper.addVbssOperations(r["default"].VBSS_OPERATION.STOP)), f.signalingSession.ensureLatestTrouterUrl(r["default"].NETWORK_REQUESTS.START_RENEGOTIATION).then(function () {
            return f.signalingSession.timeoutManager.startTimer(n["default"].TIMEOUT_OPERATIONS.MEDIA_ANSWER, f.handleMediaAnswerTimeout.bind(f)), o.get(f.signalingSession, r["default"].NETWORK_REQUESTS.START_RENEGOTIATION, u.getPayload(f.signalingSession, e, a));
          }).then(function (e) {
            return f.signalingSession.signalingAgentConfig.httpRequestDispatcher.postAsync(t, e);
          }).then(function (e) {
            f.disposed || f.signalingSession.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.START_RENEGOTIATION, !0, c.duration());
            l.resolve(e.response);
          })["catch"](function (e) {
            var t = i.getPrintableObject(e);
            f.logger.error("startRenegotiationAsync failed because : " + t);
            if (!f.disposed) {
              switch (f.fsmState) {
              case n["default"].MEDIA_RENEGOTIATION_FSM_STATE.OUTGOING_RENEGOTIATION:
                f.fsmState = n["default"].MEDIA_RENEGOTIATION_FSM_STATE.CALL_CONNECTED;
                break;
              case n["default"].MEDIA_RENEGOTIATION_FSM_STATE.RENEGOTIATION_GLARE:
                f.fsmState = n["default"].MEDIA_RENEGOTIATION_FSM_STATE.INCOMING_RENEGOTIATION;
                break;
              default:
              }
              f.signalingSession.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.START_RENEGOTIATION, !1, c.duration());
              f.signalingSession.timeoutManager.stopTimer(n["default"].TIMEOUT_OPERATIONS.MEDIA_ANSWER);
            }
            l.reject(new Error("startRenegotiationAsync failed because : " + t));
          }), l.promise;
        };
        this.handleMediaAcknowledgment = function (e) {
          f.logger.log("handleMediaAcknowledgment");
          f.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_MEDIA_ACKNOWLEDGEMENT);
          f.signalingSession.timeoutManager.stopTimer(n["default"].TIMEOUT_OPERATIONS.MEDIA_ANSWER_ACKNOWLEDGEMENT);
          f.signalingSession.saveMediaControllerLinksIfAny(e);
          f.signalingSessionCallback.onMediaAcknowledgementSuccess(!0);
        };
        this.onCallConnected = function () {
          f.logger.log("onCallConnected");
          f.fsmState = n["default"].MEDIA_RENEGOTIATION_FSM_STATE.CALL_CONNECTED;
        };
        this.handleMediaNegotiationFailure = function (e) {
          f.logger.log("handleMediaNegotiationFailure called . Details : " + i.getPrintableObject(e));
          f.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_MEDIA_NEGOTIATION_FAILURE);
          f.signalingSession.timeoutManager.stopTimer(n["default"].TIMEOUT_OPERATIONS.MEDIA_ANSWER);
          switch (f.fsmState) {
          case n["default"].MEDIA_RENEGOTIATION_FSM_STATE.OUTGOING_RENEGOTIATION:
            f.fsmState = n["default"].MEDIA_RENEGOTIATION_FSM_STATE.CALL_CONNECTED;
            break;
          case n["default"].MEDIA_RENEGOTIATION_FSM_STATE.RENEGOTIATION_GLARE:
            f.fsmState = n["default"].MEDIA_RENEGOTIATION_FSM_STATE.INCOMING_RENEGOTIATION;
            break;
          default:
            return;
          }
          f.vbssInitiated && (f.vbssInitiated = !1, f.signalingSession.telemetryHelper.addVbssOperations(r["default"].VBSS_OPERATION.REJECTED));
          f.signalingSession.telemetryHelper.addIncomingModalities(["Rejected"]);
          f.signalingSessionCallback.onMediaRenegotiationRejection({
            code: e.code,
            subCode: e.subCode,
            phrase: e.phrase
          });
        };
        this.handleMediaAnswer = function (e) {
          f.logger.log("handleMediaAnswer called");
          f.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_MEDIA_ANSWER);
          switch (f.fsmState) {
          case n["default"].MEDIA_RENEGOTIATION_FSM_STATE.OUTGOING_RENEGOTIATION:
            f.fsmState = n["default"].MEDIA_RENEGOTIATION_FSM_STATE.CALL_CONNECTED;
            break;
          case n["default"].MEDIA_RENEGOTIATION_FSM_STATE.RENEGOTIATION_GLARE:
            f.fsmState = n["default"].MEDIA_RENEGOTIATION_FSM_STATE.INCOMING_RENEGOTIATION;
            break;
          default:
            return;
          }
          f.signalingSession.timeoutManager.stopTimer(n["default"].TIMEOUT_OPERATIONS.MEDIA_ANSWER);
          var t = [];
          e.mediaAnswer.callModalities && e.mediaAnswer.callModalities.length > 0 && (t = i.getMediaTypes(e.mediaAnswer.callModalities), f.signalingSession.telemetryHelper.addIncomingModalities(t));
          var u = {
              provisional: !1,
              renegotiation: !0,
              mediaTypes: t,
              remoteParticipantId: f.signalingSession.getParticipantIdForOfferAnswer(e.mediaAnswer.mediaContent),
              mediaContent: e.mediaAnswer.mediaContent
            }, a = s.build();
          o.get(f.signalingSession, r["default"].NETWORK_REQUESTS.SEND_MEDIA_ACKNOWLEDGEMENT, null).then(function (t) {
            return f.signalingSession.signalingAgentConfig.httpRequestDispatcher.postAsync(e.mediaAnswer.links.mediaAcknowledgement, t);
          }).then(function () {
            f.disposed || f.signalingSession.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.SEND_MEDIA_ACKNOWLEDGEMENT, !0, a.duration());
          })["catch"](function (e) {
            var t = i.getPrintableObject(e);
            f.logger.error("sending mediaAcknowledgement failed because : " + t);
            f.disposed || f.signalingSession.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.SEND_MEDIA_ACKNOWLEDGEMENT, !1, a.duration());
          });
          f.signalingSessionCallback.onAnswer(u);
        };
        this.handleMediaNegotiationOffer = function (e, t) {
          f.logger.log("handleMediaNegotiationOffer called");
          f.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_MEDIA_OFFER);
          var s = i.isDuplicateMessage(t, f.renegotiationOffersSeenSoFar);
          switch (f.fsmState) {
          case n["default"].MEDIA_RENEGOTIATION_FSM_STATE.OUTGOING_RENEGOTIATION:
            f.fsmState = n["default"].MEDIA_RENEGOTIATION_FSM_STATE.RENEGOTIATION_GLARE, f.raiseMediaRenegotiationOffer(e);
            break;
          case n["default"].MEDIA_RENEGOTIATION_FSM_STATE.CALL_CONNECTED:
            f.fsmState = n["default"].MEDIA_RENEGOTIATION_FSM_STATE.INCOMING_RENEGOTIATION, f.raiseMediaRenegotiationOffer(e);
            break;
          default:
            f.logger.error("Cannot handle the incoming mediaRenegotiation offer in present callstate. Either call not connected or renegotiation in progress. isDuplicateOffer = " + s), s || f.rejectMediaRenegotiation(e.mediaNegotiation.links.rejection, f.glareError);
          }
        };
        this.rejectRenegotiationAsync = function (e) {
          f.logger.log("rejectRenegotiationAsync called");
          f.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.REJECT_RENEGOTIATION);
          i.assertNotNullOrEmpty(f.links[n["default"].LINKS.MEDIA_REJECTION], "MediaRejection link not set");
          var t = e || {
            code: n["default"].CALL_END_CODE.NOT_ACCEPTABLE_HERE,
            subCode: n["default"].CALL_END_SUB_CODE.MEDIA_ANSWER_PROCESSING_ERROR,
            phrase: n["default"].CALL_END_PHRASE.MEDIA_ANSWER_ERROR
          };
          switch (f.fsmState) {
          case n["default"].MEDIA_RENEGOTIATION_FSM_STATE.INCOMING_RENEGOTIATION:
            return f.fsmState = n["default"].MEDIA_RENEGOTIATION_FSM_STATE.CALL_CONNECTED, f.rejectMediaRenegotiation(f.links[n["default"].LINKS.MEDIA_REJECTION], t);
          case n["default"].MEDIA_RENEGOTIATION_FSM_STATE.RENEGOTIATION_GLARE:
            return f.fsmState = n["default"].MEDIA_RENEGOTIATION_FSM_STATE.OUTGOING_RENEGOTIATION, f.rejectMediaRenegotiation(f.links[n["default"].LINKS.MEDIA_REJECTION], t);
          default:
            return f.logger.error("There is no incoming media renegotiation offer to reject"), Promise.resolve(null);
          }
        };
        this.handleRetargetCompleted = function (e) {
          f.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_RETARGET_COMPLETED);
          var t = i.getPrintableObject(e);
          f.logger.log("handleRetargetCompleted called with : " + t);
          e.code === 0 ? f.signalingSessionCallback.onReTargetCompletedSuccess() : f.signalingSessionCallback.onReTargetCompletedFailure(t);
        };
        this.dispose = function () {
          f.logger.log("mediaRenegotiationManager :: dispose");
          f.disposed = !0;
        };
        this.signalingSession = e;
        this.signalingSessionCallback = t;
        this.logger = e.logger.createChild(function () {
          return "[" + f.fsmState + "]";
        });
      }
      return e.prototype.raiseMediaRenegotiationOffer = function (e) {
        this.logger.log("raiseMediaRenegotiationOffer");
        this.links[n["default"].LINKS.MEDIA_ANSWER] = e.mediaNegotiation.links.mediaAnswer;
        this.links[n["default"].LINKS.MEDIA_REJECTION] = e.mediaNegotiation.links.rejection;
        var t = [];
        e.mediaNegotiation.callModalities && e.mediaNegotiation.callModalities.length > 0 && (t = i.getMediaTypes(e.mediaNegotiation.callModalities), this.signalingSession.telemetryHelper.addIncomingModalities(t), i.arrayContains(t, n["default"].MEDIA_TYPES.SCREEN_SHARER) && this.signalingSession.telemetryHelper.addVbssOperations(r["default"].VBSS_OPERATION.REMOTE_START));
        var s = {
          mediaTypes: t,
          remoteParticipantId: this.signalingSession.getParticipantIdForOfferAnswer(e.mediaNegotiation.mediaContent),
          mediaContent: e.mediaNegotiation.mediaContent,
          renegotiation: !0
        };
        this.signalingSessionCallback.onOffer(s);
      }, e.prototype.rejectMediaRenegotiation = function (e, t) {
        var n = this;
        this.logger.log("rejectMediaRenegotiation");
        var u = i.defer(), a = s.build();
        return this.signalingSession.ensureLatestTrouterUrl(r["default"].NETWORK_REQUESTS.SEND_MEDIA_REJECTION).then(function () {
          return o.get(n.signalingSession, r["default"].NETWORK_REQUESTS.SEND_MEDIA_REJECTION, f.getPayload(n.signalingSession, t));
        }).then(function (t) {
          return n.signalingSession.signalingAgentConfig.httpRequestDispatcher.postAsync(e, t);
        }).then(function (e) {
          n.disposed || n.signalingSession.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.SEND_MEDIA_REJECTION, !0, a.duration());
          u.resolve(e.response);
        })["catch"](function (e) {
          n.disposed || n.signalingSession.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.SEND_MEDIA_REJECTION, !1, a.duration());
          var t = i.getPrintableObject(e);
          n.logger.error("rejectMediaRenegotiation failed because : " + t);
          u.reject(new Error("rejectMediaRenegotiation failed because : " + t));
        }), u.promise;
      }, e.prototype.handleMediaAnswerTimeout = function () {
        this.logger.log("handleMediaAnswerTimeout");
        this.vbssInitiated && (this.vbssInitiated = !1, this.signalingSession.telemetryHelper.addVbssOperations(r["default"].VBSS_OPERATION.TIMEOUT));
        this.signalingSession.telemetryHelper.addIncomingModalities(["Timeout"]);
        this.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_MEDIA_ANSWER_TIMEOUT);
        this.signalingSession.timeoutManager.stopTimer(n["default"].TIMEOUT_OPERATIONS.MEDIA_ANSWER);
        this.handleMediaNegotiationFailure({
          code: n["default"].CALL_END_CODE.TIMEOUT,
          subCode: n["default"].CALL_END_SUB_CODE.MEDIA_FINAL_ANSWER_TIMEOUT,
          phrase: n["default"].CALL_END_PHRASE.MEDIA_FINAL_ANSWER_TIMEOUT
        });
      }, e.prototype.handleMediaAnswerAcknowledgmentTimeout = function () {
        this.logger.log("handleMediaAnswerAcknowledgmentTimeout");
        this.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_MEDIA_ACKNOWLEDGEMENT_TIMEOUT);
        this.signalingSession.timeoutManager.stopTimer(n["default"].TIMEOUT_OPERATIONS.MEDIA_ANSWER_ACKNOWLEDGEMENT);
        this.signalingSessionCallback.onMediaAcknowledgementFailure(!0, new Error("timed out waiting for Media Answer Acknowledgement"));
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = l;
}));

(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/contentSharingManager", [
      "require",
      "exports",
      "./utilities/constants",
      "./telemetry/telemetryConstants",
      "./utilities/utils",
      "./utilities/requestBuilder",
      "./utilities/stopwatch",
      "./requests/leaveContentSharingRequest",
      "./requests/addContentSharingModalityRequest",
      "./requests/joinContentSharingRequest",
      "./requests/updateContentSharingSessionStateRequest",
      "./requests/updateContentSharingParticipantStateRequest",
      "./requests/takeControlContentSharingRequest"
    ], e);
}(function (e, t) {
  var n = e("./utilities/constants"), r = e("./telemetry/telemetryConstants"), i = e("./utilities/utils"), s = e("./utilities/requestBuilder"), o = e("./utilities/stopwatch"), u = e("./requests/leaveContentSharingRequest"), a = e("./requests/addContentSharingModalityRequest"), f = e("./requests/joinContentSharingRequest"), l = e("./requests/updateContentSharingSessionStateRequest"), c = e("./requests/updateContentSharingParticipantStateRequest"), h = e("./requests/takeControlContentSharingRequest"), p = function () {
      function e(e, t) {
        var s = this;
        this.contentSharingCorrelationId = null;
        this.disposed = !1;
        this.addContentSharingPromise = null;
        this.removeContentSharingPromise = null;
        this.lastSeenServerSeqNo = -1;
        this.nextClientSequenceNumberToUse = 1;
        this.contentSharingSessionId = null;
        this.contentSharingToStartCallWith = null;
        this.fsmState = n["default"].CONTENT_SHARING_FSM_STATE.IDLE;
        this.links = {};
        this.startContentSharingAsync = function (e, t, r, o, u) {
          s.logger.log("startContentSharingAsync called for : " + e);
          var a = i.defer(), f = {
              contentIdentifier: e,
              subject: r || null,
              sessionState: t || null,
              sequenceNumber: s.nextClientSequenceNumberToUse++
            };
          switch (s.fsmState) {
          case n["default"].CONTENT_SHARING_FSM_STATE.CONTENT_SHARING_CONNECTED:
            s.logger.log("there is a ContentSharing session currently connected to"), u ? (s.logger.log("call connected, content sharing ongoing, starting a new one"), s.addContentSharingPromise = a, s.internalStartContentSharing(o, f)) : a.reject(new Error("there is no call ongoing, contentSharing swap is not allowed"));
            break;
          case n["default"].CONTENT_SHARING_FSM_STATE.IDLE:
            s.clearFlags(), s.addContentSharingPromise = a, s.fsmState = n["default"].CONTENT_SHARING_FSM_STATE.CONTENT_SHARING_START_INITIATED, u ? (s.logger.log("call connected, send content sharing request out immediately"), s.internalStartContentSharing(o, f)) : (s.logger.log("contentSharing is to be started when startOutgoingCall is called"), s.contentSharingCorrelationId = i.newGuid(), s.contentSharingToStartCallWith = f);
            break;
          default:
            s.logger.error("there is a ContentSharing session start/join/leave operation pending"), a.reject(new Error("there is a ContentSharing session start/join/leave operation pending"));
          }
          return a.promise;
        };
        this.leaveContentSharingAsync = function () {
          s.logger.log("leaveContentSharingAsync");
          var e = i.defer();
          switch (s.fsmState) {
          case n["default"].CONTENT_SHARING_FSM_STATE.CONTENT_SHARING_CONNECTED:
            s.fsmState = n["default"].CONTENT_SHARING_FSM_STATE.CONTENT_SHARING_LEAVE_INITIATED, s.removeContentSharingPromise = e, s.internalLeaveContentSharing();
            break;
          case n["default"].CONTENT_SHARING_FSM_STATE.IDLE:
            s.logger.log("there is no ContentSharing session currently connected to"), e.resolve();
            break;
          default:
            s.logger.error("there is a ContentSharing session start/join/leave operation pending"), e.reject(new Error("there is a ContentSharing session start/join/leave operation pending"));
          }
          return e.promise;
        };
        this.joinContentSharingAsync = function () {
          s.logger.log("joinContentSharingAsync");
          var e = i.defer();
          if (!s.contentSharingSessionId)
            return s.logger.error("there is no ContentSharing session ongoing"), e.reject(new Error("there is no ContentSharing session ongoing")), e.promise;
          switch (s.fsmState) {
          case n["default"].CONTENT_SHARING_FSM_STATE.CONTENT_SHARING_CONNECTED:
            s.logger.error("there is a ContentSharing session currently connected to"), e.reject(new Error("there is a ContentSharing session currently connected to"));
            break;
          case n["default"].CONTENT_SHARING_FSM_STATE.IDLE:
            var t = s.contentSharingSessionId, r = s.contentSharingCorrelationId;
            s.clearFlags(), s.contentSharingSessionId = t, s.contentSharingCorrelationId = r, s.addContentSharingPromise = e, s.fsmState = n["default"].CONTENT_SHARING_FSM_STATE.CONTENT_SHARING_JOIN_INITIATED, s.internalJoinContentSharing();
            break;
          default:
            s.logger.error("there is a ContentSharing session start/join/leave operation pending"), e.reject(new Error("there is a ContentSharing session start/join/leave operation pending"));
          }
          return e.promise;
        };
        this.updateContentSharingSessionStateAsync = function (e) {
          s.logger.log("updateContentSharingSessionStateAsync . SessionState = " + JSON.stringify(e));
          var t = i.defer();
          switch (s.fsmState) {
          case n["default"].CONTENT_SHARING_FSM_STATE.CONTENT_SHARING_CONNECTED:
            s.internalUpdateContentSharingSessionState(e, t);
            break;
          default:
            s.logger.error("currently there is no ContentSharing session we are connected to"), t.reject(new Error("currently there is no ContentSharing session we are connected to"));
          }
          return t.promise;
        };
        this.takeContentSharingControlAsync = function () {
          s.logger.log("takeContentSharingControlAsync");
          var e = i.defer();
          switch (s.fsmState) {
          case n["default"].CONTENT_SHARING_FSM_STATE.CONTENT_SHARING_CONNECTED:
            s.internalTakeControlContentSharing(e);
            break;
          default:
            s.logger.error("currently there is no ContentSharing session we are connected to"), e.reject(new Error("currently there is no ContentSharing session we are connected to"));
          }
          return e.promise;
        };
        this.updateContentSharingParticipantStateAsync = function () {
          s.logger.log("updateContentSharingParticipantStateAsync");
          var e = i.defer();
          switch (s.fsmState) {
          case n["default"].CONTENT_SHARING_FSM_STATE.CONTENT_SHARING_CONNECTED:
            s.internalUpdateContentSharingParticipantState(e);
            break;
          default:
            s.logger.error("currently there is no ContentSharing session we are connected to"), e.reject(new Error("currently there is no ContentSharing session we are connected to"));
          }
          return e.promise;
        };
        this.getContentSharingInfoToStartSharing = function () {
          return s.fsmState === n["default"].CONTENT_SHARING_FSM_STATE.CONTENT_SHARING_START_INITIATED ? s.contentSharingToStartCallWith : null;
        };
        this.startContentSharingTimer = function () {
          s.logger.log("startContentSharingTimer");
          s.signalingSession.timeoutManager.startTimer(n["default"].TIMEOUT_OPERATIONS.ADD_MODALITY, function () {
            s.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.ADD_MODALITY_TIMEOUT);
            s.signalingSession.timeoutManager.stopTimer(n["default"].TIMEOUT_OPERATIONS.ADD_MODALITY);
            s.rejectLocalQueuedOperations("timed out waiting for ContentSharing to start", {
              code: n["default"].CALL_END_CODE.TIMEOUT,
              subCode: n["default"].CALL_END_SUB_CODE.CALL_ESTABLISHMENT_TIMEOUT,
              phrase: n["default"].CALL_END_PHRASE.ESTABLISHMENT_TIMEOUT
            }, s.fsmState !== n["default"].CONTENT_SHARING_FSM_STATE.CONTENT_SHARING_CONNECTED);
          });
        };
        this.dispose = function (e) {
          s.logger.log("ContentSharingManager :: dispose");
          s.disposed = !0;
          s.rejectLocalQueuedOperations("call ended", e || {
            code: n["default"].CALL_END_CODE.SUCCESS,
            subCode: n["default"].CALL_END_SUB_CODE.SUCCESS,
            phrase: n["default"].CALL_END_PHRASE.LOCAL_USER_INITIATED
          }, !0);
        };
        this.handleContentSharingUpdate = function (e) {
          s.logger.log("handleContentSharingUpdate");
          s.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_CONTENT_SHARING_UPDATE);
          if (!s.contentSharingSessionId) {
            s.logger.log("ignoring contentSharingUpdate since there is no content sharing ongoing");
            return;
          }
          if (s.contentSharingSessionId !== e.sessionId) {
            s.logger.log("ignoring contentSharingUpdate : current sessionId = " + s.contentSharingSessionId + " received sessionId = " + e.sessionId);
            return;
          }
          if (e.sequenceNumber <= s.lastSeenServerSeqNo) {
            s.logger.log("ignoring contentSharingUpdate. Last seen seq = " + s.lastSeenServerSeqNo + " current seq = " + e.sequenceNumber);
            return;
          }
          s.lastSeenServerSeqNo = e.sequenceNumber;
          if (s.isSelfInitiatedAction(e)) {
            s.logger.log("it is an update caused by me, dont fire callback");
            return;
          }
          s.logger.log("raising contentSharingUpdated");
          s.signalingSessionCallback.onContentSharingUpdated({
            contentIdentifier: e.identifier,
            presenter: e.presenter.id,
            subject: e.subject || null,
            sessionState: e.sessionState || null
          });
        };
        this.handleAddModalitySuccess = function (e) {
          s.logger.log("ContentSharingManager :: handleAddModalitySuccess");
          s.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_ADD_MODALITY_SUCCESS);
          switch (s.fsmState) {
          case n["default"].CONTENT_SHARING_FSM_STATE.CONTENT_SHARING_START_INITIATED:
          case n["default"].CONTENT_SHARING_FSM_STATE.CONTENT_SHARING_CONNECTED:
            e.modalitySuccess.contentSharing ? (s.fsmState = n["default"].CONTENT_SHARING_FSM_STATE.CONTENT_SHARING_CONNECTED, s.saveLinksAndResolveContentSharingPromise(e.modalitySuccess.contentSharing), s.addContentSharingPromise = null) : s.logger.log("ignoring addModalitySuccess as it doesnt have a contentSharing blob");
            break;
          default:
            s.logger.log("ContentSharingManager :: ignoring addModalitySuccess since not waiting for one");
          }
        };
        this.handleAddModalityFailure = function (e) {
          s.logger.log("ContentSharingManager :: handleAddModalityFailure");
          s.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_ADD_MODALITY_FAILURE);
          switch (s.fsmState) {
          case n["default"].CONTENT_SHARING_FSM_STATE.CONTENT_SHARING_START_INITIATED:
          case n["default"].CONTENT_SHARING_FSM_STATE.CONTENT_SHARING_CONNECTED:
            if (e.modalityFailure.contentSharing) {
              s.fsmState = s.fsmState === n["default"].CONTENT_SHARING_FSM_STATE.CONTENT_SHARING_CONNECTED ? n["default"].CONTENT_SHARING_FSM_STATE.CONTENT_SHARING_CONNECTED : n["default"].CONTENT_SHARING_FSM_STATE.IDLE;
              var t = e.modalityFailure.contentSharing;
              s.logger.log("ContentSharingAdd failed for reason : " + i.getPrintableObject(t));
              var o = {
                code: t.code,
                subCode: t.subCode,
                phrase: t.phrase
              };
              s.signalingSession.timeoutManager.stopTimer(n["default"].TIMEOUT_OPERATIONS.ADD_MODALITY);
              s.rejectLocalQueuedOperations(o.phrase, o, s.fsmState !== n["default"].CONTENT_SHARING_FSM_STATE.CONTENT_SHARING_CONNECTED);
            } else
              s.logger.log("ignoring addModalityFailure as it doesnt have a contentSharing blob");
            break;
          default:
            s.logger.log("ContentSharingManager :: ignoring addModalityFailure since not waiting for one");
          }
        };
        this.handleIncomingContentSharingIfAny = function (e) {
          s.logger.log("ContentSharingManager :: handleIncomingContentSharing");
          if (!e.activeModalities.contentSharing) {
            s.logger.log("ContentSharingManager :: handleIncomingContentSharingIfAny : no contentSharing blob");
            return;
          }
          if (s.isSelfInitiatedAction(e.activeModalities.contentSharing)) {
            s.logger.log("it is started by me, dont fire callback");
            return;
          }
          if (!s.contentSharingSessionId) {
            s.logger.log("there is no currently ongoing sharing ... raising session started");
            s.raiseContentSharingStarted(e.activeModalities.contentSharing);
            return;
          }
          s.contentSharingSessionId === e.activeModalities.contentSharing.sessionId ? s.logger.log("ignoring ConvUpdate since ongoing contentSharingSessionId == incoming sessionId") : (s.logger.log("there is an ongoing content sharing session. we got informed of a new one. Firing onstopped + onstarted"), s.raiseContentSharingStopped("8:unknown", {
            code: n["default"].CALL_END_CODE.SUCCESS,
            subCode: n["default"].CALL_END_SUB_CODE.SUCCESS,
            phrase: n["default"].CALL_END_PHRASE.REMOTE_USER_INITIATED
          }), s.raiseContentSharingStarted(e.activeModalities.contentSharing));
        };
        this.handleContentSharingEnd = function (e) {
          s.logger.log("handleContentSharingEnd");
          s.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_CONTENT_SHARING_END);
          if (!s.contentSharingSessionId) {
            s.logger.log("ignoring contentSharingEnd since there is no content sharing ongoing");
            return;
          }
          if (s.isSelfInitiatedAction(e)) {
            s.logger.log("it is ended by me, dont fire callback");
            return;
          }
          s.contentSharingSessionId !== e.sessionId ? s.logger.log("ignoring contentSharingEnd since ongoing contentSharingSessionId !== incoming sessionId") : s.raiseContentSharingStopped(e.presenter.id, {
            code: e.contentSharingTransactionEnd.code,
            subCode: e.contentSharingTransactionEnd.subCode,
            phrase: e.contentSharingTransactionEnd.phrase
          });
        };
        this.signalingSession = e;
        this.signalingSessionCallback = t;
        this.logger = e.logger.createChild(function () {
          return "[" + s.fsmState + "]" + "[cs=" + s.contentSharingSessionId + "]" + "[cc=" + s.contentSharingCorrelationId + "]";
        });
      }
      return e.prototype.isSelfInitiatedAction = function (e) {
        return e.presenter.participantId === this.signalingSession.participantManager.localParticipant.participantId;
      }, e.prototype.raiseContentSharingStopped = function (e, t) {
        this.logger.log("ContentSharingManager :: raiseContentSharingStopped");
        this.clearFlags();
        this.signalingSessionCallback.onContentSharingStopped({
          endedBy: e,
          reason: t
        });
      }, e.prototype.raiseContentSharingStarted = function (e) {
        this.logger.log("ContentSharingManager :: raiseContentSharingStarted");
        this.contentSharingSessionId = e.sessionId;
        this.contentSharingCorrelationId = e.contentSharingCorrelationId;
        this.links[n["default"].LINKS.CONTENT_SHARING_CONTROLLER] = e.links.contentSharingController;
        var t = {
          contentIdentifier: e.identifier,
          presenter: e.presenter.id,
          subject: e.subject || null,
          sessionState: e.sessionState || null
        };
        this.signalingSessionCallback.onContentSharingStarted(t);
      }, e.prototype.saveLinksAndResolveContentSharingPromise = function (e) {
        this.logger.log("ContentSharingManager :: saveLinksAndResolveContentSharingPromise");
        var t = {
          contentIdentifier: e.identifier,
          presenter: e.presenter.id,
          subject: e.subject || null,
          sessionState: e.sessionState || null
        };
        this.links[n["default"].LINKS.CONTENT_SHARING_CONTROLLER] = e.links.contentSharingController;
        this.links[n["default"].LINKS.CONTENT_SHARING_TAKE_CONTROL] = e.links.takeControl;
        this.links[n["default"].LINKS.CONTENT_SHARING_UPDATE_SESSION_STATE] = e.links.updateSessionState;
        this.links[n["default"].LINKS.CONTENT_SHARING_UPDATE_PARTICIPANT_STATE] = e.links.sync;
        this.links[n["default"].LINKS.CONTENT_SHARING_LEAVE] = e.links.leave;
        this.contentSharingSessionId = e.sessionId;
        this.contentSharingCorrelationId = e.contentSharingCorrelationId;
        this.lastSeenServerSeqNo = -1;
        this.signalingSession.timeoutManager.stopTimer(n["default"].TIMEOUT_OPERATIONS.ADD_MODALITY);
        this.addContentSharingPromise.resolve(t);
      }, e.prototype.internalStartContentSharing = function (e, t) {
        var u = this;
        this.logger.log("ContentSharingManager :: internalStartContentSharing");
        i.assertNotNullOrEmpty(e, "correct addModality url is not provided");
        var f = o.build();
        this.signalingSession.ensureLatestTrouterUrl(r["default"].NETWORK_REQUESTS.ADD_CONTENT_SHARING_MODALITY).then(function () {
          return u.startContentSharingTimer(), u.contentSharingCorrelationId = i.newGuid(), s.get(u.signalingSession, r["default"].NETWORK_REQUESTS.ADD_CONTENT_SHARING_MODALITY, a.getPayload(u.signalingSession, t));
        }).then(function (t) {
          return u.signalingSession.signalingAgentConfig.httpRequestDispatcher.postAsync(e, t);
        }).then(function () {
          u.disposed || u.signalingSession.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.ADD_CONTENT_SHARING_MODALITY, !0, f.duration());
        })["catch"](function (e) {
          var t = i.getPrintableObject(e);
          u.logger.error("internalStartContentSharing failed because : " + t);
          u.disposed || (u.signalingSession.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.ADD_CONTENT_SHARING_MODALITY, !1, f.duration()), u.signalingSession.timeoutManager.stopTimer(n["default"].TIMEOUT_OPERATIONS.ADD_MODALITY), u.rejectLocalQueuedOperations(e, i.getErrorForXHRFailure(e).error, u.fsmState !== n["default"].CONTENT_SHARING_FSM_STATE.CONTENT_SHARING_CONNECTED));
        });
      }, e.prototype.internalTakeControlContentSharing = function (e) {
        var t = this;
        this.logger.log("ContentSharingManager :: internalTakeControlContentSharing");
        i.assertNotNullOrEmpty(this.links[n["default"].LINKS.CONTENT_SHARING_TAKE_CONTROL], "correct contentSharingTakeControl url is not provided");
        var u = o.build();
        s.get(this.signalingSession, r["default"].NETWORK_REQUESTS.TAKE_CONTROL_CONTENT_SHARING, h.getPayload(this.signalingSession)).then(function (e) {
          return t.signalingSession.signalingAgentConfig.httpRequestDispatcher.postAsync(t.links[n["default"].LINKS.CONTENT_SHARING_TAKE_CONTROL], e);
        }).then(function (n) {
          t.disposed || (t.nextClientSequenceNumberToUse = n.response.sessionUpdateSequenceNumber++, t.signalingSession.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.TAKE_CONTROL_CONTENT_SHARING, !0, u.duration()), e.resolve({
            contentIdentifier: n.response.identifier,
            presenter: n.response.presenter.id,
            subject: n.response.subject || null,
            sessionState: n.response.sessionState || null
          }));
        })["catch"](function (n) {
          var s = i.getPrintableObject(n);
          t.logger.error("internalTakeControlContentSharing failed because : " + s);
          if (!t.disposed) {
            t.signalingSession.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.TAKE_CONTROL_CONTENT_SHARING, !1, u.duration());
            var o = new Error(n);
            o.endCode = i.getErrorForXHRFailure(n).error;
            e.reject(o);
          }
        });
      }, e.prototype.internalUpdateContentSharingParticipantState = function (e) {
        var t = this;
        this.logger.log("ContentSharingManager :: internalUpdateContentSharingParticipantState");
        i.assertNotNullOrEmpty(this.links[n["default"].LINKS.CONTENT_SHARING_UPDATE_PARTICIPANT_STATE], "correct confirmContentSharingView url is not provided");
        var u = o.build();
        s.get(this.signalingSession, r["default"].NETWORK_REQUESTS.UPDATE_PARTICIPANT_STATE_CONTENT_SHARING, c.getPayload(this.signalingSession)).then(function (e) {
          return t.signalingSession.signalingAgentConfig.httpRequestDispatcher.postAsync(t.links[n["default"].LINKS.CONTENT_SHARING_UPDATE_PARTICIPANT_STATE], e);
        }).then(function () {
          t.disposed || (t.signalingSession.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.UPDATE_PARTICIPANT_STATE_CONTENT_SHARING, !0, u.duration()), e.resolve());
        })["catch"](function (n) {
          var s = i.getPrintableObject(n);
          t.logger.error("internalUpdateContentSharingParticipantState failed because : " + s);
          if (!t.disposed) {
            t.signalingSession.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.UPDATE_PARTICIPANT_STATE_CONTENT_SHARING, !1, u.duration());
            var o = new Error(n);
            o.endCode = i.getErrorForXHRFailure(n).error;
            e.reject(o);
          }
        });
      }, e.prototype.internalUpdateContentSharingSessionState = function (e, t) {
        var u = this;
        this.logger.log("ContentSharingManager :: internalUpdateContentSharingSessionState");
        i.assertNotNullOrEmpty(this.links[n["default"].LINKS.CONTENT_SHARING_UPDATE_SESSION_STATE], "correct sendUpdateSessionState url is not provided");
        var a = o.build();
        this.signalingSession.ensureLatestTrouterUrl(r["default"].NETWORK_REQUESTS.UPDATE_SESSION_STATE_CONTENT_SHARING).then(function () {
          return s.get(u.signalingSession, r["default"].NETWORK_REQUESTS.UPDATE_SESSION_STATE_CONTENT_SHARING, l.getPayload(u.signalingSession, e, u.nextClientSequenceNumberToUse++));
        }).then(function (e) {
          return u.signalingSession.signalingAgentConfig.httpRequestDispatcher.postAsync(u.links[n["default"].LINKS.CONTENT_SHARING_UPDATE_SESSION_STATE], e);
        }).then(function () {
          u.disposed || (u.signalingSession.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.UPDATE_SESSION_STATE_CONTENT_SHARING, !0, a.duration()), t.resolve());
        })["catch"](function (e) {
          var n = i.getPrintableObject(e);
          u.logger.error("internalUpdateContentSharingSessionState failed because : " + n);
          if (!u.disposed) {
            u.signalingSession.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.UPDATE_SESSION_STATE_CONTENT_SHARING, !1, a.duration());
            var s = new Error(e);
            s.endCode = i.getErrorForXHRFailure(e).error;
            t.reject(s);
          }
        });
      }, e.prototype.internalJoinContentSharing = function () {
        var e = this;
        this.logger.log("ContentSharingManager :: internalJoinContentSharing");
        i.assertNotNullOrEmpty(this.links[n["default"].LINKS.CONTENT_SHARING_CONTROLLER], "correct joinContentSharing url is not provided");
        var t = o.build();
        this.signalingSession.ensureLatestTrouterUrl(r["default"].NETWORK_REQUESTS.JOIN_CONTENT_SHARING).then(function () {
          return s.get(e.signalingSession, r["default"].NETWORK_REQUESTS.JOIN_CONTENT_SHARING, f.getPayload(e.signalingSession));
        }).then(function (t) {
          return e.signalingSession.signalingAgentConfig.httpRequestDispatcher.postAsync(e.links[n["default"].LINKS.CONTENT_SHARING_CONTROLLER], t);
        }).then(function (i) {
          e.disposed || (e.signalingSession.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.JOIN_CONTENT_SHARING, !0, t.duration()), e.fsmState = n["default"].CONTENT_SHARING_FSM_STATE.CONTENT_SHARING_CONNECTED, e.saveLinksAndResolveContentSharingPromise(i.response), e.addContentSharingPromise = null);
        })["catch"](function (n) {
          var s = i.getPrintableObject(n);
          e.logger.error("internalJoinContentSharing failed because : " + s);
          if (!e.disposed) {
            e.signalingSession.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.JOIN_CONTENT_SHARING, !1, t.duration());
            var o = i.getErrorForXHRFailure(n).error;
            e.rejectLocalQueuedOperations(n, o, !0);
          }
        });
      }, e.prototype.internalLeaveContentSharing = function () {
        var e = this;
        this.logger.log("ContentSharingManager :: internalLeaveContentSharing");
        i.assertNotNullOrEmpty(this.links[n["default"].LINKS.CONTENT_SHARING_LEAVE], "correct leave url is not set");
        var t = o.build();
        this.signalingSession.ensureLatestTrouterUrl(r["default"].NETWORK_REQUESTS.LEAVE_CONTENT_SHARING).then(function () {
          return s.get(e.signalingSession, r["default"].NETWORK_REQUESTS.LEAVE_CONTENT_SHARING, u.getPayload(e.signalingSession, {
            code: n["default"].CALL_END_CODE.SUCCESS,
            subCode: n["default"].CALL_END_SUB_CODE.SUCCESS,
            phrase: n["default"].CALL_END_PHRASE.LOCAL_USER_INITIATED
          }));
        }).then(function (t) {
          return e.signalingSession.signalingAgentConfig.httpRequestDispatcher.postAsync(e.links[n["default"].LINKS.CONTENT_SHARING_LEAVE], t);
        }).then(function () {
          e.disposed || (e.signalingSession.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.LEAVE_CONTENT_SHARING, !0, t.duration()), e.clearFlags(), e.removeContentSharingPromise && (e.removeContentSharingPromise.resolve(null), e.removeContentSharingPromise = null));
        })["catch"](function (n) {
          var s = i.getPrintableObject(n);
          e.logger.error("internalLeaveContentSharing failed because : " + s);
          e.disposed || (e.signalingSession.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.LEAVE_CONTENT_SHARING, !1, t.duration()), e.clearFlags(), e.removeContentSharingPromise && (e.removeContentSharingPromise.resolve(null), e.removeContentSharingPromise = null));
        });
      }, e.prototype.rejectLocalQueuedOperations = function (e, t, n) {
        this.logger.log("rejectLocalQueuedOperations");
        n && this.clearFlags();
        var r = new Error(e);
        t && (r.endCode = t);
        this.removeContentSharingPromise && (this.removeContentSharingPromise.reject(r), this.removeContentSharingPromise = null);
        this.addContentSharingPromise && (this.addContentSharingPromise.reject(r), this.addContentSharingPromise = null);
      }, e.prototype.clearFlags = function () {
        this.contentSharingSessionId = null;
        this.contentSharingCorrelationId = null;
        this.contentSharingToStartCallWith = null;
        this.lastSeenServerSeqNo = -1;
        this.nextClientSequenceNumberToUse = 1;
        this.fsmState = n["default"].CONTENT_SHARING_FSM_STATE.IDLE;
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = p;
}));

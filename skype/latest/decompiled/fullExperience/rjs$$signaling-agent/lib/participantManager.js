(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/participantManager", [
      "require",
      "exports",
      "./utilities/constants",
      "./telemetry/telemetryConstants",
      "./utilities/utils",
      "./utilities/requestBuilder",
      "./utilities/stopwatch",
      "./participant",
      "./requests/addParticipantAndModalityRequest",
      "./requests/removeParticipantRequest",
      "./requests/muteRequest",
      "./requests/unmuteRequest",
      "./requests/approveUnmuteRequest",
      "./requests/rejectUnmuteRequest"
    ], e);
}(function (e, t) {
  var n = e("./utilities/constants"), r = e("./telemetry/telemetryConstants"), i = e("./utilities/utils"), s = e("./utilities/requestBuilder"), o = e("./utilities/stopwatch"), u = e("./participant"), a = e("./requests/addParticipantAndModalityRequest"), f = e("./requests/removeParticipantRequest"), l = e("./requests/muteRequest"), c = e("./requests/unmuteRequest"), h = e("./requests/approveUnmuteRequest"), p = e("./requests/rejectUnmuteRequest"), d = function () {
      function e(e, t, u) {
        var a = this;
        this.connectedRemoteParticipantIds = {};
        this.disposed = !1;
        this.lastSeenRosterSeqNo = -1;
        this.localAddParticipantRequests = {};
        this.localRemoveParticipantRequests = {};
        this.unmuteApprovalLinks = {};
        this.unmuteRequestPromise = null;
        this.setParticipantId = function (e) {
          e && (a.localParticipant.participantId = e);
        };
        this.addParticipantAsync = function (e, t, n) {
          a.logger.log("addParticipantAsync called for : " + e.id);
          var r = i.defer();
          return a.connectedRemoteParticipantIds.hasOwnProperty(e.id) ? (a.logger.error("the given participant is already connected to the call : " + e.id), r.reject(new Error("the given participant is already connected to the call"))) : a.localAddParticipantRequests.hasOwnProperty(e.id) ? (a.logger.error("there is an existing pending request to add the participant : " + e.id), r.reject(new Error("there is an existing pending request to add the participant"))) : (i.tryAddNewKeyToHashTable(a.localAddParticipantRequests, e.id, {
            participant: e,
            promise: r
          }), n && a.sendNetworkRequestForAddingParticipant(e, t)), r.promise;
        };
        this.removeParticipantAsync = function (e, t) {
          a.logger.log("removeParticipantAsync called for : " + e.id);
          i.assertNotNullOrEmpty(t, "correct removeParticipantUrl is not provided");
          var u = i.defer(), l = i.getHashTableCount(a.connectedRemoteParticipantIds);
          if (l === 0)
            a.logger.error("There are no participants to remove : " + e.id), u.reject(new Error("There are no participants to remove"));
          else if (l === 1)
            a.logger.error("cannot remove a participant from a 2 party call : " + e.id), u.reject(new Error("cannot remove a participant from a 2 party call. End the call instead"));
          else if (a.connectedRemoteParticipantIds.hasOwnProperty(e.id)) {
            i.tryAddNewKeyToHashTable(a.localRemoveParticipantRequests, e.id, {
              participant: e,
              promise: u
            });
            var c = o.build();
            a.signalingSession.ensureLatestTrouterUrl(r["default"].NETWORK_REQUESTS.REMOVE_PARTICIPANT).then(function () {
              return a.signalingSession.timeoutManager.startTimer(n["default"].TIMEOUT_OPERATIONS.REMOVE_PARTICIPANT, function () {
                a.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.REMOVE_PARTICIPANT_TIMEOUT);
                a.signalingSession.timeoutManager.stopTimer(n["default"].TIMEOUT_OPERATIONS.REMOVE_PARTICIPANT, e.id);
                a.rejectPromiseAndDeleteFromHashTable(a.localRemoveParticipantRequests, e.id, "timed out waiting for participant to not show up in roster", {
                  code: n["default"].CALL_END_CODE.TIMEOUT,
                  subCode: n["default"].CALL_END_SUB_CODE.CALL_PARTICIPANT_REMOVAL_TIMEOUT,
                  phrase: n["default"].CALL_END_PHRASE.PARTICIPANT_REMOVAL_TIMEOUT
                });
              }, e.id), s.get(a.signalingSession, r["default"].NETWORK_REQUESTS.REMOVE_PARTICIPANT, f.getPayload(a.signalingSession, e));
            }).then(function (e) {
              return a.signalingSession.signalingAgentConfig.httpRequestDispatcher.postAsync(t, e);
            }).then(function () {
              a.disposed || a.signalingSession.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.REMOVE_PARTICIPANT, !0, c.duration());
            })["catch"](function (t) {
              var s = i.getPrintableObject(t);
              a.logger.error("removeParticipantAsync failed because : " + s);
              a.disposed || (a.signalingSession.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.REMOVE_PARTICIPANT, !1, c.duration()), a.signalingSession.timeoutManager.stopTimer(n["default"].TIMEOUT_OPERATIONS.REMOVE_PARTICIPANT, e.id), a.rejectPromiseAndDeleteFromHashTable(a.localRemoveParticipantRequests, e.id, s, n["default"].CALL_END_NETWORK_ERROR));
            });
          } else
            a.logger.error("cannot remove a participant not connected to the call : " + e.id), u.reject(new Error("cannot remove a participant not connected to the call"));
          return u.promise;
        };
        this.getParticipantsToInitiateCallWith = function () {
          a.logger.log("getParticipantsToInitiateCallWith");
          var e = [];
          for (var t in a.localAddParticipantRequests)
            a.localAddParticipantRequests.hasOwnProperty(t) && e.push(a.localAddParticipantRequests[t].participant);
          return e;
        };
        this.initializeForIncomingCall = function (e) {
          a.logger.log("initializeForIncomingCall");
          a.rejectLocalQueuedOperations("incoming calls cannot add/remove participants until call is connected");
        };
        this.handleAddParticipantSuccess = function () {
          a.logger.log("handleAddParticipantSuccess");
          a.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_ADD_PARTICIPANT_SUCCESS);
        };
        this.handleAddParticipantFailure = function (e) {
          a.logger.log("handleAddParticipantFailure");
          e.modalityFailure ? (a.logger.error("handleAddParticipantFailure - got modalityFailure : " + i.getPrintableObject(e)), a.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_ADD_PARTICIPANT_MODALITY_FAILURE)) : e.participants && (a.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_ADD_PARTICIPANT_FAILURE), a.internalHandleAddParticipantFailure(e));
        };
        this.handleRemoveParticipantFailure = function (e) {
          a.logger.log("handleRemoveParticipantFailure");
          a.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_REMOVE_PARTICIPANT_FAILURE);
          for (var t in e.participants)
            e.participants.hasOwnProperty(t) && a.internalHandleRemoveParticipantFailure(t, e.participants[t]);
        };
        this.handleRemoveParticipantSuccess = function (e) {
          a.logger.log("handleRemoveParticipantSuccess");
          a.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_REMOVE_PARTICIPANT_SUCCESS);
        };
        this.handleUnmuteConfirmRequest = function (e) {
          a.logger.log("handleUnmuteConfirmRequest");
          a.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_UNMUTE_CONFIRM);
          a.unmuteApprovalLinks[e.from.id] = {
            approve: e.links.approveUnmute,
            reject: e.links.rejectUnmute
          };
          a.signalingSessionCallback.onUnmuteRequested(e.from.id);
        };
        this.approveUnmuteRequestAsync = function (e) {
          a.logger.log("approveUnmuteRequestAsync");
          var t = i.defer();
          return a.unmuteApprovalLinks.hasOwnProperty(e) ? (a.signalingSession.ensureLatestTrouterUrl(r["default"].NETWORK_REQUESTS.APPROVE_UNMUTE).then(function () {
            a.muteUnmute(r["default"].NETWORK_REQUESTS.APPROVE_UNMUTE, h.getPayload(a.signalingSession), t, a.unmuteApprovalLinks[e].approve);
          })["catch"](function (e) {
            var n = i.getPrintableObject(e);
            a.logger.error("approveUnmuteRequestAsync failed because : " + n);
            t.reject(new Error(e));
          }), t.promise) : (t.reject(new Error("no unmute links found for given participant")), t.promise);
        };
        this.rejectUnmuteRequestAsync = function (e, t) {
          a.logger.log("rejectUnmuteRequestAsync");
          var s = i.defer();
          if (!a.unmuteApprovalLinks.hasOwnProperty(e))
            return s.reject(new Error("no unmute links found for given participant")), s.promise;
          var o = t || {
            code: n["default"].CALL_END_CODE.REJECT,
            subCode: n["default"].CALL_END_SUB_CODE.UNMUTE_REQUEST_REJECTED,
            phrase: n["default"].CALL_END_PHRASE.UNMUTE_REQUEST_REJECTED
          };
          return a.signalingSession.ensureLatestTrouterUrl(r["default"].NETWORK_REQUESTS.REJECT_UNMUTE).then(function () {
            a.muteUnmute(r["default"].NETWORK_REQUESTS.REJECT_UNMUTE, p.getPayload(a.signalingSession, o), s, a.unmuteApprovalLinks[e].reject);
          })["catch"](function (e) {
            var t = i.getPrintableObject(e);
            a.logger.error("rejectUnmuteRequestAsync failed because : " + t);
            s.reject(new Error(e));
          }), s.promise;
        };
        this.handleUnmuteFailure = function (e) {
          a.logger.log("handleUnmuteFailure");
          a.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_UNMUTE_FAILURE);
          if (a.unmuteRequestPromise) {
            var t = new Error(e.transactionEnd.phrase);
            t.endCode = {
              code: e.transactionEnd.code,
              subCode: e.transactionEnd.subCode,
              phrase: e.transactionEnd.phrase
            };
            a.unmuteRequestPromise.reject(t);
          }
        };
        this.handleUnmuteSuccess = function (e) {
          a.logger.log("handleUnmuteSuccess");
          a.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_UNMUTE_SUCCESS);
          a.unmuteRequestPromise && a.unmuteRequestPromise.resolve(null);
        };
        this.handleRosterUpdate = function (e) {
          a.logger.log("handleRosterUpdate");
          a.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_ROSTER_UPDATE);
          if (e.fakeRoster)
            a.logger.log("fake roster for 1:1 calls. Ignoring sequenceNumber checks");
          else {
            if (e.sequenceNumber <= a.lastSeenRosterSeqNo) {
              a.logger.log("ignoring rosterUpdate. Last seen seq = " + a.lastSeenRosterSeqNo + " current seq = " + e.sequenceNumber);
              return;
            }
            a.lastSeenRosterSeqNo = e.sequenceNumber;
          }
          var t = a.getCurrentParticipantsInCallModality(!1);
          for (var n in e.participants)
            e.participants.hasOwnProperty(n) && a.handleRosterParticipant(e.participants[n], t);
          a.checkForRemovedParticipants(t, e.participants);
        };
        this.muteAsync = function (e, t, s) {
          a.logger.log("muteAsync called with :" + t);
          var o = "specified", u = [];
          switch (t) {
          case n["default"].MUTE_SCOPE.MYSELF:
            u.push({ id: a.localParticipant.id });
            break;
          case n["default"].MUTE_SCOPE.EVERYONE_ELSE:
            o = "all";
            break;
          case n["default"].MUTE_SCOPE.SPECIFIED_PARTICIPANTS:
            i.assertNotNullOrEmpty(s, "array of participantIds must be specified for SPECIFIED_PARTICIPANTS mute scope"), s.forEach(function (e) {
              u.push({ id: e });
            });
            break;
          default:
            i.assert(!1, "muteScope is a required param. please pass in a valid value.");
          }
          var f = i.defer();
          if (t === n["default"].MUTE_SCOPE.SPECIFIED_PARTICIPANTS) {
            var c = a.areParticipantsConnectedToCall(s);
            if (!c.result)
              return f.reject(new Error("specified participant is not connected to call yet. Id = " + c.participant)), f.promise;
          }
          return a.signalingSession.ensureLatestTrouterUrl(r["default"].NETWORK_REQUESTS.MUTE).then(function () {
            a.muteUnmute(r["default"].NETWORK_REQUESTS.MUTE, l.getPayload(a.signalingSession, o, u), f, e);
          })["catch"](function (e) {
            var t = i.getPrintableObject(e);
            a.logger.error("muteAsync failed because : " + t);
            f.reject(new Error(e));
          }), f.promise;
        };
        this.unmuteAsync = function (e) {
          return a.logger.log("unmuteAsync"), a.unmuteRequestPromise = i.defer(), a.signalingSession.ensureLatestTrouterUrl(r["default"].NETWORK_REQUESTS.UNMUTE).then(function () {
            a.muteUnmute(r["default"].NETWORK_REQUESTS.UNMUTE, c.getPayload(a.signalingSession), a.unmuteRequestPromise, e, !0);
          })["catch"](function (e) {
            var t = i.getPrintableObject(e);
            a.logger.error("unmuteAsync failed because : " + t);
            a.unmuteRequestPromise.reject(new Error(e));
          }), a.unmuteRequestPromise.promise;
        };
        this.dispose = function (e) {
          a.logger.log("participantManager :: dispose");
          a.disposed = !0;
          a.rejectLocalQueuedOperations("call ended", e);
          a.signalingSession.telemetryHelper.setParticipantId(a.localParticipant.participantId);
        };
        this.signalingSession = e;
        this.signalingSessionCallback = t;
        this.localParticipant = u;
        this.logger = e.logger;
        this.localParticipant.endpointId || (this.localParticipant.endpointId = i.newGuid());
        this.localParticipant.participantId || (this.localParticipant.participantId = i.newGuid());
        e.signalingAgentConfig.languageCode && (this.localParticipant.languageId = e.signalingAgentConfig.languageCode);
        e.telemetryHelper.setEndPointId(this.localParticipant.endpointId);
      }
      return e.prototype.areParticipantsConnectedToCall = function (e) {
        this.logger.log("areParticipantsConnectedToCall : " + i.getPrintableObject(e));
        var t = this.getCurrentParticipantsInCallModality(!0);
        for (var n = 0; n < e.length; n++)
          if (!t.hasOwnProperty(e[n]))
            return this.logger.log("areParticipantsConnectedToCall : returning false for :" + e[n]), {
              result: !1,
              participant: e[n]
            };
        return this.logger.log("areParticipantsConnectedToCall : returning true"), { result: !0 };
      }, e.prototype.muteUnmute = function (e, t, u, a, f) {
        var l = this;
        this.logger.log("muteUnmute called with operation : " + e);
        if (a) {
          f && this.signalingSession.timeoutManager.startTimer(n["default"].TIMEOUT_OPERATIONS.UNMUTE, function () {
            l.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.UNMUTE_TIMEOUT);
            l.signalingSession.timeoutManager.stopTimer(n["default"].TIMEOUT_OPERATIONS.UNMUTE);
            var e = new Error("timed out waiting for response to request");
            e.endCode = {
              code: n["default"].CALL_END_CODE.TIMEOUT,
              subCode: n["default"].CALL_END_SUB_CODE.UNMUTE_REQUEST_TIMEOUT,
              phrase: n["default"].CALL_END_PHRASE.UNMUTE_REQUEST_TIMEOUT
            };
            l.unmuteRequestPromise.reject(e);
          });
          var c = o.build();
          s.get(this.signalingSession, e, t).then(function (e) {
            return l.signalingSession.signalingAgentConfig.httpRequestDispatcher.postAsync(a, e);
          }).then(function () {
            l.disposed || (l.signalingSession.telemetryHelper.addNetworkOperationCompleted(e, !0, c.duration()), f || u.resolve());
          })["catch"](function (t) {
            var r = i.getPrintableObject(t);
            l.logger.error("mute/unmute failed because : " + r);
            if (!l.disposed) {
              l.signalingSession.telemetryHelper.addNetworkOperationCompleted(e, !1, c.duration());
              f && l.signalingSession.timeoutManager.stopTimer(n["default"].TIMEOUT_OPERATIONS.UNMUTE);
              var s = new Error(t);
              s.endCode = n["default"].CALL_END_NETWORK_ERROR;
              u.reject(s);
            }
          });
        } else
          u.reject(new Error("mute/unmute operation cannot be performed now, the link is not yet available"));
      }, e.prototype.sendNetworkRequestForAddingParticipant = function (e, t) {
        var u = this;
        if (t) {
          var f = o.build();
          this.signalingSession.ensureLatestTrouterUrl(r["default"].NETWORK_REQUESTS.ADD_PARTICIPANT).then(function () {
            return u.signalingSession.timeoutManager.startTimer(n["default"].TIMEOUT_OPERATIONS.ADD_PARTICIPANT, function () {
              u.signalingSession.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.ADD_PARTICIPANT_TIMEOUT);
              u.signalingSession.timeoutManager.stopTimer(n["default"].TIMEOUT_OPERATIONS.ADD_PARTICIPANT, e.id);
              u.rejectPromiseAndDeleteFromHashTable(u.localAddParticipantRequests, e.id, "timed out waiting for participant to show up in roster", {
                code: n["default"].CALL_END_CODE.TIMEOUT,
                subCode: n["default"].CALL_END_SUB_CODE.CALL_ESTABLISHMENT_TIMEOUT,
                phrase: n["default"].CALL_END_PHRASE.ESTABLISHMENT_TIMEOUT
              });
            }, e.id), s.get(u.signalingSession, r["default"].NETWORK_REQUESTS.ADD_PARTICIPANT, a.getPayload(u.signalingSession, e));
          }).then(function (e) {
            return u.signalingSession.signalingAgentConfig.httpRequestDispatcher.postAsync(t, e);
          }).then(function () {
            u.disposed || u.signalingSession.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.ADD_PARTICIPANT, !0, f.duration());
          })["catch"](function (t) {
            var s = i.getPrintableObject(t);
            u.logger.error("sendNetworkRequestForAddingParticipant failed because : " + s);
            u.disposed || (u.signalingSession.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.ADD_PARTICIPANT, !1, f.duration()), u.signalingSession.timeoutManager.stopTimer(n["default"].TIMEOUT_OPERATIONS.ADD_PARTICIPANT, e.id), u.rejectPromiseAndDeleteFromHashTable(u.localAddParticipantRequests, e.id, s, n["default"].CALL_END_NETWORK_ERROR));
          });
        } else
          this.logger.error("sendNetworkRequestForAddingParticipant failed because correct addParticipantUrl is not provided"), this.rejectPromiseAndDeleteFromHashTable(this.localAddParticipantRequests, e.id, "correct addParticipantUrl is not provided", {
            code: n["default"].CALL_END_CODE.LOCAL_ERROR,
            subCode: n["default"].CALL_END_SUB_CODE.CALL_NOT_ATTEMPTED,
            phrase: n["default"].CALL_END_PHRASE.ADD_PARTICIPANT_URL_MISSING
          });
      }, e.prototype.handleRosterParticipant = function (e, t) {
        this.logger.log("handleRosterParticipant for : " + e.details.id);
        if (e.details.id === this.localParticipant.id)
          return;
        var r = u["default"].fromRoster(e);
        if (r) {
          i.tryAddNewKeyToHashTable(this.connectedRemoteParticipantIds, e.details.id, !0);
          var s = t.hasOwnProperty(r.id);
          s && (t[r.id] = !1);
          this.localAddParticipantRequests.hasOwnProperty(r.id) ? (this.logger.log("participant : " + r.id + " appears in roster. Resolving AddParticipant request"), this.signalingSession.timeoutManager.stopTimer(n["default"].TIMEOUT_OPERATIONS.ADD_PARTICIPANT, r.id), this.resolvePromiseAndDeleteFromHashTable(this.localAddParticipantRequests, r)) : this.checkForJoinedOrUpdatedParticipants(r, s);
        }
      }, e.prototype.checkForRemovedParticipants = function (e, t) {
        this.logger.log("checkForRemovedParticipants");
        for (var r in e)
          e.hasOwnProperty(r) && e[r] !== !1 && !this.localAddParticipantRequests.hasOwnProperty(r) && (i.tryRemoveKeyFromHashTable(this.connectedRemoteParticipantIds, r), this.logger.log("firing onParticipantRemoved for : " + r), this.signalingSessionCallback.onParticipantRemoved({ id: r }));
        for (var s in this.localRemoveParticipantRequests)
          this.localRemoveParticipantRequests.hasOwnProperty(s) && !t.hasOwnProperty(s) && (this.logger.log("participant : " + s + " no longer appears in roster. Resolving RemoveParticipant request"), i.tryRemoveKeyFromHashTable(this.connectedRemoteParticipantIds, s), this.signalingSession.timeoutManager.stopTimer(n["default"].TIMEOUT_OPERATIONS.REMOVE_PARTICIPANT, s), this.resolvePromiseAndDeleteFromHashTable(this.localRemoveParticipantRequests, { id: s }));
      }, e.prototype.checkForJoinedOrUpdatedParticipants = function (e, t) {
        t ? (this.logger.log("firing onParticipantUpated for : " + e.id), this.signalingSessionCallback.onParticipantUpdated(e)) : this.localRemoveParticipantRequests.hasOwnProperty(e.id) ? this.logger.log("ignoring participant : " + e.id + " who has been requested to be removed") : (this.logger.log("firing onParticipantJoined for : " + e.id), this.signalingSessionCallback.onParticipantJoined(e));
      }, e.prototype.getCurrentParticipantsInCallModality = function (e) {
        var t = {};
        return this.signalingSessionCallback.getRemoteParticipantCollection().forEach(function (r) {
          if (r.audioState === n["default"].PARTICIPANT_AUDIO_STATE.CONNECTED || !e && r.audioState === n["default"].PARTICIPANT_AUDIO_STATE.CONNECTING)
            t[r.mri] = !0;
        }), t;
      }, e.prototype.resolvePromiseAndDeleteFromHashTable = function (e, t) {
        this.logger.log("resolvePromiseAndDeleteFromHashTable for : " + t.id);
        if (e.hasOwnProperty(t.id)) {
          var n = e[t.id].promise;
          delete e[t.id];
          n.resolve(t);
        }
      }, e.prototype.rejectPromiseAndDeleteFromHashTable = function (e, t, n, r) {
        this.logger.log("rejectPromiseAndDeleteFromHashTable for : " + t + " reason : " + n);
        var i = new Error(n);
        r && (i.endCode = r);
        if (e.hasOwnProperty(t)) {
          var s = e[t].promise;
          delete e[t];
          s.reject(i);
        }
      }, e.prototype.internalHandleRemoveParticipantFailure = function (e, t) {
        if (this.localRemoveParticipantRequests.hasOwnProperty(e)) {
          this.signalingSession.timeoutManager.stopTimer(n["default"].TIMEOUT_OPERATIONS.REMOVE_PARTICIPANT, e);
          this.logger.log("participantRemove failed for : " + e + " reason : " + i.getPrintableObject(t));
          var r = this.getCallEndGivenParticipantFailure(t);
          this.rejectPromiseAndDeleteFromHashTable(this.localRemoveParticipantRequests, e, r.phrase, r);
        }
      }, e.prototype.internalHandleAddParticipantFailure = function (e) {
        for (var t in e.participants)
          if (e.participants.hasOwnProperty(t) && this.localAddParticipantRequests.hasOwnProperty(t)) {
            this.signalingSession.timeoutManager.stopTimer(n["default"].TIMEOUT_OPERATIONS.ADD_PARTICIPANT, t);
            var r = e.participants[t];
            this.logger.log("participantAdd failed for : " + t + " reason : " + i.getPrintableObject(r));
            var s = this.getCallEndGivenParticipantFailure(r);
            this.rejectPromiseAndDeleteFromHashTable(this.localAddParticipantRequests, t, s.phrase, s);
          }
      }, e.prototype.getCallEndGivenParticipantFailure = function (e) {
        var t = {
          code: e.code,
          subCode: e.subCode,
          phrase: e.phrase
        };
        return e.code === n["default"].CALL_END_CODE.CALL_MODALITY_FAILURE && e.callControllerTransactionEnd && (t = {
          code: e.callControllerTransactionEnd.code,
          subCode: e.callControllerTransactionEnd.subCode,
          phrase: e.callControllerTransactionEnd.phrase
        }), t;
      }, e.prototype.rejectLocalQueuedOperations = function (e, t) {
        this.logger.log("rejectLocalQueuedOperations");
        var r = t || {
          code: n["default"].CALL_END_CODE.SUCCESS,
          subCode: n["default"].CALL_END_SUB_CODE.SUCCESS,
          phrase: n["default"].CALL_END_PHRASE.LOCAL_USER_INITIATED
        };
        for (var i in this.localAddParticipantRequests)
          this.localAddParticipantRequests.hasOwnProperty(i) && this.rejectPromiseAndDeleteFromHashTable(this.localAddParticipantRequests, i, e, r);
        for (var s in this.localRemoveParticipantRequests)
          this.localRemoveParticipantRequests.hasOwnProperty(s) && this.rejectPromiseAndDeleteFromHashTable(this.localRemoveParticipantRequests, s, e, r);
        this.localAddParticipantRequests = {};
        this.localRemoveParticipantRequests = {};
        this.connectedRemoteParticipantIds = {};
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = d;
}));

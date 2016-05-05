define("jSkype/services/NGCCallAgent/NGCCallAgent/participantManager", [
  "require",
  "jSkype/services/NGCCallAgent/NGCCallAgent/constants",
  "jSkype/services/NGCCallAgent/NGCCallAgent/telemetryConstants",
  "jSkype/services/NGCCallAgent/NGCCallAgent/utils",
  "jSkype/services/NGCCallAgent/NGCCallAgent/participant",
  "jSkype/services/NGCCallAgent/NGCCallAgent/addParticipantAndModalityRequest",
  "jSkype/services/NGCCallAgent/NGCCallAgent/removeParticipantRequest",
  "jSkype/services/serviceAccessLayer/requestDispatcher",
  "jSkype/services/NGCCallAgent/NGCCallAgent/requestBuilder",
  "swx-enums",
  "jSkype/modelHelpers/personHelper",
  "swx-utils-common",
  "jcafe-property-model"
], function (e) {
  var t = e("jSkype/services/NGCCallAgent/NGCCallAgent/constants"), n = e("jSkype/services/NGCCallAgent/NGCCallAgent/telemetryConstants"), r = e("jSkype/services/NGCCallAgent/NGCCallAgent/utils"), i = e("jSkype/services/NGCCallAgent/NGCCallAgent/participant"), s = e("jSkype/services/NGCCallAgent/NGCCallAgent/addParticipantAndModalityRequest"), o = e("jSkype/services/NGCCallAgent/NGCCallAgent/removeParticipantRequest"), u = e("jSkype/services/serviceAccessLayer/requestDispatcher"), a = e("jSkype/services/NGCCallAgent/NGCCallAgent/requestBuilder"), f = e("swx-enums"), l = e("jSkype/modelHelpers/personHelper"), c = e("swx-utils-common").stopwatch, h = e("jcafe-property-model"), p = function (e, p, d) {
      function E(i, o) {
        if (o) {
          e.timeoutManager.startTimer(t.TIMEOUT_OPERATIONS.ADD_PARTICIPANT, function () {
            e.telemetryHelper.addLocalOperation(n.LOCAL_OPERATIONS.ADD_PARTICIPANT_TIMEOUT), e.timeoutManager.stopTimer(t.TIMEOUT_OPERATIONS.ADD_PARTICIPANT, i.id), k(y, i.id, "timed out waiting for participant to show up in roster", {
              code: t.CALL_END_CODE.TIMEOUT,
              subcode: t.CALL_END_SUB_CODE.CALL_ESTABLISHMENT_TIMEOUT,
              phrase: t.CALL_END_PHRASE.ESTABLISHMENT_TIMEOUT
            });
          }, i.id);
          var f = c.build(), l = s.getPayload(e, i);
          a.get(e, n.NETWORK_REQUESTS.ADD_PARTICIPANT, l).then(function (e) {
            return u.post(o, e);
          }).then(function () {
            m || e.telemetryHelper.addNetworkOperationCompleted(n.NETWORK_REQUESTS.ADD_PARTICIPANT, !0, f.duration());
          }).catch(function (s) {
            var o = r.getPrintableObject(s);
            w.error("sendNetworkRequestForAddingParticipant failed because : " + o), m || (e.telemetryHelper.addNetworkOperationCompleted(n.NETWORK_REQUESTS.ADD_PARTICIPANT, !1, f.duration()), e.timeoutManager.stopTimer(t.TIMEOUT_OPERATIONS.ADD_PARTICIPANT, i.id), k(y, i.id, o, {
              code: t.CALL_END_CODE.NETWORK_ERROR,
              subcode: t.CALL_END_SUB_CODE.FAILED_TO_REACH_SERVICE,
              phrase: t.CALL_END_PHRASE.NETWORK_ERROR
            }));
          });
        } else
          w.error("sendNetworkRequestForAddingParticipant failed because correct addParticipantUrl is not provided"), k(y, i.id, "correct addParticipantUrl is not provided", {
            code: t.CALL_END_CODE.LOCAL_ERROR,
            subcode: t.CALL_END_SUB_CODE.CALL_NOT_ATTEMPTED,
            phrase: t.CALL_END_PHRASE.ADD_PARTICIPANT_URL_MISSING
          });
      }
      function S(n, s) {
        w.log("handleRosterParticipant for : " + n.details.id);
        if (n.details.id === v.localParticipant.id)
          return;
        if (n.call) {
          r.tryAddNewKeyToHashTable(v.connectedRemoteParticipantIds, n.details.id, !0);
          var o = i.fromRoster(n), u = s.hasOwnProperty(o.id);
          u && (s[o.id] = !1), y.hasOwnProperty(o.id) ? (w.log("participant : " + o.id + " appears in roster. Resolving AddParticipant request"), e.timeoutManager.stopTimer(t.TIMEOUT_OPERATIONS.ADD_PARTICIPANT, o.id), C(y, o)) : T(o, u);
        }
      }
      function x(n, i) {
        w.log("checkForRemovedParticipants");
        for (var s in n)
          n.hasOwnProperty(s) && n[s] !== !1 && !y.hasOwnProperty(s) && (r.tryRemoveKeyFromHashTable(v.connectedRemoteParticipantIds, s), w.log("firing onParticipantRemoved for : " + s), p.onParticipantRemoved({
            id: s,
            mediaStreams: []
          }));
        for (var o in b)
          b.hasOwnProperty(o) && !i.hasOwnProperty(o) && (w.log("participant : " + o + " no longer appears in roster. Resolving RemoveParticipant request"), r.tryRemoveKeyFromHashTable(v.connectedRemoteParticipantIds, o), e.timeoutManager.stopTimer(t.TIMEOUT_OPERATIONS.REMOVE_PARTICIPANT, o), C(b, { id: o }));
      }
      function T(e, t) {
        t ? (w.log("firing onParticipantUpated for : " + e.id), p.onParticipantUpdated(e)) : b.hasOwnProperty(e.id) ? w.log("ignoring participant : " + e.id + " who has been requested to be removed") : (w.log("firing onParticipantJoined for : " + e.id), p.onParticipantJoined(e));
      }
      function N() {
        var e = {};
        return p.getRemoteParticipantCollection().forEach(function (t) {
          if (t.audio.state() === f.callConnectionState.Connected || t.audio.state() === f.callConnectionState.Connecting)
            e[l.getKey(t.person.id(), t.person._type())] = !0;
        }), e;
      }
      function C(e, t) {
        w.log("resolvePromiseAndDeleteFromHashTable for : " + t.id);
        var n = e[t.id].promise;
        delete e[t.id], n.resolve(t);
      }
      function k(e, t, n, r) {
        w.log("rejectPromiseAndDeleteFromHashTable for : " + t + " reason : " + n);
        var i = new Error(n);
        r && (i.endCode = r);
        var s = e[t].promise;
        delete e[t], s.reject(i);
      }
      function L() {
        v.localParticipant.endpointId || (v.localParticipant.endpointId = r.newGuid()), v.localParticipant.participantId || (v.localParticipant.participantId = r.newGuid()), e.signalingAgentConfig.languageCode && (v.localParticipant.languageId = e.signalingAgentConfig.languageCode), e.telemetryHelper.setEndPointId(v.localParticipant.endpointId);
      }
      function A(n, i) {
        if (b.hasOwnProperty(n)) {
          e.timeoutManager.stopTimer(t.TIMEOUT_OPERATIONS.REMOVE_PARTICIPANT, n), w.log("participantRemove failed for : " + n + " reason : " + r.getPrintableObject(i));
          var s = M(i);
          k(b, n, s.phrase, s);
        }
      }
      function O(n) {
        for (var i in n.participants)
          if (n.participants.hasOwnProperty(i) && y.hasOwnProperty(i)) {
            e.timeoutManager.stopTimer(t.TIMEOUT_OPERATIONS.ADD_PARTICIPANT, i);
            var s = n.participants[i];
            w.log("participantAdd failed for : " + i + " reason : " + r.getPrintableObject(s));
            var o = M(s);
            k(y, i, o.phrase, o);
          }
      }
      function M(e) {
        var n = {
          code: e.code,
          subCode: e.subCode,
          phrase: e.phrase
        };
        return e.code === t.CALL_END_CODE.CALL_MODALITY_FAILURE && e.callControllerTransactionEnd && (n = {
          code: e.callControllerTransactionEnd.code,
          subCode: e.callControllerTransactionEnd.subCode,
          phrase: e.callControllerTransactionEnd.phrase
        }), n;
      }
      function _(e) {
        w.log("rejectLocalQueuedOperations");
        var n = {
          code: t.CALL_END_CODE.SUCCESS,
          subcode: t.CALL_END_SUB_CODE.SUCCESS,
          phrase: t.CALL_END_PHRASE.LOCAL_USER_INITIATED
        };
        for (var r in y)
          y.hasOwnProperty(r) && k(y, r, e, n);
        for (var i in b)
          b.hasOwnProperty(i) && k(b, i, e, n);
        y = {}, b = {}, v.connectedRemoteParticipantIds = {};
      }
      var v = this, m = !1, g = -1, y = {}, b = {}, w = e.logger;
      v.connectedRemoteParticipantIds = {}, v.localParticipant = d, L(), v.setParticipantId = function (e) {
        e && (v.localParticipant.participantId = e);
      }, v.addParticipantAsync = function (e, t, n) {
        w.log("addParticipantAsync called for : " + e.id);
        var i = h.task();
        return v.connectedRemoteParticipantIds.hasOwnProperty(e.id) ? (w.error("the given participant is already connected to the call : " + e.id), i.reject(new Error("the given participant is already connected to the call"))) : y.hasOwnProperty(e.id) ? (w.error("there is an existing pending request to add the participant : " + e.id), i.reject(new Error("there is an existing pending request to add the participant"))) : (r.tryAddNewKeyToHashTable(y, e.id, {
          participant: e,
          promise: i
        }), n && E(e, t)), i.promise;
      }, v.removeParticipantAsync = function (i, s) {
        w.log("removeParticipantAsync called for : " + i.id), r.assertNotNullOrEmpty(s, "correct removeParticipantUrl is not provided");
        var f = h.task(), l = r.getHashTableCount(v.connectedRemoteParticipantIds);
        if (l === 0)
          w.error("There are no participants to remove : " + i.id), f.reject(new Error("There are no participants to remove"));
        else if (l === 1)
          w.error("cannot remove a participant from a 2 party call : " + i.id), f.reject(new Error("cannot remove a participant from a 2 party call. End the call instead"));
        else if (v.connectedRemoteParticipantIds.hasOwnProperty(i.id)) {
          r.tryAddNewKeyToHashTable(b, i.id, {
            participant: i,
            promise: f
          }), e.timeoutManager.startTimer(t.TIMEOUT_OPERATIONS.REMOVE_PARTICIPANT, function () {
            e.telemetryHelper.addLocalOperation(n.LOCAL_OPERATIONS.REMOVE_PARTICIPANT_TIMEOUT), e.timeoutManager.stopTimer(t.TIMEOUT_OPERATIONS.REMOVE_PARTICIPANT, i.id), k(b, i.id, "timed out waiting for participant to not show up in roster", {
              code: t.CALL_END_CODE.TIMEOUT,
              subcode: t.CALL_END_SUB_CODE.CALL_PARTICIPANT_REMOVAL_TIMEOUT,
              phrase: t.CALL_END_PHRASE.PARTICIPANT_REMOVAL_TIMEOUT
            });
          }, i.id);
          var p = c.build(), d = o.getPayload(e, i);
          a.get(e, n.NETWORK_REQUESTS.REMOVE_PARTICIPANT, d).then(function (e) {
            return u.post(s, e);
          }).then(function () {
            m || e.telemetryHelper.addNetworkOperationCompleted(n.NETWORK_REQUESTS.REMOVE_PARTICIPANT, !0, p.duration());
          }).catch(function (s) {
            var o = r.getPrintableObject(s);
            w.error("removeParticipantAsync failed because : " + o), m || (e.telemetryHelper.addNetworkOperationCompleted(n.NETWORK_REQUESTS.REMOVE_PARTICIPANT, !1, p.duration()), e.timeoutManager.stopTimer(t.TIMEOUT_OPERATIONS.REMOVE_PARTICIPANT, i.id), k(b, i.id, o, {
              code: t.CALL_END_CODE.NETWORK_ERROR,
              subcode: t.CALL_END_SUB_CODE.FAILED_TO_REACH_SERVICE,
              phrase: t.CALL_END_PHRASE.NETWORK_ERROR
            }));
          });
        } else
          w.error("cannot remove a participant not connected to the call : " + i.id), f.reject(new Error("cannot remove a participant not connected to the call"));
        return f.promise;
      }, v.getParticipantsToInitiateCallWith = function () {
        w.log("getParticipantsToInitiateCallWith");
        var e = [];
        for (var t in y)
          y.hasOwnProperty(t) && e.push(y[t].participant);
        return e;
      }, v.initializeForIncomingCall = function () {
        w.log("initializeForIncomingCall"), _("incoming calls cannot add/remove participants until call is connected");
      }, v.handleAddParticipantSuccess = function () {
        w.log("handleAddParticipantSuccess"), e.telemetryHelper.addLocalOperation(n.LOCAL_OPERATIONS.HANDLE_ADD_PARTICIPANT_SUCCESS);
      }, v.handleAddParticipantFailure = function (t) {
        w.log("handleAddParticipantFailure"), t.modalityFailure ? (w.error("handleAddParticipantFailure - got modalityFailure : " + r.getPrintableObject(t)), e.telemetryHelper.addLocalOperation(n.LOCAL_OPERATIONS.HANDLE_ADD_PARTICIPANT_MODALITY_FAILURE)) : t.participants && (e.telemetryHelper.addLocalOperation(n.LOCAL_OPERATIONS.HANDLE_ADD_PARTICIPANT_FAILURE), O(t));
      }, v.handleRemoveParticipantFailure = function (t) {
        w.log("handleRemoveParticipantFailure"), e.telemetryHelper.addLocalOperation(n.LOCAL_OPERATIONS.HANDLE_REMOVE_PARTICIPANT_FAILURE);
        for (var r in t.participants)
          t.participants.hasOwnProperty(r) && A(r, t.participants[r]);
      }, v.handleRemoveParticipantSuccess = function () {
        w.log("handleRemoveParticipantSuccess"), e.telemetryHelper.addLocalOperation(n.LOCAL_OPERATIONS.HANDLE_REMOVE_PARTICIPANT_SUCCESS);
      }, v.handleConversationUpdate = function (t) {
        w.log("handleConversationUpdate"), e.telemetryHelper.addLocalOperation(n.LOCAL_OPERATIONS.HANDLE_CONVERSATION_UPDATE);
        if (t.activeModalities && t.activeModalities.hasOwnProperty("groupChat")) {
          var r = t.activeModalities.groupChat.threadId;
          e.threadId !== r && (e.threadId = r, e.spacesMessageId = t.activeModalities.groupChat.messageId || null, p.onConversationUpdated({
            threadId: r,
            spacesMessageId: e.spacesMessageId
          }));
        }
      }, v.handleRosterUpdate = function (t) {
        w.log("handleRosterUpdate"), e.telemetryHelper.addLocalOperation(n.LOCAL_OPERATIONS.HANDLE_ROSTER_UPDATE);
        if (t.sequenceNumber <= g) {
          w.log("ignoring rosterUpdate. Last seen seq = " + g + " current seq = " + t.sequenceNumber);
          return;
        }
        g = t.sequenceNumber;
        var r = N();
        for (var i in t.participants)
          t.participants.hasOwnProperty(i) && S(t.participants[i], r);
        x(r, t.participants);
      }, v.dispose = function () {
        w.log("participantManager :: dispose"), m = !0, _("call ended"), e.telemetryHelper.setParticipantId(v.localParticipant.participantId);
      };
    };
  return p;
})

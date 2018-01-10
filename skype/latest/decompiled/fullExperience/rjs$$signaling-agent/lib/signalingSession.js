(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/signalingSession", [
      "require",
      "exports",
      "./utilities/constants",
      "./telemetry/telemetryConstants",
      "./telemetry/telemetryHelper",
      "./participant",
      "./utilities/utils",
      "./utilities/requestBuilder",
      "./utilities/stopwatch",
      "./requests/createConversationRequest",
      "./requests/joinGivenConversationRequest",
      "./requests/joinGivenConversationWithoutCallModalityRequest",
      "./requests/leaveConversationRequest",
      "./requests/deleteConversationRequest",
      "./requests/cancelCallRequest",
      "./requests/endCallRequest",
      "./requests/callAcceptanceRequest",
      "./requests/rejectCallRequest",
      "./requests/attachAndJoinRequest",
      "./requests/callProgressRequest",
      "./requests/callAcceptanceAcknowledgementRequest",
      "./requests/participantUpdateRequest",
      "./requests/updateParticipantConversationLinksRequest",
      "./responses/provisionalMediaResponse",
      "./requests/transferCallRequest",
      "./requests/transferAcceptanceRequest",
      "./requests/transferCompletionRequest",
      "./participantManager",
      "./mediaRenegotiationManager",
      "./contentSharingManager",
      "./timeoutManager",
      "./webRtcSignalingManager"
    ], e);
}(function (e, t) {
  function D(e, t, n, r, i) {
    return new _(e, t, n, r, i);
  }
  var n = e("./utilities/constants"), r = e("./telemetry/telemetryConstants"), i = e("./telemetry/telemetryHelper"), s = e("./participant"), o = e("./utilities/utils"), u = e("./utilities/requestBuilder"), a = e("./utilities/stopwatch"), f = e("./requests/createConversationRequest"), l = e("./requests/joinGivenConversationRequest"), c = e("./requests/joinGivenConversationWithoutCallModalityRequest"), h = e("./requests/leaveConversationRequest"), p = e("./requests/deleteConversationRequest"), d = e("./requests/cancelCallRequest"), v = e("./requests/endCallRequest"), m = e("./requests/callAcceptanceRequest"), g = e("./requests/rejectCallRequest"), y = e("./requests/attachAndJoinRequest"), b = e("./requests/callProgressRequest"), w = e("./requests/callAcceptanceAcknowledgementRequest"), E = e("./requests/participantUpdateRequest"), S = e("./requests/updateParticipantConversationLinksRequest"), x = e("./responses/provisionalMediaResponse"), T = e("./requests/transferCallRequest"), N = e("./requests/transferAcceptanceRequest"), C = e("./requests/transferCompletionRequest"), k = e("./participantManager"), L = e("./mediaRenegotiationManager"), A = e("./contentSharingManager"), O = e("./timeoutManager"), M = e("./webRtcSignalingManager"), _ = function () {
      function e(e, t, s, f, l) {
        var h = this;
        this.links = {};
        this.provisionalMediaAnswersSeenSoFar = {};
        this.currentCallState = null;
        this.fsmState = n["default"].SIGNALING_FSM_STATE.IDLE;
        this.convJoined = !1;
        this.keepAliveTimer = null;
        this.keepAliveCount = 1;
        this.remoteCallerOrCallee = null;
        this.mediaTypesToUse = null;
        this.lastUsedOutgoingMediaContent = null;
        this.cachedRosterReceivedFromJoinResponse = null;
        this.transferCallCompletionDeffered = null;
        this.transferCallAcceptanceDeffered = null;
        this.disposed = !1;
        this.convSubject = null;
        this.threadId = null;
        this.multiParty = !1;
        this.isHostLessCall = !1;
        this.isCastCall = !1;
        this.numberOfOriginalInvitees = 0;
        this.teamsMessageId = null;
        this.enableGroupCallMeetupGeneration = !1;
        this.meetingInfo = null;
        this.transferContext = null;
        this.callType = "default";
        this.transferor = null;
        this.onBehalfOf = null;
        this.onTrouterUrlChanged = function () {
          h.logger.log("onTrouterUrlChanged: disposed = " + h.disposed);
          if (h.disposed)
            return;
          h.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.TROUTER_URL_CHANGED + ":" + h.signalingAgentConfig.trouterUrlGetter.trouterUrl());
          h.links.hasOwnProperty(n["default"].LINKS.KEEPALIVE) && (h.logger.log("sending participantUpdateRequest"), h.ensureLatestTrouterUrl(r["default"].LOCAL_OPERATIONS.TROUTER_URL_CHANGED).then(function () {
            return u.get(h, "participantUpdateRequest", E.getPayload(h));
          }).then(function (e) {
            h.sendToKeepAliveUrl(e);
          })["catch"](function (e) {
            h.logger.error("sending participantUpdateRequest on trouterUrl changed failed because : " + e);
          }));
          h.updateConversationLinks();
        };
        this.getParticipantIdForOfferAnswer = function (e) {
          o.assertNotNull(e, "mediaContent should be a non null value");
          var t = null;
          return h.remoteCallerOrCallee && !h.threadId && !e.newOffer && !e.escalationOccurring && (t = h.remoteCallerOrCallee.id), t;
        };
        this.getMeetingInfo = function () {
          return h.meetingInfo;
        };
        this.setSubject = function (e) {
          h.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.SET_SUBJECT);
          o.assertNotNull(e, "subject should be a non null value");
          h.convSubject = e;
        };
        this.setMultiParty = function () {
          h.multiParty = !0;
        };
        this.setOfferAnswerGenerationTimestamps = function (e) {
          h.telemetryHelper.setOfferAnswerGenerationTimestamps(e);
        };
        this.setTimeToRingDuration = function () {
          h.telemetryHelper.setTimeToRingDuration();
        };
        this.setThreadId = function (e) {
          h.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.SET_THREADID);
          o.assertNotNull(e, "threadId should be a non null value");
          o.assert(!h.threadId, "conversation threadId has already been set. It cannot be overwritten");
          h.threadId = e;
        };
        this.setCallOptions = function (e) {
          h.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.SET_CALLOPTIONS);
          o.assertNotNull(e, "callOptions should be a non null value");
          e && (h.teamsMessageId = e.teamsMessageId || null, h.meetingInfo = e.meetingInfo || null, h.enableGroupCallMeetupGeneration = e.enableGroupCallMeetupGeneration || !1);
        };
        this.setTransferContext = function (e) {
          h.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.SET_TRANSFER_CONTEXT);
          o.assertNotNull(e, "transferContext should not be null");
          h.transferContext = e;
        };
        this.muteAsync = function (e, t) {
          return h.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.MUTE), o.assert(h.fsmState === n["default"].SIGNALING_FSM_STATE.CONNECTED, "mute operation only allowed in a connected call"), h.participantManager.muteAsync(h.links[n["default"].LINKS.MUTE], e, t);
        };
        this.unmuteAsync = function () {
          return h.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.UNMUTE), o.assert(h.fsmState === n["default"].SIGNALING_FSM_STATE.CONNECTED, "unmute operation only allowed in a connected call"), h.participantManager.unmuteAsync(h.links[n["default"].LINKS.UNMUTE]);
        };
        this.rejectUnmuteRequestAsync = function (e, t) {
          return h.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.REJECT_UNMUTE), o.assert(h.fsmState === n["default"].SIGNALING_FSM_STATE.CONNECTED, "rejectUnmute operation only allowed in a connected call"), o.assertNotNullOrEmpty(e, "requestor must be specified"), h.participantManager.rejectUnmuteRequestAsync(e, t);
        };
        this.approveUnmuteRequestAsync = function (e) {
          return h.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.APPROVE_UNMUTE), o.assert(h.fsmState === n["default"].SIGNALING_FSM_STATE.CONNECTED, "approveUnmute operation only allowed in a connected call"), o.assertNotNullOrEmpty(e, "requestor must be specified"), h.participantManager.approveUnmuteRequestAsync(e);
        };
        this.sendWebRtcMediaNotificationAsync = function (e) {
          return h.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.SEND_WEBRTC_MEDIA_NOTIFICATION), o.assert(h.fsmState === n["default"].SIGNALING_FSM_STATE.CONNECTED, "webRtc media notification can only be sent in a connected call"), h.webRtcSignalingManager.sendControlVideoStreamingAsync(h.links[n["default"].LINKS.CONTROL_VIDEO_STREAMING], e);
        };
        this.addParticipantAsync = function (e) {
          return h.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.ADD_PARTICIPANT), o.assertNotNull(e, "remoteParticipant should be a non null value"), o.assert(h.fsmState === n["default"].SIGNALING_FSM_STATE.CONNECTED || h.fsmState === n["default"].SIGNALING_FSM_STATE.IDLE, "remoteParticipants can only be added before starting an outgoing call or to an ongoing call"), h.fsmState === n["default"].SIGNALING_FSM_STATE.CONNECTED && o.assertNotNullOrEmpty(h.threadId, "threadId must be set before adding more participants to connected call"), h.participantManager.addParticipantAsync(e, h.links[n["default"].LINKS.ADD_PARTICIPANT_AND_MODALITY], h.fsmState === n["default"].SIGNALING_FSM_STATE.CONNECTED);
        };
        this.removeParticipantAsync = function (e) {
          return h.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.REMOVE_PARTICIPANT), o.assertNotNull(e, "remoteParticipant should be a non null value"), o.assert(h.fsmState === n["default"].SIGNALING_FSM_STATE.CONNECTED, "participants can only be removed from an ongoing call"), h.participantManager.removeParticipantAsync(e, h.links[n["default"].LINKS.REMOVE_PARTICIPANT]);
        };
        this.startContentSharingAsync = function (e, t, i) {
          return h.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.ADD_CONTENT_SHARING_MODALITY), o.assertNotNull(e, "contentIdentifier should be a non null value"), o.assert(h.fsmState === n["default"].SIGNALING_FSM_STATE.CONNECTED || h.fsmState === n["default"].SIGNALING_FSM_STATE.IDLE, "contentSharing can only be added before starting an outgoing call or to an ongoing call"), h.contentSharingManager.startContentSharingAsync(e, t, i, h.links[n["default"].LINKS.ADD_MODALITY], h.fsmState === n["default"].SIGNALING_FSM_STATE.CONNECTED);
        };
        this.leaveContentSharingAsync = function () {
          return h.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.LEAVE_CONTENT_SHARING), h.contentSharingManager.leaveContentSharingAsync();
        };
        this.joinContentSharingAsync = function () {
          return h.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.JOIN_CONTENT_SHARING), h.contentSharingManager.joinContentSharingAsync();
        };
        this.updateContentSharingSessionStateAsync = function (e) {
          return h.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.UPDATE_SESSION_STATE_CONTENT_SHARING), o.assertNotNull(e, "sessionState should be a non null value"), h.contentSharingManager.updateContentSharingSessionStateAsync(e);
        };
        this.takeContentSharingControlAsync = function () {
          return h.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.TAKE_CONTROL_CONTENT_SHARING), h.contentSharingManager.takeContentSharingControlAsync();
        };
        this.updateContentSharingParticipantStateAsync = function () {
          return h.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.UPDATE_PARTICIPANT_STATE_CONTENT_SHARING), h.contentSharingManager.updateContentSharingParticipantStateAsync();
        };
        this.startOutgoingCall = function (e, t, i, s) {
          h.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.START_CALL);
          h.telemetryHelper.setDirection(r["default"].DIRECTION.OUTGOING);
          h.telemetryHelper.setRole(r["default"].ROLE.CALLER);
          h.telemetryHelper.startCallInitializationWatch(s);
          h.telemetryHelper.setMeetingInfo(h.getMeetingInfo());
          o.assertNotNull(e, "mediaContent should be a non null value");
          o.assertNotNull(e.blob, "outgoingSdp should be a non null value");
          o.assert(h.fsmState === n["default"].SIGNALING_FSM_STATE.IDLE, "a call is already in progress");
          h.logger.log("startOutgoingCall called");
          h.fsmState = n["default"].SIGNALING_FSM_STATE.OUTGOING;
          var u = i, a = {
              newCall: !0,
              suppressDialout: i ? u.suppressDialout || !1 : !1,
              castCall: i ? u.castCall || !1 : !1,
              conversationServiceUrl: h.signalingAgentConfig.conversationServiceUrl,
              onBehalfOf: u ? u.onBehalfOf : null
            };
          h.isCastCall = a.castCall;
          h.onBehalfOf = a.onBehalfOf;
          h.placeCall(a, e, t);
        };
        this.joinGivenConversation = function (e, t, i, s, u) {
          h.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.JOIN_CALL);
          h.telemetryHelper.setDirection(r["default"].DIRECTION.INCOMING);
          h.telemetryHelper.setRole(r["default"].ROLE.JOIN);
          h.telemetryHelper.startCallInitializationWatch(u);
          o.assertNotNull(i, "mediaContent should be a non null value");
          o.assertNotNull(i.blob, "outgoingSdp should be a non null value");
          o.assertNotNull(t, "correlationId should be a non null value");
          o.assertNotNullOrEmpty(e, "conversationUrl should be a non null value");
          o.assert(h.fsmState === n["default"].SIGNALING_FSM_STATE.IDLE || h.fsmState === n["default"].SIGNALING_FSM_STATE.CONNECTED_FOR_ROSTER_ONLY, "a call is already in progress");
          h.logger.log("joinGivenConversation called with url = " + e + " , correlationId = " + t);
          h.fsmState = n["default"].SIGNALING_FSM_STATE.OUTGOING;
          h.correlationId = t;
          var a = {
            newCall: !1,
            suppressDialout: !0,
            castCall: !1,
            conversationServiceUrl: e
          };
          h.isCastCall = a.castCall;
          h.placeCall(a, i, s);
        };
        this.joinGivenConversationWithoutCallModality = function (e, t) {
          h.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.JOIN_CONVERSATION_WITHOUT_CALL_MODALITY);
          h.telemetryHelper.setDirection(r["default"].DIRECTION.INCOMING);
          h.telemetryHelper.setRole(r["default"].ROLE.JOIN_FOR_ROSTER_ONLY);
          o.assertNotNull(t, "correlationId should be a non null value");
          o.assertNotNullOrEmpty(e, "conversationUrl should be a non null value");
          o.assert(h.fsmState === n["default"].SIGNALING_FSM_STATE.IDLE, "a call is already in progress");
          h.logger.log("joinGivenConversationWithoutCallModality called with url = " + e + " , correlationId = " + t);
          h.fsmState = n["default"].SIGNALING_FSM_STATE.OUTGOING_FOR_ROSTER_ONLY;
          h.correlationId = t;
          h.telemetryHelper.setConversationServiceUrl(e);
          h.telemetryHelper.setCallerType(h.participantManager.localParticipant.id);
          var i = a.build();
          h.ensureLatestTrouterUrl(r["default"].NETWORK_REQUESTS.JOIN_CONVERSATION_WITHOUT_CALL_MODALITY).then(function () {
            return u.get(h, r["default"].NETWORK_REQUESTS.JOIN_CONVERSATION_WITHOUT_CALL_MODALITY, c.getPayload(h));
          }).then(function (t) {
            return h.signalingAgentConfig.httpRequestDispatcher.postAsync(e, t);
          }).then(function (e) {
            if (!h.disposed) {
              if (!e.response.roster)
                throw new Error("response does not contain a roster");
              h.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.JOIN_CONVERSATION_WITHOUT_CALL_MODALITY, !0, i.duration());
              h.fsmState = n["default"].SIGNALING_FSM_STATE.CONNECTED_FOR_ROSTER_ONLY;
              h.saveConversationServiceLinks(e.response);
              h.onCallStatusChanged(n["default"].CALL_STATUS.CONNECTED_FOR_ROSTER_ONLY);
              h.participantManager.handleRosterUpdate(e.response.roster);
            }
          })["catch"](function (e) {
            var t = o.getPrintableObject(e);
            h.logger.error("joinGivenConversationWithoutCallModality failed because : " + t);
            if (!h.disposed) {
              h.fsmState = n["default"].SIGNALING_FSM_STATE.IDLE;
              var s = o.getErrorForXHRFailure(e);
              h.telemetryHelper.setTerminatingData({
                terminatingEnd: r["default"].CALL_TERMINATING_END.LOCAL,
                resultValue: r["default"].RESULT_VALUE.FAILURE,
                endCode: s.telemetryEndSubCode,
                endSubCode: s.error.subCode,
                resultDetail: "Failed to join conversation without call modality. Error = " + t
              });
              h.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.JOIN_CONVERSATION_WITHOUT_CALL_MODALITY, !1, i.duration());
              h.dispose(s.error);
              h.onCallStatusChanged(n["default"].CALL_STATUS.LOCAL_TERMINATED, s.error);
            }
          });
        };
        this.transferCallAsync = function (e, t) {
          o.assert(h.fsmState === n["default"].SIGNALING_FSM_STATE.CONNECTED, "call is not connected yet");
          o.assert(h.transferCallCompletionDeffered === null, "another transferCall already in progress");
          o.assert(h.transferCallAcceptanceDeffered === null, "another transferCall already in progress");
          h.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.TRANSFER_CALL);
          h.transferCallCompletionDeffered = o.defer();
          h.transferCallAcceptanceDeffered = o.defer();
          h.transferCallCompletionDeffered.promise.then(function () {
            h.transferCallCompletionDeffered = null;
            h.transferCallAcceptanceDeffered = null;
          }, function () {
            h.transferCallCompletionDeffered = null;
            h.transferCallAcceptanceDeffered = null;
          });
          h.timeoutManager.startTimer(n["default"].TIMEOUT_OPERATIONS.OUTGOING_CALL_ESTABLISHMENT, function () {
            return h.handleCallTransferTimeout();
          });
          var i = a.build();
          return h.ensureLatestTrouterUrl(r["default"].NETWORK_REQUESTS.SEND_TRANSFER_REQUEST).then(function () {
            return u.get(h, r["default"].NETWORK_REQUESTS.SEND_TRANSFER_REQUEST, T.getPayload(e, h, t));
          }).then(function (e) {
            return h.signalingAgentConfig.httpRequestDispatcher.postAsync(h.links[n["default"].LINKS.TRANSFER], e);
          }).then(function (e) {
            h.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.SEND_TRANSFER_REQUEST, !0, i.duration());
          })["catch"](function (e) {
            var t = o.getPrintableObject(e);
            return h.logger.error("transferCall failed because : " + t), h.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.SEND_TRANSFER_REQUEST, !1, i.duration()), Promise.reject({
              code: n["default"].CALL_END_CODE.NETWORK_ERROR,
              reason: t
            });
          }).then(function () {
            return h.transferCallAcceptanceDeffered.promise;
          });
        };
        this.handleIncomingCall = function (e) {
          h.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_INCOMING_CALL);
          h.telemetryHelper.setDirection(r["default"].DIRECTION.INCOMING);
          h.telemetryHelper.setRole(r["default"].ROLE.CALLEE);
          h.telemetryHelper.startCallInitializationWatch();
          o.assertNotNull(e, "request should be a non null value");
          o.assertNotNullOrEmpty(e.body, "request should have a valid body");
          o.assertNotNullOrEmpty(e.body.gp, "request does not look valid");
          o.assert(h.fsmState === n["default"].SIGNALING_FSM_STATE.IDLE, "a call is already in progress");
          h.logger.log("handleIncomingCall called");
          h.fsmState = n["default"].SIGNALING_FSM_STATE.INCOMING;
          h.participantManager.initializeForIncomingCall();
          h.awaitCall(e);
        };
        this.endAsync = function (e, t) {
          h.logger.log("endAsync called");
          if (h.disposed)
            return Promise.resolve(null);
          h.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.END_CALL);
          if (h.fsmState === n["default"].SIGNALING_FSM_STATE.INCOMING)
            return h.rejectIncomingCall(e);
          if (h.fsmState === n["default"].SIGNALING_FSM_STATE.OUTGOING || h.fsmState === n["default"].SIGNALING_FSM_STATE.OUTGOING_FOR_ROSTER_ONLY)
            return h.cancelOutgoingCall(e);
          if (h.fsmState === n["default"].SIGNALING_FSM_STATE.WAITING_CALL_ACCEPTANCE_ACK)
            return h.rejectIncomingCall(e);
          if ((h.fsmState === n["default"].SIGNALING_FSM_STATE.CONNECTED || h.mediaRenegotiationManager.isIncomingRenegotiationInProgress() || h.mediaRenegotiationManager.isOutgoingRenegotiationInProgress()) && t)
            return h.deleteConversation(e);
          if (h.fsmState === n["default"].SIGNALING_FSM_STATE.CONNECTED || h.fsmState === n["default"].SIGNALING_FSM_STATE.CONNECTED_FOR_ROSTER_ONLY || h.mediaRenegotiationManager.isIncomingRenegotiationInProgress() || h.mediaRenegotiationManager.isOutgoingRenegotiationInProgress())
            return h.terminateEstablishedCall(e);
          h.logger.log("There is no call to cancel or end or reject in current state");
          var i = e || {
            code: n["default"].CALL_END_CODE.SUCCESS,
            subCode: n["default"].CALL_END_SUB_CODE.CALL_NOT_ATTEMPTED,
            phrase: n["default"].CALL_END_PHRASE.CALL_DOES_NOT_EXIST
          };
          return h.telemetryHelper.setTerminatingData({
            terminatingEnd: r["default"].CALL_TERMINATING_END.LOCAL,
            resultDetail: "There is no call to cancel or end or reject",
            endCode: i.code,
            endSubCode: i.subCode
          }), h.dispose(i), h.onCallStatusChanged(n["default"].CALL_STATUS.LOCAL_TERMINATED, i), Promise.resolve(null);
        };
        this.handleIncomingMsgAsync = function (e) {
          o.assertNotNull(e, "incoming message should be a non null value");
          h.logger.log("handleIncomingMsg called for url = " + e.url);
          var t = o.defer(), r = e.body;
          if (!r)
            return h.logger.error("handleIncomingMsg : received message with no body to : " + e.url), t.reject(new Error("received message with no body")), t.promise;
          if (h.disposed)
            return h.logger.log("handleIncomingMsg : received message after call is disposed"), t.reject(new Error("received message after call is disposed")), t.promise;
          try {
            var i = r;
            if (i.callNotification) {
              if (!o.stringEndsWith(e.url, n["default"].URL_PATH.REPLACE))
                return t.reject(new Error("IncomingCallNotification should not be received in handleIncomingMsg")), t.promise;
              h.logger.log("handleIncomingMsg : received replacementCallNotification");
              h.signalingSessionCallback.onIncomingCallReplacement(i);
            }
            i.mediaAnswer ? h.handleMediaAnswer(i, e.headers) : i.mediaAcknowledgement ? h.handleMediaAcknowledgement(i) : i.callAcceptance ? h.handleCallAcceptance(i) : i.callEnd ? h.handleCallEnd(i.callEnd) : i.callProgress ? h.handleCallProgress(i.callProgress) : i.callAcceptanceAcknowledgement ? h.handleCallAcceptanceAck(i) : i.mediaNegotiation ? h.mediaRenegotiationManager.handleMediaNegotiationOffer(i, e.headers) : i.mediaNegotiationFailure ? h.mediaRenegotiationManager.handleMediaNegotiationFailure(i.mediaNegotiationFailure) : i.balanceUpdate ? h.handlePSTNBalanceUpdate(i.balanceUpdate) : i.retargetCompleted ? h.mediaRenegotiationManager.handleRetargetCompleted(i.retargetCompleted) : i.p2pForkNotification || (i.callTransfer ? h.handleTransferRequested(i.callTransfer) : i.transferAcceptance ? h.handleTransferAcceptance(i) : i.transferCompletion ? h.handleTransferCompletion(i.transferCompletion) : o.stringEndsWith(e.url, n["default"].URL_PATH.CONTROL_VIDEO_STREAMING) ? (h.logger.debug("handleIncomingMsg : received controlVideoStreaming : " + o.getPrintableObject(i)), h.webRtcSignalingManager.handleControlVideoStreaming(i)) : o.stringEndsWith(e.url, n["default"].URL_PATH.DOMINANT_SPEAKER_INFO) ? (h.logger.debug("handleIncomingMsg : received dominantSpeakerInfo : " + o.getPrintableObject(i)), h.webRtcSignalingManager.handleDominantSpeakerInfo(i)) : o.stringEndsWith(e.url, n["default"].URL_PATH.CSRC_INFO) ? (h.logger.debug("handleIncomingMsg : received csrcInfo : " + o.getPrintableObject(i)), h.webRtcSignalingManager.handleCsrcInfo(i)) : o.stringEndsWith(e.url, n["default"].URL_PATH.CONV_ROSTER_UPDATE) ? (h.logger.debug("handleIncomingMsg : received rosterUpdate : " + o.getPrintableObject(i)), h.participantManager.handleRosterUpdate(i)) : o.stringEndsWith(e.url, n["default"].URL_PATH.CONV_ADD_PARTICIPANT_SUCCESS) ? (h.logger.log("handleIncomingMsg : received addParticipantSuccess : " + o.getPrintableObject(i)), h.participantManager.handleAddParticipantSuccess()) : o.stringEndsWith(e.url, n["default"].URL_PATH.CONV_ADD_PARTICIPANT_FAILURE) ? (h.logger.log("handleIncomingMsg : received addParticipantFailure : " + o.getPrintableObject(i)), h.participantManager.handleAddParticipantFailure(i)) : o.stringEndsWith(e.url, n["default"].URL_PATH.CONV_REMOVE_PARTICIPANT_SUCCESS) ? (h.logger.log("handleIncomingMsg : received removeParticipantSuccess : " + o.getPrintableObject(i)), h.participantManager.handleRemoveParticipantSuccess(i)) : o.stringEndsWith(e.url, n["default"].URL_PATH.CONV_REMOVE_PARTICIPANT_FAILURE) ? (h.logger.log("handleIncomingMsg : received removeParticipantFailure : " + o.getPrintableObject(i)), h.participantManager.handleRemoveParticipantFailure(i)) : o.stringEndsWith(e.url, n["default"].URL_PATH.CONV_CONFIRM_UNMUTE) ? (h.logger.log("handleIncomingMsg : received unmute confirm request : " + o.getPrintableObject(i)), h.participantManager.handleUnmuteConfirmRequest(i)) : o.stringEndsWith(e.url, n["default"].URL_PATH.CONV_UNMUTE_FAILURE) ? (h.logger.log("handleIncomingMsg : received unmuteFailure : " + o.getPrintableObject(i)), h.participantManager.handleUnmuteFailure(i)) : o.stringEndsWith(e.url, n["default"].URL_PATH.CONV_UNMUTE_SUCCESS) ? (h.logger.log("handleIncomingMsg : received unmuteSuccess : " + o.getPrintableObject(i)), h.participantManager.handleUnmuteSuccess(i)) : o.stringEndsWith(e.url, n["default"].URL_PATH.CONV_UPDATE) ? (h.logger.log("handleIncomingMsg : received conversationUpdate : " + o.getPrintableObject(i)), h.handleConversationUpdate(i, e.headers)) : o.stringEndsWith(e.url, n["default"].URL_PATH.CONV_ADD_MODALITY_SUCCESS) ? (h.logger.log("handleIncomingMsg : received addModalitySucess : " + o.getPrintableObject(i)), h.handleAddModalitySuccess(i)) : o.stringEndsWith(e.url, n["default"].URL_PATH.CONV_ADD_MODALITY_FAILURE) ? (h.logger.log("handleIncomingMsg : received addModalityFailure : " + o.getPrintableObject(i)), h.handleAddModalityFailure(i)) : o.stringEndsWith(e.url, n["default"].URL_PATH.CONV_CONTENT_SHARING_UPDATE) ? (h.logger.log("handleIncomingMsg : received contentSharingUpdate : " + o.getPrintableObject(i)), h.contentSharingManager.handleContentSharingUpdate(i)) : o.stringEndsWith(e.url, n["default"].URL_PATH.CONV_CONTENT_SHARING_END) ? (h.logger.log("handleIncomingMsg : received contentSharingEnd : " + o.getPrintableObject(i)), h.contentSharingManager.handleContentSharingEnd(i)) : o.stringEndsWith(e.url, n["default"].URL_PATH.CONV_END) ? (h.logger.log("handleIncomingMsg : received conversationEnd : " + o.getPrintableObject(i)), h.handleCallEnd(i)) : h.logger.error("handleIncomingMsg : received unknown message to : " + e.url + "  with body : " + o.getPrintableObject(i)));
            t.resolve(!0);
          } catch (s) {
            h.logger.error("handleIncomingMsg failed with error : " + s.message + "stack trace : " + s.stack);
            t.reject(new Error(s.message));
          }
          return t.promise;
        };
        this.acceptRenegotiationAsync = function (e, t) {
          return o.assertNotNull(e.blob, "finalSdp should be a non null value"), o.assert(h.fsmState === n["default"].SIGNALING_FSM_STATE.CONNECTED, "Renegotation operations are only allowed when the call is connected and no disconnect operation is in flight"), h.mediaRenegotiationManager.acceptRenegotiationAsync(e, t);
        };
        this.setProvisionalAnswerAsync = function (e) {
          h.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.SET_PROVISIONAL_ANSWER);
          o.assertNotNull(e.blob, "sdp should be a non null value");
          h.logger.log("setProvisionalAnswer called ");
          var t = o.defer();
          if (h.fsmState !== n["default"].SIGNALING_FSM_STATE.INCOMING)
            return h.logger.log("there is no incoming call to set provisional answer on."), t.reject(new Error("there is no incoming call to set provisional answer on.")), t.promise;
          var i = a.build();
          return h.ensureLatestTrouterUrl(r["default"].NETWORK_REQUESTS.SEND_MEDIA_ANSWER).then(function () {
            return u.get(h, r["default"].NETWORK_REQUESTS.SEND_MEDIA_ANSWER, x.getPayload(h, e));
          }).then(function (e) {
            return h.signalingAgentConfig.httpRequestDispatcher.postAsync(h.links[n["default"].LINKS.MEDIA_ANSWER], e);
          }).then(function (e) {
            h.disposed || (h.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.SEND_MEDIA_ANSWER, !0, i.duration()), h.onCallStatusChanged(n["default"].CALL_STATUS.CONNECTING));
            t.resolve(e.response);
            h.disposed || (h.logger.log("handling inlined mediaAnswerAcknowledgement"), h.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_MEDIA_ACKNOWLEDGEMENT), h.telemetryHelper.setTimeToRingDuration(), h.onCallStatusChanged(n["default"].CALL_STATUS.RINGING), h.signalingSessionCallback.onMediaAcknowledgementSuccess(!1));
          })["catch"](function (e) {
            h.disposed || h.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.SEND_MEDIA_ANSWER, !1, i.duration());
            var n = o.getPrintableObject(e);
            h.logger.error("setProvisionalAnswer failed because : " + n);
            t.reject(new Error("setProvisionalAnswer failed because : " + n));
          }), t.promise;
        };
        this.startRenegotiationAsync = function (e, t) {
          return o.assertNotNull(e, "mediaContent should be a non null value"), o.assert(h.fsmState === n["default"].SIGNALING_FSM_STATE.CONNECTED, "Renegotation operations are only allowed when the call is connected and no disconnect operation is in flight"), h.mediaRenegotiationManager.startRenegotiationAsync(e, h.links[n["default"].LINKS.MEDIA_RENEGOTIATION], t);
        };
        this.acceptAsync = function (e, t) {
          h.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.ACCEPT_CALL);
          o.assertNotNull(e, "mediaContent should be a non null value");
          o.assertNotNull(e.blob, "outgoingSdp should be a non null value");
          h.logger.log("accept called");
          var i = o.defer();
          if (h.fsmState !== n["default"].SIGNALING_FSM_STATE.INCOMING)
            return h.logger.log("there is no incoming call to accept"), i.reject(new Error("there is no incoming call to accept")), i.promise;
          h.fsmState = n["default"].SIGNALING_FSM_STATE.WAITING_CALL_ACCEPTANCE_ACK;
          var s = a.build();
          return h.ensureLatestTrouterUrl(r["default"].NETWORK_REQUESTS.SEND_ACCEPTANCE).then(function () {
            return u.get(h, r["default"].NETWORK_REQUESTS.SEND_ACCEPTANCE, m.getPayload(h, e, t));
          }).then(function (e) {
            return h.signalingAgentConfig.httpRequestDispatcher.postAsync(h.links[n["default"].LINKS.ACCEPT], e);
          }).then(function (e) {
            h.disposed || (h.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.SEND_ACCEPTANCE, !0, s.duration()), h.currentCallState === n["default"].CALL_STATUS.IDLE && (h.telemetryHelper.setTimeToRingDuration(), h.onCallStatusChanged(n["default"].CALL_STATUS.CONNECTING)), e.response.callAcceptanceAcknowledgement && (h.logger.log("handling inlined callAcceptanceAcknowledgement"), h.handleCallAcceptanceAck(e.response)));
            i.resolve(e.response);
          })["catch"](function (e) {
            h.disposed || (h.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.SEND_ACCEPTANCE, !1, s.duration()), h.fsmState = n["default"].SIGNALING_FSM_STATE.INCOMING);
            var t = o.getPrintableObject(e);
            h.logger.error("accept failed because : " + t);
            i.reject(new Error("accept failed because : " + t));
          }), i.promise;
        };
        this.rejectRenegotiationAsync = function (e) {
          return o.assert(h.fsmState === n["default"].SIGNALING_FSM_STATE.CONNECTED, "Renegotation operations are only allowed when the call is connected and no disconnect operation is in flight"), h.mediaRenegotiationManager.rejectRenegotiationAsync(e);
        };
        this.saveMediaControllerLinksIfAny = function (e) {
          e.links && e.links.controlVideoStreaming && (h.links[n["default"].LINKS.CONTROL_VIDEO_STREAMING] = e.links.controlVideoStreaming);
        };
        this.signalingSessionCallback = t;
        this.signalingAgentConfig = s;
        this.signalingAgent = l;
        this.urlIdentifier = f;
        this.correlationId = f;
        this.logger = s.logger.createChild(function () {
          return "SignalingAgent::[" + h.correlationId + "][" + f + "][" + h.fsmState + "]";
        }, this.correlationId, !0);
        this.telemetryHelper = new i["default"](this);
        this.mediaRenegotiationManager = new L["default"](this, t);
        this.participantManager = new k["default"](this, t, e);
        this.timeoutManager = new O["default"](this);
        this.contentSharingManager = new A["default"](this, t);
        this.webRtcSignalingManager = new M["default"](this, t);
        this.pstnContent = {
          emergencyCallCountry: s.emergencyCallCountry || "",
          platformName: s.clientInformation,
          publicApiCall: !1
        };
        s.trouterUrlGetter.trouterUrl.changed(this.onTrouterUrlChanged);
      }
      return e.prototype.getCallReplacementDetails = function () {
        return { replaces: this.links[n["default"].LINKS.REPLACE] };
      }, e.prototype.ensureLatestTrouterUrl = function (e) {
        var t = this;
        return this.telemetryHelper.addTrouterWaitOperation(r["default"].TROUTER_WAIT_OPERATION.STARTED + ":" + e), this.signalingAgentConfig.trouterUrlGetter.getTrouterUrlAsync().then(function (n) {
          if (t.disposed)
            throw "trouterUrlGetter returned too late. Object is already disposed";
          t.telemetryHelper.addTrouterWaitOperation(r["default"].TROUTER_WAIT_OPERATION.ENDED + ":" + e);
          t.currentTrouterUrl = n;
        })["catch"](function (e) {
          throw t.logger.error("getTrouterUrlAsync failed because : " + e), e;
        });
      }, e.prototype.saveConversationServiceLinks = function (e) {
        this.convJoined = !0;
        this.links[n["default"].LINKS.CONVERSATION_CONTROLLER] = e.conversationController;
        this.links[n["default"].LINKS.ADD_PARTICIPANT_AND_MODALITY] = e.links.addParticipantAndModality;
        this.links[n["default"].LINKS.LEAVE] = e.links.leave;
        this.links[n["default"].LINKS.NOTIFICATION_LINKS] = e.links.notificationLinks;
        this.links[n["default"].LINKS.REMOVE_PARTICIPANT] = e.links.removeParticipant;
        this.links[n["default"].LINKS.ADD_MODALITY] = e.links.addModality;
        this.links[n["default"].LINKS.REMOVE_MODALITY] = e.links.removeModality;
        this.links[n["default"].LINKS.MUTE] = e.links.mute || null;
        this.links[n["default"].LINKS.UNMUTE] = e.links.unmute || null;
        this.convSubject = e.subject;
        e.activeModalities && (e.activeModalities.groupChat && (this.threadId = e.activeModalities.groupChat.threadId, this.teamsMessageId = e.activeModalities.groupChat.messageId || null), this.contentSharingManager.handleIncomingContentSharingIfAny(e));
        e.state && (this.multiParty = e.state.isMultiParty || !1, this.isHostLessCall = e.state.isHostless || !1, this.isCastCall = e.state.conversationType ? e.state.conversationType === "cast" : !1);
      }, e.prototype.cancelOutgoingCall = function (e) {
        var t = this, i = o.defer(), s = e || {
            code: n["default"].CALL_END_CODE.CANCEL,
            subCode: n["default"].CALL_END_SUB_CODE.SUCCESS,
            phrase: n["default"].CALL_END_PHRASE.LOCAL_USER_INITIATED
          };
        if (!this.links.hasOwnProperty(n["default"].LINKS.LEAVE))
          this.logger.log("Conversation Service Leave Url is not yet set. Cannot leave conversation. Disposing anyways."), this.telemetryHelper.setTerminatingData({
            terminatingEnd: r["default"].CALL_TERMINATING_END.LOCAL,
            resultDetail: "Conversation Service Leave Url is not yet set",
            endCode: s.code,
            endSubCode: n["default"].CALL_END_SUB_CODE.CONV_URL_NOT_SET
          }), s.subCode = n["default"].CALL_END_SUB_CODE.CONV_URL_NOT_SET, this.dispose(s), this.onCallStatusChanged(n["default"].CALL_STATUS.LOCAL_TERMINATED, s), i.resolve(null);
        else {
          this.logger.log("cancelling outgoing call");
          this.fsmState = n["default"].SIGNALING_FSM_STATE.IDLE;
          var f = a.build();
          this.ensureLatestTrouterUrl(r["default"].NETWORK_REQUESTS.CANCEL_CALL).then(function () {
            return u.get(t, r["default"].NETWORK_REQUESTS.CANCEL_CALL, d.getPayload(t, s));
          }).then(function (e) {
            return t.signalingAgentConfig.httpRequestDispatcher.postAsync(t.links[n["default"].LINKS.LEAVE], e);
          }).then(function (e) {
            t.disposed || (t.telemetryHelper.setTerminatingData({
              terminatingEnd: r["default"].CALL_TERMINATING_END.LOCAL,
              resultDetail: "User cancelled call",
              endCode: s.code,
              endSubCode: s.subCode
            }), t.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.CANCEL_CALL, !0, f.duration()), t.dispose(s), t.onCallStatusChanged(n["default"].CALL_STATUS.LOCAL_TERMINATED, s));
            i.resolve(e.response);
          })["catch"](function (e) {
            var u = o.getPrintableObject(e);
            t.logger.error("Cancelling call failed because : " + u);
            t.disposed || (t.telemetryHelper.setTerminatingData({
              terminatingEnd: r["default"].CALL_TERMINATING_END.LOCAL,
              endCode: s.code,
              endSubCode: s.subCode,
              resultDetail: "Failed to Cancel Call. Error = " + u
            }), t.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.CANCEL_CALL, !1, f.duration()), t.dispose(s), t.onCallStatusChanged(n["default"].CALL_STATUS.LOCAL_TERMINATED, s));
            i.resolve(null);
          });
        }
        return i.promise;
      }, e.prototype.terminateEstablishedCall = function (e) {
        var t = this, i = o.defer();
        this.logger.log("ending established call");
        this.fsmState = n["default"].SIGNALING_FSM_STATE.IDLE;
        var s = this.convJoined ? r["default"].NETWORK_REQUESTS.LEAVE_CONVERSATION : r["default"].NETWORK_REQUESTS.END_CALL, u = a.build(), f = e || {
            code: n["default"].CALL_END_CODE.SUCCESS,
            subCode: n["default"].CALL_END_SUB_CODE.SUCCESS,
            phrase: n["default"].CALL_END_PHRASE.LOCAL_USER_INITIATED
          };
        return this.endCallAndLeaveConversation(f).then(function () {
          t.disposed || (t.telemetryHelper.setTerminatingData({
            terminatingEnd: r["default"].CALL_TERMINATING_END.LOCAL,
            endCode: f.code,
            endSubCode: f.subCode,
            resultDetail: f.phrase
          }), t.telemetryHelper.addNetworkOperationCompleted(s, !0, u.duration()), t.dispose(f), t.onCallStatusChanged(n["default"].CALL_STATUS.LOCAL_TERMINATED, f));
          i.resolve(null);
        })["catch"](function (e) {
          var a = o.getPrintableObject(e);
          t.logger.error("Ending call failed because : " + a);
          t.disposed || (t.telemetryHelper.setTerminatingData({
            terminatingEnd: r["default"].CALL_TERMINATING_END.LOCAL,
            endCode: f.code,
            endSubCode: f.subCode,
            resultDetail: "Failed to end Call. Error = " + a
          }), t.telemetryHelper.addNetworkOperationCompleted(s, !1, u.duration()), t.dispose(f), t.onCallStatusChanged(n["default"].CALL_STATUS.LOCAL_TERMINATED, f));
          i.resolve(null);
        }), i.promise;
      }, e.prototype.deleteConversation = function (e) {
        var t = this, i = o.defer();
        this.logger.log("deleting converation");
        this.fsmState = n["default"].SIGNALING_FSM_STATE.IDLE;
        var s = r["default"].NETWORK_REQUESTS.DELETE_CONVERSATION, u = a.build(), f = e || {
            code: n["default"].CALL_END_CODE.SUCCESS,
            subCode: n["default"].CALL_END_SUB_CODE.SUCCESS,
            phrase: n["default"].CALL_END_PHRASE.CONV_END_FOR_ALL_INITIATED
          };
        return this.deleteConversationController(f).then(function () {
          t.disposed || (t.telemetryHelper.setTerminatingData({
            terminatingEnd: r["default"].CALL_TERMINATING_END.LOCAL,
            endCode: f.code,
            endSubCode: f.subCode,
            resultDetail: f.phrase
          }), t.telemetryHelper.addNetworkOperationCompleted(s, !0, u.duration()), t.dispose(f), t.onCallStatusChanged(n["default"].CALL_STATUS.LOCAL_TERMINATED, f));
          i.resolve(null);
        })["catch"](function (e) {
          var a = o.getPrintableObject(e);
          t.logger.error("Deleting conversation failed because : " + a);
          t.disposed || (t.telemetryHelper.setTerminatingData({
            terminatingEnd: r["default"].CALL_TERMINATING_END.LOCAL,
            endCode: f.code,
            endSubCode: f.subCode,
            resultDetail: "Failed to end call for all. Error = " + a
          }), t.telemetryHelper.addNetworkOperationCompleted(s, !1, u.duration()), t.dispose(f), t.onCallStatusChanged(n["default"].CALL_STATUS.LOCAL_TERMINATED, f));
          i.resolve(null);
        }), i.promise;
      }, e.prototype.endCallAndLeaveConversation = function (e) {
        var t = this, n = this.deleteCall(e), r = this.leaveConversation(e);
        return Promise.all([
          n,
          r
        ]).then(function (e) {
          t.logger.log("endedCall and left conversation");
        })["catch"](function (e) {
          t.logger.log("ignoring error encountered by endCallAndLeaveConversation. error = " + o.getPrintableObject(e));
        });
      }, e.prototype.leaveConversation = function (e) {
        var t = this;
        return this.convJoined ? (this.logger.log("leaving Conversation on ConversationService"), this.ensureLatestTrouterUrl(r["default"].NETWORK_REQUESTS.LEAVE_CONVERSATION).then(function () {
          return u.get(t, r["default"].NETWORK_REQUESTS.LEAVE_CONVERSATION, h.getPayload(t, e));
        }).then(function (e) {
          return t.signalingAgentConfig.httpRequestDispatcher.postAsync(t.links[n["default"].LINKS.LEAVE], e);
        })) : (this.logger.log("Not joined to conversation. No need to leave."), Promise.resolve());
      }, e.prototype.deleteConversationController = function (e) {
        var t = this;
        return this.convJoined ? (this.logger.log("deleting conversation on ConversationService"), this.ensureLatestTrouterUrl(r["default"].NETWORK_REQUESTS.DELETE_CONVERSATION).then(function () {
          return u.get(t, r["default"].NETWORK_REQUESTS.DELETE_CONVERSATION, p.getPayload(t, e));
        }).then(function (e) {
          return t.signalingAgentConfig.httpRequestDispatcher.removeAsync(t.links[n["default"].LINKS.CONVERSATION_CONTROLLER], e);
        })) : (this.logger.log("Not joined to conversation. Cannot delete it."), Promise.resolve());
      }, e.prototype.deleteCall = function (e) {
        var t = this;
        return this.links[n["default"].LINKS.HANGUP] ? (this.logger.log("ending call on CallController"), this.ensureLatestTrouterUrl(r["default"].NETWORK_REQUESTS.END_CALL).then(function () {
          return u.get(t, r["default"].NETWORK_REQUESTS.END_CALL, v.getPayload(t, e));
        }).then(function (e) {
          return t.signalingAgentConfig.httpRequestDispatcher.removeAsync(t.links[n["default"].LINKS.HANGUP], e);
        })) : (this.logger.log("ending call link on CallController not available"), Promise.resolve());
      }, e.prototype.rejectIncomingCall = function (e) {
        var t = this;
        this.logger.log("rejecting incoming call");
        var i = o.defer();
        this.fsmState = n["default"].SIGNALING_FSM_STATE.IDLE;
        var s = e || {
            code: n["default"].CALL_END_CODE.REJECT,
            subCode: n["default"].CALL_END_SUB_CODE.SUCCESS,
            phrase: n["default"].CALL_END_PHRASE.LOCAL_USER_INITIATED
          }, f = a.build();
        return this.ensureLatestTrouterUrl(r["default"].NETWORK_REQUESTS.REJECT_CALL).then(function () {
          return u.get(t, r["default"].NETWORK_REQUESTS.REJECT_CALL, g.getPayload(t, s));
        }).then(function (e) {
          return t.signalingAgentConfig.httpRequestDispatcher.removeAsync(t.links[n["default"].LINKS.REJECT], e);
        }).then(function (e) {
          t.disposed || (t.telemetryHelper.setTerminatingData({
            terminatingEnd: r["default"].CALL_TERMINATING_END.LOCAL,
            endCode: s.code,
            endSubCode: s.subCode,
            resultDetail: "User rejected call"
          }), t.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.REJECT_CALL, !0, f.duration()), t.dispose(s), t.onCallStatusChanged(n["default"].CALL_STATUS.LOCAL_TERMINATED, s));
          i.resolve(e.response);
        })["catch"](function (e) {
          var u = o.getPrintableObject(e);
          t.logger.error("reject failed because : " + u);
          t.disposed || (t.telemetryHelper.setTerminatingData({
            terminatingEnd: r["default"].CALL_TERMINATING_END.LOCAL,
            endCode: s.code,
            endSubCode: s.subCode,
            resultDetail: "Failed to reject call. Error = " + u
          }), t.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.REJECT_CALL, !1, f.duration()), t.dispose(s), t.onCallStatusChanged(n["default"].CALL_STATUS.LOCAL_TERMINATED, s));
          i.resolve(null);
        }), i.promise;
      }, e.prototype.onCallStatusChanged = function (e, t) {
        this.logger.log("CallStatus changed : " + this.currentCallState + " => " + e);
        t && this.logger.log("onCallStatusChanged: statusCode = " + o.getPrintableObject(t));
        this.orderOfCallState(e) > this.orderOfCallState(this.currentCallState) && (this.currentCallState = e, this.signalingSessionCallback.onCallStatusChanged(e, t));
      }, e.prototype.orderOfCallState = function (e) {
        switch (e) {
        case n["default"].CALL_STATUS.IDLE:
          return 0;
        case n["default"].CALL_STATUS.CONNECTED_FOR_ROSTER_ONLY:
          return 0;
        case n["default"].CALL_STATUS.CONNECTING:
          return 1;
        case n["default"].CALL_STATUS.RINGING:
          return 2;
        case n["default"].CALL_STATUS.CONNECTED:
          return 3;
        case n["default"].CALL_STATUS.LOCAL_TERMINATED:
        case n["default"].CALL_STATUS.REMOTE_TERMINATED:
          return 4;
        default:
          return -1;
        }
      }, e.prototype.handlePSTNBalanceUpdate = function (e) {
        this.logger.log("handlePSTNBalanceUpdate called");
        this.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_BALANCE_UPDATE);
        e.updateBalance ? this.signalingSessionCallback.onPSTNBalanceUpdate(e) : this.logger.log("this was a pstn keepAlive message - ignore");
      }, e.prototype.handleCallAcceptanceAck = function (e) {
        this.logger.log("handleCallAcceptanceAck called");
        this.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_CALL_ACCEPTANCE_ACK);
        if (this.fsmState === n["default"].SIGNALING_FSM_STATE.CONNECTED)
          return;
        this.links[n["default"].LINKS.MEDIA_RENEGOTIATION] = e.callAcceptanceAcknowledgement.links.mediaRenegotiation;
        this.links[n["default"].LINKS.TRANSFER] = e.callAcceptanceAcknowledgement.links.transfer;
        this.links[n["default"].LINKS.REPLACE] = e.callAcceptanceAcknowledgement.links.replacement;
        this.links[n["default"].LINKS.HANGUP] = e.callAcceptanceAcknowledgement.links.callLeg;
        this.links[n["default"].LINKS.KEEPALIVE] = e.callAcceptanceAcknowledgement.links.callLeg;
        this.saveMediaControllerLinksIfAny(e.callAcceptanceAcknowledgement);
        this.scheduleKeepAlives(e.callAcceptanceAcknowledgement.callKeepAliveInterval);
        this.fsmState = n["default"].SIGNALING_FSM_STATE.CONNECTED;
        this.timeoutManager.stopTimer(n["default"].TIMEOUT_OPERATIONS.INCOMING_CALL_ESTABLISHMENT);
        this.telemetryHelper.startCallConnectedWatch();
        this.mediaRenegotiationManager.onCallConnected();
        this.onCallStatusChanged(n["default"].CALL_STATUS.CONNECTED);
        this.cachedRosterReceivedFromJoinResponse && (this.logger.log("handling cachedRosterReceivedFromJoinResponse"), this.participantManager.handleRosterUpdate(this.cachedRosterReceivedFromJoinResponse));
      }, e.prototype.placeCall = function (e, t, i) {
        var s = this;
        this.logger.log("placeCall called");
        this.multiParty || (this.multiParty = this.participantManager.getParticipantsToInitiateCallWith().length !== 1);
        this.telemetryHelper.setConversationServiceUrl(e.conversationServiceUrl);
        this.mediaTypesToUse = i;
        this.lastUsedOutgoingMediaContent = t;
        this.telemetryHelper.setCallerType(this.participantManager.localParticipant.id);
        var c = a.build();
        this.ensureLatestTrouterUrl(r["default"].NETWORK_REQUESTS.PLACE_CALL).then(function () {
          return s.timeoutManager.startTimer(n["default"].TIMEOUT_OPERATIONS.OUTGOING_CALL_ESTABLISHMENT, s.handleCallEstablishmentTimeout.bind(s)), u.get(s, r["default"].NETWORK_REQUESTS.PLACE_CALL, e.newCall ? f.getPayload(s, t, i, e) : l.getPayload(s, t, i, e));
        }).then(function (t) {
          return s.signalingAgentConfig.httpRequestDispatcher.postAsync(e.conversationServiceUrl, t);
        }).then(function (e) {
          s.disposed || (s.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.PLACE_CALL, !0, c.duration()), s.saveConversationServiceLinks(e.response), s.onCallStatusChanged(n["default"].CALL_STATUS.CONNECTING));
        })["catch"](function (e) {
          var t = o.getPrintableObject(e);
          s.logger.error("placeCall failed because : " + t);
          if (!s.disposed) {
            s.fsmState = n["default"].SIGNALING_FSM_STATE.IDLE;
            var i = o.getErrorForXHRFailure(e);
            s.telemetryHelper.setTerminatingData({
              terminatingEnd: r["default"].CALL_TERMINATING_END.LOCAL,
              resultValue: r["default"].RESULT_VALUE.FAILURE,
              endCode: i.telemetryEndSubCode,
              endSubCode: i.error.subCode,
              resultDetail: "Failed to place call. Error = " + t
            });
            s.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.PLACE_CALL, !1, c.duration());
            s.dispose(i.error);
            s.onCallStatusChanged(n["default"].CALL_STATUS.LOCAL_TERMINATED, i.error);
          }
        });
      }, e.prototype.updateConversationLinks = function () {
        var e = this;
        this.logger.log("updateConversationLinks");
        if (this.links.hasOwnProperty(n["default"].LINKS.NOTIFICATION_LINKS)) {
          this.logger.log("sending conversation service UpdateNotificationLinks request");
          var t = a.build();
          this.ensureLatestTrouterUrl(r["default"].NETWORK_REQUESTS.UPDATE_CONVERSATION_LINKS).then(function () {
            return u.get(e, r["default"].NETWORK_REQUESTS.UPDATE_CONVERSATION_LINKS, S.getPayload(e));
          }).then(function (t) {
            return e.signalingAgentConfig.httpRequestDispatcher.postAsync(e.links[n["default"].LINKS.NOTIFICATION_LINKS], t);
          }).then(function (n) {
            e.disposed || (e.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.UPDATE_CONVERSATION_LINKS, !0, t.duration()), e.saveConversationServiceLinks(n.response));
          })["catch"](function (n) {
            var i = o.getPrintableObject(n);
            e.logger.error("sending conversation service UpdateNotificationLinks request failed because : " + i);
            e.disposed || e.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.UPDATE_CONVERSATION_LINKS, !1, t.duration());
          });
        }
      }, e.prototype.awaitCall = function (e) {
        this.logger.log("awaitCall called");
        this.telemetryHelper.setCalleeType(this.participantManager.localParticipant.id);
        var t = atob(e.body.gp), i = JSON.parse(t);
        if (i.callNotification)
          this.getCallDetails(i);
        else {
          this.logger.error("incomingCallData body does not have a callNotification section");
          this.fsmState = n["default"].SIGNALING_FSM_STATE.IDLE;
          this.telemetryHelper.setTerminatingData({
            terminatingEnd: r["default"].CALL_TERMINATING_END.LOCAL,
            resultValue: r["default"].RESULT_VALUE.FAILURE,
            endCode: n["default"].CALL_END_CODE.BAD_REQUEST,
            endSubCode: n["default"].CALL_END_SUB_CODE.BAD_NOTIFICATION_PAYLOAD,
            resultDetail: "Invalid callNotification request"
          });
          var s = {
            code: n["default"].CALL_END_CODE.BAD_REQUEST,
            subCode: n["default"].CALL_END_SUB_CODE.BAD_NOTIFICATION_PAYLOAD,
            phrase: n["default"].CALL_END_PHRASE.BAD_NOTIFICATION_PAYLOAD
          };
          this.dispose(s);
          this.onCallStatusChanged(n["default"].CALL_STATUS.LOCAL_TERMINATED, s);
        }
      }, e.prototype.getCallDetails = function (e) {
        this.remoteCallerOrCallee = s["default"].fromWireParticipant(e.callNotification.from);
        this.links[n["default"].LINKS.CONVERSATION_CONTROLLER] = e.conversationInvitation.conversationController;
        this.links[n["default"].LINKS.ATTACH] = e.callNotification.links.attach;
        this.correlationId = e.debugContent.callId;
        this.participantManager.setParticipantId(e.callNotification.to.participantId);
        this.multiParty = !!e.conversationInvitation.isMultiParty;
        this.isHostLessCall = !!e.conversationInvitation.isHostless;
        this.transferor = e.callNotification.transferor ? e.callNotification.transferor.details ? e.callNotification.transferor.details.id : null : null;
        this.onBehalfOf = e.callNotification.onBehalfOf ? e.callNotification.onBehalfOf.id : null;
        this.callType = e.callNotification.callType;
        e.groupChat && e.groupChat.threadId && (this.threadId = e.groupChat.threadId, this.teamsMessageId = e.groupChat.messageId || null);
        this.onCallStatusChanged(n["default"].CALL_STATUS.IDLE);
        this.sendAttachToCall(e);
      }, e.prototype.sendAttachToCall = function (e) {
        var t = this;
        this.logger.log("sendAttachToCall called");
        var i = e.callNotification.links.attach, s = a.build();
        this.ensureLatestTrouterUrl(r["default"].NETWORK_REQUESTS.SEND_CALL_ATTACH).then(function () {
          return t.timeoutManager.startTimer(n["default"].TIMEOUT_OPERATIONS.INCOMING_CALL_ESTABLISHMENT, t.handleCallEstablishmentTimeout.bind(t)), u.get(t, r["default"].NETWORK_REQUESTS.SEND_CALL_ATTACH, y.getPayload(t, e.conversationInvitation.conversationController));
        }).then(function (e) {
          return t.signalingAgentConfig.httpRequestDispatcher.postAsync(i, e);
        }).then(function (n) {
          if (!t.disposed) {
            t.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.SEND_CALL_ATTACH, !0, s.duration());
            t.raiseInitialOffer(e, n);
            var i = n.response.additionalActionResponses;
            i && i.length > 0 && (t.saveConversationServiceLinks(i[0].output), t.cachedRosterReceivedFromJoinResponse = i[0].output.roster);
          }
        })["catch"](function (e) {
          var i = o.getPrintableObject(e);
          t.logger.error("sendAttachToCall failed because : " + i);
          if (!t.disposed) {
            t.fsmState = n["default"].SIGNALING_FSM_STATE.IDLE;
            var u = o.getErrorForXHRFailure(e);
            t.telemetryHelper.setTerminatingData({
              terminatingEnd: r["default"].CALL_TERMINATING_END.LOCAL,
              resultValue: r["default"].RESULT_VALUE.FAILURE,
              endCode: u.telemetryEndSubCode,
              endSubCode: u.error.subCode,
              resultDetail: "Failed to attach to call. Error = " + i
            });
            t.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.SEND_CALL_ATTACH, !1, s.duration());
            t.dispose(u.error);
            t.onCallStatusChanged(n["default"].CALL_STATUS.LOCAL_TERMINATED, u.error);
          }
        });
      }, e.prototype.raiseInitialOffer = function (e, t) {
        this.links[n["default"].LINKS.MEDIA_ANSWER] = t.response.callInvitation.links.mediaAnswer;
        this.links[n["default"].LINKS.ACCEPT] = t.response.callInvitation.links.acceptance;
        this.links[n["default"].LINKS.REJECT] = t.response.callInvitation.links.callLeg;
        this.links[n["default"].LINKS.REDIRECT] = t.response.callInvitation.links.redirection;
        this.sendProgress(t);
        this.telemetryHelper.setCallerType(this.getParticipantIdForOfferAnswer(t.response.callInvitation.mediaContent));
        var r = o.getMediaTypes(t.response.callInvitation.callModalities);
        this.telemetryHelper.addIncomingModalities(r);
        this.signalingSessionCallback.onOffer({
          subject: e.conversationInvitation.subject,
          remoteParticipantId: this.getParticipantIdForOfferAnswer(t.response.callInvitation.mediaContent),
          remoteEndpointId: t.response.participants.from.endpointId,
          transferor: t.response.callInvitation.transferor,
          mediaTypes: r,
          mediaContent: t.response.callInvitation.mediaContent,
          renegotiation: !1
        });
      }, e.prototype.sendProgress = function (e) {
        var t = this;
        this.logger.log("sendProgress called");
        var n = a.build();
        this.ensureLatestTrouterUrl(r["default"].NETWORK_REQUESTS.SEND_CALL_PROGRESS).then(function () {
          return u.get(t, r["default"].NETWORK_REQUESTS.SEND_CALL_PROGRESS, b.getPayload(t));
        }).then(function (n) {
          return t.signalingAgentConfig.httpRequestDispatcher.postAsync(e.response.callInvitation.links.progress, n);
        }).then(function () {
          t.disposed || t.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.SEND_CALL_PROGRESS, !0, n.duration());
        })["catch"](function (e) {
          var i = o.getPrintableObject(e);
          t.logger.error("sendProgress failed because : " + i);
          t.disposed || t.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.SEND_CALL_PROGRESS, !1, n.duration());
        });
      }, e.prototype.handleMediaAnswer = function (e, t) {
        this.logger.log("handleMediaAnswer called");
        if (this.mediaRenegotiationManager.isOutgoingRenegotiationInProgress()) {
          this.mediaRenegotiationManager.handleMediaAnswer(e);
          return;
        }
        this.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_MEDIA_ANSWER);
        if (this.fsmState !== n["default"].SIGNALING_FSM_STATE.CONNECTED && this.fsmState === n["default"].SIGNALING_FSM_STATE.OUTGOING) {
          if (o.isDuplicateMessage(t, this.provisionalMediaAnswersSeenSoFar)) {
            this.logger.log("ignoring provisional answer retried by service");
            return;
          }
          e.mediaAnswer.sender && (this.remoteCallerOrCallee = e.mediaAnswer.sender);
          this.resetCallEstablishmentTimeout();
          e.mediaAnswer.noRingBack || (this.telemetryHelper.setTimeToRingDuration(), this.onCallStatusChanged(n["default"].CALL_STATUS.RINGING));
          this.signalingSessionCallback.onAnswer({
            provisional: !0,
            renegotiation: !1,
            remoteEndpointId: e.mediaAnswer.sender ? e.mediaAnswer.sender.endpointId : o.newGuid(),
            remoteParticipantId: this.getParticipantIdForOfferAnswer(e.mediaAnswer.mediaContent),
            mediaContent: e.mediaAnswer.mediaContent
          });
        }
      }, e.prototype.handleCallAcceptance = function (e) {
        var t = this;
        this.logger.log("handleCallAcceptance called");
        this.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_CALL_ACCEPTANCE);
        var i = a.build();
        this.ensureLatestTrouterUrl(r["default"].NETWORK_REQUESTS.SEND_ACCEPTANCE_ACKNOWLEDGEMENT).then(function () {
          return u.get(t, r["default"].NETWORK_REQUESTS.SEND_ACCEPTANCE_ACKNOWLEDGEMENT, w.getPayload(t));
        }).then(function (n) {
          return t.signalingAgentConfig.httpRequestDispatcher.postAsync(e.callAcceptance.links.acknowledgement, n);
        }).then(function () {
          t.disposed || t.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.SEND_ACCEPTANCE_ACKNOWLEDGEMENT, !0, i.duration());
        })["catch"](function (e) {
          var n = o.getPrintableObject(e);
          t.logger.error("handleCallAcceptance failed because : " + n);
          t.disposed || t.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.SEND_ACCEPTANCE_ACKNOWLEDGEMENT, !1, i.duration());
        });
        this.fsmState === n["default"].SIGNALING_FSM_STATE.OUTGOING && (this.telemetryHelper.setTimeToRingDuration(), this.raiseCallAcceptance(e), this.multiParty || this.participantManager.handleRosterUpdate(this.getFakeRoster(e)));
      }, e.prototype.getFakeRoster = function (e) {
        var t = this.participantManager.getParticipantsToInitiateCallWith(), n, r;
        t.length === 1 ? r = t[0].id : r = e.callAcceptance.acceptedBy.id;
        var i = {
            id: r,
            displayName: e.callAcceptance.acceptedBy.id === r ? e.callAcceptance.acceptedBy.displayName : "",
            endpointId: e.callAcceptance.acceptedBy.endpointId,
            participantId: e.callAcceptance.acceptedBy.participantId,
            languageId: e.callAcceptance.acceptedBy.languageId
          }, s = e.callAcceptance.acceptedBy.endpointId, o = {
            fakeRoster: !0,
            participants: (u = {}, u[r] = {
              acceptedBy: e.callAcceptance.acceptedBy.id,
              details: i,
              endpoints: (a = {}, a[s] = {
                call: {},
                contentSharing: {},
                capabilities: e.callAcceptance.capabilities
              }, a)
            }, u)
          };
        return o;
        var u, a;
      }, e.prototype.raiseCallAcceptance = function (e) {
        this.fsmState = n["default"].SIGNALING_FSM_STATE.CONNECTED;
        this.timeoutManager.stopTimer(n["default"].TIMEOUT_OPERATIONS.OUTGOING_CALL_ESTABLISHMENT);
        this.telemetryHelper.startCallConnectedWatch();
        this.mediaRenegotiationManager.onCallConnected();
        var t = this.mediaTypesToUse, r = o.newGuid();
        e.callAcceptance.acceptedBy && (this.remoteCallerOrCallee = s["default"].fromWireParticipant(e.callAcceptance.acceptedBy), r = e.callAcceptance.acceptedBy.endpointId);
        e.callAcceptance.acceptedCallModalities && e.callAcceptance.acceptedCallModalities.length > 0 && (t = e.callAcceptance.acceptedCallModalities);
        var i = o.getMediaTypes(t);
        this.telemetryHelper.addIncomingModalities(i);
        this.links[n["default"].LINKS.MEDIA_RENEGOTIATION] = e.callAcceptance.links.mediaRenegotiation;
        this.links[n["default"].LINKS.TRANSFER] = e.callAcceptance.links.transfer;
        this.links[n["default"].LINKS.REPLACE] = e.callAcceptance.links.replacement;
        this.links[n["default"].LINKS.HANGUP] = e.callAcceptance.links.callLeg;
        this.links[n["default"].LINKS.KEEPALIVE] = e.callAcceptance.links.callLeg;
        this.saveMediaControllerLinksIfAny(e.callAcceptance);
        this.scheduleKeepAlives(e.callAcceptance.callKeepAliveInterval);
        var u = this.getParticipantIdForOfferAnswer(e.callAcceptance.mediaContent);
        this.signalingSessionCallback.onAnswer({
          provisional: !1,
          renegotiation: !1,
          remoteEndpointId: r,
          remoteParticipantId: u,
          callAcceptedByNGCVoicemail: u === n["default"].KNOWN_BOTS.VOICEMAIL_BOT_ID,
          mediaTypes: i,
          mediaContent: e.callAcceptance.mediaContent
        });
        this.onCallStatusChanged(n["default"].CALL_STATUS.CONNECTED);
      }, e.prototype.handleCallEnd = function (e) {
        this.logger.log("Call End received . Details : " + o.getPrintableObject(e));
        this.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_CALL_END);
        if (this.fsmState === n["default"].SIGNALING_FSM_STATE.IDLE) {
          this.logger.log("Not handling incoming callEnd since fsmstate = SIGNALING_FSM_STATE.IDLE");
          return;
        }
        if (e.code === n["default"].CALL_END_CODE.CONFLICT && this.multiParty && e.conversationUrl && e.conversationUrl.Location)
          this.handleConversationResolutionConflict(e);
        else {
          e.callControllerTransactionEnd && (this.logger.log("handleCallEnd: using CC end details specified in CS end"), e = e.callControllerTransactionEnd);
          var t = e.code === n["default"].CALL_END_CODE.SUCCESS || e.code === n["default"].CALL_END_CODE.CANCEL || e.code === n["default"].CALL_END_CODE.REJECT;
          this.telemetryHelper.setTerminatingData({
            terminatingEnd: r["default"].CALL_TERMINATING_END.REMOTE,
            resultDetail: e.phrase,
            resultValue: t ? r["default"].RESULT_VALUE.SUCCESS : r["default"].RESULT_VALUE.FAILURE,
            endCode: e.code,
            endSubCode: e.subCode
          });
          var i = {
            code: e.code,
            subCode: e.subCode,
            phrase: e.phrase
          };
          this.dispose(i);
          this.fsmState = n["default"].SIGNALING_FSM_STATE.IDLE;
          this.onCallStatusChanged(n["default"].CALL_STATUS.REMOTE_TERMINATED, i);
        }
      }, e.prototype.handleConversationResolutionConflict = function (e) {
        this.logger.log("handleConversationResolutionConflict");
        this.fsmState = n["default"].SIGNALING_FSM_STATE.IDLE;
        this.timeoutManager.stopTimer(n["default"].TIMEOUT_OPERATIONS.OUTGOING_CALL_ESTABLISHMENT);
        this.joinGivenConversation(e.conversationUrl.Location, e.correlationId, this.lastUsedOutgoingMediaContent, this.mediaTypesToUse);
      }, e.prototype.handleCallProgress = function (e) {
        this.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_CALL_PROGRESS);
        this.fsmState === n["default"].SIGNALING_FSM_STATE.OUTGOING && (this.telemetryHelper.setTimeToRingDuration(), this.resetCallEstablishmentTimeout(), this.onCallStatusChanged(n["default"].CALL_STATUS.RINGING), e.status === "forwarded" && this.signalingSessionCallback.onCallForwarded({ destinationType: e.status.forwardingDestinationType || "user" }));
      }, e.prototype.resetCallEstablishmentTimeout = function () {
        this.timeoutManager.stopTimer(n["default"].TIMEOUT_OPERATIONS.OUTGOING_CALL_ESTABLISHMENT);
        this.timeoutManager.startTimer(n["default"].TIMEOUT_OPERATIONS.OUTGOING_CALL_ESTABLISHMENT, this.handleCallEstablishmentTimeout.bind(this));
      }, e.prototype.handleMediaAcknowledgement = function (e) {
        this.currentCallState !== n["default"].CALL_STATUS.CONNECTED ? this.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_MEDIA_ACKNOWLEDGEMENT) : this.mediaRenegotiationManager.handleMediaAcknowledgment(e);
      }, e.prototype.handleConversationUpdate = function (e, t) {
        var n = this.threadId, i = this.teamsMessageId;
        this.logger.log("handleConversationUpdate");
        this.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_CONVERSATION_UPDATE);
        this.saveConversationServiceLinks(e);
        this.updateCorrelationId(t);
        (this.threadId !== n || this.teamsMessageId !== i) && this.signalingSessionCallback.onConversationUpdated({
          threadId: this.threadId,
          teamsMessageId: this.teamsMessageId
        });
        this.contentSharingManager.handleIncomingContentSharingIfAny(e);
      }, e.prototype.handleAddModalityFailure = function (e) {
        this.logger.log("handleAddModalityFailure");
        this.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_ADD_MODALITY_FAILURE);
        e.modalityFailure.contentSharing ? this.contentSharingManager.handleAddModalityFailure(e) : e.modalityFailure.groupChat && this.signalingSessionCallback.onChatModalitySetupFailed({
          code: e.modalityFailure.groupChat.code,
          subCode: e.modalityFailure.groupChat.subCode,
          phrase: e.modalityFailure.groupChat.phrase
        });
      }, e.prototype.handleAddModalitySuccess = function (e) {
        this.logger.log("handleAddModalitySuccess");
        this.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_ADD_MODALITY_SUCCESS);
        e.modalitySuccess.contentSharing && this.contentSharingManager.handleAddModalitySuccess(e);
      }, e.prototype.handleTransferRequested = function (e) {
        var t = this;
        this.logger.log("handleTransferRequest");
        this.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_TRANSFER_REQUESTED);
        this.links[n["default"].LINKS.TRANSFER_ACCEPTANCE] = e.links.transferAcceptance;
        this.links[n["default"].LINKS.TRANSFER_COMPLETION] = e.links.transferCompletion;
        var i = this.signalingSessionCallback.onTransferRequested(e);
        i.then(function (e) {
          e ? t.signalTransferCompletedAsync(e) : t.signalTransferAccepted();
        }, function (e) {
          t.logger.error("onTransferRequested callback failed with error: " + e);
          t.signalTransferCompletedAsync({ code: n["default"].CALL_END_CODE.LOCAL_ERROR });
        });
      }, e.prototype.handleTransferAcceptance = function (e) {
        this.logger.log("handleTransferAcceptance");
        this.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_TRANSFER_ACCEPTANCE);
        var t = { transferCompletionPromise: this.transferCallCompletionDeffered.promise };
        this.transferCallAcceptanceDeffered.resolve(t);
      }, e.prototype.handleTransferCompletion = function (e) {
        this.logger.log("handleTransferCompletion");
        this.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_TRANSFER_COMPLETION);
        if (this.transferCallAcceptanceDeffered && this.transferCallCompletionDeffered) {
          e.code === 0 ? this.transferCallCompletionDeffered.resolve(e) : this.transferCallCompletionDeffered.reject(e);
          var t = { transferCompletionPromise: this.transferCallCompletionDeffered.promise };
          this.transferCallAcceptanceDeffered.resolve(t);
        }
      }, e.prototype.signalTransferCompletedAsync = function (e) {
        var t = this, i = a.build();
        return u.get(this, r["default"].NETWORK_REQUESTS.TRANSFER_COMPLETION, C.getPayload(e)).then(function (e) {
          return t.signalingAgentConfig.httpRequestDispatcher.postAsync(t.links[n["default"].LINKS.TRANSFER_COMPLETION], e);
        }).then(function (e) {
          t.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.TRANSFER_COMPLETION, !0, i.duration());
        })["catch"](function (e) {
          var n = o.getPrintableObject(e);
          t.logger.error("transferCompletion failed because : " + n);
          t.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.TRANSFER_COMPLETION, !1, i.duration());
        });
      }, e.prototype.signalTransferAccepted = function () {
        var e = this, t = a.build();
        u.get(this, r["default"].NETWORK_REQUESTS.TRANSFER_ACCEPTANCE, N.getPayload()).then(function (t) {
          return e.signalingAgentConfig.httpRequestDispatcher.postAsync(e.links[n["default"].LINKS.TRANSFER_ACCEPTANCE], t);
        }).then(function (n) {
          e.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.TRANSFER_ACCEPTANCE, !0, t.duration());
        })["catch"](function (n) {
          var i = o.getPrintableObject(n);
          e.logger.error("transferAcceptance failed because : " + i);
          e.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.TRANSFER_ACCEPTANCE, !1, t.duration());
        });
      }, e.prototype.scheduleKeepAlives = function (e) {
        var t = 0.9 * e * 1000;
        this.logger.log("sending KeepAlives every " + t + " milliseconds");
        this.keepAliveTimer = window.setInterval(this.sendKeepAlive.bind(this), t);
      }, e.prototype.sendKeepAlive = function () {
        var e = this;
        this.logger.log("sendKeepAlive called. Call disposed : " + this.disposed);
        if (this.disposed)
          return;
        this.logger.log("sending keepAlive count = " + this.keepAliveCount++);
        u.get(this, r["default"].NETWORK_REQUESTS.SEND_KEEP_ALIVE, null).then(function (t) {
          e.sendToKeepAliveUrl(t);
        })["catch"](function (t) {
          e.logger.error("sending keepAlive failed because : " + t);
        });
      }, e.prototype.sendToKeepAliveUrl = function (e) {
        var t = this, i = a.build();
        this.signalingAgentConfig.httpRequestDispatcher.postAsync(this.links[n["default"].LINKS.KEEPALIVE], e).then(function () {
          t.disposed || t.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.SEND_KEEP_ALIVE, !0, i.duration());
        })["catch"](function (e) {
          var n = o.getPrintableObject(e);
          t.logger.error("sendToKeepAliveUrl failed because : " + n);
          t.disposed || t.telemetryHelper.addNetworkOperationCompleted(r["default"].NETWORK_REQUESTS.SEND_KEEP_ALIVE, !1, i.duration());
        });
      }, e.prototype.handleCallEstablishmentTimeout = function () {
        this.logger.log("handleCallEstablishmentTimeout");
        this.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_CALL_ESTABLISHMENT_TIMEOUT);
        this.telemetryHelper.setTerminatingData({
          terminatingEnd: r["default"].CALL_TERMINATING_END.LOCAL,
          resultValue: r["default"].RESULT_VALUE.FAILURE,
          resultDetail: n["default"].CALL_END_SUB_CODE.CALL_ESTABLISHMENT_TIMEOUT,
          endCode: n["default"].CALL_END_CODE.TIMEOUT,
          endSubCode: n["default"].CALL_END_SUB_CODE.CALL_ESTABLISHMENT_TIMEOUT
        });
        var e = {
          code: n["default"].CALL_END_CODE.TIMEOUT,
          subCode: n["default"].CALL_END_SUB_CODE.CALL_ESTABLISHMENT_TIMEOUT,
          phrase: n["default"].CALL_END_PHRASE.ESTABLISHMENT_TIMEOUT
        };
        this.dispose(e);
        this.fsmState = n["default"].SIGNALING_FSM_STATE.IDLE;
        this.onCallStatusChanged(n["default"].CALL_STATUS.LOCAL_TERMINATED, e);
      }, e.prototype.handleCallTransferTimeout = function () {
        this.logger.log("handleCallTransferTimeout");
        this.telemetryHelper.addLocalOperation(r["default"].LOCAL_OPERATIONS.HANDLE_CALL_TRANSFER_TIMEOUT);
        if (this.transferCallCompletionDeffered && this.transferCallAcceptanceDeffered) {
          var e = {
            code: n["default"].CALL_END_CODE.TIMEOUT,
            phrase: n["default"].CALL_END_PHRASE.TRANSFER_COMPLETION_TIMEOUT
          };
          this.transferCallCompletionDeffered.reject(e);
          this.transferCallAcceptanceDeffered.reject(e);
        }
      }, e.prototype.updateCorrelationId = function (e) {
        e && e[n["default"].HEADERS.CORRELATION_ID] && e[n["default"].HEADERS.CORRELATION_ID].length && this.correlationId !== e[n["default"].HEADERS.CORRELATION_ID] && (this.logger.log("Changing correlationId from '" + this.correlationId + "' to '" + e[n["default"].HEADERS.CORRELATION_ID] + "'"), this.telemetryHelper.addChangingCorrelationId(this.correlationId, e[n["default"].HEADERS.CORRELATION_ID]), this.correlationId = e[n["default"].HEADERS.CORRELATION_ID]);
      }, e.prototype.dispose = function (e) {
        if (!this.disposed) {
          this.logger.log("dispose");
          this.disposed = !0;
          this.keepAliveTimer && window.clearInterval(this.keepAliveTimer);
          this.signalingAgent.onCallCompleted(this.urlIdentifier);
          this.signalingAgentConfig.trouterUrlGetter.trouterUrl.changed.off(this.onTrouterUrlChanged);
          this.timeoutManager.dispose();
          this.timeoutManager = null;
          this.participantManager.dispose(e);
          this.participantManager = null;
          this.mediaRenegotiationManager.dispose();
          this.mediaRenegotiationManager = null;
          this.contentSharingManager.dispose(e);
          this.contentSharingManager = null;
          this.telemetryHelper.dispose();
          this.telemetryHelper = null;
          this.webRtcSignalingManager.dispose();
          this.webRtcSignalingManager = null;
          if (this.transferCallCompletionDeffered !== null && this.transferCallAcceptanceDeffered !== null) {
            var t = { code: n["default"].CALL_END_CODE.CANCEL };
            this.transferCallCompletionDeffered.reject(t);
            this.transferCallAcceptanceDeffered.reject(t);
            this.transferCallAcceptanceDeffered = null;
            this.transferCallCompletionDeffered = null;
          }
        }
      }, e;
    }();
  t.SignalingSession = _;
  t.build = D;
}));

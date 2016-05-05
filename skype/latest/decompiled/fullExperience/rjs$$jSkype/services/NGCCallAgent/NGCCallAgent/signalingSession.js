define("jSkype/services/NGCCallAgent/NGCCallAgent/signalingSession", [
  "require",
  "exports",
  "module",
  "jSkype/services/NGCCallAgent/NGCCallAgent/constants",
  "jSkype/services/NGCCallAgent/NGCCallAgent/telemetryConstants",
  "jSkype/services/NGCCallAgent/NGCCallAgent/participant",
  "jSkype/services/NGCCallAgent/NGCCallAgent/utils",
  "jSkype/services/serviceAccessLayer/requestDispatcher",
  "jSkype/services/NGCCallAgent/NGCCallAgent/requestBuilder",
  "jSkype/services/NGCCallAgent/NGCCallAgent/createConversationRequest",
  "jSkype/services/NGCCallAgent/NGCCallAgent/joinGivenConversationRequest",
  "jSkype/services/NGCCallAgent/NGCCallAgent/joinGivenConversationWithoutCallModalityRequest",
  "jSkype/services/NGCCallAgent/NGCCallAgent/leaveConversationRequest",
  "jSkype/services/NGCCallAgent/NGCCallAgent/cancelCallRequest",
  "jSkype/services/NGCCallAgent/NGCCallAgent/endCallRequest",
  "jSkype/services/NGCCallAgent/NGCCallAgent/provisionalMediaResponse",
  "jSkype/services/NGCCallAgent/NGCCallAgent/callAcceptanceRequest",
  "jSkype/services/NGCCallAgent/NGCCallAgent/rejectCallRequest",
  "jSkype/services/NGCCallAgent/NGCCallAgent/joinConversationForConnectedCallRequest",
  "jSkype/services/NGCCallAgent/NGCCallAgent/attachCallRequest",
  "jSkype/services/NGCCallAgent/NGCCallAgent/callProgressRequest",
  "jSkype/services/NGCCallAgent/NGCCallAgent/callAcceptanceAcknowledgementRequest",
  "jSkype/services/NGCCallAgent/NGCCallAgent/participantUpdateRequest",
  "jSkype/services/NGCCallAgent/NGCCallAgent/updateParticipantConversationLinksRequest",
  "jcafe-property-model",
  "jSkype/settings",
  "constants/common",
  "swx-utils-common",
  "jSkype/services/NGCCallAgent/NGCCallAgent/telemetryHelper",
  "jSkype/services/NGCCallAgent/NGCCallAgent/participantManager",
  "jSkype/services/NGCCallAgent/NGCCallAgent/mediaRenegotiationManager",
  "jSkype/services/NGCCallAgent/NGCCallAgent/timeoutManager"
], function (e, t) {
  var n = e("jSkype/services/NGCCallAgent/NGCCallAgent/constants"), r = e("jSkype/services/NGCCallAgent/NGCCallAgent/telemetryConstants"), i = e("jSkype/services/NGCCallAgent/NGCCallAgent/participant"), s = e("jSkype/services/NGCCallAgent/NGCCallAgent/utils"), o = e("jSkype/services/serviceAccessLayer/requestDispatcher"), u = e("jSkype/services/NGCCallAgent/NGCCallAgent/requestBuilder"), a = e("jSkype/services/NGCCallAgent/NGCCallAgent/createConversationRequest"), f = e("jSkype/services/NGCCallAgent/NGCCallAgent/joinGivenConversationRequest"), l = e("jSkype/services/NGCCallAgent/NGCCallAgent/joinGivenConversationWithoutCallModalityRequest"), c = e("jSkype/services/NGCCallAgent/NGCCallAgent/leaveConversationRequest"), h = e("jSkype/services/NGCCallAgent/NGCCallAgent/cancelCallRequest"), p = e("jSkype/services/NGCCallAgent/NGCCallAgent/endCallRequest"), d = e("jSkype/services/NGCCallAgent/NGCCallAgent/provisionalMediaResponse"), v = e("jSkype/services/NGCCallAgent/NGCCallAgent/callAcceptanceRequest"), m = e("jSkype/services/NGCCallAgent/NGCCallAgent/rejectCallRequest"), g = e("jSkype/services/NGCCallAgent/NGCCallAgent/joinConversationForConnectedCallRequest"), y = e("jSkype/services/NGCCallAgent/NGCCallAgent/attachCallRequest"), b = e("jSkype/services/NGCCallAgent/NGCCallAgent/callProgressRequest"), w = e("jSkype/services/NGCCallAgent/NGCCallAgent/callAcceptanceAcknowledgementRequest"), E = e("jSkype/services/NGCCallAgent/NGCCallAgent/participantUpdateRequest"), S = e("jSkype/services/NGCCallAgent/NGCCallAgent/updateParticipantConversationLinksRequest"), x = e("jcafe-property-model"), T = e("jSkype/settings"), N = e("constants/common"), C = e("swx-utils-common").stopwatch, k = e("jSkype/services/NGCCallAgent/NGCCallAgent/telemetryHelper"), L = e("jSkype/services/NGCCallAgent/NGCCallAgent/participantManager"), A = e("jSkype/services/NGCCallAgent/NGCCallAgent/mediaRenegotiationManager"), O = e("jSkype/services/NGCCallAgent/NGCCallAgent/timeoutManager"), M = function (e, t, M, _, D) {
      function $(e) {
        F = !0, H[n.LINKS.CONVERSATION_CONTROLLER] = e.conversationController, H[n.LINKS.ADD_PARTICIPANT_AND_MODALITY] = e.links.addParticipantAndModality, H[n.LINKS.LEAVE] = e.links.leave, H[n.LINKS.NOTIFICATION_LINKS] = e.links.notificationLinks, H[n.LINKS.REMOVE_PARTICIPANT] = e.links.removeParticipant, P.convSubject = e.subject, e.activeModalities && e.activeModalities.groupChat && (P.threadId = e.activeModalities.groupChat.threadId, e.activeModalities.groupChat.messageId && (P.spacesMessageId = e.activeModalities.groupChat.messageId)), e.state && (P.multiParty = e.state.isMultiParty);
      }
      function J(e) {
        var t = x.task(), i = e || {
            code: n.CALL_END_CODE.CANCEL,
            subCode: n.CALL_END_SUB_CODE.SUCCESS,
            phrase: n.CALL_END_PHRASE.LOCAL_USER_INITIATED
          };
        if (!H.hasOwnProperty(n.LINKS.LEAVE))
          X.log("Conversation Service Leave Url is not yet set. Cannot leave conversation. Disposing anyways."), P.telemetryHelper.setTerminatingData({
            terminatingEnd: r.CALL_TERMINATING_END.LOCAL,
            resultDetail: "Conversation Service Leave Url is not yet set",
            endCode: n.CALL_END_CODE.CANCEL,
            endSubCode: n.CALL_END_SUB_CODE.CONV_URL_NOT_SET
          }), bt(), i.subCode = n.CALL_END_SUB_CODE.CONV_URL_NOT_SET, Y(n.CALL_STATUS.LOCAL_TERMINATED, i), t.resolve(null);
        else {
          X.log("cancelling outgoing call"), j = n.SIGNALING_FSM_STATE.IDLE;
          var a = C.build(), f = h.getPayload(P, i);
          u.get(P, r.NETWORK_REQUESTS.CANCEL_CALL, f).then(function (e) {
            return o.post(H[n.LINKS.LEAVE], e);
          }).then(function (e) {
            I || (P.telemetryHelper.setTerminatingData({
              terminatingEnd: r.CALL_TERMINATING_END.LOCAL,
              resultDetail: "User cancelled call",
              endCode: n.CALL_END_CODE.CANCEL
            }), P.telemetryHelper.addNetworkOperationCompleted(r.NETWORK_REQUESTS.CANCEL_CALL, !0, a.duration()), bt(), Y(n.CALL_STATUS.LOCAL_TERMINATED, i)), s.safelyResolvePromise(t, e.response);
          }).catch(function (e) {
            var o = s.getPrintableObject(e);
            X.error("Cancelling call failed because : " + o), I || (P.telemetryHelper.setTerminatingData({
              terminatingEnd: r.CALL_TERMINATING_END.LOCAL,
              endCode: n.CALL_END_CODE.CANCEL,
              endSubCode: n.CALL_END_SUB_CODE.FAILED_TO_REACH_SERVICE,
              resultDetail: "Failed to Cancel Call. Error = " + o
            }), P.telemetryHelper.addNetworkOperationCompleted(r.NETWORK_REQUESTS.CANCEL_CALL, !1, a.duration()), bt(), i.subCode = n.CALL_END_SUB_CODE.FAILED_TO_REACH_SERVICE, Y(n.CALL_STATUS.LOCAL_TERMINATED, i)), s.safelyResolvePromise(t, null);
          });
        }
        return t.promise;
      }
      function K(e) {
        var t = x.task();
        X.log("ending established call"), j = n.SIGNALING_FSM_STATE.IDLE;
        var i = F ? r.NETWORK_REQUESTS.LEAVE_CONVERSATION : r.NETWORK_REQUESTS.END_CALL, o = C.build(), u = e || {
            code: n.CALL_END_CODE.SUCCESS,
            subCode: n.CALL_END_SUB_CODE.SUCCESS,
            phrase: n.CALL_END_PHRASE.LOCAL_USER_INITIATED
          };
        return Q(u).then(function (e) {
          I || (P.telemetryHelper.setTerminatingData({ terminatingEnd: r.CALL_TERMINATING_END.LOCAL }), P.telemetryHelper.addNetworkOperationCompleted(i, !0, o.duration()), bt(), Y(n.CALL_STATUS.LOCAL_TERMINATED, u)), s.safelyResolvePromise(t, e.response);
        }).catch(function (e) {
          var a = s.getPrintableObject(e);
          X.error("Ending call failed because : " + a), I || (P.telemetryHelper.setTerminatingData({
            terminatingEnd: r.CALL_TERMINATING_END.LOCAL,
            endCode: n.CALL_END_CODE.SUCCESS,
            endSubCode: n.CALL_END_SUB_CODE.FAILED_TO_REACH_SERVICE,
            resultDetail: "Failed to end Call. Error = " + a
          }), P.telemetryHelper.addNetworkOperationCompleted(i, !1, o.duration()), bt(), u.subCode = n.CALL_END_SUB_CODE.FAILED_TO_REACH_SERVICE, Y(n.CALL_STATUS.LOCAL_TERMINATED, u)), s.safelyResolvePromise(t, null);
        }), t.promise;
      }
      function Q(e) {
        var t;
        return F ? (X.log("leaving Conversation on ConversationService"), t = c.getPayload(P, e), u.get(P, r.NETWORK_REQUESTS.LEAVE_CONVERSATION, t).then(function (e) {
          return o.post(H[n.LINKS.LEAVE], e);
        })) : (X.log("ending call on CallController"), t = p.getPayload(P, e), u.get(P, r.NETWORK_REQUESTS.END_CALL, t).then(function (e) {
          return o.remove(H[n.LINKS.HANGUP], e);
        }));
      }
      function G(e) {
        X.log("rejecting incoming call");
        var t = x.task();
        j = n.SIGNALING_FSM_STATE.IDLE;
        var i = e || {
            code: n.CALL_END_CODE.REJECT,
            subCode: n.CALL_END_SUB_CODE.SUCCESS,
            phrase: n.CALL_END_PHRASE.LOCAL_USER_INITIATED
          }, a = C.build(), f = m.getPayload(P, i);
        return u.get(P, r.NETWORK_REQUESTS.REJECT_CALL, f).then(function (e) {
          return o.remove(H[n.LINKS.REJECT], e);
        }).then(function (e) {
          I || (P.telemetryHelper.setTerminatingData({
            terminatingEnd: r.CALL_TERMINATING_END.LOCAL,
            endCode: n.CALL_END_CODE.REJECT,
            resultDetail: "User rejected call"
          }), P.telemetryHelper.addNetworkOperationCompleted(r.NETWORK_REQUESTS.REJECT_CALL, !0, a.duration()), bt(), Y(n.CALL_STATUS.LOCAL_TERMINATED, i)), s.safelyResolvePromise(t, e.response);
        }).catch(function (e) {
          var o = s.getPrintableObject(e);
          X.error("reject failed because : " + o), I || (P.telemetryHelper.setTerminatingData({
            terminatingEnd: r.CALL_TERMINATING_END.LOCAL,
            endCode: n.CALL_END_CODE.REJECT,
            endSubCode: n.CALL_END_SUB_CODE.FAILED_TO_REACH_SERVICE,
            resultDetail: "Failed to reject call. Error = " + o
          }), P.telemetryHelper.addNetworkOperationCompleted(r.NETWORK_REQUESTS.REJECT_CALL, !1, a.duration()), bt(), Y(n.CALL_STATUS.LOCAL_TERMINATED, i)), s.safelyResolvePromise(t, null);
        }), t.promise;
      }
      function Y(e, n) {
        X.log("CallStatus changed : " + B + " => " + e), n && X.log("onCallStatusChanged: statusCode = " + s.getPrintableObject(n)), Z(e) > Z(B) && (B = e, t.onCallStatusChanged(e, n));
      }
      function Z(e) {
        switch (e) {
        case n.CALL_STATUS.IDLE:
          return 0;
        case n.CALL_STATUS.CONNECTED_FOR_ROSTER_ONLY:
          return 0;
        case n.CALL_STATUS.CONNECTING:
          return 1;
        case n.CALL_STATUS.RINGING:
          return 2;
        case n.CALL_STATUS.CONNECTED:
          return 3;
        case n.CALL_STATUS.LOCAL_TERMINATED:
        case n.CALL_STATUS.REMOTE_TERMINATED:
          return 4;
        default:
          return -1;
        }
      }
      function et(e) {
        X.log("handleCallAcceptanceAck called"), P.telemetryHelper.addLocalOperation(r.LOCAL_OPERATIONS.HANDLE_CALL_ACCEPTANCE_ACK);
        if (j === n.SIGNALING_FSM_STATE.CONNECTED)
          return;
        H[n.LINKS.MEDIA_RENEGOTIATION] = e.callAcceptanceAcknowledgement.links.mediaRenegotiation, H[n.LINKS.TRANSFER] = e.callAcceptanceAcknowledgement.links.transfer, H[n.LINKS.REPLACE] = e.callAcceptanceAcknowledgement.links.replacement, H[n.LINKS.HANGUP] = e.callAcceptanceAcknowledgement.links.callLeg, H[n.LINKS.KEEPALIVE] = e.callAcceptanceAcknowledgement.links.callLeg, vt(e.callAcceptanceAcknowledgement.callKeepAliveInterval), j = n.SIGNALING_FSM_STATE.CONNECTED, P.timeoutManager.stopTimer(n.TIMEOUT_OPERATIONS.INCOMING_CALL_ESTABLISHMENT), P.telemetryHelper.startCallConnectedWatch(), P.mediaRenegotiationManager.onCallConnected(), Y(n.CALL_STATUS.CONNECTED);
        var t = C.build(), i = g.getPayload(P);
        u.get(P, r.NETWORK_REQUESTS.JOIN_CONVERSATION, i).then(function (e) {
          return o.post(H[n.LINKS.CONVERSATION_CONTROLLER], e);
        }).then(function (e) {
          if (!I) {
            if (!e.response.roster)
              throw new Error("response does not contain a roster");
            P.telemetryHelper.addNetworkOperationCompleted(r.NETWORK_REQUESTS.JOIN_CONVERSATION, !0, t.duration()), $(e.response), P.participantManager.handleRosterUpdate(e.response.roster);
          }
        }).catch(function (e) {
          var n = s.getPrintableObject(e);
          X.error("ConversationJoin failed because : " + n), X.log("current call status : " + B), I || P.telemetryHelper.addNetworkOperationCompleted(r.NETWORK_REQUESTS.JOIN_CONVERSATION, !1, t.duration());
        });
      }
      function tt(e, t, i, l, c) {
        X.log("placeCall called"), P.telemetryHelper.setConversationServiceUrl(e.requestUrl), P.telemetryHelper.setLocalOfferAnswerDuration(r.LOCAL_OFFER_ANSWER_TIMES.INITIAL_OFFER_TIME + ":" + c), z = i, W = t, P.timeoutManager.startTimer(n.TIMEOUT_OPERATIONS.OUTGOING_CALL_ESTABLISHMENT, yt), P.telemetryHelper.setCallerType(P.participantManager.localParticipant.id);
        var h = C.build(), p = e.newCall ? a.getPayload(P, t, i, l) : f.getPayload(P, t, i);
        u.get(P, r.NETWORK_REQUESTS.PLACE_CALL, p).then(function (t) {
          return o.post(e.requestUrl, t);
        }).then(function (e) {
          I || (P.telemetryHelper.addNetworkOperationCompleted(r.NETWORK_REQUESTS.PLACE_CALL, !0, h.duration()), $(e.response), Y(n.CALL_STATUS.CONNECTING));
        }).catch(function (e) {
          var t = s.getPrintableObject(e);
          X.error("placeCall failed because : " + t), I || (j = n.SIGNALING_FSM_STATE.IDLE, P.telemetryHelper.setTerminatingData({
            terminatingEnd: r.CALL_TERMINATING_END.LOCAL,
            resultValue: r.RESULT_VALUE.FAILURE,
            endCode: n.CALL_END_CODE.SERVICE_UNAVAILABLE,
            endSubCode: n.CALL_END_SUB_CODE.PLACE_CALL_FAILED,
            resultDetail: "Failed to place call. Error = " + t
          }), P.telemetryHelper.addNetworkOperationCompleted(r.NETWORK_REQUESTS.PLACE_CALL, !1, h.duration()), bt(), Y(n.CALL_STATUS.LOCAL_TERMINATED, {
            code: n.CALL_END_CODE.NETWORK_ERROR,
            subCode: n.CALL_END_SUB_CODE.FAILED_TO_REACH_SERVICE,
            phrase: n.CALL_END_PHRASE.NETWORK_ERROR
          }));
        });
      }
      function nt() {
        X.log("updateConversationLinks");
        if (H.hasOwnProperty(n.LINKS.NOTIFICATION_LINKS)) {
          X.log("sending conversation service UpdateNotificationLinks request");
          var e = C.build(), t = S.getPayload(P);
          u.get(P, r.NETWORK_REQUESTS.UPDATE_CONVERSATION_LINKS, t).then(function (e) {
            return o.post(H[n.LINKS.NOTIFICATION_LINKS], e);
          }).then(function (t) {
            I || (P.telemetryHelper.addNetworkOperationCompleted(r.NETWORK_REQUESTS.UPDATE_CONVERSATION_LINKS, !0, e.duration()), $(t.response));
          }).catch(function (t) {
            var n = s.getPrintableObject(t);
            X.error("sending conversation service UpdateNotificationLinks request failed because : " + n), I || P.telemetryHelper.addNetworkOperationCompleted(r.NETWORK_REQUESTS.UPDATE_CONVERSATION_LINKS, !1, e.duration());
          });
        }
      }
      function rt(e) {
        X.log("awaitCall called"), P.telemetryHelper.setCalleeType(P.participantManager.localParticipant.id);
        var t = atob(e.body.gp), i = JSON.parse(t);
        i.callNotification ? it(i) : (X.error("incomingCallData body does not have a callNotification section"), j = n.SIGNALING_FSM_STATE.IDLE, P.telemetryHelper.setTerminatingData({
          terminatingEnd: r.CALL_TERMINATING_END.LOCAL,
          resultValue: r.RESULT_VALUE.FAILURE,
          endCode: n.CALL_END_CODE.BAD_REQUEST,
          endSubCode: n.CALL_END_SUB_CODE.BAD_NOTIFICATION_PAYLOAD,
          resultDetail: "Invalid callNotification request"
        }), bt(), Y(n.CALL_STATUS.LOCAL_TERMINATED, {
          code: n.CALL_END_CODE.BAD_REQUEST,
          subCode: n.CALL_END_SUB_CODE.BAD_NOTIFICATION_PAYLOAD,
          phrase: n.CALL_END_PHRASE.BAD_NOTIFICATION_PAYLOAD
        }));
      }
      function it(e) {
        U = i.fromWireParticipant(e.callNotification.from), H[n.LINKS.CONVERSATION_CONTROLLER] = e.conversationInvitation.conversationController, H[n.LINKS.ATTACH] = e.callNotification.links.attach, P.correlationId = e.debugContent.callId, P.participantManager.setParticipantId(e.debugContent.participantId), P.multiParty = !!e.conversationInvitation.isMultiParty, e.groupChat && e.groupChat.threadId && (P.threadId = e.groupChat.threadId, e.groupChat.messageId && (P.spacesMessageId = e.groupChat.messageId)), Y(n.CALL_STATUS.IDLE), st(e);
      }
      function st(e) {
        X.log("sendAttachToCall called");
        var t = e.callNotification.links.attach;
        P.timeoutManager.startTimer(n.TIMEOUT_OPERATIONS.INCOMING_CALL_ESTABLISHMENT, yt);
        var i = C.build(), a = y.getPayload(P);
        u.get(P, r.NETWORK_REQUESTS.SEND_CALL_ATTACH, a).then(function (e) {
          return o.post(t, e);
        }).then(function (t) {
          I || (P.telemetryHelper.addNetworkOperationCompleted(r.NETWORK_REQUESTS.SEND_CALL_ATTACH, !0, i.duration()), ot(e, t));
        }).catch(function (e) {
          var t = s.getPrintableObject(e);
          X.error("sendAttachToCall failed because : " + t), I || (j = n.SIGNALING_FSM_STATE.IDLE, P.telemetryHelper.setTerminatingData({
            terminatingEnd: r.CALL_TERMINATING_END.LOCAL,
            resultValue: r.RESULT_VALUE.FAILURE,
            endCode: n.CALL_END_CODE.SERVICE_UNAVAILABLE,
            endSubCode: n.CALL_END_SUB_CODE.ATTACH_CALL_FAILED,
            resultDetail: "Failed to attach to call. Error = " + t
          }), P.telemetryHelper.addNetworkOperationCompleted(r.NETWORK_REQUESTS.SEND_CALL_ATTACH, !1, i.duration()), bt(), Y(n.CALL_STATUS.LOCAL_TERMINATED, {
            code: n.CALL_END_CODE.NETWORK_ERROR,
            subCode: n.CALL_END_SUB_CODE.ATTACH_FAILED,
            phrase: n.CALL_END_PHRASE.ATTACH_FAILED
          }));
        });
      }
      function ot(e, r) {
        H[n.LINKS.MEDIA_ANSWER] = r.response.callInvitation.links.mediaAnswer, H[n.LINKS.ACCEPT] = r.response.callInvitation.links.acceptance, H[n.LINKS.REJECT] = r.response.callInvitation.links.callLeg, H[n.LINKS.REDIRECT] = r.response.callInvitation.links.redirection, ut(r), P.telemetryHelper.setCallerType(P.getParticipantIdForOfferAnswer(r.response.callInvitation.mediaContent));
        var i = s.getMediaTypes(r.response.callInvitation.callModalities);
        P.telemetryHelper.addIncomingModalities(i), t.onOffer({
          subject: e.conversationInvitation.subject,
          remoteParticipantId: P.getParticipantIdForOfferAnswer(r.response.callInvitation.mediaContent),
          mediaContent: r.response.callInvitation.mediaContent,
          remoteEndpointId: U.endpointId,
          mediaTypes: i,
          renegotiation: !1
        }), P.telemetryHelper.setTimeToRingDuration();
      }
      function ut(e) {
        X.log("sendProgress called");
        var t = C.build(), n = b.getPayload(P);
        u.get(P, r.NETWORK_REQUESTS.SEND_CALL_PROGRESS, n).then(function (t) {
          return o.post(e.response.callInvitation.links.progress, t);
        }).then(function () {
          I || P.telemetryHelper.addNetworkOperationCompleted(r.NETWORK_REQUESTS.SEND_CALL_PROGRESS, !0, t.duration());
        }).catch(function (e) {
          var n = s.getPrintableObject(e);
          X.error("sendProgress failed because : " + n), I || P.telemetryHelper.addNetworkOperationCompleted(r.NETWORK_REQUESTS.SEND_CALL_PROGRESS, !1, t.duration());
        });
      }
      function at(e) {
        X.log("handleMediaAnswer called"), H[n.LINKS.MEDIA_ACKNOWLEDGEMENT] = e.mediaAnswer.links.mediaAcknowledgement;
        if (P.mediaRenegotiationManager.isOutgoingRenegotiationInProgress()) {
          P.mediaRenegotiationManager.handleMediaAnswer(e);
          return;
        }
        P.telemetryHelper.addLocalOperation(r.LOCAL_OPERATIONS.HANDLE_MEDIA_ANSWER), j !== n.SIGNALING_FSM_STATE.CONNECTED && j === n.SIGNALING_FSM_STATE.OUTGOING && (P.telemetryHelper.setTimeToRingDuration(), U = e.mediaAnswer.sender, Y(n.CALL_STATUS.RINGING), t.onAnswer({
          provisional: !0,
          renegotiation: !1,
          remoteEndpointId: e.mediaAnswer.sender ? e.mediaAnswer.sender.endpointId : s.newGuid(),
          remoteParticipantId: P.getParticipantIdForOfferAnswer(e.mediaAnswer.mediaContent),
          mediaContent: e.mediaAnswer.mediaContent
        }));
      }
      function ft(e) {
        X.log("handleCallAcceptance called"), P.telemetryHelper.addLocalOperation(r.LOCAL_OPERATIONS.HANDLE_CALL_ACCEPTANCE), j === n.SIGNALING_FSM_STATE.OUTGOING && (P.telemetryHelper.setTimeToRingDuration(), lt(e));
        var t = C.build(), i = w.getPayload(P);
        u.get(P, r.NETWORK_REQUESTS.SEND_ACCEPTANCE_ACKNOWLEDGEMENT, i).then(function (t) {
          return o.post(e.callAcceptance.links.acknowledgement, t);
        }).then(function () {
          I || P.telemetryHelper.addNetworkOperationCompleted(r.NETWORK_REQUESTS.SEND_ACCEPTANCE_ACKNOWLEDGEMENT, !0, t.duration());
        }).catch(function (e) {
          var n = s.getPrintableObject(e);
          X.error("handleCallAcceptance failed because : " + n), I || P.telemetryHelper.addNetworkOperationCompleted(r.NETWORK_REQUESTS.SEND_ACCEPTANCE_ACKNOWLEDGEMENT, !1, t.duration());
        });
      }
      function lt(e) {
        j = n.SIGNALING_FSM_STATE.CONNECTED, P.timeoutManager.stopTimer(n.TIMEOUT_OPERATIONS.OUTGOING_CALL_ESTABLISHMENT), P.telemetryHelper.startCallConnectedWatch(), P.mediaRenegotiationManager.onCallConnected();
        var r = z, o = s.newGuid();
        e.callAcceptance.acceptedBy && (U = i.fromWireParticipant(e.callAcceptance.acceptedBy), o = e.callAcceptance.acceptedBy.endpointId), e.callAcceptance.acceptedCallModalities && e.callAcceptance.acceptedCallModalities.length > 0 && (r = e.callAcceptance.acceptedCallModalities);
        var u = s.getMediaTypes(r);
        P.telemetryHelper.addIncomingModalities(u), H[n.LINKS.MEDIA_RENEGOTIATION] = e.callAcceptance.links.mediaRenegotiation, H[n.LINKS.TRANSFER] = e.callAcceptance.links.transfer, H[n.LINKS.REPLACE] = e.callAcceptance.links.replacement, H[n.LINKS.HANGUP] = e.callAcceptance.links.callLeg, H[n.LINKS.KEEPALIVE] = e.callAcceptance.links.callLeg, vt(e.callAcceptance.callKeepAliveInterval), t.onAnswer({
          provisional: !1,
          renegotiation: !1,
          remoteEndpointId: o,
          remoteParticipantId: P.getParticipantIdForOfferAnswer(e.callAcceptance.mediaContent),
          mediaTypes: u,
          mediaContent: e.callAcceptance.mediaContent
        }), Y(n.CALL_STATUS.CONNECTED);
      }
      function ct(e) {
        X.log("Call End received . Details : " + s.getPrintableObject(e)), P.telemetryHelper.addLocalOperation(r.LOCAL_OPERATIONS.HANDLE_CALL_END);
        if (j === n.SIGNALING_FSM_STATE.IDLE) {
          X.log("Not handling incoming callEnd since fsmstate = SIGNALING_FSM_STATE.IDLE");
          return;
        }
        if (e.code === n.CALL_END_CODE.SUCCESS && e.subCode === n.CALL_END_SUB_CODE.CONVERSATION_RESOLUTION_CONFLICT)
          ht(e);
        else {
          var t = e.code === n.CALL_END_CODE.SUCCESS || e.code === n.CALL_END_CODE.CANCEL || e.code === n.CALL_END_CODE.REJECT;
          P.telemetryHelper.setTerminatingData({
            terminatingEnd: r.CALL_TERMINATING_END.REMOTE,
            resultDetail: e.phrase,
            resultValue: t ? r.RESULT_VALUE.SUCCESS : r.RESULT_VALUE.FAILURE,
            endCode: e.code,
            endSubCode: e.subCode
          }), bt(), j = n.SIGNALING_FSM_STATE.IDLE, Y(n.CALL_STATUS.REMOTE_TERMINATED, {
            code: e.code,
            subCode: e.subCode,
            phrase: e.phrase
          });
        }
      }
      function ht(e) {
        X.log("handleConversationResolutionConflict"), j = n.SIGNALING_FSM_STATE.IDLE, P.timeoutManager.stopTimer(n.TIMEOUT_OPERATIONS.OUTGOING_CALL_ESTABLISHMENT), P.joinGivenConversation(e.conversationUrl.location, e.correlationId, W, z);
      }
      function pt() {
        P.telemetryHelper.addLocalOperation(r.LOCAL_OPERATIONS.HANDLE_CALL_PROGRESS), j === n.SIGNALING_FSM_STATE.OUTGOING && (P.telemetryHelper.setTimeToRingDuration(), Y(n.CALL_STATUS.RINGING));
      }
      function dt() {
        B !== n.CALL_STATUS.CONNECTED ? P.telemetryHelper.addLocalOperation(r.LOCAL_OPERATIONS.HANDLE_MEDIA_ACKNOWLEDGEMENT) : P.mediaRenegotiationManager.handleMediaAcknowledgment();
      }
      function vt(e) {
        var t = 0.9 * e * 1000;
        X.log("sending KeepAlives every " + t + " milliseconds"), q = window.setInterval(mt, t);
      }
      function mt() {
        X.log("sendKeepAlive called. Call disposed : " + I);
        if (I)
          return;
        X.log("sending keepAlive count = " + R++), gt(u.get(P, r.NETWORK_REQUESTS.SEND_KEEP_ALIVE, null));
      }
      function gt(e) {
        var t = C.build();
        e.then(function (e) {
          return o.post(H[n.LINKS.KEEPALIVE], e);
        }).then(function () {
          I || P.telemetryHelper.addNetworkOperationCompleted(r.NETWORK_REQUESTS.SEND_KEEP_ALIVE, !0, t.duration());
        }).catch(function (e) {
          var n = s.getPrintableObject(e);
          X.error("sendToKeepAliveUrl failed because : " + n), I || P.telemetryHelper.addNetworkOperationCompleted(r.NETWORK_REQUESTS.SEND_KEEP_ALIVE, !1, t.duration());
        });
      }
      function yt() {
        X.log("handleCallEstablishmentTimeout"), P.telemetryHelper.addLocalOperation(r.LOCAL_OPERATIONS.HANDLE_CALL_ESTABLISHMENT_TIMEOUT), P.telemetryHelper.setTerminatingData({
          terminatingEnd: r.CALL_TERMINATING_END.LOCAL,
          resultValue: r.RESULT_VALUE.FAILURE,
          resultDetail: n.CALL_END_SUB_CODE.CALL_ESTABLISHMENT_TIMEOUT,
          endCode: n.CALL_END_CODE.TIMEOUT,
          endSubCode: n.CALL_END_SUB_CODE.CALL_ESTABLISHMENT_TIMEOUT
        }), bt(), j = n.SIGNALING_FSM_STATE.IDLE, Y(n.CALL_STATUS.LOCAL_TERMINATED, {
          code: n.CALL_END_CODE.TIMEOUT,
          subCode: n.CALL_END_SUB_CODE.CALL_ESTABLISHMENT_TIMEOUT,
          phrase: n.CALL_END_PHRASE.ESTABLISHMENT_TIMEOUT
        });
      }
      function bt() {
        I || (X.log("dispose"), I = !0, q && window.clearInterval(q), D.onCallCompleted(_), M.trouterUrl.changed.off(V), P.timeoutManager.dispose(), P.timeoutManager = null, P.participantManager.dispose(), P.participantManager = null, P.mediaRenegotiationManager.dispose(), P.mediaRenegotiationManager = null, P.telemetryHelper.dispose(), P.telemetryHelper = null);
      }
      var P = this, H = {}, B = null, j = n.SIGNALING_FSM_STATE.IDLE, F = !1, I = !1, q = null, R = 1, U = null, z = null, W = null, X = M.logger.createChild(function () {
          return "SignalingAgent::[" + P.correlationId + "][" + j + "]";
        }, !0);
      P.convSubject = null, P.threadId = null, P.multiParty = !1, P.spacesMessageId = null, P.signalingAgentConfig = M, P.urlIdentifier = _, P.correlationId = _, P.logger = X, P.telemetryHelper = new k(P), P.mediaRenegotiationManager = new A(P, t), P.participantManager = new L(P, t, e), P.timeoutManager = new O(P), P.isGVCOutgoingEnabled = T.isFeatureOn(N.featureFlags.GVC_OUTGOING), P.isGVCJoiningEnabled = T.isFeatureOn(N.featureFlags.GVC_JOINING);
      var V = function () {
        X.log("onTrouterUrlChanged: disposed = " + I);
        if (I)
          return;
        P.telemetryHelper.addLocalOperation(r.LOCAL_OPERATIONS.TROUTER_URL_CHANGED + ":" + M.trouterUrl()), H.hasOwnProperty(n.LINKS.KEEPALIVE) && (X.log("sending participantUpdateRequest"), gt(u.get(P, "participantUpdateRequest", E.getPayload(P)))), nt();
      };
      M.trouterUrl.changed(V), P.getParticipantIdForOfferAnswer = function (e) {
        s.assertNotNull(e, "mediaContent should be a non null value");
        var t = null;
        return U && !P.threadId && !e.newOffer && !e.escalationOccurring && (t = U.id), t;
      }, P.setSubject = function (e) {
        P.telemetryHelper.addLocalOperation(r.LOCAL_OPERATIONS.SET_SUBJECT), s.assertNotNull(e, "subject should be a non null value"), P.convSubject = e;
      }, P.setMultiParty = function () {
        P.multiParty = !0;
      }, P.setThreadId = function (e, t) {
        P.telemetryHelper.addLocalOperation(r.LOCAL_OPERATIONS.SET_THREADID), s.assertNotNull(e, "threadId should be a non null value"), s.assert(!P.threadId, "conversation threadId has already been set. It cannot be overwritten"), P.threadId = e, t && (P.spacesMessageId = t);
      }, P.addParticipantAsync = function (e) {
        return P.telemetryHelper.addLocalOperation(r.LOCAL_OPERATIONS.ADD_PARTICIPANT), s.assertNotNull(e, "remoteParticipant should be a non null value"), s.assert(j === n.SIGNALING_FSM_STATE.CONNECTED || j === n.SIGNALING_FSM_STATE.IDLE, "remoteParticipants can only be added before starting an outgoing call or to an ongoing call"), j === n.SIGNALING_FSM_STATE.CONNECTED && s.assertNotNullOrEmpty(P.threadId, "threadId must be set before adding more participants to connected call"), P.participantManager.addParticipantAsync(e, H[n.LINKS.ADD_PARTICIPANT_AND_MODALITY], j === n.SIGNALING_FSM_STATE.CONNECTED);
      }, P.removeParticipantAsync = function (e) {
        return P.telemetryHelper.addLocalOperation(r.LOCAL_OPERATIONS.REMOVE_PARTICIPANT), s.assertNotNull(e, "remoteParticipant should be a non null value"), s.assert(j === n.SIGNALING_FSM_STATE.CONNECTED, "participants can only be removed from an ongoing call"), P.participantManager.removeParticipantAsync(e, H[n.LINKS.REMOVE_PARTICIPANT]);
      }, P.startOutgoingCall = function (e, t, i, o) {
        P.telemetryHelper.addLocalOperation(r.LOCAL_OPERATIONS.START_CALL), P.telemetryHelper.setDirection(r.DIRECTION.OUTGOING), P.telemetryHelper.setRole(r.ROLE.CALLER), P.telemetryHelper.startCallInitializationWatch(o), s.assertNotNull(e, "mediaContent should be a non null value"), s.assertNotNull(e.blob, "outgoingSdp should be a non null value"), s.assert(j === n.SIGNALING_FSM_STATE.IDLE, "a call is already in progress"), X.log("startOutgoingCall called"), j = n.SIGNALING_FSM_STATE.OUTGOING;
        var u = {
          newCall: !0,
          requestUrl: M.conversationServiceUrl
        };
        tt(u, e, t, i, o);
      }, P.joinGivenConversation = function (e, t, i, o, u) {
        P.telemetryHelper.addLocalOperation(r.LOCAL_OPERATIONS.JOIN_CALL), P.telemetryHelper.setDirection(r.DIRECTION.INCOMING), P.telemetryHelper.setRole(r.ROLE.JOIN), P.telemetryHelper.startCallInitializationWatch(u), s.assertNotNull(i, "mediaContent should be a non null value"), s.assertNotNull(i.blob, "outgoingSdp should be a non null value"), s.assertNotNull(t, "correlationId should be a non null value"), s.assertNotNullOrEmpty(e, "conversationUrl should be a non null value"), s.assert(j === n.SIGNALING_FSM_STATE.IDLE || j === n.SIGNALING_FSM_STATE.CONNECTED_FOR_ROSTER_ONLY, "a call is already in progress"), X.log("joinGivenConversation called with url = " + e + " , correlationId = " + t), j = n.SIGNALING_FSM_STATE.OUTGOING, P.correlationId = t, tt({
          newCall: !1,
          requestUrl: e
        }, i, o, !1, u);
      }, P.joinGivenConversationWithoutCallModality = function (e, t) {
        P.telemetryHelper.addLocalOperation(r.LOCAL_OPERATIONS.JOIN_CONVERSATION_WITHOUT_CALL_MODALITY), P.telemetryHelper.setDirection(r.DIRECTION.INCOMING), P.telemetryHelper.setRole(r.ROLE.JOIN_FOR_ROSTER_ONLY), s.assertNotNull(t, "correlationId should be a non null value"), s.assertNotNullOrEmpty(e, "conversationUrl should be a non null value"), s.assert(j === n.SIGNALING_FSM_STATE.IDLE, "a call is already in progress"), X.log("joinGivenConversationWithoutCallModality called with url = " + e + " , correlationId = " + t), j = n.SIGNALING_FSM_STATE.OUTGOING_FOR_ROSTER_ONLY, P.correlationId = t, P.telemetryHelper.setConversationServiceUrl(e), P.telemetryHelper.setCallerType(P.participantManager.localParticipant.id);
        var i = C.build(), a = l.getPayload(P);
        u.get(P, r.NETWORK_REQUESTS.JOIN_CONVERSATION_WITHOUT_CALL_MODALITY, a).then(function (t) {
          return o.post(e, t);
        }).then(function (e) {
          if (!I) {
            if (!e.response.roster)
              throw new Error("response does not contain a roster");
            P.telemetryHelper.addNetworkOperationCompleted(r.NETWORK_REQUESTS.JOIN_CONVERSATION_WITHOUT_CALL_MODALITY, !0, i.duration()), j = n.SIGNALING_FSM_STATE.CONNECTED_FOR_ROSTER_ONLY, $(e.response), Y(n.CALL_STATUS.CONNECTED_FOR_ROSTER_ONLY), P.participantManager.handleRosterUpdate(e.response.roster);
          }
        }).catch(function (e) {
          var t = s.getPrintableObject(e);
          X.error("joinGivenConversationWithoutCallModality failed because : " + t), I || (j = n.SIGNALING_FSM_STATE.IDLE, P.telemetryHelper.setTerminatingData({
            terminatingEnd: r.CALL_TERMINATING_END.LOCAL,
            resultValue: r.RESULT_VALUE.FAILURE,
            endCode: n.CALL_END_CODE.SERVICE_UNAVAILABLE,
            endSubCode: n.CALL_END_SUB_CODE.PLACE_CALL_FAILED,
            resultDetail: "Failed to join conversation without call modality. Error = " + t
          }), P.telemetryHelper.addNetworkOperationCompleted(r.NETWORK_REQUESTS.JOIN_CONVERSATION_WITHOUT_CALL_MODALITY, !1, i.duration()), bt(), Y(n.CALL_STATUS.LOCAL_TERMINATED, {
            code: n.CALL_END_CODE.NETWORK_ERROR,
            subCode: n.CALL_END_SUB_CODE.FAILED_TO_REACH_SERVICE,
            phrase: n.CALL_END_PHRASE.NETWORK_ERROR
          }));
        });
      }, P.handleIncomingCall = function (e) {
        P.telemetryHelper.addLocalOperation(r.LOCAL_OPERATIONS.HANDLE_INCOMING_CALL), P.telemetryHelper.setDirection(r.DIRECTION.INCOMING), P.telemetryHelper.setRole(r.ROLE.CALLEE), P.telemetryHelper.startCallInitializationWatch(), s.assertNotNull(e, "request should be a non null value"), s.assertNotNullOrEmpty(e.body, "request should have a valid body"), s.assertNotNullOrEmpty(e.body.gp, "request does not look valid"), s.assert(j === n.SIGNALING_FSM_STATE.IDLE, "a call is already in progress"), X.log("handleIncomingCall called"), j = n.SIGNALING_FSM_STATE.INCOMING, P.participantManager.initializeForIncomingCall(), rt(e);
      }, P.endAsync = function (e) {
        return X.log("endAsync called"), I ? x.task().resolve(null).promise : (P.telemetryHelper.addLocalOperation(r.LOCAL_OPERATIONS.END_CALL), j === n.SIGNALING_FSM_STATE.INCOMING ? G(e) : j === n.SIGNALING_FSM_STATE.OUTGOING || j === n.SIGNALING_FSM_STATE.OUTGOING_FOR_ROSTER_ONLY ? J(e) : j === n.SIGNALING_FSM_STATE.WAITING_CALL_ACCEPTANCE_ACK ? G(e) : j === n.SIGNALING_FSM_STATE.CONNECTED || j === n.SIGNALING_FSM_STATE.CONNECTED_FOR_ROSTER_ONLY || P.mediaRenegotiationManager.isIncomingRenegotiationInProgress() || P.mediaRenegotiationManager.isOutgoingRenegotiationInProgress() ? K(e) : (X.log("There is no call to cancel or end or reject in current state"), P.telemetryHelper.setTerminatingData({
          terminatingEnd: r.CALL_TERMINATING_END.LOCAL,
          resultDetail: "There is no call to cancel or end or reject",
          endSubCode: n.CALL_END_SUB_CODE.CALL_NOT_ATTEMPTED
        }), bt(), Y(n.CALL_STATUS.LOCAL_TERMINATED, {
          code: n.CALL_END_CODE.SUCCESS,
          subCode: n.CALL_END_SUB_CODE.CALL_NOT_ATTEMPTED,
          phrase: n.CALL_END_PHRASE.CALL_DOES_NOT_EXIST
        }), x.task().resolve(null).promise));
      }, P.handleIncomingMsgAsync = function (e) {
        s.assertNotNull(e, "request should be a non null value"), X.log("handleIncomingMsg called for url = " + e.url);
        var t = x.task(), r = e.body;
        if (!r)
          return X.error("handleIncomingMsg : received message with no body to : " + e.url), t.reject(new Error("received message with no body")), t.promise;
        if (I)
          return X.log("handleIncomingMsg : received message after call is disposed"), t.reject(new Error("received message after call is disposed")), t.promise;
        try {
          var i = r;
          if (i.callNotification)
            return t.reject(new Error("IncomingCallNotification should not be received in handleIncomingMsg")), t.promise;
          i.mediaAnswer ? at(i) : i.mediaAcknowledgement ? dt() : i.callAcceptance ? ft(i) : i.callEnd ? ct(i.callEnd) : i.callProgress ? pt() : i.callAcceptanceAcknowledgement ? et(i) : i.mediaNegotiation ? P.mediaRenegotiationManager.handleMediaNegotiationOffer(i) : i.mediaNegotiationFailure ? P.mediaRenegotiationManager.handleMediaNegotiationFailure(i.mediaNegotiationFailure) : i.retargetCompleted ? P.mediaRenegotiationManager.handleRetargetCompleted(i.retargetCompleted) : i.p2pForkNotification || (s.stringEndsWith(e.url, n.URL_PATH.CONV_ROSTER_UPDATE) ? (X.debug("handleIncomingMsg : received rosterUpdate : " + s.getPrintableObject(i)), P.participantManager.handleRosterUpdate(i)) : s.stringEndsWith(e.url, n.URL_PATH.CONV_ADD_PARTICIPANT_SUCCESS) ? (X.log("handleIncomingMsg : received addParticipantSuccess : " + s.getPrintableObject(i)), P.participantManager.handleAddParticipantSuccess(i)) : s.stringEndsWith(e.url, n.URL_PATH.CONV_ADD_PARTICIPANT_FAILURE) ? (X.log("handleIncomingMsg : received addParticipantFailure : " + s.getPrintableObject(i)), P.participantManager.handleAddParticipantFailure(i)) : s.stringEndsWith(e.url, n.URL_PATH.CONV_REMOVE_PARTICIPANT_SUCCESS) ? (X.log("handleIncomingMsg : received removeParticipantSuccess : " + s.getPrintableObject(i)), P.participantManager.handleRemoveParticipantSuccess(i)) : s.stringEndsWith(e.url, n.URL_PATH.CONV_REMOVE_PARTICIPANT_FAILURE) ? (X.log("handleIncomingMsg : received removeParticipantFailure : " + s.getPrintableObject(i)), P.participantManager.handleRemoveParticipantFailure(i)) : s.stringEndsWith(e.url, n.URL_PATH.CONV_UPDATE) ? (X.log("handleIncomingMsg : received conversationUpdate : " + s.getPrintableObject(i)), $(i), P.participantManager.handleConversationUpdate(i)) : s.stringEndsWith(e.url, n.URL_PATH.CONV_END) ? (X.log("handleIncomingMsg : received conversationEnd : " + s.getPrintableObject(i)), ct(i)) : X.error("handleIncomingMsg : received unknown message to : " + e.url + "  with body : " + s.getPrintableObject(i))), t.resolve(!0);
        } catch (o) {
          X.error("handleIncomingMsg failed with error : " + o.message + "stack trace : " + o.stack), t.reject(new Error(o.message));
        }
        return t.promise;
      }, P.acceptRenegotiationAsync = function (e, t, r) {
        return s.assertNotNull(e.blob, "finalSdp should be a non null value"), s.assert(j === n.SIGNALING_FSM_STATE.CONNECTED, "Renegotation operations are only allowed when the call is connected and no disconnect operation is in flight"), P.mediaRenegotiationManager.acceptRenegotiationAsync(e, t, r);
      }, P.setProvisionalAnswerAsync = function (e, i) {
        P.telemetryHelper.addLocalOperation(r.LOCAL_OPERATIONS.SET_PROVISIONAL_ANSWER), s.assertNotNull(e.blob, "sdp should be a non null value"), X.log("setProvisionalAnswer called ");
        var a = x.task();
        if (j !== n.SIGNALING_FSM_STATE.INCOMING)
          return X.log("there is no incoming call to set provisional answer on."), a.reject(new Error("there is no incoming call to set provisional answer on.")), a.promise;
        P.telemetryHelper.setLocalOfferAnswerDuration(r.LOCAL_OFFER_ANSWER_TIMES.PROVISIONAL_ANSWER_TIME + ":" + i);
        var f = C.build(), l = d.getPayload(P, e);
        return u.get(P, r.NETWORK_REQUESTS.SEND_MEDIA_ANSWER, l).then(function (e) {
          return o.post(H[n.LINKS.MEDIA_ANSWER], e);
        }).then(function (e) {
          I || (P.telemetryHelper.addNetworkOperationCompleted(r.NETWORK_REQUESTS.SEND_MEDIA_ANSWER, !0, f.duration()), Y(n.CALL_STATUS.CONNECTING)), s.safelyResolvePromise(a, e.response), I || (X.log("handling inlined mediaAnswerAcknowledgement"), P.telemetryHelper.addLocalOperation(r.LOCAL_OPERATIONS.HANDLE_MEDIA_ACKNOWLEDGEMENT), P.telemetryHelper.setTimeToRingDuration(), Y(n.CALL_STATUS.RINGING), t.onMediaAcknowledgementSuccess(!1));
        }).catch(function (e) {
          I || P.telemetryHelper.addNetworkOperationCompleted(r.NETWORK_REQUESTS.SEND_MEDIA_ANSWER, !1, f.duration());
          var t = s.getPrintableObject(e);
          X.error("setProvisionalAnswer failed because : " + t), s.safelyRejectPromise(a, new Error("setProvisionalAnswer failed because : " + t));
        }), a.promise;
      }, P.startRenegotiationAsync = function (e, t, r) {
        return s.assertNotNull(e, "mediaContent should be a non null value"), s.assert(j === n.SIGNALING_FSM_STATE.CONNECTED, "Renegotation operations are only allowed when the call is connected and no disconnect operation is in flight"), P.mediaRenegotiationManager.startRenegotiationAsync(e, H[n.LINKS.MEDIA_RENEGOTIATION], t, r);
      }, P.acceptAsync = function (e, t, i) {
        P.telemetryHelper.addLocalOperation(r.LOCAL_OPERATIONS.ACCEPT_CALL), s.assertNotNull(e, "mediaContent should be a non null value"), s.assertNotNull(e.blob, "outgoingSdp should be a non null value"), X.log("accept called");
        var a = x.task();
        if (j !== n.SIGNALING_FSM_STATE.INCOMING)
          return X.log("there is no incoming call to accept"), a.reject(new Error("there is no incoming call to accept")), a.promise;
        P.telemetryHelper.setLocalOfferAnswerDuration(r.LOCAL_OFFER_ANSWER_TIMES.INITIAL_ANSWER_TIME + ":" + i), j = n.SIGNALING_FSM_STATE.WAITING_CALL_ACCEPTANCE_ACK;
        var f = C.build(), l = v.getPayload(P, e, t);
        return u.get(P, r.NETWORK_REQUESTS.SEND_ACCEPTANCE, l).then(function (e) {
          return o.post(H[n.LINKS.ACCEPT], e);
        }).then(function (e) {
          I || (P.telemetryHelper.addNetworkOperationCompleted(r.NETWORK_REQUESTS.SEND_ACCEPTANCE, !0, f.duration()), B === n.CALL_STATUS.IDLE && (P.telemetryHelper.setTimeToRingDuration(), Y(n.CALL_STATUS.CONNECTING)), e.response.callAcceptanceAcknowledgement && (X.log("handling inlined callAcceptanceAcknowledgement"), et(e.response))), s.safelyResolvePromise(a, e.response);
        }).catch(function (e) {
          I || (P.telemetryHelper.addNetworkOperationCompleted(r.NETWORK_REQUESTS.SEND_ACCEPTANCE, !1, f.duration()), j = n.SIGNALING_FSM_STATE.INCOMING);
          var t = s.getPrintableObject(e);
          X.error("accept failed because : " + t), s.safelyRejectPromise(a, new Error("accept failed because : " + t));
        }), a.promise;
      }, P.rejectRenegotiationAsync = function (e) {
        return s.assert(j === n.SIGNALING_FSM_STATE.CONNECTED, "Renegotation operations are only allowed when the call is connected and no disconnect operation is in flight"), P.mediaRenegotiationManager.rejectRenegotiationAsync(e);
      };
    };
  t.build = function (e, t, n, r, i) {
    return new M(e, t, n, r, i);
  };
})

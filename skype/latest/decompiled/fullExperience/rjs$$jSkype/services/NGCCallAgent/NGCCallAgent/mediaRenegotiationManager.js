define("jSkype/services/NGCCallAgent/NGCCallAgent/mediaRenegotiationManager", [
  "require",
  "jSkype/services/NGCCallAgent/NGCCallAgent/constants",
  "jSkype/services/NGCCallAgent/NGCCallAgent/telemetryConstants",
  "jSkype/services/NGCCallAgent/NGCCallAgent/utils",
  "jSkype/services/NGCCallAgent/NGCCallAgent/mediaRenegotiationResponse",
  "jSkype/services/NGCCallAgent/NGCCallAgent/mediaRenegotiationRequest",
  "jSkype/services/NGCCallAgent/NGCCallAgent/mediaAcknowledgementRequest",
  "jSkype/services/NGCCallAgent/NGCCallAgent/mediaRenegotiationRejectionResponse",
  "jSkype/services/serviceAccessLayer/requestDispatcher",
  "jSkype/services/NGCCallAgent/NGCCallAgent/requestBuilder",
  "swx-utils-common",
  "jcafe-property-model"
], function (e) {
  var t = e("jSkype/services/NGCCallAgent/NGCCallAgent/constants"), n = e("jSkype/services/NGCCallAgent/NGCCallAgent/telemetryConstants"), r = e("jSkype/services/NGCCallAgent/NGCCallAgent/utils"), i = e("jSkype/services/NGCCallAgent/NGCCallAgent/mediaRenegotiationResponse"), s = e("jSkype/services/NGCCallAgent/NGCCallAgent/mediaRenegotiationRequest"), o = e("jSkype/services/NGCCallAgent/NGCCallAgent/mediaAcknowledgementRequest"), u = e("jSkype/services/NGCCallAgent/NGCCallAgent/mediaRenegotiationRejectionResponse"), a = e("jSkype/services/serviceAccessLayer/requestDispatcher"), f = e("jSkype/services/NGCCallAgent/NGCCallAgent/requestBuilder"), l = e("swx-utils-common").stopwatch, c = e("jcafe-property-model"), h = function (e, h) {
      function w(i) {
        b.log("raiseMediaRenegotiationOffer"), y[t.LINKS.MEDIA_ANSWER] = i.mediaNegotiation.links.mediaAnswer, y[t.LINKS.MEDIA_REJECTION] = i.mediaNegotiation.links.rejection;
        var s = [];
        i.mediaNegotiation.callModalities && i.mediaNegotiation.callModalities.length > 0 && (s = r.getMediaTypes(i.mediaNegotiation.callModalities), e.telemetryHelper.addIncomingModalities(s), r.arrayContains(s, t.MEDIA_TYPES.SCREEN_SHARER) && e.telemetryHelper.addVbssOperations(n.VBSS_OPERATION.REMOTE_START)), h.onOffer({
          mediaTypes: s,
          remoteParticipantId: e.getParticipantIdForOfferAnswer(i.mediaNegotiation.mediaContent),
          mediaContent: i.mediaNegotiation.mediaContent,
          renegotiation: !0
        });
      }
      function E(t, i) {
        b.log("rejectMediaRenegotiation");
        var s = c.task(), o = l.build(), h = u.getPayload(e, i);
        return f.get(e, n.NETWORK_REQUESTS.SEND_MEDIA_REJECTION, h).then(function (e) {
          return a.post(t, e);
        }).then(function (t) {
          v || e.telemetryHelper.addNetworkOperationCompleted(n.NETWORK_REQUESTS.SEND_MEDIA_REJECTION, !0, o.duration()), r.safelyResolvePromise(s, t.response);
        }).catch(function (t) {
          v || e.telemetryHelper.addNetworkOperationCompleted(n.NETWORK_REQUESTS.SEND_MEDIA_REJECTION, !1, o.duration());
          var i = r.getPrintableObject(t);
          b.error("rejectMediaRenegotiation failed because : " + i), r.safelyRejectPromise(s, new Error("rejectMediaRenegotiation failed because : " + i));
        }), s.promise;
      }
      function S() {
        b.log("handleMediaAnswerTimeout"), d && (d = !1, e.telemetryHelper.addVbssOperations(n.VBSS_OPERATION.TIMEOUT)), e.telemetryHelper.addIncomingModalities("Timeout"), e.telemetryHelper.addLocalOperation(n.LOCAL_OPERATIONS.HANDLE_MEDIA_ANSWER_TIMEOUT), e.timeoutManager.stopTimer(t.TIMEOUT_OPERATIONS.MEDIA_ANSWER), p.handleMediaNegotiationFailure({
          code: t.CALL_END_CODE.TIMEOUT,
          subCode: t.CALL_END_SUB_CODE.MEDIA_FINAL_ANSWER_TIMEOUT,
          phrase: t.CALL_END_PHRASE.MEDIA_FINAL_ANSWER_TIMEOUT
        });
      }
      function x() {
        b.log("handleMediaAnswerAcknowledgmentTimeout"), e.telemetryHelper.addLocalOperation(n.LOCAL_OPERATIONS.HANDLE_MEDIA_ACKNOWLEDGEMENT_TIMEOUT), e.timeoutManager.stopTimer(t.TIMEOUT_OPERATIONS.MEDIA_ANSWER_ACKNOWLEDGEMENT), h.onMediaAcknowledgementFailure(!0, new Error("timed out waiting for Media Answer Acknowledgement"));
      }
      var p = this, d = !1, v = !1, m = t.MEDIA_RENEGOTIATION_FSM_STATE.IDLE, g = {
          code: t.CALL_END_CODE.GLARE_ERROR,
          subCode: t.CALL_END_SUB_CODE.GLARE_ERROR,
          phrase: t.CALL_END_PHRASE.RENEGOTIATION_IN_PROGRESS
        }, y = {}, b = e.logger.createChild(function () {
          return "[" + m + "]";
        });
      p.isOutgoingRenegotiationInProgress = function () {
        return m === t.MEDIA_RENEGOTIATION_FSM_STATE.OUTGOING_RENEGOTIATION || m === t.MEDIA_RENEGOTIATION_FSM_STATE.RENEGOTIATION_GLARE;
      }, p.isIncomingRenegotiationInProgress = function () {
        return m === t.MEDIA_RENEGOTIATION_FSM_STATE.INCOMING_RENEGOTIATION || m === t.MEDIA_RENEGOTIATION_FSM_STATE.RENEGOTIATION_GLARE;
      }, p.acceptRenegotiationAsync = function (s, o, u) {
        b.log("acceptRenegotiationAsync called"), o && b.log("acceptRenegotiationAsync called with mediaTypes : " + r.getPrintableObject(o)), e.telemetryHelper.addLocalOperation(n.LOCAL_OPERATIONS.ACCEPT_RENEGOTIATION), r.assertNotNullOrEmpty(y[t.LINKS.MEDIA_ANSWER], "MediaAnswer link not set");
        var h = c.task();
        switch (m) {
        case t.MEDIA_RENEGOTIATION_FSM_STATE.INCOMING_RENEGOTIATION:
          m = t.MEDIA_RENEGOTIATION_FSM_STATE.CALL_CONNECTED;
          break;
        case t.MEDIA_RENEGOTIATION_FSM_STATE.RENEGOTIATION_GLARE:
          m = t.MEDIA_RENEGOTIATION_FSM_STATE.OUTGOING_RENEGOTIATION;
          break;
        default:
          return b.log("there is no incoming media renegotiation offer to accept "), h.reject(new Error("there is no incoming media renegotiation offer to accept")), h.promise;
        }
        e.telemetryHelper.setLocalOfferAnswerDuration(n.LOCAL_OFFER_ANSWER_TIMES.RENEGOTIATION_ANSWER_TIME + ":" + u), e.timeoutManager.startTimer(t.TIMEOUT_OPERATIONS.MEDIA_ANSWER_ACKNOWLEDGEMENT, x);
        var p = l.build(), d = i.getPayload(e, s, o);
        return f.get(e, n.NETWORK_REQUESTS.SEND_MEDIA_ANSWER, d).then(function (e) {
          return a.post(y[t.LINKS.MEDIA_ANSWER], e);
        }).then(function (t) {
          v || e.telemetryHelper.addNetworkOperationCompleted(n.NETWORK_REQUESTS.SEND_MEDIA_ANSWER, !0, p.duration()), r.safelyResolvePromise(h, t.response);
        }).catch(function (i) {
          var s = r.getPrintableObject(i);
          b.error("acceptRenegotiationAsync failed because : " + s), v || (e.telemetryHelper.addNetworkOperationCompleted(n.NETWORK_REQUESTS.SEND_MEDIA_ANSWER, !1, p.duration()), e.timeoutManager.stopTimer(t.TIMEOUT_OPERATIONS.MEDIA_ANSWER_ACKNOWLEDGEMENT)), r.safelyRejectPromise(h, new Error("acceptRenegotiationAsync failed because : " + s));
        }), h.promise;
      }, p.startRenegotiationAsync = function (i, o, u, p) {
        b.log("startRenegotiationAsync called "), e.telemetryHelper.addLocalOperation(n.LOCAL_OPERATIONS.START_RENEGOTIATION), r.assertNotNullOrEmpty(o, "MediaRenegotiation link not set");
        var y = c.task();
        switch (m) {
        case t.MEDIA_RENEGOTIATION_FSM_STATE.CALL_CONNECTED:
          m = t.MEDIA_RENEGOTIATION_FSM_STATE.OUTGOING_RENEGOTIATION;
          break;
        case t.MEDIA_RENEGOTIATION_FSM_STATE.OUTGOING_RENEGOTIATION:
        case t.MEDIA_RENEGOTIATION_FSM_STATE.INCOMING_RENEGOTIATION:
        case t.MEDIA_RENEGOTIATION_FSM_STATE.RENEGOTIATION_GLARE:
          return b.log("media renegotiation can only be performed with no current outstanding renegotiations."), h.onMediaRenegotiationRejection(g), y.resolve(null).promise;
        default:
          return b.log("media renegotiation can only be performed on an established call"), y.reject(new Error("media renegotiation can only be performed on an established call")), y.promise;
        }
        e.telemetryHelper.setLocalOfferAnswerDuration(n.LOCAL_OFFER_ANSWER_TIMES.RENEGOTIATION_OFFER_TIME + ":" + p), e.timeoutManager.startTimer(t.TIMEOUT_OPERATIONS.MEDIA_ANSWER, S);
        var w = l.build(), E = s.getPayload(e, i, u), x = u && r.arrayContains(u, t.MEDIA_TYPES.SCREEN_SHARER);
        return x ? (d = !0, e.telemetryHelper.addVbssOperations(n.VBSS_OPERATION.START)) : !x && d && (d = !1, e.telemetryHelper.addVbssOperations(n.VBSS_OPERATION.STOP)), f.get(e, n.NETWORK_REQUESTS.START_RENEGOTIATION, E).then(function (e) {
          return a.post(o, e);
        }).then(function (t) {
          v || e.telemetryHelper.addNetworkOperationCompleted(n.NETWORK_REQUESTS.START_RENEGOTIATION, !0, w.duration()), r.safelyResolvePromise(y, t.response);
        }).catch(function (i) {
          var s = r.getPrintableObject(i);
          b.error("startRenegotiationAsync failed because : " + s);
          if (!v) {
            switch (m) {
            case t.MEDIA_RENEGOTIATION_FSM_STATE.OUTGOING_RENEGOTIATION:
              m = t.MEDIA_RENEGOTIATION_FSM_STATE.CALL_CONNECTED;
              break;
            case t.MEDIA_RENEGOTIATION_FSM_STATE.RENEGOTIATION_GLARE:
              m = t.MEDIA_RENEGOTIATION_FSM_STATE.INCOMING_RENEGOTIATION;
              break;
            default:
            }
            e.telemetryHelper.addNetworkOperationCompleted(n.NETWORK_REQUESTS.START_RENEGOTIATION, !1, w.duration()), e.timeoutManager.stopTimer(t.TIMEOUT_OPERATIONS.MEDIA_ANSWER);
          }
          r.safelyRejectPromise(y, new Error("startRenegotiationAsync failed because : " + s));
        }), y.promise;
      }, p.handleMediaAcknowledgment = function () {
        b.log("handleMediaAcknowledgment"), e.telemetryHelper.addLocalOperation(n.LOCAL_OPERATIONS.HANDLE_MEDIA_ACKNOWLEDGEMENT), e.timeoutManager.stopTimer(t.TIMEOUT_OPERATIONS.MEDIA_ANSWER_ACKNOWLEDGEMENT), h.onMediaAcknowledgementSuccess(!0);
      }, p.onCallConnected = function () {
        b.log("onCallConnected"), m = t.MEDIA_RENEGOTIATION_FSM_STATE.CALL_CONNECTED;
      }, p.handleMediaNegotiationFailure = function (i) {
        b.log("handleMediaNegotiationFailure called . Details : " + r.getPrintableObject(i)), e.telemetryHelper.addLocalOperation(n.LOCAL_OPERATIONS.HANDLE_MEDIA_NEGOTIATION_FAILURE), e.timeoutManager.stopTimer(t.TIMEOUT_OPERATIONS.MEDIA_ANSWER);
        switch (m) {
        case t.MEDIA_RENEGOTIATION_FSM_STATE.OUTGOING_RENEGOTIATION:
          m = t.MEDIA_RENEGOTIATION_FSM_STATE.CALL_CONNECTED;
          break;
        case t.MEDIA_RENEGOTIATION_FSM_STATE.RENEGOTIATION_GLARE:
          m = t.MEDIA_RENEGOTIATION_FSM_STATE.INCOMING_RENEGOTIATION;
          break;
        default:
          return;
        }
        d && (d = !1, e.telemetryHelper.addVbssOperations(n.VBSS_OPERATION.REJECTED)), e.telemetryHelper.addIncomingModalities("Rejected"), h.onMediaRenegotiationRejection({
          code: i.code,
          subCode: i.subCode,
          phrase: i.phrase
        });
      }, p.handleMediaAnswer = function (i) {
        b.log("handleMediaAnswer called"), e.telemetryHelper.addLocalOperation(n.LOCAL_OPERATIONS.HANDLE_MEDIA_ANSWER);
        switch (m) {
        case t.MEDIA_RENEGOTIATION_FSM_STATE.OUTGOING_RENEGOTIATION:
          m = t.MEDIA_RENEGOTIATION_FSM_STATE.CALL_CONNECTED;
          break;
        case t.MEDIA_RENEGOTIATION_FSM_STATE.RENEGOTIATION_GLARE:
          m = t.MEDIA_RENEGOTIATION_FSM_STATE.INCOMING_RENEGOTIATION;
          break;
        default:
          return;
        }
        e.timeoutManager.stopTimer(t.TIMEOUT_OPERATIONS.MEDIA_ANSWER);
        var s = [];
        i.mediaAnswer.callModalities && i.mediaAnswer.callModalities.length > 0 && (s = r.getMediaTypes(i.mediaAnswer.callModalities), e.telemetryHelper.addIncomingModalities(s)), h.onAnswer({
          provisional: !1,
          renegotiation: !0,
          mediaTypes: s,
          remoteParticipantId: e.getParticipantIdForOfferAnswer(i.mediaAnswer.mediaContent),
          mediaContent: i.mediaAnswer.mediaContent
        });
        var u = l.build(), c = o.getPayload(e);
        f.get(e, n.NETWORK_REQUESTS.SEND_MEDIA_ACKNOWLEDGEMENT, c).then(function (e) {
          return a.post(i.mediaAnswer.links.mediaAcknowledgement, e);
        }).then(function () {
          v || e.telemetryHelper.addNetworkOperationCompleted(n.NETWORK_REQUESTS.SEND_MEDIA_ACKNOWLEDGEMENT, !0, u.duration());
        }).catch(function (t) {
          var i = r.getPrintableObject(t);
          b.error("sending mediaAcknowledgement failed because : " + i), v || e.telemetryHelper.addNetworkOperationCompleted(n.NETWORK_REQUESTS.SEND_MEDIA_ACKNOWLEDGEMENT, !1, u.duration());
        });
      }, p.handleMediaNegotiationOffer = function (r) {
        b.log("handleMediaNegotiationOffer called"), e.telemetryHelper.addLocalOperation(n.LOCAL_OPERATIONS.HANDLE_MEDIA_OFFER);
        switch (m) {
        case t.MEDIA_RENEGOTIATION_FSM_STATE.OUTGOING_RENEGOTIATION:
          m = t.MEDIA_RENEGOTIATION_FSM_STATE.RENEGOTIATION_GLARE, w(r);
          break;
        case t.MEDIA_RENEGOTIATION_FSM_STATE.CALL_CONNECTED:
          m = t.MEDIA_RENEGOTIATION_FSM_STATE.INCOMING_RENEGOTIATION, w(r);
          break;
        default:
          b.error("Cannot handle the incoming mediaRenegotiation offer in present callstate. Either call not connected or renegotiation in progress"), E(r.mediaNegotiation.links.rejection, g);
        }
      }, p.rejectRenegotiationAsync = function (i) {
        b.log("rejectRenegotiationAsync called"), e.telemetryHelper.addLocalOperation(n.LOCAL_OPERATIONS.REJECT_RENEGOTIATION), r.assertNotNullOrEmpty(y[t.LINKS.MEDIA_REJECTION], "MediaRejection link not set");
        var s = i || {
          code: t.CALL_END_CODE.NOT_ACCEPTABLE_HERE,
          subCode: t.CALL_END_SUB_CODE.MEDIA_ANSWER_PROCESSING_ERROR,
          phrase: t.CALL_END_PHRASE.MEDIA_ANSWER_ERROR
        };
        switch (m) {
        case t.MEDIA_RENEGOTIATION_FSM_STATE.INCOMING_RENEGOTIATION:
          return m = t.MEDIA_RENEGOTIATION_FSM_STATE.CALL_CONNECTED, E(y[t.LINKS.MEDIA_REJECTION], s);
        case t.MEDIA_RENEGOTIATION_FSM_STATE.RENEGOTIATION_GLARE:
          return m = t.MEDIA_RENEGOTIATION_FSM_STATE.OUTGOING_RENEGOTIATION, E(y[t.LINKS.MEDIA_REJECTION], s);
        default:
          return b.error("There is no incoming media renegotiation offer to reject"), c.task().resolve(null).promise;
        }
      }, p.handleRetargetCompleted = function (t) {
        e.telemetryHelper.addLocalOperation(n.LOCAL_OPERATIONS.HANDLE_RETARGET_COMPLETED);
        var i = r.getPrintableObject(t);
        b.log("handleRetargetCompleted called with : " + i), t.code === 0 ? h.onReTargetCompletedSuccess() : h.onReTargetCompletedFailure(i);
      }, p.dispose = function () {
        b.log("mediaRenegotiationManager :: dispose"), v = !0;
      };
    };
  return h;
})

(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/telemetry/telemetryHelper", [
      "require",
      "exports",
      "../utilities/constants",
      "../utilities/utils",
      "../utilities/stopwatch",
      "./ngcTelemetry",
      "./telemetryConstants"
    ], e);
}(function (e, t) {
  var n = e("../utilities/constants"), r = e("../utilities/utils"), i = e("../utilities/stopwatch"), s = e("./ngcTelemetry"), o = e("./telemetryConstants"), u = function () {
      function e(e) {
        var t = this;
        this.callStartTime = new Date().getTime();
        this.networkRequestsCompleted = [];
        this.networkRequestsStarted = {};
        this.localOperationsPerformed = [];
        this.outgoingModalities = [];
        this.incomingModalities = [];
        this.vbssOperations = [];
        this.vbssStarted = !1;
        this.localOfferAnswerGenerationTimestamps = [];
        this.trouterWaitOperations = [];
        this.telemetryData = {};
        this.connectedStopWatch = null;
        this.timeToRingStopWatch = null;
        this.addTrouterWaitOperation = function (e) {
          t.trouterWaitOperations.push(t.addTimeDeltaFromCallStart(e));
        };
        this.addLocalOperation = function (e) {
          t.localOperationsPerformed.push(t.addTimeDeltaFromCallStart(e));
        };
        this.addOutgoingModalities = function (e) {
          e && t.outgoingModalities.push(e);
        };
        this.addIncomingModalities = function (e) {
          e && t.incomingModalities.push(e);
        };
        this.addVbssOperations = function (e) {
          e && (e === o["default"].VBSS_OPERATION.START ? t.vbssStarted = !0 : t.vbssStarted = !1, t.vbssOperations.push(t.addTimeDeltaFromCallStart(e)));
        };
        this.addNetworkOperationStarted = function (e) {
          r.tryAddNewKeyToHashTable(t.networkRequestsStarted, e, t.addTimeDeltaFromCallStart(e));
        };
        this.addNetworkOperationCompleted = function (e, n, i) {
          var s = n ? o["default"].RESULT_VALUE.SUCCESS : o["default"].RESULT_VALUE.FAILURE;
          t.networkRequestsCompleted.push(t.addTimeDeltaFromCallStart(e + ":" + s + ":" + i));
          r.tryRemoveKeyFromHashTable(t.networkRequestsStarted, e);
        };
        this.setDirection = function (e) {
          t.telemetryData[o["default"].EXTENSIONS.DIRECTION] = e;
        };
        this.setEndPointId = function (e) {
          t.telemetryData[o["default"].CONTEXT_ID.ENDPOINTID] = e;
        };
        this.setParticipantId = function (e) {
          t.telemetryData[o["default"].CONTEXT_ID.PARTICIPANTID] = e;
        };
        this.setConversationServiceUrl = function (e) {
          t.telemetryData[o["default"].EXTENSIONS.CONVERSATION_SERVICE_URL] = e;
        };
        this.setMeetingInfo = function (e) {
          e || (t.telemetryData[o["default"].EXTENSIONS.MEETING_INFO] = e);
        };
        this.setRole = function (e) {
          t.telemetryData[o["default"].EXTENSIONS.SELF_PARTICIPANT_ROLE] = e;
        };
        this.setCallerType = function (e) {
          if (!e)
            return;
          t.telemetryData[o["default"].EXTENSIONS.CALLER_TYPE] = e.split(":", 1)[0];
        };
        this.setCalleeType = function (e) {
          if (!e)
            return;
          t.telemetryData[o["default"].EXTENSIONS.CALLEE_TYPE] = e.split(":", 1)[0];
        };
        this.setTerminatingData = function (e) {
          t.telemetryData[o["default"].EXTENSIONS.CALL_TERMINATING_END] = e.terminatingEnd;
          t.telemetryData[o["default"].EXTENSIONS.CALL_END_CODE] = e.endCode || n["default"].CALL_END_CODE.SUCCESS;
          t.telemetryData[o["default"].EXTENSIONS.CALL_END_SUB_CODE] = e.endSubCode || n["default"].CALL_END_SUB_CODE.SUCCESS;
          t.telemetryData[o["default"].EXTENSIONS.RESULT_VALUE] = e.resultValue || o["default"].RESULT_VALUE.SUCCESS;
          t.telemetryData[o["default"].EXTENSIONS.RESULT_DETAIL] = e.resultDetail || "Call gracefully hungup";
        };
        this.startCallInitializationWatch = function (e) {
          t.timeToRingStopWatch = i.build();
          e && (t.timeToRingStopWatch.msElapsed += e);
        };
        this.startCallConnectedWatch = function () {
          t.connectedStopWatch = i.build();
        };
        this.setOfferAnswerGenerationTimestamps = function (e) {
          t.localOfferAnswerGenerationTimestamps.push(t.addTimeDeltaFromCallStart(e));
        };
        this.setTimeToRingDuration = function () {
          t.timeToRingStopWatch && (t.telemetryData[o["default"].EXTENSIONS.TIME_TO_RING_IN_MS] = t.timeToRingStopWatch.duration(), t.timeToRingStopWatch = null);
        };
        this.dispose = function () {
          t.sendTelemetryData();
        };
        this.signalingSession = e;
        this.telemetryLogger = s.getLogger(e);
        this.logger = e.logger;
        this.telemetryData[o["default"].EXTENSIONS.CALL_START_TIME] = this.callStartTime;
        this.telemetryData[o["default"].EXTENSIONS.CONVERSATION_SERVICE_URL] = e.signalingAgentConfig.conversationServiceUrl;
      }
      return e.prototype.addChangingCorrelationId = function (e, t) {
        this.telemetryData[o["default"].EXTENSIONS.CHANGING_CORRELATION_ID_OLD_ID] = e;
        this.telemetryData[o["default"].EXTENSIONS.CHANGING_CORRELATION_ID_NEW_ID] = t;
      }, e.prototype.addTimeDeltaFromCallStart = function (e) {
        return e + ":" + (new Date().getTime() - this.callStartTime);
      }, e.prototype.sendTelemetryData = function () {
        this.vbssStarted && this.addVbssOperations(o["default"].VBSS_OPERATION.CALL_END);
        this.telemetryData[o["default"].EXTENSIONS.CALL_END_TIME] = new Date().getTime();
        this.connectedStopWatch && (this.telemetryData[o["default"].EXTENSIONS.CONNECTED_DURATION_IN_MS] = this.connectedStopWatch.duration());
        this.networkRequestsCompleted.length > 0 && (this.telemetryData[o["default"].EXTENSIONS.NETWORK_REQUESTS_COMPLETED] = JSON.stringify(this.networkRequestsCompleted));
        this.localOperationsPerformed.length > 0 && (this.telemetryData[o["default"].EXTENSIONS.LOCAL_OPERATIONS_PERFORMED] = JSON.stringify(this.localOperationsPerformed));
        this.trouterWaitOperations.length > 0 && (this.telemetryData[o["default"].EXTENSIONS.TROUTER_WAIT_OPERATIONS] = JSON.stringify(this.trouterWaitOperations));
        this.localOfferAnswerGenerationTimestamps.length > 0 && (this.telemetryData[o["default"].EXTENSIONS.LOCAL_OFFER_ANSWER_GENERATION_TIMESTAMPS] = JSON.stringify(this.localOfferAnswerGenerationTimestamps));
        this.incomingModalities.length > 0 && (this.telemetryData[o["default"].EXTENSIONS.INCOMING_MODALITIES] = JSON.stringify(this.incomingModalities));
        this.outgoingModalities.length > 0 && (this.telemetryData[o["default"].EXTENSIONS.OUTGOING_MODALITIES] = JSON.stringify(this.outgoingModalities));
        this.vbssOperations.length > 0 && (this.telemetryData[o["default"].EXTENSIONS.VBSS_OPERATIONS] = JSON.stringify(this.vbssOperations));
        var e = [];
        for (var t in this.networkRequestsStarted)
          this.networkRequestsStarted.hasOwnProperty(t) && e.push(this.networkRequestsStarted[t]);
        e.length > 0 && (this.telemetryData[o["default"].EXTENSIONS.NETWORK_REQUESTS_PENDING] = JSON.stringify(e));
        this.logger.log("sending telemetry data = " + r.getPrintableObject(this.telemetryData));
        this.logger.log("isMultiPartyCall = " + this.signalingSession.multiParty + " isHostLessCall = " + this.signalingSession.isHostLessCall);
        this.telemetryLogger.logConversationCallModalityEvent(this.telemetryData);
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = u;
}));

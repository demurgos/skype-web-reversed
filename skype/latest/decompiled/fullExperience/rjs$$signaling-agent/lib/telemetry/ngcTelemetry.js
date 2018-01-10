(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/telemetry/ngcTelemetry", [
      "require",
      "exports",
      "./telemetryConstants"
    ], e);
}(function (e, t) {
  function i(e) {
    return new r(e);
  }
  var n = e("./telemetryConstants"), r = function () {
      function e(e) {
        var t = this;
        this.logConversationCallModalityEvent = function (e) {
          var r = t.createCallModalityEvent(e);
          t.signalingSession.signalingAgentConfig.telemetryManager.sendEvent(n["default"].EVENT_TYPE.CONVERSATION_CALL_MODALITY, r);
        };
        this.signalingSession = e;
      }
      return e.prototype.createCallModalityEvent = function (e) {
        var t = {};
        return t.Type = n["default"].SOURCE.NGC_SOURCE, t.ResultDetail = e[n["default"].EXTENSIONS.RESULT_DETAIL], t.ResultValue = e[n["default"].EXTENSIONS.RESULT_VALUE], t.ResultCode = e[n["default"].EXTENSIONS.CALL_END_CODE], t[n["default"].CONTEXT_ID.CORRELATIONID] = this.signalingSession.correlationId, t[n["default"].CONTEXT_ID.ENDPOINTID] = e[n["default"].CONTEXT_ID.ENDPOINTID], t[n["default"].CONTEXT_ID.PARTICIPANTID] = e[n["default"].CONTEXT_ID.PARTICIPANTID], t[n["default"].EXTENSIONS.CONVERSATION_SERVICE_URL] = e[n["default"].EXTENSIONS.CONVERSATION_SERVICE_URL], t[n["default"].EXTENSIONS.CALL_START_TIME] = JSON.stringify(e[n["default"].EXTENSIONS.CALL_START_TIME]), t[n["default"].EXTENSIONS.CALL_END_TIME] = JSON.stringify(e[n["default"].EXTENSIONS.CALL_END_TIME]), t[n["default"].EXTENSIONS.IS_GROUP_CALL] = this.signalingSession.multiParty ? "true" : "false", t[n["default"].EXTENSIONS.IS_HOSTLESS_CALL] = this.signalingSession.isHostLessCall ? "true" : "false", t[n["default"].EXTENSIONS.IS_CAST_CALL] = this.signalingSession.isCastCall ? "true" : "false", t[n["default"].EXTENSIONS.IS_ON_BEHALF_OF_CALL] = this.signalingSession.onBehalfOf ? "true" : "false", t[n["default"].EXTENSIONS.CALL_TERMINATING_END] = e[n["default"].EXTENSIONS.CALL_TERMINATING_END], t[n["default"].EXTENSIONS.CALL_END_CODE] = JSON.stringify(e[n["default"].EXTENSIONS.CALL_END_CODE]), t[n["default"].EXTENSIONS.CALL_END_SUB_CODE] = JSON.stringify(e[n["default"].EXTENSIONS.CALL_END_SUB_CODE]), e.hasOwnProperty(n["default"].EXTENSIONS.DIRECTION) && (t[n["default"].EXTENSIONS.DIRECTION] = e[n["default"].EXTENSIONS.DIRECTION], t[n["default"].EXTENSIONS.SELF_PARTICIPANT_ROLE] = e[n["default"].EXTENSIONS.SELF_PARTICIPANT_ROLE]), e.hasOwnProperty(n["default"].EXTENSIONS.CONNECTED_DURATION_IN_MS) && (t[n["default"].EXTENSIONS.CONNECTED_DURATION_IN_MS] = JSON.stringify(e[n["default"].EXTENSIONS.CONNECTED_DURATION_IN_MS])), e.hasOwnProperty(n["default"].EXTENSIONS.TIME_TO_RING_IN_MS) && (t[n["default"].EXTENSIONS.TIME_TO_RING_IN_MS] = JSON.stringify(e[n["default"].EXTENSIONS.TIME_TO_RING_IN_MS])), e.hasOwnProperty(n["default"].EXTENSIONS.NETWORK_REQUESTS_COMPLETED) && (t[n["default"].EXTENSIONS.NETWORK_REQUESTS_COMPLETED] = e[n["default"].EXTENSIONS.NETWORK_REQUESTS_COMPLETED]), e.hasOwnProperty(n["default"].EXTENSIONS.NETWORK_REQUESTS_PENDING) && (t[n["default"].EXTENSIONS.NETWORK_REQUESTS_PENDING] = e[n["default"].EXTENSIONS.NETWORK_REQUESTS_PENDING]), e.hasOwnProperty(n["default"].EXTENSIONS.LOCAL_OPERATIONS_PERFORMED) && (t[n["default"].EXTENSIONS.LOCAL_OPERATIONS_PERFORMED] = e[n["default"].EXTENSIONS.LOCAL_OPERATIONS_PERFORMED]), e.hasOwnProperty(n["default"].EXTENSIONS.TROUTER_WAIT_OPERATIONS) && (t[n["default"].EXTENSIONS.TROUTER_WAIT_OPERATIONS] = e[n["default"].EXTENSIONS.TROUTER_WAIT_OPERATIONS]), e.hasOwnProperty(n["default"].EXTENSIONS.LOCAL_OFFER_ANSWER_GENERATION_TIMESTAMPS) && (t[n["default"].EXTENSIONS.LOCAL_OFFER_ANSWER_GENERATION_TIMESTAMPS] = e[n["default"].EXTENSIONS.LOCAL_OFFER_ANSWER_GENERATION_TIMESTAMPS]), e.hasOwnProperty(n["default"].EXTENSIONS.OUTGOING_MODALITIES) && (t[n["default"].EXTENSIONS.OUTGOING_MODALITIES] = e[n["default"].EXTENSIONS.OUTGOING_MODALITIES]), e.hasOwnProperty(n["default"].EXTENSIONS.INCOMING_MODALITIES) && (t[n["default"].EXTENSIONS.INCOMING_MODALITIES] = e[n["default"].EXTENSIONS.INCOMING_MODALITIES]), e.hasOwnProperty(n["default"].EXTENSIONS.VBSS_OPERATIONS) && (t[n["default"].EXTENSIONS.VBSS_OPERATIONS] = e[n["default"].EXTENSIONS.VBSS_OPERATIONS]), e.hasOwnProperty(n["default"].EXTENSIONS.CALLER_TYPE) && (t[n["default"].EXTENSIONS.CALLER_TYPE] = e[n["default"].EXTENSIONS.CALLER_TYPE]), e.hasOwnProperty(n["default"].EXTENSIONS.CALLEE_TYPE) && (t[n["default"].EXTENSIONS.CALLEE_TYPE] = e[n["default"].EXTENSIONS.CALLEE_TYPE]), this.signalingSession.callType && (t[n["default"].EXTENSIONS.CALL_TYPE] = this.signalingSession.callType), this.signalingSession.signalingAgentConfig.testCall && (t[n["default"].EXTENSIONS.TEST_CONTEXT_ID] = "Test"), this.signalingSession.threadId && (t[n["default"].CONTEXT_ID.THREADID] = this.signalingSession.threadId), this.signalingSession.teamsMessageId && (t[n["default"].CONTEXT_ID.TEAMS_MESSAGEID] = this.signalingSession.teamsMessageId), this.signalingSession.getMeetingInfo() && (t[n["default"].CONTEXT_ID.TEAMS_MEETINGINFO] = JSON.stringify(this.signalingSession.getMeetingInfo())), this.signalingSession.multiParty && this.signalingSession.numberOfOriginalInvitees === 0 && e.hasOwnProperty(n["default"].EXTENSIONS.SELF_PARTICIPANT_ROLE) && e[n["default"].EXTENSIONS.SELF_PARTICIPANT_ROLE] === n["default"].ROLE.CALLER && (t[n["default"].EXTENSIONS.IS_MEETUP_CALL] = "true"), t;
      }, e;
    }();
  t.NGCTelemetry = r;
  t.getLogger = i;
}));

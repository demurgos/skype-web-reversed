define("jSkype/services/NGCCallAgent/NGCCallAgent/ngcTelemetry", [
  "require",
  "exports",
  "module",
  "jSkype/client",
  "jSkype/settings",
  "jSkype/services/NGCCallAgent/NGCCallAgent/telemetryConstants"
], function (e, t) {
  function s(e) {
    function t(e) {
      n.get()._telemetryManager.sendEvent(r.settings.telemetry.skypeConcoreToken, i.EVENT_TYPE.CONVERSATION_CALL_MODALITY, e);
    }
    function s(t) {
      var n = {};
      return n.Type = i.SOURCE.NGC_SOURCE, n.ResultDetail = t[i.EXTENSIONS.RESULT_DETAIL], n.ResultValue = t[i.EXTENSIONS.RESULT_VALUE], n.ResultCode = t[i.EXTENSIONS.CALL_END_CODE], n[i.CONTEXT_ID.CORRELATIONID] = e.correlationId, n[i.CONTEXT_ID.ENDPOINTID] = t[i.CONTEXT_ID.ENDPOINTID], n[i.CONTEXT_ID.PARTICIPANTID] = t[i.CONTEXT_ID.PARTICIPANTID], n[i.EXTENSIONS.CONVERSATION_SERVICE_URL] = t[i.EXTENSIONS.CONVERSATION_SERVICE_URL], n[i.EXTENSIONS.CALL_START_TIME] = JSON.stringify(t[i.EXTENSIONS.CALL_START_TIME]), n[i.EXTENSIONS.CALL_END_TIME] = JSON.stringify(t[i.EXTENSIONS.CALL_END_TIME]), n[i.EXTENSIONS.IS_GROUP_CALL] = e.threadId ? "true" : "false", n[i.EXTENSIONS.CALL_TERMINATING_END] = t[i.EXTENSIONS.CALL_TERMINATING_END], n[i.EXTENSIONS.CALL_END_CODE] = JSON.stringify(t[i.EXTENSIONS.CALL_END_CODE]), n[i.EXTENSIONS.CALL_END_SUB_CODE] = JSON.stringify(t[i.EXTENSIONS.CALL_END_SUB_CODE]), t.hasOwnProperty(i.EXTENSIONS.DIRECTION) && (n[i.EXTENSIONS.DIRECTION] = t[i.EXTENSIONS.DIRECTION], n[i.EXTENSIONS.SELF_PARTICIPANT_ROLE] = t[i.EXTENSIONS.SELF_PARTICIPANT_ROLE]), t.hasOwnProperty(i.EXTENSIONS.CONNECTED_DURATION_IN_MS) && (n[i.EXTENSIONS.CONNECTED_DURATION_IN_MS] = JSON.stringify(t[i.EXTENSIONS.CONNECTED_DURATION_IN_MS])), t.hasOwnProperty(i.EXTENSIONS.TIME_TO_RING_IN_MS) && (n[i.EXTENSIONS.TIME_TO_RING_IN_MS] = JSON.stringify(t[i.EXTENSIONS.TIME_TO_RING_IN_MS])), t.hasOwnProperty(i.EXTENSIONS.NETWORK_REQUESTS_COMPLETED) && (n[i.EXTENSIONS.NETWORK_REQUESTS_COMPLETED] = t[i.EXTENSIONS.NETWORK_REQUESTS_COMPLETED]), t.hasOwnProperty(i.EXTENSIONS.NETWORK_REQUESTS_PENDING) && (n[i.EXTENSIONS.NETWORK_REQUESTS_PENDING] = t[i.EXTENSIONS.NETWORK_REQUESTS_PENDING]), t.hasOwnProperty(i.EXTENSIONS.LOCAL_OPERATIONS_PERFORMED) && (n[i.EXTENSIONS.LOCAL_OPERATIONS_PERFORMED] = t[i.EXTENSIONS.LOCAL_OPERATIONS_PERFORMED]), t.hasOwnProperty(i.EXTENSIONS.LOCAL_OFFER_ANSWER_TIME_IN_MS) && (n[i.EXTENSIONS.LOCAL_OFFER_ANSWER_TIME_IN_MS] = t[i.EXTENSIONS.LOCAL_OFFER_ANSWER_TIME_IN_MS]), t.hasOwnProperty(i.EXTENSIONS.OUTGOING_MODALITIES) && (n[i.EXTENSIONS.OUTGOING_MODALITIES] = t[i.EXTENSIONS.OUTGOING_MODALITIES]), t.hasOwnProperty(i.EXTENSIONS.INCOMING_MODALITIES) && (n[i.EXTENSIONS.INCOMING_MODALITIES] = t[i.EXTENSIONS.INCOMING_MODALITIES]), t.hasOwnProperty(i.EXTENSIONS.VBSS_OPERATIONS) && (n[i.EXTENSIONS.VBSS_OPERATIONS] = t[i.EXTENSIONS.VBSS_OPERATIONS]), t.hasOwnProperty(i.EXTENSIONS.CALLER_TYPE) && (n[i.EXTENSIONS.CALLER_TYPE] = t[i.EXTENSIONS.CALLER_TYPE]), t.hasOwnProperty(i.EXTENSIONS.CALLEE_TYPE) && (n[i.EXTENSIONS.CALLEE_TYPE] = t[i.EXTENSIONS.CALLEE_TYPE]), e.signalingAgentConfig.testCall && (n[i.EXTENSIONS.TEST_CONTEXT_ID] = "Test"), e.threadId && (n[i.CONTEXT_ID.THREADID] = e.threadId), e.spacesMessageId && (n[i.CONTEXT_ID.SPACES_MESSAGEID] = e.spacesMessageId), n;
    }
    this.logConversationCallModalityEvent = function (e) {
      var n = s(e);
      t(n);
    };
  }
  var n = e("jSkype/client"), r = e("jSkype/settings"), i = e("jSkype/services/NGCCallAgent/NGCCallAgent/telemetryConstants");
  t.getLogger = function (e) {
    return new s(e);
  };
});

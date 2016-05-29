define("jSkype/services/NGCCallAgent/NGCCallAgent/telemetryHelper", [
  "require",
  "jSkype/services/NGCCallAgent/NGCCallAgent/constants",
  "jSkype/services/NGCCallAgent/NGCCallAgent/telemetryConstants",
  "jSkype/services/NGCCallAgent/NGCCallAgent/utils",
  "swx-utils-common",
  "jSkype/services/NGCCallAgent/NGCCallAgent/ngcTelemetry"
], function (e) {
  var t = e("jSkype/services/NGCCallAgent/NGCCallAgent/constants"), n = e("jSkype/services/NGCCallAgent/NGCCallAgent/telemetryConstants"), r = e("jSkype/services/NGCCallAgent/NGCCallAgent/utils"), i = e("swx-utils-common").stopwatch, s = e("jSkype/services/NGCCallAgent/NGCCallAgent/ngcTelemetry"), o = function (e) {
      function E() {
        m[n.EXTENSIONS.CALL_START_TIME] = u;
        m[n.EXTENSIONS.CONVERSATION_SERVICE_URL] = e.signalingAgentConfig.conversationServiceUrl;
      }
      function S(e) {
        return e + ":" + (new Date().getTime() - u);
      }
      function x() {
        d && o.addVbssOperations(n.VBSS_OPERATION.CALL_END);
        m[n.EXTENSIONS.CALL_END_TIME] = new Date().getTime();
        g && (m[n.EXTENSIONS.CONNECTED_DURATION_IN_MS] = g.duration());
        a.length > 0 && (m[n.EXTENSIONS.NETWORK_REQUESTS_COMPLETED] = JSON.stringify(a));
        l.length > 0 && (m[n.EXTENSIONS.LOCAL_OPERATIONS_PERFORMED] = JSON.stringify(l));
        v.length > 0 && (m[n.EXTENSIONS.LOCAL_OFFER_ANSWER_TIME_IN_MS] = JSON.stringify(v));
        h.length > 0 && (m[n.EXTENSIONS.INCOMING_MODALITIES] = JSON.stringify(h));
        c.length > 0 && (m[n.EXTENSIONS.OUTGOING_MODALITIES] = JSON.stringify(c));
        p.length > 0 && (m[n.EXTENSIONS.VBSS_OPERATIONS] = JSON.stringify(p));
        var e = [];
        for (var t in f)
          f.hasOwnProperty(t) && e.push(f[t]);
        e.length > 0 && (m[n.EXTENSIONS.NETWORK_REQUESTS_PENDING] = JSON.stringify(e));
        w.log("sending telemetry data = " + r.getPrintableObject(m));
        b.logConversationCallModalityEvent(m);
      }
      var o = this, u = new Date().getTime(), a = [], f = {}, l = [], c = [], h = [], p = [], d = !1, v = [], m = {}, g = null, y = null, b = s.getLogger(e), w = e.logger;
      E();
      o.addLocalOperation = function (e) {
        l.push(S(e));
      };
      o.addOutgoingModalities = function (e) {
        e && c.push(e);
      };
      o.addIncomingModalities = function (e) {
        e && h.push(e);
      };
      o.addVbssOperations = function (e) {
        e && (e === n.VBSS_OPERATION.START ? d = !0 : d = !1, p.push(S(e)));
      };
      o.addNetworkOperationStarted = function (e) {
        r.tryAddNewKeyToHashTable(f, e, S(e));
      };
      o.addNetworkOperationCompleted = function (e, t, i) {
        var s = t ? n.RESULT_VALUE.SUCCESS : n.RESULT_VALUE.FAILURE;
        a.push(S(e + ":" + s + ":" + i));
        r.tryRemoveKeyFromHashTable(f, e);
      };
      o.setDirection = function (e) {
        m[n.EXTENSIONS.DIRECTION] = e;
      };
      o.setEndPointId = function (e) {
        m[n.CONTEXT_ID.ENDPOINTID] = e;
      };
      o.setParticipantId = function (e) {
        m[n.CONTEXT_ID.PARTICIPANTID] = e;
      };
      o.setConversationServiceUrl = function (e) {
        m[n.EXTENSIONS.CONVERSATION_SERVICE_URL] = e;
      };
      o.setRole = function (e) {
        m[n.EXTENSIONS.SELF_PARTICIPANT_ROLE] = e;
      };
      o.setCallerType = function (e) {
        if (!e)
          return;
        m[n.EXTENSIONS.CALLER_TYPE] = e.split(":", 1)[0];
      };
      o.setCalleeType = function (e) {
        if (!e)
          return;
        m[n.EXTENSIONS.CALLEE_TYPE] = e.split(":", 1)[0];
      };
      o.setTerminatingData = function (e) {
        m[n.EXTENSIONS.CALL_TERMINATING_END] = e.terminatingEnd;
        m[n.EXTENSIONS.CALL_END_CODE] = e.endCode || t.CALL_END_CODE.SUCCESS;
        m[n.EXTENSIONS.CALL_END_SUB_CODE] = e.endSubCode || t.CALL_END_SUB_CODE.SUCCESS;
        m[n.EXTENSIONS.RESULT_VALUE] = e.resultValue || n.RESULT_VALUE.SUCCESS;
        m[n.EXTENSIONS.RESULT_DETAIL] = e.resultDetail || "Call gracefully hungup";
      };
      o.startCallInitializationWatch = function (e) {
        y = i.build();
        e && (y.msElapsed += e);
      };
      o.startCallConnectedWatch = function () {
        g = i.build();
      };
      o.setLocalOfferAnswerDuration = function (e) {
        v.push(e);
      };
      o.setTimeToRingDuration = function () {
        y && (m[n.EXTENSIONS.TIME_TO_RING_IN_MS] = y.duration(), y = null);
      };
      o.dispose = function () {
        x();
      };
    };
  return o;
});

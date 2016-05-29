define("jSkype/modelHelpers/calling/callData", [
  "require",
  "swx-enums",
  "jcafe-property-model",
  "constants/common"
], function (e) {
  function i() {
    function s() {
      return i[0] ? i[0].payload : null;
    }
    var e = this, i = [];
    e.isProcessingCall = n.boolProperty(!1);
    e.isCurrentCallIncoming = n.boolProperty(!1);
    e.pluginAwaitCall = n.boolProperty(!1);
    e.pluginRingingForMe = n.boolProperty(!1);
    e.callTechnology = n.property({ value: t.callTechnology.None });
    e.pluginOthersAreLive = n.boolProperty(!1);
    e.pluginCallInfo = n.property();
    e.nodeId = n.property();
    e.ngcEndpointId = n.property();
    e.ngcParticipantId = n.property();
    e.oncePluginCallInfoReady = function (t) {
      function n(e) {
        return !!e;
      }
      return e.pluginCallInfo(null), e.pluginCallInfo.once(n, t);
    };
    e.getFirstPayload = s;
    e.resetCallData = function () {
      i = [];
      e.isProcessingCall(!1);
      e.isCurrentCallIncoming(!1);
      e.pluginAwaitCall(!1);
      e.callTechnology(t.callTechnology.None);
      e.pluginCallInfo(null);
      e.nodeId(null);
      e.ngcEndpointId(null);
      e.ngcParticipantId(null);
    };
    e.resetPluginCallState = function () {
      e.pluginRingingForMe(!1);
      e.pluginOthersAreLive(!1);
    };
    e.hasIncomingP2PNotification = function () {
      return i.some(function (e) {
        return e.payload.evt === r.INCOMING_CALL;
      });
    };
    e.hasIncomingNGCNotification = function () {
      return i.some(function (e) {
        return e.payload.evt === r.INCOMING_SKYPE_NGC_CALL || e.payload.evt === r.INCOMING_SKYPE_NGC_GVC_CALL;
      });
    };
    e.isGroupIncomingCall = function () {
      return s() ? s().conversationId !== "8:" + s().callerId : !1;
    };
    e.addIncomingCallPayload = function (t) {
      e.isCurrentCallIncoming(!0);
      i.push({
        processed: !1,
        payload: t
      });
    };
    e.getCallIdFromCurrentCall = function () {
      return s() && s().convoCallId;
    };
    e.getIncomingNGCPayload = function () {
      var e = null;
      return i.forEach(function (t) {
        if (t.payload.evt === r.INCOMING_SKYPE_NGC_CALL || t.payload.evt === r.INCOMING_SKYPE_NGC_GVC_CALL) {
          if (e)
            return;
          t.processed || (e = t.payload, t.processed = !0);
        }
      }), e;
    };
    e.wasNGCPayloadProcessed = function () {
      return i.some(function (e) {
        var t = e.payload.evt === r.INCOMING_SKYPE_NGC_CALL || e.payload.evt === r.INCOMING_SKYPE_NGC_GVC_CALL;
        return t && e.processed;
      });
    };
    e.getUnprocessedIncomingCallPayloads = function () {
      var e = [];
      return i.forEach(function (t) {
        t.processed || (t.processed = !0, e.push(t.payload));
      }), e;
    };
    e.markIncomingPayloadsAsProcessed = function (e) {
      i.forEach(function (t) {
        t.payload === e && (t.processed = !0);
      });
    };
    e.markAllIncomingPayloadsAsProcessed = function () {
      i.forEach(function (e) {
        e.processed = !0;
      });
    };
  }
  var t = e("swx-enums"), n = e("jcafe-property-model"), r = e("constants/common").events.trouter;
  return {
    build: function () {
      return new i();
    }
  };
});

(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/calling/callData", [
      "require",
      "exports",
      "swx-enums",
      "swx-constants",
      "jcafe-property-model"
    ], e);
}(function (e, t) {
  function u() {
    return new o();
  }
  var n = e("swx-enums"), r = e("swx-constants"), i = e("jcafe-property-model"), s = r.COMMON.events.trouter, o = function () {
      function e() {
        this.callPayloads = [];
        this.isProcessingCall = i.boolProperty(!1);
        this.isCurrentCallIncoming = i.boolProperty(!1);
        this.pluginAwaitCall = i.boolProperty(!1);
        this.pluginRingingForMe = i.boolProperty(!1);
        this.callTechnology = i.property({ value: n.callTechnology.None });
        this.isHostless = !1;
        this.pluginOthersAreLive = i.boolProperty(!1);
        this.pluginCallInfo = i.property();
        this.nodeId = i.property();
        this.ngcEndpointId = i.property();
        this.ngcParticipantId = i.property();
        this.resetPluginCallState = function () {
          this.pluginRingingForMe(!1);
        };
        this.hasIncomingP2PNotification = function () {
          return this.callPayloads.some(function (e) {
            return e.payload.evt === s.INCOMING_SKYPE_P2P_CALL;
          });
        };
        this.hasIncomingNGCNotification = function () {
          return this.callPayloads.some(this.isIncomingNGCPayload);
        };
        this.isGroupIncomingCall = function () {
          return this.getFirstPayload() ? this.getFirstPayload().conversationId !== "8:" + this.getFirstPayload().callerId : !1;
        };
        this.addIncomingCallPayload = function (e) {
          this.isCurrentCallIncoming(!0);
          this.callPayloads.push({
            processed: !1,
            payload: e
          });
        };
      }
      return e.prototype.oncePluginCallInfoReady = function (e) {
        return this.pluginCallInfo(null), this.pluginCallInfo.once(function (e) {
          return !!e;
        }, e);
      }, e.prototype.getFirstPayload = function () {
        return this.callPayloads[0] ? this.callPayloads[0].payload : null;
      }, e.prototype.resetCallData = function () {
        this.callPayloads = [];
        this.isProcessingCall(!1);
        this.isCurrentCallIncoming(!1);
        this.pluginAwaitCall(!1);
        this.callTechnology(n.callTechnology.None);
        this.isHostless = !1;
        this.pluginCallInfo(null);
        this.nodeId(null);
        this.ngcEndpointId(null);
        this.ngcParticipantId(null);
      }, e.prototype.getCallIdFromCurrentCall = function () {
        return this.getFirstPayload() && this.getFirstPayload().convoCallId;
      }, e.prototype.getIncomingNGCPayload = function () {
        var e = this, t = null;
        return this.callPayloads.forEach(function (n) {
          if (e.isIncomingNGCPayload(n)) {
            if (t)
              return;
            n.processed || (t = n.payload, n.processed = !0);
          }
        }), t;
      }, e.prototype.wasNGCPayloadProcessed = function () {
        var e = this;
        return this.callPayloads.some(function (t) {
          var n = e.isIncomingNGCPayload(t);
          return n && t.processed;
        });
      }, e.prototype.getUnprocessedIncomingCallPayloads = function () {
        var e = [];
        return this.callPayloads.forEach(function (t) {
          t.processed || (t.processed = !0, e.push(t.payload));
        }), e;
      }, e.prototype.markIncomingPayloadsAsProcessed = function (e) {
        this.callPayloads.forEach(function (t) {
          t.payload === e && (t.processed = !0);
        });
      }, e.prototype.markAllIncomingPayloadsAsProcessed = function () {
        this.callPayloads.forEach(function (e) {
          e.processed = !0;
        });
      }, e.prototype.isIncomingNGCPayload = function (e) {
        return e.payload.evt === s.INCOMING_SKYPE_NGC_CALL || e.payload.evt === s.INCOMING_SKYPE_NGC_GVC_CALL || e.payload.evt === s.INCOMING_LYNC_NGC_CALL || e.payload.evt === s.INCOMING_SKYPE_NGC_PSTN_CALL;
      }, e;
    }();
  t.build = u;
}));

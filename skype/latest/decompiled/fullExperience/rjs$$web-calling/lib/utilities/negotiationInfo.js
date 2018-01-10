(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("web-calling/lib/utilities/negotiationInfo", [
      "require",
      "exports",
      "signaling-agent"
    ], e);
}(function (e, t) {
  var n = e("signaling-agent"), r = 10000, i = function () {
      function e(e, t, n) {
        this.isOfferer = !1;
        this.isRenegotiation = !1;
        this.mediaLegId = "";
        this.timeStamps = {};
        this.negotiationCounter = 0;
        this.callsModel = e;
        this.signalingSession = t;
        this.logger = n;
      }
      return e.prototype.incrementAttemps = function () {
        ++this.negotiationCounter;
      }, e.prototype.sendStats = function () {
        var e = {}, t = new Date().getTime();
        e[n.TM_CONSTANTS.CONTEXT_ID.DATA_VERSION] = "3";
        e[n.TM_CONSTANTS.CONTEXT_ID.CORRELATIONID] = String(this.signalingSession.correlationId);
        e.CallNumber = "0";
        e.NegotiationNumber = String(this.negotiationCounter);
        e.NegotiationRequiredTime = String(t);
        e.MediaLegId = String(this.mediaLegId);
        e.Status = String(this.status);
        e.Retarget = "false";
        e.ReInvite = this.isRenegotiation ? "true" : "false";
        e.CreationTime = String(this.timeStamps.created * r);
        e.StartTime = String(this.timeStamps.started * r);
        e.CompleteTime = String(t * r);
        if (!this.isOfferer)
          e.Type = "answering", e.ProcessOfferTime = String(this.timeStamps.initialOfferArrived * r), e.CreateAnswerFinalTime = String(this.timeStamps.finalAnswerCreated * r), e.AnswerReadyProvisionalTime = String(this.timeStamps.offerProcessed * r), e.AnswerReadyFinalTime = String(this.timeStamps.modalitiesConfigured * r);
        else {
          var i = "0";
          e.Type = "offering";
          e.OfferReadyTime = String(this.timeStamps.offerCreated * r);
          e["ProcessAnswer_" + i + "_Final_Time"] = String(this.timeStamps.finalAnswerProcessed * r);
          e["ProcessAnswer_" + i + "_Final_Accepted"] = "true";
        }
        e.isGroupConversation = this.signalingSession.multiParty ? "1" : "0";
        this.result && (e.isComplete = this.result.isComplete ? "1" : "0", e.activeVideoModalities = String(this.result.activeModalities.video), e.activeAudioModalities = String(this.result.activeModalities.audio), e.configuredVideoModalities = String(this.result.configuredModalities.video), e.configuredAudioModalities = String(this.result.configuredModalities.audio));
        e.timeCompleted = String((t - this.timeStamps.created) * r);
        var s = this.timeStamps;
        for (var o in this.timeStamps)
          this.timeStamps.hasOwnProperty(o) && (e["time_" + o] = String((s[o] - this.timeStamps.created) * r));
        try {
          this.callsModel.telemetryManager.sendEvent(this.callsModel.mdscToken, "mdsc_negotiation", e);
        } catch (u) {
          this.logger.error("sendNegotiationStats sendEvent failed", "error:", u.toString());
        }
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = i;
}));

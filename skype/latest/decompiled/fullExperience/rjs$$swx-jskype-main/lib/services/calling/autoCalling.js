(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/calling/autoCalling", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "../../../lib/services/callController",
      "jskype-settings-instance",
      "swx-util-calling-stack",
      "swx-constants",
      "swx-enums",
      "swx-utils-common",
      "../../../lib/telemetry/logging/callingLogTracer",
      "jcafe-property-model",
      "reqwest",
      "swx-browser-globals"
    ], e);
}(function (e, t) {
  function v(e) {
    return new d(e);
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("../../../lib/services/callController"), i = e("jskype-settings-instance"), s = e("swx-util-calling-stack"), o = e("swx-constants"), u = e("swx-enums"), a = e("swx-utils-common"), f = e("../../../lib/telemetry/logging/callingLogTracer"), l = e("jcafe-property-model"), c = e("reqwest"), h = e("swx-browser-globals"), p = f.get(), d = function () {
      function e(e) {
        var t = this;
        this.autoCallPayloadHandled = !1;
        this.isActive = !1;
        this.autoCallingSubs = [];
        this.shellAppCanJoin = l.boolProperty(!1);
        this.autoCallingMode = function () {
          return t.autoCallingModeInternal;
        };
        this.partnerId = function () {
          return t.partnerIdInternal;
        };
        this.callId = function () {
          return t.callIdInternal;
        };
        this.reset = function (e) {
          p.log("[AutoCall] reset, current autoCall()", t.conversation.autoCall());
          t.conversation.autoCall() && (t.conversation.autoCall(!1, e), t.sendTelemetry(o.COMMON.telemetry.autoCalling.AUTO_CALL_ENDED, {
            reason: e || "unknown",
            participantsCount: t.conversation.participantsCount()
          }), t.autoCallingModeInternal = undefined, t.partnerIdInternal = undefined, t.callIdInternal = undefined, !t.isActive && t.autoCallRejectRef && t.autoCallRejectRef({
            reason: e,
            message: "Autocall failed, reason:" + e,
            type: o.COMMON.callingErrors.AUTO_CALL_FAILED
          }), t.isActive = !1, n.get()._telemetryManager.setCommonProperty("autoCalling", !1));
        };
        this.handleAutoCall = function () {
          var e = new Promise(function (e, n) {
            var r = function () {
              t.isActive = !0;
              t.clearSubscriptions();
              e(t.conversation);
            };
            if (!i.isFeatureOn(o.COMMON.featureFlags.AUTO_CALLING)) {
              p.log("AutoCalling is disabled, return conversation");
              r();
              return;
            }
            if (!t.conversation.autoCall()) {
              r();
              return;
            }
            t.autoCallRejectRef = n;
            p.log("AutoCalling handling, autoCall:", t.conversation.autoCall());
            var u = function () {
                t.sendTelemetry(o.COMMON.telemetry.autoCalling.ATTEMPT_TO_JOIN);
                t.isActive = !0;
                t.clearSubscriptions();
                e(t.conversation);
              }, a = function () {
                t.sendTelemetry(o.COMMON.telemetry.autoCalling.ATTEMPT_TO_JOIN);
                t.isActive = !0;
                e(t.conversation);
              }, f = function (e) {
                p.log("AutoCalling, waiting for participants, currently", t.conversation.participants().length);
                t.conversation.participants().length ? e() : (t.autoCallingSubs.push(t.conversation.participants.subscribe()), t.autoCallingSubs.push(t.conversation.participants.added(e)));
              }, l = function () {
                p.log("AutoCalling, handling in parent window");
                f(function () {
                  t.clearSubscriptions();
                  t.conversation._callHandler.joinCall(!0);
                });
                a();
              }, c = function () {
                p.log("AutoCalling, handling in shellapp, can join:", t.shellAppCanJoin());
                t.autoCallingSubs.push(t.shellAppCanJoin.once(!0, u));
              }, d = function () {
                p.log("AutoCalling, handling standard plugin call");
                f(u);
              };
            t.conversation.autoCall() && (h.getWindow().shellApp ? (c(), t.setupAutoCallTimeout()) : s.get().isInBrowserCallingSupported() ? s.get().isInBrowserCallingSupported() && (d(), t.setupAutoCallTimeout()) : l());
          });
          return e["catch"](function (e) {
            t.sendTelemetry(o.COMMON.telemetry.autoCalling.AUTO_CALL_HANDLING_ERROR);
            p.error("Error while handling auto calling promise:", e);
          }), e;
        };
        this.setupAutoCalling = function (e, r, i) {
          if (t.autoCallingModeInternal || t.partnerIdInternal || t.callIdInternal)
            throw new Error("Auto-calling has already been set up");
          n.get()._telemetryManager.setCommonProperty("autoCalling", t.partnerIdInternal = r);
          n.get()._telemetryManager.setCommonProperty("autoCallId", t.callIdInternal = i);
          n.get()._telemetryManager.setCommonProperty("autoCallMode", t.autoCallingModeInternal = e);
          t.conversation.autoCall(!0);
        };
        this.setupMeeting = function (e, n) {
          var r;
          if (!i.isFeatureOn(o.COMMON.featureFlags.AUTO_CALLING))
            return p.log("AutoCalling is disabled"), undefined;
          if (t.autoCallPayloadHandled || h.getWindow().shellApp)
            return p.warn("Cant update meeting details, previous message was handled or in shell app"), undefined;
          try {
            r = JSON.parse(n);
          } catch (s) {
            return t.sendTelemetry(o.COMMON.telemetry.autoCalling.AUTO_CALL_PAYLOAD_INVALID), p.log("Unable to parse autoCallPayload", n), undefined;
          }
          return t.matchAutoCallWithConversation(e) ? (p.log("Setup autoCalling", e.conversationId, r), t.autoCallPayloadHandled = !0, t.setupAutoCalling(r.Mode, r.PartnerService, r.CallId), r.Mode === o.COMMON.autoCallingMode.call ? (t.sendTelemetry(o.COMMON.telemetry.autoCalling.HOST_JOINED), e.selfParticipant.audio.state.once(u.callConnectionState.Connecting, function () {
            t.callbackAutoCallingService(e, r);
          })) : t.sendTelemetry(o.COMMON.telemetry.autoCalling.PARTICIPANT_JOINED), undefined) : !1;
        };
        this.conversation = e;
      }
      return e.prototype.sendTelemetry = function (e, t) {
        var r = t || {};
        r.eventName = e;
        r.mode = this.autoCallingModeInternal;
        r.partnerId = this.partnerIdInternal;
        r.callId = this.callIdInternal;
        p.log("[AutoCall] telemetry sent", r);
        n.get()._telemetryManager.sendEvent(i.settings.telemetry.jSkypeTenantToken, o.COMMON.telemetry.autoCalling.MASTER_EVENT, r);
      }, e.prototype.handleAutoCallTimeout = function () {
        this.isActive ? this.conversation.selfParticipant.audio.state() !== u.callConnectionState.Connected && (this.reset(u.callDisconnectionReason.AutoCallTimeout), r.endCall(this.conversation)) : (this.reset(u.callDisconnectionReason.AutoCallTimeout), r.abortAutoCall(this.conversation));
      }, e.prototype.setupAutoCallTimeout = function () {
        h.getWindow().setTimeout(this.handleAutoCallTimeout.bind(this), i.settings.autoCalling.callTimeout);
      }, e.prototype.handleServiceFailure = function () {
        var e = this;
        h.getWindow().setTimeout(function () {
          e.reset(u.callDisconnectionReason.AutoCallFailed);
          r.abortAutoCall(e.conversation);
        }, i.settings.autoCalling.serviceFailureTimeout);
      }, e.prototype.callbackAutoCallingService = function (e, t) {
        var n = this, r = JSON.stringify({
            host: e.selfParticipant.person.id(),
            payload: t.Token
          });
        p.log("AutoCalling service response:", r);
        c.compat({
          url: t.CallbackUrl,
          crossOrigin: !0,
          dataType: "json",
          data: r,
          method: "PUT",
          contentType: "application/json",
          error: function (e) {
            p.log("AutoCalling service error", e);
            n.handleServiceFailure();
          },
          success: function (e) {
            p.log("AutoCalling service success", e);
          }
        });
      }, e.prototype.clearSubscriptions = function () {
        this.autoCallingSubs.forEach(function (e) {
          return e && e.dispose();
        });
        this.autoCallingSubs = [];
      }, e.prototype.matchAutoCallWithConversation = function (e) {
        var t = a.sessionStorage.get(o.COMMON.autoCallingThreadId);
        return t === e.conversationId ? (p.log("[AutoCall] conversation with auto call matched"), a.sessionStorage.remove(o.COMMON.autoCallingThreadId), !0) : (p.log("[AutoCall] can not match conversation with auto call, ignoring"), !1);
      }, e;
    }();
  t.AutoCallingService = d;
  t.build = v;
}));

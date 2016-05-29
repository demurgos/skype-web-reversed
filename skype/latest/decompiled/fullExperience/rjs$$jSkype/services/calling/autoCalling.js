define("jSkype/services/calling/autoCalling", [
  "require",
  "exports",
  "module",
  "jSkype/client",
  "jSkype/services/callController",
  "jSkype/settings",
  "utils/calling/callingStack",
  "constants/common",
  "swx-enums",
  "swx-utils-common",
  "jSkype/telemetry/logging/callingLogTracer",
  "jcafe-property-model",
  "reqwest",
  "browser/window"
], function (e, t) {
  function p(e) {
    function g(e, r) {
      var s = r || {};
      s.eventName = e;
      s.mode = t.autoCallingMode();
      s.partnerId = t.partnerId();
      s.callId = t.callId();
      f.log("[AutoCall] telemetry sent", s);
      n.get()._telemetryManager.sendEvent(i.settings.telemetry.jSkypeTenantToken, o.telemetry.autoCalling.MASTER_EVENT, s);
    }
    function y() {
      d ? e.selfParticipant.audio.state() !== u.callConnectionState.Connected && (t.reset(u.callDisconnectionReason.AutoCallTimeout), r.endCall(e)) : (t.reset(u.callDisconnectionReason.AutoCallTimeout), r.abortAutoCall(e));
    }
    function b() {
      h.setTimeout(y, i.settings.autoCalling.callTimeout);
    }
    function w() {
      h.setTimeout(function () {
        t.reset(u.callDisconnectionReason.AutoCallFailed);
        r.abortAutoCall(e);
      }, i.settings.autoCalling.serviceFailureTimeout);
    }
    function E(e, t) {
      var n = JSON.stringify({
        host: e.selfParticipant.person.id(),
        payload: t.Token
      });
      f.log("AutoCalling service response:", n);
      c.compat({
        url: t.CallbackUrl,
        crossOrigin: !0,
        dataType: "json",
        data: n,
        method: "PUT",
        contentType: "application/json",
        error: function (e) {
          f.log("AutoCalling service error", e);
          w();
        },
        success: function (e) {
          f.log("AutoCalling service success", e);
        }
      });
    }
    function S() {
      m.forEach(function (e) {
        return e && e.dispose();
      });
      m = [];
    }
    function x(e) {
      var t = a.get(o.autoCallingThreadId);
      return t === e.conversationId ? (f.log("[AutoCall] conversation with auto call matched"), a.remove(o.autoCallingThreadId), !0) : (f.log("[AutoCall] can not match conversation with auto call, ignoring"), !1);
    }
    var t = this, p = !1, d = !1, v, m = [];
    return t.autoCallingMode = l.property(), t.partnerId = l.property(), t.callId = l.property(), t.shellAppCanHost = l.boolProperty(!1), t.shellAppCanJoin = l.boolProperty(!1), t.reset = function (r) {
      f.log("[AutoCall] reset, current autoCall()", e.autoCall());
      if (r === u.callDisconnectionReason.OutOfBrowserCall) {
        f.log("[AutoCall] reset, fallback to plugin, ignoring");
        return;
      }
      e.autoCall() && (e.autoCall(!1, r), g(o.telemetry.autoCalling.AUTO_CALL_ENDED, {
        reason: r || "unknown",
        mode: t.autoCallingMode(),
        participantsCount: e.participantsCount()
      }), t.autoCallingMode(""), !d && v && v({
        reason: r,
        message: "Autocall failed, reason:" + r,
        type: o.callingErrors.AUTO_CALL_FAILED
      }), d = !1, n.get()._telemetryManager.setCommonProperty("autoCalling", !1));
    }, t.handleAutoCall = function () {
      var n = new Promise(function (n, r) {
        function a() {
          d = !0;
          S();
          n(e);
        }
        function l() {
          g(o.telemetry.autoCalling.ATTEMPT_TO_JOIN);
          d = !0;
          S();
          n(e);
        }
        function c() {
          g(o.telemetry.autoCalling.ATTEMPT_TO_JOIN);
          d = !0;
          n(e);
        }
        function p(t) {
          f.log("AutoCalling, waiting for participants, currently", e.participants().length);
          e.participants().length ? t() : (m.push(e.participants.subscribe()), m.push(e.participants.added(t)));
        }
        function y(e) {
          p(e);
        }
        function w(t) {
          f.log("AutoCalling, waiting for active audio", e.activeModalities.audio());
          m.push(e.activeModalities.audio.once(!0, t));
        }
        function E() {
          f.log("AutoCalling, handling in parent window, mode:", t.autoCallingMode());
          t.autoCallingMode() === o.autoCallingMode.call ? (p(function () {
            S();
            e._callHandler.hostCall(!0);
          }), c()) : t.autoCallingMode() === o.autoCallingMode.join ? (w(function () {
            S();
            e._callHandler.joinCall(!0);
          }), c()) : t.autoCallingMode() === o.autoCallingMode.golive && (e._callHandler.joinCall(!0), c());
        }
        function x() {
          f.log("AutoCalling, handling in shellapp, mode:", t.autoCallingMode(), "can host:", t.shellAppCanHost(), "can join", t.shellAppCanJoin());
          t.autoCallingMode() === o.autoCallingMode.call ? m.push(t.shellAppCanHost.once(!0, l)) : t.autoCallingMode() === o.autoCallingMode.join ? m.push(t.shellAppCanJoin.once(!0, l)) : t.autoCallingMode() === o.autoCallingMode.golive && m.push(t.shellAppCanJoin.once(!0, l));
        }
        function T() {
          f.log("AutoCalling, handling standard plugin call, mode:", t.autoCallingMode());
          t.autoCallingMode() === o.autoCallingMode.call ? y(l) : t.autoCallingMode() === o.autoCallingMode.join ? w(l) : t.autoCallingMode() === o.autoCallingMode.golive && l();
        }
        function N() {
          return s.get().isPluginlessCallingSupported() && e.selfParticipant.audio.state.reason === u.callDisconnectionReason.OutOfBrowserCall;
        }
        if (!i.isFeatureOn(o.featureFlags.AUTO_CALLING)) {
          f.log("AutoCalling is disabled, return conversation");
          a();
          return;
        }
        if (!e.autoCall()) {
          a();
          return;
        }
        v = r;
        f.log("AutoCalling handling, autoCall:", e.autoCall(), ", mode:", t.autoCallingMode());
        e.autoCall() && (h.shellApp ? (x(), b()) : N() || !s.get().isInBrowserCallingSupported() ? E() : s.get().isInBrowserCallingSupported() && (T(), b()));
      });
      return n.catch(function (e) {
        g(o.telemetry.autoCalling.AUTO_CALL_HANDLING_ERROR);
        f.error("Error while handling auto calling promise:", e);
      }), n;
    }, t.setupAutoCallTelemetry = function () {
      n.get()._telemetryManager.setCommonProperty("autoCalling", t.partnerId());
      n.get()._telemetryManager.setCommonProperty("autoCallId", t.callId());
      n.get()._telemetryManager.setCommonProperty("autoCallMode", t.autoCallingMode());
    }, t.setupMeeting = function (e, n) {
      var r;
      if (!i.isFeatureOn(o.featureFlags.AUTO_CALLING)) {
        f.log("AutoCalling is disabled");
        return;
      }
      if (p || h.shellApp) {
        f.warn("Cant update meeting details, previous message was handled or in shell app");
        return;
      }
      try {
        r = JSON.parse(n);
      } catch (s) {
        g(o.telemetry.autoCalling.AUTO_CALL_PAYLOAD_INVALID);
        f.log("Unable to parse autoCallPayload", n);
        return;
      }
      if (!x(e))
        return !1;
      f.log("Setup autoCalling", e.conversationId, r);
      p = !0;
      t.partnerId(r.PartnerService);
      t.autoCallingMode(r.Mode);
      t.callId(r.CallId);
      t.setupAutoCallTelemetry();
      e.autoCall(!0);
      r.Mode === o.autoCallingMode.call ? (g(o.telemetry.autoCalling.HOST_JOINED), e.selfParticipant.audio.state.once(u.callConnectionState.Connecting, function () {
        E(e, r);
      })) : g(o.telemetry.autoCalling.PARTICIPANT_JOINED);
    }, t;
  }
  var n = e("jSkype/client"), r = e("jSkype/services/callController"), i = e("jSkype/settings"), s = e("utils/calling/callingStack"), o = e("constants/common"), u = e("swx-enums"), a = e("swx-utils-common").sessionStorage, f = e("jSkype/telemetry/logging/callingLogTracer").get(), l = e("jcafe-property-model"), c = e("reqwest"), h = e("browser/window");
  t.build = function (e) {
    return new p(e);
  };
});

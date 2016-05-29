define("jSkype/services/outOfBrowser/outOfBrowserCallHandler", [
  "require",
  "exports",
  "module",
  "jSkype/services/outOfBrowser/outOfBrowserFacade",
  "constants/outOfBrowser",
  "jcafe-property-model",
  "browser/detect",
  "swx-enums",
  "constants/common",
  "constants/extension",
  "jSkype/settings",
  "utils/calling/callingStack",
  "jSkype/modelHelpers/participantHelper",
  "jSkype/telemetry/logging/callingLogTracer",
  "browser/window"
], function (e, t) {
  function m(e) {
    var t = this, n = !1, r = b(), s = f.isFeatureOn(u.featureFlags.PSTN_ENABLED);
    t.placeCall = function (n) {
      p.log("[OutOfBrowserCallHandler] placeCall");
      var i = {
        conversation: e,
        withVideo: n
      };
      s && !e.isGroupConversation() ? i.endpoint = e.participants(0).audio.endpoint() : e.isGroupConversation() && e.activeModalities.audio() && (i.callHostId = e._callHostId, i.accessToken = e._callPayload.AccessToken);
      var f = r.start(i);
      return f.catch(function (t) {
        if (t && t.type === u.callingErrors.AUTO_CALL_FAILED) {
          p.log("[OutOfBrowserCallHandler] Auto call failed, ignore");
          return;
        }
        var n = l.get().isPluginlessCallingSupported() ? o.callDisconnectionReason.OutOfBrowserCall : "";
        c.handleParticipantLeavingStateTransition(e.selfParticipant, n);
        (t === a.ERRORS.MISSING_EXTENSION || t === a.ERRORS.MISSING_PLUGIN) && g();
      }), f;
    };
    t.hostCall = function (n) {
      p.log("[OutOfBrowserCallHandler] hostCall");
      var i = {
        conversation: e,
        withVideo: n
      };
      return r.hostCall(i);
    };
    t.joinCall = function (n) {
      p.log("[OutOfBrowserCallHandler] joinCall");
      var i = {
        conversation: e,
        withVideo: n
      };
      return e.isGroupConversation() && e.activeModalities.audio() && (i.callHostId = e._callHostId, i.accessToken = e._callPayload.AccessToken), r.joinCall(i);
    };
    t.acceptCall = function (i) {
      return p.log("[OutOfBrowserCallHandler] acceptCall"), n = !0, r.accept(e, i);
    };
    t.endCall = r.stop;
    t.cancelCall = r.cancel;
    t.requestCallInfo = function () {
      p.log("[OutOfBrowserCallHandler] requestCallInfo");
      var t = i.task(), n = e._callData.oncePluginCallInfoReady(function () {
          d.clearTimeout(s);
          t.resolve(e._callData.pluginCallInfo());
        }), s = d.setTimeout(function () {
          n.dispose();
          t.reject("Call info request timeout");
        }, 5000);
      return r.requestCallInfo().catch(function () {
        n.dispose();
        d.clearTimeout(s);
        t.reject("Shell app not initialized");
      }), t.promise;
    };
    t.mute = function () {
      return p.log("[OutOfBrowserCallHandler] mute"), t.toggleMuteTask && t.toggleMuteTask.promise.state() === "pending" ? t.toggleMuteTask.promise : (t.toggleMuteTask = i.task(), r.mute(), t.toggleMuteTask.promise);
    };
    t.unmute = function () {
      return p.log("[OutOfBrowserCallHandler] unmute"), t.toggleMuteTask && t.toggleMuteTask.promise.state() === "pending" ? t.toggleMuteTask.promise : (t.toggleMuteTask = i.task(), r.unmute(), t.toggleMuteTask.promise);
    };
    t.acknowledge = function () {
      p.log("[OutOfBrowserCallHandler] acknowledge");
      if (!n && e.selfParticipant.audio.state() === o.callConnectionState.Disconnected)
        return p.log("[OutOfBrowserCallHandler] acknowledge, first payload, setting Notified state"), c.updateParticipantAudioVideoState(e.selfParticipant, o.callConnectionState.Notified, o.callDisconnectionReason.OutOfBrowserCall), !0;
      if (n && e.selfParticipant.audio.state() === o.callConnectionState.Notified)
        return p.log("[OutOfBrowserCallHandler] acknowledge, call is connecting, updating payload"), r.updateIncomingCallPayload(e);
      p.log("[OutOfBrowserCallHandler] acknowledge, call not yet accepted/rejected, ignore update");
      return;
    };
    t.rejectCall = function () {
      return p.log("[OutOfBrowserCallHandler] rejectCall"), c.handleParticipantLeavingStateTransition(e.selfParticipant, o.callDisconnectionReason.Busy), c.handleRemoteParticipantsLeavingStateTransition(e.participants()), Promise.resolve();
    };
    t.startParticipantVideo = y;
    t.stopParticipantVideo = y;
    t.attachParticipantVideo = y;
    t.detachParticipantVideo = y;
    t.dispose = y;
    t.setSoundLevelEventMode = y;
  }
  function g() {
    p.log("[OutOfBrowserCallHandler] dispose");
    v && (v.dispose({ preventReinitialisation: !0 }), v = null);
  }
  function y() {
    return Promise.resolve();
  }
  function b() {
    if (v)
      return v;
    var e = w(), t = f.settings.environment || h, r = f.settings.initParams.locale;
    return v = n.build(e, t, r), v.initialize(), v;
  }
  function w() {
    var e = s.getBrowserInfo().getUrlParams().ecsoverride || E(), t = S() + "?apiKey=" + f.settings.initParams.apiKey + "&fingerprint=" + f.settings.initParams.fingerprint;
    return e && (t += "&ecsoverride=" + e), t;
  }
  function E() {
    var e = document.cookie.match(/ecsoverride=(.*?)(;|$)/);
    return e && e.length > 1 ? e[1] : undefined;
  }
  function S() {
    return f.settings.appBaseUrl + r.shellAppIndexPagePath;
  }
  var n = e("jSkype/services/outOfBrowser/outOfBrowserFacade"), r = e("constants/outOfBrowser"), i = e("jcafe-property-model"), s = e("browser/detect"), o = e("swx-enums"), u = e("constants/common"), a = e("constants/extension"), f = e("jSkype/settings"), l = e("utils/calling/callingStack"), c = e("jSkype/modelHelpers/participantHelper"), h = "prod", p = e("jSkype/telemetry/logging/callingLogTracer").get(), d = e("browser/window"), v;
  t.initialize = function () {
    if (!f.isFeatureOn(u.featureFlags.PRELOAD_SHELL_APP))
      return;
    b();
  };
  t.dispose = g;
  t.build = function (t) {
    return new m(t);
  };
});

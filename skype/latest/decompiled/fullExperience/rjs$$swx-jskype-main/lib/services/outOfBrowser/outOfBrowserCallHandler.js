(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/outOfBrowser/outOfBrowserCallHandler", [
      "require",
      "exports",
      "../../../lib/services/outOfBrowser/outOfBrowserFacade",
      "swx-constants",
      "jcafe-property-model",
      "swx-browser-detect",
      "swx-enums",
      "swx-constants",
      "../../../lib/services/outOfBrowser/extension",
      "jskype-settings-instance",
      "../../../lib/modelHelpers/calling/participantHelper",
      "../../../lib/telemetry/logging/callingLogTracer",
      "swx-browser-globals"
    ], e);
}(function (e, t) {
  function g() {
    if (!f.isFeatureOn(u.COMMON.featureFlags.PRELOAD_SHELL_APP))
      return;
    w();
  }
  function y() {
    d.log("[OutOfBrowserCallHandler] dispose");
    v && (v.dispose({ preventReinitialisation: !0 }), v = null);
  }
  function b() {
    return Promise.resolve();
  }
  function w() {
    if (v)
      return v;
    var e = E(), t = f.settings.environment || p, r = f.settings.initParams.locale;
    return v = n.build(e, t, r), v.initialize(), v;
  }
  function E() {
    var e = s["default"].getBrowserInfo().getUrlParams().ecsoverride || S(), t = x() + "?apiKey=" + f.settings.initParams.apiKey + "&fingerprint=" + f.settings.initParams.fingerprint;
    return e && (t += "&ecsoverride=" + e), t;
  }
  function S() {
    var e = document.cookie.match(/ecsoverride=(.*?)(;|$)/);
    return e && e.length > 1 ? e[1] : undefined;
  }
  function x() {
    return f.settings.appBaseUrl + r.OUT_OF_BROWSER.shellAppIndexPagePath;
  }
  function T(e) {
    return new m(e);
  }
  var n = e("../../../lib/services/outOfBrowser/outOfBrowserFacade"), r = e("swx-constants"), i = e("jcafe-property-model"), s = e("swx-browser-detect"), o = e("swx-enums"), u = e("swx-constants"), a = e("../../../lib/services/outOfBrowser/extension"), f = e("jskype-settings-instance"), l = e("../../../lib/modelHelpers/calling/participantHelper"), c = e("../../../lib/telemetry/logging/callingLogTracer"), h = e("swx-browser-globals"), p = "prod", d = c.get(), v, m = function () {
      function e(e) {
        var t = this;
        this.isPstnEnabled = f.isFeatureOn(u.COMMON.featureFlags.PSTN_ENABLED);
        this.startScreenSharing = b;
        this.stopScreenSharing = b;
        this.attachParticipantVideo = b;
        this.detachParticipantVideo = b;
        this.dispose = b;
        this.setSoundLevelEventMode = b;
        this.placeCall = function (e) {
          d.log("[OutOfBrowserCallHandler] placeCall");
          var n = {
            conversation: t.conversation,
            withVideo: e
          };
          t.isPstnEnabled && !t.conversation.isGroupConversation() ? n.endpoint = t.conversation.participants(0).audio.endpoint() : t.conversation.isGroupConversation() && t.conversation.activeModalities.audio() && (n.callHostId = t.conversation._callHostId, n.accessToken = t.conversation._callPayload.AccessToken);
          var r = t.outOfBrowserFacade.start(n);
          return r["catch"](function (e) {
            if (e && e.type === u.COMMON.callingErrors.AUTO_CALL_FAILED) {
              d.log("[OutOfBrowserCallHandler] Auto call failed, ignore");
              return;
            }
            l.handleParticipantLeavingStateTransition(t.conversation.selfParticipant);
            (e === a.extensionConstants.ERRORS.MISSING_EXTENSION || e === a.extensionConstants.ERRORS.MISSING_PLUGIN) && y();
          }), r;
        };
        this.joinCall = function (e) {
          d.log("[OutOfBrowserCallHandler] joinCall");
          var n = {
            conversation: t.conversation,
            withVideo: e
          };
          return t.conversation.isGroupConversation() && t.conversation.activeModalities.audio() && (n.callHostId = t.conversation._callHostId, n.accessToken = t.conversation._callPayload.AccessToken), t.outOfBrowserFacade.joinCall(n);
        };
        this.acceptCall = function (e) {
          return d.log("[OutOfBrowserCallHandler] acceptCall"), t.outOfBrowserFacade.accept(t.conversation, e);
        };
        this.extendCall = function (e) {
          return Promise.resolve();
        };
        this.endCall = function () {
          return t.outOfBrowserFacade.stop();
        };
        this.cancelCall = function () {
          return t.outOfBrowserFacade.cancel();
        };
        this.requestCallInfo = function () {
          d.log("[OutOfBrowserCallHandler] requestCallInfo");
          var e = i.task(), n = t.conversation._callData.oncePluginCallInfoReady(function () {
              h.getWindow().clearTimeout(r);
              e.resolve(t.conversation._callData.pluginCallInfo());
            }), r = h.getWindow().setTimeout(function () {
              n.dispose();
              e.reject("Call info request timeout");
            }, 5000);
          return t.outOfBrowserFacade.requestCallInfo()["catch"](function () {
            n.dispose();
            h.getWindow().clearTimeout(r);
            e.reject("Shell app not initialized");
          }), e.promise;
        };
        this.mute = function () {
          return d.log("[OutOfBrowserCallHandler] mute"), t.toggleMuteTask && t.toggleMuteTask.promise.state() === "pending" ? t.toggleMuteTask.promise : (t.toggleMuteTask = i.task(), t.outOfBrowserFacade.mute(), t.toggleMuteTask.promise);
        };
        this.unmute = function () {
          return d.log("[OutOfBrowserCallHandler] unmute"), t.toggleMuteTask && t.toggleMuteTask.promise.state() === "pending" ? t.toggleMuteTask.promise : (t.toggleMuteTask = i.task(), t.outOfBrowserFacade.unmute(), t.toggleMuteTask.promise);
        };
        this.acknowledge = function () {
          return d.log("[OutOfBrowserCallHandler] acknowledge"), t.conversation.selfParticipant.audio.state() === o.callConnectionState.Disconnected ? (d.log("[OutOfBrowserCallHandler] acknowledge, setting Notified state"), l.updateParticipantAudioVideoState(t.conversation.selfParticipant, o.callConnectionState.Notified), d.log("[OutOfBrowserCallHandler] acknowledge, call is connecting, updating payload"), t.outOfBrowserFacade.updateIncomingCallPayload(t.conversation)) : (d.log("[OutOfBrowserCallHandler] acknowledge, call not yet accepted/rejected, ignore update"), Promise.resolve());
        };
        this.rejectCall = function () {
          return d.log("[OutOfBrowserCallHandler] rejectCall"), l.handleParticipantLeavingStateTransition(t.conversation.selfParticipant, o.callDisconnectionReason.Busy), l.handleRemoteParticipantsLeavingStateTransition(t.conversation.participants()), t.outOfBrowserFacade.reject(t.conversation);
        };
        this.sendDtmf = function (e) {
          return Promise.reject(new Error("not implemented"));
        };
        this.transferFrom = function (e) {
          return;
        };
        this.conversation = e;
        this.outOfBrowserFacade = w();
      }
      return e.prototype.isPluginless = function () {
        return !1;
      }, e;
    }();
  t.OutOfBrowserCallHandler = m;
  t.initialize = g;
  t.dispose = y;
  t.build = T;
}));

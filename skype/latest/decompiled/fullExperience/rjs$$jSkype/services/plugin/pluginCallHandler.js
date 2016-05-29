define("jSkype/services/plugin/pluginCallHandler", [
  "require",
  "exports",
  "module",
  "jSkype/settings",
  "constants/common",
  "constants/calling",
  "jSkype/utils/chat/conversation",
  "swx-enums",
  "jSkype/telemetry/logging/callingLogTracer",
  "jcafe-property-model",
  "jSkype/services/plugin/pluginLifecycleFacade",
  "jSkype/modelHelpers/participantHelper",
  "browser/window"
], function (e, t) {
  function h(e) {
    function m(t) {
      l.handleParticipantLeavingStateTransition(e.selfParticipant, t);
      l.handleRemoteParticipantsLeavingStateTransition(e.participants());
    }
    function g(e) {
      e && e.dispose();
    }
    function y(t) {
      u.log("[PluginCallHandler] handleConversationJoining", e.activeModalities.audio());
      e.activeModalities.audio() ? t.skypeCore.joinCall(e.conversationId, T(), e._callHostId, e._callPayload.AccessToken) : (N(o.callConnectionState.Disconnecting, o.callDisconnectionReason.Terminated), N(o.callConnectionState.Disconnected, o.callDisconnectionReason.Terminated));
    }
    function b(t) {
      e.selfParticipant.video.channels.added.off(b);
      !t.isStarted() && t.isStarted.set.enabled() && t.isStarted.set(!0);
    }
    function w(n) {
      u.log("[PluginCallHandler] join conversation, pluginOthersAreLive:", e._callData.pluginOthersAreLive());
      p = e._callData.pluginOthersAreLive.once(!0, y.bind(t, n));
    }
    function E(t) {
      u.log("[PluginCallHandler] handleAutoCall, mode", e._autoCallingService.autoCallingMode());
      e._autoCallingService.autoCallingMode() === r.autoCallingMode.join && (u.log("[PluginCallHandler] handleAutoCall, audio state", e.activeModalities.audio()), h = e.activeModalities.audio.once(!0, function () {
        w(t);
      }), e.autoCall.once(!1, h.dispose));
      (e._autoCallingService.autoCallingMode() === r.autoCallingMode.call || e._autoCallingService.autoCallingMode() === r.autoCallingMode.golive) && t.skypeCore.joinCall(e.conversationId, T());
    }
    function S() {
      e.selfParticipant.video.channels.added(b);
    }
    function x() {
      e.selfParticipant.video.channels.added.off(b);
    }
    function T() {
      return v && s.isPstnOnlyConversation(e) ? !1 : e.selfParticipant.video.channels(0) ? e.selfParticipant.video.channels(0).isStarted() : !1;
    }
    function N(t, n) {
      e.selfParticipant.audio.state._set(t, n);
      e.selfParticipant.video.state._set(t, n);
    }
    function C(e) {
      f.createPlugin().then(function (t) {
        t.skypeCore.muteMicrophone(e);
      }, I);
    }
    function k(e) {
      return t.toggleMuteTask && t.toggleMuteTask.promise.state() === "pending" ? t.toggleMuteTask.promise : (t.toggleMuteTask = a.task(), t.canToggleMute() ? C(e) : d = t.canToggleMute.once(!0, C.bind(null, e)), t.toggleMuteTask.promise);
    }
    function L(t) {
      return e.selfParticipant.person.id() === t;
    }
    function A(t) {
      e.selfParticipant.video.channels(0).stream.state._set(t);
    }
    function O(e) {
      return new Promise(function (t, n) {
        e === i.PLUGIN_MEDIA_TYPES.VIDEO && x();
        f.createPlugin().then(function (n) {
          n.videoManager.startSendingLocalVideo(e, t);
        }, function (e) {
          I(e);
          n(e);
        });
      });
    }
    function M(e) {
      return new Promise(function (t, n) {
        function s() {
          A(o.mediaStreamState.Stopped);
          t(!0);
        }
        function u() {
          t(!0);
        }
        if (F()) {
          t(!0);
          return;
        }
        var r;
        e === i.PLUGIN_MEDIA_TYPES.SCREEN_SHARING ? r = u : (x(), r = s);
        f.createPlugin().then(function (t) {
          t.videoManager.stopSendingLocalVideo(e, r);
        }, function (e) {
          I(e);
          n(e);
        });
      });
    }
    function _(t) {
      f.createPlugin().then(function (n) {
        n.videoManager.showLocalPreview(t, e.conversationId, function () {
          e.selfParticipant.audio.state() === o.callConnectionState.Connecting && A(o.mediaStreamState.Active);
        });
      }, I);
    }
    function D() {
      f.createPlugin().then(function (t) {
        t.videoManager.hideLocalPreview(e.conversationId);
      }, I);
    }
    function P(e, t, n) {
      f.createPlugin().then(function (r) {
        r.videoManager.showParticipant(e, t, n);
      }, I);
    }
    function H(e, t) {
      return new Promise(function (n, r) {
        f.createPlugin().then(function (r) {
          r.videoManager.hideParticipant(e, t, F());
          n(!0);
        }, function (e) {
          I(e);
          r(e);
        });
      });
    }
    function B() {
      var t = e.conversationId;
      return e.isGroupConversation() || (t = t.replace(/^\d+:/, "")), t;
    }
    function j(e) {
      if (!v)
        return;
      var t = {};
      return e.participants().forEach(function (e) {
        var n = e.person.id(), r = e.audio.endpoint();
        n !== r && (t[n] = r);
      }), t;
    }
    function F() {
      var t = e.selfParticipant.audio.state;
      return t.reason === o.callDisconnectionReason.CallEscalated && (t() === o.callConnectionState.Disconnecting || t() === o.callConnectionState.Disconnected);
    }
    function I(e) {
      u.log("[PluginCallHandler] Failed to create plugin:", e);
    }
    var t = this, h, p, d, v = n.isFeatureOn(r.featureFlags.PSTN_ENABLED);
    t.canToggleMute = a.property({ value: e._callData.pluginRingingForMe() });
    this.placeCall = function (t) {
      return u.log("[PluginCallHandler] place call", t), t && S(), f.createPlugin().then(function (t) {
        var n = j(e), r = [e.conversationId];
        u.log("[PluginCallHandler] placing call, plugin ready");
        u.log("[PluginCallHandler] isGroupConversation", e.isGroupConversation());
        u.log("[PluginCallHandler] autoCall", e.autoCall());
        u.log("[PluginCallHandler] activeModalities.audio", e.activeModalities.audio());
        e.isGroupConversation() ? e.autoCall() ? E(t) : e.activeModalities.audio() ? w(t) : t.skypeCore.placeCall(r, n, T()) : t.skypeCore.placeCall(r, n, T());
      });
    };
    this.acknowledge = function () {
      return f.createPlugin().then(function (t) {
        u.log("[PluginCallHandler:acknowledge]");
        if (e.selfParticipant.audio.state() === o.callConnectionState.Notified)
          u.log("[PluginCallHandler:acknowledge] state is Notified, do not pass payload to plugin"), e._callData.markAllIncomingPayloadsAsProcessed();
        else if (e._callData.pluginRingingForMe())
          u.log("[PluginCallHandler:acknowledge] plugin already ringing, updating state to Notified"), e._callData.pluginRingingForMe(!1), l.updateParticipantAudioVideoState(e.selfParticipant, o.callConnectionState.Notified), e._callData.markAllIncomingPayloadsAsProcessed();
        else if (e.selfParticipant.audio.state() === o.callConnectionState.Disconnected) {
          var n = B();
          u.log("[PluginCallHandler:acknowledge] processing incoming call");
          e._callData.getUnprocessedIncomingCallPayloads().forEach(function (e) {
            u.log("[awaitCall] payload: ", e);
            t.skypeCore.awaitCall(e.evt, n, e.convoCallId, e.nsp, e.body.gp);
          });
          e._callData.pluginAwaitCall(!0);
        }
      });
    };
    this.setSoundLevelEventMode = function (e) {
      function n(n) {
        return n.skypeCore.setSoundLevelEventMode(e, t.resolve.bind(t), t.reject.bind(t)), t.promise;
      }
      function r(e) {
        return I(e), t.reject(), t.promise;
      }
      var t = a.task();
      return f.createPlugin().then(n, r);
    };
    this.acceptCall = function (e) {
      return e && S(), f.createPlugin().then(function (e) {
        var t = B();
        e.skypeCore.acceptCall(t, T());
      });
    };
    this.rejectCall = function () {
      g(p);
      var e = B();
      return f.createPlugin().then(function (t) {
        t.skypeCore.rejectCall(e);
        m(o.callDisconnectionReason.Busy);
      }).catch(m.bind(null, o.callDisconnectionReason.Busy));
    };
    this.extendCall = function (e) {
      return f.createPlugin().then(function (t) {
        t.skypeCore.extendCall(e);
      });
    };
    this.endCall = function () {
      function t(e) {
        e.skypeCore.concludeCall();
        m();
      }
      g(p);
      var e = f.createPlugin().then(t).catch(m);
      return e;
    };
    this.cancelCall = function () {
      g(p);
      var t = a.task();
      return f.createPlugin().then(function (n) {
        return n.skypeCore.forgetCall(e._callData.getFirstPayload().convoCallId, t.resolve.bind(t), t.reject.bind(t)), t.promise;
      });
    };
    this.mute = function () {
      return k(!0);
    };
    this.unmute = function () {
      return k(!1);
    };
    this.sendDtmf = function (e) {
      var t = a.task();
      return f.createPlugin().then(function (n) {
        return n.skypeCore.sendDtmf(e, t.resolve.bind(t)), t.promise;
      });
    };
    this.startParticipantVideo = function (e, t) {
      return L(e) ? O(t) : Promise.resolve(!0);
    };
    this.stopParticipantVideo = function (e, t) {
      return L(e) ? M(t) : H(e, t);
    };
    this.attachParticipantVideo = function (e, t, n) {
      L(e) ? _(t) : P(e, t, n);
    };
    this.detachParticipantVideo = function (e, t) {
      L(e) ? D() : H(e, t);
    };
    this.getMonitorList = function () {
      return new Promise(function (e, t) {
        function n(n) {
          n.skypeCore.getMonitorList(e, t);
        }
        function r(e) {
          I(e);
          t(e);
        }
        f.createPlugin().then(n, r);
      });
    };
    this.setScreenCaptureMonitor = function (e) {
      return new Promise(function (t, n) {
        function r(r) {
          r.skypeCore.setScreenCaptureMonitor(e, t, n);
        }
        function i(e) {
          I(e);
          n(e);
        }
        f.createPlugin().then(r, i);
      });
    };
    this.requestCallInfo = function () {
      var t = a.task(), n = e._callData.oncePluginCallInfoReady(function () {
          c.clearTimeout(r);
          t.resolve(e._callData.pluginCallInfo());
        }), r = c.setTimeout(function () {
          n.dispose();
          t.reject("Call info request timeout");
        }, 5000);
      return f.createPlugin().then(function (e) {
        e.skypeCore.requestCallInfo(null, function () {
          n.dispose();
          c.clearTimeout(r);
          t.reject("Failed to send command to plugin");
        });
      }), t.promise;
    };
    this.dispose = function () {
      var n = F();
      t.canToggleMute(!1);
      t.toggleMuteTask = null;
      g(p);
      g(d);
      g(h);
      x();
      n || f.dispose(!1);
      e.mediaConnectionType(o.mediaConnectionType.Unknown);
    };
  }
  var n = e("jSkype/settings"), r = e("constants/common"), i = e("constants/calling"), s = e("jSkype/utils/chat/conversation"), o = e("swx-enums"), u = e("jSkype/telemetry/logging/callingLogTracer").get(), a = e("jcafe-property-model"), f = e("jSkype/services/plugin/pluginLifecycleFacade"), l = e("jSkype/modelHelpers/participantHelper"), c = e("browser/window");
  t.initialize = function () {
    if (!n.isFeatureOn(r.featureFlags.PRELOAD_PLUGIN))
      return;
    return f.initialize();
  };
  t.build = function (e) {
    return new h(e);
  };
});

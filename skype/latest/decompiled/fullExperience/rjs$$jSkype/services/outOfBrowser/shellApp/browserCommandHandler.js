define("jSkype/services/outOfBrowser/shellApp/browserCommandHandler", [
  "require",
  "exports",
  "module",
  "jcafe-property-model",
  "constants/outOfBrowser",
  "jSkype/telemetry/logging/callingLogTracer",
  "jSkype/services/callController",
  "jSkype/services/callRegister",
  "jSkype/modelHelpers/calling/pstnEventsHandler",
  "jSkype/services/outOfBrowser/shellApp/pstnEventsDispatcher",
  "jSkype/client",
  "jSkype/settings",
  "jSkype/modelHelpers/participantHelper",
  "swx-enums",
  "constants/common",
  "browser/window"
], function (e, t) {
  function v(e) {
    function b() {
      var e = o.get().activeCalls(), t = !1;
      return e.length === 0 && (t = !0), e.forEach(function (e) {
        e.selfParticipant.audio.state() === h.callConnectionState.Disconnected ? t = !0 : e.audioService.stop();
      }), t;
    }
    function w(e) {
      return e.contactsData && f.get().personsAndGroupsManager.all.persons().forEach(function (t) {
        try {
          e.contactsData[t.id()] && t.status._set(e.contactsData[t.id()].status);
        } catch (n) {
          i.warn("Unable to apply contact data");
        }
      }), m && (v = d.setTimeout(S, l.settings.shellApp.contactPollingInterval)), Promise.resolve();
    }
    function E() {
      d.clearTimeout(v);
      m = !1;
    }
    function S() {
      e.sendCommand({
        name: r.commands.CONTACTS_DATA_REQUEST,
        type: r.commandTypes.REQUEST
      });
    }
    function x(e) {
      return f.get()._telemetryManager.setCommonProperty("shellAppHost", e.shellAppHost), d.shellApp.invoke(r.shellAppMethods.ShowWindow), d.shellApp.addEventListener(r.shellAppEvents.WindowClosing, b), l.isFeatureOn(p.featureFlags.GVC_LOCAL_ESCALATION) && (m = !0, S()), n.task().resolve().promise;
    }
    function T() {
      return d.shellApp.removeEventListener(r.shellAppEvents.WindowClosing, b), d.shellApp.invoke(r.shellAppMethods.HideWindow), E(), n.task().resolve().promise;
    }
    function N(e) {
      return P().then(function () {
        var t = F(e.conversationId);
        return t._autoCallingService.shellAppCanHost(!0), Promise.resolve();
      });
    }
    function C(e) {
      return P().then(function () {
        var t = F(e.conversationId);
        return e.joinCall ? t._setCanJoinCall(!0, e.callHostId, { AccessToken: e.accessToken }) : t._setCanJoinCall(!1), t._autoCallingService.shellAppCanJoin(!0), Promise.resolve();
      });
    }
    function k(e) {
      return i.log("[BrowserCommandHelper] startHandler", e), P().then(function () {
        var t = F(e.conversationId), n = I(t, e.withVideo);
        return i.log("[BrowserCommandHelper] startHandler, conversation synced", t), g && H(e, t) && t.participants(0).audio.endpoint(e.endpoint), c.updateParticipantsAudioVideoState(t, h.callConnectionState.Disconnected), y.subscribeToConversation(t), e.autoCall ? (t._autoCallingService.autoCallingMode(e.autoCallMode), t._autoCallingService.partnerId(e.autoCallPartnerId), t._autoCallingService.callId(e.autoCallId), t._autoCallingService.setupAutoCallTelemetry(), t.autoCall(!0)) : e.joinCall ? t._setCanJoinCall(!0, e.callHostId, { AccessToken: e.accessToken }) : t._setCanJoinCall(!1), B(t), n.start();
      });
    }
    function L(e) {
      return i.log("[BrowserCommandHelper] acceptHandler", e), P().then(function () {
        function f() {
          r.accept();
          o.resolve();
        }
        function l(e) {
          e !== h.callDisconnectionReason.CallEscalated && M();
        }
        function c(e, t, n) {
          n && e === h.callConnectionState.Disconnected && (o.promise.state() === "pending" && (o.reject(t), l(t)), u && u.dispose(), a && a.dispose());
        }
        var t = F(e.conversationId), r = I(t, e.withVideo), o = n.task(), u, a;
        return i.log("[BrowserCommandHelper] acceptHandler, conversation synced", t), B(t), e.incomingCallData.length ? (u = t.selfParticipant.audio.state.once(h.callConnectionState.Notified, f), a = t.selfParticipant.audio.state.changed(c), e.incomingCallData.forEach(function (e) {
          s.handleIncoming(e).catch(o.reject.bind(o));
        })) : o.reject(), o.promise;
      });
    }
    function A(e) {
      return P().then(function () {
        return e.incomingCallData.forEach(function (e) {
          s.handleIncoming(e);
        }), Promise.resolve();
      });
    }
    function O(e) {
      return function (n) {
        var r = F(n.conversationId);
        return r.selfParticipant.audio.isMuted.set(e);
      };
    }
    function M() {
      E();
      d.shellAppInfo.supportsPreloading ? d.shellApp.invoke(r.shellAppMethods.HideWindow) : d.shellApp.invoke(r.shellAppMethods.CloseWindow);
    }
    function _(e) {
      d.shellApp.removeEventListener(r.shellAppEvents.WindowClosing, b);
      var t = F(e.conversationId);
      return y.dispose(), t.audioService.stop();
    }
    function D(e) {
      var t = F(e.conversationId);
      return t._callHandler ? t._callHandler.requestCallInfo() : Promise.reject();
    }
    function P() {
      return f.get().conversationsManager._conversationsSynced.promise;
    }
    function H(e, t) {
      return e.endpoint && e.endpoint !== t.conversationId && !t.isGroupConversation();
    }
    function B(t) {
      function n(u, a, f) {
        if (!f)
          return;
        if (u === h.callConnectionState.Notified)
          return;
        u === h.callConnectionState.Disconnecting && j() && (a = h.callDisconnectionReason.MissingSpeaker);
        u === h.callConnectionState.Disconnected && (t.selfParticipant.audio.state.changed.off(n), t.selfParticipant.audio.isMuted.changed.off(i), t.spawnedConversation.changed.off(s), t.spawnedConversation._set(undefined), t._callData.pluginCallInfo.changed.off(o));
        e.sendCommand({
          name: r.commands.CHANGE_STATE,
          type: r.commandTypes.REQUEST,
          data: {
            state: u,
            conversationId: t.conversationId,
            reason: a
          }
        });
      }
      function i(n) {
        var i;
        if (n === undefined)
          return;
        n ? i = r.commands.MUTE : i = r.commands.UNMUTE;
        e.sendCommand({
          name: i,
          type: r.commandTypes.REQUEST,
          data: { conversationId: t.conversationId }
        });
      }
      function s(n) {
        e.sendCommand({
          name: r.commands.ESCALATE_CONVERSATION,
          type: r.commandTypes.REQUEST,
          data: {
            newConversationId: n.conversationId,
            oldConversationId: t.conversationId
          }
        });
        B(n);
      }
      function o() {
        e.sendCommand({
          name: r.commands.CALL_INFO,
          type: r.commandTypes.REQUEST,
          data: {
            conversationId: t.conversationId,
            messageBody: t._callData.pluginCallInfo()
          }
        });
      }
      t.selfParticipant.audio.state.changed(n);
      t.selfParticipant.audio.isMuted.changed(i);
      t.spawnedConversation.changed(s);
      t._callData.pluginCallInfo.changed(o);
    }
    function j() {
      var e = f.get().devicesManager;
      return e._initializedDevices && e.speakers().length === 0;
    }
    function F(e) {
      var t = f.get().conversationsManager._getOrCreateConversation(e);
      return f.get().conversationsManager.conversations.add(t), t;
    }
    function I(e, t) {
      var n;
      return t ? n = e.videoService : n = e.audioService, n;
    }
    function q(e) {
      var t = e.settingsType, n = e.value;
      f.get().personsAndGroupsManager.mePerson.preferences(t).value.set(n);
    }
    var t, v, m, g = l.isFeatureOn(p.featureFlags.PSTN_ENABLED), y = u.build(new a(e));
    t = {
      show: x,
      hide: T,
      start: k,
      hostCall: N,
      joinCall: C,
      accept: L,
      updateIncomingCallPayload: A,
      mute: O(!0),
      unmute: O(!1),
      stop: _,
      callInfo: D,
      contactsData: w,
      settings: q
    };
    e.registerCommandHandler(r.commands.SHOW, t.show);
    e.registerCommandHandler(r.commands.HIDE, t.hide);
    e.registerCommandHandler(r.commands.START, t.start);
    e.registerCommandHandler(r.commands.HOST_CALL, t.hostCall);
    e.registerCommandHandler(r.commands.JOIN_CALL, t.joinCall);
    e.registerCommandHandler(r.commands.ACCEPT, t.accept);
    e.registerCommandHandler(r.commands.UPDATE_INCOMING_PAYLOAD, t.updateIncomingCallPayload);
    e.registerCommandHandler(r.commands.MUTE, t.mute);
    e.registerCommandHandler(r.commands.UNMUTE, t.unmute);
    e.registerCommandHandler(r.commands.STOP, t.stop);
    e.registerCommandHandler(r.commands.CALL_INFO, t.callInfo);
    e.registerCommandHandler(r.commands.CONTACTS_DATA_RESPONSE, t.contactsData);
    e.registerCommandHandler(r.commands.SETTINGS_UPDATE, t.settings);
  }
  var n = e("jcafe-property-model"), r = e("constants/outOfBrowser"), i = e("jSkype/telemetry/logging/callingLogTracer").get(), s = e("jSkype/services/callController"), o = e("jSkype/services/callRegister"), u = e("jSkype/modelHelpers/calling/pstnEventsHandler"), a = e("jSkype/services/outOfBrowser/shellApp/pstnEventsDispatcher"), f = e("jSkype/client"), l = e("jSkype/settings"), c = e("jSkype/modelHelpers/participantHelper"), h = e("swx-enums"), p = e("constants/common"), d = e("browser/window");
  t.build = function (e) {
    return new v(e);
  };
});

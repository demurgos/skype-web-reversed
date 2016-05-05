define("jSkype/services/outOfBrowser/outOfBrowserFacade", [
  "require",
  "exports",
  "module",
  "jSkype/client",
  "browser/detect",
  "jSkype/settings",
  "jSkype/services/callController",
  "constants/common",
  "jSkype/modelHelpers/calling/escalationHelper",
  "swx-enums",
  "jSkype/services/outOfBrowser/extensionLifecycleFacade",
  "constants/outOfBrowser",
  "utils/common/version"
], function (e, t) {
  function h(e, t, h) {
    function w() {
      return v || (v = n.get().signInManager._skypeToken().then(function (e) {
        return S(l.commands.INIT, {
          token: e,
          environment: t,
          locale: h
        });
      })), v;
    }
    function E(e) {
      var t = w(), n = { shellAppHost: r.getBrowserInfo().browserName };
      return e.initializesAsHidden && (t = t.then(S.bind(null, l.commands.SHOW, n))), t;
    }
    function S(e, t) {
      var n = [
          l.commands.HOST_CALL,
          l.commands.JOIN_CALL,
          l.commands.START,
          l.commands.ACCEPT,
          l.commands.STOP,
          l.commands.MUTE,
          l.commands.UNMUTE,
          l.commands.CALL_INFO
        ], r = n.indexOf(e) >= 0;
      return t = t || {}, r && (t.conversationId = d.conversationId), p.getMessagingChannel().then(function (n) {
        return n.sendCommand(e, t);
      });
    }
    function x(e) {
      d = e, d.selfParticipant.audio.state.changed(C);
    }
    function T(e) {
      function f() {
        n({
          version: e,
          initializesAsHidden: u
        });
      }
      var t, n, r = c.parse(e), s = c.parse(l.shellAppPreloadEnabledVersion), u = r.compareTo(s) >= 0, a = u && i.isFeatureOn(o.featureFlags.PRELOAD_SHELL_APP);
      return t = new Promise(function (e) {
        n = e;
      }), a ? w().then(f) : f(), t;
    }
    function N() {
      if (i.isFeatureOn(o.featureFlags.PERSISTENT_SHELL_APP))
        return;
      y.dispose();
    }
    function C(e, t, n) {
      n && e === a.callConnectionState.Disconnected && (d.selfParticipant.audio.state.changed.off(C), d = null);
    }
    function k(e, t) {
      s.setupCall(t), u.escalateCall(e, t), x(t);
    }
    function L(e) {
      var t = n.get().conversationsManager.conversations(e.oldConversationId), r = n.get().conversationsManager.conversations(e.newConversationId);
      if (!r)
        var i = n.get().conversationsManager.conversations.added(function (n) {
          n.conversationId === e.newConversationId && (k(t, n), i.dispose());
        });
      else
        k(t, r);
    }
    function A() {
      if (!i.isFeatureOn(o.featureFlags.SKYPE_VIDEO_CALLING_POLICY_SUPPORT))
        return;
      g || (g = n.get().personsAndGroupsManager.mePerson.preferences(b).value.changed(O));
    }
    function O(e) {
      y.updateSettings(b, e);
    }
    var p, d, v, m, g, y = this, b = o.userSettings.preferences.SKYPE_VIDEO_CALLING_POLICY_SUPPORT;
    y.initialize = function () {
      return m || (p = f.build(e), p.onExtensionDisconnected(y.dispose), p.onShellAppWindowHidden(N), p.onShellAppCallEscalated(L), m = p.getVersion().then(T)), m;
    }, y.start = function (e) {
      return x(e.conversation), y.initialize().then(E).then(A).then(function () {
        var t = Boolean(e.callHostId || e.accessToken), n = Boolean(e.conversation.autoCall()), r = e.conversation._autoCallingService.autoCallingMode(), i = e.conversation._autoCallingService.partnerId(), s = e.conversation._autoCallingService.callId();
        return S(l.commands.START, {
          withVideo: e.withVideo,
          joinCall: t,
          autoCall: n,
          autoCallMode: r,
          autoCallPartnerId: i,
          autoCallId: s,
          callHostId: e.callHostId,
          accessToken: e.accessToken,
          endpoint: e.endpoint
        });
      });
    }, y.hostCall = function (e) {
      return d || x(e.conversation), y.initialize().then(function () {
        return S(l.commands.HOST_CALL, {
          withVideo: e.withVideo,
          accessToken: e.accessToken,
          endpoint: e.endpoint
        });
      });
    }, y.joinCall = function (e) {
      return d || x(e.conversation), y.initialize().then(function () {
        var t = Boolean(e.callHostId || e.accessToken), n = Boolean(e.conversation.autoCall()), r = e.conversation._autoCallingService.autoCallingMode();
        return S(l.commands.JOIN_CALL, {
          withVideo: e.withVideo,
          joinCall: t,
          autoCall: n,
          autoCallMode: r,
          callHostId: e.callHostId,
          accessToken: e.accessToken,
          endpoint: e.endpoint
        });
      });
    }, y.accept = function (e, t) {
      return x(e), y.initialize().then(E).then(A).then(function () {
        return S(l.commands.ACCEPT, {
          incomingCallData: e._callData.getUnprocessedIncomingCallPayloads(),
          withVideo: t
        });
      });
    }, y.updateIncomingCallPayload = function (e) {
      return y.initialize().then(function () {
        return S(l.commands.UPDATE_INCOMING_PAYLOAD, { incomingCallData: e._callData.getUnprocessedIncomingCallPayloads() });
      });
    }, y.cancel = function () {
      return i.isFeatureOn(o.featureFlags.PRELOAD_SHELL_APP) ? y.initialize().then(function (e) {
        return e.initializesAsHidden ? S(l.commands.HIDE) : p.disconnect();
      }) : Promise.resolve();
    }, y.stop = function () {
      return S(l.commands.STOP);
    }, y.mute = function () {
      return S(l.commands.MUTE);
    }, y.unmute = function () {
      return S(l.commands.UNMUTE);
    }, y.requestCallInfo = function () {
      return d ? S(l.commands.CALL_INFO) : Promise.reject();
    }, y.updateSettings = function (e, t) {
      return S(l.commands.SETTINGS_UPDATE, {
        settingsType: e,
        value: t
      });
    }, y.dispose = function (e) {
      e = e || {}, v = null, m = null, p.onShellAppWindowHidden(null), p.onExtensionDisconnected(null), p.onShellAppCallEscalated(null), p.dispose(), d && (d.selfParticipant.audio.state.changed.off(C), d.selfParticipant.audio.state._set(a.callConnectionState.Disconnected)), !e.preventReinitialisation && i.isFeatureOn(o.featureFlags.PERSISTENT_SHELL_APP) && y.initialize(), g && g.dispose();
    };
  }
  var n = e("jSkype/client"), r = e("browser/detect"), i = e("jSkype/settings"), s = e("jSkype/services/callController"), o = e("constants/common"), u = e("jSkype/modelHelpers/calling/escalationHelper"), a = e("swx-enums"), f = e("jSkype/services/outOfBrowser/extensionLifecycleFacade"), l = e("constants/outOfBrowser"), c = e("utils/common/version");
  t.build = function (e, t, n) {
    return new h(e, t, n);
  };
})

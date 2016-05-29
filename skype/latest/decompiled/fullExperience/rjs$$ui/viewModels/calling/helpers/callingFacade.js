define("ui/viewModels/calling/helpers/callingFacade", [
  "require",
  "exports",
  "module",
  "services/pubSub/pubSub",
  "constants/calling",
  "services/calling/pluginInstall",
  "ui/viewModels/chat/navigationHelper",
  "swx-enums"
], function (e, t) {
  function u(e, t, n, r) {
    return a(e, t, n, r).catch(function (i) {
      return l(i, e, t, n, r);
    });
  }
  function a(e, t, n, r) {
    return i.isPluginInstalled(e, t).then(function (i) {
      return i ? f(e, t, n).then(function () {
        r && s.navigateToConversation(e, n);
      }) : c(e, t, !0, "outgoing", n, r);
    });
  }
  function f(e, t, i) {
    return n.publish(r.EVENTS.START_CALL, {
      conversation: e,
      isVideo: t,
      source: i
    }), t ? e.videoService.start() : e.audioService.start();
  }
  function l(e, t, n, i, s) {
    return t.selfParticipant.audio.state.reason === o.callDisconnectionReason.OutOfBrowserCall && e.message === r.ERRORS.P2P_FALLBACK ? a(t, n, i, s) : Promise.reject(e);
  }
  function c(e, t, n, o, u, a) {
    return new Promise(function (l, c) {
      function h(n, i) {
        if (e && i && n === r.PLUGIN_INSTALL_EXIT_METHOD.CALL_STARTED) {
          var o = f(e, t, "pluginInstallCallback");
          a && s.navigateToConversation(e, u);
          l(o);
        } else
          c(Error("Plugin install result: " + i + ", exitMethod: " + n));
      }
      i.startInstallFlow(o, {
        isOutgoing: n,
        conversation: e,
        isVideo: t,
        done: h
      });
    });
  }
  var n = e("services/pubSub/pubSub"), r = e("constants/calling"), i = e("services/calling/pluginInstall"), s = e("ui/viewModels/chat/navigationHelper"), o = e("swx-enums");
  t.placeCall = function (e, t, n, r) {
    return u(e, t, n, r);
  };
  t.acceptCall = function (e, t) {
    n.publish(r.EVENTS.ANSWER, {
      conversation: e,
      isVideo: t
    });
    t && e.videoService.accept.enabled() ? e.videoService.accept() : e.audioService.accept();
  };
  t.rejectCall = function (e) {
    n.publish(r.EVENTS.REJECT, { conversation: e });
    e.audioService.reject();
  };
  t.installPlugin = function (e, t, n, r) {
    r = r || !1;
    c(t, r, n, e);
  };
});

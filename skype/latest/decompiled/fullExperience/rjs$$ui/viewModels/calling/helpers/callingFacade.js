define("ui/viewModels/calling/helpers/callingFacade", [
  "require",
  "exports",
  "module",
  "swx-constants",
  "swx-constants",
  "swx-util-calling-stack",
  "swx-enums",
  "ui/viewModels/chat/navigationHelper",
  "services/calling/pluginInstall",
  "swx-pubsub-instance",
  "ui/controls/calling/sounds",
  "swx-cafe-application-instance",
  "swx-service-locator-instance",
  "ui/calling/unansweredCallHandler"
], function (e, t) {
  function p(e, t, r, i) {
    return a.publish(n.EVENTS.START_CALL, {
      conversation: e,
      isVideo: t,
      source: r
    }), h.callStarting(t), f.playLoop(f.KEYS.CALL_CONNECTING), i && o.navigateToConversation(e, r), t ? e.videoService.start() : e.audioService.start();
  }
  function d(e, t) {
    return a.publish(n.EVENTS.ANSWER, {
      conversation: e,
      isVideo: t
    }), t && e.videoService.accept.enabled() ? e.videoService.accept() : e.audioService.accept();
  }
  function v(e, t, n, r) {
    return u.isPluginInstalled(e, t).then(function (i) {
      return i ? p(e, t, n, r) : m(e, t, !0, "outgoing", n, r);
    });
  }
  function m(e, t, i, a, f, h) {
    var v = l.get().personsAndGroupsManager.mePerson.capabilities.audio.reason, m = c.resolve(r.serviceLocator.FEATURE_FLAGS), g = v === s.callingNotSupportedReasons.PluginBlocked;
    return !m.isFeatureOn(r.featureFlags.ASK_TO_UNBLOCK_PLUGIN) && g ? Promise.reject(Error(s.callingNotSupportedReasons.PluginBlocked)) : new Promise(function (r, l) {
      function c(i, u) {
        if (e && u && i === n.PLUGIN_INSTALL_EXIT_METHOD.CALL_STARTED) {
          var a;
          e.selfParticipant.audio.state() === s.callConnectionState.Notified ? a = d(e, t) : a = p(e, t, "pluginInstallCallback");
          h && o.navigateToConversation(e, f);
          r(a);
        } else
          l(Error("Plugin install result: " + u + ", exitMethod: " + i));
      }
      u.startInstallFlow(a, {
        isOutgoing: i,
        conversation: e,
        isVideo: t,
        done: c,
        onlyUnblock: g
      });
    });
  }
  var n = e("swx-constants").CALLING, r = e("swx-constants").COMMON, i = e("swx-util-calling-stack"), s = e("swx-enums"), o = e("ui/viewModels/chat/navigationHelper"), u = e("services/calling/pluginInstall"), a = e("swx-pubsub-instance").default, f = e("ui/controls/calling/sounds"), l = e("swx-cafe-application-instance"), c = e("swx-service-locator-instance").default, h = e("ui/calling/unansweredCallHandler");
  t.placeCall = function (e, t, n, r) {
    return f.playOnce(f.KEYS.CALL_DIALING), i.get().isPluginlessCallingSupported() ? p(e, t, n, r) : v(e, t, n, r);
  };
  t.acceptCall = d;
  t.rejectCall = function (e) {
    a.publish(n.EVENTS.REJECT, { conversation: e });
    e.audioService.reject();
  };
  t.installPlugin = function (e, t, n, r) {
    r = r || !1;
    m(t, r, n, e);
  };
});

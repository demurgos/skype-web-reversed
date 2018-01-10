define("notifications/modelObservers/incomingCallObserver", [
  "require",
  "notifications/factory",
  "swx-enums",
  "swx-constants",
  "notifications/common/notificationHub",
  "swx-browser-detect",
  "ui/telemetry/telemetryClient",
  "experience/settings",
  "swx-service-locator-instance",
  "notifications/settings"
], function (e) {
  function l() {
    function v(e) {
      var t = x(e);
      t.audioStateChangeSubscription = e.selfParticipant.audio.state.changed(function (t, n, r) {
        g(e, t, n, r);
      });
    }
    function m(e) {
      h.sendEvent(u.telemetry.uiTenantToken, r.telemetry.calling.MASTER_EVENT, e);
    }
    function g(e, t, n, r) {
      var i = {
        newValue: t,
        oldValue: r
      };
      if (s.getBrowserInfo().isShellApp)
        return;
      if (N(t) && !b()) {
        m({ name: "LocalUserOffline" });
        return;
      }
      if (N(t) && y()) {
        m({ name: "CallInProgress" });
        return;
      }
      N(t) && w(e);
      T(i) && S(e);
    }
    function y() {
      var e = a.resolve(r.serviceLocator.FEATURE_FLAGS).isFeatureOn(r.featureFlags.DISABLE_CONCURRENT_ACTIVE_CALLS), t = a.resolve(r.serviceLocator.MODEL_UI_OBSERVER).conversationsCallStateObserver;
      return e && t.activeCalls().length > 0 ? !0 : !1;
    }
    function b() {
      if (f.callNotificationsMuted())
        return !1;
      var e = l.mePerson.status();
      return p.isFeatureOn(r.featureFlags.USE_BUSINESS_WORDING) ? e !== n.onlineStatus.DoNotDisturb : e === n.onlineStatus.Online || e === n.onlineStatus.Away;
    }
    function w(e) {
      C(e).then(function (e) {
        E(e) || A(e);
      }).catch(function () {
        S(e);
      });
    }
    function E(e) {
      return e && e.active();
    }
    function S(e) {
      var t = x(e), n = t.notification;
      n && !n._keepActive && (n.active(!1), t.notification = null);
      d.onNotificationCanceled && d.onNotificationCanceled();
    }
    function x(t) {
      var n;
      for (var r = 0; r < e.length; r++) {
        n = e[r];
        if (n.conversation === t)
          return n;
      }
      return n = { conversation: t }, e.push(n), n;
    }
    function T(e) {
      return e.oldValue !== undefined && e.newValue === n.callConnectionState.Disconnected;
    }
    function N(e) {
      return e === n.callConnectionState.Notified;
    }
    function C(e) {
      var t = x(e);
      return t.notification && t.notification.active() ? Promise.resolve(t.notification) : k(e).then(function (e) {
        return t.notification = e, t.notification;
      });
    }
    function k(e) {
      var t = c.mediaCapabilities, r, i = n.callingNotSupportedReasons.PluginNotInstalled;
      return new Promise(function (n) {
        if (t.isPluginInstalled)
          t.isBrowserMediaSupported() || t.isPluginInstalled() ? (r = L(e, !0, i), n(r)) : t.isPluginInstalled.get().finally(function () {
            t.isPluginInstalled() ? (r = L(e, !0, i), n(r)) : (r = L(e, !1, i), n(r));
          });
        else {
          var s = e.audioService.accept.enabled();
          i = e.audioService.accept.enabled.reason;
          r = L(e, s, i);
          n(r);
        }
      });
    }
    function L(e, i, s) {
      var o, u = r.notifications.INCOMING_CALL, a = !1;
      if (!i)
        switch (s) {
        case n.callingNotSupportedReasons.PluginNotInstalled:
        case n.callingNotSupportedReasons.PluginBlocked:
          u = r.notifications.INCOMING_CALL_WITH_NO_PLUGIN;
          break;
        case n.callingNotSupportedReasons.BrowserNotSupported:
          u = r.notifications.INCOMING_CALL_BROWSER_NOT_SUPPORTED, a = !0;
          break;
        case n.callingNotSupportedReasons.OSNotSupported:
          u = r.notifications.INCOMING_CALL_OS_NOT_SUPPORTED, a = !0;
          break;
        default:
          u = r.notifications.INCOMING_CALL_OS_NOT_SUPPORTED;
        }
      return o = t.build(u, { conversation: e }), o._keepActive = a, o;
    }
    function A(e) {
      var t, n;
      n = e.active.subscribe(function (e) {
        e || n.dispose();
      });
      e.type === r.notifications.AUDIO ? e.sender.uri() ? i.notify(e) : t = e.sender.uri.subscribe(function (n) {
        n && (i.notify(e), t.dispose());
      }) : i.notify(e);
    }
    var e = [], l, c, h = o.get(), p = a.resolve(r.serviceLocator.FEATURE_FLAGS), d = this;
    this.observe = function (e) {
      e.conversationsManager.conversations.added(v);
      c = e.devicesManager;
      l = e.personsAndGroupsManager;
    };
    this.onNotificationCanceled = null;
  }
  var t = e("notifications/factory"), n = e("swx-enums"), r = e("swx-constants").COMMON, i = e("notifications/common/notificationHub"), s = e("swx-browser-detect").default, o = e("ui/telemetry/telemetryClient"), u = e("experience/settings"), a = e("swx-service-locator-instance").default, f = e("notifications/settings");
  return {
    build: function () {
      return new l();
    }
  };
});

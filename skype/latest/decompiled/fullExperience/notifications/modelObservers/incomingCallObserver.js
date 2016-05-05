define("notifications/modelObservers/incomingCallObserver", [
  "require",
  "notifications/factory",
  "swx-enums",
  "constants/common",
  "browser/window",
  "notifications/common/notificationHub",
  "browser/detect",
  "ui/telemetry/telemetryClient",
  "experience/settings"
], function (e) {
  function f() {
    function c(e) {
      var t = y(e);
      t.audioStateChangeSubscription = e.selfParticipant.audio.state.changed(function (t, n, r) {
        p(e, t, n, r);
      });
    }
    function h(e) {
      l.sendEvent(a.telemetry.uiTenantToken, r.telemetry.calling.MASTER_EVENT, e);
    }
    function p(e, t, n, r) {
      var i = {
        newValue: t,
        oldValue: r
      };
      if (o.getBrowserInfo().isShellApp)
        return;
      if (w(i) && !d()) {
        h({ name: "LocalUserOffline" }), e.audioService.reject();
        return;
      }
      w(i) && v(e), b(i) && g(e);
    }
    function d() {
      return f.mePerson.status() === n.onlineStatus.Online;
    }
    function v(e) {
      E(e).then(function (e) {
        m(e) || x(e);
      });
    }
    function m(e) {
      return e && e.active();
    }
    function g(e) {
      var t = y(e), n = t.notification;
      n && !n._keepActive && (n.active(!1), t.notification = null);
    }
    function y(t) {
      var n;
      for (var r = 0; r < e.length; r++) {
        n = e[r];
        if (n.conversation === t)
          return n;
      }
      return n = { conversation: t }, e.push(n), n;
    }
    function b(e) {
      return e.oldValue !== undefined && e.newValue === n.callConnectionState.Disconnected;
    }
    function w(e) {
      return e.newValue === n.callConnectionState.Notified;
    }
    function E(e) {
      var t = y(e);
      return t.notification && t.notification.active() ? Promise.resolve(t.notification) : S(e).then(function (e) {
        return t.notification = e, t.notification;
      });
    }
    function S(e) {
      var i, s = r.notifications.INCOMING_CALL, o = !1;
      return e.audioService.accept.enabled.get().then(function (u) {
        var a = e.audioService.accept.enabled.reason;
        if (!u)
          switch (a) {
          case n.callingNotSupportedReasons.PluginNotInstalled:
            s = r.notifications.INCOMING_CALL_WITH_NO_PLUGIN;
            break;
          case n.callingNotSupportedReasons.BrowserNotSupported:
            s = r.notifications.INCOMING_CALL_BROWSER_NOT_SUPPORTED, o = !0;
            break;
          case n.callingNotSupportedReasons.OSNotSupported:
            s = r.notifications.INCOMING_CALL_OS_NOT_SUPPORTED, o = !0;
            break;
          default:
            s = r.notifications.INCOMING_CALL_OS_NOT_SUPPORTED;
          }
        return i = t.build(s, { conversation: e }), i._keepActive = o, i;
      });
    }
    function x(e) {
      function u() {
        e.active() && (n.dispose(), e.decline());
      }
      var t, n, o = i.setTimeout(u, a.incomingCalls.notificationTimeout);
      n = e.active.subscribe(function (e) {
        e || (clearTimeout(o), n.dispose());
      }), e.type === r.notifications.AUDIO ? e.sender.uri() ? s.notify(e) : t = e.sender.uri.subscribe(function (n) {
        n && (s.notify(e), t.dispose());
      }) : s.notify(e);
    }
    var e = [], f, l = u.get();
    this.observe = function (e) {
      e.conversationsManager.conversations.added(c), f = e.personsAndGroupsManager;
    };
  }
  var t = e("notifications/factory"), n = e("swx-enums"), r = e("constants/common"), i = e("browser/window"), s = e("notifications/common/notificationHub"), o = e("browser/detect"), u = e("ui/telemetry/telemetryClient"), a = e("experience/settings");
  return {
    build: function () {
      return new f();
    }
  };
})

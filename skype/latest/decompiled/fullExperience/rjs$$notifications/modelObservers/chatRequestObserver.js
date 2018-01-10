define("notifications/modelObservers/chatRequestObserver", [
  "require",
  "notifications/factory",
  "swx-enums",
  "swx-constants",
  "ui/modelHelpers/conversationHelper",
  "notifications/settings",
  "notifications/common/notificationHub",
  "experience/settings",
  "browser/window",
  "swx-utils-common"
], function (e) {
  function l() {
    function e(e) {
      e.selfParticipant.chat.state.changed(function (t) {
        c(e, t);
      });
    }
    function l() {
      return !s.chatNotificationsMuted();
    }
    function c(e, t) {
      l() && t === n.callConnectionState.Notified && f.execute(function () {
        e.selfParticipant.audio.state() !== n.callConnectionState.Notified && h(e);
      }, 0);
    }
    function h(e) {
      function f() {
        s && s.dispose();
      }
      function l() {
        e.isGroupConversation() && e.meeting.state() === "Disconnected" ? n.decline() : n.active(!1);
      }
      var n = t.build(r.notifications.CHAT, { conversation: e }), s;
      n.sender.uri() ? o.notify(n) : s = n.sender.uri.subscribe(function (e) {
        e && (o.notify(n), f());
      });
      e.chatService.accept.enabled.once(!1, function () {
        function t(r) {
          var s = !1, o, f, c;
          if (!n.active()) {
            e.chatService.acceptType.changed.off(t);
            l();
            return;
          }
          switch (r) {
          case "AutoAccepted":
            e.chatService.acceptType.changed.off(t);
            if (!u.businessNotificationPersistence.persistWhenAutoAccepted.enabled) {
              l();
              break;
            }
            s = !0, o = u.businessNotificationPersistence.persistWhenAutoAccepted.timeout, i.isConversationWithWelcomeAgent(e) && (o = u.welcomeExperience.toastPersistenceTimeout);
            break;
          case "ConnectedElsewhere":
            e.chatService.acceptType.changed.off(t);
            if (!u.businessNotificationPersistence.persistWhenConnectedElsewhere.enabled) {
              l();
              break;
            }
            s = !0, o = u.businessNotificationPersistence.persistWhenConnectedElsewhere.timeout;
            break;
          case "UserAccepted":
          case "Other":
            e.chatService.acceptType.changed.off(t), l();
            break;
          default:
            return;
          }
          s && (f = a.setTimeout(function () {
            l();
            f = null;
          }, o), c = n.active.subscribe(function (e) {
            if (e !== !1)
              return;
            c.dispose();
            f && (a.clearTimeout(f), f = null);
          }));
        }
        if (!e.chatService.acceptType || !n.active()) {
          l();
          return;
        }
        if (!u.businessNotificationPersistence.persistWhenConnectedElsewhere.enabled && !u.businessNotificationPersistence.persistWhenAutoAccepted.enabled) {
          l();
          return;
        }
        e.chatService.acceptType.changed(t);
      });
    }
    this.observe = function (t) {
      t.conversationsManager.conversations.added(e);
    };
  }
  var t = e("notifications/factory"), n = e("swx-enums"), r = e("swx-constants").COMMON, i = e("ui/modelHelpers/conversationHelper"), s = e("notifications/settings"), o = e("notifications/common/notificationHub"), u = e("experience/settings"), a = e("browser/window"), f = e("swx-utils-common").async;
  return {
    build: function () {
      return new l();
    }
  };
});

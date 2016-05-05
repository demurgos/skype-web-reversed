define("notifications/modelObservers/chatRequestObserver", [
  "require",
  "notifications/factory",
  "swx-enums",
  "constants/common",
  "notifications/settings",
  "notifications/common/notificationHub"
], function (e) {
  function o() {
    function e(e) {
      e.selfParticipant.chat.state.changed(function (t) {
        u(e, t);
      });
    }
    function o() {
      return !i.chatNotificationsMuted();
    }
    function u(e, t) {
      o() && t === n.callConnectionState.Notified && a(e);
    }
    function a(e) {
      function o() {
        i && i.dispose();
      }
      var n = t.build(r.notifications.CHAT, { conversation: e }), i;
      n.sender.uri() ? s.notify(n) : i = n.sender.uri.subscribe(function (e) {
        e && (s.notify(n), o());
      }), e.chatService.accept.enabled.once(!1, function () {
        e.isGroupConversation() && e.meeting.state() === "Disconnected" ? n.decline() : n.active(!1);
      });
    }
    this.observe = function (t) {
      t.conversationsManager.conversations.added(e);
    };
  }
  var t = e("notifications/factory"), n = e("swx-enums"), r = e("constants/common"), i = e("notifications/settings"), s = e("notifications/common/notificationHub");
  return {
    build: function () {
      return new o();
    }
  };
})

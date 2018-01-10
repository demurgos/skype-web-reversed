define("notifications/types/chatRequest", [
  "require",
  "swx-cafe-application-instance",
  "swx-constants",
  "swx-pubsub-instance",
  "notifications/common/notification",
  "notifications/common/sender",
  "swx-enums"
], function (e) {
  function u(e) {
    var u = e.conversation, a, f = {
        accept: function () {
          u.chatService.accept.enabled() ? u.chatService.accept() : u.chatService.start.enabled() && u.chatService.start();
          r.publish(n.events.navigation.OPEN_CONVERSATION, { model: u });
          r.publish(n.events.narrowMode.SHOW_SIDEBAR);
        },
        decline: function () {
          u.chatService.reject.enabled() && u.chatService.reject();
          u.isGroupConversation() && t.get().conversationsManager.conversations.remove(u);
        }
      };
    return a = new i(n.notifications.CHAT, s.fromConversation(u), f), u.historyService.activityItems.filter(function (e) {
      e.type() === o.activityType.TextMessage && (a.description(e.text()), a.title(e.sender.title()));
    }), a;
  }
  var t = e("swx-cafe-application-instance"), n = e("swx-constants").COMMON, r = e("swx-pubsub-instance").default, i = e("notifications/common/notification"), s = e("notifications/common/sender"), o = e("swx-enums");
  return { build: u };
});

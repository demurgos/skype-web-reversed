define("notifications/types/chatRequest", [
  "require",
  "cafe/applicationInstance",
  "constants/common",
  "services/pubSub/pubSub",
  "notifications/common/notification",
  "notifications/common/sender",
  "swx-enums"
], function (e) {
  function u(e) {
    var u = e.conversation, a, f = {
        accept: function () {
          u.chatService.accept.enabled() && u.chatService.accept(), r.publish(n.events.navigation.OPEN_CONVERSATION, { model: u });
        },
        decline: function () {
          u.chatService.reject.enabled() && u.chatService.reject(), u.isGroupConversation() && t.get().conversationsManager.conversations.remove(u);
        }
      };
    return a = new i(n.notifications.CHAT, s.fromConversation(u), f), u.historyService.activityItems.filter(function (e) {
      e.type() === o.activityType.TextMessage && (a.description(e.text()), a.title(e.sender.title()));
    }), a;
  }
  var t = e("cafe/applicationInstance"), n = e("constants/common"), r = e("services/pubSub/pubSub"), i = e("notifications/common/notification"), s = e("notifications/common/sender"), o = e("swx-enums");
  return { build: u };
})

define("ui/components/chat/unreadMessageCounter", [
  "require",
  "exports",
  "module",
  "constants/components",
  "text!views/chat/unreadMessageCounter.html"
], function (e, t) {
  t.name = e("constants/components").chat.UNREAD_MESSAGE_COUNTER, t.template = e("text!views/chat/unreadMessageCounter.html");
})

define("ui/components/chat/currentCall", [
  "require",
  "exports",
  "module",
  "constants/components",
  "text!views/chat/timeline/currentCall.html"
], function (e, t) {
  t.name = e("constants/components").chat.CURRENT_CALL, t.template = e("text!views/chat/timeline/currentCall.html");
})

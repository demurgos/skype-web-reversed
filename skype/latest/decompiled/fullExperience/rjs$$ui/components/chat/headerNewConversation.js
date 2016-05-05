define("ui/components/chat/headerNewConversation", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "telemetry/chat/newConversationFlow",
  "ui/viewModels/chat/headerNewConversation",
  "constants/components",
  "text!views/chat/headerNewConversation.html"
], function (e, t) {
  function s(e, t) {
    var s = new r(), o = new i(e, s);
    return o.setContext(n.dataFor(t.element)), o;
  }
  var n = e("vendor/knockout"), r = e("telemetry/chat/newConversationFlow"), i = e("ui/viewModels/chat/headerNewConversation");
  t.name = e("constants/components").chat.HEADER_NEW_CONVERSATION, t.template = e("text!views/chat/headerNewConversation.html"), t.viewModel = { createViewModel: s };
})

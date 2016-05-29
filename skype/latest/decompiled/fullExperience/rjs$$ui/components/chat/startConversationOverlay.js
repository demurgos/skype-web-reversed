define("ui/components/chat/startConversationOverlay", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/chat/startConversationOverlay",
  "constants/components",
  "text!views/chat/startConversationOverlay.html"
], function (e, t) {
  function i(e, t) {
    var i = r.build(e);
    return i.setContext(n.dataFor(t.element)), i;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/chat/startConversationOverlay");
  t.name = e("constants/components").chat.START_CONVERSATION_OVERLAY;
  t.template = e("text!views/chat/startConversationOverlay.html");
  t.viewModel = { createViewModel: i };
});

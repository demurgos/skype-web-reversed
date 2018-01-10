define("ui/components/chat/headerSingleConversation", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/chat/headerSingleConversation",
  "constants/components",
  "text!views/chat/headerSingleConversation.html"
], function (e, t) {
  function i(e, t) {
    var i = r.build(e, t.element);
    return i.setContext(n.dataFor(t.element)), i;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/chat/headerSingleConversation");
  t.name = e("constants/components").chat.HEADER_SINGLE_CONVERSATION;
  t.template = e("text!views/chat/headerSingleConversation.html");
  t.viewModel = { createViewModel: i };
});

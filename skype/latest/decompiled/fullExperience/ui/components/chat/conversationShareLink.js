define("ui/components/chat/conversationShareLink", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/chat/conversationShareLink",
  "constants/components",
  "text!views/chat/conversationShareLink.html"
], function (e, t) {
  function i(e, t) {
    var i = new r(e);
    return i.setContext(n.dataFor(t.element)), i;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/chat/conversationShareLink");
  t.name = e("constants/components").chat.CONVERSATION_SHARE_LINK, t.template = e("text!views/chat/conversationShareLink.html"), t.viewModel = { createViewModel: i };
})

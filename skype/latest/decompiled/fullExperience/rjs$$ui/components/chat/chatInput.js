define("ui/components/chat/chatInput", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/chat/chatInput",
  "constants/components",
  "text!views/chat/chatInput.html"
], function (e, t) {
  function i(e, t) {
    var i = new r(), s = n.dataFor(t.element);
    return i.init(e, t.element), i.setContext(s), i;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/chat/chatInput");
  t.name = e("constants/components").chat.CHAT_INPUT;
  t.template = e("text!views/chat/chatInput.html");
  t.viewModel = { createViewModel: i };
});

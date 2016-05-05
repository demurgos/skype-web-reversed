define("ui/components/chat/chatInputPollButton", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/chat/chatInputPollButton",
  "constants/components",
  "text!views/chat/chatInputPollButton.html"
], function (e, t) {
  function i(e, t) {
    var i = r.build(e, t), s = n.dataFor(t.element);
    return i.setContext(s), i;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/chat/chatInputPollButton");
  t.name = e("constants/components").chat.CHAT_INPUT_POLL_BUTTON, t.template = e("text!views/chat/chatInputPollButton.html"), t.viewModel = { createViewModel: i };
})

define("ui/components/chat/messagesSearch", [
  "require",
  "exports",
  "module",
  "ui/viewModels/chat/messagesSearch",
  "ui/viewModels/chat/messageSearchItem",
  "constants/components",
  "text!views/chat/messagesList.html"
], function (e, t) {
  function i() {
    var e = new n(r);
    return e.init(), e;
  }
  var n = e("ui/viewModels/chat/messagesSearch"), r = e("ui/viewModels/chat/messageSearchItem");
  t.name = e("constants/components").chat.MESSAGES_SEARCH;
  t.template = e("text!views/chat/messagesList.html");
  t.viewModel = { createViewModel: i };
});

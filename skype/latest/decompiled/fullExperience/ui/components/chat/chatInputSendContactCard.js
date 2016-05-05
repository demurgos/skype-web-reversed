define("ui/components/chat/chatInputSendContactCard", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/chat/chatInputSendContactCard",
  "constants/components",
  "text!views/chat/chatInputSendContactCard.html"
], function (e, t) {
  function i(e, t) {
    var i = r.build(e, t), s = n.dataFor(t.element);
    return i.setContext(s), i;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/chat/chatInputSendContactCard");
  t.name = e("constants/components").chat.CHAT_INPUT_SEND_CONTACT_CARD, t.template = e("text!views/chat/chatInputSendContactCard.html"), t.viewModel = { createViewModel: i };
})

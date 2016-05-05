define("ui/components/chat/conversationCard", [
  "require",
  "exports",
  "module",
  "ui/viewModels/chat/conversationCard",
  "constants/components",
  "text!views/chat/conversationCard.html"
], function (e, t) {
  function r(e) {
    return new n(e);
  }
  var n = e("ui/viewModels/chat/conversationCard");
  t.name = e("constants/components").chat.CONVERSATION_CARD, t.template = e("text!views/chat/conversationCard.html"), t.viewModel = { createViewModel: r };
})

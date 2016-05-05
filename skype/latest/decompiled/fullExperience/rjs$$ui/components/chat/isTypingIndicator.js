define("ui/components/chat/isTypingIndicator", [
  "require",
  "exports",
  "module",
  "constants/components",
  "ui/viewModels/chat/isTypingIndicator",
  "text!views/chat/isTypingIndicator.html"
], function (e, t) {
  t.name = e("constants/components").chat.TYPING_INDICATOR, t.viewModel = e("ui/viewModels/chat/isTypingIndicator"), t.template = e("text!views/chat/isTypingIndicator.html");
})

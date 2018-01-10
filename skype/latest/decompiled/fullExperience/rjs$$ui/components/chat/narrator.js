define("ui/components/chat/narrator", [
  "require",
  "exports",
  "module",
  "ui/viewModels/chat/narrator",
  "constants/components",
  "text!views/chat/narrator.html"
], function (e, t) {
  function r() {
    return n.build();
  }
  var n = e("ui/viewModels/chat/narrator");
  t.name = e("constants/components").chat.NARRATOR;
  t.template = e("text!views/chat/narrator.html");
  t.viewModel = { createViewModel: r };
});

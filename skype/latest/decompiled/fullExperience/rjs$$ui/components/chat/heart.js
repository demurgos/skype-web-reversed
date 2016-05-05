define("ui/components/chat/heart", [
  "require",
  "exports",
  "module",
  "ui/viewModels/chat/heart",
  "constants/components",
  "text!views/chat/heart.html"
], function (e, t) {
  function r(e, t) {
    return n.build(e, t);
  }
  var n = e("ui/viewModels/chat/heart");
  t.name = e("constants/components").chat.HEART, t.template = e("text!views/chat/heart.html"), t.viewModel = { createViewModel: r };
})

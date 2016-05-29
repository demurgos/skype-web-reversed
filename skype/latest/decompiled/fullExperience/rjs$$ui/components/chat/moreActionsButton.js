define("ui/components/chat/moreActionsButton", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/chat/moreActionsButton",
  "constants/components",
  "text!views/chat/moreActionsButton.html"
], function (e, t) {
  function i(e, t) {
    var i = r.build(e), s = n.dataFor(t.element);
    return i.setContext(s), i;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/chat/moreActionsButton");
  t.name = e("constants/components").chat.MORE_ACTIONS_BUTTON;
  t.template = e("text!views/chat/moreActionsButton.html");
  t.viewModel = { createViewModel: i };
});

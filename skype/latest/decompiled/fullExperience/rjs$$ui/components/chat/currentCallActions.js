define("ui/components/chat/currentCallActions", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/chat/currentCallActions",
  "constants/components",
  "text!views/chat/timeline/currentCallActions.html"
], function (e, t) {
  function i(e, t) {
    var i = new r(e);
    return i.setContext(n.dataFor(t.element)), i;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/chat/currentCallActions");
  t.name = e("constants/components").chat.CURRENT_CALL_ACTIONS, t.template = e("text!views/chat/timeline/currentCallActions.html"), t.viewModel = { createViewModel: i };
})

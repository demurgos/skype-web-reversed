define("ui/components/chat/pollDesigner", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/chat/pollDesigner",
  "jsviews/chat/pollDesigner",
  "constants/components",
  "text!views/chat/pollDesigner.html"
], function (e, t) {
  function s(e, t) {
    var s = t.element, o = n.dataFor(s), u = new i(s), a = new r(e.isDisabled, o.conversationModel, u);
    return a.setContext(o), a.init(), a;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/chat/pollDesigner"), i = e("jsviews/chat/pollDesigner");
  t.name = e("constants/components").chat.POLL_DESIGNER;
  t.template = e("text!views/chat/pollDesigner.html");
  t.viewModel = { createViewModel: s };
});

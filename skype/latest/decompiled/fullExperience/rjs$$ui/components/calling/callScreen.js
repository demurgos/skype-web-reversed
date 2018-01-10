define("ui/components/calling/callScreen", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/calling/callScreenViewModel/callScreenViewModel",
  "constants/components",
  "text!views/calling/callScreen.html"
], function (e, t) {
  function i(e, t) {
    var i = r.build(e.conversation, t.element);
    return i.setContext(n.dataFor(t.element)), i.init(), i;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/calling/callScreenViewModel/callScreenViewModel");
  t.name = e("constants/components").calling.CALL_SCREEN;
  t.template = e("text!views/calling/callScreen.html");
  t.viewModel = { createViewModel: i };
});

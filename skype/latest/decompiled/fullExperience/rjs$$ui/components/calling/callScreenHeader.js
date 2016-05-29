define("ui/components/calling/callScreenHeader", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/calling/callScreenViewModel/callScreenHeaderViewModel",
  "constants/components",
  "text!views/calling/callScreenHeader.html"
], function (e, t) {
  function i(e, t) {
    var i = r.build(e.state, e.conversation, e.callScreenStrings), s = n.dataFor(t.element);
    return i.setContext(s), i.init(), i;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/calling/callScreenViewModel/callScreenHeaderViewModel");
  t.name = e("constants/components").calling.HEADER;
  t.template = e("text!views/calling/callScreenHeader.html");
  t.viewModel = { createViewModel: i };
});

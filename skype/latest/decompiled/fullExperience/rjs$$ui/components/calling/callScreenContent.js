define("ui/components/calling/callScreenContent", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "jsviews/calling/callScreenContent",
  "ui/viewModels/calling/callScreenViewModel/callScreenContentViewModel",
  "constants/components",
  "text!views/calling/callScreenContent.html"
], function (e, t) {
  function s(e, t) {
    var s = i.build(e.conversation), o = r.build(t.element), u = n.dataFor(t.element);
    return s.setContext(u), s.init(o, e.callState, e.footerButtonsWidth), s;
  }
  var n = e("vendor/knockout"), r = e("jsviews/calling/callScreenContent"), i = e("ui/viewModels/calling/callScreenViewModel/callScreenContentViewModel");
  t.name = e("constants/components").calling.CONTENT;
  t.template = e("text!views/calling/callScreenContent.html");
  t.viewModel = { createViewModel: s };
});

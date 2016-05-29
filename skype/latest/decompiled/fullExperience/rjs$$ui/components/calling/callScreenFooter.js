define("ui/components/calling/callScreenFooter", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "jsviews/calling/callScreenFooter",
  "ui/viewModels/calling/callScreenViewModel/callScreenFooterViewModel",
  "constants/components",
  "text!views/calling/callScreenFooter.html"
], function (e, t) {
  function s(e, t) {
    var s = i.build(e.conversation, t.element), o = r.build(t.element), u = n.dataFor(t.element);
    return s.setContext(u), s.init(o), s;
  }
  var n = e("vendor/knockout"), r = e("jsviews/calling/callScreenFooter"), i = e("ui/viewModels/calling/callScreenViewModel/callScreenFooterViewModel");
  t.name = e("constants/components").calling.FOOTER;
  t.template = e("text!views/calling/callScreenFooter.html");
  t.viewModel = { createViewModel: s };
});

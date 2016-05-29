define("ui/components/calling/skypeOut", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/calling/skypeOutViewModel",
  "constants/components",
  "text!views/calling/skypeOut.html"
], function (e, t) {
  function i(e, t) {
    var i = r.build(), s = n.dataFor(t.element);
    return i.setContext(s), i.init(t.element), i;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/calling/skypeOutViewModel");
  t.name = e("constants/components").calling.SKYPEOUT_PAGE;
  t.template = e("text!views/calling/skypeOut.html");
  t.viewModel = { createViewModel: i };
});

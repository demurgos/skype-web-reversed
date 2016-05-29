define("ui/components/calling/skypeOut/dialpad", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/calling/skypeOut/skypeOutDialpadViewModel",
  "constants/components",
  "text!views/calling/skypeOut/dialpad.html"
], function (e, t) {
  function i(e, t) {
    var i = n.dataFor(t.element), s = new r();
    return s.setContext(i), s;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/calling/skypeOut/skypeOutDialpadViewModel");
  t.name = e("constants/components").calling.SKYPEOUT_DIALPAD;
  t.template = e("text!views/calling/skypeOut/dialpad.html");
  t.viewModel = { createViewModel: i };
});

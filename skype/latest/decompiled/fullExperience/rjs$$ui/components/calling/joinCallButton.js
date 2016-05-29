define("ui/components/calling/joinCallButton", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/calling/joinCallButtonViewModel",
  "constants/components",
  "text!views/calling/joinCallButton.html"
], function (e, t) {
  function i(e, t) {
    var i = new r(e);
    return i.setContext(n.dataFor(t.element)), i;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/calling/joinCallButtonViewModel");
  t.name = e("constants/components").calling.JOINCALL_BUTTON;
  t.template = e("text!views/calling/joinCallButton.html");
  t.viewModel = { createViewModel: i };
});

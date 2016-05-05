define("ui/components/calling/startCallButton", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/calling/startCallButtonViewModel",
  "constants/components",
  "text!views/calling/startCallButton.html"
], function (e, t) {
  function i(e, t) {
    var i = r.build(e);
    return i.setContext(n.dataFor(t.element)), i;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/calling/startCallButtonViewModel");
  t.name = e("constants/components").calling.START_CALL_BUTTON, t.template = e("text!views/calling/startCallButton.html"), t.viewModel = { createViewModel: i };
})

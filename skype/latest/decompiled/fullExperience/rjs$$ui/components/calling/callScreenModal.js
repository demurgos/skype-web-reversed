define("ui/components/calling/callScreenModal", [
  "require",
  "exports",
  "module",
  "ui/viewModels/calling/callScreenModalViewModel",
  "vendor/knockout",
  "constants/components",
  "text!views/calling/callScreenModal.html"
], function (e, t) {
  function i(e, t) {
    var i = n.build(e.name, t.element);
    return i.setContext(r.dataFor(t.element)), i.init(), i;
  }
  var n = e("ui/viewModels/calling/callScreenModalViewModel"), r = e("vendor/knockout");
  t.name = e("constants/components").calling.CALL_SCREEN_MODAL;
  t.template = e("text!views/calling/callScreenModal.html");
  t.viewModel = { createViewModel: i };
});

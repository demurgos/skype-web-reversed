define("ui/components/userSettings/shortCircuit", [
  "require",
  "exports",
  "module",
  "ui/viewModels/userSettings/shortCircuitViewModel",
  "constants/components",
  "text!views/userSettings/shortCircuit.html"
], function (e, t) {
  function r() {
    var e = new n();
    return e;
  }
  var n = e("ui/viewModels/userSettings/shortCircuitViewModel");
  t.name = e("constants/components").userSettings.SHORT_CIRCUIT;
  t.template = e("text!views/userSettings/shortCircuit.html");
  t.viewModel = { createViewModel: r };
});

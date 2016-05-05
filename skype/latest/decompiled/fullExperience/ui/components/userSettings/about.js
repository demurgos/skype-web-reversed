define("ui/components/userSettings/about", [
  "require",
  "exports",
  "module",
  "ui/viewModels/userSettings/aboutViewModel",
  "constants/components",
  "text!views/userSettings/about.html"
], function (e, t) {
  function r() {
    return new n();
  }
  var n = e("ui/viewModels/userSettings/aboutViewModel");
  t.name = e("constants/components").userSettings.ABOUT, t.template = e("text!views/userSettings/about.html"), t.viewModel = { createViewModel: r };
})

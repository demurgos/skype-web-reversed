define("ui/components/experience/searchInput", [
  "require",
  "exports",
  "module",
  "ui/viewModels/search/input",
  "constants/components",
  "text!views/search/input.html"
], function (e, t) {
  function r() {
    var e = new n();
    return e.init(), e;
  }
  var n = e("ui/viewModels/search/input");
  t.name = e("constants/components").experience.SEARCH_INPUT;
  t.template = e("text!views/search/input.html");
  t.viewModel = { createViewModel: r };
});

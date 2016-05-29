define("ui/components/experience/searchResults", [
  "require",
  "exports",
  "module",
  "ui/viewModels/search/results",
  "constants/components",
  "text!views/search/results.html"
], function (e, t) {
  function r(e, t) {
    var r = new n();
    return r.init(t.element), r;
  }
  var n = e("ui/viewModels/search/results");
  t.name = e("constants/components").experience.SEARCH_RESULTS;
  t.template = e("text!views/search/results.html");
  t.viewModel = { createViewModel: r };
});

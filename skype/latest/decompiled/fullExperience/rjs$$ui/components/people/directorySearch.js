define("ui/components/people/directorySearch", [
  "require",
  "exports",
  "module",
  "ui/viewModels/people/directoryList",
  "constants/components",
  "text!views/people/list.html"
], function (e, t) {
  function r() {
    var e = new n();
    return e.init(), e;
  }
  var n = e("ui/viewModels/people/directoryList");
  t.name = e("constants/components").people.DIRECTORY_SEARCH;
  t.template = e("text!views/people/list.html");
  t.viewModel = { createViewModel: r };
});

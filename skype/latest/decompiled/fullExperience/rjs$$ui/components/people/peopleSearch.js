define("ui/components/people/peopleSearch", [
  "require",
  "exports",
  "module",
  "ui/viewModels/people/contactList",
  "constants/components",
  "text!views/people/list.html"
], function (e, t) {
  function r() {
    var e = new n();
    return e.init(), e;
  }
  var n = e("ui/viewModels/people/contactList");
  t.name = e("constants/components").people.PEOPLE_SEARCH;
  t.template = e("text!views/people/list.html");
  t.viewModel = { createViewModel: r };
});

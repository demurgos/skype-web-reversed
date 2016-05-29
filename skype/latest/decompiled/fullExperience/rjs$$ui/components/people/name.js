define("ui/components/people/name", [
  "require",
  "exports",
  "module",
  "ui/viewModels/people/name",
  "ui/viewModels/people/contact",
  "constants/components",
  "text!views/people/name.html"
], function (e, t) {
  function i(e) {
    var t;
    if (e && typeof e.person == "object")
      return t = new n(s(e)), e.headerImportance && t.headerImportance(e.headerImportance), t;
    throw new Error("missing parameter: \"person\"");
  }
  function s(e) {
    return e.person instanceof r ? e.person.getPerson() : e.person;
  }
  var n = e("ui/viewModels/people/name"), r = e("ui/viewModels/people/contact");
  t.name = e("constants/components").people.NAME;
  t.template = e("text!views/people/name.html");
  t.viewModel = { createViewModel: i };
});

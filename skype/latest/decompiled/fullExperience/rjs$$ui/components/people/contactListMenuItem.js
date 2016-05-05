define("ui/components/people/contactListMenuItem", [
  "require",
  "exports",
  "module",
  "text!views/people/contactListMenuItem.html",
  "constants/components"
], function (e, t) {
  function i(e) {
    return e.viewModel;
  }
  var n = e("text!views/people/contactListMenuItem.html"), r = e("constants/components");
  t.name = r.people.CONTACT_LIST_MENU_ITEM, t.viewModel = { createViewModel: i }, t.template = n;
})

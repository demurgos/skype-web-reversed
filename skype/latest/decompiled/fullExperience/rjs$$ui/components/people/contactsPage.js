define("ui/components/people/contactsPage", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/people/contactsPage",
  "constants/components",
  "text!views/people/contactsPage.html"
], function (e, t) {
  function i(e, t) {
    var i = new r();
    return i.setContext(n.dataFor(t.element)), i.init(s(), t.element), i;
  }
  function s() {
    return {
      className: "ContactsPage",
      isSelectable: !1
    };
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/people/contactsPage");
  t.name = e("constants/components").people.CONTACTS_PAGE, t.template = e("text!views/people/contactsPage.html"), t.viewModel = { createViewModel: i };
})

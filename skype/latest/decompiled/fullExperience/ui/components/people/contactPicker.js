define("ui/components/people/contactPicker", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/people/contactPicker",
  "constants/components",
  "text!views/people/picker.html"
], function (e, t) {
  function i(e, t) {
    var i = new r();
    return e.isSelectable = !0, i.setContext(n.dataFor(t.element)), i.init(e, t.element), i;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/people/contactPicker");
  t.name = e("constants/components").people.CONTACT_PICKER, t.template = e("text!views/people/picker.html"), t.viewModel = { createViewModel: i };
})

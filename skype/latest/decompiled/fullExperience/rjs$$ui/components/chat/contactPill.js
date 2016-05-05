define("ui/components/chat/contactPill", [
  "require",
  "exports",
  "module",
  "ui/viewModels/people/contact",
  "ui/viewModels/people/contactBuilder",
  "constants/components",
  "text!views/chat/contactPill.html"
], function (e, t) {
  function i(e) {
    if (e && typeof e.person == "object")
      return e.person instanceof n ? e.person : r.build(e.person);
    throw new Error("missing parameter: \"person\"");
  }
  var n = e("ui/viewModels/people/contact"), r = e("ui/viewModels/people/contactBuilder");
  t.name = e("constants/components").chat.CONTACT_PILL, t.template = e("text!views/chat/contactPill.html"), t.viewModel = { createViewModel: i };
})

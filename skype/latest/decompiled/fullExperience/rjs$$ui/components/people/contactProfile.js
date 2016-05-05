define("ui/components/people/contactProfile", [
  "require",
  "exports",
  "module",
  "ui/viewModels/people/contactProfile",
  "browser/dom",
  "utils/common/scroll",
  "vendor/knockout",
  "constants/components",
  "text!views/people/contactProfile.html"
], function (e, t) {
  function o(e, t) {
    var o = s.dataFor(t.element), u = r.getElement(".scrollingContainer", t.element), a = i.build(u), f = n.build(e, a);
    return f.setContext(o), f.init(), f;
  }
  var n = e("ui/viewModels/people/contactProfile"), r = e("browser/dom"), i = e("utils/common/scroll"), s = e("vendor/knockout");
  t.name = e("constants/components").people.CONTACT_PROFILE, t.template = e("text!views/people/contactProfile.html"), t.viewModel = { createViewModel: o };
})

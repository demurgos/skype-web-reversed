define("ui/components/calling/skypeOut/skypeOutHeader", [
  "require",
  "exports",
  "module",
  "browser/dom",
  "vendor/knockout",
  "ui/viewModels/calling/skypeOut/skypeOutHeaderViewModel",
  "constants/components",
  "text!views/calling/skypeOut/skypeOutHeader.html"
], function (e, t) {
  function s(e, t) {
    var s = t.element, o = n.getElement(".SkypeOutHeader-input", s), u = i.build(), a = r.dataFor(s);
    return u.setContext(a), u.init(o), u;
  }
  var n = e("browser/dom"), r = e("vendor/knockout"), i = e("ui/viewModels/calling/skypeOut/skypeOutHeaderViewModel");
  t.name = e("constants/components").calling.SKYPEOUT_HEADER, t.template = e("text!views/calling/skypeOut/skypeOutHeader.html"), t.viewModel = { createViewModel: s };
})

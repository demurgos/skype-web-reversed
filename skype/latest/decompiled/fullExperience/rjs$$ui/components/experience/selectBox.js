define("ui/components/experience/selectBox", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/experience/selectBox",
  "constants/components",
  "text!views/common/selectBox.html"
], function (e, t) {
  function i(e, t) {
    var i = r.build(e), s = t.element, o = n.dataFor(s);
    return i.setContext(o), i.init(s), i;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/experience/selectBox");
  t.name = e("constants/components").experience.SELECT_BOX;
  t.template = e("text!views/common/selectBox.html");
  t.viewModel = { createViewModel: i };
});

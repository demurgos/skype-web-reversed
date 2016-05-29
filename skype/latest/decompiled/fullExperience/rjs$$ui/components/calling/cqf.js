define("ui/components/calling/cqf", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/calling/cqfViewModel",
  "constants/components",
  "text!views/calling/cqf.html"
], function (e, t) {
  function i(e, t) {
    var i = r.build(), s = t.element.getElementsByClassName("scrollWrapper")[0];
    return i.setContext(n.dataFor(t.element)), i.init(e, s), i;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/calling/cqfViewModel");
  t.name = e("constants/components").calling.CQF;
  t.template = e("text!views/calling/cqf.html");
  t.viewModel = { createViewModel: i };
});

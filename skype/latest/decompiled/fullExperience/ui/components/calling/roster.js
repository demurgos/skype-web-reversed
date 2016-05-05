define("ui/components/calling/roster", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "jsviews/calling/roster",
  "ui/viewModels/calling/callScreenViewModel/rosterViewModel",
  "constants/components",
  "text!views/calling/roster.html"
], function (e, t) {
  function s(e, t) {
    var s = t.element.getElementsByClassName("scrollWrapper")[0], o = i.build(e, s), u = n.dataFor(t.element), a = r.build(t.element);
    return o.setContext(u), o.init(a), o;
  }
  var n = e("vendor/knockout"), r = e("jsviews/calling/roster"), i = e("ui/viewModels/calling/callScreenViewModel/rosterViewModel");
  t.name = e("constants/components").calling.ROSTER, t.template = e("text!views/calling/roster.html"), t.viewModel = { createViewModel: s };
})

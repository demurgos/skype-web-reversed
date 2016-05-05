define("ui/components/me/presencePopup", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/me/presencePopup",
  "constants/components",
  "text!views/me/presencePopup.html"
], function (e, t) {
  function i(e, t) {
    var i = t.element, s = n.dataFor(i), o = r.build(e, i);
    return o.setContext(s), o.init(), o;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/me/presencePopup");
  t.name = e("constants/components").me.PRESENCE_POPUP, t.template = e("text!views/me/presencePopup.html"), t.viewModel = { createViewModel: i };
})

define("ui/components/me/area", [
  "require",
  "exports",
  "module",
  "ui/viewModels/me/area",
  "utils/common/focusRestrictor",
  "constants/components",
  "text!views/me/area.html"
], function (e, t) {
  function i(e, t) {
    var i = [
        ".toasts",
        ".footer",
        ".notifications"
      ], s = r.build(t.element, i), o = n.build(e, t.element, s);
    return o;
  }
  var n = e("ui/viewModels/me/area"), r = e("utils/common/focusRestrictor");
  t.name = e("constants/components").me.AREA, t.template = e("text!views/me/area.html"), t.viewModel = { createViewModel: i };
})

define("ui/components/calling/unansweredCall", [
  "require",
  "exports",
  "module",
  "utils/common/focusRestrictor",
  "vendor/knockout",
  "ui/viewModels/calling/unansweredCallViewModel",
  "constants/components",
  "text!views/calling/unansweredCall.html"
], function (e, t) {
  function s(e, t) {
    var s = [
        ".Me",
        ".toasts",
        ".footer",
        ".notifications",
        "swx-sidebar"
      ], o = n.build(t.element, s), u = i.build(e, o);
    return u.setContext(r.dataFor(t.element)), u;
  }
  var n = e("utils/common/focusRestrictor"), r = e("vendor/knockout"), i = e("ui/viewModels/calling/unansweredCallViewModel");
  t.name = e("constants/components").calling.UNANSWERED_CALL;
  t.template = e("text!views/calling/unansweredCall.html");
  t.viewModel = { createViewModel: s };
});

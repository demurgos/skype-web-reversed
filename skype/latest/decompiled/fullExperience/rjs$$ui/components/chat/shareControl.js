define("ui/components/chat/shareControl", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "ui/viewModels/chat/shareControl",
  "constants/components",
  "text!views/chat/shareControl.html"
], function (e, t) {
  function i(e, t) {
    var i = e.payload() || {}, s = r.build(i), o = n.dataFor(t.element);
    return s.setContext(o), s;
  }
  var n = e("vendor/knockout"), r = e("ui/viewModels/chat/shareControl");
  t.name = e("constants/components").chat.SHARE_CONTROL;
  t.template = e("text!views/chat/shareControl.html");
  t.viewModel = { createViewModel: i };
});

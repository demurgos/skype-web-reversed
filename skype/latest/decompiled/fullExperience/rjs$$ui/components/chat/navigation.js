define("ui/components/chat/navigation", [
  "require",
  "exports",
  "module",
  "ui/viewModels/chat/navigation",
  "browser/dom",
  "constants/components",
  "text!views/chat/navigation.html"
], function (e, t) {
  function i(e, t) {
    var r = s(t.element), i = n.build(r);
    return i.init(), i;
  }
  function s(e) {
    var t = r.getParentWithClass(e, "swxContent");
    return t ? t.getAttribute("id") : null;
  }
  var n = e("ui/viewModels/chat/navigation"), r = e("browser/dom");
  t.name = e("constants/components").chat.NAVIGATION;
  t.template = e("text!views/chat/navigation.html");
  t.viewModel = { createViewModel: i };
});

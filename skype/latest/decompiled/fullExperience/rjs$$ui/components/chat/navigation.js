define("ui/components/chat/navigation", [
  "require",
  "exports",
  "module",
  "ui/viewModels/chat/navigation",
  "constants/components",
  "text!views/chat/navigation.html"
], function (e, t) {
  function r(e, t) {
    var r = i(t.element), s = n.build(r);
    return s.init(), s;
  }
  function i(e) {
    var t = e;
    while (t && !t.classList.contains("swxContent"))
      t = t.parentNode;
    return t ? t.getAttribute("id") : null;
  }
  var n = e("ui/viewModels/chat/navigation");
  t.name = e("constants/components").chat.NAVIGATION;
  t.template = e("text!views/chat/navigation.html");
  t.viewModel = { createViewModel: r };
});

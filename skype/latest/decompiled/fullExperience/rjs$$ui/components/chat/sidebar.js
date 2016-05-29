define("ui/components/chat/sidebar", [
  "require",
  "exports",
  "module",
  "ui/viewModels/chat/sidebar",
  "constants/components",
  "text!views/chat/sidebar.html"
], function (e, t) {
  function r() {
    var e = new n();
    return e.init(), e;
  }
  var n = e("ui/viewModels/chat/sidebar");
  t.name = e("constants/components").chat.SIDEBAR;
  t.template = e("text!views/chat/sidebar.html");
  t.viewModel = { createViewModel: r };
});

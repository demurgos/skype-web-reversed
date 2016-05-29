define("ui/components/chat/menuItem", [
  "require",
  "exports",
  "module",
  "text!views/chat/timeline/menuItem.html",
  "constants/components"
], function (e, t) {
  function r(e) {
    return e.viewModel;
  }
  var n = e("text!views/chat/timeline/menuItem.html");
  t.name = e("constants/components").chat.MENU_ITEM;
  t.viewModel = { createViewModel: r };
  t.template = n;
});

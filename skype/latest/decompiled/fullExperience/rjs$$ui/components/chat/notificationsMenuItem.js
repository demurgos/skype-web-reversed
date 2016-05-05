define("ui/components/chat/notificationsMenuItem", [
  "require",
  "exports",
  "module",
  "ui/viewModels/chat/notificationsMenuItem",
  "constants/components",
  "text!views/chat/notificationsMenuItem.html"
], function (e, t) {
  function r(e) {
    return new n(e);
  }
  var n = e("ui/viewModels/chat/notificationsMenuItem");
  t.name = e("constants/components").chat.NOTIFICATIONS_MENU_ITEM, t.template = e("text!views/chat/notificationsMenuItem.html"), t.viewModel = { createViewModel: r };
})

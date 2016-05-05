define("ui/components/chat/notificationsCenter", [
  "require",
  "exports",
  "module",
  "ui/viewModels/chat/notificationsCenter",
  "constants/components",
  "text!views/chat/notificationsCenter.html"
], function (e, t) {
  function r(e) {
    return new n(e);
  }
  var n = e("ui/viewModels/chat/notificationsCenter");
  t.name = e("constants/components").chat.NOTIFICATIONS_CENTER, t.template = e("text!views/chat/notificationsCenter.html"), t.viewModel = { createViewModel: r };
})

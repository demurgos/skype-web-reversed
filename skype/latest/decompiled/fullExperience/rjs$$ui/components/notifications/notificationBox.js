define("ui/components/notifications/notificationBox", [
  "require",
  "exports",
  "module",
  "ui/viewModels/notifications/notificationBox",
  "constants/components",
  "text!views/notifications/notificationBox.html"
], function (e, t) {
  function r() {
    return new n();
  }
  var n = e("ui/viewModels/notifications/notificationBox");
  t.name = e("constants/components").notifications.NOTIFICATION_BOX;
  t.template = e("text!views/notifications/notificationBox.html");
  t.viewModel = { createViewModel: r };
});

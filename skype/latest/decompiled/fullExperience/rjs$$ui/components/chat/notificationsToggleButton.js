define("ui/components/chat/notificationsToggleButton", [
  "require",
  "exports",
  "module",
  "ui/viewModels/chat/notificationsToggleButton",
  "constants/components",
  "text!views/chat/notificationsToggleButton.html"
], function (e, t) {
  function r(e) {
    return n.build(e);
  }
  var n = e("ui/viewModels/chat/notificationsToggleButton");
  t.name = e("constants/components").chat.NOTIFICATIONS_TOGGLE_BUTTON;
  t.template = e("text!views/chat/notificationsToggleButton.html");
  t.viewModel = { createViewModel: r };
});

define("text!views/chat/notificationsToggleButton.html", [], function () {
  return "<button data-bind=\"visible: !isDisabled(), click: toggleNotifications, attr: { title: toggleNotificationsTitle }\" class=\"NotificationsSwitcher btn primary circle\" type=\"button\" data-preventdefault=\"false\">\r\n    <span class=\"iconfont\" data-bind=\"css: { notificationsMuted: notificationsMuted }, text: toggleNotificationsTitle\"></span>\r\n</button>\r\n";
})

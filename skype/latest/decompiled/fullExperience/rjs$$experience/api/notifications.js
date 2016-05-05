define("experience/api/notifications", [
  "require",
  "exports",
  "module",
  "notifications/common/notificationHub"
], function (e, t) {
  var n = e("notifications/common/notificationHub");
  t.setNotificationHandler = function (e) {
    n.addNotificationListener(e);
  };
})

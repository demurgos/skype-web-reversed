define("notifications/common/notificationHub", [], function () {
  var e, t = {};
  return t.notify = function (t) {
    if (e) {
      t.active(!0);
      try {
        e(t);
      } catch (n) {
      }
    }
  }, t.addNotificationListener = function (t) {
    e = t;
  }, t.removeNotificationListener = function () {
    e && (e = null);
  }, t;
})

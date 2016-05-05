define("notifications/types/hardware", [
  "require",
  "notifications/common/notification"
], function (e) {
  function n(e, n) {
    var r = new t(e);
    return r.title(n), r;
  }
  var t = e("notifications/common/notification");
  return { build: n };
})

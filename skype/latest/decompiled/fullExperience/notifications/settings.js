define("notifications/settings", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "utils/common/localStorage"
], function (e, t) {
  var n = e("vendor/knockout"), r = e("utils/common/localStorage"), i = n.observable(), s = "chatNotificationsMuted", o;
  t.init = function () {
    i(r.get(s) === "true"), o = i.subscribe(function (e) {
      r.set(s, e);
    });
  }, t.dispose = function () {
    o && o.dispose();
  }, t.chatNotificationsMuted = i;
})

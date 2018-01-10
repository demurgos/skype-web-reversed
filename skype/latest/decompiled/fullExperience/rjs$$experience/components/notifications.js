define("experience/components/notifications", [
  "require",
  "exports",
  "module",
  "ui/components/notifications/index",
  "ui/components/registrar"
], function (e, t) {
  var n = e("ui/components/notifications/index"), r = e("ui/components/registrar");
  t.init = function (e) {
    r.register(n);
    e();
  };
});

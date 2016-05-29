define("experience/components/userSettings", [
  "require",
  "exports",
  "module",
  "ui/components/userSettings/index",
  "ui/components/registrar"
], function (e, t) {
  var n = e("ui/components/userSettings/index"), r = e("ui/components/registrar");
  t.init = function (e) {
    r.register(n);
    e();
  };
});

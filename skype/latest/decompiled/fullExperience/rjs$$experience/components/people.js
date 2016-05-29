define("experience/components/people", [
  "require",
  "exports",
  "module",
  "ui/components/people/index",
  "ui/components/registrar"
], function (e, t) {
  var n = e("ui/components/people/index"), r = e("ui/components/registrar");
  t.init = function (e) {
    r.register(n);
    e();
  };
});

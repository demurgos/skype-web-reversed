define("experience/components/me", [
  "require",
  "exports",
  "module",
  "constants/common",
  "services/serviceLocator",
  "ui/components/registrar",
  "ui/controls/me/me",
  "ui/components/me/index"
], function (e, t) {
  var n = e("constants/common"), r = e("services/serviceLocator"), i = e("ui/components/registrar"), s = e("ui/controls/me/me"), o = e("ui/components/me/index");
  t.init = function (e) {
    var t = r.resolve(n.serviceLocator.CONTROLS_BUILDER);
    t.register(s), i.register(o), e();
  };
})

define("experience/components/experience", [
  "require",
  "exports",
  "module",
  "constants/common",
  "services/serviceLocator",
  "ui/controls/experience/sidebar",
  "ui/controls/experience/content",
  "ui/components/experience/index",
  "ui/components/registrar"
], function (e, t) {
  var n = e("constants/common"), r = e("services/serviceLocator"), i = e("ui/controls/experience/sidebar"), s = e("ui/controls/experience/content"), o = e("ui/components/experience/index"), u = e("ui/components/registrar");
  t.init = function (e) {
    var t = r.resolve(n.serviceLocator.CONTROLS_BUILDER);
    t.register(s);
    t.register(i);
    u.register(o);
    e();
  };
});

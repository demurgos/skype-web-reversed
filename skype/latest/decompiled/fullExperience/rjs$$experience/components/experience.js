define("experience/components/experience", [
  "require",
  "exports",
  "module",
  "swx-constants",
  "swx-service-locator-instance",
  "ui/controls/experience/sidebar",
  "ui/controls/experience/content",
  "ui/components/experience/index",
  "ui/components/registrar"
], function (e, t) {
  var n = e("swx-constants").COMMON, r = e("swx-service-locator-instance").default, i = e("ui/controls/experience/sidebar"), s = e("ui/controls/experience/content"), o = e("ui/components/experience/index"), u = e("ui/components/registrar");
  t.init = function (e) {
    var t = r.resolve(n.serviceLocator.CONTROLS_BUILDER);
    t.register(s);
    t.register(i);
    u.register(o);
    e();
  };
});

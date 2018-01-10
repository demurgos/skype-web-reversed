define("ui/controls/experience/content", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "text!views/experience/content.html",
  "ui/viewModels/experience/content",
  "utils/common/styleModeHelper",
  "swx-browser-detect",
  "swx-constants",
  "swx-enums",
  "swx-service-locator-instance",
  "swx-cafe-application-instance"
], function (e, t) {
  var n = e("vendor/knockout"), r = e("text!views/experience/content.html"), i = e("ui/viewModels/experience/content"), s = e("utils/common/styleModeHelper"), o = e("swx-browser-detect").default, u = e("swx-constants").COMMON, a = e("swx-enums"), f = e("swx-service-locator-instance").default, l = e("swx-cafe-application-instance"), c = 0;
  t.name = "content";
  t.render = function (e, t) {
    var h = f.resolve(u.serviceLocator.FEATURE_FLAGS), p = h.isFeatureOn(u.featureFlags.DARK_THEME_ENABLED);
    if (p) {
      var d = l.get()._flagsServiceProvider, v = d.build(a.skypeFlagsApiMappings.DARK_THEME);
      v.read().then(function (e) {
        !!e && !s.get().isIntegratedProperty() && document.body.classList.add("dark");
      });
    }
    var m = document.createElement("div"), g = new i();
    c++;
    m.id = "swxContent" + c;
    m.className = "swxContent";
    m.innerHTML = r;
    s.get().isIntegratedProperty() && o.getBrowserInfo().browserName !== "SkypeShell" && (m.className += " " + s.get().host());
    g.init();
    n.applyBindings(g, m);
    t(m);
    s.get().addContainer(m);
  };
});

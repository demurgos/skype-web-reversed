define("ui/controls/experience/content", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "text!views/experience/content.html",
  "ui/viewModels/experience/content",
  "utils/common/styleModeHelper",
  "browser/detect"
], function (e, t) {
  var n = e("vendor/knockout"), r = e("text!views/experience/content.html"), i = e("ui/viewModels/experience/content"), s = e("utils/common/styleModeHelper"), o = e("browser/detect"), u = 0;
  t.name = "content", t.render = function (e, t) {
    var a = document.createElement("div"), f = new i();
    u++, a.id = "swxContent" + u, a.className = "swxContent", a.innerHTML = r, s.get().isIntegratedProperty() && o.getBrowserInfo().browserName !== "SkypeShell" && (a.className += " " + s.get().host()), f.init(), n.applyBindings(f, a), t(a), s.get().addContainer(a);
  };
})

define("ui/appOverlay/appOverlay", [
  "require",
  "exports",
  "module",
  "swx-browser-globals",
  "browser/dom",
  "swx-constants",
  "swx-service-locator-instance"
], function (e, t) {
  function f() {
    var e = n.getDocument();
    if (!o) {
      var t, f = s.resolve(i.serviceLocator.CONTROLS_BUILDER);
      f.registeredElements.length ? t = e.querySelector(f.registeredElements[0].element) : t = e.querySelector("body");
      o = t.parentNode;
    }
    u = r.createElement("div");
    u.id = a;
    o.appendChild(u);
  }
  function l() {
    o.removeChild(n.getDocument().querySelector("#" + a));
    u = null;
    o = undefined;
  }
  var n = e("swx-browser-globals"), r = e("browser/dom"), i = e("swx-constants").COMMON, s = e("swx-service-locator-instance").default, o = null, u = null, a = "swx-app-overlay";
  t.create = function (e) {
    return u || f(), e && e.content && u.appendChild(e.content), e && e.className && u.classList.add(e.className), u;
  };
  t.destroy = function () {
    l();
  };
});

define("ui/appOverlay/appOverlay", [
  "require",
  "exports",
  "module",
  "browser/document",
  "browser/dom",
  "constants/common",
  "services/serviceLocator"
], function (e, t) {
  function f() {
    if (!o) {
      var e, t = s.resolve(i.serviceLocator.CONTROLS_BUILDER);
      t.registeredElements.length ? e = n.querySelector(t.registeredElements[0].element) : e = n.querySelector("body");
      o = e.parentNode;
    }
    u = r.createElement("div");
    u.id = a;
    o.appendChild(u);
  }
  function l() {
    o.removeChild(n.querySelector("#" + a));
    u = null;
    o = undefined;
  }
  var n = e("browser/document"), r = e("browser/dom"), i = e("constants/common"), s = e("services/serviceLocator"), o = null, u = null, a = "swx-app-overlay";
  t.create = function (e) {
    return u || f(), e && e.content && u.appendChild(e.content), e && e.className && u.classList.add(e.className), u;
  };
  t.destroy = function () {
    l();
  };
});

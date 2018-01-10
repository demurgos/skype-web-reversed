define("utils/common/applicationReactivationManager", [
  "require",
  "exports",
  "module",
  "swx-cafe-application-instance",
  "swx-constants",
  "browser/document",
  "browser/window",
  "browser/dom"
], function (e, t) {
  function f() {
    n.get().suspended(!1);
    u = null;
  }
  function l() {
    return n.get().suspended();
  }
  function c() {
    s.addEventListener(r.events.browser.FOCUS, p);
    s.addEventListener(r.events.browser.BLUR, d);
    i.addEventListener(r.events.browser.VISIBILITYCHANGE, p);
  }
  function h() {
    s.removeEventListener(r.events.browser.FOCUS, p);
    s.removeEventListener(r.events.browser.BLUR, d);
    i.removeEventListener(r.events.browser.VISIBILITYCHANGE, p);
  }
  function p() {
    !o.isDocumentHidden() && l() ? u || (u = s.setTimeout(f, a)) : d();
  }
  function d() {
    u && (s.clearTimeout(u), u = null);
  }
  var n = e("swx-cafe-application-instance"), r = e("swx-constants").COMMON, i = e("browser/document"), s = e("browser/window"), o = e("browser/dom"), u, a = 3000;
  t.init = function () {
    n.get().suspended.when(!0, c);
    n.get().suspended.when(!1, h);
  };
});

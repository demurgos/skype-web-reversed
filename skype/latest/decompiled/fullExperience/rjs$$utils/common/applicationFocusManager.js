define("utils/common/applicationFocusManager", [
  "require",
  "exports",
  "module",
  "services/serviceLocator",
  "constants/common",
  "ui/telemetry/actions/actionNames",
  "browser/dom",
  "browser/document",
  "browser/detect"
], function (e, t) {
  function m(e) {
    if (t.focusTrackingEnabled) {
      e.target !== t.getLastFocusedElement() && (e.target.setAttribute("data-focusManager", v), p.push(v), v++);
      if (p.length > h) {
        var n = p.shift();
        y(n);
      }
    }
  }
  function g(e) {
    return o.querySelector("[" + c + "=\"" + e + "\"]");
  }
  function y(e) {
    var t = g(e);
    t && t.removeAttribute(c);
  }
  var n = e("services/serviceLocator"), r = e("constants/common"), i = e("ui/telemetry/actions/actionNames"), s = e("browser/dom"), o = e("browser/document"), u = e("browser/detect"), a = ".swx .chat .inputField", f = ".swx .search .inputField", l = "#swxSplashScreen", c = "data-focusManager", h = 2, p = [], d = null, v = 0;
  return t.focusTrackingEnabled = !1, t.reset = function () {
    p.forEach(y);
    p = [];
    v = 0;
  }, t.setDefaultFocusElement = function (e) {
    d = e;
  }, t.getDefaultFocusElement = function () {
    return d;
  }, t.getLastFocusedElement = function () {
    return p.length ? g(p[p.length - 1]) : null;
  }, t.removeLastFocusedElement = function () {
    var e = p.pop();
    y(e);
  }, t.registerContainer = function (e) {
    e.addEventListener("focus", m, !0);
  }, t.unregisterContainer = function (e) {
    e.removeEventListener("focus", m, !0);
  }, t.tryRestoreFocus = function () {
    if (!t.focusTrackingEnabled)
      return;
    var e = n.resolve(r.serviceLocator.ACTION_TELEMETRY);
    e.recordAction(i.focusManager.tryRestoreFocus);
    var s = t.getLastFocusedElement();
    s && s.focus();
    if (s === o.activeElement)
      return;
    var u = o.querySelector(l);
    if (u)
      return;
    var c = o.querySelector(a), h = o.querySelector(f);
    c && c.focus();
    if (c === o.activeElement)
      return;
    h && h.focus();
  }, t.isAnyElementFocused = function () {
    var e = o.activeElement;
    return !!(!u.getBrowserInfo().isIeEngine || e && Object.keys(e).length) && !s.isA(e, "body");
  }, t;
});

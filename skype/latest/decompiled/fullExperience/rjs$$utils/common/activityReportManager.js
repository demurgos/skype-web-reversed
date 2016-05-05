define("utils/common/activityReportManager", [
  "require",
  "exports",
  "module",
  "cafe/applicationInstance",
  "constants/common",
  "browser/document",
  "browser/window",
  "browser/dom"
], function (e, t) {
  function l() {
    n.get().personsAndGroupsManager.mePerson.active(!0), u = null;
  }
  function c() {
    n.get().personsAndGroupsManager.mePerson.active(!1), a = null;
  }
  function h() {
    return n.get().personsAndGroupsManager.mePerson.active();
  }
  function p() {
    s.addEventListener(r.events.browser.FOCUS, v), s.addEventListener(r.events.browser.BLUR, m), i.addEventListener(r.events.browser.VISIBILITYCHANGE, v);
  }
  function d() {
    s.removeEventListener(r.events.browser.FOCUS, v), s.removeEventListener(r.events.browser.BLUR, m), i.removeEventListener(r.events.browser.VISIBILITYCHANGE, v);
  }
  function v() {
    !o.isDocumentHidden() && !h() ? u || (u = s.setTimeout(l, f)) : m();
  }
  function m() {
    u && (s.clearTimeout(u), u = null);
  }
  function g() {
    s.addEventListener(r.events.browser.FOCUS, E), s.addEventListener(r.events.browser.BLUR, w), i.addEventListener(r.events.browser.VISIBILITYCHANGE, b);
  }
  function y() {
    s.removeEventListener(r.events.browser.FOCUS, E), s.removeEventListener(r.events.browser.BLUR, w), i.removeEventListener(r.events.browser.VISIBILITYCHANGE, b);
  }
  function b() {
    o.isDocumentHidden() && h() ? a || (a = s.setTimeout(c, f)) : E();
  }
  function w() {
    h() && (a || (a = s.setTimeout(c, f)));
  }
  function E() {
    a && (s.clearTimeout(a), a = null);
  }
  function S() {
    p(), y();
  }
  function x() {
    d(), g();
  }
  var n = e("cafe/applicationInstance"), r = e("constants/common"), i = e("browser/document"), s = e("browser/window"), o = e("browser/dom"), u, a, f = 3000;
  t.init = function () {
    var e = n.get().personsAndGroupsManager.mePerson.active;
    e.when(!0, x), e.when(!1, S);
  };
})

define("utils/common/outsideClickHandler", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "browser/dom",
  "browser/document",
  "constants/common",
  "constants/cssClasses",
  "constants/keys"
], function (e, t) {
  function f(e) {
    function t(t) {
      var n = !!r.getParentWithClass(e.target, t.name);
      n || t.callback();
    }
    if (!a)
      return;
    a.forEach(t);
  }
  function l() {
    return !!r.getElement("." + o.contextMenu.CONTEXT_MENU);
  }
  function c(e) {
    var t = e.which || e.keyCode;
    if (!a || t !== u.ESCAPE || l())
      return;
    a.forEach(function (e) {
      e.callback();
    }), e.stopPropagation();
  }
  function h(e) {
    n.remove(a, function (t) {
      return t.name === e;
    });
  }
  var n = e("lodash-compat"), r = e("browser/dom"), i = e("browser/document"), s = e("constants/common"), o = e("constants/cssClasses"), u = e("constants/keys"), a = null;
  t.add = function (e, t) {
    if (!e)
      throw new Error("className is mandatory");
    if (!t)
      throw new Error("handler is not provided");
    a = a || [], h(e), a.length === 0 && (i.body.addEventListener(s.events.browser.CLICK, f, !0), i.body.addEventListener(s.events.browser.KEYDOWN, c, !0)), a.push({
      name: e,
      callback: t
    });
  }, t.remove = function (e) {
    if (!e)
      throw new Error("className is mandatory");
    h(e);
    if (a === null || a.length > 0)
      return;
    a = null, i.body.removeEventListener(s.events.browser.CLICK, f, !0), i.body.removeEventListener(s.events.browser.KEYDOWN, c, !0);
  }, t._getListenters = function () {
    return a;
  }, t._dispose = function () {
    a = null, i.body.removeEventListener(s.events.browser.CLICK, f, !0), i.body.removeEventListener(s.events.browser.KEYDOWN, c, !0);
  };
})

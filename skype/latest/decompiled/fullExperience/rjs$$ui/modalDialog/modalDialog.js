define("ui/modalDialog/modalDialog", [
  "require",
  "exports",
  "module",
  "browser/dom",
  "browser/document",
  "vendor/knockout",
  "swx-constants",
  "swx-constants",
  "swx-overlay",
  "constants/cssClasses",
  "utils/common/accessibility",
  "swx-g11n"
], function (e, t) {
  function h(e, t) {
    var s, o = n.getElementById(e);
    return o && i.removeNode(o), s = n.createElement("div"), s.innerHTML = t, o = s.firstChild, r.body.appendChild(o), o;
  }
  function p() {
    return n.findElement("." + a.MODAL_DIALOG + ":not(." + a.HIDE + ")");
  }
  function d() {
    r.addEventListener(o.events.browser.KEYDOWN, m, !1);
  }
  function v() {
    r.removeEventListener(o.events.browser.KEYDOWN, m, !1);
  }
  function m(e) {
    e.keyCode === s.ESCAPE && t.hide();
  }
  var n = e("browser/dom"), r = e("browser/document"), i = e("vendor/knockout"), s = e("swx-constants").KEYS, o = e("swx-constants").COMMON, u = e("swx-overlay"), a = e("constants/cssClasses"), f = e("utils/common/accessibility"), l = e("swx-g11n").globalization, c = !1;
  t.build = function (e, t, n) {
    var r = h(e, n);
    return i.applyBindings(t, r), r;
  };
  t.show = function (e, t, r, i) {
    var s, o, h = u.isOverlayDisplayed();
    r = r || "";
    u.display(e, t, r, {
      containerClasses: [
        a.base.SWX,
        a.base.DESKTOP
      ],
      skipSlideCreation: i
    });
    h || f.initFocusRing(u.getOverlayContainer());
    s = n.getElementById(e);
    o = n.getParentWithClass(s, a.base.OVERLAY_CONTAINER);
    l.initLocaleDirection(o);
    n.removeClass(s, a.HIDE);
    d();
    c = !0;
  };
  t.hide = function (e) {
    var t = n.getElementById(e) || p();
    v();
    u.hide();
    t && n.addClass(t, a.HIDE);
    c = !1;
  };
  t.dispose = function (e) {
    var r = n.getElementById(e) || p();
    t.hide(e);
    r && i.removeNode(r);
  };
  t.isDisplayed = function () {
    return c;
  };
});

define("ui/modalDialog/modalDialog", [
  "require",
  "exports",
  "module",
  "browser/dom",
  "browser/document",
  "vendor/knockout",
  "constants/keys",
  "constants/common",
  "swx-overlay",
  "constants/cssClasses",
  "utils/common/accessibility",
  "services/g11n/globalization"
], function (e, t) {
  function c(e, t) {
    var s, o = n.getElementById(e);
    return o && i.removeNode(o), s = n.createElement("div"), s.innerHTML = t, o = s.firstChild, r.body.appendChild(o), o;
  }
  function h() {
    return n.findElement("." + a.MODAL_DIALOG + ":not(." + a.HIDE + ")");
  }
  function p() {
    r.addEventListener(o.events.browser.KEYDOWN, v, !1);
  }
  function d() {
    r.removeEventListener(o.events.browser.KEYDOWN, v, !1);
  }
  function v(e) {
    e.keyCode === s.ESCAPE && t.hide();
  }
  var n = e("browser/dom"), r = e("browser/document"), i = e("vendor/knockout"), s = e("constants/keys"), o = e("constants/common"), u = e("swx-overlay"), a = e("constants/cssClasses"), f = e("utils/common/accessibility"), l = e("services/g11n/globalization");
  t.build = function (e, t, n) {
    var r = c(e, n);
    return i.applyBindings(t, r), r;
  };
  t.show = function (e, t, r) {
    var i, s, o = u.isOverlayDisplayed();
    r = r || "";
    u.display(e, t, r, {
      containerClasses: [
        a.base.SWX,
        a.base.DESKTOP
      ]
    });
    o || f.initFocusRing(u.getOverlayContainer());
    i = n.getElementById(e);
    s = n.getParentWithClass(i, a.base.OVERLAY_CONTAINER);
    l.initLocaleDirection(s);
    n.removeClass(i, a.HIDE);
    p();
  };
  t.hide = function (e) {
    var t = n.getElementById(e) || h();
    d();
    u.hide();
    t && n.addClass(t, a.HIDE);
  };
  t.dispose = function (e) {
    var r = n.getElementById(e) || h();
    t.hide(e);
    r && i.removeNode(r);
  };
});

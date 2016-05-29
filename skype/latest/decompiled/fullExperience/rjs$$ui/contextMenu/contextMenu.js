define("ui/contextMenu/contextMenu", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "lodash-compat",
  "constants/cssClasses",
  "constants/common",
  "services/serviceLocator",
  "browser/window",
  "browser/dom",
  "utils/common/accessibility",
  "utils/common/async",
  "ui/telemetry/actions/actionNames",
  "browser/document",
  "ui/contextMenu/menuItemGroup",
  "constants/keys",
  "utils/common/eventHelper"
], function (e, t) {
  function T(e) {
    if (e && !N(e)) {
      var t = o.resolve(s.serviceLocator.ACTION_TELEMETRY);
      t.recordAction(c.contextMenu.hidden);
    }
  }
  function N(e) {
    return C(e.target);
  }
  function C(e) {
    return !!a.getParentWithClass(e, i.contextMenu.CONTEXT_MENU);
  }
  function k(e) {
    var t, n;
    for (t = 0; t < e.length; t++) {
      n = e[t];
      if (D(n) && k(n.items) || !D(n) && n.isEnabled())
        return !0;
    }
    return !1;
  }
  function L(e) {
    b = a.createElement("ul");
    b.classList.add(i.contextMenu.CONTEXT_MENU);
    A();
    O(e);
    f.initFocusRing(b);
    b.setAttribute("data-bind", "keyboardNavigation: { itemSelector: \"." + i.LIST_SELECTABLE + "\" }");
    n.applyBindings(g, b);
    h.body.appendChild(b);
    b.focus();
  }
  function A() {
    m = a.createElement("div");
    m.className = "arrow";
    b.appendChild(m);
  }
  function O(e) {
    var t, n;
    for (t = 0; t < e.length; t++)
      n = e[t], !M(t) && H(n) && !P(e, t) && F(), D(n) ? B(n.items) : n.isEnabled() && j(n), H(n) && _(e, t) && F();
  }
  function M(e) {
    return e === 0;
  }
  function _(e, t) {
    return t < e.length - 1;
  }
  function D(e) {
    return e instanceof p;
  }
  function P(e, t) {
    return !M(t) && D(e[t - 1]);
  }
  function H(e) {
    return D(e) && k(e.items);
  }
  function B(e) {
    e.forEach(function (e) {
      e.isEnabled() && j(e);
    });
  }
  function j(e) {
    var n = a.createElement("li"), r = a.createElement("span");
    a.addClass(n, i.LIST_SELECTABLE);
    e.cssClass && a.addClass(n, e.cssClass);
    r.textContent = e.label;
    n.appendChild(r);
    n.addEventListener(s.events.browser.CLICK, e.action, !0);
    g.itemActions.push(function () {
      e.action();
      t.hide();
    });
    n.setAttribute("data-bind", "enterKey: itemActions[" + (g.itemActions.length - 1) + "]");
    b.appendChild(n);
  }
  function F() {
    var e = a.createElement("hr");
    b.appendChild(e);
  }
  function I(e) {
    e.clientX === undefined && (e.clientX = 0);
    e.clientY === undefined && (e.clientY = 0);
    q(e);
    U(e);
  }
  function q(e) {
    var n, r, i = W(e), s = b.offsetWidth / 2, o = i + s, u = window.innerWidth - o > 0;
    u ? (r = i - s > t.MENU_BORDER_WIDTH, r ? n = i - s : n = t.MENU_BORDER_WIDTH) : n = window.innerWidth - b.offsetWidth - t.MENU_BORDER_WIDTH;
    b.style.left = n + "px";
    R(e, n);
  }
  function R(e, n) {
    var r = W(e), i = r - n, s = i - t.ARROW_WIDTH / 2, o = t.MENU_BORDER_WIDTH, u = b.offsetWidth - t.MENU_BORDER_WIDTH - t.ARROW_WIDTH;
    s = Math.max(o, Math.min(s, u));
    m.style.left = s + "px";
  }
  function U(e) {
    var n, r = X(e), i = window.innerHeight - (r + b.offsetHeight) > 0;
    i ? (n = r + t.ARROW_HEIGHT, b.style.top = n + "px") : z(e);
  }
  function z(e) {
    var n = X(e);
    a.addClass(b, i.contextMenu.FLIPPED);
    b.style.top = n - t.ARROW_HEIGHT - b.offsetHeight + "px";
  }
  function W(e) {
    return e.customClientOffset ? e.customClientOffset.offsetLeft : e.clientX;
  }
  function X(e) {
    return e.customClientOffset ? e.customClientOffset.offsetTop : e.clientY;
  }
  function V(e) {
    var n = v.getKeyCode(e);
    n === d.ESCAPE && t.hide(e);
  }
  function $(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  function J() {
    var e = o.resolve(s.serviceLocator.PUBSUB);
    l.execute(function () {
      h.addEventListener(s.events.browser.CLICK, t.hide);
      h.addEventListener(s.events.browser.KEYDOWN, V);
      u.addEventListener(s.events.browser.RESIZE, t.hide);
      e.subscribe(s.events.interaction.SCROLL_START, t.hide);
      b.addEventListener(s.events.browser.CONTEXTMENU, $);
    });
  }
  function K() {
    var e = o.resolve(s.serviceLocator.PUBSUB);
    h.removeEventListener(s.events.browser.CLICK, t.hide);
    h.removeEventListener(s.events.browser.KEYDOWN, V);
    u.removeEventListener(s.events.browser.RESIZE, t.hide);
    e.unsubscribe(s.events.interaction.SCROLL_START, t.hide);
    b.removeEventListener(s.events.browser.CONTEXTMENU, $);
  }
  function Q() {
    y && r.forEach(y, function (e) {
      e.dispose && e.dispose();
    });
  }
  var n = e("vendor/knockout"), r = e("lodash-compat"), i = e("constants/cssClasses"), s = e("constants/common"), o = e("services/serviceLocator"), u = e("browser/window"), a = e("browser/dom"), f = e("utils/common/accessibility"), l = e("utils/common/async"), c = e("ui/telemetry/actions/actionNames"), h = e("browser/document"), p = e("ui/contextMenu/menuItemGroup"), d = e("constants/keys"), v = e("utils/common/eventHelper"), m, g = { itemActions: [] }, y, b = null, w = null, E, S = 0, x = 200;
  t.MENU_BORDER_WIDTH = 1;
  t.ARROW_WIDTH = 40;
  t.ARROW_HEIGHT = 11;
  t.show = function (e, n, r) {
    var i = o.resolve(s.serviceLocator.ACTION_TELEMETRY);
    t.hide();
    E = h.activeElement;
    y = e;
    r = r || {};
    k(e) && (S = Date.now(), w = n.target, L(e), I(n), J(), i.recordAction(c.contextMenu.shown, r));
  };
  t.hide = function (e) {
    function t() {
      var t;
      return b ? (t = Date.now() - S, !e || e.type === s.events.browser.SCROLL && n(w, e.target) || e.type === s.events.browser.RESIZE || t > x) : !1;
    }
    function n(e, t) {
      while (e) {
        if (e === t)
          return !0;
        e = e.parentNode;
      }
      return !1;
    }
    if (e && e.which === 3)
      return;
    t() && (T(e), K(), Q(), m = null, w = null, b.parentElement.removeChild(b), b = null, S = 0, g.itemActions = [], e && v.getKeyCode(e) === d.ESCAPE && E.focus(), E = null);
  };
  t.isShowing = function () {
    return b !== null;
  };
});

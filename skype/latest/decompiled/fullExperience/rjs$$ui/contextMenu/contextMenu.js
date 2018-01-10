define("ui/contextMenu/contextMenu", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "lodash-compat",
  "constants/cssClasses",
  "swx-constants",
  "swx-service-locator-instance",
  "browser/window",
  "browser/dom",
  "utils/common/accessibility",
  "swx-focus-handler",
  "swx-utils-common",
  "ui/telemetry/actions/actionNames",
  "browser/document",
  "ui/contextMenu/menuItemGroup",
  "swx-constants",
  "utils/common/eventHelper",
  "swx-enums"
], function (e, t) {
  function C(e) {
    if (e && !k(e)) {
      var t = o.resolve(s.serviceLocator.ACTION_TELEMETRY);
      t.recordAction(h.contextMenu.hidden);
    }
  }
  function k(e) {
    return L(e.target);
  }
  function L(e) {
    return !!a.getParentWithClass(e, i.contextMenu.CONTEXT_MENU);
  }
  function A(e) {
    var t, n;
    for (t = 0; t < e.length; t++) {
      n = e[t];
      if (H(n) && A(n.items) || !H(n) && n.isEnabled())
        return !0;
    }
    return !1;
  }
  function O(e) {
    E = a.createElement("ul");
    E.classList.add(i.contextMenu.CONTEXT_MENU);
    E.setAttribute("role", "listbox");
    E.setAttribute("aria-expanded", "true");
    M();
    _(e);
    f.initFocusRing(E);
    E.setAttribute("data-bind", "focusHandler: { priority: 1 }, keyboardNavigation: { itemSelector: \"." + i.LIST_SELECTABLE + "\" }");
    n.applyBindings(b, E);
    p.body.appendChild(E);
  }
  function M() {
    y = a.createElement("div");
    y.className = "arrow";
    y.setAttribute("aria-hidden", "true");
    E.appendChild(y);
  }
  function _(e) {
    var t, n;
    for (t = 0; t < e.length; t++)
      n = e[t], !D(t) && j(n) && !B(e, t) && q(), H(n) ? F(n.items) : n.isEnabled() && I(n), j(n) && P(e, t) && q();
  }
  function D(e) {
    return e === 0;
  }
  function P(e, t) {
    return t < e.length - 1;
  }
  function H(e) {
    return e instanceof d;
  }
  function B(e, t) {
    return !D(t) && H(e[t - 1]);
  }
  function j(e) {
    return H(e) && A(e.items);
  }
  function F(e) {
    e.forEach(function (e) {
      e.isEnabled() && I(e);
    });
  }
  function I(e) {
    var n = a.createElement("li"), r = a.createElement("span");
    a.addClass(n, i.LIST_SELECTABLE);
    e.cssClass && a.addClass(n, e.cssClass);
    r.textContent = e.label;
    n.appendChild(r);
    n.addEventListener(s.events.browser.CLICK, e.action, !0);
    b.itemActions.push(function () {
      e.action();
      t.hide();
    });
    n.setAttribute("data-bind", "event:{mousemove: onMouseMove}, enterKey: itemActions[" + (b.itemActions.length - 1) + "]");
    n.setAttribute("role", "option");
    E.appendChild(n);
  }
  function q() {
    var e = a.createElement("li");
    a.addClass(e, "separator");
    E.appendChild(e);
  }
  function R(e) {
    e.clientX === undefined && (e.clientX = 0);
    e.clientY === undefined && (e.clientY = 0);
    var t = U(e), n = e.customClientOptions || {};
    z(t);
    X(t, n);
  }
  function U(e) {
    var t = e.customClientOptions || {};
    if (!t.offsetElement)
      return {
        left: e.clientX,
        top: e.clientY,
        bottom: e.clientY
      };
    var n = t.offsetElement, r = a.getElementOffset(n), i = n.offsetWidth / 2;
    return {
      left: r.offsetLeft + i,
      top: r.offsetTop,
      bottom: r.offsetTop + n.offsetHeight
    };
  }
  function z(e) {
    var n, r, i = e.left, s = E.offsetWidth / 2, o = i + s, u = window.innerWidth - o > 0;
    u ? (r = i - s > t.MENU_BORDER_WIDTH, r ? n = i - s : n = t.MENU_BORDER_WIDTH) : n = window.innerWidth - E.offsetWidth - t.MENU_BORDER_WIDTH;
    E.style.left = n + "px";
    W(e, n);
  }
  function W(e, n) {
    var r = e.left, i = r - n, s = i - t.ARROW_WIDTH / 2, o = t.MENU_BORDER_WIDTH, u = E.offsetWidth - t.MENU_BORDER_WIDTH - t.ARROW_WIDTH;
    s = Math.max(o, Math.min(s, u));
    y.style.left = s + "px";
  }
  function X(e, n) {
    var r, s, o = n.position || g.contextMenuPosition.Bottom, u = n.offset || 0, f = e.top < window.innerHeight / 2;
    f && o === g.contextMenuPosition.Bottom ? (s = e.bottom, r = s + t.ARROW_HEIGHT + u) : (s = e.top, r = s - t.ARROW_HEIGHT - E.offsetHeight - u, a.addClass(E, i.contextMenu.FLIPPED));
    E.style.top = r + "px";
  }
  function V(e) {
    var n = m.getKeyCode(e);
    n === v.ESCAPE && t.hide(e);
  }
  function $(e, t) {
    t.currentTarget && l.get().addFocusRequestToQueue(t.currentTarget, l.Priorities.Immediate);
  }
  function J(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  function K() {
    var e = o.resolve(s.serviceLocator.PUBSUB);
    c.execute(function () {
      p.addEventListener(s.events.browser.CLICK, t.hide);
      p.addEventListener(s.events.browser.KEYDOWN, V);
      u.addEventListener(s.events.browser.RESIZE, t.hide);
      e.subscribe(s.events.interaction.SCROLL_START, t.hide);
      E.addEventListener(s.events.browser.CONTEXTMENU, J);
    });
  }
  function Q() {
    var e = o.resolve(s.serviceLocator.PUBSUB);
    p.removeEventListener(s.events.browser.CLICK, t.hide);
    p.removeEventListener(s.events.browser.KEYDOWN, V);
    u.removeEventListener(s.events.browser.RESIZE, t.hide);
    e.unsubscribe(s.events.interaction.SCROLL_START, t.hide);
    E.removeEventListener(s.events.browser.CONTEXTMENU, J);
  }
  function G() {
    w && r.forEach(w, function (e) {
      e.dispose && e.dispose();
    });
  }
  var n = e("vendor/knockout"), r = e("lodash-compat"), i = e("constants/cssClasses"), s = e("swx-constants").COMMON, o = e("swx-service-locator-instance").default, u = e("browser/window"), a = e("browser/dom"), f = e("utils/common/accessibility"), l = e("swx-focus-handler"), c = e("swx-utils-common").async, h = e("ui/telemetry/actions/actionNames"), p = e("browser/document"), d = e("ui/contextMenu/menuItemGroup"), v = e("swx-constants").KEYS, m = e("utils/common/eventHelper"), g = e("swx-enums"), y, b = {
      itemActions: [],
      onMouseMove: $
    }, w, E = null, S = null, x, T = 0, N = 200;
  t.MENU_BORDER_WIDTH = 1;
  t.ARROW_WIDTH = 40;
  t.ARROW_HEIGHT = 11;
  t.isVisible = n.observable(!1);
  t.show = function (e, n, r, i) {
    var u = o.resolve(s.serviceLocator.ACTION_TELEMETRY);
    t.hide(null, i);
    x = p.activeElement;
    w = e;
    r = r || {};
    if (A(e)) {
      if (i) {
        var a = o.resolve(s.serviceLocator.PUBSUB);
        a.publish(s.events.contextMenu.MENU_SHOWN);
      }
      T = Date.now();
      S = n.target;
      O(e);
      R(n);
      K();
      t.isVisible(!0);
      u.recordAction(h.contextMenu.shown, r);
    }
  };
  t.hide = function (e, n) {
    function i() {
      return e && e.type === s.events.browser.SCROLL ? !0 : e && e.target ? L(e.target) : n || !1;
    }
    function u() {
      var t;
      return E ? (t = Date.now() - T, e && e.type === s.events.browser.SCROLL ? a(S, e.target) : !e || e.type === s.events.browser.RESIZE || t > N) : !1;
    }
    function a(e, t) {
      while (e) {
        if (e === t)
          return !0;
        e = e.parentNode;
      }
      return !1;
    }
    if (e && e.which === 3)
      return;
    if (u()) {
      var r = o.resolve(s.serviceLocator.PUBSUB);
      r.publish(s.events.contextMenu.MENU_HIDDEN, i());
      C(e);
      Q();
      G();
      y = null;
      S = null;
      E.parentElement.removeChild(E);
      E = null;
      T = 0;
      b.itemActions = [];
      e && m.getKeyCode(e) === v.ESCAPE && l.get().addFocusRequestToQueue(x);
      x = null;
      t.isVisible(!1);
    }
  };
  t.isShowing = function () {
    return E !== null;
  };
});

define("ui/viewModels/educationBubbles/educationBubbleViewModel", [
  "require",
  "exports",
  "module",
  "swx-service-locator-instance",
  "swx-constants",
  "browser/window",
  "browser/document",
  "browser/dom",
  "vendor/knockout",
  "lodash-compat",
  "utils/common/rtlChecker"
], function (e, t) {
  function h(e, h, p, d, v, m) {
    function N() {
      f.isRtl() && (m.orientation === r.educationBubbles.ORIENTATION.LEFT ? m.orientation = r.educationBubbles.ORIENTATION.RIGHT : m.orientation === r.educationBubbles.ORIENTATION.RIGHT && (m.orientation = r.educationBubbles.ORIENTATION.LEFT));
    }
    function C() {
      if (!E.hidden())
        switch (m.orientation) {
        case r.educationBubbles.ORIENTATION.TOP:
          k();
          break;
        case r.educationBubbles.ORIENTATION.LEFT:
          L();
          break;
        case r.educationBubbles.ORIENTATION.RIGHT:
          A();
          break;
        default:
          O();
        }
    }
    function k() {
      B();
      R();
    }
    function L() {
      M() ? P() : D() ? H() : O();
    }
    function A() {
      D() ? H() : M() ? P() : O();
    }
    function O() {
      j();
      R();
    }
    function M() {
      var e = b.BUBBLE_WIDTH + b.ARROW_HEIGHT, t = h.getBoundingClientRect();
      return t.left - e > b.OUTER_SPACING;
    }
    function D() {
      var e = b.BUBBLE_WIDTH + b.ARROW_HEIGHT, t = h.getBoundingClientRect();
      return t.right + e < s.documentElement.clientWidth - b.OUTER_SPACING;
    }
    function P() {
      F();
      U();
    }
    function H() {
      F();
      z();
    }
    function B() {
      var e = Math.ceil(p.getBoundingClientRect().bottom - h.getBoundingClientRect().top);
      E.bottom(e + b.ARROW_HEIGHT + c);
      E.arrowBottom(e + c);
      E.orientation(r.educationBubbles.ORIENTATION.TOP);
    }
    function j() {
      var e = Math.floor(h.getBoundingClientRect().bottom - p.getBoundingClientRect().top);
      E.top(e + b.ARROW_HEIGHT + c);
      E.arrowTop(e + c);
      E.orientation(r.educationBubbles.ORIENTATION.BOTTOM);
    }
    function F() {
      var e = Math.floor(h.getBoundingClientRect().bottom - p.getBoundingClientRect().top - h.getBoundingClientRect().height / 2);
      E.top(e - b.BUBBLE_MIN_HEIGHT / 2 + c);
      E.arrowTop(e + c);
    }
    function I() {
      return s.documentElement.clientWidth;
    }
    function q(e) {
      return e.width;
    }
    function R() {
      var e = p.getBoundingClientRect(), t = h.getBoundingClientRect(), n = t.left - e.left + t.width / 2, r = b.OUTER_SPACING, i = w(e) - b.BUBBLE_WIDTH - b.OUTER_SPACING, s = Math.max(Math.min(n - b.BUBBLE_WIDTH / 2, i), r);
      E.left(Math.floor(s) + c);
      E.right(l);
      E.arrowLeft(Math.floor(n - b.ARROW_WIDTH / 2) + c);
      E.arrowRight(l);
    }
    function U() {
      var e = b.BUBBLE_WIDTH + b.ARROW_HEIGHT, t = h.getBoundingClientRect();
      E.left(t.left - e + c);
      E.right(l);
      E.arrowLeft(Math.floor(t.left - b.ARROW_HEIGHT / 2 - b.ARROW_WIDTH / 2) + c);
      E.arrowRight(l);
      E.orientation(r.educationBubbles.ORIENTATION.LEFT);
    }
    function z() {
      var e = h.getBoundingClientRect();
      E.left(e.right + b.ARROW_HEIGHT + c);
      E.right(l);
      E.arrowLeft(Math.floor(e.right + b.ARROW_HEIGHT / 2 - b.ARROW_WIDTH / 2) + c);
      E.arrowRight(l);
      E.orientation(r.educationBubbles.ORIENTATION.RIGHT);
    }
    function W(e) {
      var t = s.querySelector(e);
      t && (y = o.createDomObserverSubscription(t, C));
    }
    function X() {
      E.title = m.title;
      m.buttonText && (E.buttonText = m.buttonText, E.hideBubble = E.hidden.bind(null, !0));
      b.OUTER_SPACING = 5;
      b.ARROW_WIDTH = 25;
      b.ARROW_HEIGHT = 9;
      b.BUBBLE_WIDTH = 150;
    }
    function V() {
      i.removeEventListener(r.events.browser.RESIZE, x);
      S.unsubscribe(r.events.narrowMode.SIDEBAR_STATE_CHANGED, T);
      g.dispose();
      y && y.dispose();
    }
    var g, y, b = t.DIMENSIONS_IN_PX, w = I, E = this, S = n.resolve(r.serviceLocator.PUBSUB), x = a.debounce(C, 100), T = function () {
        E.hidden(!0);
      };
    m = m || {};
    E.id = e;
    E.text = d;
    E.iconUrl = v;
    E.hidden = u.observable(!1);
    E.left = u.observable();
    E.right = u.observable();
    E.top = u.observable();
    E.bottom = u.observable();
    E.arrowLeft = u.observable();
    E.arrowRight = u.observable();
    E.arrowTop = u.observable();
    E.arrowBottom = u.observable();
    E.orientation = u.observable();
    g = E.hidden.subscribe(V);
    m.isBusinessFlagService && (w = q, X());
    N();
    C();
    i.addEventListener(r.events.browser.RESIZE, x);
    S.subscribe(r.events.narrowMode.SIDEBAR_STATE_CHANGED, T);
    m.mutatingContainerElementQuery && W(m.mutatingContainerElementQuery);
  }
  var n = e("swx-service-locator-instance").default, r = e("swx-constants").COMMON, i = e("browser/window"), s = e("browser/document"), o = e("browser/dom"), u = e("vendor/knockout"), a = e("lodash-compat"), f = e("utils/common/rtlChecker"), l = "auto", c = "px";
  t.DIMENSIONS_IN_PX = {
    OUTER_SPACING: 15,
    ARROW_WIDTH: 35,
    ARROW_HEIGHT: 9,
    BUBBLE_WIDTH: 288,
    BUBBLE_MIN_HEIGHT: 68
  };
  t.build = function (e, t, n, r, i, s) {
    return new h(e, t, n, r, i, s);
  };
});

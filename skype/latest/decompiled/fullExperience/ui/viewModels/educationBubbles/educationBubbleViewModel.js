define("ui/viewModels/educationBubbles/educationBubbleViewModel", [
  "require",
  "exports",
  "module",
  "services/serviceLocator",
  "constants/common",
  "browser/window",
  "browser/document",
  "browser/dom",
  "vendor/knockout",
  "lodash-compat",
  "utils/common/rtlChecker"
], function (e, t) {
  function h(e, h, p, d, v, m) {
    function x() {
      f.isRtl() && (m.orientation === r.educationBubbles.ORIENTATION.LEFT ? m.orientation = r.educationBubbles.ORIENTATION.RIGHT : m.orientation === r.educationBubbles.ORIENTATION.RIGHT && (m.orientation = r.educationBubbles.ORIENTATION.LEFT));
    }
    function T() {
      if (!b.hidden())
        switch (m.orientation) {
        case r.educationBubbles.ORIENTATION.TOP:
          N();
          break;
        case r.educationBubbles.ORIENTATION.LEFT:
          C();
          break;
        case r.educationBubbles.ORIENTATION.RIGHT:
          k();
          break;
        default:
          L();
        }
    }
    function N() {
      P(), j();
    }
    function C() {
      A() ? M() : O() ? D() : L();
    }
    function k() {
      O() ? D() : A() ? M() : L();
    }
    function L() {
      H(), j();
    }
    function A() {
      var e = t.BUBBLE_WIDTH_IN_PX + t.ARROW_HEIGHT_IN_PX, n = h.getBoundingClientRect();
      return n.left - e > t.OUTER_SPACING_IN_PX;
    }
    function O() {
      var e = t.BUBBLE_WIDTH_IN_PX + t.ARROW_HEIGHT_IN_PX, n = h.getBoundingClientRect();
      return n.right + e < s.documentElement.clientWidth - t.OUTER_SPACING_IN_PX;
    }
    function M() {
      B(), F();
    }
    function D() {
      B(), I();
    }
    function P() {
      var e = Math.ceil(p.getBoundingClientRect().bottom - h.getBoundingClientRect().top);
      b.bottom(e + t.ARROW_HEIGHT_IN_PX + c), b.arrowBottom(e + c), b.orientation(r.educationBubbles.ORIENTATION.TOP);
    }
    function H() {
      var e = Math.floor(h.getBoundingClientRect().bottom - p.getBoundingClientRect().top);
      b.top(e + t.ARROW_HEIGHT_IN_PX + c), b.arrowTop(e + c), b.orientation(r.educationBubbles.ORIENTATION.BOTTOM);
    }
    function B() {
      var e = Math.floor(h.getBoundingClientRect().bottom - p.getBoundingClientRect().top - h.getBoundingClientRect().height / 2);
      b.top(e - t.BUBBLE_MIN_HEIGH_IN_PX / 2 + c), b.arrowTop(e + c);
    }
    function j() {
      var e = p.getBoundingClientRect(), n = h.getBoundingClientRect(), r = n.left - e.left + n.width / 2, i = t.OUTER_SPACING_IN_PX, o = s.documentElement.clientWidth - t.BUBBLE_WIDTH_IN_PX - t.OUTER_SPACING_IN_PX, u = Math.max(Math.min(r - t.BUBBLE_WIDTH_IN_PX / 2, o), i);
      b.left(Math.floor(u) + c), b.right(l), b.arrowLeft(Math.floor(r - t.ARROW_WIDTH_IN_PX / 2) + c), b.arrowRight(l);
    }
    function F() {
      var e = t.BUBBLE_WIDTH_IN_PX + t.ARROW_HEIGHT_IN_PX, n = h.getBoundingClientRect();
      b.left(n.left - e + c), b.right(l), b.arrowLeft(Math.floor(n.left - t.ARROW_HEIGHT_IN_PX / 2 - t.ARROW_WIDTH_IN_PX / 2) + c), b.arrowRight(l), b.orientation(r.educationBubbles.ORIENTATION.LEFT);
    }
    function I() {
      var e = h.getBoundingClientRect();
      b.left(e.right + t.ARROW_HEIGHT_IN_PX + c), b.right(l), b.arrowLeft(Math.floor(e.right + t.ARROW_HEIGHT_IN_PX / 2 - t.ARROW_WIDTH_IN_PX / 2) + c), b.arrowRight(l), b.orientation(r.educationBubbles.ORIENTATION.RIGHT);
    }
    function q(e) {
      var t = s.querySelector(e);
      t && (y = o.createDomObserverSubscription(t, T));
    }
    function R() {
      i.removeEventListener(r.events.browser.RESIZE, E), w.unsubscribe(r.events.narrowMode.SIDEBAR_STATE_CHANGED, S), g.dispose(), y && y.dispose();
    }
    var g, y, b = this, w = n.resolve(r.serviceLocator.PUBSUB), E = a.debounce(T, 100), S = function () {
        b.hidden(!0);
      };
    m = m || {}, b.id = e, b.text = d, b.iconUrl = v, b.hidden = u.observable(!1), b.left = u.observable(), b.right = u.observable(), b.top = u.observable(), b.bottom = u.observable(), b.arrowLeft = u.observable(), b.arrowRight = u.observable(), b.arrowTop = u.observable(), b.arrowBottom = u.observable(), b.orientation = u.observable(), g = b.hidden.subscribe(R), x(), T(), i.addEventListener(r.events.browser.RESIZE, E), w.subscribe(r.events.narrowMode.SIDEBAR_STATE_CHANGED, S), m.mutatingContainerElementQuery && q(m.mutatingContainerElementQuery);
  }
  var n = e("services/serviceLocator"), r = e("constants/common"), i = e("browser/window"), s = e("browser/document"), o = e("browser/dom"), u = e("vendor/knockout"), a = e("lodash-compat"), f = e("utils/common/rtlChecker"), l = "auto", c = "px";
  t.OUTER_SPACING_IN_PX = 15, t.ARROW_WIDTH_IN_PX = 35, t.ARROW_HEIGHT_IN_PX = 9, t.BUBBLE_WIDTH_IN_PX = 288, t.BUBBLE_MIN_HEIGH_IN_PX = 68, t.build = function (e, t, n, r, i, s) {
    return new h(e, t, n, r, i, s);
  };
})

define("ui/viewModels/experience/sidebar", [
  "require",
  "lodash-compat",
  "cafe/applicationInstance",
  "vendor/knockout",
  "browser/window",
  "utils/common/async",
  "constants/common",
  "services/serviceLocator",
  "utils/common/styleModeHelper",
  "utils/common/resizeHandler"
], function (e) {
  function g(e) {
    function L(e) {
      e(v.NAVIGATE, P), e(v.OPEN_CONVERSATION, P), e(d.SHOW_SIDEBAR, g.slideIn), e(d.HIDE_SIDEBAR, g.slideOut);
    }
    function A(e) {
      e(m.QUERY_CHANGED, D), e(m.INPUT_FOCUS, O), e(m.INPUT_BLUR, M);
    }
    function O() {
      x = !0, g.expand();
    }
    function M(e) {
      x = !1, e === 0 && g.collapse();
    }
    function D(e) {
      e ? T = !0 : !e && x ? T = !1 : P();
    }
    function P() {
      x = !1, T = !1, g.collapse();
    }
    function H() {
      !g.isExpanded() && (T || x) && g.expand(), k.resize();
    }
    function B(e) {
      clearTimeout(C), e.timeout ? C = i.setTimeout(g.isExpanded.bind(g, e.expanded), e.timeout) : g.isExpanded(e.expanded);
    }
    function j(e) {
      clearTimeout(N), N = i.setTimeout(g.showTooltips.bind(g, e), p);
    }
    function F(e) {
      b.publish(d.SIDEBAR_STATE_CHANGED, e);
    }
    function I(e) {
      L(e ? b.subscribe.bind(b) : b.unsubscribe.bind(b)), !e && g.isExpanded() && g.isExpanded(!1);
    }
    function q(e) {
      return function () {
        g.isActive() && e.apply(g, arguments);
      };
    }
    var g = this, y = n.get(), b = u.resolve(o.serviceLocator.PUBSUB), w, E, S, x = !1, T = !1, N = 0, C = 0, k;
    g.isActive = r.pureComputed(function () {
      return a.get().currentMode() === o.styleMode.NARROW;
    }), g.isExpanded = r.observable(!1), g.showTooltips = r.observable(!1), g.showPreSlideClass = r.observable(!1), g.addSlideInClass = r.observable(!1), g.addSlideOutClass = r.observable(!1), g.init = function () {
      E = g.isActive.subscribe(I), S = g.isExpanded.subscribe(F), A(b.subscribe.bind(b)), w = t.debounce(H, l), i.addEventListener(o.events.browser.RESIZE, w), k = new f(e), s.execute(H), g.isActive() && L(b.subscribe.bind(b));
    }, g.dispose = function () {
      k.dispose(), E.dispose(), S.dispose(), L(b.unsubscribe.bind(b)), A(b.unsubscribe.bind(b)), i.removeEventListener(o.events.browser.RESIZE, w);
    }, g.expand = q(function (e) {
      g.isExpanded() || j(!0), B({
        expanded: !0,
        timeout: e && h
      });
    }), g.collapse = q(function (e) {
      x || (j(!1), T || B({
        expanded: !1,
        timeout: e && c
      }));
    }), g.slideIn = q(function () {
      g.addSlideInClass(!0), g.addSlideOutClass(!1);
    }), g.slideOut = q(function () {
      g.addSlideInClass(!1), g.addSlideOutClass(!0);
    }), g.slideTransitionEnded = function () {
      b.publish(d.SIDEBAR_TRANSITION_ENDED);
    }, g.handleUserAction = function () {
      return y.isEndpointActive && y.isEndpointActive.set(!0), !0;
    };
  }
  var t = e("lodash-compat"), n = e("cafe/applicationInstance"), r = e("vendor/knockout"), i = e("browser/window"), s = e("utils/common/async"), o = e("constants/common"), u = e("services/serviceLocator"), a = e("utils/common/styleModeHelper"), f = e("utils/common/resizeHandler"), l = 1000, c = 500, h = 1500, p = c, d = o.events.narrowMode, v = o.events.navigation, m = o.events.search;
  return g;
})

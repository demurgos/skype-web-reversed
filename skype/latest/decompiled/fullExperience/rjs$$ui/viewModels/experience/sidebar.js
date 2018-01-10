define("ui/viewModels/experience/sidebar", [
  "require",
  "lodash-compat",
  "swx-cafe-application-instance",
  "vendor/knockout",
  "browser/window",
  "swx-utils-common",
  "swx-constants",
  "swx-service-locator-instance",
  "utils/common/styleModeHelper",
  "utils/common/resizeHandler"
], function (e) {
  function y(e) {
    function O(e) {
      e(v.NAVIGATE, I);
      e(v.OPEN_CONVERSATION, I);
      e(d.SHOW_SIDEBAR, y.slideIn);
      e(d.HIDE_SIDEBAR, y.slideOut);
      e(g.MENU_SHOWN, j);
      e(g.MENU_HIDDEN, F);
    }
    function M(e) {
      e(m.QUERY_CHANGED, H);
      e(m.RESET, B);
      e(m.INPUT_FOCUS, D);
      e(m.INPUT_BLUR, P);
    }
    function D() {
      T = !0;
      y.expand();
    }
    function P(e) {
      T = !1;
      e === 0 && y.collapse(y);
    }
    function H(e) {
      e ? N = !0 : !e && T ? N = !1 : I();
    }
    function B() {
      T && (N = !1);
    }
    function j() {
      i.clearTimeout(L);
      C = !0;
    }
    function F(e) {
      C = !1;
      e || y.collapse();
    }
    function I() {
      T = !1;
      N = !1;
      C = !1;
      y.collapse();
      i.clearTimeout(L);
    }
    function q() {
      !y.isExpanded() && (N || T) && y.expand();
      A.resize();
    }
    function R(e) {
      i.clearTimeout(L);
      e.timeout ? L = i.setTimeout(y.isExpanded.bind(y, e.expanded), e.timeout) : y.isExpanded(e.expanded);
    }
    function U(e) {
      i.clearTimeout(k);
      k = i.setTimeout(y.showTooltips.bind(y, e), p);
    }
    function z(e) {
      w.publish(d.SIDEBAR_STATE_CHANGED, e);
    }
    function W(e) {
      O(e ? w.subscribe.bind(w) : w.unsubscribe.bind(w));
      !e && y.isExpanded() && y.isExpanded(!1);
    }
    function X(e) {
      C ? i.clearTimeout(L) : e();
    }
    function V(e) {
      return function () {
        y.isActive() && e.apply(y, arguments);
      };
    }
    var y = this, b = n.get(), w = u.resolve(o.serviceLocator.PUBSUB), E, S, x, T = !1, N = !1, C = !1, k = 0, L = 0, A;
    y.isActive = r.pureComputed(function () {
      return a.get().currentMode() === o.styleMode.NARROW;
    });
    y.isExpanded = r.observable(!1);
    y.showTooltips = r.observable(!1);
    y.showPreSlideClass = r.observable(!1);
    y.addSlideInClass = r.observable(!1);
    y.addSlideOutClass = r.observable(!1);
    y.init = function () {
      S = y.isActive.subscribe(W);
      x = y.isExpanded.subscribe(z);
      M(w.subscribe.bind(w));
      E = t.debounce(q, l);
      i.addEventListener(o.events.browser.RESIZE, E);
      A = new f(e);
      s.execute(q);
      y.isActive() && O(w.subscribe.bind(w));
    };
    y.dispose = function () {
      A.dispose();
      S.dispose();
      x.dispose();
      O(w.unsubscribe.bind(w));
      M(w.unsubscribe.bind(w));
      i.removeEventListener(o.events.browser.RESIZE, E);
    };
    y.expand = V(function (e) {
      function t() {
        y.isExpanded() || U(!0);
        R({
          expanded: !0,
          timeout: e && h
        });
      }
      X(t);
    });
    y.collapse = V(function (e) {
      function t() {
        T || (U(!1), N || R({
          expanded: !1,
          timeout: e && c
        }));
      }
      X(t);
    });
    y.slideIn = V(function () {
      y.addSlideInClass(!0);
      y.addSlideOutClass(!1);
    });
    y.slideOut = V(function () {
      y.addSlideInClass(!1);
      y.addSlideOutClass(!0);
    });
    y.slideTransitionEnded = function () {
      w.publish(d.SIDEBAR_TRANSITION_ENDED);
    };
    y.handleUserAction = function () {
      return b.isEndpointActive && b.isEndpointActive.set(!0), !0;
    };
  }
  var t = e("lodash-compat"), n = e("swx-cafe-application-instance"), r = e("vendor/knockout"), i = e("browser/window"), s = e("swx-utils-common").async, o = e("swx-constants").COMMON, u = e("swx-service-locator-instance").default, a = e("utils/common/styleModeHelper"), f = e("utils/common/resizeHandler"), l = 1000, c = 500, h = 500, p = c, d = o.events.narrowMode, v = o.events.navigation, m = o.events.search, g = o.events.contextMenu;
  return y;
});

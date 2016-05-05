define("bindings/ko.keyboardNavigation", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "constants/keys",
  "browser/window",
  "browser/document",
  "utils/common/eventHelper",
  "constants/common"
], function (e) {
  function a() {
    var e = "tabindex";
    n.bindingHandlers.keyboardNavigation = {
      init: function (a, f) {
        function h() {
          var e = p();
          e.forEach(E);
        }
        function p() {
          var e = a.querySelectorAll(c.itemSelector);
          return d(e);
        }
        function d(e) {
          return Array.prototype.slice.call(e);
        }
        function v() {
          a.addEventListener(u.events.browser.FOCUS, m, !0), a.addEventListener(u.events.browser.BLUR, g, !0), a.addEventListener(u.events.browser.KEYDOWN, y), n.utils.domNodeDisposal.addDisposeCallback(a, function () {
            a.removeEventListener(u.events.browser.FOCUS, m, !0), a.removeEventListener(u.events.browser.BLUR, g, !0), a.removeEventListener(u.events.browser.KEYDOWN, y);
          });
        }
        function m(e) {
          var t;
          if (!S(e.target))
            return;
          t = p();
          if (!t.length)
            return;
          E(a), h(), t.indexOf(l) !== -1 ? b(l) : c.selectLastItem ? b(t[t.length - 1]) : t.length && b(t[0]);
        }
        function g(e) {
          var t = e.target;
          i.setTimeout(function () {
            function n() {
              return S(t) || e.indexOf(s.activeElement) !== -1;
            }
            var e = p();
            n() || w(a);
          }, 1);
        }
        function y(e) {
          function i(n) {
            var r = t[t.indexOf(e.target)];
            do {
              r = t[t.indexOf(r) + n];
              if (!r)
                break;
              b(r);
            } while (s.activeElement !== r);
          }
          function u() {
            b(t[0]);
          }
          function a() {
            b(t[t.length - 1]);
          }
          var t, n = o.getKeyCode(e);
          if (T(e)) {
            N(e);
            return;
          }
          if (!x(n))
            return;
          return t = p(), e.preventDefault(), e.stopPropagation(), n === r.LEFT || n === r.UP ? i(-1) : n === r.RIGHT || n === r.DOWN ? i(1) : n === r.HOME ? u() : n === r.END && a(), !1;
        }
        function b(e) {
          e.focus(), c.persistSelection && (l = e);
        }
        function w(t) {
          t.setAttribute(e, 0);
        }
        function E(t) {
          t.setAttribute(e, -1);
        }
        function S(e) {
          return e === a;
        }
        function x(e) {
          var t = [
            r.LEFT,
            r.UP,
            r.RIGHT,
            r.DOWN,
            r.HOME,
            r.END
          ];
          return t.indexOf(e) > -1;
        }
        function T(e) {
          var t = o.getKeyCode(e);
          return e.shiftKey && t === r.F10;
        }
        function N(e) {
          var t = s.createEvent("MouseEvents"), n = e.target.getBoundingClientRect();
          e.preventDefault(), e.stopPropagation(), t.initMouseEvent("contextmenu", !0, !1, window, 0, 0, 0, n.right, n.top, !1, !1, !0, !1, 2, null), e.target.dispatchEvent(t);
        }
        var l, c = t.defaults(f(), {
            persistSelection: !0,
            selectLastItem: !1
          });
        w(a), h(), v();
      }
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("constants/keys"), i = e("browser/window"), s = e("browser/document"), o = e("utils/common/eventHelper"), u = e("constants/common");
  return { register: a };
})

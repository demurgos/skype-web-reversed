define("bindings/ko.keyboardNavigation", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "swx-focus-handler",
  "swx-constants",
  "browser/window",
  "browser/document",
  "utils/common/eventHelper",
  "swx-constants"
], function (e) {
  function f() {
    var e = "tabindex";
    n.bindingHandlers.keyboardNavigation = {
      init: function (f, l) {
        function p() {
          var e = d();
          e.forEach(S);
        }
        function d() {
          var e = f.querySelectorAll(h.itemSelector);
          return v(e);
        }
        function v(e) {
          return Array.prototype.slice.call(e);
        }
        function m() {
          f.addEventListener(a.events.browser.FOCUS, g, !0);
          f.addEventListener(a.events.browser.BLUR, y, !0);
          f.addEventListener(a.events.browser.KEYDOWN, b);
          n.utils.domNodeDisposal.addDisposeCallback(f, function () {
            f.removeEventListener(a.events.browser.FOCUS, g, !0);
            f.removeEventListener(a.events.browser.BLUR, y, !0);
            f.removeEventListener(a.events.browser.KEYDOWN, b);
          });
        }
        function g(e) {
          var t;
          if (!x(e.target))
            return;
          t = d();
          if (!t.length)
            return;
          S(f);
          p();
          t.indexOf(c) !== -1 ? w(c) : h.selectLastItem ? w(t[t.length - 1]) : t.length && w(t[0]);
        }
        function y(e) {
          var t = e.target;
          s.setTimeout(function () {
            function n() {
              return x(t) || e.indexOf(o.activeElement) !== -1;
            }
            var e = d();
            n() || E(f);
          }, 1);
        }
        function b(e) {
          function r(n) {
            var r = t[t.indexOf(e.target)];
            do {
              r = t[t.indexOf(r) + n];
              if (!r)
                break;
              w(r);
            } while (o.activeElement !== r);
          }
          function s() {
            w(t[0]);
          }
          function a() {
            w(t[t.length - 1]);
          }
          var t, n = u.getKeyCode(e);
          if (N(e)) {
            C(e);
            return;
          }
          if (!T(n))
            return;
          return t = d(), e.preventDefault(), e.stopPropagation(), n === i.LEFT || n === i.UP ? r(-1) : n === i.RIGHT || n === i.DOWN ? r(1) : n === i.HOME ? s() : n === i.END && a(), !1;
        }
        function w(e) {
          r.get().addFocusRequestToQueue(e, r.Priorities.Immediate);
          h.persistSelection && (c = e);
        }
        function E(t) {
          t.setAttribute(e, 0);
        }
        function S(t) {
          t.setAttribute(e, -1);
        }
        function x(e) {
          return e === f;
        }
        function T(e) {
          var t = [
            i.LEFT,
            i.UP,
            i.RIGHT,
            i.DOWN,
            i.HOME,
            i.END
          ];
          return t.indexOf(e) > -1;
        }
        function N(e) {
          var t = u.getKeyCode(e);
          return e.shiftKey && t === i.F10;
        }
        function C(e) {
          var t = o.createEvent("MouseEvents"), n = e.target.getBoundingClientRect();
          e.preventDefault();
          e.stopPropagation();
          t.initMouseEvent("contextmenu", !0, !1, window, 0, 0, 0, n.right, n.top, !1, !1, !0, !1, 2, null);
          e.target.dispatchEvent(t);
        }
        var c, h = t.defaults(l(), {
            persistSelection: !0,
            selectLastItem: !1
          });
        E(f);
        p();
        m();
      }
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("swx-focus-handler"), i = e("swx-constants").KEYS, s = e("browser/window"), o = e("browser/document"), u = e("utils/common/eventHelper"), a = e("swx-constants").COMMON;
  return { register: f };
});

define("ui/viewModels/calling/helpers/resizer", [
  "require",
  "lodash-compat"
], function (e) {
  var t = e("lodash-compat"), n, r, i, s = {
      ACTIVE: "resizeActive",
      MIN: "resizeMin",
      MAX: "resizeMax"
    }, o = {
      MOUSE_UP: "mouseup",
      MOUSE_MOVE: "mousemove"
    }, u = function () {
    };
  return r = function (e, n, r) {
    function l() {
      a = !0, document.addEventListener(o.MOUSE_MOVE, h), document.addEventListener(o.MOUSE_UP, c);
    }
    function c(e) {
      function f() {
        return t < u.top || t >= u.bottom;
      }
      var t = e.pageY, u = n.getBoundingClientRect();
      a = !1, f() && v(s.ACTIVE, { remove: !0 }), document.removeEventListener(o.MOUSE_MOVE, h), document.removeEventListener(o.MOUSE_UP, c), v([
        s.MAX,
        s.MIN
      ], { remove: !0 }), r.onResizeEnd(i);
    }
    function h(t) {
      function u() {
        return o <= 0;
      }
      function a() {
        return o >= n - r.minHeight;
      }
      var n = e.parentNode.offsetHeight, o = n - t.pageY;
      t.preventDefault();
      if (u()) {
        v(s.MAX);
        return;
      }
      if (a()) {
        v(s.MIN);
        return;
      }
      v([
        s.MAX,
        s.MIN
      ], { remove: !0 }), i = n - o, r.onResize(o);
    }
    function p() {
      Object.keys(f).forEach(function (e) {
        var t = f[e];
        n.addEventListener(e, t);
      });
    }
    function d() {
      Object.keys(f).forEach(function (e) {
        var t = f[e];
        n.removeEventListener(e, t);
      });
    }
    function v(e, r) {
      var i = "add";
      t.isArray(e) || (e = [e]), r && r.remove && (i = "remove"), e.forEach(function (e) {
        document.body.classList[i](e), e === s.ACTIVE && n.classList[i](e);
      });
    }
    var a = !1, f = {
        mouseenter: function () {
          v(s.ACTIVE);
        },
        mouseleave: function () {
          a || v(s.ACTIVE, { remove: !0 });
        },
        mousedown: function (e) {
          e.preventDefault(), l();
        }
      };
    return t.merge({
      minHeight: 0,
      onResize: u,
      onResizeEnd: u
    }, r || {}), p(), {
      dispose: function () {
        d();
      }
    };
  }, n = {
    build: function (e, t, n) {
      return new r(e, t, n);
    }
  }, n;
})

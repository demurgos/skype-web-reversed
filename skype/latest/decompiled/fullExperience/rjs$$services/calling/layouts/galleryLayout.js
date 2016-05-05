define("services/calling/layouts/galleryLayout", [
  "require",
  "lodash-compat",
  "services/calling/layouts/baseLayout",
  "constants/calling",
  "utils/common/array"
], function (e) {
  function u(e, u) {
    function h(t, n) {
      t.layoutPosition !== n && (t.layoutPosition = n, e(t));
    }
    function p(e) {
      l = Math.floor(e / s), l = Math.min(u, Math.max(o, l));
    }
    function d() {
      var e = m(), t = c.filter(function (t) {
          return t !== e;
        }), n = l;
      e && (h(e, r.STAGE), n = 0);
      for (var i = t.length - 1; i >= 0; i--)
        h(t[i], i < n ? r.STAGE : r.ROSTER);
    }
    function v(e) {
      return c.filter(function (t) {
        return t.participant === e && !t.isScreenSharing;
      })[0];
    }
    function m() {
      return c.filter(function (e) {
        return e.isScreenSharing === !0;
      })[0];
    }
    function g(e, n, r) {
      var s, o, a = Math.min(u, c.length);
      for (var f = 0; f < a; f++) {
        s = c[f];
        if (s.participant === r)
          return !1;
        o = t.contains(e, s.participant);
        if (!o)
          return i.swapItems(c, f, n), !0;
      }
    }
    n.call(this);
    var a = this, f, l = 1, c = [];
    a.addItem = function (e) {
      i.insertAt(c, l, e), d();
    }, a.removeItems = function (e) {
      var n = c.filter(e);
      n.length > 0 && (n.forEach(function (e) {
        t.remove(c, e);
      }), d());
    }, a.onActiveSpeakerChanged = function (e) {
      var t, n, r;
      e.forEach(function (i) {
        t = v(i), n = c.indexOf(t), t && n >= l && (r = g(e, n, i) || r);
      }), r && d();
    }, a.onWidthChanged = function (e) {
      if (e === f)
        return;
      f = e, p(e), d();
    };
  }
  var t = e("lodash-compat"), n = e("services/calling/layouts/baseLayout"), r = e("constants/calling").LAYOUT_PLACES, i = e("utils/common/array"), s = 400, o = 1;
  return u.prototype = Object.create(n.prototype), u.prototype.constructor = u, {
    build: function (e, t) {
      return new u(e, t);
    }
  };
})

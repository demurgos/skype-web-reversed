define("ui/viewModels/calling/helpers/stageResizer", [
  "require",
  "vendor/knockout",
  "swx-enums",
  "browser/detect",
  "browser/window"
], function (e) {
  function f(e) {
    function c(e) {
      if (!e)
        return null;
      var t = e.video.channels(0).stream, r = e.screenSharing.stream;
      return r.state() !== n.mediaStreamState.Stopped ? r : t.state() !== n.mediaStreamState.Stopped ? t : null;
    }
    function h(e) {
      if (!e)
        return u;
      var t = e.video.channels(0).stream;
      return t.state() === n.mediaStreamState.Stopped ? u : parseFloat((t.width() / t.height()).toFixed(10));
    }
    function p(e, t, n) {
      e.style.height = n + "px";
      e.style.width = t + "px";
    }
    function d(e, t, n, r) {
      var i = t.width(), s = t.height(), o = n / i, u = r / s;
      o < u ? (e.style.width = n + "px", e.style.height = s * o + "px") : (e.style.width = i * u + "px", e.style.height = r + "px");
    }
    function v() {
      return r.supportsCssProperty(r.CSS_PROPERTIES.OBJECT_FIT) || r.getBrowserInfo().browserName !== r.BROWSERS.EDGE;
    }
    function m(e) {
      if (!v()) {
        var t = e.querySelector(o);
        t && (t.style.position = "", t.style.height = "", t.style.width = "", t.style.top = "", t.style.left = "");
      }
    }
    function g(e, t, n, r) {
      var i = t.width(), s = t.height(), u = n / i, a = r / s, f = e.querySelector(o), l = (1 - r / (s * u)) / 2 * 100, c = (1 - n / (i * a)) / 2 * 100;
      f && (f.style.position = "relative", u > a ? (f.style.height = "auto", f.style.top = "-" + l + "%") : (f.style.width = "auto", f.style.left = "-" + c + "%"));
    }
    function y(e, t, n, r) {
      v() || (m(e), g(e, t, n, r));
    }
    function b(t, n, r) {
      var i = e()[0].participant, s = c(i);
      if (!s) {
        var o = Math.min(r, n);
        p(t, o, o);
        return;
      }
      f.isZoomedIn() ? (t.style.width = "100%", t.style.height = "100%", y(t, s, n, r)) : (m(t), d(t, s, n, r));
    }
    function w() {
      var t = f.isVideoFullScreenRequested && e().length === 1 && c(e()[0].participant);
      f.isZoomedIn(t);
    }
    function E() {
      w();
      var t, n, r = l.querySelectorAll(s), i = l.offsetWidth, o = l.offsetHeight;
      if (r.length === 1) {
        b(r[0], i, o);
        a = null;
        return;
      }
      var u = 0, f = [];
      Array.prototype.forEach.call(r, function (r, i) {
        m(r);
        n = e()[i].participant;
        t = h(n);
        u += t;
        f.push(t);
      });
      Array.prototype.forEach.call(r, function (e, t) {
        var n = Math.min(o, i / u) * f[t], r = n / f[t];
        p(e, n, r);
      });
      a = null;
    }
    var f = this, l;
    f.setStageContainer = function (e) {
      l = e;
    };
    f.isZoomedIn = t.observable();
    f.isVideoFullScreenRequested = !1;
    f.recalculateLayout = function () {
      if (!l)
        return;
      a && i.cancelAnimationFrame(a);
      a = i.requestAnimationFrame(E);
    };
  }
  var t = e("vendor/knockout"), n = e("swx-enums"), r = e("browser/detect"), i = e("browser/window"), s = ".participant-wrapper", o = "video", u = 1, a;
  return {
    build: function (e) {
      return new f(e);
    }
  };
});

define("utils/common/scroll", [], function () {
  function i(i) {
    function x(e) {
      e.preventDefault();
    }
    function T() {
      S ? (g.style.width = p + e, g.style.left = y.scrollLeft * c + e) : (g.style.height = p + e, g.style.top = y.scrollTop * c + e);
    }
    function N() {
      s.update();
    }
    function C(e) {
      S ? y.scrollLeft = (e.pageX - v) * h : y.scrollTop = (e.pageY - v) * h;
    }
    function k(e) {
      w || (window.addEventListener("mouseup", L), window.addEventListener("mousemove", C), i.classList.add("scrolling"), v = S ? e.pageX - g.offsetLeft : e.pageY - g.offsetTop, w = !0);
      x(e);
    }
    function L() {
      i.classList.remove("scrolling");
      window.removeEventListener("mouseup", L);
      window.removeEventListener("mousemove", C);
      w = !1;
    }
    function A(e) {
      S ? y.scrollLeft = M(e) + y.scrollLeft : y.scrollTop = M(e) + y.scrollTop;
    }
    function O(e) {
      S ? y.scrollLeft = (e.pageX - d) * h : y.scrollTop = (e.pageY - d) * h;
      x(e);
    }
    function M(e) {
      if (e.deltaY != null)
        return e.deltaY > 0 ? 100 : -100;
      if (e.originalEvent && e.originalEvent.wheelDelta)
        return e.originalEvent.wheelDelta;
    }
    function _() {
      g.addEventListener("mousedown", k);
      m.addEventListener("wheel", A);
      S && y.addEventListener("wheel", A);
      m.addEventListener("mousedown", O);
    }
    function D() {
      g.removeEventListener("mousedown", k);
      m.removeEventListener("wheel", A);
      m.removeEventListener("mousedown", O);
      S && y.removeEventListener("wheel", A);
    }
    function P() {
      var e = "rail";
      m = document.createElement("div");
      m.className = e + " " + (S ? "railH" : "railV");
      m.innerHTML = "<div class=\"slider\"></div>";
      i.appendChild(m);
      i.classList.add("hyperscroll", S ? "hyperscrollH" : "hyperscrollV");
      y = i.querySelector(".scrollViewport");
      g = i.querySelector("." + e + " .slider");
    }
    function H() {
      m.innerHTML = "";
      i.removeChild(m);
    }
    if (!i)
      throw new Error("Container must not be null");
    var s = this, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w = !1, E = !1, S = !1;
    s.resize = function () {
      a = o;
      f = u;
      if (S) {
        o = i.offsetWidth;
        u = y.scrollWidth;
        if (f === u && a === o)
          return;
        d = y.getBoundingClientRect().left;
      } else {
        o = i.offsetHeight;
        u = y.scrollHeight;
        if (f === u && a === o)
          return;
        d = y.getBoundingClientRect().top;
      }
      c = o / u;
      p = o * c;
      if (p < t) {
        l = o - t + p;
        c = l / u;
        h = u / l;
        return;
      }
      h = u / o;
    };
    s.update = function () {
      s.resize();
      u > o ? (s.show(), T()) : s.hide();
    };
    s.connect = function (e, t) {
      !b && window.MutationObserver && (b = new MutationObserver(t), b.observe(e, {
        childList: !0,
        subtree: !0
      }));
    };
    s.disconnect = function () {
      b && (b.disconnect(), b = null);
    };
    s.show = function () {
      E || (i.classList.add("active"), _(), E = !0);
    };
    s.hide = function () {
      E && (i.classList.remove("active"), D(), E = !1);
    };
    s.scrollToBottom = function () {
      S || (y.scrollTop = y.scrollHeight);
    };
    s.scrollToElement = function (e) {
      e.offsetTop && (y.scrollTop = e.offsetTop);
    };
    s.adjustToRTLLayout = function () {
      var t = document.createElement("div");
      t.style.cssText = "position: absolute; overflow-y: scroll; width: 30px; visibility: hidden;";
      t.innerHTML = "<div class=\"probe\"></div>";
      t.classList.add("adjustWebkitScrollBarsLegacy");
      i.appendChild(t);
      var s = t.querySelector(".probe"), o = t.getBoundingClientRect(), u = s.getBoundingClientRect(), a = Math.abs(o.left - u.left) < 1, f = Math.abs(o.right - u.right) < 1, l = a && f;
      i.classList.remove(r);
      i.classList.remove(n);
      l ? i.classList.add(r) : a && i.classList.add(n);
      t.innerHTML = "";
      i.removeChild(t);
    };
    s.init = function (e) {
      e = e || {};
      e.connect && s.connect(i, s.update);
      e.horizontal && (S = !0);
      s.adjustToRTLLayout();
      P();
      s.show();
      s.update();
      i.addEventListener("mouseenter", s.update);
      y.addEventListener("scroll", N);
    };
    s.dispose = function () {
      L();
      i.removeEventListener("mouseenter", s.update);
      y.removeEventListener("scroll", N);
      s.disconnect();
      s.hide();
      H();
    };
  }
  var e = "px", t = 15, n = "ltroverride", r = "neutraloverride";
  return {
    build: function (e) {
      return new i(e);
    }
  };
});

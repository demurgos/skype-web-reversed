define("utils/common/scroll", [], function () {
  function a(a) {
    function L(e) {
      e.preventDefault();
    }
    function A() {
      C ? (E.style.width = g + e, E.style.left = S.scrollLeft * v + e) : (E.style.height = g + e, E.style.top = S.scrollTop * v + e);
    }
    function O() {
      f.update();
    }
    function M(e) {
      C ? S.scrollLeft = (e.pageX - b) * m : S.scrollTop = (e.pageY - b) * m;
    }
    function _(e) {
      T || (window.addEventListener("mouseup", D), window.addEventListener("mousemove", M), a.classList.add("scrolling"), b = C ? e.pageX - E.offsetLeft : e.pageY - E.offsetTop, T = !0), L(e);
    }
    function D() {
      a.classList.remove("scrolling"), window.removeEventListener("mouseup", D), window.removeEventListener("mousemove", M), T = !1;
    }
    function P(e) {
      C ? S.scrollLeft = B(e) + S.scrollLeft : S.scrollTop = B(e) + S.scrollTop;
    }
    function H(e) {
      C ? S.scrollLeft = (e.pageX - y) * m : S.scrollTop = (e.pageY - y) * m, L(e);
    }
    function B(e) {
      if (e.deltaY)
        return e.deltaY > 0 ? 100 : -100;
      if (e.originalEvent && e.originalEvent.wheelDelta)
        return e.originalEvent.wheelDelta;
    }
    function j() {
      E.addEventListener("mousedown", _), w.addEventListener("wheel", P), C && S.addEventListener("wheel", P), w.addEventListener("mousedown", H);
    }
    function F() {
      E.removeEventListener("mousedown", _), w.removeEventListener("wheel", P), w.removeEventListener("mousedown", H), C && S.removeEventListener("wheel", P);
    }
    function I() {
      var e = "rail";
      w = document.createElement("div"), w.className = e + " " + (C ? "railH" : "railV"), w.innerHTML = "<div class=\"slider\"></div>", a.appendChild(w), a.classList.add("hyperscroll", C ? "hyperscrollH" : "hyperscrollV"), S = a.querySelector(".scrollViewport"), E = a.querySelector("." + e + " .slider");
    }
    function q() {
      w.innerHTML = "", a.removeChild(w);
    }
    function R() {
      a.classList.add(o), window.setTimeout(function () {
        a.classList.remove(o);
      }, u);
    }
    if (!a)
      throw new Error("Container must not be null");
    var f = this, l, c, h, p, d, v, m, g, y, b, w, E, S, x, T = !1, N = !1, C = !1, k = null;
    f.resize = function () {
      h = l, p = c;
      if (C) {
        l = a.offsetWidth, c = S.scrollWidth;
        if (p === c && h === l)
          return;
        y = S.getBoundingClientRect().left;
      } else {
        l = a.offsetHeight, c = S.scrollHeight;
        if (p === c && h === l)
          return;
        y = S.getBoundingClientRect().top;
      }
      v = l / c, g = l * v;
      if (g < t) {
        d = l - t + g, v = d / c, m = c / d;
        return;
      }
      m = c / l;
    }, f.update = function () {
      f.resize(), c > l ? (f.show(), A()) : f.hide();
    }, f.startRepaintInterval = function () {
      var e = 0;
      k === null && (k = window.setInterval(function () {
        e += 1, R(), e > s && f.stopRepaintInterval();
      }, i));
    }, f.stopRepaintInterval = function () {
      k && (window.clearInterval(k), k = null);
    }, f.connect = function (e, t) {
      !x && window.MutationObserver && (x = new MutationObserver(t), x.observe(e, {
        childList: !0,
        subtree: !0
      }));
    }, f.disconnect = function () {
      x && (x.disconnect(), x = null);
    }, f.show = function () {
      N || (a.classList.add("active"), j(), N = !0);
    }, f.hide = function () {
      N && (a.classList.remove("active"), F(), N = !1);
    }, f.scrollToBottom = function () {
      C || (S.scrollTop = S.scrollHeight);
    }, f.scrollToElement = function (e) {
      S.scrollTop = e.offsetTop;
    }, f.adjustToRTLLayout = function () {
      var t = document.createElement("div");
      t.style.cssText = "position: absolute; overflow-y: scroll; width: 30px; visibility: hidden;", t.innerHTML = "<div class=\"probe\"></div>", t.classList.add("adjustWebkitScrollBarsLegacy"), a.appendChild(t);
      var i = t.querySelector(".probe"), s = t.getBoundingClientRect(), o = i.getBoundingClientRect(), u = Math.abs(s.left - o.left) < 1, f = Math.abs(s.right - o.right) < 1, l = u && f;
      a.classList.remove(r), a.classList.remove(n), l ? a.classList.add(r) : u && a.classList.add(n), t.innerHTML = "", a.removeChild(t);
    }, f.init = function (e) {
      e = e || {}, e.connect && f.connect(a, f.update), e.horizontal && (C = !0), f.adjustToRTLLayout(), I(), f.show(), f.update(), a.addEventListener("mouseenter", f.update), S.addEventListener("scroll", O);
    }, f.dispose = function () {
      D(), a.removeEventListener("mouseenter", f.update), S.removeEventListener("scroll", O), f.disconnect(), f.hide(), q();
    };
  }
  var e = "px", t = 15, n = "ltroverride", r = "neutraloverride", i = 1000, s = 15, o = "forceBrowserRepaint", u = 100;
  return {
    build: function (e) {
      return new a(e);
    }
  };
})

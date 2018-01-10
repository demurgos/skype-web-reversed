define("jsviews/chat/chatLog", [
  "require",
  "browser/dom",
  "lodash-compat",
  "swx-utils-chat",
  "swx-constants",
  "utils/common/scroll"
], function (e) {
  function v(e, v) {
    function L(e) {
      var n = document.getSelection().toString(), r;
      r = t.getParentWithClass(e.target, o);
      if (!r)
        return;
      if (n && n.length > 0) {
        var i = m.onContextMenu(r.getAttribute("data-id"), e, n);
        i && e.preventDefault();
        return;
      }
      m.onContextMenu(r.getAttribute("data-id"), e);
      e.preventDefault();
    }
    function A(e) {
      t.addClass(e, h);
      setTimeout(function () {
        e && t.removeClass(e, h);
      }, a);
    }
    function O(e) {
      var n = e.length === 1;
      Array.prototype.forEach.call(e, function (e) {
        n && M(e) && A(e);
        t.removeClass(e, p);
      });
    }
    function M(e) {
      return g.lastElementChild === e && g.childElementCount > 1;
    }
    function D() {
      return !y || y.scrollHeight - y.scrollTop - e.clientHeight < l;
    }
    function P() {
      return !!y && y.scrollTop < c;
    }
    function H() {
      if (!y)
        return;
      C = !0;
      E.scrollHeight = y.scrollHeight;
      E.scrollBottom = E.scrollHeight - y.scrollTop;
    }
    function B(t) {
      if (!y) {
        b.scrollTop = b.scrollHeight - e.clientHeight;
        w.scrollTop = b.scrollHeight - e.clientHeight;
        C = !1;
        return;
      }
      var n = y.scrollHeight, r = n === E.scrollHeight || t, i = r ? E.scrollBottom : 0;
      y.scrollTop = n - i;
      C = !1;
    }
    function j() {
      W();
      x.resize();
    }
    function I(e, t, n) {
      if (!e || !n || !t)
        return;
      if (t.children.length < 2)
        return e;
      var r = n.getBoundingClientRect(), i = t.children, s = null, o = 0, u = i.length - 1, a, f;
      while (e) {
        s = e.getBoundingClientRect();
        if (s.top > r.bottom)
          u = Array.prototype.indexOf.call(i, e);
        else {
          if (!(s.bottom < r.top))
            return e;
          o = Array.prototype.indexOf.call(i, e);
        }
        a = q(o, u);
        if (f === a)
          break;
        f = a;
        e = i[a];
      }
    }
    function q(e, t) {
      return e + (t - e >> 1);
    }
    function R(e, t) {
      var n = e.getBoundingClientRect(), r = n.height / 2;
      return n.top + r <= t.bottom && n.bottom - r >= t.top;
    }
    function U(e, t, n) {
      function s(e) {
        if (e && e.nodeType === 1)
          return R(e, r) ? (i.push(e), !1) : !0;
      }
      var r = n.getBoundingClientRect(), i = [];
      i.push(e);
      var o = e.nextSibling;
      while (o) {
        if (s(o))
          break;
        o = o.nextSibling;
      }
      o = e.previousSibling;
      while (o) {
        if (s(o))
          break;
        o = o.previousSibling;
      }
      return i;
    }
    function z() {
      var e = F.slice(), n = I(g.lastElementChild, g, w);
      n && (F = U(n, g, w));
      for (var r = 0; r < e.length; r++)
        F.indexOf(e[r]) < 0 && t.setClass(e[r], u, !1);
      F.forEach(function (e) {
        t.setClass(e, u, !0);
      });
      m.onMessageVisibilityChange(F);
    }
    function W(e) {
      clearTimeout(T);
      T = setTimeout(z, e);
    }
    function X(e) {
      return D() ? !0 : P() ? !n.find(e, function (e) {
        return e.className.indexOf(d) > -1;
      }) : !1;
    }
    function V(e, t, n, r) {
      var i = n === "scrollLeft" ? k.scrollLeft : k.scrollTop, s = e - i, o = s / t * 10;
      window.setTimeout(function () {
        var s = i + o;
        n === "scrollLeft" ? k.scrollLeft = s : k.scrollTop = s;
        t -= 10;
        if (s === e || t <= 0) {
          r && r();
          return;
        }
        V(e, t, n, r);
      }, 10);
    }
    var m = null, g, y, b, w, E = null, S, x, T = null, N, C = !1, k, F = [];
    this.init = function (n, o) {
      m = n;
      g = t.getElement(".messageHistory", e);
      E = r.forModel(o);
      g.addEventListener("contextmenu", L);
      b = t.getElement(".scroller", e);
      w = t.getElement(".scrollable", e);
      window.addEventListener(i.events.browser.RESIZE, j);
      k = e.querySelector("#chatlog-suggestedActionsArea");
      S = s.build(e);
      S.init();
      x = new v(e);
    };
    this.dispose = function () {
      g.removeEventListener("contextmenu", L);
      window.removeEventListener(i.events.browser.RESIZE, j);
      m = null;
      E = null;
      S.dispose();
      x.dispose();
      clearTimeout(T);
    };
    this.showNewMessages = function () {
      var e = g.querySelectorAll("." + o + "." + p), t = X(e), n = D();
      t && H();
      O(e);
      t && B(!n);
      S.update();
      W();
    };
    this.scrollToMessage = function (e) {
      S.scrollToElement(e.elementInfo.element);
    };
    this.restoreScrollPosition = function () {
      B(!N);
      S.update();
    };
    this.storeScrollPosition = function () {
      N = D();
      H();
    };
    this.isScrolledToTop = function () {
      return P();
    };
    this.isScrolledToBottom = function () {
      return D();
    };
    this.scrollSuggestedArea = function (e, t) {
      if (!k)
        return;
      var n = e === "left" ? k.scrollLeft - k.clientWidth : k.scrollLeft + k.clientWidth;
      V(n, 250, "scrollLeft", t);
    };
    this.getArrowsPositions = function () {
      if (!k)
        return null;
      var e = k.scrollLeft === 0 ? !1 : !0, t = k.scrollLeft === k.scrollWidth - k.clientWidth ? !1 : !0;
      return {
        left: e,
        right: t
      };
    };
    this.isScrollable = function () {
      return e.clientHeight < g.clientHeight + f;
    };
    this.isScrollPositionStored = function () {
      return C;
    };
    this.isVisible = function () {
      return g.offsetHeight > 0;
    };
    this.isMessageVisible = function (e) {
      var t = n.find(F, function (t) {
        return e === t.attributes["data-id"].value;
      });
      return !!t;
    };
    this.onShow = function () {
      B();
    };
    this.onHide = function () {
      H();
    };
    this.onScroll = function (e, t) {
      y = y || e.target;
      W(t);
    }.bind(this);
    this._setScroller = function (e) {
      y = e;
    };
  }
  var t = e("browser/dom"), n = e("lodash-compat"), r = e("swx-utils-chat").conversationCache, i = e("swx-constants").COMMON, s = e("utils/common/scroll"), o = "message", u = "swx-in-viewport", a = 800, f = 60, l = 150, c = 100, h = "animate", p = "loading", d = "unread";
  return v;
});

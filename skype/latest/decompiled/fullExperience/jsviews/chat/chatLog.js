define("jsviews/chat/chatLog", [
  "require",
  "browser/dom",
  "lodash-compat",
  "utils/chat/conversationCache",
  "constants/common",
  "utils/common/scroll"
], function (e) {
  function g(e, g) {
    function A(e) {
      var n = document.getSelection().toString().length > 0, r;
      if (n)
        return;
      r = t.getParentWithClass(e.target, o), r && (y.onContextMenu(r.getAttribute("data-id"), e), e.preventDefault());
    }
    function O(e) {
      t.addClass(e, h), setTimeout(function () {
        e && t.removeClass(e, h);
      }, a);
    }
    function M(e) {
      var n = e.length === 1;
      Array.prototype.forEach.call(e, function (e) {
        n && D(e) && O(e), t.removeClass(e, p);
      });
    }
    function D(e) {
      return b.lastElementChild === e && b.childElementCount > 1;
    }
    function P() {
      return !w || w.scrollHeight - w.scrollTop - e.clientHeight < l;
    }
    function H() {
      return !!w && w.scrollTop < c;
    }
    function B() {
      if (!w)
        return;
      L = !0, x.scrollHeight = w.scrollHeight, x.scrollBottom = x.scrollHeight - w.scrollTop;
    }
    function j(t) {
      if (!w) {
        E.scrollTop = E.scrollHeight - e.clientHeight, S.scrollTop = E.scrollHeight - e.clientHeight, L = !1;
        return;
      }
      var n = w.scrollHeight, r = n === x.scrollHeight || t, i = r ? x.scrollBottom : 0;
      w.scrollTop = n - i, L = !1;
    }
    function F() {
      X(), N.resize();
    }
    function q(e, t, n) {
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
        a = R(o, u);
        if (f === a)
          break;
        f = a, e = i[a];
      }
    }
    function R(e, t) {
      return e + (t - e >> 1);
    }
    function U(e, t) {
      var n = e.getBoundingClientRect();
      return n.top <= t.bottom && n.bottom >= t.top;
    }
    function z(e, t, n) {
      function o(e) {
        if (e && e.nodeType === 1) {
          var t;
          return s < 10 ? (t = !0, s++) : (t = U(e, r), s = 0), t ? (i.push(e), !1) : !0;
        }
      }
      var r = n.getBoundingClientRect(), i = [];
      i.push(e);
      var s = 0, u = e.nextSibling;
      while (u) {
        if (o(u))
          break;
        u = u.nextSibling;
      }
      u = e.previousSibling, s = 0;
      while (u) {
        if (o(u))
          break;
        u = u.previousSibling;
      }
      return i;
    }
    function W() {
      var e = I.slice(), n = q(b.lastElementChild, b, S);
      n && (I = z(n, b, S));
      for (var r = 0; r < e.length; r++)
        I.indexOf(e[r]) < 0 && t.setClass(e[r], u, !1);
      I.forEach(function (e) {
        t.setClass(e, u, !0);
      }), y.onMessageVisibilityChange(I);
    }
    function X() {
      clearTimeout(C), C = setTimeout(W, v);
    }
    function V(e) {
      return P() ? !0 : H() ? !n.find(e, function (e) {
        return e.className.indexOf(d) > -1;
      }) : !1;
    }
    var y = null, b, w, E, S, x = null, T, N, C = null, k, L = !1, I = [];
    this.init = function (n, o) {
      y = n, b = t.getElement(".messageHistory", e), x = r.forModel(o), b.addEventListener("contextmenu", A), E = t.getElement(".scroller", e), S = t.getElement(".scrollable", e), window.addEventListener(i.events.browser.RESIZE, F), T = s.build(e), T.init(), N = new g(e);
    }, this.dispose = function () {
      b.removeEventListener("contextmenu", A), window.removeEventListener(i.events.browser.RESIZE, F), y = null, x = null, T.dispose(), N.dispose(), clearTimeout(C);
    }, this.showNewMessages = function () {
      var e = b.querySelectorAll("." + o + "." + p), t = V(e), n = P();
      t && B(), M(e), t && j(!n), T.update(), X();
    }, this.scrollToMessage = function (e) {
      T.scrollToElement(e.elementInfo.element);
    }, this.restoreScrollPosition = function () {
      j(!k), T.update();
    }, this.storeScrollPosition = function () {
      k = P(), B();
    }, this.isScrolledToTop = function () {
      return H();
    }, this.isScrolledCloseToBottom = function () {
      return !w || w.scrollHeight - w.scrollTop - e.clientHeight < m;
    }, this.isScrollable = function () {
      return e.clientHeight < b.clientHeight + f;
    }, this.isScrollPositionStored = function () {
      return L;
    }, this.isVisible = function () {
      return b.offsetHeight > 0;
    }, this.isMessageVisible = function (e) {
      var t = n.find(I, function (t) {
        return e === t.attributes["data-id"].value;
      });
      return !!t;
    }, this.onShow = function () {
      j();
    }, this.onHide = function () {
      B();
    }, this.onScroll = function (e) {
      w = w || e.target, X();
    }.bind(this), this._setScroller = function (e) {
      w = e;
    };
  }
  var t = e("browser/dom"), n = e("lodash-compat"), r = e("utils/chat/conversationCache"), i = e("constants/common"), s = e("utils/common/scroll"), o = "message", u = "swx-in-viewport", a = 800, f = 60, l = 150, c = 100, h = "animate", p = "loading", d = "unread", v = 300, m = 60;
  return g;
})

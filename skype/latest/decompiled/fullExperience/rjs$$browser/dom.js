define("browser/dom", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "browser/document",
  "browser/window"
], function (e, t) {
  function o(e) {
    return Boolean(e && e.nodeType === 1);
  }
  function u(e) {
    return !(!e || !n.isString(e.tagName) && !n.isString(e.nodeName));
  }
  function a(e, t) {
    return n.isElement(e) ? e.tagName.toLowerCase() === t : !1;
  }
  function f(e) {
    return Boolean(e.offsetParent);
  }
  function l(e, t) {
    while (e && !E(e, t))
      e = e.parentNode;
    return e;
  }
  function c(e, t) {
    while (e && !h(e, t))
      e = e.parentNode;
    return e;
  }
  function h(e, t) {
    var n = e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector;
    return n ? n.call(e, t) : !1;
  }
  function p(e) {
    return n.isString(e) ? T(r.createElement(e)) : null;
  }
  function d(e) {
    return n.isString(e) ? T(r.querySelector(e)) : null;
  }
  function v(e, t) {
    return t = t || r, n.isString(e) ? T(t.querySelector(e)) : u(e) ? T(e) : null;
  }
  function m(e, n) {
    return e ? t.getElement("#" + e, n) : null;
  }
  function g(e, t, n) {
    n ? S(e, t) : x(e, t);
  }
  function y(e, t) {
    t = t || r;
    var n = t.querySelectorAll(e);
    return Array.prototype.slice.call(n, 0);
  }
  function b(e, t) {
    return t ? e.previousSibling : e.nextSibling;
  }
  function w(e) {
    return y(["[tabindex]:not([tabindex=\"\"]):not([tabindex=\"-1\"]):not([disabled])"], e);
  }
  function E(e, t) {
    if (e.classList)
      return e.classList.contains(t);
    var n = e.className ? e.className.split(" ") : [];
    for (var r = 0; r < n.length; r++)
      if (n[r] === t)
        return !0;
    return !1;
  }
  function S(e, t) {
    if (!n.isString(t))
      return;
    if (e.classList) {
      e.classList.add(t);
      return;
    }
    var r = " " + e.className + " ";
    r.indexOf(t) < 0 && (r += t + " ");
    e.className = r.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
  }
  function x(e, t) {
    if (e.classList) {
      e.classList.remove(t);
      return;
    }
    e.className = e.className.replace(t, "").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
  }
  function T(e) {
    return e !== null && (e.removeClass = function (t) {
      x(e, t);
    }, e.addClass = function (t) {
      S(e, t);
    }, e.hasClass = function (t) {
      return E(e, t);
    }, e.setClass = function (t, n) {
      g(e, t, n);
    }), e;
  }
  function N(e, t) {
    var n, r = i.MutationObserver || i.WebKitMutationObserver;
    return r ? (n = new r(function (e) {
      e && e[0] && (e[0].addedNodes && e[0].addedNodes.length || e[0].removedNodes && e[0].removedNodes.length) && t();
    }), n.observe(e, {
      childList: !0,
      subtree: !0
    })) : e.addEventListener("DOMSubtreeModified", t, !1), {
      dispose: function () {
        r ? n.disconnect() : e.removeEventListener("DOMSubtreeModified", t);
      }
    };
  }
  function C(e) {
    var t = {
      offsetLeft: 0,
      offsetTop: 0
    };
    while (e)
      t.offsetLeft += e.offsetLeft + e.clientLeft - e.scrollLeft, t.offsetTop += e.offsetTop + e.clientTop - e.scrollTop, e = e.offsetParent;
    return t;
  }
  function k(e, t) {
    var n = e;
    while (n && !n.contains(t))
      n = n.parentNode;
    return n;
  }
  function L(e) {
    var t = e.lastChild;
    while (t && t.nodeType !== s)
      t = t.previousSibling;
    return t;
  }
  function A() {
    return r.hidden;
  }
  var n = e("lodash-compat"), r = e("browser/document"), i = e("browser/window"), s = 1;
  t.createElement = p;
  t.findElement = d;
  t.isElement = o;
  t.getElement = v;
  t.getElementById = m;
  t.getElements = y;
  t.getSibling = b;
  t.getNavigableChildren = w;
  t.isA = a;
  t.isVisible = f;
  t.hasClass = E;
  t.getParentWithClass = l;
  t.getParentMatching = c;
  t.addClass = S;
  t.setClass = g;
  t.removeClass = x;
  t.extendObject = T;
  t.createDomObserverSubscription = N;
  t.getElementOffset = C;
  t.findFirstCommonAncestor = k;
  t.getLastChildElement = L;
  t.isDocumentHidden = A;
});

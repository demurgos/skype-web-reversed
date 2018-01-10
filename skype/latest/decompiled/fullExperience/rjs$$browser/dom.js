define("browser/dom", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-browser-globals"
], function (e, t) {
  function s(e) {
    return Boolean(e && e.nodeType === 1);
  }
  function o(e) {
    return !(!e || !n.isString(e.tagName) && !n.isString(e.nodeName));
  }
  function u(e, t) {
    return n.isElement(e) ? e.tagName.toLowerCase() === t : !1;
  }
  function a(e) {
    return Boolean(e.offsetParent);
  }
  function f(e, t) {
    while (e && !w(e, t))
      e = e.parentNode;
    return e;
  }
  function l(e, t) {
    while (e && !c(e, t))
      e = e.parentNode;
    return e;
  }
  function c(e, t) {
    var n = e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector;
    return n ? n.call(e, t) : !1;
  }
  function h(e) {
    return n.isString(e) ? x(r.getDocument().createElement(e)) : null;
  }
  function p(e) {
    return n.isString(e) ? x(r.getDocument().querySelector(e)) : null;
  }
  function d(e, t) {
    return t = t || r.getDocument(), n.isString(e) ? x(t.querySelector(e)) : o(e) ? x(e) : null;
  }
  function v(e, n) {
    return e ? t.getElement("#" + e, n) : null;
  }
  function m(e, t, n) {
    n ? E(e, t) : S(e, t);
  }
  function g(e, t) {
    t = t || r.getDocument();
    var n = t.querySelectorAll(e);
    return Array.prototype.slice.call(n, 0);
  }
  function y(e, t) {
    return t ? e.previousSibling : e.nextSibling;
  }
  function b(e) {
    return g(["[tabindex]:not([tabindex=\"\"]):not([tabindex=\"-1\"]):not([disabled])"], e);
  }
  function w(e, t) {
    if (e.classList)
      return e.classList.contains(t);
    var n = e.className ? e.className.split(" ") : [];
    for (var r = 0; r < n.length; r++)
      if (n[r] === t)
        return !0;
    return !1;
  }
  function E(e, t) {
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
  function S(e, t) {
    if (e.classList) {
      e.classList.remove(t);
      return;
    }
    e.className = e.className.replace(t, "").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
  }
  function x(e) {
    return e !== null && (e.removeClass = function (t) {
      S(e, t);
    }, e.addClass = function (t) {
      E(e, t);
    }, e.hasClass = function (t) {
      return w(e, t);
    }, e.setClass = function (t, n) {
      m(e, t, n);
    }), e;
  }
  function T(e, t) {
    var n, i = r.getWindow(), s = i.MutationObserver || i.WebKitMutationObserver;
    return s ? (n = new s(function (e) {
      e && e[0] && (e[0].addedNodes && e[0].addedNodes.length || e[0].removedNodes && e[0].removedNodes.length) && t();
    }), n.observe(e, {
      childList: !0,
      subtree: !0
    })) : e.addEventListener("DOMSubtreeModified", t, !1), {
      dispose: function () {
        s ? n.disconnect() : e.removeEventListener("DOMSubtreeModified", t);
      }
    };
  }
  function N(e) {
    var t = {
      offsetLeft: 0,
      offsetTop: 0
    };
    while (e)
      t.offsetLeft += e.offsetLeft + e.clientLeft - e.scrollLeft, t.offsetTop += e.offsetTop + e.clientTop - e.scrollTop, e = e.offsetParent;
    return t;
  }
  function C(e, t) {
    var n = e;
    while (n && !n.contains(t))
      n = n.parentNode;
    return n;
  }
  function k(e) {
    var t = e.lastChild;
    while (t && t.nodeType !== i)
      t = t.previousSibling;
    return t;
  }
  function L() {
    return r.getDocument().hidden;
  }
  var n = e("lodash-compat"), r = e("swx-browser-globals"), i = 1;
  t.createElement = h;
  t.findElement = p;
  t.isElement = s;
  t.getElement = d;
  t.getElementById = v;
  t.getElements = g;
  t.getSibling = y;
  t.getNavigableChildren = b;
  t.isA = u;
  t.isVisible = a;
  t.hasClass = w;
  t.getParentWithClass = f;
  t.getParentMatching = l;
  t.addClass = E;
  t.setClass = m;
  t.removeClass = S;
  t.extendObject = x;
  t.createDomObserverSubscription = T;
  t.getElementOffset = N;
  t.findFirstCommonAncestor = C;
  t.getLastChildElement = k;
  t.isDocumentHidden = L;
});

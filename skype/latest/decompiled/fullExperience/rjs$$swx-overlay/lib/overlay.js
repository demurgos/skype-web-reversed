(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-overlay/lib/overlay", [
      "require",
      "exports",
      "./helpers",
      "swx-focus-handler"
    ], e);
}(function (e, t) {
  function c() {
    return !f.content || !f.contentParent ? !1 : (f.contentParent.appendChild(f.content), i.removeChild(f.slide), f = {}, !0);
  }
  function h() {
    var e = document.createElement("div"), t = document.createElement("div"), r = document.createElement("div"), i = document.createElement("div");
    n.addClass(e, "overlaySlide");
    n.addClass(t, "table");
    n.addClass(r, "tableCell");
    n.addClass(i, "overlaySlideContent");
    n.addClass(i, "themeWhite");
    i.tabIndex = -1;
    i.setAttribute("role", "dialog");
    i.setAttribute("aria-label", "");
    r.appendChild(i);
    t.appendChild(r);
    e.appendChild(t);
    s = e;
  }
  function p() {
    var e = document.createElement("div");
    n.addClass(e, "overlayContainer");
    i = e;
  }
  function d(e) {
    var t = {};
    return t.content = e, t.contentParent = e.parentNode, t.slide = s.cloneNode(!0), t.contentContainer = t.slide.querySelector(".overlaySlideContent"), t.contentContainer.appendChild(e), t;
  }
  function v(e) {
    var t = f.slide;
    if (o === !1) {
      c();
      return;
    }
    if (n.cssTransitionsSupported === !1 || e === null) {
      c();
      return;
    }
    e.inactiveTransitionClass !== "" && (n.bind(t, n.cssTransitionEndEventName, function () {
      n.removeClass(t, e.inactiveTransitionClass);
    }), n.addClass(t, e.inactiveTransitionClass));
    n.bind(t, n.cssTransitionEndEventName, c);
    n.addClass(t, e.inactiveClass);
  }
  function m(e) {
    if (n.cssTransitionsSupported === !1 || e === null) {
      i.appendChild(a.slide);
      return;
    }
    e.activeTransitionClass !== "" && (n.bind(a.slide, n.cssTransitionEndEventName, function () {
      n.removeClass(a.slide, e.activeTransitionClass);
    }), n.addClass(a.slide, e.activeTransitionClass));
    n.addClass(a.slide, e.activeClass);
    window.setTimeout(function () {
      n.removeClass(a.slide, e.activeClass);
    }, 10);
    i.appendChild(a.slide);
  }
  function g(e) {
    var t;
    if (o === !1)
      return;
    t = e.target;
    i.contains(t) === !1 && y();
  }
  function y() {
    r.get().addFocusRequestToQueue(a.contentContainer);
  }
  function b(e) {
    e.keyCode === 27 && t.hide();
  }
  function w(e) {
    var t = e.length, r;
    for (r = 0; r < t; r++)
      n.addClass(i, e[r]);
  }
  function E() {
    p();
    h();
    n.bind(document, "focusin", g);
    u = !1;
  }
  var n = e("./helpers"), r = e("swx-focus-handler"), i = null, s = null, o = !1, u = !1, a = {}, f = {}, l = {
      next: {
        activeClass: "next",
        activeTransitionClass: "",
        inactiveClass: "prev",
        inactiveTransitionClass: "prevInTransition"
      },
      previous: {
        activeClass: "prev",
        activeTransitionClass: "prevInTransition",
        inactiveClass: "next",
        inactiveTransitionClass: ""
      }
    };
  E();
  t.display = function (e, t, r, s) {
    var c, h = null;
    return s = s || {}, u = s.skipSlideCreation ? s.skipSlideCreation : !1, typeof e != "string" ? !1 : (typeof t != "string" && (t = ""), e.indexOf("#") === 0 && (e = e.substr(1)), c = document.getElementById(e), c === null ? !1 : c === a.content ? !1 : (r !== undefined && o === !0 && l[r] !== undefined && (h = l[r]), u || (f = n.extend({}, a), a = d(c), a.contentContainer.setAttribute("aria-label", t)), o === !1 && (document.body.appendChild(i), o = !0), h !== null && (n.removeClass(i, h.activeClass), n.removeClass(i, h.inactiveClass), n.addClass(i, h.activeClass)), w(s.containerClasses), u ? (n.unbind(document, "focusin", g), i.appendChild(c)) : (v(h), m(h), y()), !0));
  };
  t.hide = function () {
    return f = n.extend({}, a), !u && c() === !1 ? !1 : (i.parentNode.removeChild(i), o = !1, n.unbind(document, "keydown", b), a = {}, !0);
  };
  t.bindHide = function (e) {
    return !e || typeof e != "object" ? !1 : (n.bind(e, "click", t.hide), n.bind(document, "keydown", b), !0);
  };
  t.isOverlayDisplayed = function () {
    return o;
  };
  t.getOverlayContainer = function () {
    return i;
  };
}));

(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-overlay/lib/overlay", [
      "require",
      "exports",
      "./helpers"
    ], e);
}(function (e, t) {
  function f() {
    return !u.content || !u.contentParent ? !1 : (u.contentParent.appendChild(u.content), r.removeChild(u.slide), u = {}, !0);
  }
  function l() {
    var e = document.createElement("div"), t = document.createElement("div"), r = document.createElement("div"), s = document.createElement("div");
    n.addClass(e, "overlaySlide");
    n.addClass(t, "table");
    n.addClass(r, "tableCell");
    n.addClass(s, "overlaySlideContent");
    n.addClass(s, "themeWhite");
    s.tabIndex = -1;
    s.setAttribute("role", "dialog");
    s.setAttribute("aria-label", "");
    r.appendChild(s);
    t.appendChild(r);
    e.appendChild(t);
    i = e;
  }
  function c() {
    var e = document.createElement("div");
    n.addClass(e, "overlayContainer");
    r = e;
  }
  function h(e) {
    var t = {};
    return t.content = e, t.contentParent = e.parentNode, t.slide = i.cloneNode(!0), t.contentContainer = t.slide.querySelector(".overlaySlideContent"), t.contentContainer.appendChild(e), t;
  }
  function p(e) {
    var t = u.slide;
    if (s === !1) {
      f();
      return;
    }
    if (n.cssTransitionsSupported === !1 || e === null) {
      f();
      return;
    }
    e.inactiveTransitionClass !== "" && (n.bind(t, n.cssTransitionEndEventName, function () {
      n.removeClass(t, e.inactiveTransitionClass);
    }), n.addClass(t, e.inactiveTransitionClass));
    n.bind(t, n.cssTransitionEndEventName, f);
    n.addClass(t, e.inactiveClass);
  }
  function d(e) {
    if (n.cssTransitionsSupported === !1 || e === null) {
      r.appendChild(o.slide);
      return;
    }
    e.activeTransitionClass !== "" && (n.bind(o.slide, n.cssTransitionEndEventName, function () {
      n.removeClass(o.slide, e.activeTransitionClass);
    }), n.addClass(o.slide, e.activeTransitionClass));
    n.addClass(o.slide, e.activeClass);
    window.setTimeout(function () {
      n.removeClass(o.slide, e.activeClass);
    }, 10);
    r.appendChild(o.slide);
  }
  function v(e) {
    var t;
    if (s === !1)
      return;
    t = e.target;
    r.contains(t) === !1 && o.contentContainer.focus();
  }
  function m(e) {
    e.keyCode === 27 && t.hide();
  }
  function g(e) {
    var t = e.length, i;
    for (i = 0; i < t; i++)
      n.addClass(r, e[i]);
  }
  function y() {
    c();
    l();
    n.bind(document, "focusin", v);
  }
  var n = e("./helpers"), r = null, i = null, s = !1, o = {}, u = {}, a = {
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
  y();
  t.display = function (e, t, i, f) {
    var l, c = null;
    return f = f || {}, typeof e != "string" ? !1 : (typeof t != "string" && (t = ""), e.indexOf("#") === 0 && (e = e.substr(1)), l = document.getElementById(e), l === null ? !1 : l === o.content ? !1 : (i !== undefined && s === !0 && a[i] !== undefined && (c = a[i]), u = n.extend({}, o), o = h(l), o.contentContainer.setAttribute("aria-label", t), s === !1 && (document.body.appendChild(r), s = !0), c !== null && (n.removeClass(r, c.activeClass), n.removeClass(r, c.inactiveClass), n.addClass(r, c.activeClass)), g(f.containerClasses), p(c), d(c), o.contentContainer.focus(), !0));
  };
  t.hide = function () {
    return u = n.extend({}, o), f() === !1 ? !1 : (r.parentNode.removeChild(r), s = !1, n.unbind(document, "keydown", m), o = {}, !0);
  };
  t.bindHide = function (e) {
    return !e || typeof e != "object" ? !1 : (n.bind(e, "click", t.hide), n.bind(document, "keydown", m), !0);
  };
  t.isOverlayDisplayed = function () {
    return s;
  };
  t.getOverlayContainer = function () {
    return r;
  };
}));

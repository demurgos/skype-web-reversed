function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-overlay/lib/helpers", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  t.urlRedirect = function (e) {
    window.location.href = e;
  }, t.platform = function () {
    var e = window.navigator.userAgent, t = "";
    return e.match(/windows/i) ? t = "windows" : e.match(/macintosh/i) ? t = "mac" : e.match(/linux/i) ? t = "linux" : e.match(/android/i) ? t = "android" : e.match(/iphone|ipad|ipod/i) ? t = "ios" : e.match(/blackberry/i) && (t = "blackberry"), t;
  }(), t.onMobileBrowser = function () {
    var e = e, t = window.navigator.userAgent;
    return [
      "android",
      "ios",
      "blackberry"
    ].indexOf(e) !== -1 ? !0 : e === "windows" && t.match(/phone|iemobile/i) ? !0 : !1;
  }(), t.extend = function (e, t) {
    var n = Object.keys(t), r = n.length, i, s;
    for (s = 0; s < r; s++)
      i = n[s], e[i] = t[i];
    return e;
  }, t.cssTransitionEndEventName = function () {
    function e() {
      var e = document.createElement("div"), t = {
          transition: "transitionend",
          OTransition: "otransitionend",
          MozTransition: "transitionend",
          WebkitTransition: "webkitTransitionEnd"
        }, n;
      for (n in t)
        if (t.hasOwnProperty(n) && e.style[n] !== undefined)
          return t[n];
      return "";
    }
    return e();
  }(), t.cssTransitionsSupported = function () {
    return t.cssTransitionEndEventName !== "";
  }(), t.hasClass = function (e, t) {
    var n = new RegExp("(?:^|\\s)" + t + "(?!\\S)", "g");
    return e.className.match(n) ? !0 : !1;
  }, t.addClass = function (e, n) {
    return !e || t.hasClass(e, n) === !0 ? !1 : (e.className += " " + n, !0);
  }, t.removeClass = function (e, n) {
    var r;
    return !e || t.hasClass(e, n) === !1 ? !1 : (r = new RegExp("(?:^|\\s)" + n + "(?!\\S)", "g"), e.className = e.className.replace(r, ""), !0);
  }, t.bind = function () {
    function e(e, t, n) {
      e.addEventListener(t, n, !1);
    }
    function t(e, t, n) {
      e.attachEvent(t, n);
    }
    return document.addEventListener ? e : t;
  }(), t.unbind = function () {
    function e(e, t, n) {
      e.removeEventListener(t, n, !1);
    }
    function t(e, t, n) {
      e.detachEvent(t, n);
    }
    return document.removeEventListener ? e : t;
  }(), t.base64Decode = function (e) {
    var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", n, r, i, s, o, u, a, f, l = 0, c = 0, h = "", p = [];
    if (!e)
      return e;
    e += "";
    do
      s = t.indexOf(e.charAt(l++)), o = t.indexOf(e.charAt(l++)), u = t.indexOf(e.charAt(l++)), a = t.indexOf(e.charAt(l++)), f = s << 18 | o << 12 | u << 6 | a, n = f >> 16 & 255, r = f >> 8 & 255, i = f & 255, u === 64 ? p[c++] = String.fromCharCode(n) : a === 64 ? p[c++] = String.fromCharCode(n, r) : p[c++] = String.fromCharCode(n, r, i);
    while (l < e.length);
    return h = p.join(""), h.replace(/\0+$/, "");
  }, t.murmurhash = function (e, t) {
    var n = e.length & 3, r = e.length - n, i = t, s = 3432918353, o = 461845907, u = 0, a, f;
    while (u < r)
      f = e.charCodeAt(u) & 255 | (e.charCodeAt(++u) & 255) << 8 | (e.charCodeAt(++u) & 255) << 16 | (e.charCodeAt(++u) & 255) << 24, ++u, f = (f & 65535) * s + (((f >>> 16) * s & 65535) << 16) & 4294967295, f = f << 15 | f >>> 17, f = (f & 65535) * o + (((f >>> 16) * o & 65535) << 16) & 4294967295, i ^= f, i = i << 13 | i >>> 19, a = (i & 65535) * 5 + (((i >>> 16) * 5 & 65535) << 16) & 4294967295, i = (a & 65535) + 27492 + (((a >>> 16) + 58964 & 65535) << 16);
    f = 0;
    switch (n) {
    case 3:
      f ^= (e.charCodeAt(u + 2) & 255) << 16;
    case 2:
      f ^= (e.charCodeAt(u + 1) & 255) << 8;
    case 1:
      f ^= e.charCodeAt(u) & 255, f = (f & 65535) * s + (((f >>> 16) * s & 65535) << 16) & 4294967295, f = f << 15 | f >>> 17, f = (f & 65535) * o + (((f >>> 16) * o & 65535) << 16) & 4294967295, i ^= f;
    }
    return i ^= e.length, i ^= i >>> 16, i = (i & 65535) * 2246822507 + (((i >>> 16) * 2246822507 & 65535) << 16) & 4294967295, i ^= i >>> 13, i = (i & 65535) * 3266489909 + (((i >>> 16) * 3266489909 & 65535) << 16) & 4294967295, i ^= i >>> 16, i >>> 0;
  }, t.parseJSONString = function (e) {
    var t;
    try {
      t = JSON.parse(e);
    } catch (n) {
      return !1;
    }
    return t;
  };
})

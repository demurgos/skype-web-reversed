(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-browser-detect/lib/detect", [
      "require",
      "exports",
      "swx-browser-globals",
      "swx-utils-common"
    ], e);
}(function (e, t) {
  function p() {
    return n.getWindow().navigator.userAgent;
  }
  function d(e) {
    return p().indexOf(e) > -1;
  }
  function v() {
    return d("Trident");
  }
  function m() {
    return d(i.EDGE);
  }
  function g() {
    return d(i.FIREFOX);
  }
  function y() {
    return d(i.CHROME);
  }
  function b() {
    return d("OPR/");
  }
  function w() {
    return b() ? i.UNKNOWN : d(i.PHANTOMJS) ? i.PHANTOMJS : m() ? i.EDGE : d(i.ELECTRON) ? i.ELECTRON : d(i.CHROME) ? i.CHROME : d(i.FIREFOX) ? i.FIREFOX : d(i.SAFARI) ? i.SAFARI : d(i.SKYPE_SHELL) ? i.SKYPE_SHELL : v() ? i.MSIE : i.UNKNOWN;
  }
  function E() {
    function e() {
      var e, t = p(), n = t.match(new RegExp(i.MSIE + " " + c));
      return n ? n[1] : (e = t.match(new RegExp("rv:" + c)), e ? e[1] : undefined);
    }
    function t(e) {
      var t;
      return e === i.SAFARI && (e = "Version"), t = p().match(new RegExp(e + "/" + c)), t ? t[1] : f;
    }
    return v() ? e() : t(w());
  }
  function S() {
    var e = /(android|ipod|windows phone|wpdesktop|windows ce|blackberry\w*|meego|webos|palm|symbian|pda|\w*?mobile\w*?|\w*?phone\w*?)/i, t = /tablet|ipad/i;
    return p().match(e) ? o.MOBILE : p().match(t) ? o.TABLET : o.DESKTOP;
  }
  function x() {
    var e = /(windows|win32)/i, t = / arm;/i, n = /windows\sphone\s\d+\.\d+/i, r = /(macintosh|mac os x)/i, i = /(iPad|iPhone|iPod)(?=.*like Mac OS X)/i, o = /(linux|joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|cros)/i, u = /android/i;
    return p().match(n) ? s.WINDOWS_PHONE : p().match(t) ? s.WINDOWS_RT : p().match(i) ? s.IOS : p().match(u) ? s.ANDROID : p().match(o) ? s.LINUX : p().match(r) ? s.MACOSX : p().match(e) ? s.WINDOWS : s.UNKNOWN;
  }
  function T(e) {
    function t(e) {
      var t = p().match(new RegExp("Windows NT " + c));
      if (t) {
        if (e)
          return t[1];
        if (u[t[1]])
          return u[t[1]];
      }
      return f;
    }
    function n(e) {
      var t = p().match(new RegExp(s.MACOSX + " " + h));
      if (t) {
        var n = r.version.parse(t[1].replace(/_/g, "."));
        return e ? n.getAllComponents().join(".") : n.getMajor();
      }
      return f;
    }
    return x() === s.WINDOWS ? t(e) : x() === s.MACOSX ? n(e) : f;
  }
  function N() {
    return d("WOW64") || d("Win64");
  }
  function C() {
    var e = n.getWindow();
    return {
      width: n.getWindow().screen && n.getWindow().screen.width || 0,
      height: n.getWindow().screen && n.getWindow().screen.height || 0,
      pixelRatio: n.getWindow().devicePixelRatio || 0,
      colorDepth: n.getWindow().screen && n.getWindow().screen.colorDepth || 0,
      isTouchEnabled: Object.prototype.hasOwnProperty.call(e, "ontouchstart") || n.getWindow().navigator.MaxTouchPoints > 0 || n.getWindow().navigator.msMaxTouchPoints > 0
    };
  }
  function k() {
    return {
      deviceType: S(),
      osName: x(),
      osVersion: T(!1),
      osRawVersion: T(!0),
      is64bit: N(),
      platform: n.getWindow().navigator.platform
    };
  }
  function L() {
    return w() === i.MSIE && A() ? n.getWindow().external.msIsSiteMode() : "n/a";
  }
  function A() {
    return n.getWindow().hasOwnProperty("external") && n.getWindow().external.hasOwnProperty("msIsSiteMode");
  }
  function O() {
    return w() === i.SKYPE_SHELL;
  }
  function M() {
    return w() === i.ELECTRON;
  }
  function _() {
    return x() === s.LINUX && (w() === i.CHROME || w() === i.ELECTRON);
  }
  function D() {
    var e = n.getWindow();
    return (e.navigator.getUserMedia || e.navigator.mozGetUserMedia || e.navigator.webkitGetUserMedia) && (typeof e.RTCPeerConnection != "undefined" || typeof e.RTCIceGatherer != "undefined" || typeof e.mozRTCPeerConnection != "undefined" || typeof e.webkitRTCPeerConnection != "undefined");
  }
  function P() {
    return D();
  }
  function H() {
    return w() === i.EDGE || w() === i.PHANTOMJS ? !1 : w() === i.CHROME && I() >= l ? !1 : !0;
  }
  function B() {
    var e = w();
    return e === i.FIREFOX || e === i.CHROME;
  }
  function I() {
    var e = F();
    return isNaN(e) ? e : parseInt(e, 10);
  }
  function q(e) {
    return e in n.getWindow().document.documentElement.style;
  }
  var n = e("swx-browser-globals"), r = e("swx-utils-common"), i = {
      MSIE: "MSIE",
      CHROME: "Chrome",
      FIREFOX: "Firefox",
      SAFARI: "Safari",
      EDGE: "Edge",
      ELECTRON: "Electron",
      SKYPE_SHELL: "SkypeShell",
      PHANTOMJS: "PhantomJS",
      UNKNOWN: "Unknown"
    }, s = {
      WINDOWS: "Windows",
      MACOSX: "Mac OS X",
      WINDOWS_PHONE: "Windows Phone",
      WINDOWS_RT: "Windows RT",
      IOS: "iOS",
      ANDROID: "Android",
      LINUX: "Linux",
      UNKNOWN: "Unknown"
    }, o = {
      DESKTOP: 1,
      MOBILE: 2,
      TABLET: 8
    }, u = {
      5.1: "XP",
      "6.0": "Vista",
      6.1: "7",
      6.2: "8",
      6.3: "8.1",
      "10.0": "10"
    }, a = { OBJECT_FIT: "objectFit" }, f = "U", l = "42", c = "([\\d,.]+)", h = "([\\d,_,.]+)", j = function () {
      var e = {}, t = n.getWindow().location;
      if (!t.search)
        return e;
      var r = t.search.substring(1).split("&");
      if (!r)
        return e;
      for (var i = 0; i < r.length; i++) {
        var s = r[i].split("=");
        if (!s[1])
          continue;
        e[s[0]] = s[1] || !0;
      }
      return e;
    }, F = function () {
      return r.version.parse(E()).getMajor();
    }, R = function () {
      return {
        browserName: w(),
        browserVersion: E(),
        browserMajorVersion: I(),
        isPinnedSite: L(),
        isIeEngine: v(),
        isEdge: m(),
        isFirefox: g(),
        isChrome: y(),
        isShellApp: O(),
        isElectron: M(),
        isChromeOnLinux: _(),
        isInBrowserPluginSupported: H(),
        isPluginlessCallingSupported: P(),
        isBrowserDefaultToBlockPlugin: B(),
        getUrlParams: j,
        getUserAgent: p
      };
    };
  t.__esModule = !0;
  t["default"] = {
    getBrowserInfo: R,
    getScreenInfo: C,
    getSystemInfo: k,
    supportsCssProperty: q,
    supportsPinnedSites: A,
    BROWSERS: i,
    OPERATING_SYSTEMS: s,
    DEVICE_TYPES: o,
    CSS_PROPERTIES: a
  };
}));

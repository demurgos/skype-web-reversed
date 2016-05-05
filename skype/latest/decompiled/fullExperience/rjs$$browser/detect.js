define("browser/detect", [
  "require",
  "browser/window",
  "utils/common/version"
], function (e) {
  function h() {
    return t.navigator.userAgent;
  }
  function p(e) {
    return h().indexOf(e) > -1;
  }
  function d() {
    return p("Trident");
  }
  function v() {
    return p(r.EDGE);
  }
  function m() {
    return p("OPR/");
  }
  function g() {
    return m() ? r.UNKNOWN : p(r.PHANTOMJS) ? r.PHANTOMJS : v() ? r.EDGE : p(r.ELECTRON) ? r.ELECTRON : p(r.CHROME) ? r.CHROME : p(r.FIREFOX) ? r.FIREFOX : p(r.SAFARI) ? r.SAFARI : p(r.SKYPE_SHELL) ? r.SKYPE_SHELL : d() ? r.MSIE : r.UNKNOWN;
  }
  function y() {
    function e() {
      var e, t = h(), n = t.match(new RegExp(r.MSIE + " " + l));
      if (n)
        return n[1];
      e = t.match(new RegExp("rv:" + l));
      if (e)
        return e[1];
    }
    function t(e) {
      var t;
      return e === r.SAFARI && (e = "Version"), t = h().match(new RegExp(e + "/" + l)), t ? t[1] : a;
    }
    return d() ? e() : t(g());
  }
  function b() {
    var e = /(android|ipod|windows phone|wpdesktop|windows ce|blackberry\w*|meego|webos|palm|symbian|pda|\w*?mobile\w*?|\w*?phone\w*?)/i, t = /tablet|ipad/i;
    return h().match(e) ? s.MOBILE : h().match(t) ? s.TABLET : s.DESKTOP;
  }
  function w() {
    var e = /(windows|win32)/i, t = / arm;/i, n = /windows\sphone\s\d+\.\d+/i, r = /(macintosh|mac os x)/i, s = /(iPad|iPhone|iPod)(?=.*like Mac OS X)/i, o = /(linux|joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|cros)/i, u = /android/i;
    return h().match(n) ? i.WINDOWS_PHONE : h().match(t) ? i.WINDOWS_RT : h().match(s) ? i.IOS : h().match(u) ? i.ANDROID : h().match(o) ? i.LINUX : h().match(r) ? i.MACOSX : h().match(e) ? i.WINDOWS : i.UNKNOWN;
  }
  function E() {
    function e() {
      var e = h().match(new RegExp("Windows NT " + l));
      return e && o[e[1]] ? o[e[1]] : a;
    }
    function t() {
      var e = h().match(new RegExp(i.MACOSX + " " + c));
      return e ? n.parse(e[1].replace(/_/g, ".")).getMajor() : a;
    }
    return w() === i.WINDOWS ? e() : w() === i.MACOSX ? t() : a;
  }
  function S() {
    return p("WOW64") || p("Win64");
  }
  function x() {
    return {
      width: t.screen && t.screen.width || 0,
      height: t.screen && t.screen.height || 0,
      pixelRatio: t.devicePixelRatio || 0,
      colorDepth: t.screen && t.screen.colorDepth || 0,
      isTouchEnabled: Object.prototype.hasOwnProperty.call(t, "ontouchstart") || t.navigator.MaxTouchPoints > 0 || t.navigator.msMaxTouchPoints > 0
    };
  }
  function T() {
    return {
      deviceType: b(),
      osName: w(),
      osVersion: E(),
      is64bit: S(),
      platform: t.navigator.platform
    };
  }
  function N() {
    return g() === r.MSIE && C() ? t.external.msIsSiteMode() : "n/a";
  }
  function C() {
    return t.hasOwnProperty("external") && t.external.hasOwnProperty("msIsSiteMode");
  }
  function k() {
    return g() === r.SKYPE_SHELL;
  }
  function L() {
    return g() === r.ELECTRON;
  }
  function A() {
    return (t.navigator.getUserMedia || t.navigator.mozGetUserMedia || t.navigator.webkitGetUserMedia) && (typeof t.RTCPeerConnection != "undefined" || typeof t.RTCIceGatherer != "undefined" || typeof t.mozRTCPeerConnection != "undefined" || typeof t.webkitRTCPeerConnection != "undefined");
  }
  function O() {
    return A();
  }
  function M() {
    return g() === r.EDGE || g() === r.PHANTOMJS ? !1 : g() === r.CHROME && P() >= f ? !1 : !0;
  }
  function _() {
    var e = g();
    return e === r.FIREFOX || e === r.CHROME;
  }
  function P() {
    var e = n.parse(y()).getMajor();
    return isNaN(e) ? e : parseInt(e);
  }
  function H(e) {
    return e in t.document.documentElement.style;
  }
  var t = e("browser/window"), n = e("utils/common/version"), r = {
      MSIE: "MSIE",
      CHROME: "Chrome",
      FIREFOX: "Firefox",
      SAFARI: "Safari",
      EDGE: "Edge",
      ELECTRON: "Electron",
      SKYPE_SHELL: "SkypeShell",
      PHANTOMJS: "PhantomJS",
      UNKNOWN: "Unknown"
    }, i = {
      WINDOWS: "Windows",
      MACOSX: "Mac OS X",
      WINDOWS_PHONE: "Windows Phone",
      WINDOWS_RT: "Windows RT",
      IOS: "iOS",
      ANDROID: "Android",
      LINUX: "Linux",
      UNKNOWN: "Unknown"
    }, s = {
      DESKTOP: 1,
      MOBILE: 2,
      TABLET: 8
    }, o = {
      5.1: "XP",
      "6.0": "Vista",
      6.1: "7",
      6.2: "8",
      6.3: "8.1",
      "10.0": "10"
    }, u = { OBJECT_FIT: "objectFit" }, a = "U", f = "42", l = "([\\d,.]+)", c = "([\\d,_,.]+)", D = function () {
      var e = {};
      if (!t.location.search)
        return e;
      var n = t.location.search.substring(1).split("&");
      if (!n)
        return e;
      for (var r = 0; r < n.length; r++) {
        var i = n[r].split("=");
        if (!i[1])
          continue;
        e[i[0]] = i[1] || !0;
      }
      return e;
    };
  return {
    getBrowserInfo: function () {
      return {
        browserName: g(),
        browserVersion: y(),
        browserMajorVersion: P(),
        isPinnedSite: N(),
        isIeEngine: d(),
        isEdge: v(),
        isShellApp: k(),
        isElectron: L(),
        isInBrowserPluginSupported: M(),
        isPluginlessCallingSupported: O(),
        isBrowserDefaultToBlockPlugin: _(),
        getUrlParams: D,
        getUserAgent: h
      };
    },
    getScreenInfo: x,
    getSystemInfo: T,
    supportsCssProperty: H,
    supportsPinnedSites: C,
    BROWSERS: r,
    OPERATING_SYSTEMS: i,
    DEVICE_TYPES: s,
    CSS_PROPERTIES: u
  };
})

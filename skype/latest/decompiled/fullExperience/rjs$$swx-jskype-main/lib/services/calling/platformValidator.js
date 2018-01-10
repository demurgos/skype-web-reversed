(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/calling/platformValidator", [
      "require",
      "exports",
      "swx-browser-detect",
      "swx-util-calling-stack",
      "swx-enums",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function o() {
    var e = b(), t = u(e.browserName);
    return t(e);
  }
  function u(e) {
    switch (e) {
    case n["default"].BROWSERS.MSIE:
      return f;
    case n["default"].BROWSERS.CHROME:
      return c;
    case n["default"].BROWSERS.SAFARI:
      return a;
    case n["default"].BROWSERS.FIREFOX:
      return l;
    case n["default"].BROWSERS.ELECTRON:
      return h;
    case n["default"].BROWSERS.SKYPE_SHELL:
      return p;
    case n["default"].BROWSERS.EDGE:
      return p;
    default:
      return d;
    }
  }
  function a(e) {
    return !e.isWindowsOS && !e.isMacOSX ? v() : p();
  }
  function f(e) {
    return e.isWindowsOS ? e.browserMajorVersion < 10 ? d() : p() : v();
  }
  function l(e) {
    return !e.isMacOSX && !e.isWindowsOS && (!e.isLinux || !r.get().isPluginlessCallingSupported()) ? v() : e.browserMajorVersion < 25 ? d() : p();
  }
  function c(e) {
    return !e.isMacOSX && !e.isWindowsOS && (!e.isLinux || !r.get().isPluginlessCallingSupported()) ? v() : p();
  }
  function h(e) {
    return !e.isLinux && !e.isMacOSX && !e.isWindowsOS ? v() : p();
  }
  function p() {
    return { isSupported: !0 };
  }
  function d() {
    return {
      isSupported: !1,
      reason: i.callingNotSupportedReasons.BrowserNotSupported
    };
  }
  function v() {
    return {
      isSupported: !1,
      reason: i.callingNotSupportedReasons.OSNotSupported
    };
  }
  function m() {
    try {
      return n["default"].getSystemInfo().osName === n["default"].OPERATING_SYSTEMS.WINDOWS;
    } catch (e) {
      return !1;
    }
  }
  function g() {
    try {
      return n["default"].getSystemInfo().osName === n["default"].OPERATING_SYSTEMS.MACOSX;
    } catch (e) {
      return !1;
    }
  }
  function y() {
    try {
      return n["default"].getSystemInfo().osName === n["default"].OPERATING_SYSTEMS.LINUX;
    } catch (e) {
      return !1;
    }
  }
  function b() {
    var e = n["default"].getBrowserInfo();
    return s.extend(e, {
      isWindowsOS: m(),
      isMacOSX: g(),
      isLinux: y()
    });
  }
  var n = e("swx-browser-detect"), r = e("swx-util-calling-stack"), i = e("swx-enums"), s = e("lodash-compat");
  t.getPlatformSupport = o;
}));

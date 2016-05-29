define("jSkype/services/calling/platformValidator", [
  "require",
  "browser/detect",
  "utils/calling/callingStack",
  "swx-enums"
], function (e) {
  function i() {
    var e = g(), t = s(e.browserName);
    return t(e);
  }
  function s(e) {
    switch (e) {
    case t.BROWSERS.MSIE:
      return u;
    case t.BROWSERS.CHROME:
      return f;
    case t.BROWSERS.SAFARI:
      return o;
    case t.BROWSERS.FIREFOX:
      return a;
    case t.BROWSERS.ELECTRON:
      return l;
    case t.BROWSERS.SKYPE_SHELL:
      return c;
    case t.BROWSERS.EDGE:
      return c;
    default:
      return h;
    }
  }
  function o(e) {
    return !e.isWindowsOS && !e.isMacOSX ? p() : c();
  }
  function u(e) {
    return e.isWindowsOS ? e.browserMajorVersion < 10 ? h() : c() : p();
  }
  function a(e) {
    return !e.isMacOSX && !e.isWindowsOS && (!e.isLinux || !n.get().isPluginlessCallingSupported()) ? p() : e.browserMajorVersion < 25 ? h() : c();
  }
  function f(e) {
    return !e.isMacOSX && !e.isWindowsOS && (!e.isLinux || !n.get().isPluginlessCallingSupported()) ? p() : c();
  }
  function l(e) {
    return !e.isLinux && !e.isMacOSX && !e.isWindowsOS ? p() : c();
  }
  function c() {
    return { isSupported: !0 };
  }
  function h() {
    return {
      isSupported: !1,
      reason: r.callingNotSupportedReasons.BrowserNotSupported
    };
  }
  function p() {
    return {
      isSupported: !1,
      reason: r.callingNotSupportedReasons.OSNotSupported
    };
  }
  function d() {
    try {
      return t.getSystemInfo().osName === t.OPERATING_SYSTEMS.WINDOWS;
    } catch (e) {
      return !1;
    }
  }
  function v() {
    try {
      return t.getSystemInfo().osName === t.OPERATING_SYSTEMS.MACOSX;
    } catch (e) {
      return !1;
    }
  }
  function m() {
    try {
      return t.getSystemInfo().osName === t.OPERATING_SYSTEMS.LINUX;
    } catch (e) {
      return !1;
    }
  }
  function g() {
    var e = t.getBrowserInfo();
    return e.isWindowsOS = d(), e.isMacOSX = v(), e.isLinux = m(), e;
  }
  var t = e("browser/detect"), n = e("utils/calling/callingStack"), r = e("swx-enums");
  return { getPlatformSupport: i };
});

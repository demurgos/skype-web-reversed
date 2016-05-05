define("jSkype/services/outOfBrowser/extension", [
  "require",
  "exports",
  "module",
  "jSkype/settings",
  "jSkype/telemetry/logging/callingLogTracer",
  "constants/outOfBrowser",
  "constants/extension",
  "browser/detect",
  "browser/document",
  "browser/window",
  "swx-extension-api"
], function (e, t) {
  function l(e) {
    function w() {
      r.log("Extension - loading shell app"), f && f.sharedExtension ? t.getAppHost().then(N).then(C).catch(k) : k("SkypeExtension is not available");
    }
    function E() {
      var e = u.querySelector(s.META_SELECTOR);
      return e ? e.getAttribute("id") : n.settings.shellApp.chromeExtensionId;
    }
    function S() {
      return o.getBrowserInfo().browserName === o.BROWSERS.CHROME ? f.sharedExtension(E()) : f.sharedExtension(i.SHELL_APP_MIME_TYPE, u.body);
    }
    function x() {
      S().then(T).then(A).catch(L);
    }
    function T(e) {
      function t(e) {
        return r.log("Extension - Connect app host, max retries:", e), h.connectNMHost(i.SHELL_APP_ID).catch(function (n) {
          return n && n.message && /reply timeout/.test(n.message) && e > 0 ? t(e - 1) : Promise.reject(n);
        });
      }
      return h = e, t(n.settings.shellApp.connectShellAppHostRetries);
    }
    function N(t) {
      var n = O();
      return t.openWindow({
        url: e,
        width: n.width,
        height: n.height,
        minWidth: 345,
        minHeight: 460,
        disableHotKeys: !0,
        hidden: !0
      });
    }
    function C(e) {
      c = e, b && h.addMessageHandler(s.CONNECTION_CHANGE_EVENT, b), g();
    }
    function k(e) {
      r.warn("Extension - Error loading shell app: ", e), y(e);
    }
    function L(e) {
      var t = Boolean(h);
      r.log("Extension - App host init failed, error:", e && e.message ? e.message : e), t ? v(s.ERRORS.MISSING_PLUGIN) : v(s.ERRORS.MISSING_EXTENSION);
    }
    function A(e) {
      l = e, d(e);
    }
    function O() {
      return {
        width: a.screen.width / s.SHELL_APP_SIZE_FACTOR,
        height: a.screen.height / s.SHELL_APP_SIZE_FACTOR
      };
    }
    var t = this, l, c, h, p, d, v, m, g, y, b;
    t.openShellApp = function (e) {
      return m || (m = new Promise(function (e, t) {
        g = e, y = t;
      }), w()), b = e, m;
    }, t.getAppHost = function () {
      return p || (p = new Promise(function (e, t) {
        d = e, v = t;
      }), x()), p;
    }, t.postMessage = function (e) {
      return m.then(function () {
        return r.log("Extension::postMessage", e), c.postMessage(e);
      });
    }, t.addMessageHandler = function (e) {
      r.log("Extension::addMessageHandler"), l.addMessageHandler("messageFromWindow", e);
    }, t.addEventHandler = function (e, t) {
      l.addMessageHandler(e, t);
    }, t.disconnect = function () {
      return l && l.disconnect(), Promise.resolve();
    }, t.dispose = function () {
      return r.log("Extension::dispose"), p = null, v = null, d = null, m = null, y = null, g = null, h && h.removeMessageHandler(s.CONNECTION_CHANGE_EVENT, b), Promise.resolve();
    };
  }
  var n = e("jSkype/settings"), r = e("jSkype/telemetry/logging/callingLogTracer").get(), i = e("constants/outOfBrowser"), s = e("constants/extension"), o = e("browser/detect"), u = e("browser/document"), a = e("browser/window"), f = e("swx-extension-api").SkypeExtension;
  t.build = function (e) {
    return new l(e);
  };
})

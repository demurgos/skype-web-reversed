(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/outOfBrowser/extension", [
      "require",
      "exports",
      "jskype-settings-instance",
      "../../../lib/telemetry/logging/callingLogTracer",
      "swx-constants",
      "swx-browser-detect",
      "swx-browser-globals",
      "swx-extension-api"
    ], e);
}(function (e, t) {
  function l(e) {
    return new f(e);
  }
  var n = e("jskype-settings-instance"), r = e("../../../lib/telemetry/logging/callingLogTracer"), i = e("swx-constants"), s = e("swx-browser-detect"), o = e("swx-browser-globals"), u = e("swx-extension-api"), a = r.get();
  t.extensionConstants = {
    SHELL_APP_SIZE_FACTOR: 1.6,
    SHELL_APP_MIN_DIMENSIONS: {
      WIDTH: 345,
      HEIGHT: 460
    },
    ERRORS: {
      MISSING_EXTENSION: "MISSING_EXTENSION",
      MISSING_PLUGIN: "MISSING_PLUGIN"
    },
    CONNECTION_CHANGE_EVENT: "NMHostConnectionChange"
  };
  var f = function () {
    function e(e) {
      var n = this;
      this.openShellApp = function (e) {
        return n.openShellAppPromise || (n.openShellAppPromise = new Promise(function (e, t) {
          n.openShellAppPromiseResolve = e;
          n.openShellAppPromiseReject = t;
        }), n.loadSkypeExtension()), n.onDisconnectedCallback = e, n.openShellAppPromise;
      };
      this.getAppHost = function () {
        return n.loadAppHostPromise || (n.loadAppHostPromise = new Promise(function (e, t) {
          n.loadAppHostPromiseResolve = e;
          n.loadAppHostPromiseReject = t;
        }), n.loadAppHost()), n.loadAppHostPromise;
      };
      this.postMessage = function (e) {
        return n.openShellAppPromise.then(function () {
          return a.log("Extension::postMessage", e), n.shellAppWindow.postMessage(e);
        });
      };
      this.addMessageHandler = function (e) {
        a.log("Extension::addMessageHandler");
        n.shellAppHost.addMessageHandler("messageFromWindow", e);
      };
      this.addEventHandler = function (e, t) {
        n.shellAppHost.addMessageHandler(e, t);
      };
      this.disconnect = function () {
        return n.shellAppHost && n.shellAppHost.disconnect(), Promise.resolve();
      };
      this.dispose = function () {
        a.log("Extension::dispose");
        n.loadAppHostPromise = null;
        n.loadAppHostPromiseReject = null;
        n.loadAppHostPromiseResolve = null;
        n.openShellAppPromise = null;
        n.openShellAppPromiseReject = null;
        n.openShellAppPromiseResolve = null;
        n.extensionInstance && n.extensionInstance.removeMessageHandler(t.extensionConstants.CONNECTION_CHANGE_EVENT, n.onDisconnectedCallback);
      };
      this.shellAppUrl = e;
    }
    return e.prototype.loadSkypeExtension = function () {
      a.log("Extension - loading shell app");
      u.SkypeExtension && u.SkypeExtension.sharedExtension ? this.getAppHost().then(this.openShellAppWindow.bind(this)).then(this.onShellAppWindowOpened.bind(this))["catch"](this.onShellAppInitError.bind(this)) : this.onShellAppInitError("SkypeExtension is not available");
    }, e.prototype.getExtensionId = function () {
      var e = o.getDocument().querySelector(i.OUT_OF_BROWSER.shellAppMetaSelector);
      return e ? e.getAttribute("id") : n.settings.shellApp.chromeExtensionId;
    }, e.prototype.getExtensionConnection = function () {
      return s["default"].getBrowserInfo().browserName === s["default"].BROWSERS.CHROME ? u.SkypeExtension.sharedExtension(this.getExtensionId()) : u.SkypeExtension.sharedExtension(i.OUT_OF_BROWSER.SHELL_APP_MIME_TYPE, o.getDocument().body);
    }, e.prototype.loadAppHost = function () {
      this.getExtensionConnection().then(this.openShellAppHost.bind(this)).then(this.onAppHostInitCompleted.bind(this))["catch"](this.onAppHostInitFailed.bind(this));
    }, e.prototype.openShellAppHost = function (e) {
      var t = this;
      this.extensionInstance = e;
      var r = function (e) {
        return a.log("Extension - Connect app host, max retries:", e), t.extensionInstance.connectNMHost(i.OUT_OF_BROWSER.SHELL_APP_ID)["catch"](function (t) {
          return t && t.message && /reply timeout/.test(t.message) && e > 0 ? r(e - 1) : Promise.reject(t);
        });
      };
      return r(n.settings.shellApp.connectShellAppHostRetries);
    }, e.prototype.openShellAppWindow = function (e) {
      return e.openWindow({
        url: this.shellAppUrl,
        minWidth: 345,
        minHeight: 460,
        disableHotKeys: !0,
        hidden: !0
      });
    }, e.prototype.onShellAppWindowOpened = function (e) {
      this.shellAppWindow = e;
      this.onDisconnectedCallback && this.extensionInstance.addMessageHandler(t.extensionConstants.CONNECTION_CHANGE_EVENT, this.onDisconnectedCallback);
      this.openShellAppPromiseResolve();
    }, e.prototype.onShellAppInitError = function (e) {
      a.warn("Extension - Error loading shell app: ", e);
      this.openShellAppPromiseReject(e);
    }, e.prototype.onAppHostInitFailed = function (e) {
      var n = Boolean(this.extensionInstance);
      a.log("Extension - App host init failed, error:", e && e.message ? e.message : e);
      n ? this.loadAppHostPromiseReject(t.extensionConstants.ERRORS.MISSING_PLUGIN) : this.loadAppHostPromiseReject(t.extensionConstants.ERRORS.MISSING_EXTENSION);
    }, e.prototype.onAppHostInitCompleted = function (e) {
      this.shellAppHost = e;
      this.loadAppHostPromiseResolve(e);
    }, e;
  }();
  t.Extension = f;
  t.build = l;
}));

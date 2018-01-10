(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/plugin/pluginSupportDetector", [
      "require",
      "exports",
      "jcafe-property-model",
      "swx-browser-detect",
      "./pluginLifecycleFacade",
      "../../../lib/services/plugin/electron/electronSupportDetector",
      "swx-enums",
      "./pluginDetect"
    ], e);
}(function (e, t) {
  function f() {
    return r["default"].getBrowserInfo().isElectron;
  }
  function l() {
    return f() ? s.build() : new a();
  }
  var n = e("jcafe-property-model"), r = e("swx-browser-detect"), i = e("./pluginLifecycleFacade"), s = e("../../../lib/services/plugin/electron/electronSupportDetector"), o = e("swx-enums"), u = e("./pluginDetect"), a = function () {
      function e() {
        var e = this;
        this.getCallingSupportTask = null;
        this.getCallingSupport = function (t) {
          if (!e.getCallingSupportTask || e.getCallingSupportTask.promise.state() === "resolved")
            e.getCallingSupportTask = n.task(), e.checkForPluginInstall(t);
          return e.getCallingSupportTask.promise;
        };
      }
      return e.prototype.checkForPluginInstall = function (e) {
        var t = r["default"].getBrowserInfo(), n = u.isPluginInstalled();
        n ? e && t.isBrowserDefaultToBlockPlugin ? this.loadPlugin() : this.getCallingSupportTask.resolve({
          isSupported: !0,
          reason: ""
        }) : this.getCallingSupportTask.resolve({
          isSupported: !1,
          reason: o.callingNotSupportedReasons.PluginNotInstalled
        });
      }, e.prototype.loadPlugin = function () {
        var e = this;
        i.createManager().then(function () {
          e.getCallingSupportTask.resolve({
            isSupported: !0,
            reason: ""
          });
        })["catch"](function () {
          e.getCallingSupportTask.resolve({
            isSupported: !1,
            reason: o.callingNotSupportedReasons.PluginBlocked
          });
        });
      }, e;
    }();
  t.PluginSupportDetector = a;
  t.build = l;
}));

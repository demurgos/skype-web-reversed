(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/outOfBrowser/outOfBrowserSupportDetector", [
      "require",
      "exports",
      "jcafe-property-model",
      "./extension",
      "swx-enums"
    ], e);
}(function (e, t) {
  function o() {
    return new s();
  }
  var n = e("jcafe-property-model"), r = e("./extension"), i = e("swx-enums"), s = function () {
      function e() {
        var e = this;
        this.getCallingSupportTask = null;
        this.getCallingSupport = function (t) {
          if (!e.getCallingSupportTask || e.getCallingSupportTask.promise.state() === "resolved")
            e.getCallingSupportTask = n.task(), r.build().getAppHost().then(e.onGetAppHostCompleted.bind(e))["catch"](e.onGetAppHostFailed.bind(e));
          return e.getCallingSupportTask.promise;
        };
      }
      return e.prototype.onGetAppHostCompleted = function (e) {
        this.getCallingSupportTask.resolve({
          isSupported: !0,
          reason: ""
        });
      }, e.prototype.onGetAppHostFailed = function () {
        this.getCallingSupportTask.resolve({
          isSupported: !1,
          reason: i.callingNotSupportedReasons.PluginNotInstalled
        });
      }, e;
    }();
  t.OutOfBrowserSupportDetector = s;
  t.build = o;
}));

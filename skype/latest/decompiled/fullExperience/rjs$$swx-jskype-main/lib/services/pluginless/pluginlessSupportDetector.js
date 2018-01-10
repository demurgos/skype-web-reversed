(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/pluginless/pluginlessSupportDetector", [
      "require",
      "exports",
      "jcafe-property-model"
    ], e);
}(function (e, t) {
  function i() {
    return new r();
  }
  var n = e("jcafe-property-model"), r = function () {
      function e() {
        var e = this;
        this.getCallingSupportTask = null;
        this.getCallingSupport = function (t) {
          if (!e.getCallingSupportTask || e.getCallingSupportTask.promise.state() === "resolved")
            e.getCallingSupportTask = n.task(), e.getCallingSupportTask.resolve({
              isSupported: !0,
              reason: ""
            });
          return e.getCallingSupportTask.promise;
        };
      }
      return e;
    }();
  t.PluginlessSupportDetector = r;
  t.build = i;
}));

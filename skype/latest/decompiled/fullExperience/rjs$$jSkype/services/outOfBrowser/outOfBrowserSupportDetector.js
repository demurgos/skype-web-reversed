define("jSkype/services/outOfBrowser/outOfBrowserSupportDetector", [
  "require",
  "jcafe-property-model",
  "jSkype/services/outOfBrowser/extension",
  "swx-enums"
], function (e) {
  function i() {
    function i() {
      e.resolve({
        isSupported: !0,
        reason: ""
      });
    }
    function s() {
      e.resolve({
        isSupported: !1,
        reason: r.callingNotSupportedReasons.PluginNotInstalled
      });
    }
    var e = null;
    this.getCallingSupport = function () {
      if (!e || e.promise.state() === "resolved")
        e = t.task(), n.build().getAppHost().then(i).catch(s);
      return e.promise;
    };
  }
  var t = e("jcafe-property-model"), n = e("jSkype/services/outOfBrowser/extension"), r = e("swx-enums");
  return {
    build: function () {
      return new i();
    }
  };
});

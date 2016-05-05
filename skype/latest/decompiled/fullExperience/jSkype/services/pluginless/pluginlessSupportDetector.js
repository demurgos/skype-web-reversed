define("jSkype/services/pluginless/pluginlessSupportDetector", [
  "require",
  "jcafe-property-model"
], function (e) {
  function n() {
    var e = null;
    this.getCallingSupport = function () {
      if (!e || e.promise.state() === "resolved")
        e = t.task(), e.resolve({
          isSupported: !0,
          reason: ""
        });
      return e.promise;
    };
  }
  var t = e("jcafe-property-model");
  return {
    build: function () {
      return new n();
    }
  };
})

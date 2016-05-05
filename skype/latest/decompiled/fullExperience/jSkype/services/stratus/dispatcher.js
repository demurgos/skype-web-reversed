define("jSkype/services/stratus/dispatcher", [
  "require",
  "jSkype/services/internalPubSub"
], function (e) {
  var t = e("jSkype/services/internalPubSub");
  return function (n) {
    function r(e) {
      var t = {};
      return t.responseData = e || {}, t.moduleName = "stratus", t.actionName = n, t;
    }
    this.success = function (e) {
      var n = r(e.response);
      t.get().publish("stratus:data", n);
    }, this.error = function (e) {
      var n = r(e);
      t.get().publish("stratus:error", n);
    };
  };
})

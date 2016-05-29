define("jSkype/services/webapi/boundary/dispatcher", [
  "require",
  "lodash-compat",
  "jSkype/services/internalPubSub"
], function (e) {
  var t = e("lodash-compat"), n = e("jSkype/services/internalPubSub");
  return function (r) {
    function i(e) {
      return e = e || {}, t.isObject(e) && (e.moduleName = "webapi", e.actionName = r), e;
    }
    this.success = function (e) {
      var t = i(e.response);
      n.get().publish("webapi:data", t);
    };
    this.error = function (e) {
      var t = i(e);
      n.get().publish("webapi:error", t);
    };
  };
});

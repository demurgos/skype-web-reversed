(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-chat-service/lib/boundary/dispatcher", [
      "require",
      "exports",
      "lodash-compat"
    ], e);
}(function (e, t) {
  var n = e("lodash-compat"), r = function () {
      function e(e, t) {
        var r = this;
        this.success = function (e) {
          var t = r.appendIDInfo(e.response);
          r.internalPubSub.publish("webapi:data", t);
        };
        this.error = function (e) {
          var t = r.appendIDInfo(e);
          r.internalPubSub.publish("webapi:error", t);
        };
        this.appendIDInfo = function (e) {
          return e = e || {}, n.isObject(e) && (e.moduleName = "webapi", e.actionName = r.actionName), e;
        };
        this.actionName = e;
        this.internalPubSub = t;
      }
      return e;
    }();
  t.__esModule = !0;
  t["default"] = r;
}));

(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/entitlement/facade", [
      "require",
      "exports",
      "./serviceSettings"
    ], e);
}(function (e, t) {
  var n = e("./serviceSettings"), r = function () {
      function e(e, t) {
        var r = this;
        this.getEntitlementServiceData = function (e, t) {
          var i = n.getEntitlementServiceEndpoint(e, t);
          return r.optionsBuilder.build().then(function (e) {
            return r.serviceLocator.get(i, e);
          });
        };
        this.getEntitlementListingData = function (e) {
          var t = n.getEntitlementListingEndpoint(e);
          return r.optionsBuilder.build().then(function (e) {
            return r.serviceLocator.get(t, e);
          });
        };
        this.serviceLocator = e;
        this.optionsBuilder = t;
      }
      return e;
    }();
  t.__esModule = !0;
  t["default"] = r;
}));

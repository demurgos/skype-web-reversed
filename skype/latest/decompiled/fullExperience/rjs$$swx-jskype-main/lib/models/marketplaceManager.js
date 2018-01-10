(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/marketplaceManager", [
      "require",
      "exports",
      "jcafe-property-model",
      "./marketplaceSearchQuery"
    ], e);
}(function (e, t) {
  var n = e("jcafe-property-model"), r = e("./marketplaceSearchQuery"), i = function () {
      function e() {
        this.createSearchQuery = function () {
          return new r["default"]();
        };
        this.purchase = n.disabledCommand();
      }
      return e;
    }();
  t.__esModule = !0;
  t["default"] = i;
}));

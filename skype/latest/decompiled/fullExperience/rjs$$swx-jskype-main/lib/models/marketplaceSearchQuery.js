(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/marketplaceSearchQuery", [
      "require",
      "exports",
      "jcafe-property-model",
      "../modelHelpers/propertyModelHelper",
      "./searchQuery"
    ], e);
}(function (e, t) {
  var n = e("jcafe-property-model"), r = e("../modelHelpers/propertyModelHelper"), i = e("./searchQuery"), s = function (e) {
      function t() {
        function s() {
          var e = n.task();
          return e.promise;
        }
        var t = e.call(this) || this, i = n.collection();
        return i.add("type", "type"), t.supportedKeywords = r.exposeReadOnlyCollection(i), t.getMore = n.command(s, t.moreResultsAvailable), t;
      }
      return __extends(t, e), t;
    }(i["default"]);
  t.__esModule = !0;
  t["default"] = s;
}));

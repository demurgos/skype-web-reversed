(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/searchQuery", [
      "require",
      "exports",
      "jcafe-property-model",
      "../modelHelpers/propertyModelHelper"
    ], e);
}(function (e, t) {
  var n = e("jcafe-property-model"), r = e("../modelHelpers/propertyModelHelper"), i = function () {
      function e() {
        this.keywords = {};
        this.limit = n.property({ value: 20 });
        this.sources = n.property();
        this.text = n.property();
        this.moreResultsAvailable = n.boolProperty(!0).asReadOnly();
        this.results = r.exposeReadOnlyCollection(n.collection());
        this.supportedKeywords = r.exposeReadOnlyCollection(n.collection());
      }
      return e;
    }();
  t.__esModule = !0;
  t["default"] = i;
}));

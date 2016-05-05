define("jSkype/models/marketplaceSearchQuery", [
  "require",
  "jcafe-property-model",
  "jSkype/modelHelpers/propertyModelHelper",
  "lodash-compat",
  "jSkype/models/searchQuery"
], function (e) {
  function s() {
    function s() {
      var e = t.task();
      return e.promise;
    }
    var e = this, r = t.collection();
    i.call(e), r.add("type", "type"), e.supportedKeywords = n.exposeReadOnlyCollection(r), e.getMore = t.command(s, e.moreResultsAvailable);
  }
  var t = e("jcafe-property-model"), n = e("jSkype/modelHelpers/propertyModelHelper"), r = e("lodash-compat"), i = e("jSkype/models/searchQuery");
  return s.prototype = r.create(i.prototype, { constructor: s }), s;
})

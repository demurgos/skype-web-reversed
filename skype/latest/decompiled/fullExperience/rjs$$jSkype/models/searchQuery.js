define("jSkype/models/searchQuery", [
  "require",
  "jcafe-property-model",
  "jSkype/modelHelpers/propertyModelHelper"
], function (e) {
  function r() {
    var e = t.collection(), r = t.boolProperty(!0), i = t.collection();
    this.keywords = {};
    this.limit = t.property({ value: 20 });
    this.moreResultsAvailable = r.asReadOnly();
    this.results = n.exposeReadOnlyCollection(e);
    this.sources = t.property();
    this.supportedKeywords = n.exposeReadOnlyCollection(i);
    this.text = t.property();
  }
  var t = e("jcafe-property-model"), n = e("jSkype/modelHelpers/propertyModelHelper");
  return r;
});

define("jSkype/models/marketplaceManager", [
  "require",
  "jcafe-property-model",
  "jSkype/models/marketplaceSearchQuery"
], function (e) {
  function r() {
    this.createSearchQuery = function () {
      return new n();
    };
    this.purchase = t.disabledCommand();
  }
  var t = e("jcafe-property-model"), n = e("jSkype/models/marketplaceSearchQuery");
  return r;
});

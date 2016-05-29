define("jSkype/services/entitlement/facade", [
  "require",
  "jSkype/services/entitlement/serviceSettings"
], function (e) {
  function n(e, n) {
    this.getEntitlementServiceData = function (r, i) {
      var s = t.getEntitlementServiceEndpoint(r, i);
      return n.build().then(function (t) {
        return e.get(s, t);
      });
    };
    this.getEntitlementListingData = function (r) {
      var i = t.getEntitlementListingEndpoint(r);
      return n.build().then(function (t) {
        return e.get(i, t);
      });
    };
  }
  var t = e("jSkype/services/entitlement/serviceSettings");
  return n;
});

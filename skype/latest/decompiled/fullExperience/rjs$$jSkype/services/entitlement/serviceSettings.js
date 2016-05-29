define("jSkype/services/entitlement/serviceSettings", [
  "require",
  "exports",
  "module",
  "jSkype/settings"
], function (e, t) {
  function r(e) {
    return t.name + "-" + e;
  }
  function i(e) {
    return "${" + e + "}";
  }
  var n = e("jSkype/settings");
  t.getHost = function () {
    return n.settings.entitlementService.host;
  };
  t.getEntitlementListingEndpoint = function (e) {
    return n.settings.entitlementService.listingEndpoint.replace(t.tokens.username, encodeURIComponent(e));
  };
  t.getEntitlementServiceEndpoint = function (e, r) {
    return n.settings.entitlementService.serviceEndpoint.replace(t.tokens.username, encodeURIComponent(e)).replace(t.tokens.service, r);
  };
  t.getRetryPolicy = function () {
    return n.settings.entitlementService.retry;
  };
  t.name = "Entitlement";
  t.version = "3.0";
  t.serviceNames = { credit: "pstn" };
  t.actions = { getEntitlementService: r("getEntitlementService") };
  t.tokens = {
    username: i("username"),
    service: i("service")
  };
});

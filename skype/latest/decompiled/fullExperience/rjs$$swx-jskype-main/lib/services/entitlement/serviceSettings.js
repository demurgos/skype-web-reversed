(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/entitlement/serviceSettings", [
      "require",
      "exports",
      "jskype-settings-instance"
    ], e);
}(function (e, t) {
  function r() {
    return n.settings.entitlementService.host;
  }
  function i(e) {
    return n.settings.entitlementService.listingEndpoint.replace(t.tokens.username, encodeURIComponent(e));
  }
  function s(e, r) {
    return n.settings.entitlementService.serviceEndpoint.replace(t.tokens.username, encodeURIComponent(e)).replace(t.tokens.service, r);
  }
  function o() {
    return n.settings.entitlementService.retry;
  }
  function u(e) {
    return t.name + "-" + e;
  }
  function a(e) {
    return "${" + e + "}";
  }
  var n = e("jskype-settings-instance");
  t.getHost = r;
  t.getEntitlementListingEndpoint = i;
  t.getEntitlementServiceEndpoint = s;
  t.getRetryPolicy = o;
  t.name = "Entitlement";
  t.version = "3.0";
  t.serviceNames = { credit: "pstn" };
  t.actions = { getEntitlementService: u("getEntitlementService") };
  t.tokens = {
    username: a("username"),
    service: a("service")
  };
}));

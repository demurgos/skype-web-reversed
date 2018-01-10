(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/serviceFactory", [
      "require",
      "exports",
      "swx-xhr-dispatcher",
      "./serviceAccessLayer/decorations/reporting",
      "swx-jskype-internal-application-instance",
      "./contacts/serviceSettings",
      "swx-chat-service/lib/serviceSettings",
      "./entitlement/serviceSettings",
      "./contacts/main",
      "./webapi/main",
      "./entitlement/main",
      "./contacts/optionsBuilder",
      "./entitlement/entitlementOptionsBuilder"
    ], e);
}(function (e, t) {
  function p() {
    var e = i.get().personsAndGroupsManager.mePerson.id(), t = n.build(m(s.getHost()));
    return a.getInstance(e, t, new c["default"]());
  }
  function d() {
    var e = n.build(m(o.getHost()));
    return f.getInstance(e);
  }
  function v() {
    var e = n.build(m(u.getHost()));
    return l.getInstance(e, new h["default"]());
  }
  function m(e) {
    return {
      host: e,
      decorations: [r]
    };
  }
  var n = e("swx-xhr-dispatcher"), r = e("./serviceAccessLayer/decorations/reporting"), i = e("swx-jskype-internal-application-instance"), s = e("./contacts/serviceSettings"), o = e("swx-chat-service/lib/serviceSettings"), u = e("./entitlement/serviceSettings"), a = e("./contacts/main"), f = e("./webapi/main"), l = e("./entitlement/main"), c = e("./contacts/optionsBuilder"), h = e("./entitlement/entitlementOptionsBuilder");
  t.getContactsService = p;
  t.getPresenceService = d;
  t.getEntitlementService = v;
}));

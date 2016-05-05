define("jSkype/services/serviceFactory", [
  "require",
  "exports",
  "module",
  "jSkype/client",
  "jSkype/settings",
  "jSkype/services/stratus/serviceSettings",
  "jSkype/services/contacts/serviceSettings",
  "jSkype/services/webapi/serviceSettings",
  "jSkype/services/entitlement/serviceSettings",
  "jSkype/services/serviceAccessLayer/serviceLocator",
  "jSkype/services/contacts/main",
  "jSkype/services/stratus/main",
  "jSkype/services/people/main",
  "jSkype/services/ABCHProfile/main",
  "jSkype/services/webapi/main",
  "jSkype/services/entitlement/main",
  "jSkype/services/stratus/optionsBuilder",
  "jSkype/services/contacts/optionsBuilder",
  "jSkype/services/entitlement/entitlementOptionsBuilder"
], function (e, t) {
  var n = e("jSkype/client"), r = e("jSkype/settings"), i = e("jSkype/services/stratus/serviceSettings"), s = e("jSkype/services/contacts/serviceSettings"), o = e("jSkype/services/webapi/serviceSettings"), u = e("jSkype/services/entitlement/serviceSettings"), a = e("jSkype/services/serviceAccessLayer/serviceLocator"), f = e("jSkype/services/contacts/main"), l = e("jSkype/services/stratus/main"), c = e("jSkype/services/people/main"), h = e("jSkype/services/ABCHProfile/main"), p = e("jSkype/services/webapi/main"), d = e("jSkype/services/entitlement/main"), v = e("jSkype/services/stratus/optionsBuilder"), m = e("jSkype/services/contacts/optionsBuilder"), g = e("jSkype/services/entitlement/entitlementOptionsBuilder");
  t.getStratusService = function () {
    var e = a.build(i.getHost());
    return l.getInstance(e, new v());
  }, t.getContactsService = function () {
    var e = n.get().personsAndGroupsManager.mePerson.id(), t = a.build(s.getHost());
    return f.getInstance(e, t, new m());
  }, t.getPresenceService = function () {
    var e = a.build(o.getHost());
    return p.getInstance(e);
  }, t.getEntitlementService = function () {
    var e = a.build(u.getHost());
    return d.getInstance(e, new g());
  }, t.getPeopleService = function () {
    var e = a.build(r.settings.peopleService.host);
    return c.getInstance(e, new v());
  }, t.getABCHProfileService = function () {
    var e = a.build(r.settings.profileService.host);
    return h.getInstance(e, new v());
  };
})

define("jSkype/modelHelpers/contacts/dataProcessors/contactList", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "constants/common",
  "constants/people",
  "utils/common/cache/instance",
  "jSkype/client",
  "jSkype/settings",
  "jSkype/constants/data",
  "jSkype/constants/people",
  "jSkype/modelHelpers/contacts/groupCleaner",
  "jSkype/modelHelpers/contacts/dataProcessors/authorization",
  "jSkype/modelHelpers/contacts/contactAdder",
  "jSkype/modelHelpers/personsRegistry/instance",
  "jSkype/modelHelpers/personsAndGroupsHelper",
  "jSkype/services/internalPubSub"
], function (e, t) {
  function m(e) {
    function p(e) {
      var t = n.reduce(e.contacts, function (e, t) {
        return t.deleted ? (l.build().removeContact(t.id), e) : e.concat(t);
      }, []);
      return t.length > 0 && (h.build().add(t), e.scope === i.scopes.FULL && l.build().filter(t)), o.get().personsAndGroupsManager.all.persons();
    }
    function m(e, t) {
      if (e && u.isFeatureOn(r.featureFlags.CONTACT_PROFILE_CACHE)) {
        var n = t.map(d.createRawDataFromPerson);
        return s.get().setSensitiveItem(a.CONTACT_PROFILES, n);
      }
      return Promise.resolve();
    }
    function g(t) {
      e.defaultPersonAuthorization = f.UNAUTHORIZED, c.build().process(e.toArray()), v.get().publish("contacts:loaded", t.filter(function (e) {
        return e._authorization() === f.AUTHORIZED && !e.isBlocked();
      })), o.get().personsAndGroupsManager._initialized(!0);
    }
    var t = n.once(g);
    this.process = function (e) {
      var n = p(e);
      return t(n), m(e.contacts, n);
    };
  }
  var n = e("lodash-compat"), r = e("constants/common"), i = e("constants/people"), s = e("utils/common/cache/instance"), o = e("jSkype/client"), u = e("jSkype/settings"), a = e("jSkype/constants/data").storageKeys, f = e("jSkype/constants/people").authorizationStates, l = e("jSkype/modelHelpers/contacts/groupCleaner"), c = e("jSkype/modelHelpers/contacts/dataProcessors/authorization"), h = e("jSkype/modelHelpers/contacts/contactAdder"), p = e("jSkype/modelHelpers/personsRegistry/instance"), d = e("jSkype/modelHelpers/personsAndGroupsHelper"), v = e("jSkype/services/internalPubSub");
  t.build = function () {
    var e = p.build();
    return new m(e);
  };
})

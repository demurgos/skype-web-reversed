(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataProcessors/contactListDataProcessor", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "../../../../lib/services/cache/instance",
      "../../../../lib/modelHelpers/contacts/groupCleaner",
      "../../../../lib/modelHelpers/contacts/dataProcessors/authorization",
      "../../../../lib/modelHelpers/contacts/contactAdder",
      "../../../../lib/modelHelpers/personsRegistry/instance",
      "../../../../lib/modelHelpers/contacts/dataMappers/cacheToPerson",
      "../../../../lib/services/internalPubSub",
      "swx-mri",
      "jskype-constants",
      "jskype-constants",
      "swx-constants",
      "lodash-compat"
    ], e);
}(function (e, t) {
  function y() {
    return new g();
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("../../../../lib/services/cache/instance"), i = e("../../../../lib/modelHelpers/contacts/groupCleaner"), s = e("../../../../lib/modelHelpers/contacts/dataProcessors/authorization"), o = e("../../../../lib/modelHelpers/contacts/contactAdder"), u = e("../../../../lib/modelHelpers/personsRegistry/instance"), a = e("../../../../lib/modelHelpers/contacts/dataMappers/cacheToPerson"), f = e("../../../../lib/services/internalPubSub"), l = e("swx-mri"), c = e("jskype-constants"), h = e("jskype-constants"), p = e("swx-constants"), d = e("lodash-compat"), v = h.DATA.storageKeys, m = c.PEOPLE.authorizationStates, g = function () {
      function e() {
        var e = this;
        this.registry = u.build();
        this.handleFirstResponseData = d.once(this.updateGlobalPersonsState.bind(this));
        this.process = function (t, n) {
          var r = e.getUpdatedPersonsCollection(t);
          return e.handleFirstResponseData(r), n ? e.updateContactsCache(r) : Promise.resolve();
        };
      }
      return e.prototype.getUpdatedPersonsCollection = function (e) {
        var t = d.reduce(e.contacts, function (e, t) {
          return t.deleted ? (i.build().removeContact(l.getId(t.mri)), e) : e.concat(t);
        }, []);
        return t.length > 0 && (o.build().add(t), e.scope === p.PEOPLE.scopes.FULL && i.build().filter(t)), n.get().personsAndGroupsManager.all.persons();
      }, e.prototype.updateContactsCache = function (e) {
        var t = e.map(a.mapPersonToCacheData);
        return r.get().setSensitiveItem(v.CONTACT_PROFILES, t);
      }, e.prototype.updateGlobalPersonsState = function (e) {
        this.registry.defaultPersonAuthorization = m.UNAUTHORIZED;
        s.build().process(this.registry.toArray());
        f.get().publish("contacts:loaded", e.filter(function (e) {
          return e._authorization() === m.AUTHORIZED && !e.isBlocked();
        }));
        n.get().personsAndGroupsManager._initialized(!0);
      }, e;
    }();
  t.ContactListDataProcessor = g;
  t.build = y;
}));

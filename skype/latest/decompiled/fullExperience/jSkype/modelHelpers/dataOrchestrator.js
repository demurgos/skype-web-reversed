define("jSkype/modelHelpers/dataOrchestrator", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "constants/common",
  "utils/common/cache/instance",
  "jSkype/constants/data",
  "jSkype/modelHelpers/contacts/notificationHandlers",
  "jSkype/modelHelpers/account/notificationHandlers",
  "jSkype/modelHelpers/presence/presenceDataEvents",
  "jSkype/modelHelpers/presence/presenceDataStorage",
  "jSkype/modelHelpers/personsAndGroupsHelper",
  "jSkype/settings",
  "jSkype/modelHelpers/contacts/dataProcessors/agents",
  "jSkype/client"
], function (e, t) {
  function d() {
    return p.get().personsAndGroupsManager.all.persons.get();
  }
  function v() {
    return i.get().removeItem(s.ETAG);
  }
  function m() {
    function e(e, t) {
      var n = l.createPersonFromRawData(t);
      return t.isAgent && e.push(n), e;
    }
    return i.get().getSensitiveItem(s.CONTACT_PROFILES).then(function (t) {
      var r;
      if (!t || !t.length)
        throw new Error("Empty contact cache; force service delta reset");
      return r = n.reduce(t, e, []), h.build().process(r);
    });
  }
  function g() {
    return f.restoreData();
  }
  var n = e("lodash-compat"), r = e("constants/common"), i = e("utils/common/cache/instance"), s = e("jSkype/constants/data").storageKeys, o = e("jSkype/modelHelpers/contacts/notificationHandlers"), u = e("jSkype/modelHelpers/account/notificationHandlers"), a = e("jSkype/modelHelpers/presence/presenceDataEvents"), f = e("jSkype/modelHelpers/presence/presenceDataStorage"), l = e("jSkype/modelHelpers/personsAndGroupsHelper"), c = e("jSkype/settings"), h = e("jSkype/modelHelpers/contacts/dataProcessors/agents"), p = e("jSkype/client");
  t.initialize = function () {
    return p.get().personsAndGroupsManager.mePerson.id.get().then(function () {
      return o.build(), u.build(), a.init(), p.get().conversationsManager._init(), c.isFeatureOn(r.featureFlags.CONTACT_PROFILE_CACHE) ? m().then(function () {
        return g().then(d, d);
      }, function () {
        return v().then(d, d).then(g, g);
      }) : g().then(d, d);
    });
  };
})

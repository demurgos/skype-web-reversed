define("jSkype/modelHelpers/contacts/contactAdder", [
  "require",
  "lodash-compat",
  "jSkype/modelHelpers/contacts/dataMappers/factory",
  "jSkype/modelHelpers/personsAndGroupsHelper",
  "jSkype/settings",
  "constants/common",
  "jSkype/modelHelpers/presence/presenceDataStorage",
  "jSkype/modelHelpers/contacts/dataMappers/dataMaps",
  "jSkype/modelHelpers/contacts/dataProcessors/agents"
], function (e) {
  function f(e, n) {
    function o(t) {
      var n = r.getPersonById(t.id);
      return n ? e.map(t, n, !1) : (n = r.getPerson(t.id), e.map(t, n, !0)), n;
    }
    function f(e, t) {
      if (l(t)) {
        var n = o(t);
        t.type === u.contactTypeNames.agent && e.push(n);
      }
      return e;
    }
    function l(e) {
      return r.isMePerson(e.id) ? !1 : e.type === u.contactTypeNames.pstn && !i.isFeatureOn(s.featureFlags.PSTN_ENABLED) ? !1 : e.type === u.contactTypeNames.agent && !i.isFeatureOn(s.featureFlags.AGENTS_ENABLED) ? !1 : !0;
    }
    function c(e) {
      n.set(e.id(), { status: e.status() });
    }
    this.add = function (e) {
      var n = t.reduce(e, f, []);
      return t.forEach(n, c), a.build().process(n);
    };
  }
  var t = e("lodash-compat"), n = e("jSkype/modelHelpers/contacts/dataMappers/factory"), r = e("jSkype/modelHelpers/personsAndGroupsHelper"), i = e("jSkype/settings"), s = e("constants/common"), o = e("jSkype/modelHelpers/presence/presenceDataStorage"), u = e("jSkype/modelHelpers/contacts/dataMappers/dataMaps"), a = e("jSkype/modelHelpers/contacts/dataProcessors/agents");
  return {
    build: function () {
      var e = n.getContactMapper(), t = o.getCache();
      return new f(e, t);
    }
  };
})

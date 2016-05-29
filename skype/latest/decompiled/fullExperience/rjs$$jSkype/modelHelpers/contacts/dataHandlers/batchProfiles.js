define("jSkype/modelHelpers/contacts/dataHandlers/batchProfiles", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "constants/common",
  "jSkype/settings",
  "jSkype/modelHelpers/propertyModelHelper",
  "jSkype/modelHelpers/personsAndGroupsHelper",
  "jSkype/modelHelpers/contacts/dataMappers/factory",
  "jSkype/client"
], function (e, t) {
  function f(e) {
    function u(t) {
      var n = o.getPerson(t.username);
      n && e.map(t, n);
    }
    function f(e) {
      var t = a.get()._telemetryManager, n = e && e.response ? e.response.length : 0, s = r.telemetry.contacts.type.CONTACTS, o = {
          name: r.telemetry.contacts.name.GET_PROFILES,
          batchCount: n
        };
      t.sendEvent(i.settings.telemetry.jSkypeTenantToken, s, o);
    }
    var t = n.once(f);
    this.onSuccess = function (e) {
      var n = e && e.response ? e.response : [];
      return n.forEach(u), t(e), s.createResolvedPromise();
    };
    this.onError = function (e) {
      return s.createRejectedPromise(e);
    };
  }
  var n = e("lodash-compat"), r = e("constants/common"), i = e("jSkype/settings"), s = e("jSkype/modelHelpers/propertyModelHelper"), o = e("jSkype/modelHelpers/personsAndGroupsHelper"), u = e("jSkype/modelHelpers/contacts/dataMappers/factory"), a = e("jSkype/client");
  t.build = function () {
    var e = u.getProfileMapper();
    return new f(e);
  };
});

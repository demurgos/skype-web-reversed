define("jSkype/modelHelpers/contacts/dataHandlers/meProfile", [
  "require",
  "exports",
  "module",
  "jSkype/client",
  "constants/common",
  "jSkype/settings",
  "jSkype/modelHelpers/propertyModelHelper",
  "jSkype/modelHelpers/contacts/dataMappers/factory"
], function (e, t) {
  function u(e) {
    this.onSuccess = function (t) {
      return e.map(t.response, n.get().personsAndGroupsManager.mePerson), a(), s.createResolvedPromise();
    }, this.onError = function (e) {
      return s.createRejectedPromise(e);
    };
  }
  function a() {
    var e = n.get()._telemetryManager, t = {
        name: r.telemetry.contacts.name.GET_PROFILES,
        batchCount: 1
      };
    e.sendEvent(i.settings.telemetry.jSkypeTenantToken, r.telemetry.contacts.type.CONTACTS, t);
  }
  var n = e("jSkype/client"), r = e("constants/common"), i = e("jSkype/settings"), s = e("jSkype/modelHelpers/propertyModelHelper"), o = e("jSkype/modelHelpers/contacts/dataMappers/factory");
  t.build = function () {
    var e = o.getProfileMapper();
    return new u(e);
  };
})

define("jSkype/modelHelpers/contacts/dataHandlers/contactDeleted", [
  "require",
  "exports",
  "module",
  "jSkype/modelHelpers/contacts/authorizationChange",
  "jSkype/constants/people",
  "jSkype/client",
  "jSkype/settings",
  "constants/common",
  "jSkype/modelHelpers/presence/presenceDataStorage"
], function (e, t) {
  function a() {
    this.onSuccess = function (e) {
      u.getCache().remove(e.id());
      n.setAuthorization(e, r.UNAUTHORIZED);
      f();
    };
    this.onError = function (e) {
    };
  }
  function f() {
    var e = { name: o.telemetry.contacts.name.CONTACT_DELETED };
    i.get()._telemetryManager.sendEvent(s.settings.telemetry.jSkypeTenantToken, o.telemetry.contacts.type.CONTACTS, e);
  }
  var n = e("jSkype/modelHelpers/contacts/authorizationChange"), r = e("jSkype/constants/people").authorizationStates, i = e("jSkype/client"), s = e("jSkype/settings"), o = e("constants/common"), u = e("jSkype/modelHelpers/presence/presenceDataStorage");
  t.build = function () {
    return new a();
  };
});

define("jSkype/modelHelpers/contacts/dataHandlers/contactUnblocked", [
  "require",
  "exports",
  "module",
  "jSkype/modelHelpers/personsAndGroupsHelper",
  "jSkype/modelHelpers/contacts/authorizationChange",
  "jSkype/client",
  "jSkype/settings",
  "constants/common"
], function (e, t) {
  function u() {
    this.onSuccess = function (e) {
      var t = n.getPerson(e);
      r.setUnblocked(t), a();
    }, this.onError = function (e) {
    };
  }
  function a() {
    var e = { name: o.telemetry.contacts.name.CONTACT_UNBLOCKED };
    i.get()._telemetryManager.sendEvent(s.settings.telemetry.jSkypeTenantToken, o.telemetry.contacts.type.CONTACTS, e);
  }
  var n = e("jSkype/modelHelpers/personsAndGroupsHelper"), r = e("jSkype/modelHelpers/contacts/authorizationChange"), i = e("jSkype/client"), s = e("jSkype/settings"), o = e("constants/common");
  t.build = function () {
    return new u();
  };
})

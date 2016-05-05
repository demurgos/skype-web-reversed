define("jSkype/modelHelpers/contacts/dataHandlers/contactBlocked", [
  "require",
  "exports",
  "module",
  "jSkype/modelHelpers/personsAndGroupsHelper",
  "jSkype/modelHelpers/contacts/authorizationChange",
  "jSkype/client",
  "constants/common",
  "jSkype/settings"
], function (e, t) {
  function u() {
    this.onSuccess = function (e) {
      var t = n.getPerson(e);
      r.setBlocked(t), a();
    }, this.onError = function (e) {
    };
  }
  function a() {
    var e = { name: s.telemetry.contacts.name.CONTACT_BLOCKED };
    i.get()._telemetryManager.sendEvent(o.settings.telemetry.jSkypeTenantToken, s.telemetry.contacts.type.CONTACTS, e);
  }
  var n = e("jSkype/modelHelpers/personsAndGroupsHelper"), r = e("jSkype/modelHelpers/contacts/authorizationChange"), i = e("jSkype/client"), s = e("constants/common"), o = e("jSkype/settings");
  t.build = function () {
    return new u();
  };
})

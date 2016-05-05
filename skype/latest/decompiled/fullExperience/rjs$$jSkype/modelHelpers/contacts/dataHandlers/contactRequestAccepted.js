define("jSkype/modelHelpers/contacts/dataHandlers/contactRequestAccepted", [
  "require",
  "exports",
  "module",
  "constants/common",
  "jSkype/modelHelpers/contacts/authorizationChange",
  "jSkype/constants/people",
  "jSkype/settings",
  "jSkype/client"
], function (e, t) {
  function u() {
    this.onSuccess = function (e) {
      r.setAuthorization(e, i.AUTHORIZED), a(e);
    }, this.onError = function (e) {
    };
  }
  function a(e) {
    var t = {
      name: n.telemetry.contacts.name.CONTACT_REQUEST_ACCEPTED,
      user_from: [
        e.id(),
        window.skypeTelemetryManager.PIIType.Identity
      ]
    };
    o.get()._telemetryManager.sendEvent(s.settings.telemetry.jSkypeTenantToken, n.telemetry.contacts.type.CONTACT_REQUESTS, t);
  }
  var n = e("constants/common"), r = e("jSkype/modelHelpers/contacts/authorizationChange"), i = e("jSkype/constants/people").authorizationStates, s = e("jSkype/settings"), o = e("jSkype/client");
  t.build = function () {
    return new u();
  };
})

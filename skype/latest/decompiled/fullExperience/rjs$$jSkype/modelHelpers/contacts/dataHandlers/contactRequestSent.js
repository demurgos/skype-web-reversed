define("jSkype/modelHelpers/contacts/dataHandlers/contactRequestSent", [
  "require",
  "exports",
  "module",
  "jSkype/client",
  "jSkype/modelHelpers/contacts/authorizationChange",
  "jSkype/constants/people",
  "jSkype/settings",
  "constants/common",
  "jSkype/modelHelpers/contacts/contactMessageFactory"
], function (e, t) {
  function a() {
    this.onSuccess = function (e) {
      var t, a = n.get().conversationsManager.getConversation(e), f = { name: o.telemetry.contacts.name.ADD_CONTACT };
      if (e.isAgent())
        r.setAuthorization(e, i.AUTHORIZED), f.isResend = !1, f.suggested = !1, f.isAgent = !0;
      else if (e._authorization() === i.PENDING_OUTGOING)
        t = u.getOutgoingResend(e), a.historyService._processRawMessage(t), f.isResend = !0, f.suggested = !1, f.isAgent = !1;
      else {
        var l = e._authorization() === i.SUGGESTED;
        r.setAuthorization(e, i.PENDING_OUTGOING);
        f.isResend = !1;
        f.suggested = l;
        f.isAgent = !1;
      }
      n.get()._telemetryManager.sendEvent(s.settings.telemetry.jSkypeTenantToken, o.telemetry.contacts.type.CONTACT_REQUESTS, f);
    };
    this.onError = function (e, t) {
      t && t.isAgent() && n.get()._telemetryManager.sendEvent(s.settings.telemetry.jSkypeTenantToken, "ServiceFault", {
        serviceName: "agents-addToContacts",
        faultCode: e.status,
        faultContext: o.telemetry.NOT_AVAILABLE,
        errorCode: e.status || o.telemetry.NOT_AVAILABLE,
        errorMessage: e.responseText || o.telemetry.NOT_AVAILABLE,
        verb: "PUT",
        host: s.settings.agentProvisioningService.host
      });
    };
  }
  var n = e("jSkype/client"), r = e("jSkype/modelHelpers/contacts/authorizationChange"), i = e("jSkype/constants/people").authorizationStates, s = e("jSkype/settings"), o = e("constants/common"), u = e("jSkype/modelHelpers/contacts/contactMessageFactory");
  t.build = function () {
    return new a();
  };
});

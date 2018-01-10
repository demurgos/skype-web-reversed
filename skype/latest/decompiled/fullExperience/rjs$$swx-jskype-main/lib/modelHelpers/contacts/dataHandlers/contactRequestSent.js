(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataHandlers/contactRequestSent", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "../../../modelHelpers/contacts/authorizationChange",
      "../../../modelHelpers/contacts/contactMessageFactory",
      "jskype-settings-instance",
      "jskype-constants",
      "swx-constants",
      "swx-mri"
    ], e);
}(function (e, t) {
  function c() {
    return new l();
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("../../../modelHelpers/contacts/authorizationChange"), i = e("../../../modelHelpers/contacts/contactMessageFactory"), s = e("jskype-settings-instance"), o = e("jskype-constants"), u = e("swx-constants"), a = e("swx-mri"), f = o.PEOPLE.authorizationStates, l = function () {
      function e() {
      }
      return e.prototype.onSuccess = function (e) {
        var t = n.get().conversationsManager.getConversation(e);
        if (e.isAgent() || a.isPstnId(e.id()))
          r.setAuthorization(e, f.AUTHORIZED);
        else if (e._authorization() === f.PENDING_OUTGOING) {
          var s = i.getOutgoingResend(e);
          t.historyService._processRawMessage(s);
        } else
          r.setAuthorization(e, f.PENDING_OUTGOING);
      }, e.prototype.onError = function (e, t) {
        t && t.isAgent() && n.get()._telemetryManager.sendEvent(s.settings.telemetry.jSkypeTenantToken, "ServiceFault", {
          serviceName: "agents-addToContacts",
          faultCode: e.status,
          faultContext: u.COMMON.telemetry.NOT_AVAILABLE,
          errorCode: e.status || u.COMMON.telemetry.NOT_AVAILABLE,
          errorMessage: e.responseText || u.COMMON.telemetry.NOT_AVAILABLE,
          verb: "PUT",
          host: s.settings.agentProvisioningService.host,
          contextId: u.COMMON.telemetry.NOT_AVAILABLE
        });
      }, e;
    }();
  t.ContactRequestSentHandlers = l;
  t.build = c;
}));

define("jSkype/modelHelpers/contacts/notificationHandlers", [
  "require",
  "exports",
  "module",
  "jSkype/client",
  "jSkype/services/serviceFactory",
  "jSkype/services/trouter/trouter",
  "jSkype/services/trouter/handlers/contactChangesMessageHandler",
  "jSkype/modelHelpers/contacts/incomingContactRequestsHelper",
  "jSkype/modelHelpers/contacts/dataHandlers/factory",
  "jSkype/services/contacts/serviceSettings"
], function (e, t) {
  function f() {
    var e = u.getContactListHandlers();
    this.onContactListChangedNotification = function () {
      var t = n.get().personsAndGroupsManager.mePerson.id();
      r.getContactsService().getMyContacts(t, a.reasons.notification).then(e.onSuccess, e.onError);
    };
    this.onIncomingContactRequestNotification = o.get;
  }
  var n = e("jSkype/client"), r = e("jSkype/services/serviceFactory"), i = e("jSkype/services/trouter/trouter"), s = e("jSkype/services/trouter/handlers/contactChangesMessageHandler"), o = e("jSkype/modelHelpers/contacts/incomingContactRequestsHelper"), u = e("jSkype/modelHelpers/contacts/dataHandlers/factory"), a = e("jSkype/services/contacts/serviceSettings");
  t.build = function () {
    var e = new f();
    return i.registerMessageHandler(s.build(e)), e;
  };
});

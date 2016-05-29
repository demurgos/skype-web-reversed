define("jSkype/modelHelpers/contacts/incomingContactRequestsHelper", [
  "require",
  "exports",
  "module",
  "jSkype/modelHelpers/contacts/dataHandlers/factory",
  "jSkype/services/serviceFactory",
  "jSkype/modelHelpers/personHelper",
  "jSkype/client",
  "jSkype/modelHelpers/propertyModelHelper"
], function (e, t) {
  var n = e("jSkype/modelHelpers/contacts/dataHandlers/factory"), r = e("jSkype/services/serviceFactory"), i = e("jSkype/modelHelpers/personHelper"), s = e("jSkype/client"), o = e("jSkype/modelHelpers/propertyModelHelper");
  t.get = function () {
    var e;
    return i.isGuest(s.get().personsAndGroupsManager.mePerson) ? o.createResolvedPromise() : (e = n.getContactRequestsIncomingHandlers(), r.getStratusService().getIncomingContactRequests().then(e.onSuccess, e.onError));
  };
});

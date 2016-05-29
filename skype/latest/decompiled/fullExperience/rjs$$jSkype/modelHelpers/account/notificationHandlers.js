define("jSkype/modelHelpers/account/notificationHandlers", [
  "require",
  "exports",
  "module",
  "jSkype/client",
  "jSkype/settings",
  "jSkype/constants/featureFlags",
  "jSkype/services/serviceFactory",
  "jSkype/services/trouter/trouter",
  "jSkype/services/trouter/handlers/accountChangesMessageHandler",
  "jSkype/modelHelpers/account/dataHandlers/factory"
], function (e, t) {
  function f() {
    function t() {
      return r.isFeatureOn(i.CREDIT_BALANCE_AUTO_UPDATE_ENABLED);
    }
    var e = a.getAccountChangedHandler();
    this.onUserServicesChange = function () {
      if (!t())
        return;
      var r = n.get().personsAndGroupsManager.mePerson.id();
      s.getEntitlementService().getEntitlementListingData(r).then(e.onSuccess, e.onError);
    };
  }
  var n = e("jSkype/client"), r = e("jSkype/settings"), i = e("jSkype/constants/featureFlags"), s = e("jSkype/services/serviceFactory"), o = e("jSkype/services/trouter/trouter"), u = e("jSkype/services/trouter/handlers/accountChangesMessageHandler"), a = e("jSkype/modelHelpers/account/dataHandlers/factory");
  t.build = function () {
    var e = new f();
    return o.registerMessageHandler(u.build(e)), e;
  };
});

define("jSkype/modelHelpers/account/dataHandlers/account", [
  "require",
  "exports",
  "module",
  "jSkype/client",
  "jSkype/services/entitlement/serviceSettings"
], function (e, t) {
  function i() {
    function t(t) {
      i(t) && (e.displayBalance._set(t.balanceFormatted), e._balance._set(t.balance), e._currency._set(t.attributes.currency));
    }
    function i(e) {
      return e.service === r.serviceNames.credit;
    }
    var e = n.get().personsAndGroupsManager.mePerson.account;
    this.onSuccess = function (e) {
      return e.response.forEach(t), Promise.resolve();
    }, this.onError = function (e) {
      return Promise.reject(e);
    };
  }
  var n = e("jSkype/client"), r = e("jSkype/services/entitlement/serviceSettings");
  t.classFunction = i, t.build = function () {
    return new i();
  };
})

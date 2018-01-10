(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/account/dataHandlers/account", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "../../../services/entitlement/serviceSettings"
    ], e);
}(function (e, t) {
  function s() {
    return new i();
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("../../../services/entitlement/serviceSettings"), i = function () {
      function e() {
        var e = this;
        this.account = n.get().personsAndGroupsManager.mePerson.account;
        this.onSuccess = function (t) {
          return t.response.forEach(e.updateCreditBalance.bind(e)), Promise.resolve();
        };
      }
      return e.prototype.updateCreditBalance = function (e) {
        this.isCredit(e) && (this.account.displayBalance._set(e.balanceFormatted), this.account._balance._set(e.balance), this.account._currency._set(e.attributes.currency));
      }, e.prototype.isCredit = function (e) {
        return e.service === r.serviceNames.credit;
      }, e.prototype.onError = function (e) {
        return Promise.reject(e);
      }, e;
    }();
  t.AccountDataHandler = i;
  t.build = s;
}));

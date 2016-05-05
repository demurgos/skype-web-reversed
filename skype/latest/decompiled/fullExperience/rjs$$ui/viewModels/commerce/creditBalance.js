define("ui/viewModels/commerce/creditBalance", [
  "require",
  "exports",
  "module",
  "utils/common/cafeObservable",
  "cafe/applicationInstance",
  "experience/settings",
  "telemetry/calling/pstn/pstn",
  "constants/common"
], function (e, t) {
  function u() {
    var e = this, t = r.get().personsAndGroupsManager.mePerson.account;
    e.displayBalance = n.newObservableProperty(t.displayBalance, { keepAlive: !0 }), e.purchaseCreditUrl = i.commerce.purchaseCreditUrl, e.addCreditTelemetry = function () {
      return s.addingCredit(o.entryPoint.SKYPE_OUT_PAGE), !0;
    };
  }
  var n = e("utils/common/cafeObservable"), r = e("cafe/applicationInstance"), i = e("experience/settings"), s = e("telemetry/calling/pstn/pstn"), o = e("constants/common").telemetry.pstn;
  u.prototype.dispose = function () {
    this.displayBalance.dispose();
  }, t.classFunction = u, t.build = function () {
    return new u();
  };
})

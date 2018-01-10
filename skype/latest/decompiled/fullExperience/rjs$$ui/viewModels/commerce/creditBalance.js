define("ui/viewModels/commerce/creditBalance", [
  "require",
  "exports",
  "module",
  "utils/common/cafeObservable",
  "swx-cafe-application-instance",
  "experience/settings",
  "telemetry/calling/pstn/pstn",
  "swx-constants"
], function (e, t) {
  function u() {
    var e = this, t = r.get().personsAndGroupsManager.mePerson.account;
    e.displayBalance = n.newObservableProperty(t.displayBalance, { keepAlive: !0 });
    e.purchaseCreditUrl = i.commerce.purchaseCreditUrl;
    e.addCreditTelemetry = function () {
      return s.addingCredit(o.entryPoint.SKYPE_OUT_PAGE), !0;
    };
  }
  var n = e("utils/common/cafeObservable"), r = e("swx-cafe-application-instance"), i = e("experience/settings"), s = e("telemetry/calling/pstn/pstn"), o = e("swx-constants").COMMON.telemetry.pstn;
  u.prototype.dispose = function () {
    this.displayBalance.dispose();
  };
  t.classFunction = u;
  t.build = function () {
    return new u();
  };
});

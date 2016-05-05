define("telemetry/calling/pstn/pstn", [
  "require",
  "experience/settings",
  "ui/telemetry/telemetryClient",
  "constants/common"
], function (e) {
  function i() {
    function e(e, r) {
      var i = { Entry_Point: r };
      n.get().sendEvent(t.telemetry.uiTenantToken, e, i);
    }
    function i(e, r) {
      var i = { Credit_Update_Duration_Seconds: r };
      n.get().sendEvent(t.telemetry.uiTenantToken, e, i);
    }
    this.initiatingPSTNCall = function (t) {
      e(r.eventName.PSTN_CALL_INITIATED, t);
    }, this.addingSubscription = function (t) {
      e(r.eventName.ADD_SUBSCRIPTION, t);
    }, this.addingCredit = function (t) {
      e(r.eventName.ADD_CREDIT, t);
    }, this.updatingCreditBalance = function (e) {
      i(r.eventName.CREDIT_BALANCE_UPDATE_CALL_END, e);
    };
  }
  var t = e("experience/settings"), n = e("ui/telemetry/telemetryClient"), r = e("constants/common").telemetry.pstn;
  return new i();
})

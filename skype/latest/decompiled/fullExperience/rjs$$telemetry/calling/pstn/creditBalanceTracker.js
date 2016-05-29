define("telemetry/calling/pstn/creditBalanceTracker", [
  "require",
  "exports",
  "module",
  "cafe/applicationInstance",
  "ui/modelHelpers/conversationHelper",
  "telemetry/calling/pstn/pstn",
  "browser/detect"
], function (e, t) {
  function o() {
    function u() {
      var e = new Date().getTime();
      if (o) {
        var t = e - o;
        i.updatingCreditBalance(t / 1000);
        o = null;
      }
    }
    var e = this, t, o;
    e.init = function () {
      var e = n.get().personsAndGroupsManager.mePerson.account;
      e && e.displayBalance && e.displayBalance.changed(u);
    };
    e.callConnected = function (e) {
      !s.getBrowserInfo().isShellApp && r.isConversationWithPstn(e) && (t = !0);
    };
    e.callEnded = function (e) {
      t === !0 && r.isConversationWithPstn(e) && (o = new Date().getTime(), t = !1);
    };
  }
  var n = e("cafe/applicationInstance"), r = e("ui/modelHelpers/conversationHelper"), i = e("telemetry/calling/pstn/pstn"), s = e("browser/detect");
  t.build = function () {
    return new o();
  };
});

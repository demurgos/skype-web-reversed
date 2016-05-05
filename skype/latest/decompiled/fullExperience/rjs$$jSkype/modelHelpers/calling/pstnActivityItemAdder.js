define("jSkype/modelHelpers/calling/pstnActivityItemAdder", [
  "require",
  "swx-enums",
  "jSkype/modelHelpers/calling/pstnMessageFactory"
], function (e) {
  function r() {
    function e(e, r, i) {
      var s;
      switch (i) {
      case t.callDisconnectionReason.InsufficientFunds:
        s = n.getInsuficientFundsMessage(e.isGroupConversation(), r);
        break;
      case t.callDisconnectionReason.InvalidNumber:
        s = n.getInvalidNumberMessage(e.isGroupConversation(), r);
        break;
      case t.callDisconnectionReason.EmergencyCallDenied:
      case t.callDisconnectionReason.ForbiddenNumber:
      case t.callDisconnectionReason.Refused:
        s = n.getForbiddenNumberMessage(e.isGroupConversation(), r);
      }
      s && e.historyService._processRawMessage(s);
    }
    function r(e) {
      return e.participants.size() === 1 && i(e.participants()[0].audio.endpoint());
    }
    function i(e) {
      return /^(\+)?\d+$/.test(e);
    }
    this.process = function (t, n, i) {
      t.isGroupConversation() ? e(t, n, i) : r(t) && e(t, n, i);
    };
  }
  var t = e("swx-enums"), n = e("jSkype/modelHelpers/calling/pstnMessageFactory");
  return r;
})

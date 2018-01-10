(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/calling/pstnActivityItemAdder", [
      "require",
      "exports",
      "swx-enums",
      "./pstnMessageFactory"
    ], e);
}(function (e, t) {
  function s() {
    return new i();
  }
  var n = e("swx-enums"), r = e("./pstnMessageFactory"), i = function () {
      function e() {
      }
      return e.prototype.process = function (e, t, r, i) {
        i === n.callConnectionState.Disconnected && (e.isGroupConversation() || this.isPstnOnlyConversation(e)) && this.addActivityItem(e, t, r);
      }, e.prototype.addActivityItem = function (e, t, i) {
        var s;
        switch (i) {
        case n.callDisconnectionReason.InsufficientFunds:
          s = r.getInsuficientFundsMessage(e.isGroupConversation(), t);
          break;
        case n.callDisconnectionReason.InvalidNumber:
          s = r.getInvalidNumberMessage(e.isGroupConversation(), t);
          break;
        case n.callDisconnectionReason.EmergencyCallDenied:
        case n.callDisconnectionReason.ForbiddenNumber:
        case n.callDisconnectionReason.Refused:
          s = r.getForbiddenNumberMessage(e.isGroupConversation(), t);
        }
        s && e.historyService._processRawMessage(s);
      }, e.prototype.isPstnOnlyConversation = function (e) {
        return e.participants.size() === 1 && this.isPstnEndpoint(e.participants()[0].audio.endpoint());
      }, e.prototype.isPstnEndpoint = function (e) {
        return /^(\+)?\d+$/.test(e);
      }, e;
    }();
  t.build = s;
}));

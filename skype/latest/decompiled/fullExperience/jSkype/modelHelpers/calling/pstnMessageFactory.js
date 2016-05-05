define("jSkype/modelHelpers/calling/pstnMessageFactory", [
  "require",
  "exports",
  "module",
  "swx-enums",
  "utils/chat/dateTime"
], function (e, t) {
  function i(e, t, n) {
    var i = r.getDate();
    return {
      id: +i,
      timestamp: i,
      pstnEventType: e,
      isGroup: t,
      participantName: n.person.displayName(),
      participantEndpoint: n.audio.endpoint(),
      isOutgoing: !0
    };
  }
  var n = e("swx-enums").activityType, r = e("utils/chat/dateTime");
  t.getInsuficientFundsMessage = function (e, t) {
    return i(n.PstnInsufficientFunds, e, t);
  }, t.getInvalidNumberMessage = function (e, t) {
    return i(n.PstnInvalidNumber, e, t);
  }, t.getForbiddenNumberMessage = function (e, t) {
    return i(n.PstnForbiddenNumber, e, t);
  };
})

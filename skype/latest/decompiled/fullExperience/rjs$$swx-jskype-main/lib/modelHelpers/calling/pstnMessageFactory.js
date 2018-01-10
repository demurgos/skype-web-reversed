(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/calling/pstnMessageFactory", [
      "require",
      "exports",
      "swx-enums",
      "swx-utils-chat"
    ], e);
}(function (e, t) {
  function i(e, t) {
    return u(n.activityType.PstnInsufficientFunds, e, t);
  }
  function s(e, t) {
    return u(n.activityType.PstnInvalidNumber, e, t);
  }
  function o(e, t) {
    return u(n.activityType.PstnForbiddenNumber, e, t);
  }
  function u(e, t, n) {
    var i = r.dateTime.getDate();
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
  var n = e("swx-enums"), r = e("swx-utils-chat");
  t.getInsuficientFundsMessage = i;
  t.getInvalidNumberMessage = s;
  t.getForbiddenNumberMessage = o;
}));

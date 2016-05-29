define("jSkype/services/trouter/handlers/stopRingingMessageHandler", [
  "require",
  "exports",
  "module",
  "jSkype/services/callRegister",
  "jSkype/services/callController",
  "constants/common",
  "constants/common"
], function (e, t) {
  function o() {
    this.handleMessage = function (e) {
      if (e.eventId !== i.INCOMING_STOP_RINGER && e.eventId !== i.INCOMING_SKYPE_NGC_STOP_RINGER)
        return { isHandled: !1 };
      if (!e.body.callId)
        return { isHandled: !1 };
      var t = n.get().getConversationByCallId(e.body.callId);
      return t && r.cancelCall(t), {
        isHandled: !0,
        resultCode: s.OK
      };
    };
  }
  var n = e("jSkype/services/callRegister"), r = e("jSkype/services/callController"), i = e("constants/common").events.trouter, s = e("constants/common").httpStatusCodes;
  t.build = function () {
    return new o();
  };
});

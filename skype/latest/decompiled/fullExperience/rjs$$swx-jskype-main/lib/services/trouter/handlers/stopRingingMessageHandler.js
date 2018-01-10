(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/trouter/handlers/stopRingingMessageHandler", [
      "require",
      "exports",
      "../../../../lib/services/callRegister",
      "../../../../lib/services/callController",
      "swx-constants"
    ], e);
}(function (e, t) {
  function a() {
    return new u();
  }
  var n = e("../../../../lib/services/callRegister"), r = e("../../../../lib/services/callController"), i = e("swx-constants"), s = i.COMMON.events.trouter, o = i.COMMON.httpStatusCodes, u = function () {
      function e() {
      }
      return e.prototype.handleMessage = function (e) {
        if (e.eventId !== s.INCOMING_STOP_RINGER && e.eventId !== s.INCOMING_SKYPE_NGC_STOP_RINGER)
          return { isHandled: !1 };
        if (!e.body.callId)
          return { isHandled: !1 };
        var t = n.get().getConversationByCallId(e.body.callId);
        return t && r.cancelCall(t), {
          isHandled: !0,
          resultCode: o.OK
        };
      }, e;
    }();
  t.MessageHandler = u;
  t.build = a;
}));

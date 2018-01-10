(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/trouter/handlers/messageHandlerUtilities", [
      "require",
      "exports",
      "swx-constants"
    ], e);
}(function (e, t) {
  function i(e) {
    return e.eventId ? e.eventId : e.body && e.body.eventId;
  }
  var n = e("swx-constants"), r = n.COMMON.httpStatusCodes;
  t.HANDLER_RESULT_STATUS_UNHANDLED = { isHandled: !1 };
  t.HANDLER_RESULT_STATUS_OK = {
    isHandled: !0,
    resultCode: r.OK
  };
  t.getEventId = i;
}));

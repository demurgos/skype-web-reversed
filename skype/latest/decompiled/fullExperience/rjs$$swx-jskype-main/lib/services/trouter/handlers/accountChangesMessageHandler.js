(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/trouter/handlers/accountChangesMessageHandler", [
      "require",
      "exports",
      "swx-constants",
      "./messageHandlerUtilities"
    ], e);
}(function (e, t) {
  function s(e) {
    function t(t) {
      var n = r.getEventId(t);
      return n === i.USER_SERVICES_CHANGE ? (e.onUserServicesChange(t.body), r.HANDLER_RESULT_STATUS_OK) : r.HANDLER_RESULT_STATUS_UNHANDLED;
    }
    return { handleMessage: t };
  }
  var n = e("swx-constants"), r = e("./messageHandlerUtilities"), i = n.COMMON.events.trouter;
  t.build = s;
}));

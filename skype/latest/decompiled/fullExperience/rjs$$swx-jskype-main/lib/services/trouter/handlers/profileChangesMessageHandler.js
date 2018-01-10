(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/trouter/handlers/profileChangesMessageHandler", [
      "require",
      "exports",
      "swx-constants",
      "./messageHandlerUtilities"
    ], e);
}(function (e, t) {
  function s(e) {
    function t(t) {
      var n = r.getEventId(t);
      switch (n) {
      case i.USER_PROFILE_CHANGE:
        return e.onUserProfileChangeNotification(t.body), r.HANDLER_RESULT_STATUS_OK;
      case i.USER_AVATAR_CHANGE:
        return e.onUserAvatarChangeNotification(t.body), r.HANDLER_RESULT_STATUS_OK;
      default:
        return r.HANDLER_RESULT_STATUS_UNHANDLED;
      }
    }
    return { handleMessage: t };
  }
  var n = e("swx-constants"), r = e("./messageHandlerUtilities"), i = n.COMMON.events.trouter;
  t.build = s;
}));

define("jSkype/services/NGCCallAgent/NGCCallAgent/incomingNotificationMessageHandler", [
  "require",
  "jSkype/services/NGCCallAgent/NGCCallAgent/constants"
], function (e) {
  function n(e) {
    this.handleMessage = function (n) {
      if (!r(n))
        return { isHandled: !1 };
      if (n.url.search(new RegExp("/" + t.URL_BASE.CALLAGENT + "/", "i")) > -1) {
        var i = e.handleIncomingNotification(n);
        return {
          isHandled: !0,
          resultCode: i
        };
      }
      return { isHandled: !1 };
    };
  }
  function r(e) {
    return !e.eventId;
  }
  var t = e("jSkype/services/NGCCallAgent/NGCCallAgent/constants");
  return n;
});

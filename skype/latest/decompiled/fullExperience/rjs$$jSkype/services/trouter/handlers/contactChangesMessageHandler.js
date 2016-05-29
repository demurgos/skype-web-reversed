define("jSkype/services/trouter/handlers/contactChangesMessageHandler", [
  "require",
  "exports",
  "module",
  "constants/common"
], function (e, t) {
  function s(e) {
    this.handleMessage = function (t) {
      var n = {
        isHandled: !0,
        resultCode: i.OK
      };
      switch (t.eventId) {
      case r.OFFLINE_AUTHREQUEST:
        return e.onIncomingContactRequestNotification(t.body), n;
      case r.CONTACTLIST_CHANGE:
        return e.onContactListChangedNotification(t.body), n;
      }
      return { isHandled: !1 };
    };
  }
  var n = e("constants/common"), r = n.events.trouter, i = n.httpStatusCodes;
  t.build = function (e) {
    return new s(e);
  };
});

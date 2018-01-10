(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/trouter/handlers/contactChangesMessageHandler", [
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
      case i.CONTACTLIST_CHANGE:
        return e.onContactListChangedNotification(t.body), r.HANDLER_RESULT_STATUS_OK;
      case i.INCOMING_CONTACT_INVITE:
        return e.onIncomingContactInviteNotification(t.body), r.HANDLER_RESULT_STATUS_OK;
      case i.OUTGOING_CONTACT_INVITE_ACCEPTED:
        return e.onOutgoingContactInviteAcceptedNotification(t.body), r.HANDLER_RESULT_STATUS_OK;
      case i.CONTACT_INVITES_LIST_CHANGE:
        return e.onIncomingInvitesListChangedNotification(t.body), r.HANDLER_RESULT_STATUS_OK;
      }
      return r.HANDLER_RESULT_STATUS_UNHANDLED;
    }
    return { handleMessage: t };
  }
  var n = e("swx-constants"), r = e("./messageHandlerUtilities"), i = n.COMMON.events.trouter;
  t.build = s;
}));

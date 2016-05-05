define("jSkype/modelHelpers/contacts/contactActivityItemHelper", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "swx-enums"
], function (e, t) {
  function s(e) {
    return e.type() === r.activityType.ContactRequestIncoming;
  }
  function o(e) {
    return e.type() === r.activityType.ContactRequestIncomingInviteFree;
  }
  function u(e) {
    return i.indexOf(e.type()) !== -1;
  }
  function a(e) {
    return e.type() === r.activityType.UnblockContact;
  }
  var n = e("lodash-compat"), r = e("swx-enums"), i = [
      r.activityType.ContactRequestOutgoingResend,
      r.activityType.ContactRequestOutgoing,
      r.activityType.ContactRequestOutgoingAgent,
      r.activityType.ContactRequestIncoming,
      r.activityType.ContactRequestIsNowContact,
      r.activityType.SuggestedContact
    ];
  t.filterContactRequestActivityItems = function (e) {
    return e.filter(u);
  }, t.filterUnblockContactActivityItems = function (e) {
    return e.filter(a);
  }, t.clearContactRequestActivityItems = function (e, n) {
    var r = e.historyService, i = t.filterContactRequestActivityItems(r.activityItems()), s = !1;
    return i.forEach(function (e) {
      e.type() !== n ? r._removeMessage(e) : s = !0;
    }), s;
  }, t.clearUnblockContactActivityItems = function (e) {
    var n = e.historyService, r = t.filterUnblockContactActivityItems(n.activityItems());
    r.forEach(function (e) {
      n._removeMessage(e);
    });
  }, t.getContactRequestIncomingActivityItem = function (e) {
    var t = e.historyService.activityItems();
    return n.find(t, s);
  }, t.getContactRequestIncomingInviteFreeActivityItem = function (e) {
    var t = e.historyService.activityItems();
    return n.find(t, o);
  };
})

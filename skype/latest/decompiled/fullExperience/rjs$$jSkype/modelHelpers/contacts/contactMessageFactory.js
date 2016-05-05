define("jSkype/modelHelpers/contacts/contactMessageFactory", [
  "require",
  "exports",
  "module",
  "swx-enums",
  "jSkype/constants/people",
  "jSkype/modelHelpers/contacts/contactActivityItemHelper",
  "jSkype/modelHelpers/personHelper"
], function (e, t) {
  function o(e, t, n, r, i) {
    return r = r || +new Date(), {
      id: +r,
      personId: e.id(),
      timestamp: r,
      contactRequestType: n,
      greeting: i,
      isOutgoing: t
    };
  }
  var n = e("swx-enums").activityType, r = e("jSkype/constants/people").authorizationStates, i = e("jSkype/modelHelpers/contacts/contactActivityItemHelper"), s = e("jSkype/modelHelpers/personHelper");
  t.getOutgoing = function (e, t) {
    return e.isAgent() ? o(e, !0, n.ContactRequestOutgoingAgent, t) : o(e, !0, n.ContactRequestOutgoing, t);
  }, t.getOutgoingResend = function (e, t) {
    return o(e, !0, n.ContactRequestOutgoingResend, t);
  }, t.getIncoming = function (e, t, r) {
    return o(e, !1, n.ContactRequestIncoming, t, r);
  }, t.getIncomingInviteFree = function (e, t) {
    return o(e, !1, n.ContactRequestIncomingInviteFree, t - 1);
  }, t.getIsNowContact = function (e) {
    return o(e, !1, n.ContactRequestIsNowContact);
  }, t.getSuggested = function (e, t) {
    return o(e, !0, n.SuggestedContact, t);
  }, t.getUnblockContact = function (e) {
    return o(e, !0, n.UnblockContact);
  }, t.getActivityItemForInitialConversationLoad = function (e, n) {
    function a() {
      switch (e._authorization()) {
      case r.PENDING_OUTGOING:
        return t.getOutgoingResend(e);
      case r.SUGGESTED:
        return t.getSuggested(e);
      case r.UNAUTHORIZED:
        return t.getOutgoing(e);
      default:
        return;
      }
    }
    var o = i.filterContactRequestActivityItems(n.historyService.activityItems()), u = i.filterUnblockContactActivityItems(n.historyService.activityItems());
    if (!o.length && s.canRequestContactAuthorization(e))
      return a();
    if (!u.length && e.isBlocked())
      return t.getUnblockContact(e);
  };
})

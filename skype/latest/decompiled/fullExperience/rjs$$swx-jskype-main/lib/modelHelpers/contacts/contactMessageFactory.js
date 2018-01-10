(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/contactMessageFactory", [
      "require",
      "exports",
      "swx-enums",
      "jskype-constants",
      "./contactActivityItemHelper",
      "../personHelper"
    ], e);
}(function (e, t) {
  function o(e, t) {
    return e.isAgent() ? d(e, !0, n.activityType.ContactRequestOutgoingAgent, t) : d(e, !0, n.activityType.ContactRequestOutgoing, t);
  }
  function u(e, t) {
    return d(e, !0, n.activityType.ContactRequestOutgoingResend, t);
  }
  function a(e, t, r) {
    return d(e, !1, n.activityType.ContactRequestIncoming, t, r);
  }
  function f(e, t) {
    return d(e, !1, n.activityType.ContactRequestIncomingInviteFree, t - 1);
  }
  function l(e) {
    return d(e, !1, n.activityType.ContactRequestIsNowContact);
  }
  function c(e, t) {
    return d(e, !0, n.activityType.SuggestedContact, t);
  }
  function h(e, t) {
    return d(e, !0, n.activityType.UnblockContact, t);
  }
  function p(e, t) {
    function f() {
      switch (e._authorization()) {
      case r.PEOPLE.authorizationStates.PENDING_OUTGOING:
        return u(e);
      case r.PEOPLE.authorizationStates.SUGGESTED:
        return c(e);
      case r.PEOPLE.authorizationStates.UNAUTHORIZED:
        return o(e);
      default:
        return undefined;
      }
    }
    var n = i.filterContactRequestActivityItems(t.historyService.activityItems()), a = i.filterUnblockContactActivityItems(t.historyService.activityItems());
    return !n.length && s.canRequestContactAuthorization(e) ? f() : !a.length && e.isBlocked() ? h(e) : undefined;
  }
  function d(e, t, n, r, i) {
    return r = +r || +new Date(), {
      id: +r,
      personId: e.id(),
      timestamp: +r,
      contactRequestType: n,
      greeting: i,
      isOutgoing: t
    };
  }
  var n = e("swx-enums"), r = e("jskype-constants"), i = e("./contactActivityItemHelper"), s = e("../personHelper");
  t.getOutgoing = o;
  t.getOutgoingResend = u;
  t.getIncoming = a;
  t.getIncomingInviteFree = f;
  t.getIsNowContact = l;
  t.getSuggested = c;
  t.getUnblockContact = h;
  t.getActivityItemForInitialConversationLoad = p;
}));

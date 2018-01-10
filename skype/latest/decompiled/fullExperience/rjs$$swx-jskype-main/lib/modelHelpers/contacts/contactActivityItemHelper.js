(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/contactActivityItemHelper", [
      "require",
      "exports",
      "lodash-compat",
      "swx-enums"
    ], e);
}(function (e, t) {
  function s(e) {
    return e.filter(p);
  }
  function o(e) {
    return e.filter(d);
  }
  function u(e, t) {
    var n = e.historyService, r = s(n.activityItems()), i = !1;
    return r.forEach(function (e) {
      e.type() !== t ? n._removeMessage(e) : i = !0;
    }), i;
  }
  function a(e) {
    var t = e.historyService, n = o(t.activityItems());
    n.forEach(function (e) {
      t._removeMessage(e);
    });
  }
  function f(e) {
    var t = e.historyService.activityItems();
    return n.find(t, c);
  }
  function l(e) {
    var t = e.historyService.activityItems();
    return n.find(t, h);
  }
  function c(e) {
    return e.type() === r.activityType.ContactRequestIncoming;
  }
  function h(e) {
    return e.type() === r.activityType.ContactRequestIncomingInviteFree;
  }
  function p(e) {
    return i.indexOf(e.type()) !== -1;
  }
  function d(e) {
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
  t.filterContactRequestActivityItems = s;
  t.filterUnblockContactActivityItems = o;
  t.clearContactRequestActivityItems = u;
  t.clearUnblockContactActivityItems = a;
  t.getContactRequestIncomingActivityItem = f;
  t.getContactRequestIncomingInviteFreeActivityItem = l;
}));

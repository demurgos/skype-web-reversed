(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataProcessors/incomingInvite", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "../../../../lib/modelHelpers/contacts/contactActivityItemHelper",
      "../../../../lib/modelHelpers/contacts/contactMessageFactory",
      "../../../../lib/modelHelpers/contacts/inviteMessage",
      "../../../../lib/modelHelpers/contacts/dataMappers/incomingInviteToPerson",
      "../../../../lib/modelHelpers/personsRegistry/instance",
      "swx-mri",
      "swx-utils-chat",
      "jskype-constants",
      "swx-enums"
    ], e);
}(function (e, t) {
  function p(e) {
    function t() {
      var t = e && e.parameters;
      t && t.inviterMri && d(t);
    }
    return n.get().conversationsManager._conversationsSynced.promise.then(t);
  }
  function d(e) {
    var t = v(e.inviterMri), u = n.get().conversationsManager.getConversation(t), a = f.dateTime.now();
    t._authorization._set(h.PENDING_INCOMING);
    o.map(e, t);
    n.get().conversationsManager.conversations.add(u);
    var l = r.getContactRequestIncomingActivityItem(u);
    if (!l || l._id !== a) {
      t.status._set(c.onlineStatus.Unknown);
      r.clearContactRequestActivityItems(u);
      var p = s.getSanitizedInviteGreeting(e), d = i.getIncoming(t, a, p);
      u.historyService._processRawMessage(d);
    }
  }
  function v(e) {
    var t = a.getId(e), n = a.getTypeFromKey(e);
    return u.build().getOrCreate(t, n, h.PENDING_INCOMING);
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("../../../../lib/modelHelpers/contacts/contactActivityItemHelper"), i = e("../../../../lib/modelHelpers/contacts/contactMessageFactory"), s = e("../../../../lib/modelHelpers/contacts/inviteMessage"), o = e("../../../../lib/modelHelpers/contacts/dataMappers/incomingInviteToPerson"), u = e("../../../../lib/modelHelpers/personsRegistry/instance"), a = e("swx-mri"), f = e("swx-utils-chat"), l = e("jskype-constants"), c = e("swx-enums"), h = l.PEOPLE.authorizationStates;
  t.process = p;
}));

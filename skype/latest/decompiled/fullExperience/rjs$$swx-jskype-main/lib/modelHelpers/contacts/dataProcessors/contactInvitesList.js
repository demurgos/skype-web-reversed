(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/dataProcessors/contactInvitesList", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "jskype-constants",
      "swx-mri",
      "swx-enums",
      "lodash-compat",
      "../../../../lib/modelHelpers/contacts/contactActivityItemHelper",
      "../../../../lib/modelHelpers/contacts/contactMessageFactory",
      "../../../../lib/modelHelpers/personsRegistry/instance",
      "../../../../lib/modelHelpers/contacts/inviteMessage"
    ], e);
}(function (e, t) {
  function h(e) {
    function t() {
      var t = e && e.invite_list || [];
      o.forEach(t, function (e) {
        p(e);
      });
    }
    return n.get().conversationsManager._conversationsSynced.promise.then(t);
  }
  function p(e) {
    if (d(e)) {
      var t = g(e.mri), r = n.get().conversationsManager.getConversation(t);
      t._authorization._set(c.PENDING_INCOMING);
      n.get().conversationsManager.conversations.add(r);
      var i = m(e.invites);
      i && v(i, t, r);
    }
  }
  function d(e) {
    return e && e.mri && e.invites && e.invites.length;
  }
  function v(e, t, n) {
    var r = u.getContactRequestIncomingActivityItem(n), i = new Date(e.time).getTime();
    if (!r || r._id !== i) {
      t.status._set(s.onlineStatus.Unknown);
      u.clearContactRequestActivityItems(n);
      var o = l.getSanitizedInviteMessage(e), f = a.getIncoming(t, i, o);
      n.historyService._processRawMessage(f);
    }
  }
  function m(e) {
    var t = o.sortBy(e, function (e) {
      return new Date(e.time).getTime();
    });
    return t.length && t[t.length - 1];
  }
  function g(e) {
    var t = i.getId(e), n = i.getTypeFromKey(e);
    return f.build().getOrCreate(t, n, c.PENDING_INCOMING);
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("jskype-constants"), i = e("swx-mri"), s = e("swx-enums"), o = e("lodash-compat"), u = e("../../../../lib/modelHelpers/contacts/contactActivityItemHelper"), a = e("../../../../lib/modelHelpers/contacts/contactMessageFactory"), f = e("../../../../lib/modelHelpers/personsRegistry/instance"), l = e("../../../../lib/modelHelpers/contacts/inviteMessage"), c = r.PEOPLE.authorizationStates;
  t.process = h;
}));

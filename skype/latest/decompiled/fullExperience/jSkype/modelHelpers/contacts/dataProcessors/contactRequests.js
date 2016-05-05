define("jSkype/modelHelpers/contacts/dataProcessors/contactRequests", [
  "require",
  "exports",
  "module",
  "jSkype/client",
  "jSkype/constants/people",
  "swx-enums",
  "jSkype/modelHelpers/contacts/contactActivityItemHelper",
  "jSkype/modelHelpers/contacts/contactMessageFactory",
  "utils/chat/messageSanitizer",
  "constants/common",
  "jSkype/settings",
  "jSkype/modelHelpers/personsRegistry/instance",
  "jSkype/models/person"
], function (e, t) {
  function h() {
    this.process = function (e) {
      var t = n.get().conversationsManager;
      t._conversationsSynced.promise.then(function () {
        function a(e) {
          var t = n.get(e);
          return t ? t._authorization._set(r.PENDING_INCOMING) : (t = new c(e), t._authorization._set(r.PENDING_INCOMING), n.add(t)), t;
        }
        var n = l.build();
        e.forEach(function (e) {
          var n, r, f, l, c, h, d = a(e.sender);
          n = t.getConversation(d), t.conversations.add(n), c = s.getContactRequestIncomingActivityItem(n), r = new Date(e.event_time_iso).getTime();
          if (!c || c._id !== r)
            d.status._set(i.onlineStatus.Unknown), s.clearContactRequestActivityItems(n), f = u.escapeIncomingHTML(u.removeAnchorTags(e.greeting)), l = o.getIncoming(d, r, f), h = s.getContactRequestIncomingInviteFreeActivityItem(n), p() && !h && n.historyService._processRawMessage(o.getIncomingInviteFree(d, r)), n.historyService._processRawMessage(l);
        });
      });
    };
  }
  function p() {
    return f.isFeatureOn(a.featureFlags.INVITE_FREE_IMPLICIT_INCOMING_CONTACT_REQUEST);
  }
  var n = e("jSkype/client"), r = e("jSkype/constants/people").authorizationStates, i = e("swx-enums"), s = e("jSkype/modelHelpers/contacts/contactActivityItemHelper"), o = e("jSkype/modelHelpers/contacts/contactMessageFactory"), u = e("utils/chat/messageSanitizer"), a = e("constants/common"), f = e("jSkype/settings"), l = e("jSkype/modelHelpers/personsRegistry/instance"), c = e("jSkype/models/person");
  t.build = function () {
    return new h();
  };
})

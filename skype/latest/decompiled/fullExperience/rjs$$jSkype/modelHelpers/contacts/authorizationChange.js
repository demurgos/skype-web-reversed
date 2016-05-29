define("jSkype/modelHelpers/contacts/authorizationChange", [
  "require",
  "exports",
  "module",
  "jSkype/client",
  "jSkype/services/serviceFactory",
  "swx-enums",
  "jSkype/constants/people",
  "jSkype/modelHelpers/personHelper",
  "jSkype/modelHelpers/contacts/contactActivityItemHelper",
  "jSkype/modelHelpers/contacts/contactMessageFactory",
  "jSkype/settings",
  "constants/common",
  "jSkype/modelHelpers/personsAndGroupsHelper"
], function (e, t) {
  function h(e, t) {
    return e === undefined ? t : e;
  }
  function p() {
    var e = {};
    return e[s.AUTHORIZED] = function (e, t, n) {
      var r;
      if (t === s.AUTHORIZED)
        return;
      e._authorization._set(s.AUTHORIZED);
      r = c.getDefaultPresence(e, s.AUTHORIZED);
      r && e.status._set(r);
      switch (t) {
      case s.PENDING_OUTGOING:
      case s.PENDING_INCOMING:
      case s.SUGGESTED:
      case s.UNAUTHORIZED:
        n && (u.clearContactRequestActivityItems(n), m(e, n)), y(e);
      }
    }, e[s.UNAUTHORIZED] = function (e, t, r) {
      var i;
      if (t === s.UNAUTHORIZED)
        return;
      e._authorization._set(s.UNAUTHORIZED);
      e.status._set(undefined);
      switch (t) {
      case s.PENDING_INCOMING:
        r && (u.clearContactRequestActivityItems(r), n.get().conversationsManager.conversations.remove(r));
        break;
      case s.UNKNOWN:
      case s.PENDING_OUTGOING:
      case s.SUGGESTED:
        r && o.canRequestContactAuthorization(e) && (i = a.getOutgoing(e), u.clearContactRequestActivityItems(r), r.historyService._processRawMessage(i));
        break;
      case s.AUTHORIZED:
        r && o.canRequestContactAuthorization(e) && (i = a.getOutgoing(e), u.clearContactRequestActivityItems(r), r.historyService._processRawMessage(i)), g(e);
      }
    }, e[s.PENDING_OUTGOING] = function (e, t, n) {
      var r;
      if (t === s.PENDING_OUTGOING)
        return;
      e._authorization._set(s.PENDING_OUTGOING);
      e.status._set(i.onlineStatus.Unknown);
      switch (t) {
      case s.UNKNOWN:
      case s.UNAUTHORIZED:
      case s.SUGGESTED:
        n && (u.clearContactRequestActivityItems(n), r = a.getOutgoingResend(e), n.historyService._processRawMessage(r));
      }
    }, e[s.SUGGESTED] = function (e, t, n) {
      if (t === s.SUGGESTED)
        return;
      e._authorization._set(s.SUGGESTED);
      n && (t === s.UNAUTHORIZED || t === s.UNKNOWN) && (u.clearContactRequestActivityItems(n), n.historyService._processRawMessage(a.getSuggested(e)));
    }, e;
  }
  function d(e, t) {
    var r = o.getKey(e.id(), e._type());
    n.get().conversationsManager._conversationBlockedUpdate(r, t);
  }
  function v(e) {
    var t = o.getKey(e.id(), e._type());
    return n.get().conversationsManager._getConversation(t);
  }
  function m(e, t) {
    f.isFeatureOn(l.featureFlags.INVITE_FREE_IMPLICIT_INCOMING_CONTACT_REQUEST) || t.historyService._processRawMessage(a.getIsNowContact(e));
  }
  function g(e) {
    if (w(e)) {
      var t = r.getPresenceService();
      t.removeContactFromContactsList(e.id());
    }
  }
  function y(e) {
    if (b(e)) {
      var t = r.getPresenceService();
      t.addContactToContactsList(e.id());
    }
  }
  function b(e) {
    return !f.isFeatureOn(l.featureFlags.DO_NOT_SEND_CONTACTS_TO_CHAT_SERVICE) && o.canAddToChatServiceContactList(e);
  }
  function w(e) {
    return !f.isFeatureOn(l.featureFlags.DO_NOT_SEND_CONTACTS_TO_CHAT_SERVICE) && o.canRemoveContactFromChatServiceContactList(e);
  }
  function E(e, t, n) {
    t.persons(e.id()) || t.persons.add(e, e.id(), undefined, n);
  }
  var n = e("jSkype/client"), r = e("jSkype/services/serviceFactory"), i = e("swx-enums"), s = e("jSkype/constants/people").authorizationStates, o = e("jSkype/modelHelpers/personHelper"), u = e("jSkype/modelHelpers/contacts/contactActivityItemHelper"), a = e("jSkype/modelHelpers/contacts/contactMessageFactory"), f = e("jSkype/settings"), l = e("constants/common"), c = e("jSkype/modelHelpers/personsAndGroupsHelper");
  t.setAuthorization = function (e, n, r) {
    var i = p()[n];
    return i && i(e, e._authorization(), v(e)), h(r, !0) && t.updateGroups(e), e;
  };
  t.updateGroups = function (e) {
    var t = n.get().personsAndGroupsManager.all, r = t.groups().filter(function (e) {
        return e.relationshipLevel() === i.groupPrivacyRelationshipLevel.Blocked;
      })[0];
    switch (e._authorization()) {
    case s.AUTHORIZED:
    case s.PENDING_OUTGOING:
    case s.SUGGESTED:
      E(e, t, !0);
      break;
    case s.UNAUTHORIZED:
      t.persons.remove(e.id(), !0);
    }
    e.isBlocked() ? E(e, r, !1) : r.persons.remove(e);
  };
  t.setBlocked = function (e, r) {
    var i, o;
    if (e.isBlocked())
      return;
    r = h(r, !0);
    e.isBlocked._set(!0);
    i = v(e);
    d(e, !0);
    switch (e._authorization()) {
    case s.PENDING_INCOMING:
      t.sendDeclineRequest(e), i && (u.clearContactRequestActivityItems(i), n.get().conversationsManager.conversations.remove(i));
      break;
    case s.UNAUTHORIZED:
      i && (u.clearContactRequestActivityItems(i), n.get().conversationsManager.conversations.remove(i));
      break;
    case s.PENDING_OUTGOING:
    case s.SUGGESTED:
      i && (o = a.getUnblockContact(e), u.clearContactRequestActivityItems(i), i.historyService._processRawMessage(o));
      break;
    case s.AUTHORIZED:
      i && (o = a.getUnblockContact(e), u.clearUnblockContactActivityItems(i), i.historyService._processRawMessage(o)), g(e);
    }
    r && t.updateGroups(e);
  };
  t.setUnblocked = function (e, n) {
    var r, i, o;
    if (!e.isBlocked())
      return;
    n = h(n, !0);
    e.isBlocked._set(!1);
    r = v(e);
    d(e, !1);
    switch (e._authorization()) {
    case s.AUTHORIZED:
      r && u.clearUnblockContactActivityItems(r), y(e);
      break;
    case s.UNAUTHORIZED:
      r && (i = a.getOutgoing(e), u.clearUnblockContactActivityItems(r), r.historyService._processRawMessage(i));
      break;
    case s.PENDING_OUTGOING:
      r && (o = a.getOutgoingResend(e), u.clearUnblockContactActivityItems(r), r.historyService._processRawMessage(o));
      break;
    case s.SUGGESTED:
      r && (o = a.getSuggested(e), u.clearUnblockContactActivityItems(r), r.historyService._processRawMessage(o));
    }
    n && t.updateGroups(e);
  };
  t.sendDeclineRequest = function (e) {
    var i = e.id(), o = r.getStratusService();
    return o.declineContactRequest(i).then(function () {
      var r = f.settings.telemetry.jSkypeTenantToken;
      t.setAuthorization(e, s.UNAUTHORIZED);
      n.get()._telemetryManager.sendEvent(r, l.telemetry.contacts.type.CONTACT_REQUESTS, {
        name: l.telemetry.contacts.name.CONTACT_REQUEST_DECLINED,
        user_from: [
          i,
          window.skypeTelemetryManager.PIIType.Identity
        ]
      });
    });
  };
});

(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/modelHelpers/contacts/authorizationChange", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "../../services/contactsV2/instance",
      "../../services/serviceFactory",
      "swx-enums",
      "swx-constants",
      "jskype-constants",
      "../personHelper",
      "../contacts/contactActivityItemHelper",
      "../contacts/contactMessageFactory",
      "jskype-settings-instance",
      "../contacts/presenceHelper",
      "swx-mri",
      "../contacts/groupHelper"
    ], e);
}(function (e, t) {
  function v(e, r) {
    function a() {
      f.clearContactRequestActivityItems(i);
      n.get().conversationsManager.conversations(p.getKey(e.id(), e._type())) ? n.get().conversationsManager.conversations.remove(i) : (s = l.getUnblockContact(e), i.historyService._processRawMessage(s));
    }
    var i, s, o;
    if (e.isBlocked())
      return Promise.resolve();
    r = g(r, !0);
    e.isBlocked._set(!0);
    i = w(e);
    b(e, !0);
    switch (e._authorization()) {
    case u.PEOPLE.authorizationStates.PENDING_INCOMING:
      o = t.sendDeclineRequest(e), i && (f.clearContactRequestActivityItems(i), n.get().conversationsManager.conversations.remove(i));
      break;
    case u.PEOPLE.authorizationStates.UNAUTHORIZED:
      i && a();
      break;
    case u.PEOPLE.authorizationStates.PENDING_OUTGOING:
    case u.PEOPLE.authorizationStates.SUGGESTED:
      i && (s = l.getUnblockContact(e), f.clearContactRequestActivityItems(i), i.historyService._processRawMessage(s));
      break;
    case u.PEOPLE.authorizationStates.AUTHORIZED:
      i && (s = l.getUnblockContact(e), f.clearUnblockContactActivityItems(i), i.historyService._processRawMessage(s)), S(e);
      break;
    default:
    }
    return r && d.updateGroups(e), o || Promise.resolve();
  }
  function m(e, t) {
    var n, r, i;
    if (!e.isBlocked())
      return;
    t = g(t, !0);
    e.isBlocked._set(!1);
    n = w(e);
    b(e, !1);
    switch (e._authorization()) {
    case u.PEOPLE.authorizationStates.AUTHORIZED:
      n && f.clearUnblockContactActivityItems(n), x(e);
      break;
    case u.PEOPLE.authorizationStates.UNAUTHORIZED:
      n && (r = l.getOutgoing(e), f.clearUnblockContactActivityItems(n), n.historyService._processRawMessage(r));
      break;
    case u.PEOPLE.authorizationStates.PENDING_OUTGOING:
      n && (i = l.getOutgoingResend(e), f.clearUnblockContactActivityItems(n), n.historyService._processRawMessage(i));
      break;
    case u.PEOPLE.authorizationStates.SUGGESTED:
      n && (i = l.getSuggested(e), f.clearUnblockContactActivityItems(n), n.historyService._processRawMessage(i));
      break;
    default:
    }
    t && d.updateGroups(e);
  }
  function g(e, t) {
    return e === undefined ? t : e;
  }
  function y() {
    var e = {};
    return e[u.PEOPLE.authorizationStates.AUTHORIZED] = function (e, t, n) {
      var r;
      if (t === u.PEOPLE.authorizationStates.AUTHORIZED)
        return;
      e._authorization._set(u.PEOPLE.authorizationStates.AUTHORIZED);
      r = h.getDefaultPresence(e, u.PEOPLE.authorizationStates.AUTHORIZED);
      r && e.status._set(r);
      switch (t) {
      case u.PEOPLE.authorizationStates.PENDING_OUTGOING:
      case u.PEOPLE.authorizationStates.PENDING_INCOMING:
      case u.PEOPLE.authorizationStates.SUGGESTED:
      case u.PEOPLE.authorizationStates.UNAUTHORIZED:
        n && (f.clearContactRequestActivityItems(n), E(e, n)), x(e);
        break;
      default:
      }
    }, e[u.PEOPLE.authorizationStates.UNAUTHORIZED] = function (e, t, r) {
      var i;
      if (t === u.PEOPLE.authorizationStates.UNAUTHORIZED)
        return;
      e._authorization._set(u.PEOPLE.authorizationStates.UNAUTHORIZED);
      e.status._set(undefined);
      switch (t) {
      case u.PEOPLE.authorizationStates.PENDING_INCOMING:
        r && (f.clearContactRequestActivityItems(r), n.get().conversationsManager.conversations.remove(r));
        break;
      case u.PEOPLE.authorizationStates.UNKNOWN:
      case u.PEOPLE.authorizationStates.PENDING_OUTGOING:
      case u.PEOPLE.authorizationStates.SUGGESTED:
        r && a.canRequestContactAuthorization(e) && (i = l.getOutgoing(e), f.clearContactRequestActivityItems(r), r.historyService._processRawMessage(i));
        break;
      case u.PEOPLE.authorizationStates.AUTHORIZED:
        r && a.canRequestContactAuthorization(e) && (i = l.getOutgoing(e), f.clearContactRequestActivityItems(r), r.historyService._processRawMessage(i)), S(e);
        break;
      default:
      }
    }, e[u.PEOPLE.authorizationStates.PENDING_OUTGOING] = function (e, t, n) {
      var r;
      if (t === u.PEOPLE.authorizationStates.PENDING_OUTGOING)
        return;
      e._authorization._set(u.PEOPLE.authorizationStates.PENDING_OUTGOING);
      e.status._set(s.onlineStatus.Unknown);
      switch (t) {
      case u.PEOPLE.authorizationStates.UNKNOWN:
      case u.PEOPLE.authorizationStates.UNAUTHORIZED:
      case u.PEOPLE.authorizationStates.SUGGESTED:
      case u.PEOPLE.authorizationStates.AUTHORIZED:
        n && (f.clearContactRequestActivityItems(n), r = l.getOutgoingResend(e), n.historyService._processRawMessage(r));
        break;
      default:
      }
    }, e[u.PEOPLE.authorizationStates.SUGGESTED] = function (e, t, n) {
      if (t === u.PEOPLE.authorizationStates.SUGGESTED)
        return;
      e._authorization._set(u.PEOPLE.authorizationStates.SUGGESTED);
      n && (t === u.PEOPLE.authorizationStates.UNAUTHORIZED || t === u.PEOPLE.authorizationStates.UNKNOWN) && (f.clearContactRequestActivityItems(n), n.historyService._processRawMessage(l.getSuggested(e)));
    }, e;
  }
  function b(e, t) {
    n.get().conversationsManager._conversationBlockedUpdate(p.getKey(e.id(), e._type()), t);
  }
  function w(e) {
    return n.get().conversationsManager._getConversation(p.getKey(e.id(), e._type()));
  }
  function E(e, t) {
    c.isFeatureOn(o.COMMON.featureFlags.INVITE_FREE_IMPLICIT_INCOMING_CONTACT_REQUEST) || t.historyService._processRawMessage(l.getIsNowContact(e));
  }
  function S(e) {
    if (N(e)) {
      var t = i.getPresenceService();
      t.removeContactFromContactsList(p.getKey(e.id(), e._type()));
    }
  }
  function x(e) {
    if (T(e)) {
      var t = i.getPresenceService();
      t.addContactToContactsList(p.getKey(e.id(), e._type()));
    }
  }
  function T(e) {
    return !c.isFeatureOn(o.COMMON.featureFlags.DO_NOT_SEND_CONTACTS_TO_CHAT_SERVICE) && a.canAddToChatServiceContactList(e);
  }
  function N(e) {
    return !c.isFeatureOn(o.COMMON.featureFlags.DO_NOT_SEND_CONTACTS_TO_CHAT_SERVICE) && a.canRemoveContactFromChatServiceContactList(e);
  }
  var n = e("swx-jskype-internal-application-instance"), r = e("../../services/contactsV2/instance"), i = e("../../services/serviceFactory"), s = e("swx-enums"), o = e("swx-constants"), u = e("jskype-constants"), a = e("../personHelper"), f = e("../contacts/contactActivityItemHelper"), l = e("../contacts/contactMessageFactory"), c = e("jskype-settings-instance"), h = e("../contacts/presenceHelper"), p = e("swx-mri"), d = e("../contacts/groupHelper");
  t.setAuthorization = function (e, t, n) {
    var r = y()[t];
    return r && r(e, e._authorization(), w(e)), g(n, !0) && d.updateGroups(e), e;
  };
  t.setBlocked = v;
  t.setUnblocked = m;
  t.sendDeclineRequest = function (e) {
    function s() {
      t.setAuthorization(e, u.PEOPLE.authorizationStates.UNAUTHORIZED);
    }
    function o(e) {
    }
    var i = e.id();
    return r.get().declineContactInvite(n.get().personsAndGroupsManager.mePerson.id(), p.getKey(i, e._type())).then(s, o);
  };
}));

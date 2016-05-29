define("jSkype/models/conversationsManager", [
  "require",
  "lodash-compat",
  "swx-enums",
  "jSkype/constants/people",
  "jcafe-property-model",
  "jSkype/models/conversation",
  "jSkype/models/conversationsSearchQuery",
  "jSkype/modelHelpers/contacts/contactActivityItemHelper",
  "jSkype/modelHelpers/contacts/contactMessageFactory",
  "jSkype/modelHelpers/contacts/dataMappers/dataMaps",
  "jSkype/modelHelpers/personHelper",
  "jSkype/modelHelpers/personsAndGroupsHelper",
  "jSkype/modelHelpers/personsRegistry/instance",
  "jSkype/modelHelpers/propertyValidator",
  "jSkype/modelHelpers/contacts/authorizationChange",
  "jSkype/settings",
  "constants/common",
  "jSkype/services/webapi/utils/conversationMetadataStore",
  "jSkype/services/webapiMapper/conversationApiHandler",
  "jSkype/services/webapiMapper/conversationLiveStateHandler",
  "jSkype/utils/chat/conversationsCache",
  "jSkype/utils/chat/conversationsFactory"
], function (e) {
  function x() {
    function D(e, t) {
      var n = x._getConversation(t.id);
      n && n[e](t);
      O.conversationUpdated(t);
    }
    function P(e) {
      k(e.conversationId) || k.add(e, e.conversationId);
    }
    function H(e) {
      B(k, e);
      B(L, e);
    }
    function B(e, t) {
      try {
        e.add(t, t.conversationId);
      } catch (n) {
      }
    }
    function j(e, t) {
      var r, s = i.task();
      return v.isFeatureOn(m.featureFlags.FAVORITES_CONVERSATION_ENABLED) && e._isFavorited() && e._isFavorited(!1), t === n.activityType.ContactRequestIncoming ? (r = e.participants()[0].person, d.sendDeclineRequest(r).then(s.resolve.bind(s), s.reject.bind(s))) : (k.remove(e.conversationId), L.remove(e.conversationId), O.onItemRemoved(e.conversationId), s.resolve()), s.promise;
    }
    function F() {
      return T ? T.promise : (T = i.task(), O.syncFinished.once(!0, function () {
        T.resolve(k());
      }), T.promise);
    }
    function I(e) {
      var t = M.createById(e), n = O.getConversation(e);
      return n && t._update(n), L.add(t, t.conversationId), t;
    }
    function q(e) {
      var t, n, r = f.contactTypes[f.contactTypeNames.pstn] + ":", i = e.replace(r, "");
      return t = new s(A, !1, e), n = c.getPerson(i, f.contactTypes[f.contactTypeNames.pstn]), t._addParticipant(n), x.conversations.add(t), t;
    }
    function R(e, t) {
      e.reverse().forEach(function (e) {
        x.__processConversation(e, t);
      });
    }
    function U(e, t, n) {
      var r = k.size(), i, s;
      R(n);
      i = k.size() - r;
      s = e - i;
      s > 0 && O.hasMoreItems() ? z(s, t) : t.resolve();
      O.hasMoreItems() || C.set(!1);
    }
    function z(e, t) {
      O.get(e).then(U.bind(x, e, t), t.reject.bind(t));
    }
    function W(e) {
      var t = N;
      return t ? t.promise : (t = N = i.task(), N.promise.finally(function () {
        N = null;
      }), z(e, t), t.promise);
    }
    function X() {
      if (!v.isFeatureOn(m.featureFlags.FAVORITES_CONVERSATION_ENABLED))
        return;
      A.getFavorites().then(function (e) {
        var n, r = e.response.favorites;
        if (!r)
          return;
        r = JSON.parse(r);
        t.forEach(r, function (e) {
          n = x._getOrCreateConversation(e);
          n._isFavorited._set(!0);
          t.indexOf(x.conversations, n) === -1 && x.conversations.add(n);
        });
      });
    }
    var e, x = this, T, N, C = i.boolProperty(!0), k = i.collection({ get: F }), L = i.collection(), A = new y(this), O = w.build(A, R), M = new E(A);
    x.conversationAPIHandler = A;
    this.createSearchQuery = function () {
      return new o(O);
    };
    this.getMoreConversations = i.command(W, C);
    this.conversations = k.fork({
      add: H,
      remove: j
    });
    this.createConversation = function () {
      function t(t) {
        e.historyService.getMoreActivityItems.enabled._set(!0);
        e.conversationId = t;
        e._topicSetEnabled(!0);
        x.conversations.add(e, t);
        A.syncThread(t);
        e.selfParticipant.role._set(n.participantRole.Leader);
      }
      function r() {
      }
      var e = new s(A, !0, null);
      return e.historyService.getMoreActivityItems.enabled._set(!1), A.createConversation(e, t, r), e;
    };
    this.getConversation = function (t) {
      function r() {
        var e = l.getKey(t.id(), t._type()), n = x._getConversation(e);
        if (!n) {
          n = M.createByPerson(t);
          var r = O.getItem(e);
          r && n._update(r);
          L.add(n, n.conversationId);
        }
        return n;
      }
      function i() {
        var e = a.getActivityItemForInitialConversationLoad(t, n);
        e && n.historyService._processRawMessage(e);
      }
      e.get(t.id()) || e.add(t);
      var n = r();
      return i(), n;
    };
    this.getConversationByUri = function (e) {
      function i(e) {
        if (!!e.members) {
          A.joinConversation(e);
          return;
        }
        A.syncThread(e.conversationId, function () {
          e.leave.enabled() || A.joinConversation(e);
        });
      }
      var t, n;
      if (typeof e != "string")
        throw new TypeError("expected uri to be a string");
      t = e.replace(S, "");
      var r = p.isPhoneNumber(t);
      if (!p.isGroupConversation(t) && !r)
        throw new Error("expected valid conversation uri");
      n = L(t);
      if (!n) {
        if (r)
          return q(t);
        n = new s(A, !0, t);
        x.conversations.add(n);
        A.joinConversation(n);
      } else
        n.leave.enabled() || i(n);
      return n;
    };
    this._getConversationByUri = function (e) {
      function o(e, i) {
        if (!n && r) {
          n = q(t);
          e();
          return;
        }
        if (!n) {
          n = new s(A, !0, t);
          x.conversations.add(n);
          A.joinConversation(n, !0).then(e, i);
          return;
        }
        if (!!n.members) {
          A.joinConversation(n, !0).then(e, i);
          return;
        }
        A.syncThread(n.conversationId).then(function () {
          n.leave.enabled() ? e() : A.joinConversation(n, !0).then(e, i);
        }, i);
      }
      var t, n, r, i;
      return typeof e != "string" ? Promise.reject(new TypeError("expected uri to be a string")) : (t = e.replace(S, ""), r = p.isPhoneNumber(t), i = p.isGroupConversation(t), !i && !r ? Promise.reject(new Error("expected valid conversation uri")) : (n = L(t), new Promise(function (e, t) {
        function r() {
          e(n);
        }
        o(r, t);
      })));
    };
    this.unreadConversationsCount = O.unreadConversationsCount;
    this._allConversations = function () {
      return O.getAllItems();
    };
    this._conversationsSynced = A.addConversationsCollectionTask;
    this._onlineStateChanged = function () {
      k().forEach(function (e) {
        e._onlineStateChanged();
      });
    };
    this._conversationBlockedUpdate = O.conversationBlockedUpdate;
    this._init = function () {
      A.init();
      O._init();
      O.get(0);
      e = h.build();
      X();
    };
    x._reset = function () {
      return A.reset().then(function () {
        O = w.build(A, R);
        C(!0);
        k.empty();
        L.empty();
        h.reset();
        e = null;
      });
    };
    this._getConversation = function (e) {
      return L(e);
    };
    this._getOrCreateConversation = function (e) {
      return x._getConversation(e) || I(e);
    };
    this._handleNewMessage = function (e, t) {
      var n = x._getOrCreateConversation(e);
      P(n);
      O.handleNewMessage(e, t);
      n.historyService._processRawMessage(t);
    };
    this._handleUpdatedMessage = function (e, t) {
      var n = x._getOrCreateConversation(e);
      P(n);
      O.handleUpdatedMessage(e, t);
      n.historyService._processRawMessage(t, !1, !0);
    };
    this._conversationPropertiesUpdated = function (e) {
      D("_updateConversationProperties", e);
    };
    this._threadPropertiesUpdated = function (e) {
      D("_updateThreadProperties", e);
    };
    x.__processConversation = function (e, n) {
      function s() {
        if (!i.historyService._lastMessageFromServer || i.historyService._lastMessageFromServer._actualId !== e.lastMessage.id)
          g.clear(i.conversationId), i.historyService._reset();
        i._update(e);
      }
      function o() {
        t.isEmpty(e.lastMessage) || i.historyService._processRawMessage(e.lastMessage, !0);
        if (!i.isGroupConversation()) {
          var n = i.participants()[0].person;
          f(n);
        }
      }
      function f(e) {
        var t, n = i.lastModificationTimestamp(), s = new Date(n.getTime() + 1000);
        e.isBlocked() ? (u.clearUnblockContactActivityItems(i), t = a.getUnblockContact(e, s), i.historyService._processRawMessage(t)) : l.canRequestContactAuthorization(e) && (e._authorization() === r.UNAUTHORIZED ? (u.clearContactRequestActivityItems(i), t = a.getOutgoing(e, s), i.historyService._processRawMessage(t)) : e._authorization() === r.PENDING_OUTGOING ? (u.clearContactRequestActivityItems(i), t = a.getOutgoingResend(e, s), i.historyService._processRawMessage(t)) : e._authorization() === r.SUGGESTED && (u.clearContactRequestActivityItems(i), t = a.getSuggested(e, s), i.historyService._processRawMessage(t)));
      }
      var i = x._getConversation(e.id);
      i ? s() : i = I(e.id);
      A.addConversationsCollectionTask.promise.then(o);
      n ? B(L, i) : P(i);
      b.updateNGCCallState(e.id, e.threadProperties);
    };
  }
  var t = e("lodash-compat"), n = e("swx-enums"), r = e("jSkype/constants/people").authorizationStates, i = e("jcafe-property-model"), s = e("jSkype/models/conversation"), o = e("jSkype/models/conversationsSearchQuery"), u = e("jSkype/modelHelpers/contacts/contactActivityItemHelper"), a = e("jSkype/modelHelpers/contacts/contactMessageFactory"), f = e("jSkype/modelHelpers/contacts/dataMappers/dataMaps"), l = e("jSkype/modelHelpers/personHelper"), c = e("jSkype/modelHelpers/personsAndGroupsHelper"), h = e("jSkype/modelHelpers/personsRegistry/instance"), p = e("jSkype/modelHelpers/propertyValidator"), d = e("jSkype/modelHelpers/contacts/authorizationChange"), v = e("jSkype/settings"), m = e("constants/common"), g = e("jSkype/services/webapi/utils/conversationMetadataStore"), y = e("jSkype/services/webapiMapper/conversationApiHandler"), b = e("jSkype/services/webapiMapper/conversationLiveStateHandler"), w = e("jSkype/utils/chat/conversationsCache"), E = e("jSkype/utils/chat/conversationsFactory"), S = "skype://";
  return x;
});

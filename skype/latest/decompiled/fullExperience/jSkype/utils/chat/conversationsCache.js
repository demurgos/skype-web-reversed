define("jSkype/utils/chat/conversationsCache", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "constants/common",
  "jSkype/client",
  "jcafe-property-model",
  "jSkype/modelHelpers/propertyValidator",
  "jSkype/services/internalPubSub",
  "jSkype/services/webapi/utils/sanitizer",
  "jSkype/settings",
  "jSkype/utils/chat/cacheBase",
  "jSkype/utils/chat/conversation",
  "jSkype/utils/chat/message",
  "jSkype/utils/chat/messageTypes",
  "jSkype/constants/data",
  "utils/common/cache/instance",
  "utils/chat/sort"
], function (e, t) {
  function w() {
    var e = 14, t = new Date();
    return t.setDate(t.getDate() - e), t.getTime();
  }
  function E(e, t) {
    function H(e) {
      var t = 3600000;
      return e.threadProperties ? e.threadProperties.lastleaveat && e.threadProperties.lastjoinat && e.threadProperties.lastleaveat > e.threadProperties.lastjoinat ? !1 : e.threadProperties.lastjoinat && Date.now() - e.threadProperties.lastjoinat < t : !1;
    }
    function B(e) {
      return e.properties ? e.properties.clearedat : !1;
    }
    function j(e) {
      return e.lastMessage && typeof e.lastMessage.content != "undefined";
    }
    function F(e) {
      return !f.isFeatureOn(r.featureFlags.AGENTS_ENABLED) && c.isAgentConversation(e.id) ? !1 : !f.isFeatureOn(r.featureFlags.PSTN_ENABLED) && c.isPstnConversation(e.id) ? !1 : (j(e) || H(e) && !B(e)) && !c.isMeConversation(e.id);
    }
    function I(e, n, r) {
      var s = i.get().conversationsManager.conversations(e.id), o;
      s || (t([e], !0), s = i.get().conversationsManager._getConversation(e.id)), o = r ? s.historyService._unreadActivityItemsWithKeywordsCount : s.historyService.unreadActivityItemsCount, n(o() > 0);
    }
    function q(e, t) {
      var r = /false/i.test(e.properties.alerts), i = !n.isEmpty(e.properties.alertmatches);
      if (e.isBlocked || r && !i) {
        t(!1);
        return;
      }
      if (h.doesMessageTypeSupportUnreadState(e.lastMessage)) {
        if (e.lastMessage.skypeeditedid) {
          I(e, t, r && i);
          return;
        }
        var s = typeof e.lastMessage.content != "undefined" && !c.isConversationReadOnServer(e) && !h.isMessageOutgoing(e.lastMessage);
        r && i && s ? I(e, t, !0) : t(s);
        return;
      }
      if (c.isConversationReadOnServer(e)) {
        t(!1);
        return;
      }
      I(e, t);
    }
    function R() {
      function t(t) {
        if (e < P)
          return;
        P = e, E.unreadConversationsCount._set(t.length);
      }
      D++;
      var e = D;
      E.getItems(q, t);
    }
    function U(e, n) {
      function o(e) {
        var t = E.cacheItem, s;
        if (F(e)) {
          s = E.getItem(e.id);
          if (s && s === e)
            return;
          s && (it(e), t = E.replaceItem, r.push(e)), e.timestamp = +new Date(e.lastMessage.originalarrivaltime), t(e, e.id), n || i.push(X(e));
        }
      }
      var r = [], i = [];
      if (!e.length)
        return;
      a.conversations(e), e.forEach(o), R(), i.length ? s.task.waitAll(i).then(W) : n || W(), r.forEach(function (e) {
        S[e.id] && tt(e.id);
      }), t(E._getNewUnconsumedItems().concat(r));
    }
    function z(e) {
      function t(e) {
        return e && e.content && p._isDeletedMessage(e.content) && (e.content = ""), e;
      }
      var r = n.omit(e.lastMessage, "conversationModel");
      return e.lastMessage = t(r), e;
    }
    function W() {
      v.get().setItem("recentsSyncState", L);
    }
    function X(e) {
      return v.get().setSensitiveItem("conv|" + e.id, z(e));
    }
    function V(e) {
      return v.get().removeItem("conv|" + e);
    }
    function $() {
      return T = T || v.get().getSensitiveItems(d.CONVERSATION), T;
    }
    function J(t) {
      function i(e) {
        U([e.response]), n.resolve(E.getItem(t));
      }
      var n = s.task(), r = E.getItem(t);
      return r ? n.resolve(r) : e.syncConversation(t, i, n.reject.bind(n)), n.promise;
    }
    function K(e, t, n) {
      for (var r in n)
        n.hasOwnProperty(r) && (e[t][r] = n[r]);
    }
    function Q() {
      var e = T || E._obtain();
      return e.then(function () {
        return E.unreadConversationsCount();
      });
    }
    function G(t, n) {
      function r(e) {
        L = e, s();
      }
      function i(e) {
        L = e.syncState, t(e);
      }
      function s() {
        e.syncRecents(w(), g, L).then(i, n);
      }
      n = n || function () {
      }, L ? s() : v.get().getItem("recentsSyncState").then(r, s);
    }
    function Y() {
      function e(n) {
        U(n.conversations), t(n.conversations), n.hasMoreConversations ? G(e) : N = !1;
      }
      if (N)
        return;
      N = !0, G(e);
    }
    function Z() {
      function n() {
        t--, t === 0 && e.resolve();
      }
      var e = s.task(), t = 0;
      for (var r in S)
        S.hasOwnProperty(r) && (t++, tt(r, n, n));
      return e.promise;
    }
    function et() {
      O(Object.keys(S).length > 0);
    }
    function tt(t, n, r) {
      function i(e, n) {
        x[t].forEach(function (t) {
          var r = e ? t.onError : t.onSuccess;
          r && r(n);
        }), delete x[t];
      }
      delete S[t], et(), x[t] || (x[t] = [], e.syncThread(t, i.bind(null, !1), i.bind(null, !0))), x[t].push({
        onSuccess: n,
        onError: r
      });
    }
    function nt(e) {
      var t = !!e.members, n = o.isGroupConversation(e.id);
      !t && n && (S[e.id] = e.id, et());
    }
    function rt() {
      E.syncFinished._set(!E._serverHasMoreItems && M);
    }
    function it(e) {
      var t = E.getItem(e.id), n = e.lastMessage, r = t ? t.lastMessage : null;
      if (!n || !r || n.properties || !r.properties)
        return;
      n.id === r.id && n.originalarrivaltime === r.originalarrivaltime && (n.properties = r.properties);
    }
    var E = this, S = {}, x = {}, T, N, C = !0, k = !1, L, A = {}, O = s.boolProperty(!1), M = !1, D = 0, P = 0;
    l.call(E, y, m.byTimestamp), this._init = function () {
      u.get().subscribe(b.FORCE_RESYNC, Y);
    }, this._getItemsFromService = function (e, t) {
      function r(e) {
        E.onNewItemsLoaded(), n.reject(e);
      }
      function o(t, r) {
        E.onNewItemsLoaded(), U(t, r), $().then(function () {
          n.promise.state() === "pending" && n.resolve(e ? E._getCachedItems(e) : []);
        });
      }
      function u(n) {
        n.hasMoreConversations && t && E._getItemsFromService(e, t), i.get()._telemetry.context.timelineLoadStatusCode = n.statusCode, o(n.conversations), E._serverHasMoreItems = n.hasMoreConversations, rt();
      }
      var n = s.task();
      return t = t || C, C = !1, G(u, r), k || (k = !0, $().then(function (e) {
        e && o(e, !0), M = !0, rt();
      })), n.promise;
    }, this._syncAllConversations = s.command(Z, O), this._onItemAddedOrUpdated = function (e) {
      U([e]), S[e.id] && tt(e.id);
    }, this._onItemRemoved = function (e) {
      V(e);
    }, this._cacheItem = function (e, t) {
      typeof A[t] != "undefined" && (e.isBlocked = A[t], delete A[t]), nt(e);
    }, this._serverHasMoreItems = !0, this.unreadConversationsCount = s.property({
      readOnly: !0,
      value: 0,
      get: Q
    }), this.getConversation = function (e) {
      var t = E.getItem(e);
      return !t && o.isGroupConversation(e) && (S[e] = e), S[e] && tt(e), t;
    }, this.conversationUpdated = function (e) {
      if (!!e.version && !F(e))
        return;
      J(e.id).then(function (t) {
        K(t, "properties", e.properties), K(t, "threadProperties", e.threadProperties), e.members && (t.members = e.members), R(), X(t);
      });
    }, this.handleUpdatedMessage = function (e, t) {
      var n = E.getItem(e);
      if (!n)
        return;
      n.lastMessage.id === t.id && (n.lastMessage = t, X(n));
    }, this.handleNewMessage = function (e, t) {
      var n = E.getItem(e);
      if (!n)
        return;
      n.lastMessage = t, n.timestamp = +new Date(t.originalarrivaltime), R(), X(n);
    }, this.conversationBlockedUpdate = function (e, t) {
      var n = E.getItem(e);
      n ? (n.isBlocked = t, R(), X(n)) : A[e] = t;
    }, this.syncFinished = s.property({
      readOnly: !0,
      value: !1
    });
  }
  var n = e("lodash-compat"), r = e("constants/common"), i = e("jSkype/client"), s = e("jcafe-property-model"), o = e("jSkype/modelHelpers/propertyValidator"), u = e("jSkype/services/internalPubSub"), a = e("jSkype/services/webapi/utils/sanitizer"), f = e("jSkype/settings"), l = e("jSkype/utils/chat/cacheBase"), c = e("jSkype/utils/chat/conversation"), h = e("jSkype/utils/chat/message"), p = e("jSkype/utils/chat/messageTypes"), d = e("jSkype/constants/data").storageKeyRegExp, v = e("utils/common/cache/instance"), m = e("utils/chat/sort"), g = 100, y = -1, b = r.events.system;
  E.prototype = Object.create(l.prototype), E.prototype.constructor = E, t.build = function (e, t) {
    return new E(e, t);
  };
})

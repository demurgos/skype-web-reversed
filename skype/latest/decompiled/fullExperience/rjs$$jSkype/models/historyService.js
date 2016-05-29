define("jSkype/models/historyService", [
  "require",
  "jcafe-property-model",
  "lodash-compat",
  "constants/common",
  "jSkype/services/webapi/constants",
  "jSkype/utils/chat/message",
  "jSkype/utils/chat/generator",
  "jSkype/utils/chat/editMessageHandler",
  "jSkype/settings",
  "utils/common/logTracer/api",
  "swx-enums",
  "jSkype/services/annotations/main"
], function (e) {
  function p(e, p, d) {
    function x(e) {
      var t;
      y.unreadActivityItemsCount() === 0 && !s.isMessageReadOnServer(d, e.key, e.id) && !s.isMessageOutgoing(e) && !s.doesMessageTypeSupportUnreadState(e) && (t = b(e.key), t && p.setConsumptionHorizonToMessage(d, t));
    }
    function T(e) {
      try {
        b.add(e, e.key() + "");
      } catch (t) {
        return !1;
      }
      return !0;
    }
    function N(e) {
      var t = b(e + "");
      t && b.remove(e + "");
    }
    function C() {
      var e = v.activityItems();
      for (var t = 0; t < e.length - 1; t++)
        N(e[t].key());
      y.reset();
      v.getMoreActivityItems.enabled._set(!0);
    }
    function k(e) {
      function i() {
        n.resolve(e);
      }
      function s() {
        r() === e ? n.resolve(e) : p.historyDisclosed(d.conversationId, e, i, n.reject.bind(n));
      }
      var n = t.task(), r = this;
      return w.promise.then(s, s), w = n, n.promise;
    }
    function L() {
      return d._consumptionHorizon.lastReadMessageId === 0 && d._consumptionHorizon.lastReadMessageTimestamp === 0 && d._consumptionHorizon.modificationTime === 0;
    }
    function A() {
      h.log("historyService.markAllAsReadCommand:", d.conversationId);
      var e = v.activityItems().reverse()[0];
      if (!e)
        return;
      if (L() || !s.isMessageReadOnServer(d._consumptionHorizon, e.key(), e._id))
        h.log("historyService.setConsumptionToLastMessage:", d.conversationId), p.setConsumptionHorizonToMessage(d, e);
      b().forEach(function (e) {
        e.isRead._set(!0);
      });
    }
    function O() {
      function e() {
        y.reset();
        b.empty();
        E.resolve();
      }
      return E ? E.promise : (E = t.task(), E.promise.finally(function () {
        E = null;
      }), p.removeAllMessages(d.conversationId, e, E.reject.bind(E)), E.promise);
    }
    function M(e, t, n) {
      var r = v.activityItems.size(), i, s;
      H(n);
      i = v.activityItems.size() - r;
      s = e - i;
      s > 0 && y.hasMoreItems() ? D(s, t) : t.resolve();
      y.hasMoreItems() || v.getMoreActivityItems.enabled._set(!1);
    }
    function D(e, t) {
      y.get(e).then(M.bind(v, e, t)).catch(t.reject.bind(t));
    }
    function P(e) {
      var n = g;
      return n ? n.promise : (n = g = t.task(), g.promise.finally(function () {
        g = null;
      }), D(e, n), n.promise);
    }
    function H(e) {
      n.forEach(e, function (e) {
        X(e);
      });
    }
    function B(e, t) {
      return e.timestamp() < t.timestamp();
    }
    function j(e) {
      return e === l.activityType.ContactRequestOutgoing || e === l.activityType.ContactRequestOutgoingAgent;
    }
    function F(e) {
      if (j(e.type()))
        return;
      e.timestamp && e.timestamp() > d.lastModificationTimestamp() && (d.lastModificationTimestamp._set(e.timestamp()), v._lastMessageFromServer = e);
    }
    function I(e, t) {
      v._removeMessage(e);
      T(t);
    }
    function q(e, t) {
      var n = y.getMostRecentEditForMessage(e._id);
      n && t.timestamp() >= n.timestamp && u.handleMessageEdit({ replaceMessage: I }, e, t);
    }
    function R(e) {
      var t = y.getMostRecentEditForMessage(e._id), n;
      t && (n = o.activityFromRawMessage(t, d), u.handleMessageEdit({ replaceMessage: I }, e, n));
    }
    function U(e, t) {
      var n = t.key(), s = c.getLastPersonFromProperty(t, i.MESSAGE_PROPERTIES.PER_USER.EMOTIONS, r.emotionTypes.HEART);
      v._messagesWithUnseenHearts(n) && v._messagesWithUnseenHearts.remove(n);
      var o = {
        id: n,
        timestamp: e,
        type: t.type,
        html: t.html,
        text: t.text,
        sender: t.sender,
        person: s,
        isDeleted: t.isDeleted
      };
      v._messagesWithUnseenHearts.add(o, n);
    }
    function z(e) {
      var t = c.getMessagePropertyLastTimestamp(e, i.MESSAGE_PROPERTIES.PER_USER.EMOTIONS, r.emotionTypes.HEART), n = e.key(), s;
      W(e, d) ? U(t, e) : v._messagesWithUnseenHearts(n) && (s = v._messagesWithUnseenHearts(n).timestamp, (!t || t < s) && v._messagesWithUnseenHearts.remove(n));
    }
    function W(e, t) {
      return c.isMessagePropertyUnseen(e, i.MESSAGE_PROPERTIES.PER_USER.EMOTIONS, r.emotionTypes.HEART, t._consumptionHorizon.modificationTime);
    }
    function X(e, t, n) {
      function a() {
        function e(e) {
          return e._isOriginal && e._isOriginal();
        }
        function n(e) {
          return e.isDeleted && !!e.isDeleted() ? !0 : e.isEdited && !!e.isEdited() ? !0 : !1;
        }
        var s = e(i) && e(r), o = !e(i) && e(r), a = !n(r) && n(i);
        if (r.type() !== i.type()) {
          r.timestamp() - i.timestamp() >= 0 && u.handleMessageEdit({ replaceMessage: I }, i, r);
          return;
        }
        if (a) {
          i._id = r._id;
          i.timestamp._set(r.timestamp());
          N(i.key());
          T(i);
          return;
        }
        if (s && !t) {
          i._updateAllProperties(r);
          return;
        }
        if (o && !t) {
          i._updateAllProperties(r);
          return;
        }
        q(i, r);
      }
      var r, i;
      e.content = e.content || "";
      try {
        r = o.activityFromRawMessage(e, d);
      } catch (s) {
        f.getLogger("failed-msgs").log("historyService.processMessage: failed to get activity item for message", e.id, d.conversationId, s.stack);
        return;
      }
      i = b(r.key());
      if (i) {
        if (r.sender !== i.sender)
          return;
        a();
        z(i);
      } else if (!e.skypeeditedid) {
        if (n === !0 && !t) {
          z(r);
          return;
        }
        T(r);
        R(r);
      }
      F(r);
    }
    var v = this, m = t.boolProperty(!0), g, y = new e(p, d), b = t.collection({
        subscribed: function () {
        },
        unsubscribed: C
      }), w = t.task(), E, S = t.boolProperty(!0);
    h || (a.isFeatureOn(r.featureFlags.UNREAD_MSG_LOGGING) ? h = f.getLogger("unread-msgs") : h = {
      log: function () {
      }
    });
    w.resolve();
    this.activityItems = b.sort(B);
    this.unreadActivityItemsCount = y.unreadActivityItemsCount;
    this._unreadActivityItemsWithKeywordsCount = y._unreadActivityItemsWithKeywordsCount;
    this.getMoreActivityItems = t.command(P, t.boolProperty(!0));
    this.markAllAsRead = t.command(A, m);
    this.historyDisclosedCommandEnabled = t.property({ value: !1 });
    this.isHistoryDisclosed = t.property({
      value: !1,
      set: t.command(k, v.historyDisclosedCommandEnabled)
    });
    this.removeAll = t.command(O, S);
    this._messagesWithUnseenHearts = t.collection();
    this._reset = function () {
      b.empty();
      y.reset(!0);
      v.getMoreActivityItems.enabled._set(!0);
    };
    this._removeMessage = function (e) {
      var t = e.key() + "";
      y.onItemRemoved(t);
      N(t);
    };
    this._addOutgoingMessage = function (e) {
      return T(e);
    };
    this._processRawMessage = function (e, t, n, r) {
      if (!e.id)
        return;
      y.getItem(e.id) ? y.onItemUpdated(e) : n || y.onItemAdded(e);
      X(e, t, n);
      !t && !n && !r && x(e);
    };
    this._updateReadStatusFromServer = function () {
      y.onConsumptionHorizonChanged();
      b().forEach(function (e) {
        e.isRead._set(s.isMessageReadOnServer(d._consumptionHorizon, e.key(), e._id));
      });
    };
  }
  var t = e("jcafe-property-model"), n = e("lodash-compat"), r = e("constants/common"), i = e("jSkype/services/webapi/constants"), s = e("jSkype/utils/chat/message"), o = e("jSkype/utils/chat/generator"), u = e("jSkype/utils/chat/editMessageHandler"), a = e("jSkype/settings"), f = e("utils/common/logTracer/api"), l = e("swx-enums"), c = e("jSkype/services/annotations/main"), h;
  return p;
});

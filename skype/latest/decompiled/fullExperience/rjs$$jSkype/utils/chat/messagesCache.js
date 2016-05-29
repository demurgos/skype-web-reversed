define("jSkype/utils/chat/messagesCache", [
  "require",
  "jcafe-property-model",
  "utils/chat/sort",
  "jSkype/utils/chat/cacheBase",
  "jSkype/services/webapi/utils/sanitizer",
  "jSkype/utils/chat/conversation",
  "jSkype/utils/chat/message",
  "jSkype/services/internalPubSub",
  "constants/common",
  "lodash-compat",
  "jSkype/utils/chat/generator"
], function (e) {
  function d(e, d) {
    function y(e) {
      if (w(e)) {
        e.isUnread = !1;
        return;
      }
      e.isUnread = !o.isMessageReadOnServer(d._consumptionHorizon, e.key, e.id);
    }
    function b(e) {
      return typeof e.isUnread == "undefined" && y(e), e.isUnread;
    }
    function w(e) {
      return typeof e.isOutgoing == "undefined" && (e.isOutgoing = o.isMessageOutgoing(e)), e.isOutgoing;
    }
    function E(e) {
      v.log("cacheMessages", e);
      e.forEach(function (e) {
        v.log("caching and sanitizing message", e);
        i.message(e);
        e.key = s.getMessageKey(e);
        e.timestamp = e.timestamp || +new Date(e.originalarrivaltime);
        S(e);
        v.getItem(e.id) ? (v.log("updating message", e), v.replaceItem(e, e.id)) : (v.log("adding message", e), v.cacheItem(e, e.id), v.size() === 1 && m && C());
      });
      x();
    }
    function S(e) {
      if (e.contactRequestType || e.pstnEventType || e.pluginFreeMessageType)
        return;
      l.extendRawMessage(e, d);
    }
    function x() {
      var e, t = [], n = d.chatService._notificationKeywords && d.chatService._notificationKeywords.length > 0;
      e = T().filter(o.canMessageBeMarkedAsUnreadInUI);
      n && (t = f.filter(e, function (e) {
        return d.chatService.shouldNotify(e.content);
      }));
      v.log("updateUnreadActivityItemsCount", e);
      v.unreadActivityItemsCount._set(e.length - t.length);
      v._unreadActivityItemsWithKeywordsCount._set(t.length);
    }
    function T() {
      return v.getItems(function (e) {
        return e.skypeeditedid ? !1 : b(e) && !w(e);
      });
    }
    function N() {
      return v.size() > 0 && !v.getOldestServerMessage();
    }
    function C() {
      function e() {
        m.promise.state() === "pending" ? m.resolve(v.unreadActivityItemsCount()) : m.promise.state() === "resolved" && x();
      }
      function t() {
        var n = v.getOldestServerMessage(), r = n && b(n), i = T().length < h;
        r && i && v._serverHasMoreItems ? v._obtain().then(t) : e();
      }
      function n() {
        var e = v.getAllItems();
        return e.forEach(function (e) {
          if (!e.skypeeditedid)
            return !1;
        }), e.length > 0;
      }
      v.log("getUnreadMessages");
      x();
      d._isAlive || T().length > 0 || n() ? t() : e();
    }
    function k(e) {
      return e.contactRequestType;
    }
    function L() {
      return m || (m = t.task(), C()), m.promise;
    }
    function A() {
      return L().then(function () {
        return v._unreadActivityItemsWithKeywordsCount();
      });
    }
    function O() {
      v._serverHasMoreItems = !0;
    }
    var v = this, m, g = a.events.system;
    r.call(v, c, n.byTimestamp);
    this._updateConversationLastMessage = function (e) {
      if (d._lastMessageRefreshed)
        return;
      var t = d.historyService.activityItems();
      if (e.length > 0 && t.length > 0) {
        var n = f.find(e, function (e) {
          return e.id === t[0]._id;
        });
        if (!n)
          return;
        d.historyService._processRawMessage(n, !1, !1, !0);
        d._lastMessageRefreshed = !0;
      }
    };
    this._getItemsFromService = function (n) {
      function s(e) {
        v.log("received messages from server - error");
        v.onNewItemsLoaded();
        r.reject(e);
      }
      function o(e, t) {
        v._updateConversationLastMessage(e);
        v.log("received messages from server", e, t);
        v.onNewItemsLoaded();
        v._serverHasMoreItems = t;
        E(e);
        i = v._getCachedItems(n);
        v.log("Returning messages from server", i);
        r.resolve(i);
      }
      var r = t.task(), i;
      return N() ? o([], !0) : e.syncMessages(d, p, o, s), r.promise;
    };
    this._onItemAddedOrUpdated = function (e) {
      v.log("_onItemAddedOrUpdated");
      E([e]);
    };
    this._emptyCache = function () {
      v.log("_emptyCache");
      var e = v.getItems(function (e) {
        return !k(e);
      });
      v.clean(e);
    };
    this._serverHasMoreItems = !0;
    u.get().subscribe(g.FORCE_RESYNC, O);
    this.unreadActivityItemsCount = t.property({
      readOnly: !0,
      value: 0,
      get: L
    });
    this._unreadActivityItemsWithKeywordsCount = t.property({
      readOnly: !0,
      value: 0,
      get: A
    });
    this.getOldestServerMessage = function () {
      var e = null;
      return v.forAllItems(function (t) {
        if (k(t))
          return;
        if (!e || e.timestamp > t.timestamp)
          e = t;
      }), e;
    };
    this.onConsumptionHorizonChanged = function () {
      v.forAllItems(y);
      x();
    };
    this.getMostRecentEditForMessage = function (e) {
      function r(e) {
        return t.clientmessageid && e.skypeeditedid === t.clientmessageid && e.author === t.author;
      }
      var t = v.getItem(e);
      return t ? v.getItems(r).sort(n.byTimestampDescending)[0] || null : null;
    };
  }
  var t = e("jcafe-property-model"), n = e("utils/chat/sort"), r = e("jSkype/utils/chat/cacheBase"), i = e("jSkype/services/webapi/utils/sanitizer"), s = e("jSkype/utils/chat/conversation"), o = e("jSkype/utils/chat/message"), u = e("jSkype/services/internalPubSub"), a = e("constants/common"), f = e("lodash-compat"), l = e("jSkype/utils/chat/generator"), c = 10, h = 50, p = h + 1;
  return d.prototype = Object.create(r.prototype), d.prototype.constructor = d, d;
});

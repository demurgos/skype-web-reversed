(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/utils/chat/messagesCache", [
      "require",
      "exports",
      "jcafe-property-model",
      "swx-utils-chat",
      "../../../lib/utils/chat/cacheBase",
      "swx-chat-service",
      "../../../lib/utils/chat/conversation",
      "../../../lib/utils/chat/message",
      "../../../lib/services/internalPubSub",
      "swx-constants",
      "lodash-compat",
      "../../../lib/utils/chat/generator"
    ], e);
}(function (e, t) {
  var n = e("jcafe-property-model"), r = e("swx-utils-chat"), i = e("../../../lib/utils/chat/cacheBase"), s = e("swx-chat-service"), o = e("../../../lib/utils/chat/conversation"), u = e("../../../lib/utils/chat/message"), a = e("../../../lib/services/internalPubSub"), f = e("swx-constants"), l = e("lodash-compat"), c = e("../../../lib/utils/chat/generator"), h = s.utils.sanitizer, p = 10, d = 50, v = d + 1, m = function (e) {
      function t(t, i) {
        var s = e.call(this, p, r.sort.byTimestamp) || this;
        return s.serverHasMoreItems = !0, s.systemEvents = f.COMMON.events.system, s._updateConversationLastMessage = function (e) {
          if (s.conversation._lastMessageRefreshed)
            return;
          var t = s.conversation.historyService.activityItems();
          if (e.length > 0 && t.length > 0) {
            var n = l.find(e, function (e) {
              return e.id === t[0]._id;
            });
            if (!n)
              return;
            s.conversation.historyService._processRawMessage(n, !1, !1, !0);
            s.conversation._lastMessageRefreshed = !0;
          }
        }, s.unreadActivityItemsCount = n.property({
          readOnly: !0,
          value: 0,
          get: s.unreadActivityItemsCountGetter.bind(s)
        }), s._unreadActivityItemsWithKeywordsCount = n.property({
          readOnly: !0,
          value: 0,
          get: s.unreadActivityItemsCountGetterKeyword.bind(s)
        }), s.getOldestServerMessage = function () {
          var e = null;
          return s.forAllItems(function (t) {
            if (s.isContactRequestMessage(t))
              return;
            if (!e || e.timestamp > t.timestamp)
              e = t;
          }), e;
        }, s.onConsumptionHorizonChanged = function () {
          s.forAllItems(s.updateMessageReadState.bind(s));
          s.updateUnreadActivityItemsCount();
        }, s.getMostRecentEditForMessage = function (e) {
          var t = s.getItem(e), n = function (e) {
              return t.clientmessageid && e.skypeeditedid === t.clientmessageid && e.author === t.author;
            };
          return t ? s.getItems(n).sort(r.sort.byTimestampDescending)[0] || null : null;
        }, s.apiHandler = t, s.conversation = i, a.get().subscribe(s.systemEvents.FORCE_RESYNC, s.setHasMoreItemsOnServerFlag.bind(s)), s;
      }
      return __extends(t, e), t.prototype.updateMessageReadState = function (e) {
        if (this.isOutgoingMessage(e)) {
          e.isUnread = !1;
          return;
        }
        e.isUnread = !u.isMessageReadOnServer(this.conversation._consumptionHorizon, e.key, e.timestamp);
      }, t.prototype.isUnread = function (e) {
        return typeof e.isUnread == "undefined" && this.updateMessageReadState(e), e.isUnread;
      }, t.prototype.isOutgoingMessage = function (e) {
        var t = new RegExp("^4:"), n = t.test(this.conversation.conversationId);
        return typeof e.isOutgoing == "undefined" && (e.isOutgoing = n || u.isMessageOutgoing(e)), e.isOutgoing;
      }, t.prototype.cacheMessages = function (e) {
        var t = this;
        this.log("cacheMessages", e);
        e.forEach(function (e) {
          t.log("caching and sanitizing message", e);
          h.message(e);
          e.key = o.getMessageKey(e);
          e.timestamp = e.timestamp || +new Date(e.originalarrivaltime);
          t.extendMessage(e);
          t.getItem(e.id) ? (t.log("updating message", e), t.replaceItem(e, e.id)) : (t.log("adding message", e), t.cacheItem(e, e.id), t.size() === 1 && t.unreadActivityItemsCountGetterTask && t.getUnreadMessagesForCounter());
        });
        this.updateUnreadActivityItemsCount();
      }, t.prototype.extendMessage = function (e) {
        if (e.contactRequestType || e.pstnEventType || e.pluginFreeMessageType)
          return;
        c.extendRawMessage(e, this.conversation);
      }, t.prototype.updateUnreadActivityItemsCount = function () {
        var e = this, t = [], n = this.conversation.chatService._notificationKeywords && this.conversation.chatService._notificationKeywords.length > 0, r = this.getAllUnreadMessages().filter(u.canMessageBeMarkedAsUnreadInUI);
        n && (t = l.filter(r, function (t) {
          return e.conversation.chatService.shouldNotify(t.content);
        }));
        this.log("updateUnreadActivityItemsCount", r);
        this.unreadActivityItemsCount._set(r.length - t.length);
        this._unreadActivityItemsWithKeywordsCount._set(t.length);
      }, t.prototype.getAllUnreadMessages = function () {
        var e = this;
        return this.getItems(function (t) {
          return t.skypeeditedid ? !1 : e.isUnread(t) && !e.isOutgoingMessage(t);
        });
      }, t.prototype.hasOnlyFakeMessage = function () {
        return this.size() > 0 && !this.getOldestServerMessage();
      }, t.prototype.getUnreadMessagesForCounter = function () {
        var e = this;
        this.log("getUnreadMessages");
        var t = function () {
            e.unreadActivityItemsCountGetterTask.promise.state() === "pending" ? e.unreadActivityItemsCountGetterTask.resolve(e.unreadActivityItemsCount()) : e.unreadActivityItemsCountGetterTask.promise.state() === "resolved" && e.updateUnreadActivityItemsCount();
          }, n = function () {
            var r = e.getOldestServerMessage(), i = r && e.isUnread(r), s = e.getAllUnreadMessages().length < d;
            i && s && e._serverHasMoreItems() ? e._obtain().then(n) : t();
          }, r = function () {
            var t = e.getAllItems();
            return t.forEach(function (e) {
              return e.skypeeditedid ? undefined : !1;
            }), t.length > 0;
          };
        this.updateUnreadActivityItemsCount();
        this.conversation._isAlive || this.getAllUnreadMessages().length > 0 || r() ? n() : t();
      }, t.prototype.isContactRequestMessage = function (e) {
        return e.contactRequestType;
      }, t.prototype.unreadActivityItemsCountGetter = function () {
        if (!this.unreadActivityItemsCountGetterTask || this.unreadActivityItemsCountGetterTask.promise.state() === "resolved")
          this.unreadActivityItemsCountGetterTask = n.task(), this.getUnreadMessagesForCounter();
        return this.unreadActivityItemsCountGetterTask.promise;
      }, t.prototype.unreadActivityItemsCountGetterKeyword = function () {
        var e = this;
        return this.unreadActivityItemsCountGetter().then(function () {
          return e._unreadActivityItemsWithKeywordsCount();
        });
      }, t.prototype.setHasMoreItemsOnServerFlag = function () {
        this.serverHasMoreItems = !0;
      }, t.prototype._serverHasMoreItems = function () {
        return this.serverHasMoreItems;
      }, t.prototype._getItemsFromService = function (e, t) {
        var r = this, i = n.task(), s = function (e) {
            if (r.hasOnlyFakeMessage()) {
              o([], !1);
              return;
            }
            r.log("received messages from server - error");
            r.onNewItemsLoaded();
            i.reject(e);
          }, o = function (t, n) {
            r._updateConversationLastMessage(t);
            r.log("received messages from server", t, n);
            r.onNewItemsLoaded();
            r.serverHasMoreItems = n;
            r.cacheMessages(t);
            var s = r._getCachedItems(e);
            r.log("Returning messages from server", s);
            i.resolve(s);
          };
        return this.apiHandler.syncMessages(this.conversation, v, o, s), i.promise;
      }, t.prototype._onItemAddedOrUpdated = function (e) {
        this.log("_onItemAddedOrUpdated");
        this.cacheMessages([e]);
      }, t.prototype._onItemRemoved = function (e) {
      }, t.prototype._cacheItem = function (e, t) {
      }, t.prototype._emptyCache = function () {
        var e = this;
        this.log("_emptyCache");
        var t = this.getItems(function (t) {
          return !e.isContactRequestMessage(t);
        });
        this.clean(t);
      }, t;
    }(i.CacheBase);
  t.__esModule = !0;
  t["default"] = m;
}));

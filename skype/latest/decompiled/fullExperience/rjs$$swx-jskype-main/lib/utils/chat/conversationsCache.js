(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/utils/chat/conversationsCache", [
      "require",
      "exports",
      "lodash-compat",
      "swx-constants",
      "swx-jskype-internal-application-instance",
      "jcafe-property-model",
      "../../../lib/modelHelpers/propertyValidator",
      "../../../lib/services/internalPubSub",
      "swx-chat-service",
      "jskype-settings-instance",
      "../../../lib/utils/chat/cacheBase",
      "../../../lib/utils/chat/conversation",
      "../../../lib/utils/chat/message",
      "../../../lib/utils/chat/messageTypes",
      "../../../lib/telemetry/userAnalytics",
      "swx-utils-common",
      "jskype-constants",
      "../../../lib/services/cache/instance",
      "swx-utils-chat"
    ], e);
}(function (e, t) {
  function T() {
    var e = 14, t = new Date();
    return t.setDate(t.getDate() - e), t.getTime();
  }
  function C(e, t) {
    return new N(e, t);
  }
  var n = e("lodash-compat"), r = e("swx-constants"), i = e("swx-jskype-internal-application-instance"), s = e("jcafe-property-model"), o = e("../../../lib/modelHelpers/propertyValidator"), u = e("../../../lib/services/internalPubSub"), a = e("swx-chat-service"), f = e("jskype-settings-instance"), l = e("../../../lib/utils/chat/cacheBase"), c = e("../../../lib/utils/chat/conversation"), h = e("../../../lib/utils/chat/message"), p = e("../../../lib/utils/chat/messageTypes"), d = e("../../../lib/telemetry/userAnalytics"), v = e("swx-utils-common"), m = e("jskype-constants"), g = e("../../../lib/services/cache/instance"), y = e("swx-utils-chat"), b = a.utils.sanitizer, w = m.DATA.storageKeyRegExp, E = 100, S = -1, x = r.COMMON.events.system, N = function (e) {
      function t(t, n) {
        var r = e.call(this, S, y.sort.byTimestamp) || this;
        return r.queueForSynchronization = {}, r.queueInSynchronization = {}, r.serverHasMoreItems = !0, r.firstTimeAskingService = !0, r.conversationsFromStorageProcessed = !1, r.blockedNotCachedYet = {}, r.syncAllConversationsCommandState = s.boolProperty(!1), r.conversationsFromCacheSynced = !1, r.conversationUnreadCountUpdateCounter = 0, r.appliedConversationUnreadCountUpdateCounter = 0, r.appliedConversationAllUnreadCountUpdateCounter = 0, r.syncRecentsPromise = new Promise(function (e) {
          r.syncRecentsPromiseResolver = e;
        }), r._syncAllConversations = s.command(r.syncAllConversationsCommand, r.syncAllConversationsCommandState), r._init = function () {
          u.get().subscribe(x.FORCE_RESYNC, r.resyncAll.bind(r));
        }, r._getUnreadConversations = s.property({
          readOnly: !0,
          value: [],
          get: r.getUnreadConversationsCountCommand.bind(r)
        }), r._allUnreadConversationsCount = s.property({
          readOnly: !0,
          value: 0,
          get: r.getUnreadConversationsCountCommand.bind(r)
        }), r._getAllUnreadConversations = s.property({
          readOnly: !0,
          value: [],
          get: r.getUnreadConversationsCountCommand.bind(r)
        }), r.unreadConversationsCount = s.property({
          readOnly: !0,
          value: 0,
          get: r.getUnreadConversationsCountCommand.bind(r)
        }), r.getConversation = function (e) {
          var t = r.getItem(e);
          return !t && o.isGroupConversation(e) && (r.queueForSynchronization[e] = e), r.queueForSynchronization[e] && r.syncThread(e), t;
        }, r.conversationUpdated = function (e) {
          if (!!e.version && !r.isValidConversation(e))
            return;
          r.getOrSyncConversation(e.id).then(function (t) {
            if (!t)
              return;
            r.updateConversationProperties(t, "properties", e.properties);
            r.updateConversationProperties(t, "threadProperties", e.threadProperties);
            e.members && (t.members = e.members);
            r.updateUnreadConversationsCount();
            r.storeConversation(t);
          });
        }, r.handleUpdatedMessage = function (e, t) {
          var n = r.getItem(e);
          if (!n)
            return;
          n.lastMessage.id === t.id && (n.lastMessage = t, r.storeConversation(n));
        }, r.handleNewMessage = function (e, t) {
          var n = r.getItem(e);
          if (!n)
            return;
          n.lastMessage = t;
          n.timestamp = +new Date(t.originalarrivaltime);
          r.updateUnreadConversationsCount();
          r.storeConversation(n);
        }, r.conversationBlockedUpdate = function (e, t) {
          var n = r.getItem(e);
          n ? (n.isBlocked = t, r.updateUnreadConversationsCount(), r.storeConversation(n)) : r.blockedNotCachedYet[e] = t;
        }, r.syncFinished = s.property({
          readOnly: !0,
          value: !1
        }), r.unreadCounversationsCounters = function () {
          return Promise.all([
            r.unreadConversationsCount.get(),
            r.syncRecentsPromise
          ]);
        }, r.apiHandler = t, r.onNewUnconsumedConversationsAdded = n, r;
      }
      return __extends(t, e), t.prototype.joinedRecentlyTo = function (e) {
        var t = 3600000;
        return e.threadProperties ? e.threadProperties.lastleaveat && e.threadProperties.lastjoinat && e.threadProperties.lastleaveat > e.threadProperties.lastjoinat ? !1 : e.threadProperties.lastjoinat && Date.now() - e.threadProperties.lastjoinat < t : !1;
      }, t.prototype.isRemovedConversation = function (e) {
        return e.properties ? e.properties.clearedat : !1;
      }, t.prototype.lastMessageHasContent = function (e) {
        return e.lastMessage && typeof e.lastMessage.content != "undefined";
      }, t.prototype.isValidConversation = function (e) {
        return !f.isFeatureOn(r.COMMON.featureFlags.AGENTS_ENABLED) && c.isAgentConversation(e.id) ? !1 : !f.isFeatureOn(r.COMMON.featureFlags.PSTN_ENABLED) && c.isPstnConversation(e.id) ? !1 : (this.lastMessageHasContent(e) || this.joinedRecentlyTo(e) && !this.isRemovedConversation(e)) && !c.isMeConversation(e.id);
      }, t.prototype.isModelHavingUnreadActivityItems = function (e, t, n) {
        var r = i.get().conversationsManager._getConversation(e.id);
        r || (this.onNewUnconsumedConversationsAdded([e], !0), r = i.get().conversationsManager._getConversation(e.id));
        var s = n ? r.historyService._unreadActivityItemsWithKeywordsCount : r.historyService.unreadActivityItemsCount;
        s.get().then(function (e) {
          t(e > 0);
        });
      }, t.prototype.asynchronouslyFilterOutReadConversations = function (e, t, r) {
        var i = /false/i.test(t.properties.alerts), s = !n.isEmpty(t.properties.alertmatches);
        if (e && (t.isBlocked || i && !s)) {
          r(!1);
          return;
        }
        if (t.id && c.isPstnConversation(t.id)) {
          r(!1);
          return;
        }
        if (h.doesMessageTypeSupportUnreadState(t.lastMessage)) {
          if (t.lastMessage.skypeeditedid) {
            this.isModelHavingUnreadActivityItems(t, r, i && s);
            return;
          }
          var o = typeof t.lastMessage.content != "undefined" && !c.isConversationReadOnServer(t) && !h.isMessageOutgoing(t.lastMessage);
          e && i && s && o ? this.isModelHavingUnreadActivityItems(t, r, !0) : r(o);
          return;
        }
        if (c.isConversationReadOnServer(t)) {
          r(!1);
          return;
        }
        this.isModelHavingUnreadActivityItems(t, r, e && i && s);
      }, t.prototype.updateUnreadConversationsCount = function () {
        var e = this;
        this.conversationUnreadCountUpdateCounter++;
        var t = this.conversationUnreadCountUpdateCounter, n = s.task(), i = s.task();
        this.unreadCounterTask = this.unreadCounterTask && this.unreadCounterTask.promise.state() === "pending" ? this.unreadCounterTask : s.task();
        Promise.all([
          n.promise,
          i.promise
        ]).then(function () {
          v.async.execute(d.publish);
          f.isFeatureOn(r.COMMON.featureFlags.UNREAD_CONVERSATION_DEBUGGER);
          e.unreadCounterTask.promise.state() === "pending" && e.unreadCounterTask.resolve();
        });
        var o = function (r) {
          if (t < e.appliedConversationUnreadCountUpdateCounter)
            return;
          e.appliedConversationUnreadCountUpdateCounter = t;
          e.unreadConversationsCount._set(r.length);
          e._getUnreadConversations._set(r);
          n.resolve();
        };
        this.getItems(this.asynchronouslyFilterOutReadConversations.bind(this, !0), o);
        var u = function (n) {
          if (t < e.appliedConversationAllUnreadCountUpdateCounter)
            return;
          e.appliedConversationAllUnreadCountUpdateCounter = t;
          e._allUnreadConversationsCount._set(n.length);
          e._getAllUnreadConversations._set(n);
          i.resolve();
        };
        this.getItems(this.asynchronouslyFilterOutReadConversations.bind(this, !1), u);
      }, t.prototype.cacheConversations = function (e, t) {
        var n = this, r = [], i = [];
        if (!e.length)
          return;
        b.conversations(e);
        var o = function (e) {
          if (!e)
            return;
          var s = n.cacheItem;
          if (n.isValidConversation(e)) {
            var o = n.getItem(e.id);
            if (o && o === e)
              return;
            o && (n.updateLastMessageWithPropertiesFromCacheIfAny(e), s = n.replaceItem, r.push(e));
            e.timestamp = +new Date(e.lastMessage.originalarrivaltime);
            s(e, e.id);
            t || i.push(n.storeConversation(e));
          }
        };
        e.forEach(o);
        this.updateUnreadConversationsCount();
        i.length ? s.task.waitAll(i).then(this.updateStoredSyncState.bind(this)) : t || this.updateStoredSyncState();
        r.forEach(function (e) {
          n.queueForSynchronization[e.id] && n.syncThread(e.id);
        });
        this.onNewUnconsumedConversationsAdded(this._getNewUnconsumedItems().concat(r));
      }, t.prototype.reduceDataForCaching = function (e) {
        var t = function (e) {
            return e && e.content && p._isDeletedMessage(e.content) && (e.content = ""), e;
          }, r = n.omit(e.lastMessage, "conversationModel"), i = n.omit(e, "lastMessage");
        return i.lastMessage = t(r), i;
      }, t.prototype.updateStoredSyncState = function () {
        g.get().setItem("recentsSyncState", this.syncState);
      }, t.prototype.storeConversation = function (e) {
        return g.get().setSensitiveItem("conv|" + e.id, this.reduceDataForCaching(e));
      }, t.prototype.removeConversationFromStorage = function (e) {
        return g.get().removeItem("conv|" + e);
      }, t.prototype.getFirstTimePopulationPromise = function () {
        return this.firstTimePopulationPromise ? this.firstTimePopulationPromise : (this.firstTimePopulationPromise = g.get().getSensitiveItems(w.CONVERSATION), this.unreadCounversationsCounters(), this.firstTimePopulationPromise);
      }, t.prototype.getOrSyncConversation = function (e) {
        var t = this, n = s.task(), r = this.getItem(e), i = function (r) {
            t.cacheConversations([r.response]);
            n.resolve(t.getItem(e));
          };
        return r ? n.resolve(r) : this.apiHandler.syncConversation(e, i, n.reject.bind(n)), n.promise;
      }, t.prototype.updateConversationProperties = function (e, t, n) {
        for (var r in n)
          n.hasOwnProperty(r) && (e[t][r] = n[r]);
      }, t.prototype.getUnreadConversationsCountCommand = function () {
        var e = this, t = this.firstTimePopulationPromise || this._obtain();
        return this.unreadCounterTask = this.unreadCounterTask || s.task(), Promise.all([
          t,
          this.unreadCounterTask.promise
        ]).then(function () {
          return e.unreadConversationsCount();
        });
      }, t.prototype.syncRecents = function (e, t) {
        var n = this;
        t = t || function () {
        };
        var i = function (e) {
            n.syncState = e;
            u();
          }, s = function (t) {
            n.syncState = t.syncState;
            e(t);
          }, o = function (e) {
            var i = !1;
            try {
              var s = JSON.parse(e.response);
              i = e.status === r.COMMON.httpStatusCodes.badRequest && s.errorCode === r.COMMON.msnpErrors.invalidSyncState;
            } catch (o) {
              t(e);
              return;
            }
            i ? (n.syncState = null, n.updateStoredSyncState(), u()) : t(e);
          }, u = function () {
            n.apiHandler.syncRecents(T(), E, n.syncState).then(s, o);
          };
        this.syncState ? u() : g.get().getItem("recentsSyncState").then(i, u);
      }, t.prototype.resyncAll = function () {
        var e = this;
        if (this.resyncingAll)
          return;
        this.resyncingAll = !0;
        var t = function (n) {
          e.cacheConversations(n.conversations);
          e.onNewUnconsumedConversationsAdded(n.conversations);
          n.hasMoreConversations ? e.syncRecents(t) : e.resyncingAll = !1;
        };
        this.syncRecents(t);
      }, t.prototype.syncAllConversationsCommand = function () {
        var e = s.task(), t = 0, n = function () {
            t--;
            t === 0 && e.resolve();
          };
        for (var r in this.queueForSynchronization)
          this.queueForSynchronization.hasOwnProperty(r) && (t++, this.syncThread(r, n, n));
        return e.promise;
      }, t.prototype.updateSyncAllConversationsCommandState = function () {
        this.syncAllConversationsCommandState(Object.keys(this.queueForSynchronization).length > 0);
      }, t.prototype.syncThread = function (e, t, n) {
        var r = this, i = function (t, n) {
            r.queueInSynchronization[e].forEach(function (e) {
              var r = t ? e.onError : e.onSuccess;
              r && r(n);
            });
            delete r.queueInSynchronization[e];
          };
        delete this.queueForSynchronization[e];
        this.updateSyncAllConversationsCommandState();
        this.queueInSynchronization[e] || (this.queueInSynchronization[e] = [], this.apiHandler.syncThread(e, i.bind(null, !1), i.bind(null, !0)));
        this.queueInSynchronization[e].push({
          onSuccess: t,
          onError: n
        });
      }, t.prototype.queueForSynchronizationIfNeeded = function (e) {
        var t = !!e.members, n = o.isGroupConversation(e.id);
        !t && n && (this.queueForSynchronization[e.id] = e.id, this.updateSyncAllConversationsCommandState());
      }, t.prototype.checkAllConversationsSyncState = function () {
        this.syncFinished._set(!this.serverHasMoreItems && this.conversationsFromCacheSynced);
      }, t.prototype.updateLastMessageWithPropertiesFromCacheIfAny = function (e) {
        var t = this.getItem(e.id), n = e.lastMessage, r = t ? t.lastMessage : null;
        if (!n || !r || n.properties || !r.properties)
          return;
        n.id === r.id && n.originalarrivaltime === r.originalarrivaltime && (n.properties = r.properties);
      }, t.prototype._serverHasMoreItems = function () {
        return this.serverHasMoreItems;
      }, t.prototype._getItemsFromService = function (e, t) {
        var n = this, r = s.task();
        t = t || this.firstTimeAskingService;
        this.firstTimeAskingService = !1;
        var o = function (e) {
            n.onNewItemsLoaded();
            r.reject(e);
          }, u = function (t, i) {
            n.onNewItemsLoaded();
            n.cacheConversations(t, i);
            n.getFirstTimePopulationPromise().then(function () {
              r.promise.state() === "pending" && r.resolve(e ? n._getCachedItems(e) : []);
            });
          }, a = function (r) {
            n.syncRecentsPromiseResolver(r.conversations.length);
            r.hasMoreConversations && t && n._getItemsFromService(e, t);
            i.get()._telemetry.context.timelineLoadStatusCode = r.statusCode;
            u(r.conversations);
            n.serverHasMoreItems = r.hasMoreConversations;
            n.checkAllConversationsSyncState();
          };
        return this.syncRecents(a, o), this.conversationsFromStorageProcessed || (this.conversationsFromStorageProcessed = !0, this.getFirstTimePopulationPromise().then(function (e) {
          e && u(e, !0);
          n.conversationsFromCacheSynced = !0;
          n.checkAllConversationsSyncState();
        })), r.promise;
      }, t.prototype._onItemAddedOrUpdated = function (e) {
        this.cacheConversations([e]);
        this.queueForSynchronization[e.id] && this.syncThread(e.id);
      }, t.prototype._onItemRemoved = function (e) {
        this.removeConversationFromStorage(e);
      }, t.prototype._cacheItem = function (e, t) {
        typeof this.blockedNotCachedYet[t] != "undefined" && (e.isBlocked = this.blockedNotCachedYet[t], delete this.blockedNotCachedYet[t]);
        this.queueForSynchronizationIfNeeded(e);
      }, t.prototype._emptyCache = function () {
        this.clean();
      }, t;
    }(l.CacheBase);
  t.ConversationsCache = N;
  t.build = C;
}));

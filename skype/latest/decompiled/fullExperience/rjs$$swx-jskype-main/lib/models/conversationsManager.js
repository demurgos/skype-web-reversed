(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/conversationsManager", [
      "require",
      "exports",
      "lodash-compat",
      "swx-enums",
      "jskype-constants",
      "jcafe-property-model",
      "./conversation",
      "./conversationsSearchQuery",
      "../../lib/modelHelpers/contacts/contactActivityItemHelper",
      "../../lib/modelHelpers/contacts/contactMessageFactory",
      "../../lib/modelHelpers/personHelper",
      "swx-chat-service",
      "../../lib/modelHelpers/personsAndGroupsHelper",
      "../../lib/modelHelpers/personsRegistry/instance",
      "../../lib/modelHelpers/propertyValidator",
      "../../lib/modelHelpers/contacts/authorizationChange",
      "jskype-settings-instance",
      "swx-constants",
      "../../lib/modelHelpers/contacts/groupHelper",
      "../../lib/services/webapiMapper/conversationApiHandler",
      "../../lib/services/webapiMapper/conversationLiveStateHandler",
      "../../lib/utils/chat/conversationsCache",
      "../../lib/utils/chat/conversationsFactory",
      "swx-mri",
      "swx-mri/lib/mriMaps"
    ], e);
}(function (e, t) {
  var n = e("lodash-compat"), r = e("swx-enums"), i = e("jskype-constants"), s = e("jcafe-property-model"), o = e("./conversation"), u = e("./conversationsSearchQuery"), a = e("../../lib/modelHelpers/contacts/contactActivityItemHelper"), f = e("../../lib/modelHelpers/contacts/contactMessageFactory"), l = e("../../lib/modelHelpers/personHelper"), c = e("swx-chat-service"), h = e("../../lib/modelHelpers/personsAndGroupsHelper"), p = e("../../lib/modelHelpers/personsRegistry/instance"), d = e("../../lib/modelHelpers/propertyValidator"), v = e("../../lib/modelHelpers/contacts/authorizationChange"), m = e("jskype-settings-instance"), g = e("swx-constants"), y = e("../../lib/modelHelpers/contacts/groupHelper"), b = e("../../lib/services/webapiMapper/conversationApiHandler"), w = e("../../lib/services/webapiMapper/conversationLiveStateHandler"), E = e("../../lib/utils/chat/conversationsCache"), S = e("../../lib/utils/chat/conversationsFactory"), x = e("swx-mri"), T = e("swx-mri/lib/mriMaps"), N = i.PEOPLE.authorizationStates, C = c.utils.conversationMetadataStore, k = "skype://", L = function () {
      function e() {
        var e = this;
        this.conversationAPIHandler = new b["default"](this);
        this.getMoreConversationsCommandState = s.boolProperty(!0);
        this.conversationsStore = s.collection({ get: this.getAllConversationsCommand.bind(this) });
        this.allConversations = s.collection();
        this.conversationsCacheInstance = E.build(this.conversationAPIHandler, this.addConversationsSync.bind(this));
        this.conversationsFactory = new S["default"](this.conversationAPIHandler);
        this.previousContactFavorites = [];
        this.onManagerReadyForContactFavorites = n.once(this.initializeFavorites.bind(this));
        this.conversations = this.conversationsStore.fork({
          add: this.addConversationCommand.bind(this),
          remove: this.removeConversationCommand.bind(this)
        });
        this.getMoreConversations = s.command(this.getMoreConversationsCommand.bind(this), this.getMoreConversationsCommandState);
        this.unreadConversationsCount = this.conversationsCacheInstance.unreadConversationsCount;
        this._allConversations = this.conversationsCacheInstance.getAllItems;
        this._allUnreadConversationsCount = this.conversationsCacheInstance._allUnreadConversationsCount;
        this._unreadConversations = this.conversationsCacheInstance._getUnreadConversations;
        this._allUnreadConversations = this.conversationsCacheInstance._getAllUnreadConversations;
        this._conversationsSynced = this.conversationAPIHandler.addConversationsCollectionTask;
        this._unreadCounversationsCounters = this.conversationsCacheInstance.unreadCounversationsCounters;
        this._conversationBlockedUpdate = this.conversationsCacheInstance.conversationBlockedUpdate;
        this.createSearchQuery = function () {
          return new u["default"](e.conversationsCacheInstance);
        };
        this.createConversation = function () {
          var t = new o["default"](e.conversationAPIHandler, !0, null);
          t.historyService.getMoreActivityItems.enabled._set(!1);
          var n = function (n) {
              t.historyService.getMoreActivityItems.enabled._set(!0);
              t.conversationId = n;
              t._topicSetEnabled(!0);
              t._conversationIdReady(!0);
              e.conversations.add(t, n);
              e.conversationAPIHandler.syncThread(n);
              t.selfParticipant.role._set(r.participantRole.Leader);
            }, i = function () {
            };
          return e.conversationAPIHandler.createConversation(t, n, i), t;
        };
        this.getConversation = function (t) {
          e.registry.get(t.id()) || e.registry.add(t);
          var n = function () {
              var n = x.getKey(t.id(), t._type()), r = e._getConversation(n);
              if (!r) {
                r = e.conversationsFactory.createByPerson(t);
                var i = e.conversationsCacheInstance.getItem(n);
                i && r._update(i);
                e.allConversations.add(r, r.conversationId);
              }
              return r;
            }, r = n();
          return e.addContactActivityItem(t, r), r;
        };
        this.getConversationByUri = function (t) {
          if (typeof t != "string")
            throw new TypeError("expected uri to be a string");
          var n = t.replace(k, "");
          if (d.is1to1Conversation(n))
            return undefined;
          var r = d.isPhoneNumber(n);
          if (!d.isGroupConversation(n) && !r)
            throw new Error("expected valid conversation uri");
          var i = e.allConversations(n);
          if (!i) {
            if (r)
              return e.createPstnConversation(n);
            i = new o["default"](e.conversationAPIHandler, !0, n);
            e.conversations.add(i);
            e.conversationAPIHandler.joinConversation(i);
          } else if (!i.leave.enabled()) {
            var s = function (t) {
              if (!!t.members) {
                e.conversationAPIHandler.joinConversation(t);
                return;
              }
              e.conversationAPIHandler.syncThread(t.conversationId, function () {
                t.leave.enabled() || e.conversationAPIHandler.joinConversation(t);
              });
            };
            s(i);
          }
          return i;
        };
        this._getConversationByUri = function (t) {
          var n;
          if (typeof t != "string")
            return Promise.reject(new TypeError("expected uri to be a string"));
          var r = t.replace(k, ""), i = d.isPhoneNumber(r), s = d.isGroupConversation(r), u = d.is1to1Conversation(r), a = function (t, s) {
              if (!n && i) {
                n = e.createPstnConversation(r);
                t();
                return;
              }
              if (!n) {
                n = new o["default"](e.conversationAPIHandler, !0, r);
                e.conversations.add(n);
                e.conversationAPIHandler.joinConversation(n, !0).then(t, s);
                return;
              }
              if (!!n.members) {
                e.conversationAPIHandler.joinConversation(n, !0).then(t, s);
                return;
              }
              e.conversationAPIHandler.syncThread(n.conversationId).then(function () {
                n.leave.enabled() ? t() : e.conversationAPIHandler.joinConversation(n, !0).then(t, s);
              }, s);
            };
          return s || i ? (n = e.allConversations(r), new Promise(function (e, t) {
            function r() {
              e(n);
            }
            a(r, t);
          })) : u ? new Promise(function (r) {
            n = e._getOrCreateConversation(t);
            n.participants().length && e.addContactActivityItem(n.participants(0).person, n);
            e.conversations.add(n);
            r(n);
          }) : Promise.reject(new Error("expected valid conversation uri"));
        };
        this._onlineStateChanged = function () {
          e.conversationsStore().forEach(function (e) {
            e._onlineStateChanged();
          });
        };
        this._init = function () {
          e.conversationAPIHandler.init();
          e.conversationsCacheInstance._init();
          e.conversationsCacheInstance.get(0);
          e.registry = p.build();
        };
        this._reset = function () {
          return e.conversationAPIHandler.reset().then(function () {
            e.conversationsCacheInstance = E.build(e.conversationAPIHandler, e.addConversationsSync.bind(e));
            y.unsubscribeFromGroup(r.groupType.Favorites, e.updateFavoritesFromContactGroup);
            e.getMoreConversationsCommandState(!0);
            e.conversationsStore.empty();
            e.allConversations.empty();
            p.reset();
            e.registry = null;
          });
        };
        this._getConversation = function (t) {
          return e.allConversations(t);
        };
        this._getOrCreateConversation = function (t) {
          return e._getConversation(t) || e.createConversationInternal(t);
        };
        this._handleNewMessage = function (t, n) {
          var r = e._getOrCreateConversation(t);
          e.addToConversationsStore(r);
          e.conversationsCacheInstance.handleNewMessage(t, n);
          r.historyService._processRawMessage(n);
        };
        this._handleUpdatedMessage = function (t, n) {
          var r = e._getOrCreateConversation(t);
          e.addToConversationsStore(r);
          e.conversationsCacheInstance.handleUpdatedMessage(t, n);
          r.historyService._processRawMessage(n, !1, !0);
        };
        this._conversationPropertiesUpdated = function (t) {
          e.updateConversation("_updateConversationProperties", t);
        };
        this._threadPropertiesUpdated = function (t) {
          e.updateConversation("_updateThreadProperties", t);
        };
        this._setMessageCopiedToCache = function (t) {
          m.isFeatureOn(g.COMMON.featureFlags.CONTEXT_MENU_COPY_MESSAGES_ENABLED) && (e.cachedCopiedMessage = t);
        };
        this._getMessageCopiedToCache = function () {
          return m.isFeatureOn(g.COMMON.featureFlags.CONTEXT_MENU_COPY_MESSAGES_ENABLED) ? e.cachedCopiedMessage : undefined;
        };
        this.__processConversation = function (t, r) {
          var i = e._getConversation(t.id), s = function () {
              if (!i.historyService._lastMessageFromServer || i.historyService._lastMessageFromServer._actualId !== t.lastMessage.id)
                C.clear(i.conversationId), i.historyService._reset();
              i._update(t);
            }, o = function () {
              n.isEmpty(t.lastMessage) || i.historyService._processRawMessage(t.lastMessage, !0);
              if (!i.isGroupConversation()) {
                var e = i.participants()[0].person;
                u(e);
              }
            }, u = function (e) {
              var t, n = i.lastModificationTimestamp(), r = new Date(n.getTime() + 1000);
              e.isBlocked() ? (a.clearUnblockContactActivityItems(i), t = f.getUnblockContact(e, r), i.historyService._processRawMessage(t)) : l.canRequestContactAuthorization(e) && (e._authorization() === N.UNAUTHORIZED ? (a.clearContactRequestActivityItems(i), t = f.getOutgoing(e, r), i.historyService._processRawMessage(t)) : e._authorization() === N.PENDING_OUTGOING ? (a.clearContactRequestActivityItems(i), t = f.getOutgoingResend(e, r), i.historyService._processRawMessage(t)) : e._authorization() === N.SUGGESTED && (a.clearContactRequestActivityItems(i), t = f.getSuggested(e, r), i.historyService._processRawMessage(t)));
            };
          i ? s() : i = e.createConversationInternal(t.id);
          e.conversationAPIHandler.addConversationsCollectionTask.promise.then(o);
          r ? e.addConversationToCollection(e.allConversations, i) : e.addToConversationsStore(i);
          w.updateNGCCallState(t.id, t.threadProperties);
        };
        this.updateFavoritesFromContactGroup = function () {
          var t = n.map(y.getPersonsFromGroup(r.groupType.Favorites), function (e) {
              return { id: x.getKey(e.id(), e._type()) };
            }), i = n.filter(e.previousContactFavorites, function (e) {
              return !n.some(t, e);
            });
          e.onFavoriteConversationReceived(t, i);
          e.previousContactFavorites = t || [];
        };
      }
      return e.prototype.updateConversation = function (e, t) {
        var n = this._getConversation(t.id);
        n && n[e](t);
        this.conversationsCacheInstance.conversationUpdated(t);
      }, e.prototype.addToConversationsStore = function (e) {
        this.conversationsStore(e.conversationId) || this.conversationsStore.add(e, e.conversationId);
      }, e.prototype.addConversationCommand = function (e) {
        this.addConversationToCollection(this.conversationsStore, e);
        this.addConversationToCollection(this.allConversations, e);
      }, e.prototype.addConversationToCollection = function (e, t) {
        try {
          n.isNumber(e.index(t.conversationId)) || e.add(t, t.conversationId);
        } catch (r) {
        }
      }, e.prototype.removeConversationCommand = function (e, t) {
        var n = s.task();
        m.isFeatureOn(g.COMMON.featureFlags.FAVORITES_CONVERSATION_ENABLED) && e._isFavorited() && e._isFavorited(!1);
        if (t === r.activityType.ContactRequestIncoming) {
          var i = e.participants()[0].person;
          v.sendDeclineRequest(i).then(n.resolve.bind(n), n.reject.bind(n));
        } else
          this.conversationsStore.remove(e.conversationId), this.allConversations.remove(e.conversationId), this.conversationsCacheInstance.onItemRemoved(e.conversationId), n.resolve();
        return n.promise;
      }, e.prototype.getAllConversationsCommand = function () {
        var e = this;
        return this.getAllConversationsTask ? this.getAllConversationsTask.promise : (this.getAllConversationsTask = s.task(), this.conversationsCacheInstance.syncFinished.once(!0, function () {
          e.getAllConversationsTask.resolve(e.conversationsStore());
          e.onManagerReadyForContactFavorites();
        }), this.getAllConversationsTask.promise);
      }, e.prototype.createConversationInternal = function (e) {
        var t = this.conversationsFactory.createById(e), n = this.conversationsCacheInstance.getConversation(e);
        return n && t._update(n), this.allConversations.add(t, t.conversationId), t;
      }, e.prototype.createPstnConversation = function (e) {
        var t = T.contactMriTypes.pstn + ":", n = e.replace(t, ""), r = new o["default"](this.conversationAPIHandler, !1, e), i = h.getPerson(n, T.contactMriTypes.pstn);
        return r._addParticipant(i), r.topic = i.displayName, this.conversations.add(r), r;
      }, e.prototype.addConversationsSync = function (e, t) {
        var n = this;
        e.reverse().forEach(function (e) {
          n.__processConversation(e, t);
        });
      }, e.prototype.handleReceivedConversations = function (e, t, n) {
        var r = this.conversationsStore.size();
        this.addConversationsSync(n);
        var i = this.conversationsStore.size() - r, s = e - i;
        s > 0 && this.conversationsCacheInstance.hasMoreItems() ? this.getConversationsFromCache(s, t) : t.resolve();
        this.conversationsCacheInstance.hasMoreItems() || this.getMoreConversationsCommandState.set(!1);
      }, e.prototype.getConversationsFromCache = function (e, t) {
        this.conversationsCacheInstance.get(e).then(this.handleReceivedConversations.bind(this, e, t), t.reject.bind(t));
      }, e.prototype.getMoreConversationsCommand = function (e) {
        var t = this, n = this.getMoreConversationsTask;
        return n ? n.promise : (n = this.getMoreConversationsTask = s.task(), this.getMoreConversationsTask.promise["finally"](function () {
          t.getMoreConversationsTask = null;
          t.onManagerReadyForContactFavorites();
        }), this.getConversationsFromCache(e, n), n.promise);
      }, e.prototype.onFavoriteConversationReceived = function (e, t) {
        var r = this, i = e || [], s = t || [];
        n.forEach(i, function (e) {
          var t = r._getOrCreateConversation(e.id);
          t._isFavorited._set(!0);
          n.indexOf(r.conversations(), t) === -1 && r.conversations.add(t);
        });
        n.forEach(s, function (e) {
          var t = r._getOrCreateConversation(e.id);
          t._isFavorited._set(!1);
        });
      }, e.prototype.filterFavorites = function (e, t) {
        t(e.properties.favorite && e.properties.favorite === "true");
      }, e.prototype.initializeFavorites = function () {
        if (!m.isFeatureOn(g.COMMON.featureFlags.FAVORITES_CONVERSATION_ENABLED))
          return;
        this.conversationsCacheInstance.getItems(this.filterFavorites, this.onFavoriteConversationReceived.bind(this));
        y.subscribeToGroup(r.groupType.Favorites, this.updateFavoritesFromContactGroup);
      }, e.prototype.addContactActivityItem = function (e, t) {
        var n = f.getActivityItemForInitialConversationLoad(e, t);
        n && t.historyService._processRawMessage(n);
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = L;
}));

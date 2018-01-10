(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/historyService", [
      "require",
      "exports",
      "jcafe-property-model",
      "lodash-compat",
      "swx-constants",
      "swx-chat-service/lib/constants",
      "../../lib/utils/chat/message",
      "../../lib/utils/chat/generator",
      "../../lib/utils/chat/editMessageHandler",
      "jskype-settings-instance",
      "swx-log-tracer",
      "swx-enums",
      "../../lib/services/annotations/main",
      "swx-utils-chat"
    ], e);
}(function (e, t) {
  var n = e("jcafe-property-model"), r = e("lodash-compat"), i = e("swx-constants"), s = e("swx-chat-service/lib/constants"), o = e("../../lib/utils/chat/message"), u = e("../../lib/utils/chat/generator"), a = e("../../lib/utils/chat/editMessageHandler"), f = e("jskype-settings-instance"), l = e("swx-log-tracer"), c = e("swx-enums"), h = e("../../lib/services/annotations/main"), p = e("swx-utils-chat"), d = [
      c.activityType.ParticipantHistoryDisclosed,
      c.activityType.ParticipantJoiningEnabled,
      c.activityType.ParticipantTopicUpdate
    ], v, m = function () {
      function e(e, t, r) {
        var s = this;
        this.markAllAsReadCommandState = n.boolProperty(!0);
        this.historyDisclosedChainTask = n.task();
        this.removeAllCommandState = n.boolProperty(!0);
        this._messagesWithUnseenHearts = n.collection();
        this.hiddenMessageNumber = 0;
        this.hiddenTypesMapper = {};
        this.newChunkOfMessages = !1;
        this._activityItemsInternal = n.collection({
          subscribed: function () {
          },
          unsubscribed: this.handleActivityItemUnSubscribed.bind(this)
        });
        this.getMoreActivityItems = n.command(this.getMoreActivityItemsCommand.bind(this), n.boolProperty(!0));
        this.markAllAsRead = n.command(this.markAllAsReadCommand.bind(this), this.markAllAsReadCommandState);
        this.historyDisclosedCommandEnabled = n.property({ value: !1 });
        this.isHistoryDisclosed = n.property({
          value: !1,
          set: n.command(this.setHistoryDisclosed.bind(this), this.historyDisclosedCommandEnabled)
        });
        this.removeAll = n.command(this.removeAllCommand.bind(this), this.removeAllCommandState);
        this._reset = function () {
          s._activityItemsInternal.empty();
          s.messageCache.reset(!0);
          s.getMoreActivityItems.enabled._set(!0);
        };
        this._removeMessage = function (e) {
          var t = e.key() + "";
          s.messageCache.onItemRemoved(t);
          s.removeMessage(t);
        };
        this._addOutgoingMessage = function (e) {
          return s.addMessage(e);
        };
        this._processRawMessage = function (e, t, n, r) {
          if (!e.id)
            return;
          s.messageCache.getItem(e.id) ? s.messageCache.onItemUpdated(e) : n || s.messageCache.onItemAdded(e);
          s.processMessage(e, t, n);
          !t && !n && !r && s.markConversationAsReadIfMessageIsSystem(e);
        };
        this._updateReadStatusFromServer = function () {
          s.messageCache.onConsumptionHorizonChanged();
          s._activityItemsInternal().forEach(function (e) {
            e.isRead._set(o.isMessageReadOnServer(s.conversation._consumptionHorizon, e.key(), e.timestamp().getTime()));
          });
        };
        this.getMessagesFromCache = function (e, t) {
          s.messageCache.get(e).then(s.handleMessagesReceived.bind(s, e, t))["catch"](t.reject.bind(t));
        };
        this.apiHandler = t;
        this.conversation = r;
        this.messageCache = new e(t, r);
        v || (f.isFeatureOn(i.COMMON.featureFlags.UNREAD_MSG_LOGGING) ? v = l.getLogger("unread-msgs") : v = {
          error: function () {
          },
          warn: function () {
          },
          info: function () {
          },
          log: function () {
          },
          debug: function () {
          }
        });
        this.historyDisclosedChainTask.resolve();
        this.activityItems = this._activityItemsInternal.sort(this.byTimestamp);
        this.unreadActivityItemsCount = this.messageCache.unreadActivityItemsCount;
        this._unreadActivityItemsWithKeywordsCount = this.messageCache._unreadActivityItemsWithKeywordsCount;
        this.isGuestHostConversation = p.conversation.isGuestHostConversation(r.conversationId);
        this.isHidingSystemMessagesEnabled = f.isFeatureOn(i.COMMON.featureFlags.HIDE_SYSTEM_MESSAGES);
        this.hiddenTypesMapper[c.activityType.ParticipantHistoryDisclosed] = 0;
        this.hiddenTypesMapper[c.activityType.ParticipantJoiningEnabled] = 1;
      }
      return e.prototype.markConversationAsReadIfMessageIsSystem = function (e) {
        if (this.messageCache.unreadActivityItemsCount() === 0 && !o.isMessageReadOnServer(this.conversation._consumptionHorizon, e.key, e.timestamp) && !o.isMessageOutgoing(e) && !o.doesMessageTypeSupportUnreadState(e)) {
          var t = this._activityItemsInternal(e.key);
          t && this.apiHandler.setConsumptionHorizonToMessage(this.conversation, t);
        }
      }, e.prototype.addMessage = function (e) {
        try {
          this._activityItemsInternal.add(e, e.key() + "");
        } catch (t) {
          return !1;
        }
        return !0;
      }, e.prototype.removeMessage = function (e) {
        var t = this._activityItemsInternal(e + "");
        t && this._activityItemsInternal.remove(e + "");
      }, e.prototype.handleActivityItemUnSubscribed = function () {
        var e = this.activityItems();
        for (var t = 0; t < e.length - 1; t++)
          this.removeMessage(e[t].key());
        this.messageCache.reset();
        this.getMoreActivityItems.enabled._set(!0);
      }, e.prototype.setHistoryDisclosed = function (e) {
        var t = this, r = n.task(), i = this.isHistoryDisclosed, s = function () {
            r.resolve(e);
          }, o = function () {
            i() === e ? r.resolve(e) : t.apiHandler.historyDisclosed(t.conversation.conversationId, e, s, r.reject.bind(r));
          };
        return this.historyDisclosedChainTask.promise.then(o, o), this.historyDisclosedChainTask = r, r.promise;
      }, e.prototype.isConversationMissingConsumptionHorizon = function () {
        return this.conversation._consumptionHorizon.lastReadMessageId === 0 && this.conversation._consumptionHorizon.lastReadMessageTimestamp === 0 && this.conversation._consumptionHorizon.modificationTime === 0;
      }, e.prototype.markAllAsReadCommand = function (e) {
        var t = this;
        v.log("historyService.markAllAsReadCommand:", this.conversation.conversationId);
        var n = function () {
            var n = e && e.length, r = n ? e.reverse()[0] : t.activityItems().reverse()[0];
            if (!r)
              return;
            n ? e.forEach(function (e) {
              e.isRead() || e.isRead._set(!0);
            }) : t._activityItemsInternal().forEach(function (e) {
              e.isRead._set(!0);
            });
            if (!t.isConversationMissingConsumptionHorizon() && o.isMessageReadOnServer(t.conversation._consumptionHorizon, r.key(), r.timestamp().getTime()))
              return;
            var i = !r.direction || r.direction().toLowerCase() !== c.direction.Outgoing.toLowerCase();
            if (i || t.messageCache.unreadActivityItemsCount() > 0)
              v.log("historyService.setConsumptionToLastMessage:", t.conversation.conversationId), t.apiHandler.setConsumptionHorizonToMessage(t.conversation, r);
          }, r = function () {
            if (t.activityItems().length === 0) {
              if (t.getMoreActivityItems.enabled())
                return t.getMoreActivityItems(1).then(r);
            } else
              n();
          };
        r();
      }, e.prototype.removeAllCommand = function () {
        var e = this;
        if (this.removeAllTask)
          return this.removeAllTask.promise;
        this.removeAllTask = n.task();
        var t = function () {
          e.messageCache.reset();
          e._activityItemsInternal.empty();
          e.removeAllTask.resolve();
        };
        return this.removeAllTask.promise["finally"](function () {
          e.removeAllTask = null;
        }), this.apiHandler.removeAllMessages(this.conversation.conversationId, t, this.removeAllTask.reject.bind(this.removeAllTask)), this.removeAllTask.promise;
      }, e.prototype.handleMessagesReceived = function (e, t, n) {
        var r = this.activityItems.size(), i = [];
        n.forEach(function (e) {
          var t = i.filter(function (t) {
            return t.clientmessageid === e.clientmessageid && !t.skypeeditedid && !!e.clientmessageid;
          });
          t.length || i.push(e);
        });
        this.addMessageCollectionSync(i);
        var s = this.activityItems.size() - r, o = e - s;
        o > 0 && this.messageCache.hasMoreItems() ? this.getMessagesFromCache(o, t) : t.resolve();
        this.messageCache.hasMoreItems() || this.getMoreActivityItems.enabled._set(!1);
      }, e.prototype.getMoreActivityItemsCommand = function (e) {
        var t = this, r = this.getMoreActivityItemsTask;
        return r ? r.promise : (r = this.getMoreActivityItemsTask = n.task(), this.getMoreActivityItemsTask.promise["finally"](function () {
          t.getMoreActivityItemsTask = null;
        }), this.getMessagesFromCache(e, r), r.promise);
      }, e.prototype.addMessageCollectionSync = function (e) {
        var t = this;
        this.newChunkOfMessages = !0;
        r.forEach(e, function (e) {
          t.processMessage(e);
        });
      }, e.prototype.byTimestamp = function (e, t) {
        return e.timestamp() < t.timestamp();
      }, e.prototype.isContactRequestOutgoingItem = function (e) {
        return e === c.activityType.ContactRequestOutgoing || e === c.activityType.ContactRequestOutgoingAgent;
      }, e.prototype.updateLastModificationTimestamp = function (e) {
        if (this.isContactRequestOutgoingItem(e.type()))
          return;
        e.timestamp && e.timestamp() > this.conversation.lastModificationTimestamp() && (this.conversation.lastModificationTimestamp._set(e.timestamp()), this._lastMessageFromServer = e);
      }, e.prototype.replaceMessage = function (e, t) {
        this._removeMessage(e);
        this.addMessage(t);
      }, e.prototype.applyEditIfIsNewest = function (e, t) {
        var n = this.messageCache.getMostRecentEditForMessage(e._id);
        n && t.timestamp() >= n.timestamp && a.handleMessageEdit({ replaceMessage: this.replaceMessage.bind(this) }, e, t);
      }, e.prototype.editOriginalMessageIfSomeEditAvailable = function (e) {
        var t = this.messageCache.getMostRecentEditForMessage(e._id);
        if (t) {
          var n = u.activityFromRawMessage(t, this.conversation);
          a.handleMessageEdit({ replaceMessage: this.replaceMessage.bind(this) }, e, n);
        }
      }, e.prototype.addMessageWithUnseenHeart = function (e, t) {
        var n = t.key(), r = h["default"].getLastPersonFromProperty(t, s.MESSAGE_PROPERTIES.PER_USER.EMOTIONS, i.COMMON.emotionTypes.HEART);
        this._messagesWithUnseenHearts(n) && this._messagesWithUnseenHearts.remove(n);
        var o = {
          id: n,
          timestamp: e,
          type: t.type,
          html: t.html,
          text: t.text,
          sender: t.sender,
          person: r,
          isDeleted: t.isDeleted
        };
        this._messagesWithUnseenHearts.add(o, n);
      }, e.prototype.collectUnseenHeartsIfAny = function (e) {
        var t = h["default"].getMessagePropertyLastTimestamp(e, s.MESSAGE_PROPERTIES.PER_USER.EMOTIONS, i.COMMON.emotionTypes.HEART), n = e.key();
        if (this.isMessageWithUnseenHeart(e, this.conversation))
          this.addMessageWithUnseenHeart(t, e);
        else if (this._messagesWithUnseenHearts(n)) {
          var r = this._messagesWithUnseenHearts(n).timestamp;
          (!t || t < r) && this._messagesWithUnseenHearts.remove(n);
        }
      }, e.prototype.isMessageWithUnseenHeart = function (e, t) {
        return h["default"].isMessagePropertyUnseen(e, s.MESSAGE_PROPERTIES.PER_USER.EMOTIONS, i.COMMON.emotionTypes.HEART, t._consumptionHorizon.modificationTime);
      }, e.prototype.processMessage = function (e, t, n) {
        var i = this, s;
        e.content = e.content || "";
        try {
          s = u.activityFromRawMessage(e, this.conversation);
        } catch (o) {
          l.getLogger("failed-msgs").log("historyService.processMessage: failed to get activity item for message", e.id, this.conversation.conversationId, o.stack);
          return;
        }
        if (this.isGuestHostConversation && this.isHidingSystemMessagesEnabled) {
          if (this.shouldHideSystemMessage) {
            if (this.authorOfHiddenMessages === s.author && s.type() === d[this.hiddenMessageNumber]) {
              this.hiddenMessageNumber++;
              this.shouldHideSystemMessage = this.hiddenMessageNumber < d.length;
              this.newChunkOfMessages = !1;
              return;
            }
            this.shouldHideSystemMessage = !1;
          }
          if (this.newChunkOfMessages && s.type() === c.activityType.ParticipantJoined)
            this.shouldHideSystemMessage = !0, this.authorOfHiddenMessages = s.author, this.hiddenMessageNumber = 0;
          else if (this.newChunkOfMessages && !r.isUndefined(this.hiddenTypesMapper[s.type()]) && s.context()) {
            this.hiddenMessageNumber = d.indexOf(s.type()) + 1;
            this.authorOfHiddenMessages = s.author;
            this.shouldHideSystemMessage = !0;
            this.newChunkOfMessages = !1;
            return;
          }
        }
        this.newChunkOfMessages = !1;
        var f = this._activityItemsInternal(s.key()), h = function () {
            f._id = s._id;
            f.timestamp._set(s.timestamp());
            i.removeMessage(f.key());
            i.addMessage(f);
          }, p = function () {
            var e = function (e) {
                return e._isOriginal && e._isOriginal();
              }, n = function (e) {
                return e.isDeleted && !!e.isDeleted() ? !0 : e.isEdited && !!e.isEdited() ? !0 : !1;
              }, r = e(f) && e(s), o = !e(f) && e(s), u = !n(s) && n(f);
            if (s.type() !== f.type()) {
              s.timestamp() - f.timestamp() >= 0 && a.handleMessageEdit({ replaceMessage: i.replaceMessage.bind(i) }, f, s);
              return;
            }
            if (u) {
              h();
              return;
            }
            if (r && !t) {
              f._updateAllProperties(s);
              return;
            }
            if (o && !t) {
              f._updateAllProperties(s);
              return;
            }
            i.applyEditIfIsNewest(f, s);
          }, v = function () {
            if (s._isFromPolling)
              return;
            h();
            f._updateAllProperties(s);
          };
        if (f) {
          if (s.sender !== f.sender)
            return;
          var m = s.isEdited && !s.isEdited() && s.isDeleted && !s.isDeleted(), g = s._id !== f._id, y = f._originalContent !== s._originalContent;
          if (m && g && y) {
            v();
            return;
          }
          p();
          this.collectUnseenHeartsIfAny(f);
        } else if (!e.skypeeditedid) {
          if (n === !0 && !t) {
            this.collectUnseenHeartsIfAny(s);
            return;
          }
          this.addMessage(s);
          this.editOriginalMessageIfSomeEditAvailable(s);
        }
        this.updateLastModificationTimestamp(s);
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = m;
}));

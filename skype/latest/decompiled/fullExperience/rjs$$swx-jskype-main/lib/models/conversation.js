(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/models/conversation", [
      "require",
      "exports",
      "swx-jskype-internal-application-instance",
      "swx-browser-globals",
      "swx-constants",
      "jcafe-property-model",
      "../../lib/modelHelpers/propertyModelHelper",
      "../../lib/modelHelpers/propertyValidator",
      "../../lib/modelHelpers/personsAndGroupsHelper",
      "../../lib/utils/chat/parser",
      "../../lib/modelHelpers/calling/callData",
      "../../lib/modelHelpers/calling/internalCallTelemetry",
      "./capabilities",
      "./participant",
      "./chatService",
      "./audioService",
      "./videoService",
      "./screenSharingService",
      "./historyService",
      "./fileTransferService",
      "../../lib/services/calling/autoCalling",
      "../../lib/services/spaces",
      "../../lib/utils/chat/conversation",
      "../../lib/utils/chat/messagesCache",
      "jskype-constants",
      "jskype-settings-instance",
      "swx-enums",
      "../../lib/modelHelpers/calling/pstnEventsHandler",
      "../../lib/modelHelpers/calling/pstnActivityItemAdder",
      "../../lib/utils/chat/generator",
      "../../lib/services/asyncMedia/main",
      "swx-mri",
      "swx-mri/lib/mriMaps",
      "swx-utils-chat"
    ], e);
}(function (e, t) {
  var n = e("swx-jskype-internal-application-instance"), r = e("swx-browser-globals"), i = e("swx-constants"), s = e("jcafe-property-model"), o = e("../../lib/modelHelpers/propertyModelHelper"), u = e("../../lib/modelHelpers/propertyValidator"), a = e("../../lib/modelHelpers/personsAndGroupsHelper"), f = e("../../lib/utils/chat/parser"), l = e("../../lib/modelHelpers/calling/callData"), c = e("../../lib/modelHelpers/calling/internalCallTelemetry"), h = e("./capabilities"), p = e("./participant"), d = e("./chatService"), v = e("./audioService"), m = e("./videoService"), g = e("./screenSharingService"), y = e("./historyService"), b = e("./fileTransferService"), w = e("../../lib/services/calling/autoCalling"), E = e("../../lib/services/spaces"), S = e("../../lib/utils/chat/conversation"), x = e("../../lib/utils/chat/messagesCache"), T = e("jskype-constants"), N = e("jskype-settings-instance"), C = e("swx-enums"), k = e("../../lib/modelHelpers/calling/pstnEventsHandler"), L = e("../../lib/modelHelpers/calling/pstnActivityItemAdder"), A = e("../../lib/utils/chat/generator"), O = e("../../lib/services/asyncMedia/main"), M = e("swx-mri"), _ = e("swx-mri/lib/mriMaps"), D = e("swx-utils-chat"), P = i.COMMON.conversation.TOPIC_DELIMITER, H = T.PEOPLE.authorizationStates, B = null, j = {
      admin: C.participantRole.Leader,
      user: C.participantRole.Attendee
    }, F = {
      PICTURE: "picture",
      AUTOCALLING: "autoCalling",
      JOINING_ENABLED: "joiningenabled",
      HISTORY_DISCLOSED: "historydisclosed"
    }, I = function () {
      function e(e, t, r) {
        var u = this;
        this.participantsStore = s.collection();
        this.topicSubscriptions = [];
        this.updatingGeneratedTopic = !1;
        this.mePerson = n.get().personsAndGroupsManager.mePerson;
        this.pendingInvitationsInternal = s.collection();
        this.joiningCommandEnabled = s.property({ value: !1 });
        this.sendPollCommandEnabled = s.property({ value: !1 });
        this.favoritingCommandEnabled = s.property({ value: !1 });
        this.sendContactInfoCommandEnabled = s.boolProperty(!1);
        this.amParticipatingInConversation = !0;
        this.addParticipantCommandEnabled = s.property({ value: !1 });
        this.removeParticipantCommandEnabled = s.property({ value: !1 });
        this.joiningEnabledChainTask = s.task().resolve();
        this.setFavoriteChainTask = s.task().resolve();
        this.setTopicCommandProperty = s.boolProperty(!1);
        this.setTopicCommand = s.command(this.setTopic.bind(this), this.setTopicCommandProperty);
        this.pstnEventListener = k.build(L.build());
        this.isFavoritesFlagOn = N.isFeatureOn(i.COMMON.featureFlags.FAVORITES_CONVERSATION_ENABLED);
        this.threadPropertiesUpdateSubscribers = [];
        this.escalatedParticipants = [];
        this._isAlive = !1;
        this.avatarUrl = s.property({ value: B });
        this.topic = s.property({
          set: this.setTopicCommand,
          value: ""
        });
        this.spawnedConversation = s.property({ readOnly: !0 });
        this.uri = s.property({
          readOnly: !0,
          get: this.uriGetter.bind(this)
        });
        this.participantsCount = this.participantsStore.size;
        this._topicSetEnabled = s.boolProperty(!1);
        this._conversationIdReady = s.boolProperty(!1);
        this._callPayload = {};
        this._botsSettings = {};
        this.autoCall = s.boolProperty(!1);
        this.activeModalities = new h["default"]();
        this.lastModificationTimestamp = s.property({
          readOnly: !0,
          value: null
        });
        this.isJoiningEnabled = s.property({
          value: !1,
          set: s.command(this.setJoiningEnabled.bind(this), this.joiningCommandEnabled)
        });
        this.pendingInvitations = this.pendingInvitationsInternal.asWritable({
          add: s.command(this.addInvitationCommand.bind(this), s.boolProperty(!0)),
          remove: s.command(this.removeInvitationCommand.bind(this), this.activeModalities.chat)
        });
        this.mediaConnectionType = s.property({ value: C.mediaConnectionType.Unknown });
        this.sendPollMessage = s.command(this.sendPollCommand.bind(this), this.sendPollCommandEnabled);
        this.sendContactInfo = s.command(this.sendContactInfoCommand.bind(this), this.sendContactInfoCommandEnabled);
        this.acknowledge = s.enabledCommand(function () {
          return o.createResolvedPromise();
        });
        this._properties = {};
        this._consumptionHorizon = {
          lastReadMessageTimestamp: 0,
          modificationTime: 0,
          lastReadMessageId: 0
        };
        this._callData = l.build();
        this._internalCallTelemetry = c.build();
        this._notificationsEnabled = s.boolProperty(!0);
        this._updateThreadPropertiesSubscription = {
          add: this.addUpdateThreadPropertiesSubscription.bind(this),
          remove: this.removeUpdateThreadPropertiesSubscription.bind(this)
        };
        this._onlineStateChanged = function () {
          u.updateChatModality();
          u.audioService.start.enabled._set(u.apiHandler.isOnline());
        };
        this._setCallHandler = function (e) {
          u._callHandler = e;
        };
        this._addParticipant = function (e, t) {
          return u.addParticipant(e.id(), t, e);
        };
        this._removeParticipant = function (e) {
          u.removeParticipant(e.id());
        };
        this._updateConsumptionHorizon = function (e) {
          if (!e)
            return undefined;
          var t = S.parseConsumptionHorizon(e), n = !u._consumptionHorizon || u._consumptionHorizon.modificationTime < t.modificationTime;
          n && (u._consumptionHorizon = t, u.historyService._updateReadStatusFromServer());
        };
        this._setGroupAvatar = function (e) {
          if (!u.isGroup)
            return undefined;
          var t = s.task(), n = u.avatarUrl(), r, i = function () {
              u.avatarUrl(n);
              t.reject();
            }, o = function () {
              r = "URL@" + r;
              u.apiHandler.setAvatar(u.conversationId, r, t.resolve.bind(t), i);
            }, a = function (e) {
              r = e;
              u.avatarUrl(r);
            };
          return O.get().sendFile(u.conversationId, e, function () {
          }, a, !0).then(o, i), t.promise;
        };
        this._updateConsumptionHorizonModificationTime = function () {
          if (!u._consumptionHorizon || !u.conversationId)
            return undefined;
          u._consumptionHorizon.modificationTime = new Date().getTime();
          u.apiHandler.setConsumptionHorizon(u);
        };
        this._update = function (e) {
          u._updateConversationProperties(e);
          u.isGroup && u._updateThreadProperties(e);
        };
        this._updateIsFavorite = function (e) {
          if (!u.isFavoritesFlagOn || !u.isGroup)
            return undefined;
          u._isFavorited._set(typeof e == "string" && e.toLowerCase() === "true");
        };
        this._updateConversationProperties = function (e) {
          u._updateConsumptionHorizon(e.properties.consumptionhorizon);
          u._updateIsFavorite(e.properties.favorite);
          u.chatService._setNotificationSettings(e.properties.alerts, e.properties.alertmatches);
          e.lastMessage && u.historyService._processRawMessage(e.lastMessage, !0);
        };
        this._updateThreadProperties = function (e) {
          u.updateMembers(e.members);
          u.updateTopic(e);
          u.updateJoiningOption(e);
          u.updateAutoCallingOption(e);
          u.updateHistoryDisclosedOption(e);
          u.updateGroupAvatar(e);
          u.updateJoinUri(e);
          u.updateBotSettingsProperties(e.botsSettings);
          u.notifySubscribers();
        };
        this._setCanJoinCall = function (e, t, n) {
          u._callPayload = n;
          u._callHostId = t;
          u.activeModalities.audio._set(e);
          u.activeModalities.video._set(e);
        };
        this._setCanJoinNGCCall = function (e, t, n, r) {
          u._ngcJoinUrl = n;
          u._ngcCorrelationId = r;
          u._callHostId = t;
          u._callPayload = {};
          u.activeModalities.audio._set(e);
          u.activeModalities.video._set(e);
        };
        this._setSpawnedConversation = function (e) {
          var t = n.get().conversationsManager._getOrCreateConversation(e);
          u.spawnedConversation._set(t);
        };
        this.canAddParticipant = function () {
          var e = u.isJoiningEnabled(), t = u.activeModalities.chat() && !u.selfParticipant.isAnonymous() && !u.isConversationWithEcho123();
          if (!u.isGroup) {
            var n = u.participants(0) && u.participants(0).person._authorization() === H.AUTHORIZED;
            u.addParticipantCommandEnabled(t && n || e);
          } else
            u.addParticipantCommandEnabled((t || e) && u.amParticipatingInConversation);
        };
        this.onBlockStateChange = function () {
          u.isGroup || u.updateChatModality();
        };
        this.apiHandler = e;
        this.isGroup = t;
        this.conversationId = r;
        this.participantsInternal = s.collection(t ? {
          subscribed: this.handleParticipantsSubscribed.bind(this),
          unsubscribed: this.handleParticipantsUnSubscribed.bind(this)
        } : null);
        this.participants = this.participantsInternal.asWritable({
          add: s.command(this.addParticipantCommand.bind(this), this.addParticipantCommandEnabled),
          remove: s.command(this.removeParticipantCommand.bind(this), this.removeParticipantCommandEnabled)
        });
        this.leaveConversationCommandEnabled = s.property({ value: t });
        this.leave = s.command(this.leaveConversationCommand.bind(this), this.leaveConversationCommandEnabled);
        this.isGroupConversation = s.property({
          readOnly: !0,
          value: t
        });
        this.isFavoritesFlagOn && (this._isFavorited = s.property({
          value: !1,
          set: s.command(this.setIsFavorite.bind(this), this.favoritingCommandEnabled)
        }));
        r && (this._topicSetEnabled(!0), this._conversationIdReady(!0), this.canSetTopic());
        this.selfParticipant = new p["default"](this.mePerson, this, e);
        this.historyService = new y["default"](x["default"], e, this);
        this.chatService = new d["default"](e, this);
        this.fileTransferService = b.build(this, e);
        this.activeModalities.chat.changed(function (e) {
          u.canAddParticipant();
          u.canRemoveParticipant();
          u.canSetTopic();
          u.leaveConversationCommandEnabled(t && e);
          u.canSendContacts();
          u.canSendPolls();
          u.canFavoriteConversation();
        });
        this.selfParticipant.role.changed(function (e) {
          var t = e === C.participantRole.Leader;
          u.canRemoveParticipant();
          u.canSetTopic();
          u.joiningCommandEnabled(t);
          u.historyService.historyDisclosedCommandEnabled(t);
        });
        this.participantsInternal.removed(function (e) {
          e.person._authorization.changed.off(u.canAddParticipant);
          e.person.isBlocked.changed.off(u.onBlockStateChange);
          e._dispose();
        });
        this.pstnEventListener.subscribeToConversation(this);
        this.audioService = v.build(this);
        this._autoCallingService = w.build(this);
        this.videoService = m.build(this);
        this.screenSharingService = g.build(this);
      }
      return e.prototype.createParticipant = function (e) {
        return new p["default"](e, this, this.apiHandler);
      }, e.prototype.createInvitation = function () {
        return null;
      }, e.prototype.notifySubscribers = function () {
        this.threadPropertiesUpdateSubscribers.forEach(function (e) {
          typeof e == "function" && e();
        });
      }, e.prototype.addUpdateThreadPropertiesSubscription = function (e) {
        this.threadPropertiesUpdateSubscribers.push(e);
      }, e.prototype.removeUpdateThreadPropertiesSubscription = function (e) {
        this.threadPropertiesUpdateSubscribers = this.threadPropertiesUpdateSubscribers.filter(function (t) {
          return t !== e;
        });
      }, e.prototype.updateMembers = function (e) {
        var t = this, n = {};
        if (!e)
          return undefined;
        var r = !1;
        e.forEach(function (e) {
          var i = M.getTypeFromKey(e.id), s = M.getId(e.id);
          e.contactType || (e.contactType = i);
          e.id = s;
          n[e.id] = e;
          var o = e.linkedMri && e.linkedMri.indexOf(t.mePerson.id()) > 0;
          r = r || e.id === t.mePerson.id() || o;
        });
        this.setAmParticipatingInConversation(r);
        this.participantsStore.each(function (e) {
          n[e.id] || t.removeParticipant(e.id);
        });
        this.forEach(n, function (e) {
          var r = n[e].role.toLowerCase(), i = n[e].contactType;
          t.addParticipant(e, j[r], null, i);
        });
      }, e.prototype.updateBotSettingsProperties = function (e) {
        if (!e)
          return undefined;
        this._botsSettings = e;
      }, e.prototype.setAmParticipatingInConversation = function (e) {
        if (e === this.amParticipatingInConversation)
          return;
        this.amParticipatingInConversation = e;
        this.isFavoritesFlagOn && this._isFavorited() && !this.amParticipatingInConversation && this._isFavorited(!1);
        this.updateChatModality();
        this.updateAudioVideoAvailibility();
      }, e.prototype.setTopic = function (e) {
        return e.length === 0 ? undefined : (this.apiHandler.setTopic(this.conversationId, e), e);
      }, e.prototype.updateJoiningOption = function (e) {
        var t = e.threadProperties && e.threadProperties[F.JOINING_ENABLED];
        t && this.isJoiningEnabled._set(t.toLowerCase() === "true");
      }, e.prototype.updateAutoCallingOption = function (e) {
        e.threadProperties && e.threadProperties.autoCallingPayload && this._autoCallingService.setupMeeting(this, e.threadProperties.autoCallingPayload);
      }, e.prototype.updateHistoryDisclosedOption = function (e) {
        var t = e.threadProperties && e.threadProperties[F.HISTORY_DISCLOSED];
        if (t) {
          var n = t.toLowerCase() === "true";
          n && this.historyService.getMoreActivityItems.enabled._set(!0);
          this.historyService.isHistoryDisclosed._set(n);
        }
      }, e.prototype.updateGroupAvatar = function (e) {
        var t = e.threadProperties && e.threadProperties[F.PICTURE];
        if (!t)
          return;
        var n = /^(URL@.*\.com)\//, r = t && t.match(n);
        r && (t = t.replace(r[1], N.settings.amdServiceHost), this.avatarUrl(t));
      }, e.prototype.generateTopicFromMembers = function (e) {
        var t = null;
        return e.length !== this.membersCount && (t = e.slice(0, 4).map(function (e) {
          return M.getId(e.id);
        }).join(P)), t;
      }, e.prototype.updateTopic = function (e) {
        var t;
        e.threadProperties && e.threadProperties.topic && e.threadProperties.topic !== " " ? t = e.threadProperties.topic : e.members && (t = this.generateTopicFromMembers(e.members));
        this.membersCount = e.members && e.members.length || this.membersCount;
        if (!t)
          return;
        if (t === this.mePerson.id()) {
          this.topic._set("");
          return;
        }
        var n = t.split(P), r = [];
        this.clearPersonTopicUpdate();
        for (var i = 0; i < n.length; i++) {
          var s = n[i];
          if (s === this.mePerson.id() || s === "...")
            continue;
          if (!this.hasParticipant(s)) {
            this.membersCount = null;
            this.topic._set(f.parseTopic(t));
            return;
          }
          r.push(s);
        }
        r.forEach(this.subscribeToPersonTopicUpdate.bind(this));
      }, e.prototype.hasParticipant = function (e) {
        return !!this.participantsStore(e);
      }, e.prototype.subscribeToPersonTopicUpdate = function (e) {
        var t = a.getPerson(e);
        this.topicSubscriptions.push({
          subscription: t.displayName.changed(this.handleParticipantNameChanged.bind(this)),
          person: t
        });
      }, e.prototype.clearPersonTopicUpdate = function () {
        this.topicSubscriptions.forEach(function (e) {
          e.subscription.dispose();
        });
        this.topicSubscriptions = [];
      }, e.prototype.updateChatModality = function () {
        var e = this.apiHandler.isOnline() && this.amParticipatingInConversation && !this.conversationIsBlocked() && !this.isConversationWithEcho123();
        this.activeModalities.chat._set(e);
      }, e.prototype.updateAudioVideoAvailibility = function () {
        this.audioService._membershipChanged(this.amParticipatingInConversation);
        this.videoService._membershipChanged(this.amParticipatingInConversation);
        this.amParticipatingInConversation || (this.activeModalities.audio._set(this.amParticipatingInConversation), this.activeModalities.video._set(this.amParticipatingInConversation));
      }, e.prototype.isConversationWithEcho123 = function () {
        return this.conversationId === "8:echo123";
      }, e.prototype.conversationIsBlocked = function () {
        var e = this.participants(0);
        return e && e.person.isBlocked();
      }, e.prototype.setJoiningEnabled = function (e) {
        var t = this, n = s.task(), r = this.isJoiningEnabled, i = function () {
            n.resolve(e);
          }, o = function () {
            r() === e ? n.resolve(e) : t.apiHandler.joiningEnabled(t.conversationId, e, i, n.reject.bind(n));
          };
        return this.joiningEnabledChainTask.promise.then(o, o), this.joiningEnabledChainTask = n, n.promise;
      }, e.prototype.setIsFavorite = function (e, t) {
        var n = this, r = s.task(), i = this._isFavorited, o = function () {
            r.resolve(e);
          }, u = function () {
            !n.isFavoritesFlagOn || i() === e || !n.isGroup && !t ? r.resolve(e) : n.apiHandler.setIsFavorite(n.conversationId, e, o, r.reject.bind(r));
          };
        return this.setFavoriteChainTask.promise.then(u, u), this.setFavoriteChainTask = r, r.promise;
      }, e.prototype.updateJoinUri = function (e) {
        e.threadProperties && e.threadProperties.joinURL && this.uri._set(e.threadProperties.joinURL);
      }, e.prototype.onSpacesData = function (e) {
        this.uriGetterTask.promise.state() === "pending" && this.uriGetterTask.resolve(e.JoinUrl);
      }, e.prototype.uriGetter = function () {
        var e = this;
        return this.uriGetterTask || (this.uriGetterTask = s.task(), this.uri() ? this.uriGetterTask.resolve(this.uri()) : this.isJoiningEnabled.once(!0, function () {
          E.getSpacesData(e.conversationId).then(e.onSpacesData.bind(e), e.uriGetterTask.reject.bind(e.uriGetterTask));
        })), this.uriGetterTask.promise;
      }, e.prototype.leaveConversationCommand = function () {
        var e = this, t = s.task(), n = this.selfParticipant.role(), r = function (r) {
            e.setAmParticipatingInConversation(!0);
            e.selfParticipant.role._set(n);
            t.reject(r);
          };
        return this.isFavoritesFlagOn && this._isFavorited() && this._isFavorited(!1), this.selfParticipant.role._set(C.participantRole.Attendee), this.setAmParticipatingInConversation(!1), this.apiHandler.removeParticipant(this.conversationId, M.getKey(this.selfParticipant.person.id(), this.selfParticipant.person._type()), t.resolve.bind(t), r), this.pstnEventListener.dispose(), this.pstnEventListener = null, t.promise;
      }, e.prototype.sendPollCommand = function (e) {
        var t = s.task();
        return this.apiHandler.sendPollMessage(this, e, t.resolve.bind(t), t.reject.bind(t)), t.promise;
      }, e.prototype.sendContactInfoCommand = function (e) {
        var t = s.task(), n = A.outgoingContactInfoActivityItem(e, this);
        return this.apiHandler.sendContactInfoMessage(this, n, e, t.resolve.bind(t), t.reject.bind(t)), t.promise;
      }, e.prototype.handleParticipantAddDuringCall = function (e, t) {
        var i = this;
        this.escalatedParticipants.push(e);
        r.getWindow().clearTimeout(this.handleParticipantTimeoutHandle);
        this.handleParticipantTimeoutHandle = r.getWindow().setTimeout(function () {
          if (t) {
            var e = [];
            i.escalatedParticipants.forEach(function (t) {
              var n = a.getPerson(t);
              e.push(n);
            });
            var r = [i.participants(0).person].concat(e), s = D.conversation.createConversation(r, n.get().conversationsManager);
            s._conversationIdReady.when(!0, function () {
              i._callHandler.extendCall(i.escalatedParticipants, s.conversationId);
              i.escalatedParticipants = [];
            });
          } else
            i._callHandler.extendCall(i.escalatedParticipants, null), i.escalatedParticipants = [];
        }, 0);
      }, e.prototype.addParticipantCommand = function (e) {
        var t = this, n = e.person.id(), r = function (e) {
            var r = s.task(), i = function (e) {
                t.removeParticipant(n);
                r.reject(e);
              };
            return t.insertParticipant(e) || r.reject(), t.putParticipantIntoCache({
              id: n,
              role: e.role()
            }), t.conversationId && t.apiHandler.addParticipant(t.conversationId, M.getKey(e.person.id(), e.person._type()), C.participantRole.Attendee, r.resolve.bind(r), i), r.promise;
          };
        return this.selfParticipant.audio.state() === C.callConnectionState.Connected ? (this._callHandler.isPluginless() ? (this.isGroupConversation() && r(e), this.handleParticipantAddDuringCall(n, !this.isGroupConversation())) : this.handleParticipantAddDuringCall(n, !1), Promise.resolve()) : r(e);
      }, e.prototype.removeParticipantCommand = function (e) {
        var t = this, n = s.task(), r = e.person.id(), i = function (i) {
            t.participantsInternal.add(e, r);
            t.putParticipantIntoCache({
              id: r,
              role: e.role()
            });
            n.reject(i);
          };
        return this.hasParticipant(r) ? (this.removeParticipant(r), this.apiHandler.removeParticipant(this.conversationId, M.getKey(e.person.id(), e.person._type()), n.resolve.bind(n), i), n.promise) : (n.reject(), undefined);
      }, e.prototype.forEach = function (e, t) {
        for (var n in e)
          e.hasOwnProperty(n) && t(n);
      }, e.prototype.handleParticipantsSubscribed = function () {
        var e = this;
        this._isAlive = !0;
        this.participantsStore.each(function (t) {
          e.participantsInternal(t.id) || e.insertParticipant(e.createParticipantForId(t.id, t.type));
        });
      }, e.prototype.handleParticipantsUnSubscribed = function () {
        this._isAlive = !1;
        this.participantsInternal.empty();
      }, e.prototype.insertParticipant = function (e) {
        var t = this.participantsStore(e.person.id());
        try {
          t && e.role._set(t.role);
          this.participantsInternal.add(e, e.person.id());
        } catch (n) {
          return !1;
        }
        return !0;
      }, e.prototype.shouldPreLoadParticipants = function () {
        return this._isAlive || !this.isGroup;
      }, e.prototype.getPersonForId = function (e, t) {
        var n = M.getId(e);
        return a.getPerson(n, t);
      }, e.prototype.createParticipantForId = function (e, t) {
        var n = this.getPersonForId(e, t);
        return this.createParticipant(n);
      }, e.prototype.putParticipantIntoCache = function (e) {
        var t = e.id;
        this.hasParticipant(t) === !1 ? this.participantsStore.add(e, t) : this.participantsStore(t).role = e.role;
        this.handleParticipantChangedInAVService();
      }, e.prototype.removeParticipantFromCache = function (e) {
        this.hasParticipant(e) && this.participantsStore.remove(e);
        this.handleParticipantChangedInAVService();
      }, e.prototype.addInvitationCommand = function () {
      }, e.prototype.removeInvitationCommand = function (e) {
        return this.pendingInvitationsInternal.remove(e);
      }, e.prototype.removeParticipant = function (e) {
        this.removeParticipantFromCache(e);
        this.shouldPreLoadParticipants() && this.participantsInternal.remove(e);
      }, e.prototype.handleParticipantNameChanged = function () {
        var e = this;
        if (this.updatingGeneratedTopic)
          return;
        this.updatingGeneratedTopic = !0;
        setTimeout(function () {
          var t = e.topicSubscriptions.map(function (e) {
            return e.person.displayName();
          });
          e.topic._set(f.parseTopic(t.join(P)));
          e.updatingGeneratedTopic = !1;
        }, 0);
      }, e.prototype.addParticipant = function (e, t, n, r) {
        var i = function (e, t) {
            e && e.role._set(t);
          }, s, o, u;
        t = t || C.participantRole.Attendee;
        if (e === this.mePerson.id())
          this.setAmParticipatingInConversation(!0), this.selfParticipant.role._set(t), u = !0;
        else if (this.hasParticipant(e))
          s = this.participantsInternal(e), o = this.participantsStore(e), o.role !== t && (this.putParticipantIntoCache({
            id: e,
            role: t,
            type: r
          }), i(s, t)), u = !1;
        else {
          this.putParticipantIntoCache({
            id: e,
            role: t,
            type: r
          });
          if (this.shouldPreLoadParticipants() || r === _.contactMriTypes.agent)
            n = n || this.getPersonForId(e, r), s = this.createParticipant(n), u = this.insertParticipant(s);
        }
        return this.updateChatModality(), this.isGroup || (this.participants(0).person._authorization.changed(this.canAddParticipant), this.participants(0).person.isBlocked.changed(this.onBlockStateChange)), u;
      }, e.prototype.hasPSTNParticipants = function () {
        var e = !1;
        return this.participantsStore.each(function (t) {
          !e && u.isPhoneNumber(t.id) && (e = !0);
        }), e;
      }, e.prototype.handleParticipantChangedInAVService = function () {
        this.audioService._setPSTNParticipants(this.hasPSTNParticipants());
        this.videoService._setPSTNParticipants(this.hasPSTNParticipants());
      }, e.prototype.canRemoveParticipant = function () {
        var e = this.selfParticipant.role() === C.participantRole.Leader;
        this.removeParticipantCommandEnabled(e && this.activeModalities.chat());
      }, e.prototype.canFavoriteConversation = function () {
        this.favoritingCommandEnabled(!this.selfParticipant.isAnonymous() && this.amParticipatingInConversation && this.isFavoritesFlagOn);
      }, e.prototype.canSetTopic = function () {
        this.setTopicCommandProperty(this._topicSetEnabled() && this.selfParticipant && (!this.selfParticipant.isAnonymous() || this.selfParticipant.role() === C.participantRole.Leader));
      }, e.prototype.canSendContacts = function () {
        var e = this.activeModalities.chat(), t = N.isFeatureOn(i.COMMON.featureFlags.SEND_CONTACT_CARD_ENABLED);
        this.sendContactInfoCommandEnabled(e && t);
      }, e.prototype.canSendPolls = function () {
        var e = this.activeModalities.chat(), t = N.isFeatureOn(i.COMMON.featureFlags.POLLS_ENABLED);
        this.sendPollCommandEnabled(this.isGroup && e && t);
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = I;
}));

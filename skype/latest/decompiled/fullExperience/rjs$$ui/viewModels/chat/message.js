define("ui/viewModels/chat/message", [
  "require",
  "lodash-compat",
  "ui/telemetry/actions/actionSources",
  "swx-cafe-application-instance",
  "swx-focus-handler",
  "text!views/people/blockContactModal.html",
  "ui/viewModels/people/blockContactModal",
  "utils/common/cafeObservable",
  "constants/components",
  "swx-constants",
  "ui/viewModels/people/contactBuilder",
  "telemetry/chat/contactInfoEvent",
  "ui/contactInfoMessage/contactInfoMessage",
  "ui/viewModels/people/contactName",
  "constants/contentTemplates",
  "swx-encoder/lib/encoders/emoticonEncoder",
  "ui/viewModels/calling/helpers/callingFacade",
  "swx-enums",
  "utils/common/eventMixin",
  "ui/viewModels/chat/hearts",
  "swx-i18n",
  "vendor/knockout",
  "ui/viewModels/chat/messageMediaTypesHandlers",
  "swx-utils-chat",
  "swx-ui-navigation",
  "utils/chat/message",
  "ui/modalDialog/modalDialog",
  "ui/modelHelpers/personHelper",
  "ui/viewModels/chat/pollAvatars",
  "telemetry/chat/poll",
  "telemetry/calling/pstn/pstn",
  "swx-pubsub-instance",
  "swx-service-locator-instance",
  "utils/common/styleModeHelper",
  "ui/viewModels/chat/messageParsers/swiftCard",
  "ui/viewModels/chat/translator/translationItem",
  "utils/chat/translatorHelper",
  "utils/common/disposableMixin",
  "ui/urlPreview/urlPreview",
  "telemetry/chat/urlPreviewAction",
  "ui/players/ytPlayer",
  "ui/modelHelpers/personActionsHelper",
  "swx-utils-chat",
  "utils/chat/quoteMessageUtils",
  "telemetry/chat/quoteMessageEvent",
  "utils/common/clipboard"
], function (e) {
  function $(e) {
    function ct(e) {
      return d.templates[e] || d.templates[g.activityType.TextMessage];
    }
    function ht() {
      var e = {}, n = y.isRead(), r = y.group() === f.activityItemGroups.TEXT || y.group() === f.activityItemGroups.MEDIA || y.group() === f.activityItemGroups.CONTACT_INFO || y.group() === f.activityItemGroups.POLL || y.group() === f.activityItemGroups.TRANSCRIPT, i;
      return e.me = y.isMyself && r, e.their = !e.me, e.first = y.isFirstMessage(), e.last = y.isLastMessage(), e.edited = y.isEdited, e.showTimestamp = y.showTimestamp, e.showBottomTimestamp = y.showBottomTimestamp, e.sticker = y.isSticker(), e.spacesWelcomeMessage = Q, e.deliveryFailed = y.deliveryFailed, e.hearts = y.heartsVM.canHeart() || y.heartsVM.heartsEnabled(), e.urlPreview = y.isUrlPreview(), e.mojiItem = y.isMoji(), e.integrated = y.isIntegrated, e.picture = y.isPicture(), e.copyLink = y.copyLinkEnabled(), e.lastInBubble = y.isLastMessageInBubble(), e.sms = y.isSMS, e.meCommandMessage = y.isMeCommandMessage, y.isMeCommandMessage && (e.edited = !1), ft && (e.read = n, e.unread = !n), t.forIn(f.activityItemGroups, function (t) {
        i = t && t.toLowerCase();
        i && (e[i] = !1);
      }), y.group() === f.activityItemGroups.PSTN ? e[f.activityItemGroups.CALL] = !0 : e[y.group()] = !0, y.group() === f.activityItemGroups.CONTACT_REQUEST && pt(e), y.group() === f.activityItemGroups.CUSTOM && (e.participant = !0), t.trim(t.reduce(e, function (e, t, n) {
        return S.unwrap(t) ? e + " " + n : e;
      }, y.customMessageClasses || ""));
    }
    function pt(e) {
      function n() {
        return t.includes([
          g.activityType.ContactRequestIncoming,
          g.activityType.ContactRequestOutgoing,
          g.activityType.ContactRequestOutgoingAgent,
          g.activityType.SuggestedContact,
          g.activityType.UnblockContact
        ], y.model.type());
      }
      function r() {
        return t.includes([
          g.activityType.ContactRequestOutgoingResend,
          g.activityType.ContactRequestIsNowContact,
          g.activityType.ContactRequestIncomingInviteFree
        ], y.model.type());
      }
      e.contactMessage = n();
      e.their = !e.me && !n();
      e.participant = r();
    }
    function dt(e) {
      var t = e.type() === g.activityType.ParticipantJoined, n = e.persons();
      return !G || !t ? !1 : (Q = n.indexOf($.personsAndGroupsManager.mePerson) >= 0, Q);
    }
    function vt(e) {
      function o(t) {
        return e.author !== t;
      }
      function a(e) {
        return new p(e);
      }
      function l(e) {
        return !L.isMePerson(e);
      }
      function c() {
        var e;
        return !J || !J.participants() ? e : (J.participants().forEach(function (n) {
          if (L.isAgent(n.person)) {
            var r = u.newObservableProperty(n.person.displayName), i = t.escape(r()), s = E.fetch({
                key: "message_text_joiningConversationWithBots",
                params: { botName: i }
              }), o = E.fetch({
                key: "message_text_joiningConversationWithBotsV2",
                params: { botName: i }
              });
            e ? e += "\n" : e = "";
            ut.push({ subscription: r });
            lt ? e += o + C.getBotDisclosureMessage(n.person.id(), i, J) : e += s;
          }
        }), e);
      }
      var n = u.newObservableProperty(e.context), r = e.persons().filter(o), i;
      e.reason && (i = e.reason());
      y.participantsWithoutAuthor = r.map(a);
      if (dt(e)) {
        var s = u.newObservableProperty(J.selfParticipant.role);
        y.participantsWithoutMyself = r.filter(l).map(a);
        y.contentTemplate(ct(f.customActivityItemTemplates.SPACES_WELCOME_MESSAGE));
        y.spaceLink = u.newObservableProperty(J.uri);
        y.isJoiningEnabled = u.newObservableProperty(J.isJoiningEnabled);
        y.conversation = J;
        y.showSpacesCTA = S.computed(function () {
          return s() === g.participantRole.Leader && !z.isGuestHostConversation(J.conversationId);
        });
        y.welcomeMessage = S.computed(function () {
          return E.fetch({ key: y.isJoiningEnabled() ? "spaces_welcomeMessage" : "spaces_welcomeMessageWithoutLink" });
        });
        y.agentsMessageContent = S.computed(c);
        y.editTopicAction = function () {
          y.dispatchEvent(b.conversation.OPEN_PROFILE, { editTopic: !0 }, y.DIRECTION.PARENT);
        };
        y.settingsAction = function () {
          y.dispatchEvent(b.conversation.OPEN_PROFILE, { editTopic: !1 }, y.DIRECTION.PARENT);
        };
        y.othersAddedMessageContent = S.computed(function () {
          if (y.participantsWithoutMyself.length > 0)
            return C.getMessageFromParticipantActivityItem(e.type(), y.author, y.participantsWithoutMyself, n, i, J);
        });
      }
      return S.computed(function () {
        return C.getMessageFromParticipantActivityItem(e.type(), y.author, y.participantsWithoutAuthor, n, i, J);
      });
    }
    function mt(e) {
      e.sender && (y.author = l.build(e.sender), y.isMyself = L.isMePerson(e.sender), y.displayname = S.observable(y.isMyself ? "me" : y.author), y.renderAuthorInfo(!y.isMyself), y.showAuthorInfo(!y.isMyself), y.openConversationLabel = S.pureComputed(function () {
        return E.fetch({
          key: "label_text_openConversation",
          params: { displayName: e.sender.displayName() }
        });
      }));
      y.direction = e.direction && e.direction();
    }
    function gt(e, t) {
      if (t.translation) {
        var n = {
          key: t.translation.key,
          value: t.translation.users[0].value,
          mri: t.translation.users[0].mri
        };
        e.translations.add(n);
      }
    }
    function yt(e, n) {
      switch (y.group()) {
      case f.activityItemGroups.PARTICIPANT:
        y.author = l.build(e.author), y.content = vt(e);
        break;
      case f.activityItemGroups.CALL:
        var r = C.getMessageFromCallActivityItem(e, n);
        mt(e), y.content = S.observable(r.text), y.liveSessionDuration = r.duration, y.callAction = r.callAction, y.typeClasses = {
          liveSessionText: !0,
          "fontSize-h4": !0
        };
        break;
      case f.activityItemGroups.NGC_UPGRADE:
        y.content = S.observable(C.getMessageFromNgcUpgradeActivityItem(e));
        break;
      case f.activityItemGroups.PLUGIN_FREE:
        y.content = S.observable(C.getMessageFromPluginFreeActivityItem(e));
        break;
      case f.activityItemGroups.PSTN:
        y.content = S.observable(C.getMessageFromPstnActivityItem(e)), e.type() === g.activityType.PstnInvalidNumber && !e.isGroup() ? (y.linkContent = E.fetch({ key: "pstn_invalid_number_return_link" }), y.linkVisible = !0) : (y.linkContent = "", y.linkVisible = !1), mt(e), y.callAction = "callError", y.typeClasses = {
          liveSessionText: !0,
          "fontSize-h4": !0
        };
        break;
      case f.activityItemGroups.TEXT:
        var i, s;
        mt(e), i = u.newObservableProperty(e.html), tt.isFeatureOn(f.featureFlags.SWIFT_CARD_RENDERING) && (s = H.parse(y, e, J)), typeof s != "undefined" ? y.content = s : y.content = S.computed(function () {
          var t = i(), n = Y || !t.trim().length, r = tt.isFeatureOn(f.featureFlags.URL_PREVIEWS), s = tt.isFeatureOn(f.featureFlags.YOUTUBE_PLAYER_ENABLED), o = J._translatorSettings && J._translatorSettings.isEnabled, u = e.direction && e.direction() === f.chat.messageType.INCOMING, a = !et && rt && o && u && !e.isDeleted();
          n ? t = T.transform(e.text(), "text/typed", "text/html") : tt.isFeatureOn(f.featureFlags.ENABLE_RAW_EMOTICONS_RENDERING) && (t = T.encodeEmoticonsRawRepresentation(t));
          if (y.isMeCommandMessage) {
            var l;
            try {
              return l = new RegExp("^" + y.model.sender.displayName() + " "), t.replace(l, "<b>" + y.model.sender.displayName() + "</b> ");
            } catch (c) {
              return t;
            }
          }
          return Z && (s || r) && S.ignoreDependencies(function () {
            I.render(t, y, J, s, r);
          }), a && j.requestTranslation(t, e.direction(), J, gt.bind(null, e)), y.isSticker(st.hasLargeEmoticon(t)), t;
        }), y.isEdited = u.newObservableProperty(e.isEdited), y.isDeleted = u.newObservableProperty(e.isDeleted), bt();
        break;
      case f.activityItemGroups.MEDIA:
        var o = x.fetch(e.type());
        mt(e), o(y, n);
        break;
      case f.activityItemGroups.CONTACT_REQUEST:
        y.author = l.build(e.sender), y.content = S.computed(function () {
          return C.getMessageFromContactRequestActivityItem(e.type(), y.author.getPerson());
        }), y.actionInProgress = S.observable(!1), e.type() === g.activityType.ContactRequestIncoming && (y.greeting = u.newObservableProperty(e.greeting)), y.isBusinessContactMgmtEnabled && (e.type() === g.activityType.ContactRequestOutgoing || e.type() === g.activityType.ContactRequestIsNowContact) && e.isRead(!0);
        break;
      case f.activityItemGroups.POLL:
        mt(e), y.pollAvatarsVM = A.build(e, function (e) {
          y.dispatchEvent(b.userListPopup.POPUP_TOGGLE, e);
        }), y.isEdited = u.newObservableProperty(e.isEdited), y.isDeleted = u.newObservableProperty(e.isDeleted), y.content = S.observable(E.fetch({
          key: "poll_message_question_header",
          params: { pollQuestion: e.pollQuestion() }
        })), y.pollQuestion = u.newObservableProperty(e.pollQuestion), y.pollAnswers = u.newObservableCollection(e.pollAnswers), y.answerSent = u.newObservableProperty(e.meVoted), y.checkedAnswer = S.observable(), y.checkedAnswerSubscription = e.meCheckedAnswerPositions.changed(function () {
          y.checkedAnswer(t.isEmpty(e.meCheckedAnswerPositions()) ? -1 : e.meCheckedAnswerPositions()[0]);
        }), y.peopleVotedText = S.observable(), y.peopleVotedNumSubscription = e.peopleVotedNum.changed(function (e) {
          y.peopleVotedText(E.fetch({
            key: "poll_message_people_voted",
            params: { count: e }
          }));
        }), y.onAnswerClick = function (t) {
          return e.meVoted() ? y.checkedAnswer(e.meCheckedAnswerPositions()[0]) : (O.activityVote(y.model), y.model.addAnswer(t)), !0;
        };
        break;
      case f.activityItemGroups.CONTACT_INFO:
        mt(e), h.render(e, y, J);
        break;
      case f.activityItemGroups.TRANSACTION:
        var a = "Unsupported transaction message";
        mt(e), y.content = S.observable(a), y.group(f.activityItemGroups.TEXT);
        break;
      case f.activityItemGroups.SYSTEM:
      case f.activityItemGroups.CUSTOM:
        y.content = S.observable(e.text());
        break;
      case f.activityItemGroups.TRANSCRIPT:
        y.content = S.observable(e.text()), y.author = e.author(), y.isMyself = e.isMyself(), y.renderAuthorInfo(!y.isMyself), y.showAuthorInfo(!y.isMyself);
      }
    }
    function bt() {
      it && it.dispose();
      it = y.isDeleted.subscribe(function (e) {
        if (!e)
          return;
        it.dispose();
        it = null;
        y.group(f.activityItemGroups.TEXT);
        y.contentTemplate("textMessageContentTemplate");
        y.isUrlPreview(!1);
        y.previews && (_t(y.previews()), y.previews([]));
      });
    }
    function wt() {
      y.showSpacesCTA && y.showSpacesCTA.dispose();
      y.welcomeMessage && y.welcomeMessage.dispose();
      y.othersAddedMessageContent && y.othersAddedMessageContent.dispose();
      y.participantsWithoutMyself && t.forEach(y.participantsWithoutMyself, function (e) {
        e.dispose();
      });
    }
    function Et() {
      wt();
      y.participantsWithoutAuthor && t.forEach(y.participantsWithoutAuthor, function (e) {
        e.dispose();
      });
    }
    function St() {
      y.messageDeliveryStatusEnabled && y.model.status.changed.off(xt);
    }
    function xt(e) {
      var t = y.model.type() === g.activityType.ParticipantJoinFailed, n = "iconfont ";
      y.deliveryFailed(!1);
      switch (e) {
      case g.activityStatus.Failed:
        y.deliveryFailed(!t), y.statusText(E.fetch({ key: "message_failed_status" })), n += "warning";
        break;
      case g.activityStatus.Succeeded:
        y.statusText(E.fetch({ key: "message_sent_status" })), n += "presenceOnlineStroke";
        break;
      case g.activityStatus.Pending:
        y.statusText(E.fetch({ key: "message_sending_status" })), n += "presenceStroke";
        break;
      default:
        y.statusText("");
      }
      y.deliveryStatusIconCssClass(n);
    }
    function Tt(e) {
      if (J.selfParticipant.isAnonymous() || L.isGuest(e))
        return !1;
      var t;
      t = $.conversationsManager.getConversation(e);
      $.conversationsManager.conversations.add(t);
      _.publish(b.navigation.OPEN_CONVERSATION, {
        model: t,
        origin: f.telemetry.historyLoadOrigin.AUTHOR_SWITCH
      });
    }
    function Nt(e) {
      if (!y.contacts || y.isMyself)
        return;
      h.handleContactAdded(e.id(), y);
    }
    function Ct(e) {
      var t;
      return y.model.contacts().some(function (n) {
        n.id() === e && (t = n);
      }), t;
    }
    function kt(e) {
      e ? y.model.status.changed(xt) : St();
    }
    function Lt() {
      y.actionInProgress(!1);
    }
    function At(e) {
      e && e.giphyExpression ? y.giphyMetadata("/giphy " + e.giphyExpression) : y.giphyMetadata(!1);
    }
    function Ot() {
      var e = D.resolve(f.serviceLocator.FEATURE_FLAGS).isFeatureOn(f.featureFlags.LOW_FOCUS_IMPORTANCE_CONTACT_REQUEST);
      return e ? i.Priorities.Low : i.Priorities.High;
    }
    function Mt() {
      K && K();
    }
    function _t(e) {
      e.forEach(function (e) {
        t.isFunction(e.dispose) && (e.ytPlayer(!1), e.dispose.call(e));
      });
    }
    var y = this, $ = r.get(), J, K, Q = !1, G, Y, Z = !e || !e.noUrlPreview, et = e && e.noTranslationItem, tt = D.resolve(f.serviceLocator.FEATURE_FLAGS), nt = $.translatorService, rt = nt && $.translatorService.state() === f.translatorServiceState.Authenticated, it, st = v.build(), ot = t.assign({}, F), ut = S.observableArray(), at = D.resolve(f.serviceLocator.FEATURE_FLAGS), ft = at.isFeatureOn(f.featureFlags.MARK_READ_MESSAGES_V2_ENABLED), lt;
    this.autoDisposer = ot;
    this.init = function (e, t) {
      var n = D.resolve(f.serviceLocator.FEATURE_FLAGS), r = e.key();
      G = n.isFeatureOn(f.featureFlags.SPACES);
      Y = n.isFeatureOn(f.featureFlags.MESSAGE_ENFORCE_TEXT_FORMAT);
      lt = tt.isFeatureOn(f.featureFlags.BOT_MESSAGES_MODE_V2_ENABLED);
      J = t;
      y.isEdited = S.observable(!1);
      y.messageDeliveryIndicatorEnabledSW4B = n.isFeatureOn(f.featureFlags.SHOW_MESSAGE_DELIVERY_INDICATOR_SW4B);
      y.messageDeliveryStatusEnabled = n.isFeatureOn(f.featureFlags.SHOW_MESSAGE_DELIVERY_STATUS) && e.type() !== g.activityType.SystemMessage;
      y.timestampsInNarrowModeEnabled = n.isFeatureOn(f.featureFlags.SHOW_TIMESTAMPS_IN_NARROW_MODE);
      y.disableOpenConversationWithAuthor = n.isFeatureOn(f.featureFlags.DISABLE_OPEN_CONVERSATION_WITH_AUTHOR);
      y.isDeleted = S.observable(!1);
      y.isMyself = !1;
      y.clientmessageid = r;
      y.contentId = r ? "msg_" + r : null;
      y.timestamp = e.timestamp();
      y.setTimestamp = S.observable("00:00");
      y.setBottomTimestamp = S.observable("00:00");
      y.setLongTimestamp = S.observable("00:00");
      y.showTimestamp = S.observable(!0);
      y.showBottomTimestamp = S.observable(!1);
      y.isRead = u.newObservableProperty(e.isRead);
      y.isFirstMessage = S.observable(!1);
      y.isLastMessage = S.observable(!1);
      y.isLastMessageInBubble = S.observable(!1);
      y.model = e;
      y.group = S.observable(C.getActivityItemGroup(e.type()));
      y.isGroupConversation = J.isGroupConversation();
      y.conversationId = t.conversationId;
      y.renderAuthorInfo = S.observable(!1);
      y.showAuthorInfo = S.observable(!1);
      y.liveSessionDuration = !1;
      y.isCallActivityItem = S.computed(function () {
        return y.group() === f.activityItemGroups.CALL || y.group() === f.activityItemGroups.PSTN;
      });
      y.isSticker = S.observable();
      y.isMoji = S.observable(!1);
      y.isPicture = S.observable(!1);
      y.isUrlPreview = S.observable(!1);
      y.deliveryFailed = S.observable(!1);
      y.deliveryFailedMessage = S.computed(function () {
        return y.deliveryFailed() ? E.fetch({ key: "message_not_delivered_text" }) : "";
      });
      y.statusText = S.observable();
      y.deliveryStatusIconCssClass = S.observable();
      y.isMyLastMessageInChat = S.observable(!1);
      y.isIntegrated = P.get().isIntegratedProperty();
      y.copyLinkEnabled = S.observable(!1);
      y.giphyMetadata = S.observable(!1);
      y.isGif = S.observable(!1);
      y.isSMS = e._isSMS ? e._isSMS() : !1;
      y.smsStatus = y.isSMS ? u.newObservableProperty(e._smsInfo().status) : {};
      y.suggestedActions = S.observableArray([]);
      y.heartsVM = w.build(y, J, function (e) {
        y.dispatchEvent(b.userListPopup.POPUP_TOGGLE, e);
      });
      y.heartsVM.init();
      y.contentTemplate = S.observable(ct(e.type()));
      y.focusImportance = Ot();
      y.typeClasses = {};
      y.isMeCommandMessage = !!e._skypeemoteoffset;
      yt(e, J.isGroupConversation());
      y.cssClass = S.computed(ht, this);
      y.showGiphyMetadata = S.computed(function () {
        return y.isGif() && !y.isDeleted() && y.giphyMetadata();
      });
      y.focusHandlerCallback = function (e) {
        K = e;
      };
      y.messageDeliveryIndicatorEnabledSW4B && y.model.status.changed(xt);
      y.messageDeliveryStatusEnabled && y.isMyLastMessageInChat.subscribe(kt);
      $.personsAndGroupsManager.all.persons.added(Nt);
      et || (y.translationItem = B.build(y, J), y.translationItem.init());
      y.model._activityData && y.model._activityData.changed(At);
      y.isCopySelectionAsQuoteEnabled = tt.isFeatureOn(f.featureFlags.COPY_SELECTION_AS_QUOTE_KEYBOARD) && V.isCopySupportedByBrowser();
      y.forwardEvent(b.videoPlayer.FULLSCREEN_ON, y.DIRECTION.PARENT, null, y.DIRECTION.CHILD);
      y.forwardEvent(b.videoPlayer.FULLSCREEN_OFF, y.DIRECTION.PARENT, null, y.DIRECTION.CHILD);
      y.registerEvent(b.navigation.FRAGMENT_SHOW, Mt);
    };
    y.onCopy = function (e) {
      var t = e.model, r = document.getSelection().toString(), i = W.copySelectionAsQuote(t, r, $.conversationsManager), s = n.selectionCopyKeyboard;
      X.publish(t, s, i);
    };
    this.dispose = function () {
      it && it.dispose();
      y.content && y.content.dispose && y.content.dispose();
      y.deliveryFailedMessage && y.deliveryFailedMessage.dispose();
      y.cssClass && y.cssClass.dispose();
      y.author && y.author.dispose && y.author.dispose();
      y.isCallActivityItem && y.isCallActivityItem.dispose();
      y.checkedAnswerSubscription && y.checkedAnswerSubscription.dispose && y.checkedAnswerSubscription.dispose();
      y.peopleVotedNumSubscription && y.peopleVotedNumSubscription.dispose && y.peopleVotedNumSubscription.dispose();
      y.isSMS && y.model._smsInfo && y.model._smsInfo().dispose();
      Et();
      y.model && (y.messageDeliveryIndicatorEnabledSW4B || y.messageDeliveryStatusEnabled) && y.model.status.changed.off(xt);
      y.showGiphyMetadata && y.showGiphyMetadata.dispose();
      y.heartsVM && y.heartsVM.dispose();
      $.personsAndGroupsManager.all.persons.added.off(Nt);
      y.model && y.model._activityData && y.model._activityData.changed.off(At);
      y.translationItem && y.translationItem.dispose();
      y.previews && (_t(y.previews()), y.previews([]));
      ot.dispose && ot.dispose();
      ut().length && ut().forEach(function (e) {
        e.subscription.dispose();
      });
    };
    this.onRendered = function () {
      y.isRendered = !0;
      y.dispatchEvent(b.message.RENDERED);
    };
    this.onBeforeExpanded = function () {
      y.dispatchEvent(b.message.BEFORE_EXPANDED);
    };
    this.onAfterExpanded = function () {
      y.dispatchEvent(b.message.AFTER_EXPANDED);
    };
    this.openConversationWithAuthor = function () {
      Tt(y.model.sender);
    };
    this.navigateToDialPad = function () {
      function e() {
        return {
          page: a.calling.SKYPEOUT_PAGE,
          origin: f.telemetry.historyLoadOrigin.SKYPEOUT_PAGE
        };
      }
      _.publish(f.events.navigation.NAVIGATE, e());
    };
    this.isBusinessContactMgmtEnabled = tt.isFeatureOn(f.featureFlags.ENABLE_BUSINESS_CONTACT_MANAGEMENT);
    this.sendContactRequest = function () {
      var e, t = { source: n.conversation.messageItem }, r = y.model.sender, i = y.model.type();
      return y.actionInProgress(!0), $.conversationsManager.conversations.add(J), e = U.addPerson(r, i, J, t), e.then(Lt, Lt), y.dispatchEvent(b.message.ADD_CONTACT, { source: n.conversation.messageItem }, y.DIRECTION.PARENT), e;
    };
    this.acceptContactRequest = function () {
      var e, t = { source: n.conversation.messageItem }, r = y.model.sender;
      return y.actionInProgress(!0), e = U.addPerson(r, g.activityType.ContactRequestIncoming, J, t, Lt, Lt), e;
    };
    this.declineContactRequest = function () {
      var e, t = { source: n.conversation.messageItem }, r = y.model.sender;
      return y.actionInProgress(!0), e = U.declinePerson(r, J, t, Lt, Lt), e;
    };
    this.blockContactRequest = function () {
      var e = { source: n.contactRequestIncomingActivityItem }, t = new o(y.author.getPerson(), e), r = E.fetch({ key: "modal_blockContact_text_aria_label" });
      return k.build(o.ELEMENT_ID, t, s), k.show(o.ELEMENT_ID, r), Promise.resolve();
    };
    this.unblockContact = function () {
      var e, t = { source: n.contactRequestIncomingActivityItem }, r = y.model.sender;
      return y.actionInProgress(!0), e = U.unblockPerson(r, t, Lt, Lt), e;
    };
    this.openUrlPreview = function (e, t) {
      function n() {
        if (!tt.isFeatureOn(f.featureFlags.URL_PREVIEW_LOAD_YOUTUBE_PLAYER))
          return !1;
        var n = t || S.utils.arrayFirst(y.previews(), function (t) {
          return t.url() === e;
        });
        return n && n.type() === f.urlPreviewType.YT && !n.restrictions ? n : null;
      }
      var r = n(), i = {
          url: e,
          timestamp: y.timestamp,
          participantCount: J.participantsCount(),
          contentId: y.contentId
        };
      q.publishActionEvent(i);
      if (r && R.render(r, y, J, e))
        return !1;
      var s = window.open();
      return s.opener = null, s.location = e, !1;
    };
    this.isPSTNContactMessage = function (e) {
      var t = Ct(e);
      return L.isPstn(t);
    };
    this.contactHasFullName = function (e) {
      var t = Ct(e);
      return t.displayName() !== e || L.isPstn(t);
    };
    this.isMePersonContactMessage = function (e) {
      return L.isMePersonId(e);
    };
    this.openConversationWithUser = function (e) {
      var t = Ct(e);
      Tt(t);
      c.publishActionEvent({
        person: t,
        participantsCount: J.participantsCount(),
        timeInStale: y.timestamp.getTime()
      });
    };
    this.addCreditTelemetry = function (e, t) {
      var n = f.telemetry.pstn;
      return t.target.className === n.cssClasses.ADD_CREDIT ? M.addingCredit(n.entryPoint.NO_CREDIT_CALL_END) : t.target.className === n.cssClasses.ADD_SUBSCRIPTION && M.addingSubscription(n.entryPoint.NO_SUBSCRIPTION_CALL_END), !0;
    };
    this.activateFirstLink = function (e, t) {
      var n = e.elementInfo.element.querySelector(".content a");
      n && t.target.tagName !== "A" && (n.click(), t.preventDefault(), t.stopPropagation());
    };
    this.messageClicked = function (e, t) {
      t.target && t.target.href && (N.navigate(t.target.href, m), t.preventDefault(), t.stopPropagation());
    };
  }
  var t = e("lodash-compat"), n = e("ui/telemetry/actions/actionSources"), r = e("swx-cafe-application-instance"), i = e("swx-focus-handler"), s = e("text!views/people/blockContactModal.html"), o = e("ui/viewModels/people/blockContactModal"), u = e("utils/common/cafeObservable"), a = e("constants/components"), f = e("swx-constants").COMMON, l = e("ui/viewModels/people/contactBuilder"), c = e("telemetry/chat/contactInfoEvent"), h = e("ui/contactInfoMessage/contactInfoMessage"), p = e("ui/viewModels/people/contactName"), d = e("constants/contentTemplates"), v = e("swx-encoder/lib/encoders/emoticonEncoder"), m = e("ui/viewModels/calling/helpers/callingFacade"), g = e("swx-enums"), y = e("utils/common/eventMixin"), b = f.events, w = e("ui/viewModels/chat/hearts"), E = e("swx-i18n").localization, S = e("vendor/knockout"), x = e("ui/viewModels/chat/messageMediaTypesHandlers"), T = e("swx-utils-chat").messageSanitizer, N = e("swx-ui-navigation"), C = e("utils/chat/message"), k = e("ui/modalDialog/modalDialog"), L = e("ui/modelHelpers/personHelper"), A = e("ui/viewModels/chat/pollAvatars"), O = e("telemetry/chat/poll"), M = e("telemetry/calling/pstn/pstn"), _ = e("swx-pubsub-instance").default, D = e("swx-service-locator-instance").default, P = e("utils/common/styleModeHelper"), H = e("ui/viewModels/chat/messageParsers/swiftCard"), B = e("ui/viewModels/chat/translator/translationItem"), j = e("utils/chat/translatorHelper"), F = e("utils/common/disposableMixin"), I = e("ui/urlPreview/urlPreview"), q = e("telemetry/chat/urlPreviewAction"), R = e("ui/players/ytPlayer"), U = e("ui/modelHelpers/personActionsHelper"), z = e("swx-utils-chat").conversation, W = e("utils/chat/quoteMessageUtils"), X = e("telemetry/chat/quoteMessageEvent"), V = e("utils/common/clipboard");
  return t.assign($.prototype, y), $;
});

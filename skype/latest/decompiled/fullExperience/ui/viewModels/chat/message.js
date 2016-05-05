define("ui/viewModels/chat/message", [
  "require",
  "lodash-compat",
  "ui/telemetry/actions/actionNames",
  "ui/telemetry/actions/actionSources",
  "cafe/applicationInstance",
  "text!views/people/blockContactModal.html",
  "ui/viewModels/people/blockContactModal",
  "utils/common/cafeObservable",
  "constants/components",
  "constants/common",
  "ui/viewModels/people/contactBuilder",
  "telemetry/chat/contactInfoEvent",
  "ui/contactInfoMessage/contactInfoMessage",
  "ui/viewModels/people/contactName",
  "constants/contentTemplates",
  "swx-enums",
  "utils/common/eventMixin",
  "ui/viewModels/chat/hearts",
  "swx-i18n",
  "vendor/knockout",
  "ui/viewModels/chat/messageMediaTypesHandlers",
  "utils/chat/messageSanitizer",
  "utils/chat/message",
  "ui/modalDialog/modalDialog",
  "ui/modelHelpers/personHelper",
  "ui/viewModels/chat/pollAvatars",
  "telemetry/chat/poll",
  "telemetry/calling/pstn/pstn",
  "services/pubSub/pubSub",
  "services/serviceLocator",
  "utils/common/styleModeHelper",
  "ui/viewModels/chat/messageParsers/swiftCard",
  "ui/viewModels/chat/translator/translationItem",
  "utils/chat/translatorHelper",
  "ui/urlPreview/urlPreview",
  "telemetry/chat/urlPreviewAction",
  "ui/players/ytPlayer",
  "experience/settings"
], function (e) {
  function q(e) {
    function G(e) {
      return d.templates[e] || d.templates[v.activityType.TextMessage];
    }
    function Y() {
      var e = {}, n = m.isRead(), r = m.group() === f.activityItemGroups.TEXT || m.group() === f.activityItemGroups.MEDIA || m.group() === f.activityItemGroups.CONTACT_INFO || m.group() === f.activityItemGroups.POLL, i;
      return e.me = m.isMyself && r, e.their = !e.me, e.first = m.isFirstMessage(), e.last = m.isLastMessage(), e.read = n, e.edited = m.isEdited, e.unread = !n, e.showTimestamp = m.showTimestamp, e.sticker = m.isSticker(), e.spacesWelcomeMessage = U, e.deliveryFailed = m.deliveryFailed, e.hearts = m.heartsVM.canHeart() || m.heartsVM.heartsEnabled(), e.urlPreview = m.isUrlPreview(), e.mojiItem = m.isMoji(), e.integrated = m.isIntegrated, e.picture = m.isPicture(), e.copyLink = m.copyLinkEnabled(), e.lastInBubble = m.isLastMessageInBubble(), t.forIn(f.activityItemGroups, function (t) {
        i = t && t.toLowerCase(), i && (e[i] = !1);
      }), m.group() === f.activityItemGroups.PSTN ? e[f.activityItemGroups.CALL] = !0 : e[m.group()] = !0, m.group() === f.activityItemGroups.CONTACT_REQUEST && Z(e), m.group() === f.activityItemGroups.CUSTOM && (e.participant = !0), t.trim(t.reduce(e, function (e, t, n) {
        return w.unwrap(t) ? e + " " + n : e;
      }, m.customMessageClasses || ""));
    }
    function Z(e) {
      function n() {
        return t.includes([
          v.activityType.ContactRequestIncoming,
          v.activityType.ContactRequestOutgoing,
          v.activityType.ContactRequestOutgoingAgent,
          v.activityType.SuggestedContact,
          v.activityType.UnblockContact
        ], m.model.type());
      }
      function r() {
        return t.includes([
          v.activityType.ContactRequestOutgoingResend,
          v.activityType.ContactRequestIsNowContact,
          v.activityType.ContactRequestIncomingInviteFree
        ], m.model.type());
      }
      e.contactMessage = n(), e.their = !e.me && !n(), e.participant = r();
    }
    function et(e) {
      var t = e.type() === v.activityType.ParticipantJoined, n = e.persons();
      return !z || !t ? !1 : (U = n.indexOf(q.personsAndGroupsManager.mePerson) >= 0, U);
    }
    function tt(e) {
      function s(t) {
        return e.author !== t;
      }
      function o(e) {
        return new p(e);
      }
      function a(e) {
        return !N.isMePerson(e);
      }
      var t = u.newObservableProperty(e.context), n = e.persons().filter(s), r;
      e.reason && (r = e.reason()), m.participantsWithoutAuthor = n.map(o);
      if (et(e)) {
        var i = u.newObservableProperty(R.selfParticipant.role);
        m.participantsWithoutMyself = n.filter(a).map(o), m.contentTemplate(G(f.customActivityItemTemplates.SPACES_WELCOME_MESSAGE)), m.spaceLink = u.newObservableProperty(R.uri), m.isJoiningEnabled = u.newObservableProperty(R.isJoiningEnabled), m.conversation = R, m.showSpacesCTA = w.computed(function () {
          return i() === v.participantRole.Leader;
        }), m.welcomeMessage = w.computed(function () {
          return b.fetch({ key: m.isJoiningEnabled() ? "spaces_welcomeMessage" : "spaces_welcomeMessageWithoutLink" });
        }), m.editTopicAction = function () {
          m.dispatchEvent(g.conversation.OPEN_PROFILE, { editTopic: !0 }, m.DIRECTION.PARENT);
        }, m.settingsAction = function () {
          m.dispatchEvent(g.conversation.OPEN_PROFILE, { editTopic: !1 }, m.DIRECTION.PARENT);
        }, m.othersAddedMessageContent = w.computed(function () {
          if (m.participantsWithoutMyself.length > 0)
            return x.getMessageFromParticipantActivityItem(e.type(), m.author, m.participantsWithoutMyself, t, r, R);
        });
      }
      return w.computed(function () {
        return x.getMessageFromParticipantActivityItem(e.type(), m.author, m.participantsWithoutAuthor, t, r, R);
      });
    }
    function nt(e) {
      e.sender && (m.author = l.build(e.sender), m.isMyself = N.isMePerson(e.sender), m.displayname = w.observable(m.isMyself ? "me" : m.author), m.renderAuthorInfo(!m.isMyself), m.showAuthorInfo(!m.isMyself), m.openConversationLabel = w.pureComputed(function () {
        return b.fetch({
          key: "label_text_openConversation",
          params: { displayName: e.sender.displayName() }
        });
      })), m.direction = e.direction && e.direction();
    }
    function rt(e, t) {
      if (t.translation) {
        var n = {
          key: t.translation.key,
          value: t.translation.users[0].value,
          mri: t.translation.users[0].mri
        };
        e.translations.add(n);
      }
    }
    function it(e, n) {
      switch (m.group()) {
      case f.activityItemGroups.PARTICIPANT:
        m.author = l.build(e.author), m.content = tt(e);
        break;
      case f.activityItemGroups.CALL:
        var r = x.getMessageFromCallActivityItem(e, n);
        nt(e), m.content = w.observable(r.text), m.liveSessionDuration = r.duration, m.callAction = r.callAction, m.typeClasses = {
          liveSessionText: !0,
          "fontSize-h4": !0
        };
        break;
      case f.activityItemGroups.NGC_UPGRADE:
        m.content = w.observable(x.getMessageFromNgcUpgradeActivityItem(e));
        break;
      case f.activityItemGroups.PLUGIN_FREE:
        m.content = w.observable(x.getMessageFromPluginFreeActivityItem(e));
        break;
      case f.activityItemGroups.PSTN:
        m.content = w.observable(x.getMessageFromPstnActivityItem(e)), e.type() === v.activityType.PstnInvalidNumber && !e.isGroup() ? (m.linkContent = b.fetch({ key: "pstn_invalid_number_return_link" }), m.linkVisible = !0) : (m.linkContent = "", m.linkVisible = !1), nt(e), m.callAction = "callError", m.typeClasses = {
          liveSessionText: !0,
          "fontSize-h4": !0
        };
        break;
      case f.activityItemGroups.TEXT:
        var i, s;
        nt(e), i = u.newObservableProperty(e.html), $.isFeatureOn(f.featureFlags.SWIFT_CARD_RENDERING) && (s = _.parse(m, e, R)), typeof s != "undefined" ? m.content = s : m.content = w.computed(function () {
          var n = i(), r = W || !n.trim().length, s = $.isFeatureOn(f.featureFlags.URL_PREVIEWS), o = s && q.personsAndGroupsManager.mePerson.preferences(f.userSettings.preferences.URL_PREVIEWS).value(), u = $.isFeatureOn(f.featureFlags.YOUTUBE_PLAYER_ENABLED), a = u && q.personsAndGroupsManager.mePerson.preferences(f.userSettings.preferences.YOUTUBE_PLAYER).value(), l = R._translatorSettings && R._translatorSettings.isEnabled, c = e.direction && e.direction() === f.chat.messageType.INCOMING, h = !V && K && l && c && !e.isDeleted();
          return r ? (n = t.escape(e.text()), n = S.encodeLinkTextRepresentation(n), n = S.encodeEmoticonsTextRepresentation(n)) : $.isFeatureOn(f.featureFlags.ENABLE_RAW_EMOTICONS_RENDERING) && (n = S.encodeEmoticonsRawRepresentation(n)), X && (a && u || o && s) && w.ignoreDependencies(function () {
            H.render(n, m, R, a && u, o && s);
          }), h && P.requestTranslation(n, e.direction(), R, rt.bind(null, e)), m.isSticker(I.test(n)), n;
        }), m.isEdited = u.newObservableProperty(e.isEdited), m.isDeleted = u.newObservableProperty(e.isDeleted), st();
        break;
      case f.activityItemGroups.MEDIA:
        var o = E.fetch(e.type());
        nt(e), o(m, n);
        break;
      case f.activityItemGroups.CONTACT_REQUEST:
        m.author = l.build(e.sender), m.content = w.computed(function () {
          return x.getMessageFromContactRequestActivityItem(e.type(), m.author.getPerson());
        }), m.actionInProgress = w.observable(!1), e.type() === v.activityType.ContactRequestIncoming && (m.greeting = u.newObservableProperty(e.greeting));
        break;
      case f.activityItemGroups.POLL:
        nt(e), m.pollAvatarsVM = C.build(e, function (e) {
          m.dispatchEvent(g.userListPopup.POPUP_TOGGLE, e);
        }), m.isEdited = u.newObservableProperty(e.isEdited), m.isDeleted = u.newObservableProperty(e.isDeleted), m.content = w.observable(b.fetch({
          key: "poll_message_question_header",
          params: { pollQuestion: e.pollQuestion() }
        })), m.pollQuestion = u.newObservableProperty(e.pollQuestion), m.pollAnswers = u.newObservableCollection(e.pollAnswers), m.answerSent = u.newObservableProperty(e.meVoted), m.checkedAnswer = w.observable(), m.checkedAnswerSubscription = e.meCheckedAnswerPositions.changed(function () {
          m.checkedAnswer(t.isEmpty(e.meCheckedAnswerPositions()) ? -1 : e.meCheckedAnswerPositions()[0]);
        }), m.peopleVotedText = w.observable(), m.peopleVotedNumSubscription = e.peopleVotedNum.changed(function (e) {
          m.peopleVotedText(b.fetch({
            key: "poll_message_people_voted",
            params: { count: e }
          }));
        }), m.onAnswerClick = function (t) {
          return e.meVoted() ? m.checkedAnswer(e.meCheckedAnswerPositions()[0]) : (k.activityVote(m.model), m.model.addAnswer(t)), !0;
        };
        break;
      case f.activityItemGroups.CONTACT_INFO:
        nt(e), h.render(e, m, R);
        break;
      case f.activityItemGroups.TRANSACTION:
        var a = "Unsupported transaction message";
        nt(e), m.content = w.observable(a), m.group(f.activityItemGroups.TEXT);
        break;
      case f.activityItemGroups.CUSTOM:
        m.content = w.observable(e.text());
      }
    }
    function st() {
      Q && Q.dispose(), Q = m.isDeleted.subscribe(function (e) {
        if (!e)
          return;
        Q.dispose(), Q = null, m.group(f.activityItemGroups.TEXT), m.contentTemplate("textMessageContentTemplate"), m.isUrlPreview(!1), m.previews && (vt(m.previews()), m.previews([]));
      });
    }
    function ot() {
      m.showSpacesCTA && m.showSpacesCTA.dispose(), m.welcomeMessage && m.welcomeMessage.dispose(), m.othersAddedMessageContent && m.othersAddedMessageContent.dispose(), m.participantsWithoutMyself && t.forEach(m.participantsWithoutMyself, function (e) {
        e.dispose();
      });
    }
    function ut() {
      ot(), m.participantsWithoutAuthor && t.forEach(m.participantsWithoutAuthor, function (e) {
        e.dispose();
      });
    }
    function at() {
      m.messageDeliveryStatusEnabled && m.model.status.changed.off(ft);
    }
    function ft(e) {
      var t = m.model.type() === v.activityType.ParticipantJoinFailed, n = "iconfont ";
      m.deliveryFailed(!1);
      switch (e) {
      case v.activityStatus.Failed:
        m.deliveryFailed(!t), m.statusText(b.fetch({ key: "message_failed_status" })), n += "warning";
        break;
      case v.activityStatus.Succeeded:
        m.statusText(b.fetch({ key: "message_sent_status" })), n += "presenceOnlineStroke";
        break;
      case v.activityStatus.Pending:
        m.statusText(b.fetch({ key: "message_sending_status" })), n += "presenceStroke";
        break;
      default:
        m.statusText("");
      }
      m.deliveryStatusIconCssClass(n);
    }
    function lt(e) {
      var t;
      t = q.conversationsManager.getConversation(e), q.conversationsManager.conversations.add(t), A.publish(g.navigation.OPEN_CONVERSATION, {
        model: t,
        origin: f.telemetry.historyLoadOrigin.AUTHOR_SWITCH
      });
    }
    function ct(e) {
      if (!m.contacts || m.isMyself)
        return;
      h.handleContactAdded(e.id(), m);
    }
    function ht(e) {
      var t;
      return m.model.contacts().some(function (n) {
        n.id() === e && (t = n);
      }), t;
    }
    function pt(e) {
      e ? m.model.status.changed(ft) : at();
    }
    function dt() {
      m.actionInProgress(!1);
    }
    function vt(e) {
      e.forEach(function (e) {
        t.isFunction(e.dispose) && (e.ytPlayer(!1), e.dispose.call(e));
      });
    }
    var m = this, q = i.get(), R, U = !1, z, W, X = !e || !e.noUrlPreview, V = e && e.noTranslationItem, $ = O.resolve(f.serviceLocator.FEATURE_FLAGS), J = q.translatorService, K = J && q.translatorService.state() === f.translatorServiceState.Authenticated, Q;
    this.init = function (e, t) {
      var n = O.resolve(f.serviceLocator.FEATURE_FLAGS), r = e.key();
      z = n.isFeatureOn(f.featureFlags.SPACES), W = n.isFeatureOn(f.featureFlags.MESSAGE_ENFORCE_TEXT_FORMAT), R = t, m.isEdited = w.observable(!1), m.messageDeliveryIndicatorEnabledSW4B = n.isFeatureOn(f.featureFlags.SHOW_MESSAGE_DELIVERY_INDICATOR_SW4B), m.messageDeliveryStatusEnabled = n.isFeatureOn(f.featureFlags.SHOW_MESSAGE_DELIVERY_STATUS) && e.type() !== v.activityType.SystemMessage, m.isDeleted = w.observable(!1), m.isMyself = !1, m.clientmessageid = r, m.contentId = r ? "msg_" + r : null, m.timestamp = e.timestamp(), m.setTimestamp = w.observable("00:00"), m.showTimestamp = w.observable(!0), m.isRead = u.newObservableProperty(e.isRead), m.isFirstMessage = w.observable(!1), m.isLastMessage = w.observable(!1), m.isLastMessageInBubble = w.observable(!1), m.model = e, m.group = w.observable(x.getActivityItemGroup(e.type())), m.isGroupConversation = R.isGroupConversation(), m.renderAuthorInfo = w.observable(!1), m.showAuthorInfo = w.observable(!1), m.liveSessionDuration = !1, m.isCallActivityItem = w.computed(function () {
        return m.group() === f.activityItemGroups.CALL || m.group() === f.activityItemGroups.PSTN;
      }), m.isSticker = w.observable(), m.isMoji = w.observable(!1), m.isPicture = w.observable(!1), m.isUrlPreview = w.observable(!1), m.deliveryFailed = w.observable(!1), m.deliveryFailedMessage = b.fetch({ key: "message_not_delivered_text" }), m.statusText = w.observable(), m.deliveryStatusIconCssClass = w.observable(), m.isMyLastMessageInChat = w.observable(!1), m.isIntegrated = M.get().isIntegratedProperty(), m.copyLinkEnabled = w.observable(!1), m.copyActive = w.observable(!1), m.heartsVM = y.build(m, R, function (e) {
        m.dispatchEvent(g.userListPopup.POPUP_TOGGLE, e);
      }), m.heartsVM.init(), m.contentTemplate = w.observable(G(e.type())), m.typeClasses = {}, it(e, R.isGroupConversation()), m.cssClass = w.computed(Y, this), m.messageDeliveryIndicatorEnabledSW4B && m.model.status.changed(ft), m.messageDeliveryStatusEnabled && m.isMyLastMessageInChat.subscribe(pt), q.personsAndGroupsManager.all.persons.added(ct), V || (m.translationItem = D.build(m, R), m.translationItem.init()), m.forwardEvent(g.videoPlayer.FULLSCREEN_ON, m.DIRECTION.PARENT, null, m.DIRECTION.CHILD), m.forwardEvent(g.videoPlayer.FULLSCREEN_OFF, m.DIRECTION.PARENT, null, m.DIRECTION.CHILD);
    }, this.dispose = function () {
      Q && Q.dispose(), m.content && m.content.dispose && m.content.dispose(), m.cssClass && m.cssClass.dispose(), m.author && m.author.dispose(), m.isCallActivityItem && m.isCallActivityItem.dispose(), m.checkedAnswerSubscription && m.checkedAnswerSubscription.dispose && m.checkedAnswerSubscription.dispose(), m.peopleVotedNumSubscription && m.peopleVotedNumSubscription.dispose && m.peopleVotedNumSubscription.dispose(), ut(), m.model && (m.messageDeliveryIndicatorEnabledSW4B || m.messageDeliveryStatusEnabled) && m.model.status.changed.off(ft), m.heartsVM && m.heartsVM.dispose(), q.personsAndGroupsManager.all.persons.added.off(ct), m.translationItem && m.translationItem.dispose(), m.previews && (vt(m.previews()), m.previews([]));
    }, this.onRendered = function () {
      m.isRendered = !0, m.dispatchEvent(g.message.RENDERED);
    }, this.onBeforeExpanded = function () {
      m.dispatchEvent(g.message.BEFORE_EXPANDED);
    }, this.onAfterExpanded = function () {
      m.dispatchEvent(g.message.AFTER_EXPANDED);
    }, this.openConversationWithAuthor = function () {
      if (R.selfParticipant.isAnonymous() || N.isGuest(m.model.sender))
        return !1;
      lt(m.model.sender);
    }, this.navigateToDialPad = function () {
      function e() {
        return {
          page: a.calling.SKYPEOUT_PAGE,
          origin: f.telemetry.historyLoadOrigin.SKYPEOUT_PAGE
        };
      }
      A.publish(f.events.navigation.NAVIGATE, e());
    }, this.sendContactRequest = function () {
      function o(e, t, n) {
        function i(r) {
          r.name() === F.defaultBusinessContactsGroup && (q.personsAndGroupsManager.all.groups.added.off(i), u(r, e, t, n));
        }
        var r;
        r = q.personsAndGroupsManager.createGroup(), r.name.set(F.defaultBusinessContactsGroup), q.personsAndGroupsManager.all.groups.add(r).then(function () {
          q.personsAndGroupsManager.all.groups.added(i);
        }, n);
      }
      function u(e, t, n, r) {
        e.persons.add(t.id()).then(function () {
          R.historyService.removeCustomActivityItem(v.activityType.ContactRequestOutgoing), R.historyService.removeCustomActivityItem(v.activityType.ContactRequestIsNowContact), R.historyService.addCustomActivityItem(v.activityType.ContactRequestIsNowContact, { sender: t }), n();
        }, r);
      }
      function a() {
        r === v.activityType.ContactRequestOutgoing && i.recordAction(n.contacts.contactRequestSent, { isResend: !1 }), r === v.activityType.ContactRequestOutgoingAgent && i.recordAction(n.contacts.contactRequestSent, { isResend: !1 }), r === v.activityType.ContactRequestOutgoingResend && i.recordAction(n.contacts.contactRequestSent, { isResend: !0 }), r === v.activityType.SuggestedContact && i.recordAction(n.contacts.contactRequestSuggestedSent);
      }
      var e, t = m.model.sender, r = m.model.type(), i = O.resolve(f.serviceLocator.ACTION_TELEMETRY), s;
      return m.actionInProgress(!0), q.conversationsManager.conversations.add(R), $.isFeatureOn(f.featureFlags.ENABLE_BUSINESS_CONTACT_MANAGEMENT) ? e = new Promise(function (e, n) {
        q.personsAndGroupsManager.all.groups.get().then(function (r) {
          s = r.filter(function (e) {
            return e.name() === F.defaultBusinessContactsGroup;
          }), s.length > 0 ? u(s[0], t, e, n) : o(t, e, n);
        }, n);
      }) : e = q.personsAndGroupsManager.all.persons.add(t, t.id(), undefined, r), a(), e.then(dt, dt), e;
    }, this.acceptContactRequest = function () {
      var e, t = m.model.sender, r = O.resolve(f.serviceLocator.ACTION_TELEMETRY);
      return m.actionInProgress(!0), e = q.personsAndGroupsManager.all.persons.add(t, t.id(), undefined, v.activityType.ContactRequestIncoming), r.recordAction(n.contacts.contactRequestAccepted), e.then(dt, dt), e;
    }, this.declineContactRequest = function () {
      var e, t = O.resolve(f.serviceLocator.ACTION_TELEMETRY);
      return m.actionInProgress(!0), e = q.conversationsManager.conversations.remove(R, v.activityType.ContactRequestIncoming), t.recordAction(n.contacts.contactRequestDeclined), e.then(dt, dt), e;
    }, this.blockContactRequest = function () {
      var e = { source: r.contactRequestIncomingActivityItem }, t = new o(m.author.getPerson(), e), n = b.fetch({ key: "modal_blockContact_text_aria_label" });
      return T.build(o.ELEMENT_ID, t, s), T.show(o.ELEMENT_ID, n), Promise.resolve();
    }, this.unblockContact = function () {
      var e, t = m.model.sender, i = O.resolve(f.serviceLocator.ACTION_TELEMETRY);
      return m.actionInProgress(!0), i.recordAction(n.contacts.contactUnblocked, { source: r.unblockActivityItem }), t.isBlocked.set.enabled() ? e = t.isBlocked.set(!1) : e = Promise.resolve(), e.then(dt, dt), e;
    }, this.openUrlPreview = function (e, t) {
      function n() {
        if (!$.isFeatureOn(f.featureFlags.URL_PREVIEW_LOAD_YOUTUBE_PLAYER))
          return !1;
        var n = t || w.utils.arrayFirst(m.previews(), function (t) {
          return t.url() === e;
        });
        return n && n.type() === f.urlPreviewType.YT && !n.restrictions ? n : null;
      }
      var r = n(), i = {
          url: e,
          timestamp: m.timestamp,
          participantCount: R.participantsCount()
        };
      return B.publishActionEvent(i), r && j.render(r, m, R, e) ? !1 : !0;
    }, this.isPSTNContactMessage = function (e) {
      var t = ht(e);
      return N.isPstn(t);
    }, this.contactHasFullName = function (e) {
      var t = ht(e);
      return t.displayName() !== e || N.isPstn(t);
    }, this.isMePersonContactMessage = function (e) {
      return N.isMePersonId(e);
    }, this.openConversationWithUser = function (e) {
      var t = ht(e);
      lt(t), c.publishActionEvent({
        person: t,
        participantsCount: R.participantsCount(),
        timeInStale: m.timestamp.getTime()
      });
    }, this.addCreditTelemetry = function (e, t) {
      var n = f.telemetry.pstn;
      return t.target.className === n.cssClasses.ADD_CREDIT ? L.addingCredit(n.entryPoint.NO_CREDIT_CALL_END) : t.target.className === n.cssClasses.ADD_SUBSCRIPTION && L.addingSubscription(n.entryPoint.NO_SUBSCRIPTION_CALL_END), !0;
    }, this.activateFirstLink = function (e, t) {
      var n = e.elementInfo.element.querySelector(".content a");
      n && t.target.tagName !== "A" && (n.click(), t.preventDefault(), t.stopPropagation());
    };
  }
  var t = e("lodash-compat"), n = e("ui/telemetry/actions/actionNames"), r = e("ui/telemetry/actions/actionSources"), i = e("cafe/applicationInstance"), s = e("text!views/people/blockContactModal.html"), o = e("ui/viewModels/people/blockContactModal"), u = e("utils/common/cafeObservable"), a = e("constants/components"), f = e("constants/common"), l = e("ui/viewModels/people/contactBuilder"), c = e("telemetry/chat/contactInfoEvent"), h = e("ui/contactInfoMessage/contactInfoMessage"), p = e("ui/viewModels/people/contactName"), d = e("constants/contentTemplates"), v = e("swx-enums"), m = e("utils/common/eventMixin"), g = f.events, y = e("ui/viewModels/chat/hearts"), b = e("swx-i18n").localization, w = e("vendor/knockout"), E = e("ui/viewModels/chat/messageMediaTypesHandlers"), S = e("utils/chat/messageSanitizer"), x = e("utils/chat/message"), T = e("ui/modalDialog/modalDialog"), N = e("ui/modelHelpers/personHelper"), C = e("ui/viewModels/chat/pollAvatars"), k = e("telemetry/chat/poll"), L = e("telemetry/calling/pstn/pstn"), A = e("services/pubSub/pubSub"), O = e("services/serviceLocator"), M = e("utils/common/styleModeHelper"), _ = e("ui/viewModels/chat/messageParsers/swiftCard"), D = e("ui/viewModels/chat/translator/translationItem"), P = e("utils/chat/translatorHelper"), H = e("ui/urlPreview/urlPreview"), B = e("telemetry/chat/urlPreviewAction"), j = e("ui/players/ytPlayer"), F = e("experience/settings"), I = /<span class="emoticon\s?\w*\s?(animated)?\s+\w*large"><span class="emoSprite">.*<\/span><\/span>/i;
  return t.assign(q.prototype, m), q;
})

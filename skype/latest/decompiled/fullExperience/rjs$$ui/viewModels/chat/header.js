define("ui/viewModels/chat/header", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "vendor/knockout",
  "utils/common/eventMixin",
  "utils/common/outsideClickHandler",
  "swx-i18n",
  "swx-cafe-application-instance",
  "swx-service-locator-instance",
  "swx-constants",
  "ui/modelHelpers/conversationHelper",
  "swx-utils-chat",
  "swx-pubsub-instance",
  "utils/common/cafeObservable",
  "ui/viewModels/chat/conversation/callButtonViewModel",
  "ui/viewModels/calling/startCallButtonViewModel",
  "swx-constants",
  "utils/common/eventHelper",
  "ui/telemetry/actions/actionSources",
  "ui/telemetry/chat/guestActionsInHeader",
  "swx-enums",
  "swx-utils-chat",
  "swx-constants",
  "ui/viewModels/chat/conversationActivity",
  "ui/viewModels/chat/conversationTopic",
  "ui/modelHelpers/personHelper",
  "ui/viewModels/chat/conversationTile",
  "ui/educationBubbles/educationBubble",
  "ui/educationBubbles/educationBubbleInfo",
  "utils/common/styleModeHelper",
  "telemetry/chat/profileCards",
  "utils/common/accessibility",
  "ui/telemetry/actions/actionNames"
], function (e, t) {
  function P(e, t, n) {
    function nt(e) {
      return !!e && e.participants().length === 1;
    }
    function rt(e) {
      return nt(e) ? e.participants(0).person.capabilities.groupAdd ? e.participants(0).person.capabilities.groupAdd() : !c.isOneToOneConversationWithAgent(e) : !0;
    }
    function it(e) {
      var t = 0;
      e.forEach(function (e) {
        e && (!e.response || e.response.status !== 200) && t++;
      });
      q.performed(t);
    }
    function st() {
      P.hasNoSelectedParticipants(B ? B.selectedContacts().length === 0 : !0);
    }
    function ot(e) {
      var n = P.editModeActive() || P.profileExpanded();
      P.dispatchEvent(g.roster.EDIT_ROSTER_MODE, {
        isActive: n,
        isEditMode: P.editModeActive()
      }, P.DIRECTION.PARENT);
      e ? (s.add("conversationHeader", P.toggleProfile), t.restrict()) : (s.remove("conversationHeader"), t.restore());
    }
    function ut() {
      z(!1);
      B = null;
      st();
      P.toggleEditMode();
      p.publish(l.LEAVE_EDIT_MODE);
    }
    function at(e) {
      var t = u.get().conversationsManager, r = e().slice(0), s = z() ? !R() : R(), o;
      r.push(i.participants(0).person);
      o = h.createConversation(r, t, !0);
      o.isJoiningEnabled.set.enabled.once(!0, function () {
        o.isJoiningEnabled.set(s);
      });
      s && P.spacesEnabled && o.topic.set.enabled.once(!0, function () {
        o.topic(c.createSpaceTopic());
      });
      p.publish(l.OPEN_CONVERSATION, {
        model: o,
        origin: f.telemetry.historyLoadOrigin.CONVERSATION_TO_THREAD,
        contentElementId: n
      });
    }
    function ft() {
      return P.editModeActive();
    }
    function lt() {
      return !U.isFeatureOn(f.featureFlags.CALLING) || U.isFeatureOn(f.featureFlags.USE_BUSINESS_WORDING) && P.isCallingDisabled() ? !0 : !1;
    }
    function ct() {
      return !U.isFeatureOn(f.featureFlags.CALLING) || U.isFeatureOn(f.featureFlags.USE_BUSINESS_WORDING) && P.isVideoCallingDisabled() ? !0 : !1;
    }
    function ht() {
      var e = "secondary circle stroke";
      return P.editModeActive() ? e + " active" : e;
    }
    function pt() {
      return tt() ? !0 : G() ? !P.canAddParticipants() : !0;
    }
    function dt() {
      z(!z());
    }
    function vt(e) {
      e && mt();
    }
    function mt() {
      var e = P.editModeActive(), t = P.profileExpanded();
      if (!e && !t)
        return;
      e ? P.canAddParticipants() ? P.undoSelectedParticipants() : P.toggleEditMode() : P.toggleProfile();
    }
    function gt() {
      var t = a.resolve(f.serviceLocator.ACTION_TELEMETRY);
      t.recordAction(D.conversation.addParticipantsButton);
      P.profileExpanded(!1);
      q = e.conversationUpdateFlow;
      q.start(i.participants().length, i.isGroupConversation());
    }
    function yt(e) {
      P.profileExpanded() || P.toggleProfile(undefined, e);
      e.editTopic && !P.topicEditorExpanded() && P.openTopicEditor();
    }
    function bt() {
      P.profileExpanded() && P.toggleProfile();
    }
    function wt() {
      return !P.isGroupConversation();
    }
    function Et() {
      return c.isConversationWithWelcomeAgent(P.conversationModel) ? !1 : P.isGroupConversation() && P.headerControlsEnabled() || !P.isGroupConversation();
    }
    function St() {
      return Et() ? 0 : -1;
    }
    function xt(e) {
      var t = Nt();
      t.parent = e.parent;
      w.get().onCopyLinkClicked(t);
    }
    function Tt(e) {
      var t = Nt();
      t.parent = e.parent;
      w.get().onEmailLinkClicked(t);
    }
    function Nt() {
      return {
        participantsCount: P.conversationModel.participants.length,
        userMessagesCount: P.conversationModel.historyService.activityItems().filter(function (e) {
          return e.type() === E.activityType.TextMessage && C.isMePerson(e.sender);
        }).length,
        totalMessagesCount: P.conversationModel.historyService.activityItems().length
      };
    }
    function Ct(e) {
      P.participantCount(e);
      U.isFeatureOn(f.featureFlags.INCLUDE_SELF_IN_PARTICIPANTS_COUNT) && P.participantCount(e + 1);
    }
    function kt(e) {
      P._internal.isModelTopicEditable(e);
    }
    function Lt() {
      var e = c.isOneToOneConversationWithBlockedPerson(P.conversationModel);
      G(!e && rt(P.conversationModel));
    }
    function At() {
      nt(P.conversationModel) && P.conversationModel.participants()[0].person.capabilities.groupAdd ? (Y = P.conversationModel.participants()[0].person, Y.capabilities.groupAdd.changed(Lt)) : Lt();
    }
    function Ot() {
      nt(P.conversationModel) ? (Y = P.conversationModel.participants()[0].person, Y.isBlocked.changed(Lt)) : Lt();
    }
    function Mt() {
      _t();
      Dt();
      At();
      Ot();
    }
    function _t() {
      Y && Y.capabilities.groupAdd && Y.capabilities.groupAdd.changed.off(Lt);
    }
    function Dt() {
      Y && Y.isBlocked.changed.off(Lt);
    }
    function Pt(e) {
      e.conversationModel.conversationId === P.conversationModel.conversationId && tt(!0);
    }
    function Ht() {
      tt(!1);
    }
    function Bt() {
      var e;
      U.isFeatureOn(f.featureFlags.CALL_EDUCATION_BUBBLE) && (e = a.resolve(f.serviceLocator.SUBSCRIPTION_PROVIDER), e.getContacts().then(function () {
        !P.isCallingDisabled() && !P.callButtonViewModel.isVideoDisabled() && It() && Ft(A.CALL_EDUCATION_BUBBLE);
      }));
    }
    function jt() {
      var e;
      P.showMoreActions() && U.isFeatureOn(f.featureFlags.SCHEDULE_CALL_EDUCATION_BUBBLE_1) && (P.isGroupConversation() ? e = A.SCHEDULE_CALL_EDUCATION_BUBBLE_1_GROUP : (e = A.SCHEDULE_CALL_EDUCATION_BUBBLE_1, e.options.i18nParams = { name: P.topic() }), Ft(e));
    }
    function Ft(e) {
      var t = L.build(e.id, e.anchorElementQuery, e.i18nKey, e.iconUrlPath, e.options);
      t.show();
    }
    function It() {
      var e = i.participants().filter(function (e) {
        return e.person.status() === E.onlineStatus.Online;
      });
      return e.length > 0;
    }
    function qt(e, t) {
      var n = e ? "accessibility_contactProfile_closedProfile" : "accessibility_contactProfile_openedProfile";
      _.announce({
        key: n,
        params: { topic: t }
      });
    }
    var i = e.conversationModel, P = this, H, B = null, j, F, I, q = e.conversationUpdateFlow, R = d.newObservableProperty(i.isJoiningEnabled), U = a.resolve(f.serviceLocator.FEATURE_FLAGS), z = r.observable(!1), W, X = T.build(i), V = N.build(i), $ = u.get().translatorService, J = c.isPstnOnlyConversation(i), K = c.isOneToOneConversationWithAgent(i), Q = c.isOneToOneConversationWithEcho(i), G = r.observable(!1), Y, Z, et, tt = r.observable(!1);
    P._internal = { isModelTopicEditable: r.observable(!1) };
    P.conversation = k.build(i, { contactOptions: { moodMessageFirst: !0 } });
    P.callButtonViewModel = v.build(i);
    P.callButtonViewModel.setContext(this);
    P.startCallButtonViewModel = m.build({
      callButtonViewModel: P.callButtonViewModel,
      historyOrigin: f.telemetry.historyLoadOrigin.CONVERSATION_HEADER_BUTTON,
      telemetryContext: { source: b.conversation.header.button }
    });
    P.conversationModel = i;
    P.conversationModel.participants.changed(Mt);
    P.spacesEnabled = U.isFeatureOn(f.featureFlags.SPACES);
    P.telemetryContext = { source: b.invitesShareButtons.header };
    P.newConversationV2 = U.isFeatureOn(f.featureFlags.NEW_CONVERSATION_V2);
    P.headerControlsEnabled = function () {
      return U.isFeatureOn(f.featureFlags.HEADER_CONTROLS_DISABLED) ? !1 : c.isConversationWithWelcomeAgent(P.conversationModel) ? !1 : !0;
    };
    P.joinCallAriaLabel = o.fetch({ key: "button_text_joinCall" });
    P.joinCallTitle = o.fetch({ key: "button_text_joinCall" });
    P.addParticipantsTitle = o.fetch({ key: "button_text_addParticipants" });
    P.cancelAddParticipantsTitle = o.fetch({ key: "button_text_cancelAddParticipants" });
    P.spaceLink = d.newObservableProperty(i.uri);
    $ && (P.translatorServiceStateObservable = d.newObservableProperty($.state));
    P.role = d.newObservableProperty(i.selfParticipant.role);
    P.isAdmin = r.computed(function () {
      return P.role() === E.participantRole.Leader;
    });
    P.buttonAddPeopleToConversationTitle = r.pureComputed(function () {
      var e = "";
      return P.addParticipantsBtnDisabled() === !1 && (e = o.fetch({ key: "addPeopleToConversation_tooltip" })), e;
    });
    P.buttonAddPeopleToConversationAriaLabel = r.pureComputed(function () {
      var e = "";
      return P.addParticipantsBtnDisabled() === !1 && (e = o.fetch({ key: "accessibility_addPeopleToConversation_ariaLabel" })), e;
    });
    P.editModeActive = r.observable(!1);
    P.canJoinCall = X.canJoinCall;
    P.initializeParticipants = r.observable(!1);
    P.hasNoSelectedParticipants = r.observable(!0);
    P.profileExpanded = r.observable(!1).extend({ rateLimit: 100 });
    P.isGroupConversation = d.newObservableProperty(i.isGroupConversation);
    P.canShowContactProfile = r.computed(wt);
    P.canExpandProfile = r.computed(Et);
    P.tabIndex = r.computed(St);
    P.avatar = d.newObservableProperty(i.avatarUrl);
    P.topic = V.topic;
    P.displayName = V.displayName;
    P.canAddParticipants = r.observable(!1);
    P.contact = null;
    P.isAgent = P.conversation.isAgent;
    P.isPstn = P.conversation.isPstn;
    P.confirmButtonsVisible = r.computed(ft);
    P.addParticipantsBtnClasses = r.computed(ht);
    P.addParticipantsBtnDisabled = r.computed(pt);
    P.isGuestHostConversation = h.isGuestHostConversation(i.conversationId);
    P.isCallingDisabled = X.isCallingDisabled;
    P.isVideoCallingDisabled = X.isVideoCallingDisabled;
    P.hideAudioButton = r.computed(lt);
    P.hideVideoButton = r.computed(ct);
    P.spaceLink = r.observable();
    P.isTooltipVisible = r.observable(!1);
    et = i.participants.add.enabled.changed(function (e) {
      P.canAddParticipants(e);
    });
    Z = i.topic.set.enabled.changed(kt);
    P.spaceTopicEditorEnabled = U.isFeatureOn(f.featureFlags.SPACE_TOPIC_EDITOR);
    P.isServiceEnabled = d.newObservableProperty(P.conversationModel.chatService.sendMessage.enabled);
    P.topicEditable = r.computed(function () {
      return P.isServiceEnabled() && P.isGroupConversation() && P._internal.isModelTopicEditable() && P.spaceTopicEditorEnabled;
    });
    P.canEditTopic = r.computed(function () {
      return P.topicEditable() && P.profileExpanded();
    });
    P.editTopicTitle = o.fetch({ key: "spaces_welcomeRenameBtnTitle" });
    P.editTopicConfirmAria = o.fetch({ key: "action_button_confirm" });
    P.editTopicCancelAria = o.fetch({ key: "action_button_cancel" });
    P.editTopic = r.observable("");
    P.topicEditorExpanded = r.observable(!1);
    P.topicHasFocus = r.observable(!1);
    P.participantCount = r.observable(i.participantsCount());
    i.participantsCount.changed(Ct);
    P.isIntegratedProperty = r.observable(O.get().isIntegratedProperty());
    P.showMoreActions = function () {
      return U.isFeatureOn(f.featureFlags.SCHEDULE_CALL_FROM_CONVERSATION) && !K && !Q;
    };
    P.closeTopicEditor = function () {
      P.topicEditorExpanded(!1);
      P.editTopic("");
    };
    P.openTopicEditor = function () {
      P.editTopic(S.getSanitizedTopic(i.topic()));
      P.topicEditorExpanded(!0);
      P.topicHasFocus(!1);
      H.onTopicEdit();
    };
    P.onTopicEditKeyDown = function (e, t) {
      return t.keyCode === x.ENTER ? (P.updateTopic(), P.topicHasFocus(!0), !1) : t.keyCode === x.ESCAPE ? (P.closeTopicEditor(), t.stopPropagation(), P.topicHasFocus(!0), !1) : !0;
    };
    P.updateTopic = function () {
      var e = S.processOutgoingTextMessage(P.editTopic());
      e.length && (i.topic(e), P.topicEditorExpanded(!1), P.editTopic(""), _.announce({
        key: "spaces_conversation_renamed_success",
        params: { conversationName: e }
      }));
    };
    P.onUpdateTopicKeyDown = function (e, t) {
      var n = y.isActivation(t);
      return n && P.updateTopic(), !n;
    };
    P.onCloseTopicEditorKeyDown = function (e, t) {
      var n = y.isActivation(t);
      return n && P.closeTopicEditor(), !n;
    };
    P.linkShown = r.pureComputed(function () {
      return P.spacesEnabled && (R() || P.isAdmin());
    });
    P.showTranslatorSettings = r.pureComputed(function () {
      return !!$ && !J && !K && !Q && !P.isGroupConversation() && !P.profileExpanded() && P.translatorServiceStateObservable() === f.translatorServiceState.Authenticated;
    });
    P.headerAriaLabel = r.pureComputed(function () {
      var e;
      return P.isGroupConversation() ? e = P.profileExpanded() ? "accessibility_groupProfile_headingWithOpenedProfile" : "accessibility_groupProfile_headingWithClosedProfile" : e = P.profileExpanded() ? "accessibility_contactProfile_headingWithOpenedProfile" : "accessibility_contactProfile_headingWithClosedProfile", o.fetch({
        key: e,
        params: { topic: P.topic() }
      });
    });
    j = P.editModeActive.subscribe(ot);
    F = P.profileExpanded.subscribe(ot);
    P.focusRestrict = function () {
      P.profileExpanded() && t.restrict();
    };
    P.init = function (e) {
      H = e;
      H.init({
        toggleProfile: P.toggleProfile,
        abandonEditMode: mt
      });
      I = P.addParticipantsBtnDisabled.subscribe(vt);
      i.isGroupConversation() && (P.spaceLink = d.newObservableProperty(i.uri));
      P.forwardEvent(g.roster.ROSTER_QUERY_CHANGED);
      P.forwardEvent(g.roster.ROSTER_QUERY_EXECUTED);
      P.forwardEvent(g.roster.ROSTER_SELECTION_REMOVED);
      P.forwardEvent(g.roster.PICKER_CONTACT_SELECTED);
      P.forwardEvent(g.roster.PICKER_CONTACT_DESELECTED);
      P.forwardEvent(g.message.ADD_CONTACT, this.DIRECTION.PARENT, null, this.DIRECTION.CHILD);
      P.forwardEvent(g.actions.callMade, this.DIRECTION.PARENT, null, this.DIRECTION.CHILD);
      P.registerEvent(g.conversation.JOINING_ENABLED, dt);
      P.registerEvent(g.conversation.OPEN_PROFILE, yt);
      P.registerEvent(g.conversation.CLOSE_PROFILE, bt);
      P.registerEvent(g.conversation.COPY_LINK, xt);
      P.registerEvent(g.conversation.EMAIL_LINK, Tt);
      P.registerEvent(g.conversation.MESSAGES_LOADED, P.focusRestrict);
      p.subscribe(f.events.shareControl.SHARE_CONTROL_SHOW, Pt);
      p.subscribe(f.events.shareControl.SHARE_CONTROL_HIDE, Ht);
      Bt();
      jt();
    };
    P.dispose = function () {
      j.dispose();
      F.dispose();
      I.dispose();
      P.selectedContactsSubscription && P.selectedContactsSubscription.dispose();
      P.confirmButtonsVisible.dispose();
      P.addParticipantsBtnDisabled.dispose();
      P.addParticipantsBtnClasses.dispose();
      P.topicEditable.dispose();
      P.canEditTopic.dispose();
      P.isAdmin.dispose();
      P.canShowContactProfile.dispose();
      P.canExpandProfile.dispose();
      P.tabIndex.dispose();
      H && H.dispose();
      H = null;
      P.conversation.dispose();
      X.dispose();
      V.dispose();
      P.callButtonViewModel.dispose();
      P.startCallButtonViewModel.dispose();
      Z && Z.dispose();
      et && et.dispose();
      P.translatorServiceStateObservable && P.translatorServiceStateObservable.dispose();
      P.headerAriaLabel.dispose();
      i.participantsCount.changed.off(Ct);
      _t();
      Dt();
      P.conversationModel.participants.changed.off(Mt);
      p.unsubscribe(f.events.shareControl.SHARE_CONTROL_SHOW, Pt);
      p.unsubscribe(f.events.shareControl.SHARE_CONTROL_HIDE, Ht);
      s.remove("conversationHeader");
    };
    P.submitButtonDisabled = r.pureComputed(function () {
      return P.hasNoSelectedParticipants() && !z();
    });
    P.toggleProfile = function (e, t) {
      if (!Et())
        return;
      var n = P.profileExpanded();
      qt(n, P.topic());
      P.profileExpanded(!n);
      if (i.isGroupConversation()) {
        var r = Nt();
        r.telemetryItem = e;
        r.profileExpanded = n;
        w.get().onProfileToggled(r);
        P.initializeParticipants(!0);
        P.profileExpanded() && P.editModeActive() && ut();
        P.profileExpanded() || P.closeTopicEditor();
        H.onEditModeToggled(P.profileExpanded());
      } else if (P.profileExpanded()) {
        var s = t && t.source ? t.source : b.conversation.header.button;
        M.profileOpened(s);
      }
    };
    P.setParticipantProvider = function (e) {
      P.selectedContactsSubscription && P.selectedContactsSubscription.dispose();
      B = e;
      P.selectedContactsSubscription = B.selectedContacts.subscribe(st);
      st();
    };
    P.toggleEditMode = function () {
      var e = !P.editModeActive();
      P.editModeActive(e);
      e && gt();
      H.onEditModeToggled(e);
    };
    P.showTooltip = function () {
      W && window.clearTimeout(W);
      P.isTooltipVisible(!0);
    };
    P.hideTooltip = function () {
      W = window.setTimeout(function () {
        P.isTooltipVisible(!1);
      }, 500);
    };
    P.undoSelectedParticipants = function () {
      ut();
      q.cancelled();
      q = null;
    };
    P.submitSelectedParticipants = function () {
      var e = B.selectedContacts, t = e().length;
      q.completed(t);
      i.isGroupConversation() ? (z() && i.isJoiningEnabled.set(!R()), h.addPersonsToConversation(e(), i).then(it)) : at(e);
      ut();
    };
    P.onToggleProfileKeyDown = function (e, t) {
      var n = y.isActivation(t);
      return n && P.toggleProfile(), !n;
    };
  }
  var n = e("lodash-compat"), r = e("vendor/knockout"), i = e("utils/common/eventMixin"), s = e("utils/common/outsideClickHandler"), o = e("swx-i18n").localization, u = e("swx-cafe-application-instance"), a = e("swx-service-locator-instance").default, f = e("swx-constants").COMMON, l = f.events.navigation, c = e("ui/modelHelpers/conversationHelper"), h = e("swx-utils-chat").conversation, p = e("swx-pubsub-instance").default, d = e("utils/common/cafeObservable"), v = e("ui/viewModels/chat/conversation/callButtonViewModel"), m = e("ui/viewModels/calling/startCallButtonViewModel"), g = e("swx-constants").COMMON.events, y = e("utils/common/eventHelper"), b = e("ui/telemetry/actions/actionSources"), w = e("ui/telemetry/chat/guestActionsInHeader"), E = e("swx-enums"), S = e("swx-utils-chat").messageSanitizer, x = e("swx-constants").KEYS, T = e("ui/viewModels/chat/conversationActivity"), N = e("ui/viewModels/chat/conversationTopic"), C = e("ui/modelHelpers/personHelper"), k = e("ui/viewModels/chat/conversationTile"), L = e("ui/educationBubbles/educationBubble"), A = e("ui/educationBubbles/educationBubbleInfo"), O = e("utils/common/styleModeHelper"), M = e("telemetry/chat/profileCards"), _ = e("utils/common/accessibility").narrator, D = e("ui/telemetry/actions/actionNames");
  n.assign(P.prototype, i);
  t.build = function (e, t, n) {
    return new P(e, t, n);
  };
});

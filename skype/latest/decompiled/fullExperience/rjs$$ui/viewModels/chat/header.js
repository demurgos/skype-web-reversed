define("ui/viewModels/chat/header", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "vendor/knockout",
  "browser/detect",
  "utils/calling/callingStack",
  "utils/common/eventMixin",
  "utils/common/outsideClickHandler",
  "swx-i18n",
  "cafe/applicationInstance",
  "services/serviceLocator",
  "constants/common",
  "ui/modelHelpers/conversationHelper",
  "services/pubSub/pubSub",
  "utils/common/cafeObservable",
  "ui/viewModels/chat/conversation/callButtonViewModel",
  "ui/viewModels/calling/startCallButtonViewModel",
  "constants/common",
  "utils/common/eventHelper",
  "ui/telemetry/actions/actionSources",
  "ui/telemetry/chat/guestActionsInHeader",
  "swx-enums",
  "utils/chat/messageSanitizer",
  "constants/keys",
  "ui/viewModels/chat/conversationActivity",
  "ui/viewModels/chat/conversationTopic",
  "ui/modelHelpers/personHelper",
  "ui/viewModels/chat/conversationTile",
  "ui/educationBubbles/educationBubble",
  "ui/educationBubbles/educationBubbleInfo",
  "utils/common/styleModeHelper",
  "telemetry/chat/profileCards",
  "ui/telemetry/actions/actionNames"
], function (e, t) {
  function P(e, t) {
    function tt(e) {
      return !!e && e.participants().length === 1;
    }
    function nt(e) {
      return tt(e) ? e.participants(0).person.capabilities.groupAdd ? e.participants(0).person.capabilities.groupAdd() : !p.isOneToOneConversationWithAgent(e) : !0;
    }
    function rt(e) {
      var t = 0;
      e.forEach(function (e) {
        (!e.response || e.response.status !== 200) && t++;
      });
      I.performed(t);
    }
    function it() {
      o.hasNoSelectedParticipants(H ? H.selectedContacts().length === 0 : !0);
    }
    function st() {
      var e = o.editModeActive() || o.profileExpanded();
      o.dispatchEvent(y.roster.EDIT_ROSTER_MODE, {
        isActive: e,
        isEditMode: o.editModeActive()
      }, o.DIRECTION.PARENT);
    }
    function ot() {
      U(!1);
      H = null;
      it();
      o.toggleEditMode();
      d.publish(h.LEAVE_EDIT_MODE);
    }
    function ut(e) {
      var t = e().slice(0), r = U() ? !q() : q(), i;
      t.push(n.participants(0).person);
      i = p.createConversation(t, !0);
      i.isJoiningEnabled.set.enabled.once(!0, function () {
        i.isJoiningEnabled.set(r);
      });
      r && o.spacesEnabled && i.topic.set.enabled.once(!0, function () {
        i.topic(p.createSpaceTopic());
      });
      d.publish(h.OPEN_CONVERSATION, {
        model: i,
        origin: c.telemetry.historyLoadOrigin.CONVERSATION_TO_THREAD
      });
    }
    function at() {
      return o.editModeActive();
    }
    function ft() {
      var e = "secondary circle stroke";
      return o.editModeActive() ? e + " active" : e;
    }
    function lt() {
      return et() ? !0 : Q() ? !o.canAddParticipants() : !0;
    }
    function ct() {
      U(!U());
    }
    function ht(e) {
      e && pt();
    }
    function pt() {
      var e = o.editModeActive(), t = o.profileExpanded();
      if (!e && !t)
        return;
      e ? o.canAddParticipants() ? o.undoSelectedParticipants() : o.toggleEditMode() : o.toggleProfile();
    }
    function dt() {
      var t = l.resolve(c.serviceLocator.ACTION_TELEMETRY);
      t.recordAction(D.conversation.addParticipantsButton);
      o.profileExpanded(!1);
      I = e.conversationUpdateFlow;
      I.start(n.participants().length, n.isGroupConversation());
    }
    function vt(e) {
      o.profileExpanded() || o.toggleProfile(undefined, e);
      e.editTopic && !o.topicEditorExpanded() && o.openTopicEditor();
    }
    function mt() {
      o.profileExpanded() && o.toggleProfile();
    }
    function gt() {
      return R.isFeatureOn(c.featureFlags.CONTACT_PROFILE);
    }
    function yt() {
      return gt() && !o.isGroupConversation();
    }
    function bt() {
      return o.isGroupConversation() && o.headerControlsEnabled || !o.isGroupConversation() && gt();
    }
    function wt() {
      return bt() ? 0 : -1;
    }
    function Et(e) {
      var t = xt();
      t.parent = e.parent;
      E.get().onCopyLinkClicked(t);
    }
    function St(e) {
      var t = xt();
      t.parent = e.parent;
      E.get().onEmailLinkClicked(t);
    }
    function xt() {
      return {
        participantsCount: o.conversationModel.participants.length,
        userMessagesCount: o.conversationModel.historyService.activityItems().filter(function (e) {
          return e.type() === S.activityType.TextMessage && k.isMePerson(e.sender);
        }).length,
        totalMessagesCount: o.conversationModel.historyService.activityItems().length
      };
    }
    function Tt(e) {
      o.participantCount(e);
      R.isFeatureOn(c.featureFlags.INCLUDE_SELF_IN_PARTICIPANTS_COUNT) && o.participantCount(e + 1);
    }
    function Nt(e) {
      o._internal.isModelTopicEditable(e);
    }
    function Ct() {
      var e = p.isOneToOneConversationWithBlockedPerson(o.conversationModel);
      Q(!e && nt(o.conversationModel));
    }
    function kt() {
      tt(o.conversationModel) && o.conversationModel.participants()[0].person.capabilities.groupAdd ? (G = o.conversationModel.participants()[0].person, G.capabilities.groupAdd.changed(Ct)) : Ct();
    }
    function Lt() {
      tt(o.conversationModel) ? (G = o.conversationModel.participants()[0].person, G.isBlocked.changed(Ct)) : Ct();
    }
    function At() {
      Ot();
      Mt();
      kt();
      Lt();
    }
    function Ot() {
      G && G.capabilities.groupAdd && G.capabilities.groupAdd.changed.off(Ct);
    }
    function Mt() {
      G && G.isBlocked.changed.off(Ct);
    }
    function _t() {
      et(!0);
    }
    function Dt() {
      et(!1);
    }
    function Pt() {
      R.isFeatureOn(c.featureFlags.CALL_EDUCATION_BUBBLE) && f.get().personsAndGroupsManager.all.persons.get().then(function () {
        !o.isCallingDisabled() && !o.callButtonViewModel.isVideoDisabled() && jt() && Bt(O.CALL_EDUCATION_BUBBLE);
      });
    }
    function Ht() {
      var e;
      o.showMoreActions() && R.isFeatureOn(c.featureFlags.SCHEDULE_CALL_EDUCATION_BUBBLE_1) && (o.isGroupConversation() ? e = O.SCHEDULE_CALL_EDUCATION_BUBBLE_1_GROUP : (e = O.SCHEDULE_CALL_EDUCATION_BUBBLE_1, e.options.i18nParams = { name: o.topic() }), Bt(e));
    }
    function Bt(e) {
      var t = A.build(e.id, e.anchorElementQuery, e.i18nKey, e.iconUrlPath, e.options);
      t.show();
    }
    function jt() {
      var e = n.participants().filter(function (e) {
        return e.person.status() === S.onlineStatus.Online;
      });
      return e.length > 0;
    }
    function Ft() {
      return R.isFeatureOn(c.featureFlags.CALLING) ? i.getSystemInfo().osName === i.OPERATING_SYSTEMS.LINUX && !s.get().isPluginlessCallingSupported() ? !1 : !0 : !1;
    }
    function It() {
      return R.isFeatureOn(c.featureFlags.CALLING) ? i.getSystemInfo().osName === i.OPERATING_SYSTEMS.LINUX ? !1 : !0 : !1;
    }
    var n = e.conversationModel, o = this, P, H = null, B, j, F, I = e.conversationUpdateFlow, q = v.newObservableProperty(n.isJoiningEnabled), R = l.resolve(c.serviceLocator.FEATURE_FLAGS), U = r.observable(!1), z, W = N.build(n), X = C.build(n), V = f.get().translatorService, $ = p.isPstnOnlyConversation(n), J = p.isOneToOneConversationWithAgent(n), K = p.isOneToOneConversationWithEcho(n), Q = r.observable(!1), G, Y, Z, et = r.observable(!1);
    o._internal = { isModelTopicEditable: r.observable(!1) };
    o.conversation = L.build(n, { contactOptions: { moodMessageFirst: !0 } });
    o.callButtonViewModel = m.build(n);
    o.startCallButtonViewModel = g.build({
      callButtonViewModel: o.callButtonViewModel,
      historyOrigin: c.telemetry.historyLoadOrigin.CONVERSATION_HEADER_BUTTON,
      telemetryContext: { source: w.conversation.header.button }
    });
    o.conversationModel = n;
    o.conversationModel.participants.changed(At);
    o.spacesEnabled = R.isFeatureOn(c.featureFlags.SPACES);
    o.telemetryContext = { source: w.invitesShareButtons.header };
    o.callingDisabled = !Ft();
    o.videoCallingDisabled = !It();
    o.newConversationV2 = R.isFeatureOn(c.featureFlags.NEW_CONVERSATION_V2);
    o.headerControlsEnabled = !R.isFeatureOn(c.featureFlags.HEADER_CONTROLS_DISABLED);
    o.joinCallAriaLabel = a.fetch({ key: "button_text_joinCall" });
    o.joinCallTitle = a.fetch({ key: "button_text_joinCall" });
    o.addParticipantsTitle = a.fetch({ key: "button_text_addParticipants" });
    o.cancelAddParticipantsTitle = a.fetch({ key: "button_text_cancelAddParticipants" });
    o.spaceLink = v.newObservableProperty(n.uri);
    V && (o.translatorServiceStateObservable = v.newObservableProperty(V.state));
    o.role = v.newObservableProperty(n.selfParticipant.role);
    o.isAdmin = r.computed(function () {
      return o.role() === S.participantRole.Leader;
    });
    o.buttonAddPeopleToConversationTitle = r.pureComputed(function () {
      var e = "";
      return o.addParticipantsBtnDisabled() === !1 && (e = a.fetch({ key: "addPeopleToConversation_tooltip" })), e;
    });
    o.buttonAddPeopleToConversationAriaLabel = r.pureComputed(function () {
      var e = "";
      return o.addParticipantsBtnDisabled() === !1 && (e = a.fetch({ key: "accessibility_addPeopleToConversation_ariaLabel" })), e;
    });
    o.editModeActive = r.observable(!1);
    o.canJoinCall = W.canJoinCall;
    o.initializeParticipants = r.observable(!1);
    o.hasNoSelectedParticipants = r.observable(!0);
    o.profileExpanded = r.observable(!1);
    o.isGroupConversation = v.newObservableProperty(n.isGroupConversation);
    o.canShowContactProfile = r.computed(yt);
    o.canExpandProfile = r.computed(bt);
    o.tabIndex = r.computed(wt);
    o.avatar = v.newObservableProperty(n.avatarUrl);
    o.topic = X.topic;
    o.canAddParticipants = r.observable(!1);
    o.contact = null;
    o.isAgent = o.conversation.isAgent;
    o.isPstn = o.conversation.isPstn;
    o.confirmButtonsVisible = r.computed(at);
    o.addParticipantsBtnClasses = r.computed(ft);
    o.addParticipantsBtnDisabled = r.computed(lt);
    o.isCallingDisabled = W.isCallingDisabled;
    o.spaceLink = r.observable();
    o.isTooltipVisible = r.observable(!1);
    Z = n.participants.add.enabled.changed(function (e) {
      o.canAddParticipants(e);
    });
    Y = n.topic.set.enabled.changed(Nt);
    o.spaceTopicEditorEnabled = R.isFeatureOn(c.featureFlags.SPACE_TOPIC_EDITOR);
    o.isServiceEnabled = v.newObservableProperty(o.conversationModel.chatService.sendMessage.enabled);
    o.topicEditable = r.computed(function () {
      return o.isServiceEnabled() && o.isGroupConversation() && o._internal.isModelTopicEditable() && o.spaceTopicEditorEnabled;
    });
    o.canEditTopic = r.computed(function () {
      return o.topicEditable() && o.profileExpanded();
    });
    o.editTopicTitle = a.fetch({ key: "spaces_welcomeRenameBtnTitle" });
    o.editTopicConfirmAria = a.fetch({ key: "action_button_confirm" });
    o.editTopicCancelAria = a.fetch({ key: "action_button_cancel" });
    o.editTopic = r.observable("");
    o.topicEditorExpanded = r.observable(!1);
    o.topicHasFocus = r.observable(!1);
    o.participantCount = r.observable(n.participantsCount());
    n.participantsCount.changed(Tt);
    o.isIntegratedProperty = r.observable(M.get().isIntegratedProperty());
    o.showMoreActions = function () {
      return R.isFeatureOn(c.featureFlags.SCHEDULE_CALL_FROM_CONVERSATION) && !J && !K;
    };
    o.closeTopicEditor = function () {
      o.topicEditorExpanded(!1);
      o.editTopic("");
    };
    o.openTopicEditor = function () {
      o.editTopic(x.getSanitizedTopic(n.topic()));
      o.topicEditorExpanded(!0);
      o.topicHasFocus(!1);
      P.onTopicEdit();
    };
    o.onTopicEditKeyDown = function (e, t) {
      return t.keyCode === T.ENTER ? (o.updateTopic(), o.topicHasFocus(!0), !1) : t.keyCode === T.ESCAPE ? (o.closeTopicEditor(), t.stopPropagation(), o.topicHasFocus(!0), !1) : !0;
    };
    o.updateTopic = function () {
      var e = x.processOutgoingTextMessage(o.editTopic());
      e.length && (n.topic(e), o.topicEditorExpanded(!1), o.editTopic(""));
    };
    o.onUpdateTopicKeyDown = function (e, t) {
      var n = b.isActivation(t);
      return n && o.updateTopic(), !n;
    };
    o.onCloseTopicEditorKeyDown = function (e, t) {
      var n = b.isActivation(t);
      return n && o.closeTopicEditor(), !n;
    };
    o.linkShown = r.pureComputed(function () {
      return o.spacesEnabled && (q() || o.isAdmin());
    });
    o.showTranslatorSettings = r.pureComputed(function () {
      return !!V && !$ && !J && !K && !o.isGroupConversation() && !o.profileExpanded() && o.translatorServiceStateObservable() === c.translatorServiceState.Authenticated;
    });
    o.headerAriaLabel = r.pureComputed(function () {
      var e;
      return o.isGroupConversation() ? e = o.profileExpanded() ? "accessibility_groupProfile_headingWithOpenedProfile" : "accessibility_groupProfile_headingWithClosedProfile" : e = o.profileExpanded() ? "accessibility_contactProfile_headingWithOpenedProfile" : "accessibility_contactProfile_headingWithClosedProfile", a.fetch({
        key: e,
        params: { topic: o.topic() }
      });
    });
    B = o.editModeActive.subscribe(st);
    j = o.profileExpanded.subscribe(st);
    o.focusRestrict = function () {
      o.profileExpanded() && t.restrict();
    };
    o.init = function (e) {
      P = e;
      P.init({
        toggleProfile: o.toggleProfile,
        abandonEditMode: pt
      });
      F = o.addParticipantsBtnDisabled.subscribe(ht);
      n.isGroupConversation() && (o.spaceLink = v.newObservableProperty(n.uri));
      o.forwardEvent(y.roster.ROSTER_QUERY_CHANGED);
      o.forwardEvent(y.roster.ROSTER_QUERY_EXECUTED);
      o.forwardEvent(y.roster.ROSTER_SELECTION_REMOVED);
      o.forwardEvent(y.roster.PICKER_CONTACT_SELECTED);
      o.forwardEvent(y.roster.PICKER_CONTACT_DESELECTED);
      o.registerEvent(y.conversation.JOINING_ENABLED, ct);
      o.registerEvent(y.conversation.OPEN_PROFILE, vt);
      o.registerEvent(y.conversation.CLOSE_PROFILE, mt);
      o.registerEvent(y.conversation.COPY_LINK, Et);
      o.registerEvent(y.conversation.EMAIL_LINK, St);
      o.registerEvent(y.conversation.MESSAGES_LOADED, o.focusRestrict);
      d.subscribe(c.events.shareControl.SHARE_CONTROL_SHOW, _t);
      d.subscribe(c.events.shareControl.SHARE_CONTROL_HIDE, Dt);
      Pt();
      Ht();
    };
    o.dispose = function () {
      B.dispose();
      j.dispose();
      F.dispose();
      o.selectedContactsSubscription && o.selectedContactsSubscription.dispose();
      o.confirmButtonsVisible.dispose();
      o.addParticipantsBtnDisabled.dispose();
      o.addParticipantsBtnClasses.dispose();
      o.topicEditable.dispose();
      o.canEditTopic.dispose();
      o.isAdmin.dispose();
      o.canShowContactProfile.dispose();
      o.canExpandProfile.dispose();
      o.tabIndex.dispose();
      P && P.dispose();
      P = null;
      o.conversation.dispose();
      W.dispose();
      X.dispose();
      o.callButtonViewModel.dispose();
      o.startCallButtonViewModel.dispose();
      Y && Y.dispose();
      Z && Z.dispose();
      o.translatorServiceStateObservable && o.translatorServiceStateObservable.dispose();
      n.participantsCount.changed.off(Tt);
      Ot();
      Mt();
      o.conversationModel.participants.changed.off(At);
      d.unsubscribe(c.events.shareControl.SHARE_CONTROL_SHOW, _t);
      d.unsubscribe(c.events.shareControl.SHARE_CONTROL_HIDE, Dt);
      u.remove("conversationHeader");
    };
    o.submitButtonDisabled = r.pureComputed(function () {
      return o.hasNoSelectedParticipants() && !U();
    });
    o.toggleProfile = function (e, r) {
      if (!bt())
        return;
      var i = o.profileExpanded();
      o.profileExpanded(!i);
      o.profileExpanded() ? (u.add("conversationHeader", o.toggleProfile), t.restrict()) : (u.remove("conversationHeader"), t.restore());
      if (n.isGroupConversation()) {
        var s = xt();
        s.telemetryItem = e;
        s.profileExpanded = i;
        E.get().onProfileToggled(s);
        o.initializeParticipants(!0);
        o.profileExpanded() && o.editModeActive() && ot();
        o.profileExpanded() || o.closeTopicEditor();
        P.onEditModeToggled(o.profileExpanded());
      } else if (o.profileExpanded()) {
        var a = r && r.source ? r.source : w.conversation.header.button;
        _.profileOpened(a);
      }
    };
    o.setParticipantProvider = function (e) {
      o.selectedContactsSubscription && o.selectedContactsSubscription.dispose();
      H = e;
      o.selectedContactsSubscription = H.selectedContacts.subscribe(it);
      it();
    };
    o.toggleEditMode = function () {
      var e = !o.editModeActive();
      o.editModeActive(e);
      e && dt();
      P.onEditModeToggled(e);
    };
    o.showTooltip = function () {
      z && window.clearTimeout(z);
      o.isTooltipVisible(!0);
    };
    o.hideTooltip = function () {
      z = window.setTimeout(function () {
        o.isTooltipVisible(!1);
      }, 500);
    };
    o.undoSelectedParticipants = function () {
      ot();
      I.cancelled();
      I = null;
    };
    o.submitSelectedParticipants = function () {
      var e = H.selectedContacts, t = e().length;
      I.completed(t);
      n.isGroupConversation() ? (U() && n.isJoiningEnabled.set(!q()), p.addPersonsToConversation(e(), n).then(rt)) : ut(e);
      ot();
    };
    o.onToggleProfileKeyDown = function (e, t) {
      var n = b.isActivation(t);
      return n && o.toggleProfile(), !n;
    };
  }
  var n = e("lodash-compat"), r = e("vendor/knockout"), i = e("browser/detect"), s = e("utils/calling/callingStack"), o = e("utils/common/eventMixin"), u = e("utils/common/outsideClickHandler"), a = e("swx-i18n").localization, f = e("cafe/applicationInstance"), l = e("services/serviceLocator"), c = e("constants/common"), h = c.events.navigation, p = e("ui/modelHelpers/conversationHelper"), d = e("services/pubSub/pubSub"), v = e("utils/common/cafeObservable"), m = e("ui/viewModels/chat/conversation/callButtonViewModel"), g = e("ui/viewModels/calling/startCallButtonViewModel"), y = e("constants/common").events, b = e("utils/common/eventHelper"), w = e("ui/telemetry/actions/actionSources"), E = e("ui/telemetry/chat/guestActionsInHeader"), S = e("swx-enums"), x = e("utils/chat/messageSanitizer"), T = e("constants/keys"), N = e("ui/viewModels/chat/conversationActivity"), C = e("ui/viewModels/chat/conversationTopic"), k = e("ui/modelHelpers/personHelper"), L = e("ui/viewModels/chat/conversationTile"), A = e("ui/educationBubbles/educationBubble"), O = e("ui/educationBubbles/educationBubbleInfo"), M = e("utils/common/styleModeHelper"), _ = e("telemetry/chat/profileCards"), D = e("ui/telemetry/actions/actionNames");
  n.assign(P.prototype, o);
  t.build = function (e, t) {
    return new P(e, t);
  };
});

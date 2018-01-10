define("ui/viewModels/chat/groupProfile", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "utils/common/eventMixin",
  "swx-constants",
  "swx-i18n",
  "swx-enums",
  "swx-service-locator-instance",
  "swx-constants",
  "ui/contextMenu/contextMenu",
  "utils/common/cafeObservable",
  "swx-utils-chat",
  "ui/contextMenu/menuItem",
  "utils/common/eventHelper",
  "swx-pubsub-instance",
  "utils/common/location",
  "ui/modalDialog/leaveConversationDialog",
  "ui/modalDialog/removeConversationHistoryDialog",
  "ui/modelHelpers/personHelper",
  "swx-cafe-application-instance"
], function (e) {
  function w(e, r) {
    function L(e, t) {
      d.publish(a.events.interaction.SCROLL_START, t);
    }
    function A(e) {
      S.lessParticipants(e <= 4);
      S.participantCount(e);
      x.isFeatureOn(a.featureFlags.INCLUDE_SELF_IN_PARTICIPANTS_COUNT) && S.participantCount(e + 1);
    }
    function M() {
      return x.isFeatureOn(a.featureFlags.USE_BUSINESS_WORDING);
    }
    function D(e) {
      return e + "_4b";
    }
    var E = e.conversationModel, S = this, x = u.resolve(a.serviceLocator.FEATURE_FLAGS), T = x.isFeatureOn(a.featureFlags.SPACES), N = x.isFeatureOn(a.featureFlags.REMOVE_CONVERSATION_HISTORY), C = !x.isFeatureOn(a.featureFlags.DISABLE_LEAVE_CONVERSATION), k = x.isFeatureOn(a.featureFlags.GROUP_AVATAR_UPDATE_ENABLED), O = l.newObservableProperty(E.isJoiningEnabled.set.enabled);
    S.model = E;
    S.closeLabel = s.fetch({ key: "header_text_close" });
    S.avatar = l.newObservableProperty(E.avatarUrl);
    S.spaceLink = l.newObservableProperty(E.uri);
    S.participants = l.newObservableCollection(E.participants);
    S.canLeaveConversation = C ? l.newObservableProperty(E.leave.enabled) : n.observable(!1);
    S.canRemoveConversation = !y.isGuest(b.get().personsAndGroupsManager.mePerson) && N && E.historyService.removeAll ? l.newObservableProperty(E.historyService.removeAll.enabled) : n.observable(!1);
    S.mailtoLink = n.computed(function () {
      return c.createMailtoLink(E.topic(), S.spaceLink());
    });
    S.role = l.newObservableProperty(E.selfParticipant.role);
    S.isAdmin = n.computed(function () {
      return S.role() === o.participantRole.Leader;
    });
    S.groupProfileHeading = n.computed(function () {
      return S.isAdmin() ? s.fetch({ key: "header_text_adminSettings" }) : s.fetch({ key: "header_text_groupSettings" });
    });
    S.spacesLinkAriaLabel = n.computed(function () {
      return s.fetch({
        key: "groupProfile_spacesLink_ariaLabel",
        params: { spacesUrl: S.spaceLink() }
      });
    });
    S.participantCount = n.observable(E.participantsCount());
    S.lessParticipants = n.observable(!0);
    E.participantsCount.changed(A);
    S.joiningEnabled = n.observable(E.isJoiningEnabled());
    E.isJoiningEnabled.changed(S.joiningEnabled);
    S.historyDisclosed = n.observable(E.historyService.isHistoryDisclosed());
    E.historyService.isHistoryDisclosed.changed(S.historyDisclosed);
    S.historyToggleAriaLabel = n.computed(function () {
      var e = S.historyDisclosed() ? "accessibility_groupProfile_historyToggle_on" : "accessibility_groupProfile_historyToggle_off";
      return s.fetch({ key: e });
    });
    S.joiningToggleAriaLabel = n.computed(function () {
      var e = S.joiningEnabled() ? "accessibility_groupProfile_joiningToggle_on" : "accessibility_groupProfile_joiningToggle_off";
      return s.fetch({ key: e });
    });
    S.joiningEnabledVisible = n.computed(function () {
      return T && S.isAdmin() && O();
    });
    S.spaceLinkVisible = n.computed(function () {
      return T && S.joiningEnabled() && S.spaceLink();
    });
    S.historyDisclosedVisible = n.observable(!1);
    E.historyService.isHistoryDisclosed.set.enabled.changed(S.historyDisclosedVisible);
    S.showSettings = n.computed(function () {
      return Boolean(S.historyDisclosedVisible() && S.isAdmin() || S.joiningEnabledVisible() || S.spaceLinkVisible());
    });
    S.avatarUpdateEnabled = k;
    S.dispose = function () {
      E.isJoiningEnabled.changed.off(S.joiningEnabled);
      E.historyService.isHistoryDisclosed.changed.off(S.historyDisclosed);
      E.isJoiningEnabled.set.enabled.changed.off(S.joiningEnabledVisible);
      E.historyService.isHistoryDisclosed.set.enabled.changed.off(S.historyDisclosedVisible);
      E.participantsCount.changed.off(A);
      r.dispose();
      S.mailtoLink.dispose();
      S.isAdmin.dispose();
      S.groupProfileHeading.dispose();
      S.spacesLinkAriaLabel.dispose();
      S.joiningEnabledVisible.dispose();
      S.spaceLinkVisible.dispose();
      S.showSettings.dispose();
      S.historyToggleAriaLabel.dispose();
      S.joiningToggleAriaLabel.dispose();
    };
    S.leaveConversation = function () {
      m.start(S.model, a.telemetry.leaveConversation.cta.PROFILE);
    };
    S.handleLeaveConversationKeyUp = function (e, t) {
      var n = p.isActivation(t);
      n && S.leaveConversation();
    };
    S.removeConversationText = function () {
      var e = "recentItemMenuItem_text_remove";
      return M() ? s.fetch({ key: D(e) }) : s.fetch({ key: e });
    };
    S.removeConversation = function () {
      g.start(S.model, a.telemetry.removeConversationHistory.cta.PROFILE);
    };
    S.handleRemoveConversationKeyUp = function (e, t) {
      var n = p.isActivation(t);
      n && S.removeConversation();
    };
    S.onHistoryDisclosedKeydown = function (e, t) {
      var n = p.isActivation(t);
      return n && S.historyDisclosedHandler(), !n;
    };
    S.historyDisclosedHandler = function () {
      var e = S.historyDisclosed();
      E.historyService.isHistoryDisclosed.set(!e).catch(function () {
      });
    };
    S.onJoiningEnabledKeydown = function (e, t) {
      var n = p.isActivation(t);
      return n && S.joiningEnabledHandler(), !n;
    };
    S.joiningEnabledHandler = function () {
      var e = S.joiningEnabled();
      E.isJoiningEnabled.set(!e).catch(function () {
      });
    };
    S.spaceMenuHandler = function (e, t) {
      function o() {
        v.setHref(S.mailtoLink());
      }
      var n, r, i = [];
      n = new h(w.CopyLinkMenuItemType, s.fetch({ key: "header_text_copyLink" }));
      i.push(n);
      r = new h(w.SendViaEmailMenuItemType, s.fetch({ key: "header_text_inviteViaEmail" }), o);
      i.push(r);
      f.show(i, t);
    };
    S.onScroll = t.debounce(L, 1000, {
      leading: !0,
      trailing: !1
    });
    S.init = function () {
      r.init();
      S.forwardEvent(i.conversation.COPY_LINK, S.DIRECTION.PARENT);
      S.forwardEvent(i.conversation.EMAIL_LINK, S.DIRECTION.PARENT);
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("utils/common/eventMixin"), i = e("swx-constants").COMMON.events, s = e("swx-i18n").localization, o = e("swx-enums"), u = e("swx-service-locator-instance").default, a = e("swx-constants").COMMON, f = e("ui/contextMenu/contextMenu"), l = e("utils/common/cafeObservable"), c = e("swx-utils-chat").spaceMail, h = e("ui/contextMenu/menuItem"), p = e("utils/common/eventHelper"), d = e("swx-pubsub-instance").default, v = e("utils/common/location"), m = e("ui/modalDialog/leaveConversationDialog"), g = e("ui/modalDialog/removeConversationHistoryDialog"), y = e("ui/modelHelpers/personHelper"), b = e("swx-cafe-application-instance");
  return t.assign(w.prototype, r), w.CopyLinkMenuItemType = "CopyLinkMenuItem", w.SendViaEmailMenuItemType = "SendViaEmailMenuItemType", w;
});

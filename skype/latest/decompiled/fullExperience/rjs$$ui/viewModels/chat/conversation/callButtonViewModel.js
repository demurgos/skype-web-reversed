define("ui/viewModels/chat/conversation/callButtonViewModel", [
  "require",
  "exports",
  "module",
  "vendor/knockout",
  "swx-enums",
  "cafe/applicationInstance",
  "swx-i18n",
  "constants/common",
  "constants/calling",
  "ui/modelHelpers/personHelper",
  "services/serviceLocator",
  "utils/common/cafeObservable",
  "ui/modelHelpers/conversationHelper",
  "ui/viewModels/calling/helpers/callingFacade",
  "ui/controls/calling/sounds",
  "ui/telemetry/actions/actionNames",
  "ui/telemetry/chat/guestActionsInHeader",
  "ui/viewModels/chat/conversationActivity",
  "ui/modelObservers/agentAuthorizationObserver"
], function (e, t) {
  var n = e("vendor/knockout"), r = e("swx-enums"), i = e("cafe/applicationInstance"), s = e("swx-i18n").localization, o = e("constants/common"), u = e("constants/calling"), a = e("ui/modelHelpers/personHelper"), f = e("services/serviceLocator"), l = e("utils/common/cafeObservable"), c = e("ui/modelHelpers/conversationHelper"), h = e("ui/viewModels/calling/helpers/callingFacade"), p = e("ui/controls/calling/sounds"), d = e("ui/telemetry/actions/actionNames"), v = e("ui/telemetry/chat/guestActionsInHeader"), m = e("ui/viewModels/chat/conversationActivity"), g = e("ui/modelObservers/agentAuthorizationObserver"), y = function (e) {
      function A(t) {
        O();
        i.get().conversationsManager.conversations.add(e);
        h.placeCall(e, t, "startCallButton");
        p.playOnce(p.KEYS.CALL_DIALING);
      }
      function O() {
        if (!e.isGroupConversation() && y.isFeatureOn(o.featureFlags.PSTN_ENABLED)) {
          var t = e.participants(0);
          t.audio.endpoint(t.person.id());
        }
      }
      function M() {
        return {
          participantsCount: t.conversationModel.participants.size(),
          userMessagesCount: t.conversationModel.historyService.activityItems().filter(function (e) {
            return e.type() === r.activityType.TextMessage && a.isMePerson(e.sender);
          }).length,
          totalMessagesCount: t.conversationModel.historyService.activityItems().length
        };
      }
      function _() {
        var e = !1, n = t.conversationModel.participants().length, r;
        for (var i = 0; i < n && !e; i++)
          r = t.conversationModel.participants()[i].person, r.capabilities.audio.get(), e = !r.isBlocked() && r.capabilities.audio();
        t.hasAudioCapability(n === 0 || e);
      }
      function D() {
        var e = !1, n = t.conversationModel.participants().length, r;
        for (var i = 0; i < n && !e; i++)
          r = t.conversationModel.participants()[i].person, r.capabilities.video.get(), e = !r.isBlocked() && r.capabilities.video();
        t.hasVideoCapability(n === 0 || e);
      }
      function P() {
        t.isOneToOneConversation() ? (C = t.participantPerson(), C.capabilities.audio.changed(_)) : _();
      }
      function H() {
        t.isOneToOneConversation() ? (k = t.participantPerson(), k.capabilities.video.changed(D)) : D();
      }
      function B() {
        t.isOneToOneConversation() && (N = t.participantPerson(), N.isBlocked.changed(_), N.isBlocked.changed(D));
      }
      function j() {
        C && C.capabilities.audio.changed.off(_);
        k && k.capabilities.video.changed.off(D);
      }
      function F() {
        N && (N.isBlocked.changed.off(_), N.isBlocked.changed.off(D));
      }
      function I() {
        j();
        F();
        P();
        H();
        B();
      }
      function q() {
        var e = f.resolve(o.serviceLocator.FEATURE_FLAGS);
        return e.isFeatureOn(u.FEATURE_FLAGS.CALLING);
      }
      function R() {
        return t.callingDisabled() ? !0 : !t.hasAudioCapability();
      }
      function U() {
        return t.videoCallingDisabled() ? !0 : !t.hasVideoCapability();
      }
      function z() {
        b(c.isPstnOnlyConversation(e));
      }
      var t = this, y = f.resolve(o.serviceLocator.FEATURE_FLAGS), b = n.observable(c.isPstnOnlyConversation(e)), w = y.isFeatureOn(o.featureFlags.CALLING), E = m.build(e), S = n.observable(!e.videoService.start.enabled()), x = g.build(e), T, N, C, k, L;
      t.conversationModel = e;
      t.participants = l.newObservableCollection(e.participants);
      t.isOneToOneConversation = n.computed(function () {
        return t.participants().length === 1;
      });
      t.participantPerson = n.computed(function () {
        if (t.isOneToOneConversation())
          return t.participants()[0].person;
      });
      t.callingDisabled = n.computed(function () {
        return !w || E.isCallingDisabled() || x.isConversationWithUnauthorizedAgent();
      });
      t.videoCallingDisabled = n.computed(function () {
        return !w || E.isVideoCallingDisabled() || x.isConversationWithUnauthorizedAgent();
      });
      t.hasAudioCapability = n.observable(!0);
      t.hasVideoCapability = n.observable(!0);
      t.conversationModel.participants.changed(I);
      t.isAudioDisabled = n.computed(R);
      t.isVideoDisabled = n.computed(U);
      T = e.participants.observe(z);
      L = e.videoService.start.enabled.changed(function () {
        S(!e.videoService.start.enabled());
      });
      t.callingDisabledTooltip = n.computed(function () {
        var e = i.get().personsAndGroupsManager.mePerson.capabilities.audio;
        return e() ? "" : q() ? e.reason === r.callingNotSupportedReasons.BrowserNotSupported ? s.fetch({ key: "message_text_callingNotSupportedBrowser" }) : e.reason === r.callingNotSupportedReasons.OSNotSupported ? s.fetch({ key: "message_text_callingNotSupportedOS" }) : "" : s.fetch({ key: "message_text_callingIsDisabled" });
      });
      t.buttonVideoTitle = n.pureComputed(function () {
        if (!t.hasVideoCapability())
          return s.fetch({
            key: "videoCallDisabled_tooltip",
            params: { agentName: t.getDisabledConversationName() }
          });
        var e = t.callingDisabledTooltip();
        return e === "" && (e = s.fetch({ key: "startVideoCall_tooltip" })), e;
      });
      t.buttonVideoAriaLabel = n.pureComputed(function () {
        var e = t.callingDisabledTooltip();
        return e === "" && (e = s.fetch({ key: "accessibility_startVideoCall_ariaLabel" })), e;
      });
      t.buttonCallTitle = n.pureComputed(function () {
        if (!t.hasAudioCapability())
          return s.fetch({
            key: "callDisabled_tooltip",
            params: { agentName: t.getDisabledConversationName() }
          });
        var e = t.callingDisabledTooltip();
        return e === "" && (t.conversationModel.isGroupConversation() ? e = s.fetch({ key: "startGroupCall_tooltip" }) : e = s.fetch({ key: "startCall_tooltip" })), e;
      });
      t.buttonCallAriaLabel = n.pureComputed(function () {
        var e = t.callingDisabledTooltip();
        return e === "" && (t.conversationModel.isGroupConversation() ? e = s.fetch({ key: "accessibility_startGroupCall_ariaLabel" }) : e = s.fetch({ key: "accessibility_startCall_ariaLabel" })), e;
      });
      t.startCallWithAudio = function () {
        var e = f.resolve(o.serviceLocator.ACTION_TELEMETRY);
        e.recordAction(d.audioVideo.audioCall);
        v.get().onMediaButtonClicked(M());
        A(!1);
      };
      t.startCallWithVideo = function () {
        var e = f.resolve(o.serviceLocator.ACTION_TELEMETRY);
        e.recordAction(d.audioVideo.videoCall);
        v.get().onMediaButtonClicked(M());
        A(!0);
      };
      t.joinCall = function () {
        var e = f.resolve(o.serviceLocator.ACTION_TELEMETRY);
        e.recordAction(d.audioVideo.joinCall);
        v.get().onMediaButtonClicked(M());
        A(!1);
      };
      t.getDisabledConversationName = function () {
        var e = t.participantPerson();
        return e ? e.displayName() : t.conversationModel.topic();
      };
      t.dispose = function () {
        t.participants.dispose();
        t.participantPerson.dispose();
        t.callingDisabledTooltip.dispose();
        t.buttonVideoTitle.dispose();
        t.buttonVideoAriaLabel.dispose();
        t.buttonCallTitle.dispose();
        t.buttonCallAriaLabel.dispose();
        t.isOneToOneConversation.dispose();
        t.callingDisabled.dispose();
        t.videoCallingDisabled.dispose();
        E.dispose();
        T && T.dispose();
        j();
        F();
        t.conversationModel.participants.changed.off(I);
        L.dispose();
        x.dispose();
      };
    };
  t.build = function (e) {
    return new y(e);
  };
});

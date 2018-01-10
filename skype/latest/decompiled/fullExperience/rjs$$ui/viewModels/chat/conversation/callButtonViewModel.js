define("ui/viewModels/chat/conversation/callButtonViewModel", [
  "require",
  "exports",
  "module",
  "lodash-compat",
  "vendor/knockout",
  "utils/common/eventMixin",
  "swx-enums",
  "swx-cafe-application-instance",
  "swx-i18n",
  "swx-constants",
  "swx-constants",
  "ui/modelHelpers/personHelper",
  "swx-service-locator-instance",
  "utils/common/cafeObservable",
  "ui/modelHelpers/conversationHelper",
  "swx-utils-chat",
  "ui/viewModels/calling/helpers/callingFacade",
  "ui/telemetry/actions/actionNames",
  "ui/telemetry/chat/guestActionsInHeader",
  "ui/viewModels/chat/conversationActivity",
  "ui/modelObservers/agentAuthorizationObserver",
  "ui/modelObservers/calling/activeCallObserver"
], function (e, t) {
  var n = e("lodash-compat"), r = e("vendor/knockout"), i = e("utils/common/eventMixin"), s = e("swx-enums"), o = e("swx-cafe-application-instance"), u = e("swx-i18n").localization, a = e("swx-constants").COMMON, f = e("swx-constants").CALLING, l = e("ui/modelHelpers/personHelper"), c = e("swx-service-locator-instance").default, h = e("utils/common/cafeObservable"), p = e("ui/modelHelpers/conversationHelper"), d = e("swx-utils-chat").conversation, v = e("ui/viewModels/calling/helpers/callingFacade"), m = e("ui/telemetry/actions/actionNames"), g = e("ui/telemetry/chat/guestActionsInHeader"), y = e("ui/viewModels/chat/conversationActivity"), b = e("ui/modelObservers/agentAuthorizationObserver"), w = e("ui/modelObservers/calling/activeCallObserver"), E = function (e) {
      function _(n) {
        D();
        o.get().conversationsManager.conversations.add(e);
        t.dispatchEvent(a.events.actions.callMade, {}, t.DIRECTION.PARENT);
        v.placeCall(e, n, "startCallButton");
      }
      function D() {
        if (!e.isGroupConversation() && n.isFeatureOn(a.featureFlags.PSTN_ENABLED)) {
          var t = e.participants(0);
          t.audio.endpoint(t.person.id());
        }
      }
      function P() {
        return {
          participantsCount: t.conversationModel.participants.size(),
          userMessagesCount: t.conversationModel.historyService.activityItems().filter(function (e) {
            return e.type() === s.activityType.TextMessage && l.isMePerson(e.sender);
          }).length,
          totalMessagesCount: t.conversationModel.historyService.activityItems().length
        };
      }
      function H() {
        var e = !1, n = t.conversationModel.participants().length, r;
        for (var i = 0; i < n && !e; i++)
          r = t.conversationModel.participants()[i].person, e = !r.isBlocked() && r.capabilities.audio();
        t.hasAudioCapability(n === 0 || e);
      }
      function B() {
        var e = !1, n = t.conversationModel.participants().length, r;
        for (var i = 0; i < n && !e; i++)
          r = t.conversationModel.participants()[i].person, e = !r.isBlocked() && r.capabilities.video();
        t.hasVideoCapability(n === 0 || e);
      }
      function j() {
        L = [];
        t.conversationModel.participants().forEach(function (e) {
          var t = e.person, n = t.capabilities.audio.subscribe(), r = {
              person: t,
              subscription: n
            };
          t.capabilities.audio.get();
          t.capabilities.audio.changed(H);
          L.push(r);
        });
      }
      function F() {
        A = [];
        t.conversationModel.participants().forEach(function (e) {
          var t = e.person, n = t.capabilities.video.subscribe(), r = {
              person: t,
              subscription: n
            };
          t.capabilities.video.get();
          t.capabilities.video.changed(B);
          A.push(r);
        });
      }
      function I() {
        L && (L.forEach(function (e) {
          e.person.capabilities.audio.changed.off(H);
          e.subscription.dispose();
        }), L = undefined);
      }
      function q() {
        A && (A.forEach(function (e) {
          e.person.capabilities.video.changed.off(B);
          e.subscription.dispose();
        }), A = undefined);
      }
      function R() {
        t.isOneToOneConversation() && (k = t.participantPerson(), k.isBlocked.changed(H), k.isBlocked.changed(B));
      }
      function U() {
        k && (k.isBlocked.changed.off(H), k.isBlocked.changed.off(B));
      }
      function z() {
        I();
        q();
        U();
        j();
        F();
        R();
        d.isGuestHostConversation(e.conversationId) && M(e.participants.size());
      }
      function W() {
        var e = c.resolve(a.serviceLocator.FEATURE_FLAGS);
        return e.isFeatureOn(f.FEATURE_FLAGS.CALLING);
      }
      function X() {
        return N.isCallActive() ? !0 : t.callingDisabled() ? !0 : $() ? !0 : !t.hasAudioCapability();
      }
      function V() {
        return N.isCallActive() ? !0 : t.videoCallingDisabled() ? !0 : $() ? !0 : !t.hasVideoCapability();
      }
      function $() {
        return d.isGuestHostConversation(e.conversationId) && M() < 1;
      }
      function J() {
        i(p.isPstnOnlyConversation(e));
      }
      var t = this, n = c.resolve(a.serviceLocator.FEATURE_FLAGS), i = r.observable(p.isPstnOnlyConversation(e)), E = n.isFeatureOn(a.featureFlags.CALLING), S = y.build(e), x = r.observable(!e.videoService.start.enabled()), T = b.build(e), N = w.build(), C, k, L, A, O, M = r.observable(0);
      t.conversationModel = e;
      t.participants = h.newObservableCollection(e.participants);
      t.isOneToOneConversation = r.computed(function () {
        return t.participants().length === 1;
      });
      t.participantPerson = r.computed(function () {
        if (t.isOneToOneConversation())
          return t.participants()[0].person;
      });
      t.callingDisabled = r.computed(function () {
        return !E || S.isCallingDisabled() || T.isConversationWithUnauthorizedAgent();
      });
      t.videoCallingDisabled = r.computed(function () {
        return !E || S.isVideoCallingDisabled() || T.isConversationWithUnauthorizedAgent();
      });
      t.hasAudioCapability = r.observable(!0);
      t.hasVideoCapability = r.observable(!0);
      t.conversationModel.participants.changed(z);
      t.isAudioDisabled = r.computed(X);
      t.isVideoDisabled = r.computed(V);
      C = e.participants.observe(J);
      O = e.videoService.start.enabled.changed(function () {
        x(!e.videoService.start.enabled());
      });
      t.callingDisabledTooltip = r.computed(function () {
        var e = o.get().personsAndGroupsManager.mePerson.capabilities.audio;
        return e() ? "" : W() ? e.reason === s.callingNotSupportedReasons.BrowserNotSupported ? u.fetch({ key: "message_text_callingNotSupportedBrowser" }) : e.reason === s.callingNotSupportedReasons.OSNotSupported ? u.fetch({ key: "message_text_callingNotSupportedOS" }) : "" : u.fetch({ key: "message_text_callingIsDisabled" });
      });
      t.buttonVideoTitle = r.pureComputed(function () {
        if (!t.hasVideoCapability())
          return u.fetch({
            key: "videoCallDisabled_tooltip",
            params: { agentName: t.getDisabledConversationName() }
          });
        var e = t.callingDisabledTooltip();
        return e === "" && (e = u.fetch({ key: "startVideoCall_tooltip" })), e;
      });
      t.buttonVideoAriaLabel = r.pureComputed(function () {
        var e = t.callingDisabledTooltip();
        return e === "" && (e = u.fetch({ key: "accessibility_startVideoCall_ariaLabel" })), e;
      });
      t.buttonCallTitle = r.pureComputed(function () {
        if (!t.hasAudioCapability())
          return u.fetch({
            key: "callDisabled_tooltip",
            params: { agentName: t.getDisabledConversationName() }
          });
        var e = t.callingDisabledTooltip();
        return e === "" && (t.conversationModel.isGroupConversation() ? e = u.fetch({ key: "startGroupCall_tooltip" }) : e = u.fetch({ key: "startCall_tooltip" })), e;
      });
      t.buttonCallAriaLabel = r.pureComputed(function () {
        var e = t.callingDisabledTooltip();
        return e === "" && (t.conversationModel.isGroupConversation() ? e = u.fetch({ key: "accessibility_startGroupCall_ariaLabel" }) : e = u.fetch({ key: "accessibility_startCall_ariaLabel" })), e;
      });
      t.startCallWithAudio = function () {
        var e = c.resolve(a.serviceLocator.ACTION_TELEMETRY);
        e.recordAction(m.audioVideo.audioCall);
        g.get().onMediaButtonClicked(P());
        _(!1);
      };
      t.startCallWithVideo = function () {
        var e = c.resolve(a.serviceLocator.ACTION_TELEMETRY);
        e.recordAction(m.audioVideo.videoCall);
        g.get().onMediaButtonClicked(P());
        _(!0);
      };
      t.joinCall = function () {
        var e = c.resolve(a.serviceLocator.ACTION_TELEMETRY);
        e.recordAction(m.audioVideo.joinCall);
        g.get().onMediaButtonClicked(P());
        _(!1);
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
        S.dispose();
        C && C.dispose();
        I();
        q();
        U();
        t.conversationModel.participants.changed.off(z);
        O.dispose();
        T.dispose();
        N.dispose();
      };
    };
  n.assign(E.prototype, i);
  t.build = function (e) {
    return new E(e);
  };
});

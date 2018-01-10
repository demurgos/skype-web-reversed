define("ui/viewModels/chat/conversation", [
  "require",
  "lodash-compat",
  "swx-enums",
  "utils/common/eventMixin",
  "swx-constants",
  "utils/common/elementQueryHelper",
  "vendor/knockout",
  "telemetry/chat/conversationUpdateFlow",
  "ui/modelHelpers/conversationHelper",
  "swx-cafe-application-instance",
  "swx-constants",
  "constants/components",
  "swx-browser-detect",
  "swx-service-locator-instance",
  "services/cqf/CQFHandler",
  "ui/calling/unansweredCallHandler",
  "ui/calling/pstnEventsHandler",
  "ui/calling/invalidNumberRedirector",
  "telemetry/chat/conversationJoined"
], function (e) {
  function b(e, r) {
    function B() {
      return b.minimizeCallScreen(!1), window.shellApp ? j() : F().catch(j);
    }
    function j() {
      return d.setupCQF().then(function (e) {
        b.callData = e;
        b.isCQFVisible(!0);
        b.isInCall(!1);
      }).catch(function () {
        b.isInCall(!1);
        R();
      });
    }
    function F() {
      return v.setup().then(function (e) {
        b.unansweredCallPayload.reason(e.reason);
        b.unansweredCallPayload.wasVideoCall(e.wasVideoCall);
        b.unansweredCallPayload.ecsConfig(e.ecsConfig);
        b.isUnansweredCallVisible(!0);
      });
    }
    function I() {
      b.isUnansweredCallVisible(!1);
    }
    function q() {
      b.isCQFVisible(!1);
      R();
    }
    function R() {
      window.shellApp && b.isConversationVisible() && !b.isInCall() && e.selfParticipant.audio.state.reason !== n.callDisconnectionReason.CallEscalated && (window.shellAppInfo.supportsPreloading ? (window.shellApp.invoke(i.SHELL_APP_METHODS.HIDE_WINDOW), U(!1)) : window.shellApp.invoke(i.SHELL_APP_METHODS.CLOSE_WINDOW), window.shellAppInfo.hidePromiseResolve && window.shellAppInfo.hidePromiseResolve());
    }
    function U(e) {
      var t = document.querySelector("#contentWrapper");
      t && (t.style.display = e ? "block" : "none");
    }
    function z(e, n) {
      var r = { successCriteria: e };
      w.publish(l.events.search.SESSION_SUCCESS, t.merge(r, n));
    }
    function W() {
      b.forwardEvent(l.events.navigation.FRAGMENT_SHOW, b.DIRECTION.CHILD, $);
      b.forwardEvent(l.events.navigation.FRAGMENT_BEFORE_HIDE, b.DIRECTION.CHILD, J);
      b.forwardEvent(l.events.navigation.FRAGMENT_HIDE, b.DIRECTION.CHILD);
      b.forwardEvent(l.events.message.QUOTE, b.DIRECTION.CHILD);
      b.forwardEvent(l.events.message.EDIT, b.DIRECTION.CHILD);
      b.forwardEvent(l.events.message.COPY, b.DIRECTION.CHILD);
      b.forwardEvent(l.events.conversation.OPEN_PROFILE, b.DIRECTION.CHILD);
      b.forwardEvent(l.events.conversation.VIEWPORT_CHANGED, b.DIRECTION.CHILD);
      b.forwardEvent(l.events.conversation.MESSAGES_LOADED, b.DIRECTION.CHILD);
      b.forwardEvent(i.EVENTS.CALL_SCREEN_CLOSE, b.DIRECTION.CHILD, B);
      b.forwardEvent(i.EVENTS.UNANSWERED_CALL_CLOSE, b.DIRECTION.CHILD, I);
      b.registerEvent(l.events.roster.EDIT_ROSTER_MODE, G);
      b.registerEvent(l.events.conversation.OVERLAY_CLOSED, Y);
      b.registerEvent(l.events.navigation.COMPONENT_RENDERED, K);
      b.registerEvent(i.EVENTS.CQF_SCREEN_CLOSE, q);
      b.registerEvent(l.events.callScreen.SHOW_CHAT, b.minimizeCallScreen.bind(b, !0));
      b.registerEvent(l.events.callScreen.HIDE_CHAT, b.minimizeCallScreen.bind(b, !1));
      if (r === l.telemetry.historyLoadOrigin.CONTACT_SEARCH || r === l.telemetry.historyLoadOrigin.DIRECTORY_SEARCH)
        b.registerEvent(l.events.textarea.MESSAGE_SENT, t.partial(z, l.telemetry.contactsV2.searchSession.enums.success_criteria.IM_SENT)), b.registerEvent(l.events.message.ADD_CONTACT, t.partial(z, l.telemetry.contactsV2.searchSession.enums.success_criteria.CONTACT_ADDED)), b.registerEvent(l.events.actions.callMade, t.partial(z, l.telemetry.contactsV2.searchSession.enums.success_criteria.CALL_MADE));
      w.subscribe(l.events.shareControl.SHARE_CONTROL_SHOW, Z);
      w.subscribe(l.events.shareControl.SHARE_CONTROL_HIDE, et);
      P = v.newCallStartedInShellApp.subscribe(tt);
      H = v.previousCallEndedInShellApp.subscribe(nt);
      f.get().conversationsManager.conversations.removed(Q);
    }
    function X() {
      function t() {
        e._updateThreadPropertiesSubscription.remove(t);
        y.get().onConversationJoined({ participantsCount: e.participantsCount() });
      }
      if (e.conversationId && !y.get().isTriggeredFor(e.conversationId))
        return;
      if (!e._updateThreadPropertiesSubscription) {
        y.get().onConversationJoined({ participantsCount: e.participantsCount() });
        return;
      }
      e._updateThreadPropertiesSubscription.add(t);
    }
    function V() {
      T = b.conversationModel.participants.subscribe();
    }
    function $(t) {
      window.shellApp && U(!0);
      b.isInCall() && s.refresh();
      b.isConversationVisible(!0);
      b.isInCall(a.isCallingActive(e));
      b.isFullyOverlayed(b.showStartConversationOverlay());
      N = e.acknowledge.enabled.when(!0, e.acknowledge);
      k = b.isInCall.subscribe(function (e) {
        e && (b.dispatchEvent(i.EVENTS.CQF_CANCEL, b.DIRECTION.CHILD), b.isCQFVisible(!1), b.isUnansweredCallVisible(!1));
      });
      t && t.model === b.conversationModel && t.target && t.target.expandProfile && (b.dispatchEvent(l.events.conversation.OPEN_PROFILE, t.telemetryContext, b.DIRECTION.CHILD), M = !0, D = t.telemetryContext);
    }
    function J() {
      b.isUnansweredCallVisible(!1);
      b.isConversationVisible(!1);
      b.conversationUpdateFlow.abandoned();
      A && b.conversationModel.historyService._messagesWithUnseenHearts.size() > 0 && b.conversationModel.historyService._messagesWithUnseenHearts.empty();
    }
    function K(e) {
      e === c.chat.HEADER && M && b.dispatchEvent(l.events.conversation.OPEN_PROFILE, D, b.DIRECTION.CHILD);
    }
    function Q(t) {
      if (t === e) {
        var n = {
          model: t,
          page: "swx-conversation"
        };
        w.publish(l.events.navigation.FRAGMENT_REMOVE, n);
      }
    }
    function G(e) {
      b.isEditRosterMode(e.isActive);
      b.isEditing(e.isEditMode);
    }
    function Y() {
      b.isFullyOverlayed(!1);
    }
    function Z(e) {
      e.conversationModel.conversationId === b.conversationModel.conversationId && (b.shareControlPayload(e), b.isSelectingContacts(!0));
    }
    function et() {
      b.isSelectingContacts(!1);
    }
    function tt(e) {
      e && e.conversationId === b.conversationModel.conversationId && b.isUnansweredCallVisible(!1);
    }
    function nt(e) {
      e && e.conversationId === b.conversationModel.conversationId && F().catch(t.noop);
    }
    var b = this, w = p.resolve(l.serviceLocator.PUBSUB), E = p.resolve(l.serviceLocator.FEATURE_FLAGS), S = E.isFeatureOn(l.featureFlags.PSTN_ENABLED), x, T, N, C, k, L, A, O, M, D, P, H;
    b.init = function () {
      function t(e) {
        return e.preventDefault(), e.stopPropagation(), h.getBrowserInfo().isIeEngine && (e.returnValue = !1), !1;
      }
      function n(e, t) {
        var n = e.dataTransfer || e.originalEvent.dataTransfer;
        return Array.prototype.some.call(n.types, function (e) {
          return e === t;
        });
      }
      function r(e) {
        return x && n(e, "Files") && b.conversationModel.fileTransferService.send.enabled();
      }
      function i(e, n) {
        var r = e.dataTransfer || e.originalEvent.dataTransfer;
        return r && (r.dropEffect = n ? "copy" : "none"), t(e);
      }
      x = E.isFeatureOn(l.featureFlags.FILE_DRAG_DROP_ENABLED);
      A = E.isFeatureOn(l.featureFlags.HEARTS_ENABLED);
      b.isSingleConversationMode = E.isFeatureOn(l.featureFlags.SINGLE_CONVERSATION_MODE);
      b.conversationModel = e;
      b.isEditRosterMode = o.observable(!1);
      b.isEditing = o.observable(!1);
      b.isFullyOverlayed = o.observable(!1);
      b.isSelectingContacts = o.observable(!1);
      b.showCover = o.pureComputed(function () {
        return !e.selfParticipant.isAnonymous() && b.isEditRosterMode() || b.isSelectingContacts();
      });
      b.isInCall = o.observable(!1);
      b.isUnansweredCallVisible = o.observable(!1);
      b.unansweredCallPayload = {
        conversation: e,
        reason: o.observable(),
        wasVideoCall: o.observable(),
        ecsConfig: o.observable()
      };
      b.isCQFVisible = o.observable(!1);
      b.isConversationVisible = o.observable(!0);
      b.conversationUpdateFlow = new u();
      b.newConversationV2 = o.observable(E.isFeatureOn(l.featureFlags.NEW_CONVERSATION_V2));
      b.shareControlPayload = o.observable({});
      b.isPollsFeatureEnabled = o.observable(!1);
      S && !h.getBrowserInfo().isShellApp && (O = g.build(), L = m.build(O), L.subscribeToConversation(e));
      b.onDragEnter = function (e, t) {
        var n = r(t);
        return n, i(t, n);
      };
      b.onDragOver = function (e, t) {
        return i(t, r(t));
      };
      b.onDragLeave = function () {
      };
      b.onDrop = function (e, n) {
        var i = [];
        if (r(n))
          return Array.prototype.forEach.call(n.dataTransfer.files, function (e) {
            i.push(e);
          }), i.length && b.conversationModel.fileTransferService.send(i), t(n);
      };
      b.markAsRead = function () {
        return b.dispatchEvent(l.events.conversation.MARK_AS_READ), !0;
      };
      b.minimizeCallScreen = o.observable(!1);
      b.maximizeCallScreen = o.computed(function () {
        var e = E.isFeatureOn(l.featureFlags.CALLSCREEN_MINMAX);
        return e && b.isInCall() && !b.minimizeCallScreen();
      });
      b.conversationModel.sendPollMessage && (C = b.conversationModel.sendPollMessage.enabled.changed(function (e) {
        b.isPollsFeatureEnabled(e);
      }));
      V();
      W();
      X();
    };
    b.dispose = function () {
      T.dispose();
      b.maximizeCallScreen.dispose();
      N && N.dispose();
      f.get().conversationsManager.conversations.removed.off(Q);
      b.conversationUpdateFlow = null;
      C && C.dispose();
      L && (L.dispose(), O.dispose());
      k && k.dispose();
      w.unsubscribe(l.events.shareControl.SHARE_CONTROL_SHOW, Z);
      w.unsubscribe(l.events.shareControl.SHARE_CONTROL_HIDE, et);
      H && H.dispose();
      P && P.dispose();
    };
    b.coverHeader = o.pureComputed(function () {
      return !e.selfParticipant.isAnonymous() && b.isFullyOverlayed();
    });
    b.coverChatLogAndInput = o.pureComputed(function () {
      return !e.selfParticipant.isAnonymous() && (b.isFullyOverlayed() || b.isEditRosterMode());
    });
    b.showStartConversationOverlay = o.pureComputed(function () {
      var e = E.isFeatureOn(l.featureFlags.INVITE_FREE);
      return e && !b.conversationModel.isGroupConversation() && b.conversationModel.historyService.activityItems().length === 0;
    });
  }
  var t = e("lodash-compat"), n = e("swx-enums"), r = e("utils/common/eventMixin"), i = e("swx-constants").CALLING, s = e("utils/common/elementQueryHelper"), o = e("vendor/knockout"), u = e("telemetry/chat/conversationUpdateFlow"), a = e("ui/modelHelpers/conversationHelper"), f = e("swx-cafe-application-instance"), l = e("swx-constants").COMMON, c = e("constants/components"), h = e("swx-browser-detect").default, p = e("swx-service-locator-instance").default, d = e("services/cqf/CQFHandler"), v = e("ui/calling/unansweredCallHandler"), m = e("ui/calling/pstnEventsHandler"), g = e("ui/calling/invalidNumberRedirector"), y = e("telemetry/chat/conversationJoined");
  return t.assign(b.prototype, r), t.assign(b.prototype, {
    isInShellApp: function () {
      return h.getBrowserInfo().isShellApp;
    }
  }), b;
});

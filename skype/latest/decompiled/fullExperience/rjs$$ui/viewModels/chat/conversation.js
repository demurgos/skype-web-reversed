define("ui/viewModels/chat/conversation", [
  "require",
  "lodash-compat",
  "swx-enums",
  "utils/common/eventMixin",
  "constants/calling",
  "utils/common/elementQueryHelper",
  "vendor/knockout",
  "telemetry/chat/conversationUpdateFlow",
  "ui/modelHelpers/conversationHelper",
  "cafe/applicationInstance",
  "constants/common",
  "constants/components",
  "browser/detect",
  "services/serviceLocator",
  "services/cqf/CQFHandler",
  "ui/calling/pstnEventsHandler",
  "ui/calling/invalidNumberRedirector",
  "telemetry/chat/conversationJoined"
], function (e) {
  function y(e) {
    function O() {
      d.setupCQF().then(function (e) {
        t.callData = e;
        t.isCQFVisible(!0);
        t.isInCall(!1);
      }).catch(function () {
        t.isInCall(!1);
        _();
      });
    }
    function M() {
      t.isCQFVisible(!1);
      _();
    }
    function _() {
      window.shellApp && t.isConversationVisible() && !t.isInCall() && e.selfParticipant.audio.state.reason !== n.callDisconnectionReason.CallEscalated && (window.shellAppInfo.supportsPreloading ? window.shellApp.invoke(i.SHELL_APP_METHODS.HIDE_WINDOW) : window.shellApp.invoke(i.SHELL_APP_METHODS.CLOSE_WINDOW));
    }
    function D(n) {
      t.isInCall() && s.refresh();
      t.isConversationVisible(!0);
      t.isInCall(a.isCallingActive(e));
      t.isFullyOverlayed(t.showStartConversationOverlay());
      S = e.acknowledge.enabled.when(!0, e.acknowledge);
      T = t.isInCall.subscribe(function (e) {
        e && (t.dispatchEvent(i.EVENTS.CQF_CANCEL, t.DIRECTION.CHILD), t.isCQFVisible(!1));
      });
      n && n.model === t.conversationModel && n.target && n.target.expandProfile && (t.dispatchEvent(l.events.conversation.OPEN_PROFILE, n.telemetryContext, t.DIRECTION.CHILD), L = !0, A = n.telemetryContext);
    }
    function P() {
      t.isConversationVisible(!1);
      t.conversationUpdateFlow.abandoned();
      C && t.conversationModel.historyService._messagesWithUnseenHearts.size() > 0 && t.conversationModel.historyService._messagesWithUnseenHearts.empty();
    }
    function H(e) {
      e === c.chat.HEADER && L && t.dispatchEvent(l.events.conversation.OPEN_PROFILE, A, t.DIRECTION.CHILD);
    }
    function B() {
      t.forwardEvent(l.events.navigation.FRAGMENT_SHOW, t.DIRECTION.CHILD, D);
      t.forwardEvent(l.events.navigation.FRAGMENT_BEFORE_HIDE, t.DIRECTION.CHILD, P);
      t.forwardEvent(l.events.navigation.FRAGMENT_HIDE, t.DIRECTION.CHILD);
      t.forwardEvent(l.events.message.QUOTE, t.DIRECTION.CHILD);
      t.forwardEvent(l.events.message.EDIT, t.DIRECTION.CHILD);
      t.forwardEvent(i.EVENTS.CALL_SCREEN_CLOSE, t.DIRECTION.CHILD, O);
      t.forwardEvent(l.events.conversation.OPEN_PROFILE, t.DIRECTION.CHILD);
      t.forwardEvent(l.events.conversation.VIEWPORT_CHANGED, t.DIRECTION.CHILD);
      t.forwardEvent(l.events.conversation.MESSAGES_LOADED, t.DIRECTION.CHILD);
      t.registerEvent(l.events.roster.EDIT_ROSTER_MODE, I);
      t.registerEvent(l.events.conversation.OVERLAY_CLOSED, q);
      t.registerEvent(l.events.navigation.COMPONENT_RENDERED, H);
      t.registerEvent(i.EVENTS.CQF_SCREEN_CLOSE, M);
      r.subscribe(l.events.shareControl.SHARE_CONTROL_SHOW, R);
      r.subscribe(l.events.shareControl.SHARE_CONTROL_HIDE, U);
      f.get().conversationsManager.conversations.removed(j);
    }
    function j(t) {
      if (t === e) {
        var n = {
          model: t,
          page: "swx-conversation"
        };
        r.publish(l.events.navigation.FRAGMENT_REMOVE, n);
      }
    }
    function F() {
      E = t.conversationModel.participants.subscribe();
    }
    function I(e) {
      t.isEditRosterMode(e.isActive);
      t.isEditing(e.isEditMode);
    }
    function q() {
      t.isFullyOverlayed(!1);
    }
    function R(e) {
      t.shareControlPayload(e);
      t.isSelectingContacts(!0);
    }
    function U() {
      t.isSelectingContacts(!1);
    }
    var t = this, r = p.resolve(l.serviceLocator.PUBSUB), y = p.resolve(l.serviceLocator.FEATURE_FLAGS), b = y.isFeatureOn(l.featureFlags.PSTN_ENABLED), w, E, S, x, T, N, C, k, L, A;
    t.init = function () {
      function n(e) {
        return e.preventDefault(), e.stopPropagation(), h.getBrowserInfo().isIeEngine && (e.returnValue = !1), !1;
      }
      function r(e, t) {
        var n = e.dataTransfer || e.originalEvent.dataTransfer;
        return Array.prototype.some.call(n.types, function (e) {
          return e === t;
        });
      }
      function i(e) {
        return w && r(e, "Files") && t.conversationModel.fileTransferService.send.enabled();
      }
      function s(e, t) {
        var r = e.dataTransfer || e.originalEvent.dataTransfer;
        return r && (r.dropEffect = t ? "copy" : "none"), n(e);
      }
      w = y.isFeatureOn(l.featureFlags.FILE_DRAG_DROP_ENABLED);
      C = y.isFeatureOn(l.featureFlags.HEARTS_ENABLED);
      t.hideConversationHeader = y.isFeatureOn(l.featureFlags.HIDE_CONVERSATION_HEADER);
      t.isSingleConversationMode = y.isFeatureOn(l.featureFlags.SINGLE_CONVERSATION_MODE);
      t.conversationModel = e;
      t.isEditRosterMode = o.observable(!1);
      t.isEditing = o.observable(!1);
      t.isFullyOverlayed = o.observable(!1);
      t.isSelectingContacts = o.observable(!1);
      t.showCover = o.pureComputed(function () {
        return !e.selfParticipant.isAnonymous() && t.isEditRosterMode() || t.isSelectingContacts();
      });
      t.isInCall = o.observable(!1);
      t.isCQFVisible = o.observable(!1);
      t.isConversationVisible = o.observable(!0);
      t.conversationUpdateFlow = new u();
      t.newConversationV2 = o.observable(y.isFeatureOn(l.featureFlags.NEW_CONVERSATION_V2));
      t.shareControlPayload = o.observable({});
      t.isPollsFeatureEnabled = o.observable(!1);
      b && !h.getBrowserInfo().isShellApp && (k = m.build(), N = v.build(k), N.subscribeToConversation(e));
      t.onDragEnter = function (e, t) {
        var n = i(t);
        return n, s(t, n);
      };
      t.onDragOver = function (e, t) {
        return s(t, i(t));
      };
      t.onDragLeave = function () {
      };
      t.onDrop = function (e, r) {
        var s = [];
        if (i(r))
          return Array.prototype.forEach.call(r.dataTransfer.files, function (e) {
            s.push(e);
          }), s.length && t.conversationModel.fileTransferService.send(s), n(r);
      };
      t.markAsRead = function () {
        return t.dispatchEvent(l.events.conversation.MARK_AS_READ), !0;
      };
      t.conversationModel.sendPollMessage && (x = t.conversationModel.sendPollMessage.enabled.changed(function (e) {
        t.isPollsFeatureEnabled(e);
      }));
      F();
      B();
      g.get().onConversationJoined();
    };
    t.dispose = function () {
      E.dispose();
      S && S.dispose();
      f.get().conversationsManager.conversations.removed.off(j);
      t.conversationUpdateFlow = null;
      x && x.dispose();
      N && (N.dispose(), k.dispose());
      T && T.dispose();
      r.unsubscribe(l.events.shareControl.SHARE_CONTROL_SHOW, R);
      r.unsubscribe(l.events.shareControl.SHARE_CONTROL_HIDE, U);
    };
    t.coverHeader = o.pureComputed(function () {
      return !e.selfParticipant.isAnonymous() && t.isFullyOverlayed();
    });
    t.coverChatLogAndInput = o.pureComputed(function () {
      return !e.selfParticipant.isAnonymous() && (t.isFullyOverlayed() || t.isEditRosterMode());
    });
    t.showStartConversationOverlay = o.pureComputed(function () {
      var e = y.isFeatureOn(l.featureFlags.INVITE_FREE);
      return e && !t.conversationModel.isGroupConversation() && t.conversationModel.historyService.activityItems().length === 0;
    });
  }
  var t = e("lodash-compat"), n = e("swx-enums"), r = e("utils/common/eventMixin"), i = e("constants/calling"), s = e("utils/common/elementQueryHelper"), o = e("vendor/knockout"), u = e("telemetry/chat/conversationUpdateFlow"), a = e("ui/modelHelpers/conversationHelper"), f = e("cafe/applicationInstance"), l = e("constants/common"), c = e("constants/components"), h = e("browser/detect"), p = e("services/serviceLocator"), d = e("services/cqf/CQFHandler"), v = e("ui/calling/pstnEventsHandler"), m = e("ui/calling/invalidNumberRedirector"), g = e("telemetry/chat/conversationJoined");
  return t.assign(y.prototype, r), t.assign(y.prototype, {
    isInShellApp: function () {
      return h.getBrowserInfo().isShellApp;
    }
  }), y;
});

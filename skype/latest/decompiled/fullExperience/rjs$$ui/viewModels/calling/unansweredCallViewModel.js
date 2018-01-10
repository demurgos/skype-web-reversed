define("ui/viewModels/calling/unansweredCallViewModel", [
  "require",
  "lodash-compat",
  "ui/viewModels/calling/helpers/callingFacade",
  "swx-constants",
  "swx-constants",
  "ui/viewModels/people/contactBuilder",
  "ui/contextMenu/contextMenu",
  "ui/viewModels/chat/conversationTopic",
  "browser/dom",
  "swx-enums",
  "utils/common/eventMixin",
  "swx-focus-handler",
  "swx-i18n",
  "vendor/knockout",
  "swx-log-tracer",
  "ui/contextMenu/menuItemHelper",
  "ui/contextMenu/items/all",
  "swx-service-locator-instance",
  "experience/settings",
  "ui/telemetry/telemetryClient"
], function (e) {
  function w(e, l) {
    function k() {
      var e = T();
      return e ? {
        chatButton: e.UnansweredCallUIChatButton_Green,
        retryButton: e.UnansweredCallUIRetryButton_Green
      } : y.unansweredUI.defaultGreenButtons;
    }
    function L() {
      var e = g.resolve(i.serviceLocator.FEATURE_FLAGS), t = e.isFeatureOn(i.featureFlags.PSTN_ENABLED);
      return t;
    }
    function A() {
      return !w.isGroupConversation && L();
    }
    function O(e) {
      var t = 5, n = M();
      e.customClientOptions = {
        offsetElement: e.target,
        position: f.contextMenuPosition.Top,
        offset: t
      };
      o.show(n, e);
    }
    function M() {
      function u() {
        P(r.UNANSWERED_CALL_ACTIONS.RETRY, r.UNANSWERED_CALL_RETRY_ACTIONS.SKYPE);
        w.dispatchEvent(r.EVENTS.UNANSWERED_CALL_CLOSE, null, w.DIRECTION.PARENT);
      }
      function a() {
        P(r.UNANSWERED_CALL_ACTIONS.RETRY, r.UNANSWERED_CALL_RETRY_ACTIONS.PSTN);
        w.dispatchEvent(r.EVENTS.UNANSWERED_CALL_CLOSE, null, w.DIRECTION.PARENT);
      }
      function f() {
        P(r.UNANSWERED_CALL_ACTIONS.RETRY, r.UNANSWERED_CALL_RETRY_ACTIONS.DIAL_PAD);
        w.dispatchEvent(r.EVENTS.UNANSWERED_CALL_CLOSE, null, w.DIRECTION.PARENT);
      }
      var e = E.conversation.participants(0).person, n = s.build(e), o = [], l;
      x() ? l = new m.VideoCallMenuItem(n, i.telemetry.historyLoadOrigin.UNANSWERED_CALL_UI) : l = new m.CallSkypeMenuItem(n, i.telemetry.historyLoadOrigin.UNANSWERED_CALL_UI);
      o.push(new m.UnansweredCallWrapMenuItem(l, l.label, u));
      var c = v.getCallPhoneContextMenuItems(n);
      return c && !!c.length && t.forEach(c, function (e) {
        o.push(new m.UnansweredCallWrapMenuItem(e, e.label, a));
      }), o.push(new m.GoToDialPadMenuItem(f)), o;
    }
    function D() {
      var e = {
        prefillTextarea: !1,
        focusTextarea: !0
      };
      w.dispatchEvent(r.EVENTS.UNANSWERED_CALL_CLOSE, e, w.DIRECTION.PARENT);
    }
    function P(e, t) {
      if (N)
        return;
      var n = {
        Action: e,
        Leave_Reason: S()
      };
      t && (n.Retry_Action = t);
      d.log("[Unanswered Call UI Telemetry] event", i.telemetry.unansweredCallUI.MASTER_EVENT, "data", n);
      b.get().sendEvent(y.telemetry.uiTenantToken, i.telemetry.unansweredCallUI.MASTER_EVENT, n);
      N = !0;
    }
    function H() {
      l.restrict();
      var e = a.getElement(".swx .UnansweredCall .UnansweredCall-greenButton .btn");
      e || (e = a.getElement(".swx .UnansweredCall .UnansweredCall-chatButton .btn"));
      e && c.get().addFocusRequestToQueue(e, c.Priorities.Immediate);
    }
    var w = this, E = e.payload, S = E.reason, x = E.wasVideoCall, T = E.ecsConfig, N = !1, C = u.build(E.conversation);
    w.avatar = E.conversation.avatarUrl();
    w.isGroupConversation = E.conversation.isGroupConversation();
    w.topic = C.topic;
    w.title = p.pureComputed(function () {
      return S() === r.UNANSWERED_CALL_REASONS.BUSY ? h.fetch({ key: "unanswered_call_title_busy" }) : S() === r.UNANSWERED_CALL_REASONS.MISSED ? h.fetch({ key: "unanswered_call_title_noanswer" }) : h.fetch({ key: "unanswered_call_title_unavailable" });
    });
    w.titleDescription = p.pureComputed(function () {
      return S() === r.UNANSWERED_CALL_REASONS.BUSY ? h.fetch({ key: "unanswered_call_accessibility_title_busy" }) : S() === r.UNANSWERED_CALL_REASONS.MISSED ? h.fetch({ key: "unanswered_call_accessibility_title_noanswer" }) : h.fetch({ key: "unanswered_call_accessibility_title_unavailable" });
    });
    w.isButtonGreen = k();
    w.sendMessage = function () {
      var e = {
        prefillTextarea: !w.isGroupConversation,
        focusTextarea: !0
      };
      P(r.UNANSWERED_CALL_ACTIONS.CHAT);
      w.dispatchEvent(r.EVENTS.UNANSWERED_CALL_CLOSE, e, w.DIRECTION.PARENT);
    };
    w.retryCall = function (e) {
      A() ? O(e) : (P(r.UNANSWERED_CALL_ACTIONS.RETRY, r.UNANSWERED_CALL_RETRY_ACTIONS.SKYPE), w.dispatchEvent(r.EVENTS.UNANSWERED_CALL_CLOSE, null, w.DIRECTION.PARENT), n.placeCall(E.conversation, x()));
    };
    w.goToChat = function () {
      P(r.UNANSWERED_CALL_ACTIONS.OTHER_DISMISS);
      D();
    };
    w.cancel = function () {
      P(r.UNANSWERED_CALL_ACTIONS.CANCEL);
      D();
    };
    setTimeout(H, 0);
    w.dispose = function () {
      l.restore();
      C.dispose();
      P(r.UNANSWERED_CALL_ACTIONS.OTHER_DISMISS);
    };
  }
  var t = e("lodash-compat"), n = e("ui/viewModels/calling/helpers/callingFacade"), r = e("swx-constants").CALLING, i = e("swx-constants").COMMON, s = e("ui/viewModels/people/contactBuilder"), o = e("ui/contextMenu/contextMenu"), u = e("ui/viewModels/chat/conversationTopic"), a = e("browser/dom"), f = e("swx-enums"), l = e("utils/common/eventMixin"), c = e("swx-focus-handler"), h = e("swx-i18n").localization, p = e("vendor/knockout"), d = e("swx-log-tracer").getLogger(), v = e("ui/contextMenu/menuItemHelper"), m = e("ui/contextMenu/items/all"), g = e("swx-service-locator-instance").default, y = e("experience/settings"), b = e("ui/telemetry/telemetryClient");
  return t.assign(w.prototype, l), {
    build: function (e, t) {
      return new w(e, t);
    }
  };
});

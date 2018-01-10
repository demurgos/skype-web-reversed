define("ui/viewModels/calling/callScreenViewModel/callScreenFooterViewModel", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "browser/dom",
  "swx-util-calling-stack",
  "swx-constants",
  "swx-service-locator-instance",
  "utils/common/eventMixin",
  "ui/modelHelpers/conversationHelper",
  "ui/viewModels/calling/endCallControlViewModel",
  "ui/viewModels/calling/moreActionsControlViewModel",
  "ui/viewModels/calling/micControlViewModel",
  "ui/viewModels/calling/videoControlViewModel",
  "ui/viewModels/calling/messageControlViewModel",
  "ui/viewModels/calling/callScreenDialpadViewModel",
  "swx-focus-handler",
  "swx-utils-common",
  "ui/calling/callingCapabilityHelper"
], function (e) {
  function y(e, t) {
    function N() {
      return e.selfParticipant.isAnonymous() ? !1 : i.get().isPluginlessCallingSupported() ? y.isFeatureOn(s.featureFlags.PLUGINLESS_LOCAL_ESCALATION) : y.isFeatureOn(s.featureFlags.GVC_LOCAL_ESCALATION);
    }
    function C() {
      return !i.get().isPluginlessCallingSupported() && y.isFeatureOn(s.featureFlags.OUTGOING_SCREEN_SHARING);
    }
    function k() {
      return y.isFeatureOn(s.featureFlags.AUDIO_VIDEO_SETTINGS_SUPPORT);
    }
    function L() {
      m.execute(function () {
        u.dispatchEvent(s.events.callScreen.BUTTONS_WIDTH_CHANGED, u.view.getButtonsWidth(), u.DIRECTION.PARENT);
      });
    }
    function A(e) {
      if (u.showDialpadControl() || !a.isPstnParticipant(e))
        return;
      M();
      u.showDialpadControl(!0);
      _();
    }
    function O(t) {
      if (!u.showDialpadControl() || !a.isPstnParticipant(t))
        return;
      a.isConversationWithPstn(e) || u.showDialpadControl(!1);
    }
    function M() {
      u.dialpadControl || (u.dialpadControl = d.build(e, t), u.dialpadControl.setContext(u));
    }
    function _() {
      u.dialpadControl.init(r.getElement(".DialPadController-input", t));
    }
    function D() {
      var e = u.showVideoControl() ? ".toggleVideo" : ".toggleMic", n = r.getElement(e, t);
      n && m.execute(function () {
        v.get().addFocusRequestToQueue(n, v.Priorities.Immediate);
      });
    }
    var u = this, y = o.resolve(s.serviceLocator.FEATURE_FLAGS), b = y.isFeatureOn(s.featureFlags.PSTN_ENABLED), w = a.isConversationWithPstn(e), E = b && w, S, x, T = g.getVideoCapabilityObservable(e);
    u.endCallControl = f.build(e, !0);
    u.micControl = c.build(e, !0);
    u.videoControl = h.build(e, !0);
    u.moreActionsControl = l.build(e);
    u.moreActionsControl.setContext(u);
    u.showDialpadControl = n.observable(E);
    u.showVideoControl = T;
    u.showMessageControl = y.isFeatureOn(s.featureFlags.CALLSCREEN_MINMAX);
    u.messageControl = p.build(e, function () {
      u.dispatchEvent(s.events.callScreen.SHOW_CHAT, null, u.DIRECTION.PARENT);
    });
    u.isLocalEscalationEnabled = N();
    u.isScreenSharingEnabled = C();
    u.isAVSettingsEnabled = k();
    u.hasMoreThanOneMoreAction = u.isLocalEscalationEnabled && u.isScreenSharingEnabled || u.isLocalEscalationEnabled && u.isAVSettingsEnabled || u.isAVSettingsEnabled && u.isScreenSharingEnabled;
    E && M();
    u.view = null;
    u.onButtonFocused = function () {
      u.dispatchEvent(s.events.callScreen.BUTTON_FOCUSED, !0, u.DIRECTION.PARENT);
    };
    u.onButtonBlurred = function () {
      u.dispatchEvent(s.events.callScreen.BUTTON_FOCUSED, !1, u.DIRECTION.PARENT);
    };
    u.init = function (t) {
      u.view = t;
      u.view.init(L);
      u.dialpadControl && _();
      u.forwardEvent(s.events.callScreen.TOGGLE_MODAL_DIALOG, u.DIRECTION.PARENT);
      u.forwardEvent(s.events.callScreen.MORE_ACTION_MENU_VISIBLE, u.DIRECTION.PARENT);
      u.forwardEvent(s.events.callScreen.MORE_ACTION_MENU_HIDDEN, u.DIRECTION.PARENT);
      u.forwardEvent(s.events.callScreen.DIALPAD_VISIBLE, u.DIRECTION.PARENT);
      u.forwardEvent(s.events.callScreen.DIALPAD_HIDDEN, u.DIRECTION.PARENT);
      u.registerEvent(s.events.callScreen.FOCUS_CALL_SCREEN, D);
      u.registerEvent(s.events.callScreen.HIDE_CHAT, u.messageControl.hasMessage.bind(u, !1));
      e.isGroupConversation() && b && (S = e.participants.added(A), x = e.participants.removed(O));
      L();
      D();
    };
    u.dispose = function () {
      u.view && u.view.dispose();
      T.dispose();
      u.endCallControl.dispose();
      u.micControl.dispose();
      u.videoControl.dispose();
      u.moreActionsControl.dispose();
      u.messageControl.dispose();
      u.dialpadControl && u.dialpadControl.dispose();
      S && S.dispose();
      x && x.dispose();
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("browser/dom"), i = e("swx-util-calling-stack"), s = e("swx-constants").COMMON, o = e("swx-service-locator-instance").default, u = e("utils/common/eventMixin"), a = e("ui/modelHelpers/conversationHelper"), f = e("ui/viewModels/calling/endCallControlViewModel"), l = e("ui/viewModels/calling/moreActionsControlViewModel"), c = e("ui/viewModels/calling/micControlViewModel"), h = e("ui/viewModels/calling/videoControlViewModel"), p = e("ui/viewModels/calling/messageControlViewModel"), d = e("ui/viewModels/calling/callScreenDialpadViewModel"), v = e("swx-focus-handler"), m = e("swx-utils-common").async, g = e("ui/calling/callingCapabilityHelper");
  return t.assign(y.prototype, u), {
    build: function (e, t) {
      return new y(e, t);
    }
  };
});

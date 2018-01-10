define("ui/viewModels/calling/callScreenViewModel/callScreenHeaderViewModel", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "swx-browser-detect",
  "swx-i18n",
  "utils/common/eventMixin",
  "ui/viewModels/calling/helpers/textFormatter",
  "swx-constants",
  "swx-constants",
  "swx-pubsub-instance",
  "ui/telemetry/actions/actionNames",
  "swx-service-locator-instance",
  "swx-enums",
  "experience/settings",
  "utils/common/styleModeHelper",
  "ui/viewModels/calling/helpers/fullScreenModeTracker",
  "ui/viewModels/calling/callScreenViewModel/callScreenLayoutHelper",
  "ui/viewModels/chat/conversationTopic"
], function (e) {
  function b(e, t, s) {
    function k(e) {
      if (N) {
        C.dispatchEvent(a.events.callScreen.HIDE_CHAT, null, C.DIRECTION.PARENT);
        N = !1;
        return;
      }
      C.isContainerFullScreen(e);
      C.dispatchEvent(a.events.callScreen.TOGGLE_FULLSCREEN, e, C.DIRECTION.PARENT);
      f.publish(a.apiUIEvents.SWX_CALLSCREEN_MAXIMIZE, e);
      v.get().modeChanged(e);
    }
    function L() {
      d.get().isIntegratedProperty() && T && k(!0);
    }
    function A() {
      return r.getBrowserInfo().browserName === r.BROWSERS.SKYPE_SHELL ? !0 : t.autoCall && t.autoCall() ? !0 : t.selfParticipant.audio.state.reason === h.callDisconnectionReason.CallEscalated ? v.get().getLastMode() : d.get().isIntegratedProperty() && T ? !1 : T;
    }
    function O() {
      return C.isContainerFullScreen() ? i.fetch({ key: "callscreen_text_exitFullscreen" }) : i.fetch({ key: "callscreen_text_enterFullscreen" });
    }
    function M() {
      return C.isSidebarExpanded() ? i.fetch({ key: "callscreen_text_hideSidebar" }) : i.fetch({ key: "callscreen_text_showSidebar" });
    }
    function _() {
      return (E() === u.CONNECTED || E() === u.ENDING) && C.watermarkCanBeShown();
    }
    function D(e) {
      E() === u.CONNECTED && C.watermarkCanBeShown(!e);
    }
    function P() {
      b ? (B(), window.clearInterval(b)) : C.callStatusDisplay(s.ENDED);
    }
    function H(e) {
      switch (e) {
      case u.CALLING:
      case u.EARLY_MEDIA:
        C.callStatusDisplay(s.CALLING);
        break;
      case u.CONNECTED:
        L(), j();
        break;
      case u.ENDING:
        P(), N = !1;
      }
    }
    function B() {
      C.callStatusDisplay(o.getFormattedDuration(e.getCurrentDuration()));
    }
    function j() {
      B();
      b = window.setInterval(B, y);
    }
    function F(e) {
      var n = !!e;
      C.isGridViewControlVisible(n && !m.isInActiveSpeakerMode(t));
    }
    var b, w, E = e.state, S, x = c.resolve(a.serviceLocator.FEATURE_FLAGS), T = x.isFeatureOn(a.featureFlags.CALLING_FULL_SCREEN_ENABLED), N = !1, C = this;
    C.callStatusDisplay = n.observable(s.CONNECTING);
    C.watermarkCanBeShown = n.observable(!1);
    C.isContainerFullScreen = n.observable(!1);
    C.isSidebarExpanded = n.observable(!1);
    C.sidebarButtonText = n.computed(M);
    C.showToggleSidebarIcon = p.API.version !== 2;
    C.isInShellApp = n.observable(!1);
    C.fullscreenText = n.computed(O);
    C.isWatermarkVisible = n.computed(_);
    C.isGridViewControlVisible = n.observable(!1);
    C.onButtonFocused = function () {
      C.dispatchEvent(a.events.callScreen.BUTTON_FOCUSED, !0, C.DIRECTION.PARENT);
    };
    C.onButtonBlurred = function () {
      C.dispatchEvent(a.events.callScreen.BUTTON_FOCUSED, !1, C.DIRECTION.PARENT);
    };
    C.toggleContainerFullScreen = function () {
      var e = c.resolve(a.serviceLocator.ACTION_TELEMETRY);
      k(!C.isContainerFullScreen());
      e.recordAction(l.audioVideo.toggleFullScreen);
    };
    C.toggleNarrowMenu = function () {
      var e = c.resolve(a.serviceLocator.ACTION_TELEMETRY);
      C.isSidebarExpanded(!C.isSidebarExpanded());
      C.dispatchEvent(a.events.callScreen.TOGGLE_NARROW_MENU, null, C.DIRECTION.PARENT);
      e.recordAction(l.audioVideo.toggleNarrowMenu);
    };
    C.toggleGridView = function () {
      var e = c.resolve(a.serviceLocator.ACTION_TELEMETRY);
      C.dispatchEvent(a.events.callScreen.TOGGLE_GRID_VIEW, null, C.DIRECTION.PARENT);
      e.recordAction(l.audioVideo.toggleGridView);
    };
    C.init = function () {
      S = g.build(t);
      C.conversationTopic = S.topic;
      C.registerEvent(a.events.callScreen.CONTROLS_VISIBLE, D);
      C.registerEvent(a.events.callScreen.PINNED_PARTICIPANT_CHANGED, F);
      C.registerEvent(a.events.callScreen.SHOW_CHAT, function () {
        k(!1);
        N = !0;
      });
      w = E.subscribe(H);
      H(E());
      k(A());
      r.getBrowserInfo().browserName === r.BROWSERS.SKYPE_SHELL && C.isInShellApp(!0);
    };
    C.dispose = function () {
      w.dispose();
      C.fullscreenText.dispose();
      C.sidebarButtonText.dispose();
      C.isWatermarkVisible.dispose();
      b && window.clearInterval(b);
      S.dispose();
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("swx-browser-detect").default, i = e("swx-i18n").localization, s = e("utils/common/eventMixin"), o = e("ui/viewModels/calling/helpers/textFormatter"), u = e("swx-constants").CALLING.CALL_STATES, a = e("swx-constants").COMMON, f = e("swx-pubsub-instance").default, l = e("ui/telemetry/actions/actionNames"), c = e("swx-service-locator-instance").default, h = e("swx-enums"), p = e("experience/settings"), d = e("utils/common/styleModeHelper"), v = e("ui/viewModels/calling/helpers/fullScreenModeTracker"), m = e("ui/viewModels/calling/callScreenViewModel/callScreenLayoutHelper"), g = e("ui/viewModels/chat/conversationTopic"), y = 1000;
  return t.assign(b.prototype, s), {
    build: function (e, t, n) {
      return new b(e, t, n);
    }
  };
});

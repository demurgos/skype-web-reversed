define("ui/viewModels/calling/callScreenViewModel/callScreenViewModel", [
  "require",
  "lodash-compat",
  "utils/common/cafeObservable",
  "swx-constants",
  "ui/viewModels/calling/callScreenViewModel/callState",
  "swx-constants",
  "swx-constants",
  "telemetry/calling/devicesTracker",
  "utils/common/eventMixin",
  "utils/common/elementQueryHelper",
  "swx-i18n",
  "vendor/knockout",
  "browser/window",
  "swx-pubsub-instance",
  "browser/document",
  "swx-utils-common",
  "utils/common/styleModeHelper",
  "swx-browser-detect",
  "utils/common/focusRestrictor",
  "swx-service-locator-instance",
  "ui/viewModels/chat/conversationTile",
  "ui/viewModels/chat/conversationTopic",
  "swx-constants",
  "elementQuery"
], function (e) {
  function C(e, t) {
    function j(e) {
      switch (e) {
      case s.CALL_SCREEN_DIALOG.NAME.ADD_PARTICIPANTS:
        a.isAddParticipantsVisible(!a.isAddParticipantsVisible());
        break;
      case s.CALL_SCREEN_DIALOG.NAME.TRANSFER_CALL:
        a.isTransferCallVisible(!a.isTransferCallVisible());
        break;
      case s.CALL_SCREEN_DIALOG.NAME.AV_SETTINGS:
        a.isAVSettingsVisible(!a.isAVSettingsVisible());
        break;
      case s.CALL_SCREEN_DIALOG.NAME.SCREEN_SHARING_PREVIEW:
        a.isScreenSharingPreviewVisible(!a.isScreenSharingPreviewVisible());
      }
    }
    function F() {
      a.dispatchEvent(o.events.callScreen.SIDEBAR_TOGGLED, a.DIRECTION.CHILD);
      f.refresh();
    }
    function I() {
      a.handleShowHideControls();
    }
    function q() {
      if (!a.isConversationVisible())
        return;
      a.addClassToShowSidebar() ? (p.publish(N.HIDE_SIDEBAR), a.addClassToShowSidebar(!1), a.addClassToHideSidebar(!0)) : (p.publish(N.SHOW_SIDEBAR), a.addClassToShowSidebar(!0), a.addClassToHideSidebar(!1));
      U();
    }
    function R(e) {
      a.isContainerFullScreen(e);
      f.refresh();
      e && C && a.bottomValueInPixels(C);
    }
    function U() {
      h.setTimeout(f.refresh, 1000);
    }
    function z(e) {
      switch (e) {
      case r.CALLING:
      case r.EARLY_MEDIA:
        q(), f.refresh();
        break;
      case r.CONNECTED:
        u.reportCurrentDeviceCount(), a.isContainerFullScreen() && a.isConversationVisible() && h.setTimeout(function () {
          J();
          $();
        }, 200), a.handleShowHideControls();
        break;
      case r.ENDING:
        a.isAddParticipantsVisible(!1), a.isTransferCallVisible(!1), a.isAVSettingsVisible(!1), a.isScreenSharingPreviewVisible(!1);
        break;
      case r.ENDED:
        K();
      }
    }
    function W(e) {
      a.isConversationVisible(e);
      e && f.refresh();
    }
    function X(e) {
      e ? $() : J();
    }
    function V(e) {
      e && a.dispatchEvent(o.events.callScreen.FOCUS_CALL_SCREEN, null, a.DIRECTION.CHILD);
    }
    function $() {
      a.isFocusRestricted() || (P.restrict(), a.isFocusRestricted(!0));
    }
    function J() {
      a.isFocusRestricted() && (P.restore(), a.isFocusRestricted(!1));
    }
    function K() {
      p.publish(N.SHOW_SIDEBAR);
      a.dispatchEvent(s.EVENTS.CALL_SCREEN_CLOSE, a.DIRECTION.PARENT);
      a.dispose();
    }
    function Q() {
      x = h.setTimeout(function () {
        x = null;
        Y();
      }, T);
    }
    function G() {
      x && (h.clearTimeout(x), x = null);
    }
    function Y() {
      _ && a.controlsVisible(!1);
    }
    function Z() {
      a.controlsVisible() || (a.controlsVisible(!0), a.dispatchEvent(o.events.callScreen.CONTROLS_VISIBLE, !0, a.DIRECTION.CHILD));
    }
    function et() {
      _ = !1;
      a.handleShowHideControls();
    }
    function tt() {
      _ = !0;
      a.handleShowHideControls();
    }
    function nt() {
      function t() {
        return e.autoCall && e.autoCall();
      }
      function n() {
        return M() === r.CONNECTING && !t();
      }
      function i() {
        return t() && M() === r.CONNECTING || M() === r.CALLING || M() === r.EARLY_MEDIA;
      }
      return {
        connecting: n(),
        calling: i(),
        connected: M() === r.CONNECTED,
        ended: M() === r.ENDED,
        ending: M() === r.ENDING,
        showControls: a.controlsVisible(),
        hideControls: !a.controlsVisible()
      };
    }
    function rt(e) {
      return e < 60000 ? l.fetch({ key: "callscreen_text_statusMessageScreenReaderEnding_less_than_minute" }) : l.fetch({
        key: "callscreen_text_statusMessageScreenReaderEnding_minutes",
        count: Math.floor(e / 1000 / 60)
      });
    }
    function it() {
      if (m.get().isIntegratedProperty() && g.getBrowserInfo().browserName === g.BROWSERS.SAFARI) {
        var e = d.querySelector("#FlexPane");
        e && (e.style.overflow = a.isContainerFullScreen() ? "visible" : "");
      }
    }
    var a = this, C, k, L, A, O = i.build(e), M = O.state, _ = !0, D = b.resolve(S.FEATURE_FLAGS), P = y.build(t, [".swxContextMenu"]), H = E.build(e), B = w.build(e);
    a.callScreenStrings = {
      CONNECTING: l.fetch({ key: "callscreen_text_statusMessageConnecting" }),
      CALLING: l.fetch({ key: "callscreen_text_statusMessageCalling" }),
      ENDED: l.fetch({ key: "callscreen_text_terminationMessage" }),
      CONTROLS_ANIMATION_NAME: "av-controls-hide"
    };
    a.conversation = e;
    a.callingState = O;
    a.isContainerFullScreen = c.observable(!1);
    a.isFocusRestricted = c.observable(!1);
    a.bottomValueInPixels = c.observable("0%");
    a.avatarUrl = n.newObservableProperty(e.avatarUrl);
    a.topic = H.topic;
    a.displayName = H.displayName;
    a.isPstn = B.isPstn;
    a.addClassToShowSidebar = c.observable(!0);
    a.addClassToHideSidebar = c.observable(!1);
    a.controlsVisible = c.observable(!0);
    a.isConversationVisible = c.observable(!0);
    a.isResizeVisible = D.isFeatureOn(s.FEATURE_FLAGS.RESIZE_CALL_AND_CHAT);
    a.footerButtonsWidth = c.observable(0);
    a.ADD_PARTICIPANTS_DIALOG_NAME = s.CALL_SCREEN_DIALOG.NAME.ADD_PARTICIPANTS;
    a.TRANSFER_CALL_DIALOG_NAME = s.CALL_SCREEN_DIALOG.NAME.TRANSFER_CALL;
    a.isAddParticipantsVisible = c.observable(!1);
    a.isTransferCallVisible = c.observable(!1);
    a.isAVSettingsVisible = c.observable(!1);
    a.isScreenSharingPreviewVisible = c.observable(!1);
    a.callStatusScreenReader = c.computed(function () {
      var t = M();
      if (t === r.ENDING)
        return rt(O.totalCallDuration);
      if (t === r.CONNECTING)
        return l.fetch({
          key: "callscreen_text_statusMessageScreenReaderConnecting",
          params: { contactName: e.topic() }
        });
    });
    a.mainClass = c.computed(nt);
    a.handleAnimationEnded = function (e, t) {
      var n = t && t.originalEvent && t.originalEvent.animationName && t.originalEvent.animationName.search(a.callScreenStrings.CONTROLS_ANIMATION_NAME) > -1 || t && t.animationName && t.animationName.search(a.callScreenStrings.CONTROLS_ANIMATION_NAME) > -1;
      n && a.dispatchEvent(o.events.callScreen.CONTROLS_VISIBLE, !1, a.DIRECTION.CHILD);
    };
    a.init = function () {
      k = M.subscribe(z);
      L = a.isContainerFullScreen.subscribe(function (e) {
        it();
        p.publish(s.EVENTS.FULLSCREEN_CHANGED, e);
        a.isConversationVisible() && (X(e), V(e));
      });
      A = a.isConversationVisible.subscribe(function (e) {
        a.isContainerFullScreen() && (X(e), V(e));
      });
      a.registerEvent(o.events.callScreen.TOGGLE_MODAL_DIALOG, j);
      a.registerEvent(o.events.callScreen.BUTTONS_WIDTH_CHANGED, a.footerButtonsWidth.bind(a));
      a.registerEvent(o.events.callScreen.TOGGLE_NARROW_MENU, q);
      a.registerEvent(o.events.callScreen.BUTTON_FOCUSED, I);
      a.registerEvent(o.events.callScreen.MORE_ACTION_MENU_VISIBLE, et);
      a.registerEvent(o.events.callScreen.MORE_ACTION_MENU_HIDDEN, tt);
      a.registerEvent(o.events.callScreen.DIALPAD_VISIBLE, et);
      a.registerEvent(o.events.callScreen.DIALPAD_HIDDEN, tt);
      a.registerEvent(o.events.callScreen.HIDE_CHAT, v.execute.bind(null, f.refresh));
      a.forwardEvent(o.events.callScreen.TOGGLE_FULLSCREEN, a.DIRECTION.CHILD, R);
      a.forwardEvent(o.events.navigation.FRAGMENT_SHOW, a.DIRECTION.CHILD, W.bind(a, !0));
      a.forwardEvent(o.events.navigation.FRAGMENT_BEFORE_HIDE, a.DIRECTION.CHILD, W.bind(a, !1));
      a.forwardEvent(o.events.callScreen.PINNED_PARTICIPANT_CHANGED, a.DIRECTION.CHILD);
      a.forwardEvent(o.events.callScreen.TOGGLE_GRID_VIEW, a.DIRECTION.CHILD);
      a.forwardEvent(o.events.callScreen.SHOW_CHAT);
      a.forwardEvent(o.events.callScreen.HIDE_CHAT);
      f.refresh();
      p.subscribe(N.SIDEBAR_TRANSITION_ENDED, F);
    };
    a.handleShowHideControls = function () {
      M() === r.CONNECTED && (G(), Z(), _ && Q());
    };
    a.handleMouseMove = a.handleShowHideControls;
    a.dispose = function () {
      X(!1);
      a.isContainerFullScreen(!1);
      k.dispose();
      L.dispose();
      A.dispose();
      O.dispose();
      a.mainClass.dispose();
      a.callStatusScreenReader.dispose();
      p.unsubscribe(N.SIDEBAR_TRANSITION_ENDED, F);
    };
  }
  var t = e("lodash-compat"), n = e("utils/common/cafeObservable"), r = e("swx-constants").CALLING.CALL_STATES, i = e("ui/viewModels/calling/callScreenViewModel/callState"), s = e("swx-constants").CALLING, o = e("swx-constants").COMMON, u = e("telemetry/calling/devicesTracker"), a = e("utils/common/eventMixin"), f = e("utils/common/elementQueryHelper"), l = e("swx-i18n").localization, c = e("vendor/knockout"), h = e("browser/window"), p = e("swx-pubsub-instance").default, d = e("browser/document"), v = e("swx-utils-common").async, m = e("utils/common/styleModeHelper"), g = e("swx-browser-detect").default, y = e("utils/common/focusRestrictor"), b = e("swx-service-locator-instance").default, w = e("ui/viewModels/chat/conversationTile"), E = e("ui/viewModels/chat/conversationTopic"), S = e("swx-constants").COMMON.serviceLocator;
  e("elementQuery");
  var x, T = 2000, N = o.events.narrowMode;
  return t.assign(C.prototype, a), {
    build: function (e, t) {
      return new C(e, t);
    }
  };
});

define("ui/viewModels/calling/callScreenViewModel/callScreenViewModel", [
  "require",
  "lodash-compat",
  "ui/telemetry/actions/actionNames",
  "browser/detect",
  "utils/common/cafeObservable",
  "constants/calling",
  "constants/calling",
  "ui/modelHelpers/conversationHelper",
  "constants/common",
  "ui/viewModels/calling/callScreenViewModel/callState",
  "utils/common/eventMixin",
  "utils/common/elementQueryHelper",
  "swx-i18n",
  "vendor/knockout",
  "browser/window",
  "services/pubSub/pubSub",
  "ui/viewModels/calling/callScreenViewModel/sounds",
  "services/serviceLocator",
  "constants/common",
  "elementQuery"
], function (e) {
  function S(e) {
    function C() {
      A(), S = null;
    }
    function k(e) {
      var t = g.resolve(a.serviceLocator.ACTION_TELEMETRY), r = e ? n.audioVideo.submitParticipantsInGroup : n.audioVideo.submitParticipantsIn1to1;
      t.recordAction(r);
    }
    function L() {
      var e = !0;
      l.addParticipantMode(e), l.dispatchEvent(a.events.callScreen.ADD_PARTICIPANT_VISIBLE, e, l.DIRECTION.CHILD);
    }
    function A() {
      var e = !1;
      l.addParticipantMode(e), l.dispatchEvent(a.events.callScreen.ADD_PARTICIPANT_VISIBLE, e, l.DIRECTION.CHILD);
    }
    function O() {
      l.dispatchEvent(a.events.callScreen.SIDEBAR_TOGGLED, l.DIRECTION.CHILD), c.refresh();
    }
    function M(e) {
      e ? l.handleMouseOver() : l.handleMouseLeave();
    }
    function _() {
      l.addClassToShowSidebar() ? (v.publish(E.HIDE_SIDEBAR), l.addClassToShowSidebar(!1), l.addClassToHideSidebar(!0)) : (v.publish(E.SHOW_SIDEBAR), l.addClassToShowSidebar(!0), l.addClassToHideSidebar(!1)), P();
    }
    function D(e) {
      l.isContainerFullScreen(e), c.refresh(), e && t && l.bottomValueInPixels(t);
    }
    function P() {
      d.setTimeout(c.refresh, 1000);
    }
    function H(e) {
      switch (e) {
      case s.CALLING:
      case s.EARLY_MEDIA:
        _(), c.refresh();
        break;
      case s.ENDED:
        j();
      }
    }
    function B(e) {
      l.isConversationVisible(e), e && c.refresh();
    }
    function j() {
      v.publish(E.SHOW_SIDEBAR), l.dispatchEvent(o.EVENTS.CALL_SCREEN_CLOSE, l.DIRECTION.PARENT), l.dispose();
    }
    function F() {
      b = d.setTimeout(q, w);
    }
    function I() {
      d.clearTimeout(b);
    }
    function q() {
      l.controlsVisible(!1);
    }
    function R() {
      l.controlsVisible() || (l.controlsVisible(!0), l.dispatchEvent(a.events.callScreen.CONTROLS_VISIBLE, !0, l.DIRECTION.CHILD));
    }
    function U() {
      function t() {
        return e.autoCall && e.autoCall();
      }
      function n() {
        return T() === s.CONNECTING && !t();
      }
      function r() {
        return t() && T() === s.CONNECTING || T() === s.CALLING || T() === s.EARLY_MEDIA;
      }
      return {
        connecting: n(),
        calling: r(),
        connected: T() === s.CONNECTED,
        ended: T() === s.ENDED,
        ending: T() === s.ENDING,
        showControls: l.controlsVisible(),
        hideControls: !l.controlsVisible()
      };
    }
    function z(e) {
      return e < 60000 ? h.fetch({ key: "callscreen_text_statusMessageScreenReaderEnding_less_than_minute" }) : h.fetch({
        key: "callscreen_text_statusMessageScreenReaderEnding_minutes",
        count: Math.floor(e / 1000 / 60)
      });
    }
    var t, l = this, S, x = f.build(e), T = x.state, N = g.resolve(y.FEATURE_FLAGS);
    this.callScreenStrings = {
      CONNECTING: h.fetch({ key: "callscreen_text_statusMessageConnecting" }),
      CALLING: h.fetch({ key: "callscreen_text_statusMessageCalling" }),
      ENDED: h.fetch({ key: "callscreen_text_terminationMessage" }),
      CONTROLS_ANIMATION_NAME: "av-controls-hide"
    }, this.conversation = e, this.callingState = x, this.isContainerFullScreen = p.observable(!1), this.bottomValueInPixels = p.observable("0%"), this.avatarUrl = i.newObservableProperty(e.avatarUrl), this.addClassToShowSidebar = p.observable(!0), this.addClassToHideSidebar = p.observable(!1), this.controlsVisible = p.observable(!0), this.isConversationVisible = p.observable(!0), this.isResizeVisible = N.isFeatureOn(o.FEATURE_FLAGS.RESIZE_CALL_AND_CHAT), this.footerButtonsWidth = p.observable(0), this.addParticipantMode = p.observable(!1), this.addParticipantsTitle = h.fetch({ key: "button_text_addParticipants" }), this.cancelAddParticipantsTitle = h.fetch({ key: "button_text_cancelAddParticipants" }), this.setParticipantProvider = function (e) {
      S = e;
    }, this.submitSelectedParticipants = function () {
      var t = S.selectedContacts;
      t().length > 0 && (e.isGroupConversation() || l.dispatchEvent(a.events.callScreen.CALL_ESCALATED_TO_GROUP, !0, l.DIRECTION.CHILD), k(e.isGroupConversation()), u.addPersonsToConversation(t(), e)), C();
    }, this.undoSelectedParticipants = C, this.callStatusScreenReader = p.computed(function () {
      var t = T();
      if (t === s.ENDING)
        return z(x.totalCallDuration);
      if (t === s.CONNECTING)
        return h.fetch({
          key: "callscreen_text_statusMessageScreenReaderConnecting",
          params: { contactName: e.topic() }
        });
    }), this.mainClass = p.computed(U), this.isContainerFullScreen.subscribe(function (e) {
      v.publish(o.EVENTS.FULLSCREEN_CHANGED, e);
    }), this.handleMouseLeave = function () {
      T() === s.CONNECTED && F();
    }, this.handleMouseOver = function () {
      T() === s.CONNECTED && (I(), R());
    }, this.handleAnimationEnded = function (e, t) {
      var n = t && t.originalEvent && t.originalEvent.animationName && t.originalEvent.animationName.search(l.callScreenStrings.CONTROLS_ANIMATION_NAME) > -1 || t && t.animationName && t.animationName.search(l.callScreenStrings.CONTROLS_ANIMATION_NAME) > -1;
      n && l.dispatchEvent(a.events.callScreen.CONTROLS_VISIBLE, !1, l.DIRECTION.CHILD);
    }, this.init = function () {
      m.init(x), T.subscribe(H), l.registerEvent(a.events.callScreen.ADD_PARTICIPANT, L), l.forwardEvent(a.events.roster.ROSTER_QUERY_CHANGED), l.forwardEvent(a.events.roster.ROSTER_QUERY_EXECUTED), l.forwardEvent(a.events.roster.ROSTER_SELECTION_REMOVED), l.forwardEvent(a.events.roster.PICKER_CONTACT_SELECTED), l.forwardEvent(a.events.roster.PICKER_CONTACT_DESELECTED), l.registerEvent(a.events.callScreen.BUTTONS_WIDTH_CHANGED, l.footerButtonsWidth.bind(l)), l.registerEvent(a.events.callScreen.TOGGLE_NARROW_MENU, _), l.registerEvent(a.events.callScreen.BUTTON_FOCUSED, M), l.forwardEvent(a.events.callScreen.TOGGLE_FULLSCREEN, l.DIRECTION.CHILD, D), l.forwardEvent(a.events.navigation.FRAGMENT_SHOW, l.DIRECTION.CHILD, B.bind(l, !0)), l.forwardEvent(a.events.navigation.FRAGMENT_BEFORE_HIDE, l.DIRECTION.CHILD, B.bind(l, !1)), r.getBrowserInfo().browserName === r.BROWSERS.SKYPE_SHELL && l.isContainerFullScreen(!0), e.autoCall && e.autoCall() && l.isContainerFullScreen(!0), A(), c.refresh(), v.subscribe(E.SIDEBAR_TRANSITION_ENDED, O);
    }, this.dispose = function () {
      m.dispose(), l.isContainerFullScreen(!1), x.dispose(), l.mainClass.dispose(), l.callStatusScreenReader.dispose(), v.unsubscribe(E.SIDEBAR_TRANSITION_ENDED, O);
    };
  }
  var t = e("lodash-compat"), n = e("ui/telemetry/actions/actionNames"), r = e("browser/detect"), i = e("utils/common/cafeObservable"), s = e("constants/calling").CALL_STATES, o = e("constants/calling"), u = e("ui/modelHelpers/conversationHelper"), a = e("constants/common"), f = e("ui/viewModels/calling/callScreenViewModel/callState"), l = e("utils/common/eventMixin"), c = e("utils/common/elementQueryHelper"), h = e("swx-i18n").localization, p = e("vendor/knockout"), d = e("browser/window"), v = e("services/pubSub/pubSub"), m = e("ui/viewModels/calling/callScreenViewModel/sounds"), g = e("services/serviceLocator"), y = e("constants/common").serviceLocator;
  e("elementQuery");
  var b, w = 2000, E = a.events.narrowMode;
  return t.assign(S.prototype, l), {
    build: function (e) {
      return new S(e);
    }
  };
})

define("ui/viewModels/calling/callScreenViewModel/callScreenHeaderViewModel", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "utils/common/cafeObservable",
  "browser/detect",
  "swx-i18n",
  "utils/common/eventMixin",
  "ui/viewModels/calling/helpers/textFormatter",
  "constants/calling",
  "constants/common",
  "services/pubSub/pubSub",
  "ui/telemetry/actions/actionNames",
  "ui/modelHelpers/conversationHelper",
  "swx-utils-common",
  "utils/chat/messageSanitizer",
  "services/serviceLocator"
], function (e) {
  function g(e, t, o) {
    function S() {
      return E.isContainerFullScreen() ? s.fetch({ key: "callscreen_text_exitFullscreen" }) : s.fetch({ key: "callscreen_text_enterFullscreen" });
    }
    function x() {
      return (b() === a.CONNECTED || b() === a.ENDING) && E.watermarkCanBeShown();
    }
    function T() {
      var e = w();
      return e = d.removeAnchorTags(e), e = d.unescapeHTML(e), h.isPstnEndpoint(e) && (e = p.forceLTREmbedding(e)), e;
    }
    function N(e) {
      b() === a.CONNECTED && E.watermarkCanBeShown(!e);
    }
    function C() {
      g ? (L(), window.clearInterval(g)) : E.callStatusDisplay(o.ENDED);
    }
    function k(e) {
      switch (e) {
      case a.CALLING:
      case a.EARLY_MEDIA:
        E.callStatusDisplay(o.CALLING);
        break;
      case a.CONNECTED:
        A();
        break;
      case a.ENDING:
        C();
      }
    }
    function L() {
      E.callStatusDisplay(u.getFormattedDuration(e.getCurrentDuration()));
    }
    function A() {
      L(), g = window.setInterval(L, m);
    }
    var g, y, b = e.state, w = r.newObservableProperty(t.topic), E = this;
    E.conversationTopic = n.computed(T), E.callStatusDisplay = n.observable(o.CONNECTING), E.watermarkCanBeShown = n.observable(!1), E.isContainerFullScreen = n.observable(!1), E.isInShellApp = n.observable(!1), E.fullscreenText = n.computed(S), E.isWatermarkVisible = n.computed(x), E.onButtonFocused = function () {
      E.dispatchEvent(f.events.callScreen.BUTTON_FOCUSED, !0, E.DIRECTION.PARENT);
    }, E.onButtonBlurred = function () {
      E.dispatchEvent(f.events.callScreen.BUTTON_FOCUSED, !1, E.DIRECTION.PARENT);
    }, E.toggleContainerFullScreen = function () {
      var e = v.resolve(f.serviceLocator.ACTION_TELEMETRY);
      E.isContainerFullScreen(!E.isContainerFullScreen()), E.dispatchEvent(f.events.callScreen.TOGGLE_FULLSCREEN, E.isContainerFullScreen(), E.DIRECTION.PARENT), l.publish(f.apiUIEvents.SWX_CALLSCREEN_MAXIMIZE, E.isContainerFullScreen()), e.recordAction(c.audioVideo.toggleFullScreen);
    }, E.toggleNarrowMenu = function () {
      var e = v.resolve(f.serviceLocator.ACTION_TELEMETRY);
      E.dispatchEvent(f.events.callScreen.TOGGLE_NARROW_MENU, null, E.DIRECTION.PARENT), e.recordAction(c.audioVideo.toggleNarrowMenu);
    }, E.init = function () {
      E.registerEvent(f.events.callScreen.CONTROLS_VISIBLE, N), y = b.subscribe(k), k(b()), i.getBrowserInfo().browserName === i.BROWSERS.SKYPE_SHELL && (E.isContainerFullScreen(!0), E.isInShellApp(!0)), t.autoCall && t.autoCall() && E.isContainerFullScreen(!0);
    }, E.dispose = function () {
      y.dispose(), E.fullscreenText.dispose(), E.isWatermarkVisible.dispose(), g && window.clearInterval(g);
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("utils/common/cafeObservable"), i = e("browser/detect"), s = e("swx-i18n").localization, o = e("utils/common/eventMixin"), u = e("ui/viewModels/calling/helpers/textFormatter"), a = e("constants/calling").CALL_STATES, f = e("constants/common"), l = e("services/pubSub/pubSub"), c = e("ui/telemetry/actions/actionNames"), h = e("ui/modelHelpers/conversationHelper"), p = e("swx-utils-common").stringUtils, d = e("utils/chat/messageSanitizer"), v = e("services/serviceLocator"), m = 1000;
  return t.assign(g.prototype, o), {
    build: function (e, t, n) {
      return new g(e, t, n);
    }
  };
})

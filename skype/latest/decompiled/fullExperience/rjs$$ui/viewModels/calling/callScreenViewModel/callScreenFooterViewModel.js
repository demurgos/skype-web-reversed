define("ui/viewModels/calling/callScreenViewModel/callScreenFooterViewModel", [
  "require",
  "lodash-compat",
  "browser/detect",
  "vendor/knockout",
  "browser/dom",
  "utils/calling/callingStack",
  "constants/common",
  "services/serviceLocator",
  "utils/common/eventMixin",
  "ui/modelHelpers/conversationHelper",
  "ui/viewModels/calling/endCallControlViewModel",
  "ui/viewModels/calling/moreActionsControlViewModel",
  "ui/viewModels/calling/micControlViewModel",
  "ui/viewModels/calling/videoControlViewModel",
  "ui/viewModels/calling/callScreenDialpadViewModel"
], function (e) {
  function v(e, t) {
    function b() {
      return !s.get().isPluginlessCallingSupported() && !e.selfParticipant.isAnonymous() && v.isFeatureOn(o.featureFlags.GVC_LOCAL_ESCALATION);
    }
    function w() {
      return !s.get().isPluginlessCallingSupported() && !e.selfParticipant.isAnonymous() && v.isFeatureOn(o.featureFlags.OUTGOING_SCREEN_SHARING);
    }
    function E() {
      return n.getSystemInfo().osName === n.OPERATING_SYSTEMS.LINUX ? !1 : e.isGroupConversation() ? !0 : !g;
    }
    function S() {
      a.dispatchEvent(o.events.callScreen.BUTTONS_WIDTH_CHANGED, a.view.getButtonsWidth(), a.DIRECTION.PARENT);
    }
    var a = this, v = u.resolve(o.serviceLocator.FEATURE_FLAGS), m = v.isFeatureOn(o.featureFlags.PSTN_ENABLED), g = f.isConversationWithPstn(e), y = m && g;
    a.endCallControl = l.build(e, !0), a.micControl = h.build(e, !0), a.videoControl = p.build(e, !0), a.moreActionsControl = c.build(e), a.moreActionsControl.setContext(a), a.showDialpadControl = r.observable(y), a.showVideoControl = E(), a.isLocalEscalationEnabled = b(), a.isScreenSharingEnabled = w(), a.hasMoreThanOneMoreAction = a.isLocalEscalationEnabled && a.isScreenSharingEnabled, y && (a.dialpadControl = d.build(e)), a.view = null, a.onButtonFocused = function () {
      a.dispatchEvent(o.events.callScreen.BUTTON_FOCUSED, !0, a.DIRECTION.PARENT);
    }, a.onButtonBlurred = function () {
      a.dispatchEvent(o.events.callScreen.BUTTON_FOCUSED, !1, a.DIRECTION.PARENT);
    }, a.init = function (e) {
      a.view = e, a.view.init(S), a.dialpadControl && a.dialpadControl.init(i.getElement(".DialPadController-input", t)), a.forwardEvent(o.events.callScreen.CALL_ESCALATED_TO_GROUP, a.DIRECTION.CHILD), a.forwardEvent(o.events.callScreen.ADD_PARTICIPANT, a.DIRECTION.PARENT), a.forwardEvent(o.events.callScreen.ADD_PARTICIPANT_VISIBLE, a.DIRECTION.CHILD), S();
    }, a.dispose = function () {
      a.view && a.view.dispose(), a.endCallControl.dispose(), a.micControl.dispose(), a.videoControl.dispose(), a.moreActionsControl.dispose(), a.dialpadControl && a.dialpadControl.dispose();
    };
  }
  var t = e("lodash-compat"), n = e("browser/detect"), r = e("vendor/knockout"), i = e("browser/dom"), s = e("utils/calling/callingStack"), o = e("constants/common"), u = e("services/serviceLocator"), a = e("utils/common/eventMixin"), f = e("ui/modelHelpers/conversationHelper"), l = e("ui/viewModels/calling/endCallControlViewModel"), c = e("ui/viewModels/calling/moreActionsControlViewModel"), h = e("ui/viewModels/calling/micControlViewModel"), p = e("ui/viewModels/calling/videoControlViewModel"), d = e("ui/viewModels/calling/callScreenDialpadViewModel");
  return t.assign(v.prototype, a), {
    build: function (e, t) {
      return new v(e, t);
    }
  };
})

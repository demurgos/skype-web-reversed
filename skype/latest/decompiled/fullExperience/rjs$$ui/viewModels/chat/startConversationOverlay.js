define("ui/viewModels/chat/startConversationOverlay", [
  "require",
  "lodash-compat",
  "vendor/knockout",
  "constants/common",
  "utils/common/eventMixin",
  "ui/viewModels/people/contactBuilder",
  "ui/viewModels/chat/conversation/callButtonViewModel"
], function (e) {
  function u(e) {
    function l() {
      return a.displayMessage() === a.locationText() ? "" : a.displayMessage();
    }
    var t = this, i = e.conversationModel, u = i.participants()[0].person, a = s.build(u), f = o.build(i);
    t.avatar = a.avatar, t.statusClassName = a.statusClassName, t.displayName = a.displayName, t.displayMessage = n.computed(l), t.locationText = a.locationText, t.isAudioDisabled = f.isAudioDisabled, t.isVideoDisabled = f.isVideoDisabled, t.buttonVideoTitle = f.buttonVideoTitle, t.buttonVideoAriaLabel = f.buttonVideoAriaLabel, t.buttonCallTitle = f.buttonCallTitle, t.buttonCallAriaLabel = f.buttonCallAriaLabel, t.forwardEvent(r.events.conversation.OVERLAY_CLOSED), t.startCallWithAudio = function () {
      f.startCallWithAudio(), t.dispatchEvent(r.events.conversation.OVERLAY_CLOSED, t.DIRECTION.PARENT);
    }, t.startCallWithVideo = function () {
      f.startCallWithVideo(), t.dispatchEvent(r.events.conversation.OVERLAY_CLOSED, t.DIRECTION.PARENT);
    }, t.startChat = function () {
      t.dispatchEvent(r.events.conversation.OVERLAY_CLOSED, t.DIRECTION.PARENT);
    }, t.dispose = function () {
      a.dispose(), f.dispose();
    };
  }
  var t = e("lodash-compat"), n = e("vendor/knockout"), r = e("constants/common"), i = e("utils/common/eventMixin"), s = e("ui/viewModels/people/contactBuilder"), o = e("ui/viewModels/chat/conversation/callButtonViewModel");
  return t.assign(u.prototype, i), {
    build: function (e) {
      return new u(e);
    }
  };
})

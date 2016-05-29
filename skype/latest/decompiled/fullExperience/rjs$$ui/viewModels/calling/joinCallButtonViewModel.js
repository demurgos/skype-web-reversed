define("ui/viewModels/calling/joinCallButtonViewModel", [
  "require",
  "lodash-compat",
  "utils/common/eventMixin",
  "swx-i18n",
  "cafe/applicationInstance",
  "ui/telemetry/actions/actionNames",
  "ui/viewModels/calling/helpers/callingFacade",
  "ui/controls/calling/sounds",
  "ui/viewModels/chat/conversationActivity",
  "constants/common",
  "services/serviceLocator"
], function (e) {
  function c(e) {
    function h() {
      var e = !1;
      i.get().conversationsManager.conversations.add(n);
      o.placeCall(n, e, "startCallButton");
      u.playOnce(u.KEYS.CALL_DIALING);
    }
    var t = this, n = e.conversationModel, c;
    c = a.build(n);
    t.icon = e.showIcon === !0 ? "callStart" : "";
    t.cssClass = e.cssClass;
    t.tabIndex = e.tabIndex;
    t.isOnCall = c.isOnCall;
    t.isJoinCallDisabled = c.isJoinCallDisabled;
    t.joinCallTitle = r.fetch({ key: "button_text_joinCall" });
    t.joinCall = function () {
      var e = l.resolve(f.serviceLocator.ACTION_TELEMETRY);
      e.recordAction(s.audioVideo.joinCall);
      h();
    };
    t.dispose = function () {
      c.dispose();
    };
  }
  var t = e("lodash-compat"), n = e("utils/common/eventMixin"), r = e("swx-i18n").localization, i = e("cafe/applicationInstance"), s = e("ui/telemetry/actions/actionNames"), o = e("ui/viewModels/calling/helpers/callingFacade"), u = e("ui/controls/calling/sounds"), a = e("ui/viewModels/chat/conversationActivity"), f = e("constants/common"), l = e("services/serviceLocator");
  return t.assign(c.prototype, n), c;
});

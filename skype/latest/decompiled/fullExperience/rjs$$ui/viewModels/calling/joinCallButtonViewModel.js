define("ui/viewModels/calling/joinCallButtonViewModel", [
  "require",
  "lodash-compat",
  "utils/common/eventMixin",
  "swx-i18n",
  "swx-cafe-application-instance",
  "ui/telemetry/actions/actionNames",
  "ui/viewModels/calling/helpers/callingFacade",
  "ui/viewModels/chat/conversationActivity",
  "swx-constants",
  "swx-service-locator-instance"
], function (e) {
  function l(e) {
    function c(e) {
      e = e ? !0 : !1;
      var t = e ? "joinCallWithVideoButton" : "joinCallButton";
      i.get().conversationsManager.conversations.add(n);
      o.placeCall(n, e, t);
    }
    var t = this, n = e.conversationModel, l;
    l = u.build(n);
    t.icon = e.showIcon ? e.withVideo ? "video" : "callStart" : "";
    t.cssClass = e.cssClass;
    t.tabIndex = e.tabIndex;
    t.isOnCall = l.isOnCall;
    t.isJoinCallDisabled = e.withVideo ? l.isJoinCallWithVideoDisabled : l.isJoinCallDisabled;
    t.joinCallTitle = e.withVideo ? r.fetch({ key: "button_text_joinCallWithVideo" }) : r.fetch({ key: "button_text_joinCall" });
    t.joinCallTextKey = e.withVideo ? "button_text_joinCallWithVideo" : "button_text_joinCall";
    t.joinCall = function () {
      var t = f.resolve(a.serviceLocator.ACTION_TELEMETRY), n = e.withVideo ? s.audioVideo.joinCallWithVideo : s.audioVideo.joinCall;
      t.recordAction(n);
      c(e.withVideo);
    };
    t.dispose = function () {
      l.dispose();
    };
  }
  var t = e("lodash-compat"), n = e("utils/common/eventMixin"), r = e("swx-i18n").localization, i = e("swx-cafe-application-instance"), s = e("ui/telemetry/actions/actionNames"), o = e("ui/viewModels/calling/helpers/callingFacade"), u = e("ui/viewModels/chat/conversationActivity"), a = e("swx-constants").COMMON, f = e("swx-service-locator-instance").default;
  return t.assign(l.prototype, n), l;
});

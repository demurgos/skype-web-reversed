define("ui/viewModels/calling/plugin/firefoxUnableToCallStepViewModel", [
  "require",
  "exports",
  "module",
  "swx-constants",
  "utils/common/cafeObservable",
  "swx-i18n",
  "ui/telemetry/actions/actionNames",
  "swx-constants",
  "swx-service-locator-instance",
  "ui/viewModels/chat/conversationTile",
  "ui/viewModels/chat/conversationTopic"
], function (e, t) {
  var n = e("swx-constants").CALLING, r = e("utils/common/cafeObservable"), i = e("swx-i18n").localization, s = e("ui/telemetry/actions/actionNames"), o = e("swx-constants").COMMON, u = e("swx-service-locator-instance").default, a = e("ui/viewModels/chat/conversationTile"), f = e("ui/viewModels/chat/conversationTopic"), l = function (n) {
      var l = n.conversation, c = f.build(l), h = a.build(l);
      this.id = t.STEP_ID;
      this.label = i.fetch({ key: "pluginInstall_label_text_start" });
      this.avatar = r.newObservableProperty(l.avatarUrl);
      this.isGroupConversation = r.newObservableProperty(l.isGroupConversation);
      this.topic = c.topic;
      this.isPstn = h.isPstn;
      this.show = function () {
        var e = u.resolve(o.serviceLocator.ACTION_TELEMETRY);
        e.recordAction(s.audioVideo.pluginInstall.firefoxUnableToCall);
      };
      this.close = function () {
        n.close();
      };
    };
  t.STEP_ID = n.CALLING_SETUP_STEPS.OVERLAY_PLUGIN_FIREFOX_UNABLE_TO_CALL;
  t.build = function (e) {
    return new l(e);
  };
});

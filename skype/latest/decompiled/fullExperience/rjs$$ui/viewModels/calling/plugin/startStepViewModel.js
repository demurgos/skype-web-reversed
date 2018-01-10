define("ui/viewModels/calling/plugin/startStepViewModel", [
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
      var l = n.next, c = n.conversation, h = u.resolve(o.serviceLocator.FEATURE_FLAGS), p = f.build(c), d = a.build(c);
      this.id = t.STEP_ID;
      this.label = i.fetch({ key: "pluginInstall_label_text_start" });
      this.avatar = r.newObservableProperty(c.avatarUrl);
      this.isGroupConversation = r.newObservableProperty(c.isGroupConversation);
      this.showAutoUpdateDisclaimer = !h.isFeatureOn(o.featureFlags.USE_BUSINESS_WORDING);
      this.topic = p.topic;
      this.isPstn = d.isPstn;
      this.show = function () {
        var e = u.resolve(o.serviceLocator.ACTION_TELEMETRY);
        e.recordAction(s.audioVideo.pluginInstall.start);
      };
      this.close = function () {
        n.close();
      };
      this.installClick = function () {
        l();
      };
    };
  t.STEP_ID = n.CALLING_SETUP_STEPS.OVERLAY_PLUGIN_START;
  t.build = function (e) {
    return new l(e);
  };
});

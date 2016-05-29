define("ui/viewModels/calling/plugin/callbackStepViewModel", [
  "require",
  "exports",
  "module",
  "constants/calling",
  "utils/common/cafeObservable",
  "swx-i18n"
], function (e, t) {
  var n = e("constants/calling"), r = e("utils/common/cafeObservable"), i = e("swx-i18n").localization, s = function (s) {
      var o = s.next, u = s.conversation;
      this.id = t.STEP_ID;
      this.label = i.fetch({ key: "pluginInstall_label_text_continue" });
      this.conversationModel = u;
      this.avatar = r.newObservableProperty(u.avatarUrl);
      this.isGroupConversation = r.newObservableProperty(u.isGroupConversation);
      this.conversationTopic = r.newObservableProperty(u.topic);
      this.placeCall = function () {
        s.onPluginInstallEnded(n.PLUGIN_INSTALL_EXIT_METHOD.CALL_STARTED, !0, n.CALLING_SETUP_STEPS.OVERLAY_PLUGIN_CALLBACK);
        o();
      };
      this.notNow = function () {
        s.onPluginInstallEnded(n.PLUGIN_INSTALL_EXIT_METHOD.CLOSE, !0, n.CALLING_SETUP_STEPS.OVERLAY_PLUGIN_CALLBACK);
        o();
      };
    };
  t.STEP_ID = n.CALLING_SETUP_STEPS.OVERLAY_PLUGIN_CALLBACK;
  t.build = function (e) {
    return new s(e);
  };
});

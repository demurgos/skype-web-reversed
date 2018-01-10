define("ui/viewModels/calling/plugin/callbackStepViewModel", [
  "require",
  "exports",
  "module",
  "swx-constants",
  "utils/common/cafeObservable",
  "swx-i18n",
  "ui/viewModels/chat/conversationTile",
  "ui/viewModels/chat/conversationTopic"
], function (e, t) {
  var n = e("swx-constants").CALLING, r = e("utils/common/cafeObservable"), i = e("swx-i18n").localization, s = e("ui/viewModels/chat/conversationTile"), o = e("ui/viewModels/chat/conversationTopic"), u = function (u) {
      var a = u.next, f = u.conversation, l = o.build(f), c = s.build(f);
      this.id = t.STEP_ID;
      this.label = i.fetch({ key: "pluginInstall_label_text_continue" });
      this.conversationModel = f;
      this.avatar = r.newObservableProperty(f.avatarUrl);
      this.isGroupConversation = r.newObservableProperty(f.isGroupConversation);
      this.topic = l.topic;
      this.isPstn = c.isPstn;
      this.placeCallTextKey = function () {
        return u.isOutgoing ? "pluginInstall_callback_text_call" : "pluginInstall_callback_text_accept";
      };
      this.placeCall = function () {
        u.onPluginInstallEnded(n.PLUGIN_INSTALL_EXIT_METHOD.CALL_STARTED, !0, n.CALLING_SETUP_STEPS.OVERLAY_PLUGIN_CALLBACK);
        a();
      };
      this.notNow = function () {
        u.onPluginInstallEnded(n.PLUGIN_INSTALL_EXIT_METHOD.CLOSE, !0, n.CALLING_SETUP_STEPS.OVERLAY_PLUGIN_CALLBACK);
        a();
      };
    };
  t.STEP_ID = n.CALLING_SETUP_STEPS.OVERLAY_PLUGIN_CALLBACK;
  t.build = function (e) {
    return new u(e);
  };
});

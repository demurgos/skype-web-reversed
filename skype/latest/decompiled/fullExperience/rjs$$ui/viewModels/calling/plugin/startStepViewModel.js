define("ui/viewModels/calling/plugin/startStepViewModel", [
  "require",
  "exports",
  "module",
  "constants/calling",
  "utils/common/cafeObservable",
  "swx-i18n",
  "ui/telemetry/actions/actionNames",
  "constants/common",
  "services/serviceLocator"
], function (e, t) {
  var n = e("constants/calling"), r = e("utils/common/cafeObservable"), i = e("swx-i18n").localization, s = e("ui/telemetry/actions/actionNames"), o = e("constants/common"), u = e("services/serviceLocator"), a = function (n) {
      var a = n.next;
      this.id = t.STEP_ID;
      this.label = i.fetch({ key: "pluginInstall_label_text_start" });
      this.avatar = r.newObservableProperty(n.conversation.avatarUrl);
      this.isGroupConversation = r.newObservableProperty(n.conversation.isGroupConversation);
      this.show = function () {
        var e = u.resolve(o.serviceLocator.ACTION_TELEMETRY);
        e.recordAction(s.audioVideo.pluginInstall.start);
      };
      this.close = function () {
        n.close();
      };
      this.installClick = function () {
        a();
      };
    };
  t.STEP_ID = n.CALLING_SETUP_STEPS.OVERLAY_PLUGIN_START;
  t.build = function (e) {
    return new a(e);
  };
});

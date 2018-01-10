define("ui/viewModels/calling/plugin/unblockStepViewModel", [
  "require",
  "exports",
  "module",
  "swx-cafe-application-instance",
  "ui/viewModels/calling/helpers/browserInstallContent",
  "swx-enums",
  "swx-i18n",
  "swx-constants"
], function (e, t) {
  var n = e("swx-cafe-application-instance"), r = e("ui/viewModels/calling/helpers/browserInstallContent"), i = e("swx-enums"), s = e("swx-i18n").localization, o = e("swx-constants").CALLING, u = function (u) {
      function h() {
        c.changed(d);
      }
      function p() {
        c.changed.off(d);
      }
      function d(e, t) {
        t !== i.callingNotSupportedReasons.PluginBlocked && (u.conversation || u.onPluginInstallEnded(o.PLUGIN_INSTALL_EXIT_METHOD.PLUGIN_DETECTED, !0, o.CALLING_SETUP_STEPS.OVERLAY_PLUGIN_UNBLOCK), p(), a());
      }
      var a = u.next, f = u.close, l = r.getInstallResources(), c = n.get().personsAndGroupsManager.mePerson.capabilities.audio;
      this.id = t.STEP_ID;
      this.label = s.fetch({ key: "pluginInstall_label_text_unblock" });
      this.unblockText = l.text.unblock;
      this.unblockImageUrl = l.images.unblock;
      this.isFirefox = u.isFirefox;
      this.show = function () {
        h();
      };
      this.close = function () {
        f();
      };
    };
  t.STEP_ID = o.CALLING_SETUP_STEPS.OVERLAY_PLUGIN_UNBLOCK;
  t.build = function (e) {
    return new u(e);
  };
});

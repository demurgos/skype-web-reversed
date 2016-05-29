define("ui/viewModels/calling/plugin/downloadStepViewModel", [
  "require",
  "exports",
  "module",
  "cafe/applicationInstance",
  "services/plugin/pluginDownload",
  "constants/calling",
  "ui/viewModels/calling/helpers/browserInstallContent",
  "swx-enums",
  "swx-i18n",
  "constants/calling.resources",
  "ui/telemetry/actions/actionNames",
  "constants/common",
  "services/serviceLocator"
], function (e, t) {
  var n = e("cafe/applicationInstance"), r = e("services/plugin/pluginDownload"), i = e("constants/calling"), s = e("ui/viewModels/calling/helpers/browserInstallContent"), o = e("swx-enums"), u = e("swx-i18n").localization, a = e("constants/calling.resources").pluginInstall, f = e("ui/telemetry/actions/actionNames"), l = e("constants/common"), c = e("services/serviceLocator"), h = function (h) {
      function y() {
        m.changed(w);
      }
      function b() {
        m.changed.off(w);
      }
      function w(e, t) {
        t !== o.callingNotSupportedReasons.PluginNotInstalled && (!h.conversation && !h.suppressEndedEvent && h.onPluginInstallEnded(i.PLUGIN_INSTALL_EXIT_METHOD.PLUGIN_DETECTED, !0), b(), p());
      }
      var p = h.next, d = h.close, v = s.getInstallResources(), m = n.get().personsAndGroupsManager.mePerson.capabilities.audio, g = {
          terms: "pluginInstall_steps_text_termsLink",
          privacy: "pluginInstall_steps_text_privacyLink"
        };
      this.id = t.STEP_ID;
      this.label = u.fetch({ key: "pluginInstall_label_text_download" });
      this.downloadImage = v.images.download;
      this.downloadText = v.text.download;
      this.installImage = v.images.install;
      this.installText = v.text.install;
      this.enjoyImage = v.images.enjoy;
      this.enjoyText = v.text.enjoy;
      h.conversation && h.conversation.audioService.start.enabled.reason === o.callingNotSupportedReasons.PluginNotInstalled && (m = h.conversation.audioService.start.enabled);
      this.show = function () {
        var e = c.resolve(l.serviceLocator.ACTION_TELEMETRY);
        if (m.reason !== o.callingNotSupportedReasons.PluginNotInstalled) {
          b();
          p();
          return;
        }
        y();
        r.downloadPlatformSpecificInstaller();
        e.recordAction(f.audioVideo.pluginInstall.installPlugin);
      };
      this.restartDownload = function () {
        var e = c.resolve(l.serviceLocator.ACTION_TELEMETRY);
        r.downloadPlatformSpecificInstaller();
        e.recordAction(f.audioVideo.pluginInstall.restart);
      };
      this.close = function () {
        b();
        d();
      };
      this.getLink = function (e) {
        var t = g[e], n = u.fetch({ key: t }), r = a[e];
        return r.replace("{" + t + "}", n);
      };
    };
  t.STEP_ID = i.CALLING_SETUP_STEPS.OVERLAY_PLUGIN_STEPS;
  t.build = function (e) {
    return new h(e);
  };
});

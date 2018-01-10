define("ui/viewModels/calling/plugin/downloadStepViewModel", [
  "require",
  "exports",
  "module",
  "swx-cafe-application-instance",
  "services/plugin/pluginDownload",
  "swx-constants",
  "ui/viewModels/calling/helpers/browserInstallContent",
  "swx-enums",
  "swx-i18n",
  "constants/calling.resources",
  "ui/telemetry/actions/actionNames",
  "swx-constants",
  "swx-service-locator-instance"
], function (e, t) {
  var n = e("swx-cafe-application-instance"), r = e("services/plugin/pluginDownload"), i = e("swx-constants").CALLING, s = e("ui/viewModels/calling/helpers/browserInstallContent"), o = e("swx-enums"), u = e("swx-i18n").localization, a = e("constants/calling.resources").pluginInstall, f = e("ui/telemetry/actions/actionNames"), l = e("swx-constants").COMMON, c = e("swx-service-locator-instance").default, h = function (h) {
      function w() {
        m.changed(S);
      }
      function E() {
        m.changed.off(S);
      }
      function S(e, t) {
        t !== o.callingNotSupportedReasons.PluginNotInstalled && (x(), E(), p());
      }
      function x() {
        !h.conversation && !h.suppressEndedEvent && h.onPluginInstallEnded(i.PLUGIN_INSTALL_EXIT_METHOD.PLUGIN_DETECTED, !0);
      }
      function T() {
        g.isPluginInstalled.changed(C);
      }
      function N() {
        g.isPluginInstalled.changed.off(C);
      }
      function C(e) {
        e && (x(), N(), p());
      }
      var p = h.next, d = h.close, v = s.getInstallResources(), m = n.get().personsAndGroupsManager.mePerson.capabilities.audio, g = n.get().devicesManager.mediaCapabilities, y = {
          terms: "pluginInstall_steps_text_termsLink",
          privacy: "pluginInstall_steps_text_privacyLink"
        }, b = c.resolve(l.serviceLocator.FEATURE_FLAGS);
      this.id = t.STEP_ID;
      this.label = u.fetch({ key: "pluginInstall_label_text_download" });
      this.downloadImage = v.images.download;
      this.downloadText = v.text.download;
      this.installImage = v.images.install;
      this.installText = v.text.install;
      this.enjoyImage = v.images.enjoy;
      this.enjoyText = v.text.enjoy;
      this.showAutoUpdateDisclaimer = !b.isFeatureOn(l.featureFlags.USE_BUSINESS_WORDING);
      this.showTermsAndPrivacy = !b.isFeatureOn(l.featureFlags.USE_BUSINESS_WORDING);
      h.conversation && h.conversation.audioService.start.enabled.reason === o.callingNotSupportedReasons.PluginNotInstalled && (m = h.conversation.audioService.start.enabled);
      this.show = function () {
        var e = c.resolve(l.serviceLocator.ACTION_TELEMETRY);
        if (g.isPluginInstalled) {
          if (g.isPluginInstalled()) {
            N();
            p();
            return;
          }
          T();
        } else {
          if (m.reason !== o.callingNotSupportedReasons.PluginNotInstalled) {
            E();
            p();
            return;
          }
          w();
        }
        r.downloadPlatformSpecificInstaller();
        e.recordAction(f.audioVideo.pluginInstall.installPlugin);
      };
      this.restartDownload = function () {
        var e = c.resolve(l.serviceLocator.ACTION_TELEMETRY);
        r.downloadPlatformSpecificInstaller();
        e.recordAction(f.audioVideo.pluginInstall.restart);
      };
      this.close = function () {
        g.isPluginInstalled ? N() : E();
        d();
      };
      this.getLink = function (e) {
        var t = y[e], n = u.fetch({ key: t }), r = a[e];
        return r.replace("{" + t + "}", n);
      };
    };
  t.STEP_ID = i.CALLING_SETUP_STEPS.OVERLAY_PLUGIN_STEPS;
  t.build = function (e) {
    return new h(e);
  };
});

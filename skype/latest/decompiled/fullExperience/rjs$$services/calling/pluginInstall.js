define("services/calling/pluginInstall", [
  "require",
  "exports",
  "module",
  "ui/viewModels/calling/plugin/pluginInstallViewModel",
  "swx-cafe-application-instance",
  "swx-enums",
  "text!views/calling/pluginInstall.html",
  "ui/modalDialog/modalDialog"
], function (e, t) {
  var n = e("ui/viewModels/calling/plugin/pluginInstallViewModel"), r = e("swx-cafe-application-instance"), i = e("swx-enums"), s = e("text!views/calling/pluginInstall.html"), o = e("ui/modalDialog/modalDialog"), u = "overlayPluginSlides";
  t.startInstallFlow = function (t, r) {
    o.isDisplayed() && o.dispose();
    var i = n.build(t, r);
    return o.build(u, i, s), i.start(), i;
  };
  t.isPluginInstalled = function (t, n) {
    var s = r.get().devicesManager.mediaCapabilities;
    if (s.isPluginInstalled)
      return new Promise(function (e) {
        s.isBrowserMediaSupported() || s.isPluginInstalled() ? e(!0) : s.isPluginInstalled.get().finally(function () {
          e(s.isPluginInstalled());
        });
      });
    var o = r.get().personsAndGroupsManager.mePerson.capabilities.audio, u = r.get().personsAndGroupsManager.mePerson.capabilities.video;
    return n ? t.videoService.start.enabled.get().then(function (e) {
      return u.reason !== i.callingNotSupportedReasons.PluginNotInstalled && e;
    }) : t.audioService.start.enabled.get().then(function (e) {
      return o.reason !== i.callingNotSupportedReasons.PluginNotInstalled && e;
    });
  };
});

define("services/calling/pluginInstall", [
  "require",
  "exports",
  "module",
  "ui/viewModels/calling/plugin/pluginInstallViewModel",
  "cafe/applicationInstance",
  "swx-enums",
  "text!views/calling/pluginInstall.html",
  "ui/modalDialog/modalDialog"
], function (e, t) {
  var n = e("ui/viewModels/calling/plugin/pluginInstallViewModel"), r = e("cafe/applicationInstance"), i = e("swx-enums"), s = e("text!views/calling/pluginInstall.html"), o = e("ui/modalDialog/modalDialog"), u = "overlayPluginSlides";
  t.startInstallFlow = function (t, r) {
    var i = n.build(t, r);
    return o.build(u, i, s), i.start(), i;
  };
  t.isPluginInstalled = function (t, n) {
    var s = r.get().personsAndGroupsManager.mePerson.capabilities.audio, o = r.get().personsAndGroupsManager.mePerson.capabilities.video;
    return n ? t.videoService.start.enabled.get().then(function (e) {
      return o.reason !== i.callingNotSupportedReasons.PluginNotInstalled && e;
    }) : t.audioService.start.enabled.get().then(function (e) {
      return s.reason !== i.callingNotSupportedReasons.PluginNotInstalled && e;
    });
  };
});

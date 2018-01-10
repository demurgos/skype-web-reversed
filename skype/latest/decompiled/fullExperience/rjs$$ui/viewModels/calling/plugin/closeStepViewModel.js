define("ui/viewModels/calling/plugin/closeStepViewModel", [
  "require",
  "exports",
  "module",
  "ui/viewModels/calling/helpers/browserInstallContent",
  "swx-constants",
  "ui/telemetry/actions/actionNames",
  "swx-constants",
  "swx-service-locator-instance"
], function (e, t) {
  var n = e("ui/viewModels/calling/helpers/browserInstallContent"), r = e("swx-constants").CALLING, i = e("ui/telemetry/actions/actionNames"), s = e("swx-constants").COMMON, o = e("swx-service-locator-instance").default, u = function (u) {
      var a = u.next, f = u.close, l = n.getInstallResources();
      this.id = t.STEP_ID;
      this.closeScreenImageUrl = l.images.closeScreen;
      this.isFirefox = u.isFirefox;
      this.next = function () {
        var e = o.resolve(s.serviceLocator.ACTION_TELEMETRY);
        a();
        e.recordAction(i.audioVideo.pluginInstall.stayInFlow);
      };
      this.close = function () {
        var e = o.resolve(s.serviceLocator.ACTION_TELEMETRY);
        u.onPluginInstallEnded(r.PLUGIN_INSTALL_EXIT_METHOD.CLOSE, !1);
        f();
        e.recordAction(i.audioVideo.pluginInstall.leave);
      };
    };
  t.STEP_ID = r.CALLING_SETUP_STEPS.CLOSE_CALLING_SETUP;
  t.build = function (e) {
    return new u(e);
  };
});

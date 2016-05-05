define("ui/viewModels/calling/plugin/closeStepViewModel", [
  "require",
  "exports",
  "module",
  "ui/viewModels/calling/helpers/browserInstallContent",
  "constants/calling",
  "ui/telemetry/actions/actionNames",
  "constants/common",
  "services/serviceLocator"
], function (e, t) {
  var n = e("ui/viewModels/calling/helpers/browserInstallContent"), r = e("constants/calling"), i = e("ui/telemetry/actions/actionNames"), s = e("constants/common"), o = e("services/serviceLocator"), u = function (u) {
      var a = u.next, f = u.close, l = n.getInstallResources();
      this.id = t.STEP_ID, this.closeScreenImageUrl = l.images.closeScreen, this.isFirefox = u.isFirefox, this.next = function () {
        var e = o.resolve(s.serviceLocator.ACTION_TELEMETRY);
        a(), e.recordAction(i.audioVideo.pluginInstall.stayInFlow);
      }, this.close = function () {
        var e = o.resolve(s.serviceLocator.ACTION_TELEMETRY);
        u.onPluginInstallEnded(r.PLUGIN_INSTALL_EXIT_METHOD.CLOSE, !1), f(), e.recordAction(i.audioVideo.pluginInstall.leave);
      };
    };
  t.STEP_ID = r.CALLING_SETUP_STEPS.CLOSE_CALLING_SETUP, t.build = function (e) {
    return new u(e);
  };
})

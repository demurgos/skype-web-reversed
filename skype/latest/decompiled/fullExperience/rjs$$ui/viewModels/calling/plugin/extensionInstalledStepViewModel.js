define("ui/viewModels/calling/plugin/extensionInstalledStepViewModel", [
  "require",
  "exports",
  "module",
  "swx-enums",
  "cafe/applicationInstance",
  "constants/calling",
  "ui/viewModels/calling/helpers/browserInstallContent"
], function (e, t) {
  var n = e("swx-enums"), r = e("cafe/applicationInstance"), i = e("constants/calling"), s = e("ui/viewModels/calling/helpers/browserInstallContent"), o = function (i) {
      function f() {
        a.changed(c);
      }
      function l() {
        a.changed.off(c);
      }
      function c(e, t) {
        t !== n.callingNotSupportedReasons.PluginNotInstalled && (l(), o());
      }
      var o = i.next, u = s.getInstallResources(), a = r.get().personsAndGroupsManager.mePerson.capabilities.audio;
      this.id = t.STEP_ID, this.getPluginImageUrl = u.images.extensionInstallPlugin, this.isFirefox = i.isFirefox, this.show = function () {
        a.reason === n.callingNotSupportedReasons.PluginNotInstalled ? f() : o();
      }, this.close = function () {
        l(), i.close();
      }, this.installClick = function () {
        l(), o();
      };
    };
  t.STEP_ID = i.CALLING_SETUP_STEPS.OVERLAY_EXTENSION_INSTALLED, t.build = function (e) {
    return new o(e);
  };
})

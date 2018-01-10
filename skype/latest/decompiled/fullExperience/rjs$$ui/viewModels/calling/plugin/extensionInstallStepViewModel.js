define("ui/viewModels/calling/plugin/extensionInstallStepViewModel", [
  "require",
  "exports",
  "module",
  "browser/chrome",
  "browser/document",
  "experience/settings",
  "swx-constants",
  "ui/viewModels/calling/plugin/extensionInstallHelper",
  "ui/viewModels/calling/helpers/browserInstallContent",
  "ui/telemetry/actions/actionNames",
  "swx-constants",
  "swx-service-locator-instance"
], function (e, t) {
  var n = e("browser/chrome"), r = e("browser/document"), i = e("experience/settings"), s = e("swx-constants").CALLING, o = e("ui/viewModels/calling/plugin/extensionInstallHelper"), u = e("ui/viewModels/calling/helpers/browserInstallContent"), a = e("ui/telemetry/actions/actionNames"), f = e("swx-constants").COMMON, l = e("swx-service-locator-instance").default, c = function (s) {
      function p() {
        m();
        s.next();
      }
      function d() {
        s.nextOnFailed();
      }
      function v() {
        var e = h.buildLinkElement();
        r.head.appendChild(e);
      }
      function m() {
        var e = h.buildContentScriptElement();
        r.head.appendChild(e);
      }
      var c = u.getInstallResources(), h = o.build();
      this.id = t.STEP_ID;
      this.skypeChromeImageUrl = c.images.extensionStart;
      this.isFirefox = s.isFirefox;
      this.show = function () {
        var e = l.resolve(f.serviceLocator.ACTION_TELEMETRY);
        v();
        e.recordAction(a.audioVideo.pluginInstall.installExtension);
      };
      this.close = function () {
        s.close();
      };
      this.installClick = function () {
        try {
          n.webstore.install(i.shellApp.chromeExtensionWebstoreUrl, p, d);
        } catch (e) {
          d();
        }
      };
    };
  t.STEP_ID = s.CALLING_SETUP_STEPS.OVERLAY_EXTENSION_INSTALL;
  t.build = function (e) {
    return new c(e);
  };
});

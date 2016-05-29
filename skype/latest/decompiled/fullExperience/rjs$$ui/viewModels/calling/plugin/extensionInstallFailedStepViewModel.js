define("ui/viewModels/calling/plugin/extensionInstallFailedStepViewModel", [
  "require",
  "exports",
  "module",
  "browser/document",
  "browser/window",
  "experience/settings",
  "constants/calling",
  "ui/viewModels/calling/plugin/extensionInstallHelper",
  "ui/viewModels/calling/helpers/browserInstallContent"
], function (e, t) {
  var n = e("browser/document"), r = e("browser/window"), i = e("experience/settings"), s = e("constants/calling"), o = e("ui/viewModels/calling/plugin/extensionInstallHelper"), u = e("ui/viewModels/calling/helpers/browserInstallContent"), a = function (s) {
      function c() {
        var e = n.querySelector("head"), t = f.buildContentScriptElement();
        t.onload = h;
        t.onerror = e.removeChild.bind(e, t);
        e.appendChild(t);
      }
      function h() {
        r.clearInterval(l);
        s.next();
      }
      var a = u.getInstallResources(), f = o.build(), l;
      this.id = t.STEP_ID;
      this.chromeWebstoreUrl = i.shellApp.chromeExtensionWebstoreUrl;
      this.imageUrl = a.images.extensionInstallFailed;
      this.isFirefox = s.isFirefox;
      this.show = function () {
        l = r.setInterval(c, 1000);
      };
      this.close = function () {
        l && r.clearInterval(l);
        s.close();
      };
    };
  t.STEP_ID = s.CALLING_SETUP_STEPS.OVERLAY_EXTENSION_INSTALL_FAILED;
  t.build = function (e) {
    return new a(e);
  };
});

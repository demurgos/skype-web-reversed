define("ui/viewModels/calling/plugin/extensionInstallHelper", [
  "require",
  "exports",
  "module",
  "browser/document",
  "experience/settings"
], function (e, t) {
  var n = e("browser/document"), r = e("experience/settings"), i = function () {
      this.buildLinkElement = function () {
        var t = n.createElement("link");
        return t.setAttribute("rel", "chrome-webstore-item"), t.setAttribute("href", r.shellApp.chromeExtensionWebstoreUrl), t;
      }, this.buildContentScriptElement = function () {
        var t = n.createElement("script"), i = "chrome-extension://" + r.shellApp.chromeExtensionId + "/content-script.js";
        return t.setAttribute("src", i), t;
      };
    };
  t.build = function () {
    return new i();
  };
})

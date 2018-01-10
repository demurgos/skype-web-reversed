define("services/plugin/pluginDownload", [
  "require",
  "browser/dom",
  "swx-browser-detect",
  "experience/settings"
], function (e) {
  function i() {
    var e;
    n.getSystemInfo().osName === n.OPERATING_SYSTEMS.WINDOWS ? e = r.plugin.download.msi : e = r.plugin.download.pkg;
    s(e);
  }
  function s(e) {
    var n = t.createElement("iframe");
    n.src = e;
    n.width = "0";
    n.height = "0";
    n.style.border = "0";
    n.style.position = "absolute";
    n.style.top = "0";
    n.style.left = "0";
    document.body.appendChild(n);
  }
  var t = e("browser/dom"), n = e("swx-browser-detect").default, r = e("experience/settings");
  return { downloadPlatformSpecificInstaller: i };
});

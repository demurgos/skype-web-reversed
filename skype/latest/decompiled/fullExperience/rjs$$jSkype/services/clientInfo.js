define("jSkype/services/clientInfo", [
  "require",
  "jSkype/settings",
  "browser/detect"
], function (e) {
  function r() {
    var e = n.getSystemInfo(), r = t.settings.lcid || "en-us", i = t.settings.country || "n/a", s = "os=" + e.osName + "; osVer=" + e.osVersion + "; proc=" + e.platform + "; lcid=" + r + ";";
    return s += " deviceType=" + e.deviceType + "; country=" + i + "; clientName=" + t.settings.biAppName + "; clientVer=" + t.settings.uiVersion, s;
  }
  var t = e("jSkype/settings"), n = e("browser/detect");
  return {
    getBIAppName: function () {
      return t.settings.biAppName;
    },
    getBIVersion: function () {
      return t.settings.uiVersion;
    },
    getClientInfo: r
  };
});

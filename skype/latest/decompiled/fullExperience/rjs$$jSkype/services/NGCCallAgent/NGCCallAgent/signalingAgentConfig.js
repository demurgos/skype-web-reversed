define("jSkype/services/NGCCallAgent/NGCCallAgent/signalingAgentConfig", [
  "require",
  "jSkype/client",
  "jSkype/services/clientInfo",
  "browser/detect",
  "jSkype/settings",
  "jSkype/services/NGCCallAgent/NGCCallAgent/utils",
  "jSkype/services/trouter/trouter"
], function (e) {
  function u(e) {
    switch (e) {
    case r.DEVICE_TYPES.DESKTOP:
      return "Desktop";
    case r.DEVICE_TYPES.MOBILE:
      return "Mobile";
    case r.DEVICE_TYPES.TABLET:
      return "Tablet";
    }
  }
  function a(e) {
    var a = this, f = r.getSystemInfo(), l = s.stringContains(n.getBIAppName(), "swx-local") ? "Test/" : "", c = "/os=" + f.osName + "; osVer=" + f.osVersion + "; proc=" + f.platform;
    c += "; deviceType=" + u(f.deviceType) + "; browser=" + r.getBrowserInfo().browserName;
    c += "; browserVer=" + r.getBrowserInfo().browserVersion;
    a.conversationServiceUrl = i.settings.pluginless.conversationServiceUrl;
    a.trouterUrl = o.trouterUrl;
    a.skypeToken = function () {
      return t.get().signInManager._skypeToken();
    };
    a.logger = e;
    a.languageCode = i.settings.initParams.locale;
    a.clientInformation = "Web CallSignalingAgent(PluginLess/" + l + n.getBIVersion() + c + ")";
    a.testCall = l === "" ? !1 : !0;
    a.doHostlessCalling = !1;
    a.shouldServiceSendCallEventMessages = !1;
    a.cloudScreenSharingFlag = "disabled";
  }
  var t = e("jSkype/client"), n = e("jSkype/services/clientInfo"), r = e("browser/detect"), i = e("jSkype/settings"), s = e("jSkype/services/NGCCallAgent/NGCCallAgent/utils"), o = e("jSkype/services/trouter/trouter");
  return a;
});

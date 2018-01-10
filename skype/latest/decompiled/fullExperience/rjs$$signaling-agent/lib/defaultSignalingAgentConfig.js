(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/defaultSignalingAgentConfig", [
      "require",
      "exports",
      "./utilities/utils",
      "./utilities/enums"
    ], e);
}(function (e, t) {
  var n = e("./utilities/utils"), r = e("./utilities/enums"), i = function () {
      function e(e) {
        this.cloudScreenSharingFlag = "recvOnly";
        this.isWebRtcEnabled = typeof RTCIceGatherer == "undefined";
        this.doHostlessCalling = !1;
        this.shouldServiceSendCallEventMessages = !1;
        this.shouldServiceSendNGCUpgradeMessages = !0;
        this.supportsHostlessGroupCalls = !1;
        n.assertNotNull(e.logger, "logger should be a non null value");
        n.assertNotNull(e.httpRequestDispatcher, "httpRequestDispatcher should be a non null value");
        n.assertNotNull(e.telemetryManager, "telemetryManager should be a non null value");
        this.skypeTokenProvider = e.skypeTokenProvider;
        this.logger = e.logger;
        this.httpRequestDispatcher = e.httpRequestDispatcher;
        this.telemetryManager = e.telemetryManager;
        this.browserDetect = e.browserDetect;
        this.conversationServiceUrl = e.conversationServiceUrl;
        this.trouterUrlGetter = e.trouterUrlGetter;
        this.languageCode = e.languageCode;
        this.isGVCOutgoingEnabled = e.isGVCOutgoingEnabled;
        this.isGVCJoiningEnabled = e.isGVCJoiningEnabled;
        this.doHostlessCalling = e.doHostlessCalling;
        this.supportsHostlessGroupCalls = e.supportsHostlessGroupCalls;
        this.shouldServiceSendCallEventMessages = e.shouldServiceSendCallEventMessages;
        var t = e.browserDetect.getSystemInfo(), r = n.stringContains(e.clientInfo.getBIAppName(), "swx-local") ? "Test/" : "", i = "/os=" + t.osName + "; osVer=" + t.osVersion + "; proc=" + t.platform;
        i += "; deviceType=" + this.getDeviceType(t.deviceType) + "; browser=" + this.browserDetect.getBrowserInfo().browserName;
        i += "; browserVer=" + this.browserDetect.getBrowserInfo().browserVersion;
        this.clientInformation = "Web CallSignalingAgent(PluginLess/" + r + e.clientInfo.getBIVersion() + i + ")";
        this.testCall = r === "" ? !1 : !0;
        this.emergencyCallCountry = e.emergencyCallCountry;
      }
      return e.prototype.skypeToken = function () {
        return this.skypeTokenProvider();
      }, e.prototype.getDeviceType = function (e) {
        switch (e) {
        case r.DeviceType.Desktop:
          return "Desktop";
        case r.DeviceType.Mobile:
          return "Mobile";
        case r.DeviceType.Tablet:
          return "Tablet";
        }
        return undefined;
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = i;
}));

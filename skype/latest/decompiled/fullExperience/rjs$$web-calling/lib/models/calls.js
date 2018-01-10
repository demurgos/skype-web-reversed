(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("web-calling/lib/models/calls", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  var n = function () {
    function e(e) {
      this.mediaAgent = e.mediaAgent;
      this.signalingAgent = e.signalingAgent;
      this.browserDetect = e.browserDetect;
      this.featureFlags = e.featureFlags;
      this.telemetryService = e.telemetryService;
      this.telemetryManager = e.telemetryManager;
      this.mdscToken = e.mdscToken;
      this.logger = e.logger;
      this.selectedDevicesProvider = e.selectedDevicesProvider;
    }
    return e;
  }();
  t.__esModule = !0;
  t["default"] = n;
}));

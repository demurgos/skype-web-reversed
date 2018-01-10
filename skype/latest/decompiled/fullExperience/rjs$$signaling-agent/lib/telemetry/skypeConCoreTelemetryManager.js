(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/telemetry/skypeConCoreTelemetryManager", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  var n = function () {
    function e(e, t) {
      this.appTelemetryManager = e;
      this.skypeConcoreToken = t;
    }
    return e.prototype.sendEvent = function (e, t) {
      this.appTelemetryManager.sendEvent(this.skypeConcoreToken, e, t);
    }, e;
  }();
  t.__esModule = !0;
  t["default"] = n;
}));

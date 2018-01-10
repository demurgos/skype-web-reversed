(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("signaling-agent/lib/public", [
      "require",
      "exports",
      "./participant",
      "../lib/utilities/enums",
      "../lib/utilities/constants",
      "../lib/telemetry/telemetryConstants",
      "../lib/incomingNotificationMessageHandler",
      "../lib/defaultSignalingAgentConfig",
      "../lib/signalingAgent",
      "../lib/utilities/httpRequestDispatcher",
      "../lib/telemetry/skypeConCoreTelemetryManager"
    ], e);
}(function (e, t) {
  function c(e) {
    return new n["default"](e);
  }
  var n = e("./participant"), r = e("../lib/utilities/enums");
  t.DeviceType = r.DeviceType;
  var i = e("../lib/utilities/constants");
  t.CA_CONSTANTS = i["default"];
  var s = e("../lib/telemetry/telemetryConstants");
  t.TM_CONSTANTS = s["default"];
  var o = e("../lib/incomingNotificationMessageHandler");
  t.IncomingNotificationMessageHandler = o["default"];
  var u = e("../lib/defaultSignalingAgentConfig");
  t.DefaultSignalingAgentConfig = u["default"];
  var a = e("../lib/signalingAgent");
  t.SignalingAgent = a["default"];
  var f = e("../lib/utilities/httpRequestDispatcher");
  t.HttpRequestDispatcher = f["default"];
  var l = e("../lib/telemetry/skypeConCoreTelemetryManager");
  t.SkypeConCoreTelemetryManager = l["default"];
  t.createParticipant = c;
}));

(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/plugin/mappers/callStateMapper", [
      "require",
      "exports",
      "swx-enums"
    ], e);
}(function (e, t) {
  function i(e) {
    return r[e];
  }
  var n = e("swx-enums"), r = {
      RingingOut: n.callConnectionState.Connecting,
      InProgress: n.callConnectionState.Connected
    };
  t.CALL_STATES = {
    ringingIn: "RingingIn",
    ringingOut: "RingingOut",
    initializing: "Initializing",
    inProgress: "InProgress",
    othersAreLive: "OthersAreLive",
    ringingForMe: "RingingForMe",
    transferring: "Transferring",
    downgraded: "Downgraded",
    onHold: "OnHold",
    inVoiceMail: "InVoiceMail",
    finished: "Finished",
    unknown: "Unknown"
  };
  t.toCafeState = i;
}));

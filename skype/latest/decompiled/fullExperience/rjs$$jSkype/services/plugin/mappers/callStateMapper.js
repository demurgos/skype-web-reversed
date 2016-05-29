define("jSkype/services/plugin/mappers/callStateMapper", [
  "require",
  "exports",
  "module",
  "swx-enums"
], function (e, t) {
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
  t.toCafeState = function (e) {
    return r[e];
  };
});

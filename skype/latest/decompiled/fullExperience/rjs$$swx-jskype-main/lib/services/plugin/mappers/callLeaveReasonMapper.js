(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/plugin/mappers/callLeaveReasonMapper", [
      "require",
      "exports",
      "swx-enums"
    ], e);
}(function (e, t) {
  function i(e) {
    return r[e];
  }
  var n = e("swx-enums"), r = {
      Terminated: n.callDisconnectionReason.Terminated,
      FullSession: n.callDisconnectionReason.FullSession,
      Busy: n.callDisconnectionReason.Busy,
      Refused: n.callDisconnectionReason.Refused,
      Missed: n.callDisconnectionReason.Missed,
      Dropped: n.callDisconnectionReason.Dropped,
      InvalidNumber: n.callDisconnectionReason.InvalidNumber,
      ForbiddenNumber: n.callDisconnectionReason.ForbiddenNumber,
      EmergencyCallDenied: n.callDisconnectionReason.EmergencyCallDenied,
      VoiceMailFailed: n.callDisconnectionReason.VoiceMailFailed,
      TransferFailed: n.callDisconnectionReason.TransferFailed,
      InsufficientFunds: n.callDisconnectionReason.InsufficientFunds,
      Failed: n.callDisconnectionReason.Failed,
      AlreadyEnded: n.callDisconnectionReason.Missed,
      CallerUnreachable: n.callDisconnectionReason.Refused
    };
  t.CALL_LEAVE_REASONS = {
    terminated: "Terminated",
    fullSession: "FullSession",
    busy: "Busy",
    refused: "Refused",
    missed: "Missed",
    dropped: "Dropped",
    invalidNumber: "InvalidNumber",
    forbiddenNumber: "ForbiddenNumber",
    emergencyCallDenied: "EmergencyCallDenied",
    voiceMailFailed: "VoiceMailFailed",
    transferFailed: "TransferFailed",
    insufficientFunds: "InsufficientFunds",
    failed: "Failed",
    alreadyEnded: "AlreadyEnded",
    callerUnreachable: "CallerUnreachable",
    unknown: "Unknown"
  };
  t.toCafeReason = i;
}));

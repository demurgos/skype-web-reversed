(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("swx-jskype-main/lib/services/plugin/participantVoiceState", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  t.__esModule = !0;
  t["default"] = {
    speaking: "Speaking",
    listening: "Listening",
    hold: "OnHold",
    ringing: "Ringing",
    joining: "Joining",
    earlyMedia: "EarlyMedia",
    leaving: "Leaving",
    finished: "Finished"
  };
}));

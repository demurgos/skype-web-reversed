(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/webrtc/webRtcConstants", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  t.__esModule = !0;
  t["default"] = {
    STREAM_ID: {
      audio: "mainAudio",
      video: "mainVideo",
      sharing: "applicationsharingVideo"
    },
    STREAM_ID_DELIMITER: "-"
  };
}));

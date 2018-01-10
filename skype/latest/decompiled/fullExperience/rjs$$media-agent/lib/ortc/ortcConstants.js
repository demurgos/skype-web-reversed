(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/ortc/ortcConstants", [
      "require",
      "exports"
    ], e);
}(function (e, t) {
  var n;
  (function (e) {
    e[e.SSRC_UPDATED = 0] = "SSRC_UPDATED";
    e[e.CODEC_PARAMS_UPDATED = 1] = "CODEC_PARAMS_UPDATED";
  }(n = t.VideoCapabilitiesEventType || (t.VideoCapabilitiesEventType = {})));
  var r;
  (function (e) {
    e[e.Audio = 0] = "Audio";
    e[e.Video = 1] = "Video";
  }(r = t.MediaChannelType || (t.MediaChannelType = {})));
}));

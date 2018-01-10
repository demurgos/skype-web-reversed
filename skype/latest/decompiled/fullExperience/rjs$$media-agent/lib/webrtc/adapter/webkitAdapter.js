(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/webrtc/adapter/webkitAdapter", [
      "require",
      "exports",
      "./webkitPeerConnection",
      "./webkitSessionDescription",
      "./webkitCapabilityGatherer",
      "../transform/webkitSdpTransform"
    ], e);
}(function (e, t) {
  function o(e) {
    var t = i["default"].build(e);
    this.SdpTransform = s["default"].build();
    this.RTCPeerConnection = n["default"].build(t);
    this.RTCRtpReceiver = { getCapabilities: t.gather };
    this.RTCSessionDescription = r["default"].build();
  }
  var n = e("./webkitPeerConnection"), r = e("./webkitSessionDescription"), i = e("./webkitCapabilityGatherer"), s = e("../transform/webkitSdpTransform");
  t.__esModule = !0;
  t["default"] = {
    build: function (e) {
      return new o(e);
    }
  };
}));

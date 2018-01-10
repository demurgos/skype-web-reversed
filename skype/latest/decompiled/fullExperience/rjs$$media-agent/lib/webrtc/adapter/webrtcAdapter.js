(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/webrtc/adapter/webrtcAdapter", [
      "require",
      "exports",
      "./webkitAdapter",
      "./mozAdapter",
      "../../common/userAgentAdapter"
    ], e);
}(function (e, t) {
  function s() {
    function e() {
      throw new Error("unsupported platform");
    }
    this.SdpTransform = e;
    this.RTCPeerConnection = e;
    this.RTCSessionDescription = e;
    this.RTCRtpReceiver = e;
  }
  function o(e, t, n) {
    this.SdpTransform = u;
    this.RTCPeerConnection = e;
    this.RTCSessionDescription = t;
    this.RTCRtpReceiver = n;
  }
  function u() {
    function e(e) {
      return e;
    }
    this.toOffer = e;
    this.toAnswer = e;
    this.toRemote = e;
  }
  function a() {
    return typeof i["default"].window.webkitRTCPeerConnection != "undefined";
  }
  function f() {
    return typeof i["default"].window.mozRTCPeerConnection != "undefined";
  }
  var n = e("./webkitAdapter"), r = e("./mozAdapter"), i = e("../../common/userAgentAdapter");
  t.__esModule = !0;
  t["default"] = {
    build: function (e) {
      return a() ? n["default"].build(e) : f() ? new r["default"](e) : new s();
    }
  };
}));

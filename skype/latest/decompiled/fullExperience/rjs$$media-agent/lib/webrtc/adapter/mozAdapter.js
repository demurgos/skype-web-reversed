(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/webrtc/adapter/mozAdapter", [
      "require",
      "exports",
      "./mozPeerConnection",
      "./mozCapabilityGatherer",
      "../transform/mozSdpTransform",
      "../../common/userAgentAdapter"
    ], e);
}(function (e, t) {
  var n = e("./mozPeerConnection"), r = e("./mozCapabilityGatherer"), i = e("../transform/mozSdpTransform"), s = e("../../common/userAgentAdapter"), o = function () {
      function e(e) {
        this._gatherer = new r["default"](e);
      }
      return e.prototype.getCapabilities = function (e) {
        return this._gatherer.getGatherer()(e);
      }, e;
    }(), u = function () {
      function e(e) {
        this.SdpTransform = i["default"];
        this.RTCPeerConnection = n["default"];
        this.RTCSessionDescription = s["default"].window.RTCSessionDescription;
        this.RTCRtpReceiver = new o(e);
      }
      return e;
    }();
  t.__esModule = !0;
  t["default"] = u;
}));

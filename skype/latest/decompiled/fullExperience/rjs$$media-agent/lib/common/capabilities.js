(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/common/capabilities", [
      "require",
      "exports",
      "./userAgentAdapter"
    ], e);
}(function (e, t) {
  var n = e("./userAgentAdapter"), r = function () {
      function e(e) {
        this.window = n["default"].window;
        this.overrides = this.getCapabilityOverrides(e.settings);
        this.audio = this.getCapability("audio");
        this.video = this.getCapability("video");
        this.screensharing = this.getCapability("screensharing");
      }
      return e.prototype.hasWebRtc = function () {
        return typeof this.window.RTCPeerConnection != "undefined";
      }, e.prototype.hasOrtc = function () {
        return typeof this.window.RTCIceGatherer != "undefined";
      }, e.prototype.hasMediaCapture = function () {
        return !!this.window.navigator.getUserMedia;
      }, e.prototype.getCapabilityOverrides = function (e) {
        var t;
        return e.capabilities && (this.hasOrtc() ? t = e.capabilities.ortc : this.hasWebRtc() && (t = e.capabilities.webrtc)), t || {};
      }, e.prototype.getCapability = function (e) {
        return typeof this.overrides[e] != "undefined" ? !!this.overrides[e] : this.hasMediaCapture() && (this.hasOrtc() || this.hasWebRtc());
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = {
    build: function (e) {
      return new r(e);
    }
  };
}));

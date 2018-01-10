(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/webrtc/adapter/mozCapabilityGatherer", [
      "require",
      "exports",
      "microsoft-sdp-transform",
      "../../common/userAgentAdapter"
    ], e);
}(function (e, t) {
  var n = e("microsoft-sdp-transform"), r = e("../../common/userAgentAdapter"), i = function () {
      function e(e) {
        this.selfGlobal = e.global.mozCapabilityGatherer = e.global.mozCapabilityGatherer || {};
        this.getGatherer()("video");
      }
      return e.prototype.getGatherer = function () {
        var e = this;
        return function (t) {
          return "video" !== t && "audio" !== t ? Promise.reject(new Error("capabilities for " + t + " are not supported")) : (e.selfGlobal.gatherTask || (e.selfGlobal.gatherTask = new Promise(function (t, i) {
            var s = new r["default"].window.RTCPeerConnection(null);
            s.createOffer(function (e) {
              var r = {}, i = n.parse(e.sdp);
              return i.media.forEach(function (e) {
                r[e.type] = e.rtp.map(function (e) {
                  return { mimeType: e.codec.toLowerCase() };
                });
              }), s.close(), t(r);
            }, function (t) {
              e.selfGlobal.gatherTask = null;
              s.close();
              i(t);
            }, {
              offerToReceiveVideo: 1,
              offerToReceiveAudio: 1
            });
          })), e.selfGlobal.gatherTask.then(function (e) {
            return { codecs: e[t] };
          }));
        };
      }, e;
    }();
  t.__esModule = !0;
  t["default"] = i;
}));

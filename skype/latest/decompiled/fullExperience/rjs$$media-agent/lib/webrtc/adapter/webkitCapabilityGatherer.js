(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/webrtc/adapter/webkitCapabilityGatherer", [
      "require",
      "exports",
      "microsoft-sdp-transform",
      "../../common/userAgentAdapter"
    ], e);
}(function (e, t) {
  function i(e) {
    var t = this, i = r["default"].window.webkitRTCPeerConnection, s;
    this.gather = function (e) {
      return "video" !== e && "audio" !== e ? Promise.reject(new Error("capabilities for " + e + " are not supported")) : (s.gatherTask || (s.gatherTask = new Promise(function (e, t) {
        var r = new i(null);
        r.createOffer(function (t) {
          var i = {}, s = n.parse(t.sdp);
          return s.media.forEach(function (e) {
            i[e.type] = e.rtp.map(function (e) {
              return { mimeType: e.codec.toLowerCase() };
            });
          }), r.close(), e(i);
        }, function (e) {
          s.gatherTask = null;
          r.close();
          t(e);
        }, {
          offerToReceiveVideo: 1,
          offerToReceiveAudio: 1
        });
      })), s.gatherTask.then(function (t) {
        return { codecs: t[e] };
      }));
    };
    (function () {
      s = e.global.webkitCapabilityGatherer = e.global.webkitCapabilityGatherer || {};
      t.gather("video");
    }());
  }
  var n = e("microsoft-sdp-transform"), r = e("../../common/userAgentAdapter");
  t.__esModule = !0;
  t["default"] = {
    build: function (e) {
      return new i(e);
    }
  };
}));

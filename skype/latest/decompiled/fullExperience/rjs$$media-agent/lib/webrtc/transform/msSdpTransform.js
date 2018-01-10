(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/webrtc/transform/msSdpTransform", [
      "require",
      "exports",
      "./candidateTransform",
      "./streamTransform",
      "./rtcpTransform",
      "../../helper",
      "../../common/userAgentAdapter",
      "../../constants"
    ], e);
}(function (e, t) {
  function l(e) {
    function v(e, n) {
      return e.msidSemantic = {
        semantic: "WMS",
        token: "*"
      }, e.media.forEach(function (r) {
        r.protocol = f.rtpSavp;
        r.label = r.label || b(r.type);
        if (r.port === 0) {
          for (var i in r)
            r.hasOwnProperty(i) && [
              "type",
              "port",
              "protocol",
              "payloads"
            ].indexOf(i) < 0 && delete r[i];
          r.payloads = 34;
        }
        p.toMsSdp(r);
        r.crypto && r.crypto.forEach(function (e) {
          e.config += "|2^31";
        });
        r.port !== 0 && e.fingerprint && (r.fingerprint = e.fingerprint);
        h.toMsSdp(r, e);
        d.toMsSdp(r, e, n);
        r.invalid && (t.error("Unknown SDP attributes!", r.invalid), delete r.invalid);
        g(r, !1);
        r.port !== 0 && (r.type === u["default"].MEDIA_TYPE.audio && l.webrtcAudioChannelSignalingFeedback ? r.signalingFbXMessage = {
          payload: "*",
          param: l.webrtcAudioChannelSignalingFeedback
        } : r.type === u["default"].MEDIA_TYPE.video && l.webrtcVideoChannelSignalingFeedback && (r.signalingFbXMessage = {
          payload: "*",
          param: l.webrtcVideoChannelSignalingFeedback
        }));
      }), delete e.fingerprint, e;
    }
    function m(e, t) {
      var n = s["default"].getSrtpInfo(e);
      for (var r = e.media.length - 1; r >= 0; --r) {
        var i = e.media[r];
        if (i.ssrcs && i.ssrcs[0] || i.xSsrcRange)
          e.msidSemantic = {
            semantic: "WMS",
            token: "*"
          };
        i.protocol = f.udpTlsRtpSavpf;
        if (!n.dtls || n.sdes && l.preferSdesSrtp)
          i.protocol = f.rtpSavpf;
        if (i.port === 0) {
          i.direction || (i.direction = "inactive");
          continue;
        }
        p.fromMsSdp(i);
        delete i.cryptoscale;
        i.fingerprint && y(t) && (i.setup = "actpass");
        if (i.crypto)
          for (var o = i.crypto.length - 1; o >= 0; --o) {
            var u = i.crypto[o];
            if (u.config.match(/.*\|\d+:\d+/)) {
              i.crypto.splice(o, 1);
              continue;
            }
            u.config = u.config.replace(/(.*)\|2\^\d+/, "$1");
          }
        i.remoteCandidates && (delete i.candidates, delete i.xCandidatesIpv6, delete i.remoteCandidates);
        h.fromMsSdp(i);
        i.rtcpFbXMessage && delete i.rtcpFbXMessage;
        g(i, !0);
      }
      return e;
    }
    function g(e, t) {
      var n = [{
          name: "http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time",
          encoded: "http:\\\\www.webrtc.org\\experiments\\rtp-hdrext\\abs-send-time"
        }];
      e.ext && e.ext.forEach(function (e) {
        n.some(function (n) {
          var r = t ? n.encoded : n.name, i = t ? n.name : n.encoded;
          return r === e.uri ? (e.uri = i, !0) : !1;
        });
      });
    }
    function y(e) {
      return "offer" === e.type;
    }
    function b(e) {
      return a.hasOwnProperty(e) && a[e] || "undefined";
    }
    this.toMsSdp = v;
    this.fromMsSdp = m;
    var t = e.logger, l = e.settings, c = o["default"].window, h = n["default"].build(), p = r["default"].build(), d = i["default"].build();
  }
  var n = e("./candidateTransform"), r = e("./streamTransform"), i = e("./rtcpTransform"), s = e("../../helper"), o = e("../../common/userAgentAdapter"), u = e("../../constants"), a = {
      audio: "main-audio",
      video: "main-video"
    }, f = {
      udpTlsRtpSavpf: "UDP/TLS/RTP/SAVPF",
      rtpSavpf: "RTP/SAVPF",
      rtpSavp: "RTP/SAVP"
    };
  t.__esModule = !0;
  t["default"] = l;
}));

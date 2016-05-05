define("jSkype/services/mediaAgent/msSdpTransform", ["./userAgentAdapter"], function (e) {
  function n(n) {
    function o(e, t) {
      return l(e), e.media.forEach(function (n) {
        var i;
        n.protocol = "RTP/SAVP", n.label = p(n.type);
        if (n.port === 0) {
          for (var o in n)
            n.hasOwnProperty(o) && [
              "type",
              "port",
              "protocol",
              "payloads"
            ].indexOf(o) < 0 && delete n[o];
          n.payloads = 34;
        }
        n.ssrcs && n.ssrcs[0] && (n.xSsrcRange = {
          ssrcMin: n.ssrcs[0].id,
          ssrcMax: n.ssrcs[0].id
        }), d(n.direction) || delete n.ssrcs;
        if (n.ext)
          for (i = n.ext.length - 1; i >= 0; --i)
            n.ext[i].uri === "http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time" && n.ext.splice(i, 1);
        n.crypto && n.crypto.forEach(function (e) {
          e.config += "|2^31";
        }), n.port !== 0 && e.fingerprint && (n.fingerprint = e.fingerprint), n.fingerprint && h(t) && delete n.setup;
        if (n.candidates) {
          for (i = n.candidates.length - 1; i >= 0; --i) {
            var u = n.candidates[i], f = !1;
            for (var l = i - 1; l >= 0; --l)
              if (n.candidates[i].foundation === n.candidates[l].foundation && n.candidates[i].component === n.candidates[l].component) {
                n.candidates.splice(i, 1), f = !0;
                break;
              }
            if (f)
              continue;
            if (u.ip.indexOf(":") !== -1)
              continue;
          }
          n.candidates.sort(function (e, t) {
            return e.foundation === t.foundation ? e.component - t.component : e.foundation - t.foundation;
          });
        }
        n.rtcp && n.rtcpMux && (h(t) || delete n.rtcp), n.rtcpFb && (n.rtcpRsize = !0), n.invalid && (r.error("Unknown SDP attributes!", n.invalid), delete n.invalid), s.navigator.webkitGetUserMedia && a(n, !1);
      }), delete e.fingerprint, delete e.groups, e;
    }
    function u(e, t) {
      f(e);
      var n = v(e) ? "UDP/TLS/RTP/SAVPF" : "RTP/SAVPF";
      for (var r = e.media.length - 1; r >= 0; --r) {
        var i = e.media[r];
        i.protocol = n;
        if (i.port === 0) {
          i.direction || (i.direction = "inactive");
          continue;
        }
        !i.ssrcs && i.xSsrcRange && d(i.direction) && (i.ssrcs = [], i.ssrcs.push({
          attribute: "cname",
          id: i.xSsrcRange.ssrcMin,
          value: "ZXVf3drwG3fT+Wh5"
        }), i.ssrcs.push({
          attribute: "msid",
          id: i.xSsrcRange.ssrcMin,
          value: i.type === "audio" ? "esGl63EerPyTHNZK4HwO9DwHSgurO6Hjy1kF e031115a-4177-4830-bc2a-1fe17a418c07" : "esGl63EerPyTHNZK4HwO9DwHSgurO6Hjy1kF e031115a-4177-4830-bc2a-1fe17a418c08"
        })), delete i.cryptoscale, i.fingerprint && h(t) && (i.setup = "actpass");
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
        if (i.candidates)
          for (var l = i.candidates.length - 1; l >= 0; --l) {
            var c = i.candidates[l];
            c.transport.match(/tcp-/i) && (c.transport = "tcp");
          }
        if (i.xCandidatesIpv6) {
          i.candidates = i.candidates || [];
          for (var p = 0; p < i.xCandidatesIpv6.length; ++p)
            i.candidates.push(i.xCandidatesIpv6[p]);
          delete i.xCandidatesIpv6;
        }
        i.rtcpFbXMessage && (i.rtcpFb = i.rtcpFb || [], i.rtcpFbXMessage.forEach(function (e) {
          e.param.match(/recv:[\S]*x-pli/) && i.rtcpFb.push({
            payload: e.payload,
            type: "nack",
            subtype: "pli"
          });
        }), delete i.rtcpFbXMessage), s.navigator.webkitGetUserMedia && a(i, !0);
      }
      return e;
    }
    function a(e, t) {
      if ("audio" === e.type)
        t && c(e, {
          codec: "g722",
          rate: 8000,
          encoding: 2
        }), c(e, {
          codec: "cn",
          rate: 16000
        }), c(e, {
          codec: "telephone-event",
          rate: 8000
        });
      else if ("video" === e.type && t && !i.chromeAllowIncomingMSVideo && e.port !== 0) {
        var n = !1;
        e.rtp.forEach(function (e) {
          e.codec.toLowerCase().indexOf("x-h264uc") !== -1 && (n = !0);
        }), n && (e.port = 0);
      }
    }
    function f(e) {
      var t, r;
      n.remoteMedia = [], e.media = e.media.filter(function (e) {
        return n.remoteMedia.push({ type: e.type }), "audio" === e.type && !t && (t = !0) || "video" === e.type && !r && (r = !0);
      });
    }
    function l(e) {
      if (n.remoteMedia && n.remoteMedia.length > e.media.length) {
        var t = [], r = 0;
        n.remoteMedia.forEach(function (n) {
          e.media[r] && e.media[r].type === n.type ? t.push(e.media[r++]) : t.push({
            type: n.type,
            port: 0
          });
        }), e.media = t;
      }
    }
    function c(e, t) {
      var n = -1;
      e.rtp.forEach(function (e, r) {
        t.codec === e.codec.toLowerCase() && t.rate === e.rate && t.encoding === e.encoding && (n = r);
      });
      if (n >= 0 && e.rtp.length > 1) {
        var r = e.rtp[n].payload;
        e.rtp.splice(n, 1), e.payloads = e.payloads.split(" ").filter(function (e) {
          return r !== +e;
        }).join(" "), e.fmtp = e.fmtp.filter(function (e) {
          return r !== e.payload;
        });
      }
    }
    function h(e) {
      return "offer" === e.type;
    }
    function p(e) {
      return t.hasOwnProperty(e) && t[e] || "undefined";
    }
    function d(e) {
      return !e || e.toLowerCase() === "sendonly" || e.toLowerCase() === "sendrecv";
    }
    function v(e) {
      return e.media.some(function (e) {
        return !!e.fingerprint;
      }) || !!e.fingerprint;
    }
    this.toMsSdp = o, this.fromMsSdp = u;
    var r = n.logger, i = n.settings, s = e.window;
  }
  var t = {
    audio: "main-audio",
    video: "main-video"
  };
  return n;
})

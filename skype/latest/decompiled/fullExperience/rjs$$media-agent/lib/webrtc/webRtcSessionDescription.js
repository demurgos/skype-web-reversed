(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/webrtc/webRtcSessionDescription", [
      "require",
      "exports",
      "microsoft-sdp-transform",
      "../constants",
      "../helper",
      "./transform/msSdpTransform",
      "../common/formatParameters",
      "./sessionDescriptorUtils"
    ], e);
}(function (e, t) {
  function a(e, t, a, f) {
    function b(e) {
      e.media.forEach(function (e, t) {
        var n = p.getMediaEntity(t);
        if (n.getType() !== r["default"].MEDIA_TYPE.video)
          return;
        return u["default"].forCodec(e, {
          name: "h264",
          rate: 90000
        }, function (e) {
          var t = n.getVideoCapabilities();
          if (!t)
            return;
          e.fmtp = e.fmtp || { payload: e.rtp.payload };
          var r = o["default"].build(e.fmtp.config);
          r.setIfMissing("max-fs", t.getMaxFS());
          r.setIfMissing("max-fps", t.getMaxFPS());
          e.fmtp.config = r.toString();
        }), !0;
      });
    }
    function w(e, t) {
      return e.some(function (e) {
        return e.settings.indexOf(t) !== -1;
      });
    }
    function E() {
      t === "answer" && m.groups && (e.bundled = !0);
    }
    var l = e.settings, p = e.mediaManager, d = e.sdpTransform, v = e.logger, m = n.parse(a), g = new s["default"](e), y;
    this.getModalities = function () {
      return y || u["default"].getModalities(m);
    };
    this.updateModalities = function (e) {
      y = e;
    };
    this.getSrtpInfo = function () {
      return i["default"].getSrtpInfo(m);
    };
    this.getVideoCodecs = function () {
      var e = [];
      return m.media.forEach(function (t) {
        t.type === "video" && (e = t.rtp.map(function (e) {
          return e.codec.toLowerCase();
        }));
      }), e;
    };
    this.usePrimaryAudioCodecOnly = function (e) {
      var t = [
        "cn",
        "telephone-event"
      ];
      m.media.forEach(function (n) {
        if (n.type === r["default"].MEDIA_TYPE.audio) {
          var i = n.rtp.filter(function (n) {
            return e.indexOf(n.codec.toLowerCase()) !== -1 && t.indexOf(n.codec.toLowerCase()) === -1;
          });
          if (i.length === 0)
            throw new Error("there is no matching primary audio codec");
          var s = n.rtp.filter(function (e) {
            return e !== i[0] && t.indexOf(e.codec.toLowerCase()) === -1;
          });
          s.forEach(function (e) {
            u["default"].removeCodec(n, e);
          });
        }
      });
    };
    this.isCodecSwitchSupported = function () {
      return !m.media.some(function (e) {
        return e.type === r["default"].MEDIA_TYPE.audio && e.xMediaSettings && w(e.xMediaSettings, "codecswitchunsupported");
      });
    };
    this.toLocal = function () {
      return m = d.toLocal(m, p, y), n.write(m);
    };
    this.toOffer = function () {
      return h(m, function (e, t) {
        c(l, t);
      }), p.isEmpty() && p.fromOffer(m, y), p.syncModalities(y, !1), m = d.toOffer(m, p, y), l.disableMsSdp || g.toMsSdp(m, { type: t }), b(m), y = u["default"].getModalities(m), n.write(m);
    };
    this.toAnswer = function () {
      return h(m, function (e, t) {
        c(l, t);
      }), p.syncModalities(y, !0), m = d.toAnswer(m, p, y), l.disableMsSdp || g.toMsSdp(m, { type: t }), b(m), y = u["default"].getModalities(m), n.write(m);
    };
    this.toRemote = function (e) {
      return y = e, p.fromRemote(m, y), m = d.toRemote(m, p, y), n.write(m);
    };
    this.getVideoRecvCapabilities = function () {
      var e = {};
      return m.media.filter(function (e) {
        return e.type === "video";
      }).some(function (t) {
        return u["default"].forCodec(t, {
          name: "h264",
          rate: 90000
        }, function (t) {
          if (t.fmtp) {
            var n = o["default"].build(t.fmtp.config), r = n.get("max-fs");
            !isNaN(r) && r && (e.maxFS = +r);
            var i = n.get("max-fps");
            !isNaN(i) && i && (e.maxFPS = +i / 100);
          }
        }), !0;
      }), e;
    };
    this.needToWaitIceCandidates = function () {
      if (e.bundled) {
        var t = u["default"].getBundle(m);
        return t && t.port === 9;
      }
      return m.media.some(function (e) {
        return e.port === 9;
      });
    };
    (function () {
      f && !l.disableMsSdp && g.fromMsSdp(m, { type: t });
      E();
    }());
  }
  function f(e, t, r, i) {
    var o = e.settings, u = new s["default"](e), a = n.parse(r);
    return h(a, function (e, t) {
      t.port !== 0 && !i[e] && l(t);
      t.direction = "inactive";
      c(o, t);
    }), o.disableMsSdp || u.toMsSdp(a, { type: t }), n.write(a);
  }
  function l(e) {
    e.port = 0;
    for (var t in e)
      e.hasOwnProperty(t) && [
        "type",
        "port",
        "protocol",
        "payloads",
        "connection",
        "direction"
      ].indexOf(t) < 0 && (delete e[t], e.direction = "inactive");
  }
  function c(e, t) {
    t.candidates && (e.iceCandidateType || e.iceCandidateTransport) && (t.candidates = t.candidates.filter(function (t) {
      var n = !0, r = !0;
      return e.iceCandidateType && (n = t.type.match(new RegExp(e.iceCandidateType), "i")), e.iceCandidateTransport && (r = t.transport.match(new RegExp(e.iceCandidateTransport, "i"))), n && r;
    }));
  }
  function h(e, t) {
    for (var n = 0; n < e.media.length; n++)
      e.media[n].type === "audio" ? t(r["default"].MEDIA_TYPE.audio, e.media[n]) : e.media[n].type === "video" && t(r["default"].MEDIA_TYPE.video, e.media[n]);
  }
  var n = e("microsoft-sdp-transform"), r = e("../constants"), i = e("../helper"), s = e("./transform/msSdpTransform"), o = e("../common/formatParameters"), u = e("./sessionDescriptorUtils");
  t.__esModule = !0;
  t["default"] = {
    build: function (e) {
      return e = e || {}, {
        createLocalOffer: function (t) {
          return new a(e, "offer", t);
        },
        createRemoteOffer: function (t) {
          return new a(e, "offer", t, !0);
        },
        createLocalAnswer: function (t) {
          return new a(e, "answer", t);
        },
        createRemoteAnswer: function (t) {
          return new a(e, "answer", t, !0);
        },
        createInactiveOfferSdp: f.bind(null, e, "offer"),
        createInactiveAnswerSdp: f.bind(null, e, "answer")
      };
    }
  };
}));

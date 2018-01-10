(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/webrtc/adapter/webkitPeerConnection", [
      "require",
      "exports",
      "microsoft-sdp-transform",
      "../sessionDescriptorUtils",
      "../../common/formatParameters",
      "./webkitSessionDescription",
      "../../common/userAgentAdapter",
      "../../common/utils"
    ], e);
}(function (e, t) {
  function f(e) {
    function p(e, n) {
      t[1] && t[1][e] && (t[1][n] = t[1][e]);
    }
    function d() {
      v();
      w();
      b();
      E();
      y();
      g();
    }
    function v() {
      [
        {
          name: "createOffer",
          reverseArgs: !0
        },
        "createAnswer",
        "setRemoteDescription",
        "setLocalDescription"
      ].forEach(function (e) {
        var t = e.name || e, n = f[t];
        f[t] = function () {
          var t = arguments;
          return new Promise(function (r, i) {
            var s = [
              r,
              i
            ];
            t.length > 0 && s.splice(e.reverseArgs ? s.length : 0, 0, t[0]);
            n.apply(f, s);
          });
        };
      });
    }
    function m(e, t) {
      var n;
      Object.defineProperty(this, "dtmf", {
        get: function () {
          return "audio" === e.kind ? (n = n || f.createDTMFSender(e), n) : null;
        }
      });
      this.track = e;
      this._stream = t;
    }
    function g() {
      if (f.getSenders && f.addTrack && f.removeTrack)
        return;
      f.getSenders = function () {
        return h.slice();
      };
      f.addTrack = function (e, t) {
        if (!e || !t)
          throw new Error("both media track and stream need to be provided");
        var n = f.getLocalStreams().some(function (e) {
          return e.id === t.id;
        });
        n || f.addStream(t);
        var r = u["default"].find(h, function (t) {
          return t.track.id === e.id;
        });
        return r || (r = new m(e, t), h.push(r)), r;
      };
      f.removeTrack = function (e) {
        f.getLocalStreams().filter(function (t) {
          return t.id === e._stream.id;
        }).forEach(function (e) {
          e.getTracks().forEach(function (e) {
            e.stop();
          });
          f.removeStream(e);
        });
        u["default"].remove(h, function (t) {
          return t === e;
        });
      };
    }
    function y() {
      var e = f.createOffer;
      f.createOffer = function (t) {
        var i = arguments;
        return t && t.offerToReceiveVideo > 1 && (t.offerToReceiveVideo = 1), e.apply(f, i).then(function (e) {
          var t = n.parse(e.sdp);
          return t.media.filter(function (e) {
            return e.type == "audio";
          }).forEach(function (e) {
            r["default"].removeCodec(e, {
              codec: "CN",
              rate: 16000
            });
          }), new c({
            type: e.type,
            sdp: n.write(t)
          });
        });
      };
    }
    function b() {
      var e = f.setLocalDescription;
      f.setLocalDescription = function (t) {
        var r = function () {
          if (!l || !f.remoteDescription)
            return Promise.reject(new Error("rollback requires having both remote and local descriptions set"));
          var t = n.parse(f.remoteDescription.sdp), r = n.parse(l.sdp);
          t.media.forEach(function (e, t) {
            x(e) && (r.media[t] && r.media[t].setup && r.media[t].setup !== "actpass" && (e.setup = r.media[t].setup === "active" ? "passive" : "active"), e.crypto && delete e.crypto);
          });
          var i = new c({
            type: "answer",
            sdp: n.write(t)
          });
          return r.media.forEach(function (e) {
            e.setup && (e.setup = "actpass");
          }), e(new c({
            type: l.type,
            sdp: n.write(r)
          })).then(function () {
            return f.setRemoteDescription(i);
          });
        };
        return "rollback" === t.type ? "have-local-offer" === f.signalingState ? r() : Promise.reject(new Error("rollback is supported only from have-local-offer state")) : ("stable" === f.signalingState && f.localDescription && (l = new c({
          type: "offer",
          sdp: f.localDescription.sdp
        })), e(t));
      };
    }
    function w() {
      [
        "createOffer",
        "createAnswer",
        "setLocalDescription"
      ].forEach(function (t) {
        var n = f[t];
        f[t] = function () {
          var t = arguments;
          return e.gather("video").then(function () {
            return n.apply(n, t);
          });
        };
      });
      var t = f.setRemoteDescription;
      f.setRemoteDescription = function (i) {
        return e.gather("video").then(function (e) {
          var s = e.codecs, o = n.parse(i.sdp);
          return o.media.forEach(function (e) {
            if ("video" === e.type) {
              var t = e.rtp.some(function (e) {
                return s.some(function (t) {
                  return e.codec.toLowerCase() === t.mimeType;
                });
              });
              t ? S(e) : e.port = 0;
            }
            if (!x(e)) {
              var n = r["default"].getBundle(o);
              n ? e.crypto = n.crypto : e.port || o.media.some(function (t) {
                return t.port ? (e.crypto = t.crypto, !0) : !1;
              });
            }
          }), i.sdp = n.write(o), t(i);
        });
      };
    }
    function E() {
      var e = f.createAnswer;
      f.createAnswer = function () {
        var t = arguments;
        return e.apply(f, t).then(function (e) {
          if (!f.localDescription || !f.localDescription.sdp)
            return e;
          var t = n.parse(f.localDescription.sdp), i = [];
          t.media.forEach(function (e) {
            a.forEach(function (t) {
              r["default"].forCodec(e, t, function (e) {
                i.push(e);
              });
            });
          });
          if (i.length) {
            var s = n.parse(e.sdp), o = !1;
            s.media.forEach(function (e) {
              i.forEach(function (t) {
                r["default"].forCodec(e, {
                  name: t.rtp.codec,
                  rate: t.rtp.rate
                }, function (e) {
                  e.rtp.payload !== t.rtp.payload && (e.rtp.payload = t.rtp.payload, o = !0);
                });
              });
            });
            o && (e = new c({
              type: e.type,
              sdp: n.write(s)
            }));
          }
          return e;
        });
      };
    }
    function S(e) {
      r["default"].forCodec(e, {
        name: "h264",
        rate: 90000
      }, function (e) {
        if (e.fmtp) {
          var t = i["default"].build(), n = i["default"].build(e.fmtp.config);
          [
            "level-asymmetry-allowed",
            "packetization-mode",
            "profile-level-id"
          ].forEach(function (e) {
            n.contains(e) && t.setIfMissing(e, n.get(e));
          });
          e.fmtp.config = t.toString();
        }
      });
    }
    function x(e) {
      return "RTP/SAVPF" !== e.protocol;
    }
    var t, f, l, c, h = [];
    return c = s["default"].build(), t = [].slice.apply(arguments), t.splice(0, 1, null), p("iceTransportPolicy", "iceTransports"), f = new (Function.prototype.bind.apply(o["default"].window.webkitRTCPeerConnection, t))(), d(), f;
  }
  var n = e("microsoft-sdp-transform"), r = e("../sessionDescriptorUtils"), i = e("../../common/formatParameters"), s = e("./webkitSessionDescription"), o = e("../../common/userAgentAdapter"), u = e("../../common/utils"), a = [
      {
        name: "telephone-event",
        rate: 8000
      },
      {
        name: "cn",
        rate: 16000
      }
    ];
  t.__esModule = !0;
  t["default"] = {
    build: function (e) {
      return f.bind(null, e);
    }
  };
}));

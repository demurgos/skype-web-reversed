define("jSkype/services/mediaAgent/webRtcSession", [
  "./constants",
  "./helper",
  "./webRtcSessionDescription",
  "./adapter/webrtcAdapter",
  "./statistics/webrtcStatistics",
  "./userAgentAdapter"
], function (e, t, n, r, i) {
  var s = function (s, o) {
    function P(e) {
      f.error("Media error occurred", "type:", e.type, "detail:", e.detail), u.onSessionErrorOccurred && u.onSessionErrorOccurred(e);
    }
    function H(e) {
      d = e, y.forEach(function (e) {
        e._updateStream();
      });
    }
    function B(e) {
      !!d && e === d && (d = null, y.forEach(function (e) {
        e._updateStream();
      }));
    }
    function j() {
      y.forEach(function (e) {
        e._unsubscribeIfSubscribed();
      });
    }
    function F(e) {
      m ? window.detachMediaStream(m) : (m = document.createElement("audio"), document.body.appendChild(m), m.autoplay = !0, m.addEventListener("error", function () {
        f.error("_audio.onerror", "error:", m ? m.error : "<no audio element>");
      })), window.attachMediaStream(m, e), v = e;
    }
    function I(e) {
      !!v && e === v && (m && (document.body.removeChild(m), window.detachMediaStream(m), m = null), v = null);
    }
    function q(e) {
      x = e, M.setNegotiatedModalities(e);
    }
    function R() {
      f.log("reset candidate gathering"), b.promise.then(function () {
      }, function () {
      }), b.reject(new Error("reset candidate gathering")), b = t.defer();
    }
    function U() {
      b.resolve();
    }
    function z() {
      f.log("reset peer connection"), B(d), I(v), h && h.close(), g && (g.dispose(), g = null), h = null, p = null, R(), w = !0, x = {};
    }
    function W() {
      O = setTimeout(function () {
        f.error("ice disconnected for ", A, "ms. Raise CONSTANTS.MEDIA_ERROR.iceConnectionError"), P({
          type: e.MEDIA_ERROR.iceConnectionError,
          detail: "ice transport disconnected"
        });
      }, A);
    }
    function X() {
      O && (clearTimeout(O), O = null);
    }
    function V(e) {
      return e.reduce(function (e, t) {
        return t.addresses.map(function (n) {
          function r(e, r) {
            return {
              urls: t.type + ":" + n + ":" + e + (r ? "?transport=" + r : ""),
              credential: t.password,
              username: t.username
            };
          }
          t.udpPort === t.tcpPort ? e.push(r(t.udpPort)) : (e.push(r(t.udpPort, "udp")), e.push(r(t.tcpPort, "tcp")));
        }), e;
      }, []);
    }
    function $() {
      return p || (p = s.maContext.getRelayManager().queryRelaysAsync("turn", s.config.isRemoteClientLync).then(function (t) {
        var n = {};
        f.log("create peer connection"), a.sdes && S && !S.hasDtls() && (f.log("configuring peer connection to use SDES"), n.optional = [{ DtlsSrtpKeyAgreement: !1 }], M.setSdesSrtp(!0)), h = new RTCPeerConnection({ iceServers: V(t) }, n), M.setPeerConnection(h), h.onnegotiationneeded = function (e) {
          var t = e.target;
          f.log("onnegotiationneeded", "signalingState:", t.signalingState);
        }, h.onsignalingstatechange = function (e) {
          var t = e.target;
          f.log("onsignalingstatechange", "signalingState:", t.signalingState);
        }, h.onaddstream = function (e) {
          f.log("onaddstream", "stream:", e.stream), e.stream.getAudioTracks().length > 0 && F(e.stream), e.stream.getVideoTracks().length > 0 && H(e.stream);
        }, h.ontrack = function (e) {
          f.log("ontrack", "track:", e.track);
        }, h.onremovestream = function (e) {
          f.log("onremovestream", "stream:", e.stream), B(e.stream), I(e.stream);
        }, h.onicecandidate = function (e) {
          f.log("onicecandidate", "candidate:", e.candidate), e.candidate || U();
        }, h.onicegatheringstatechange = function (e) {
          var t = e.target;
          f.log("onicegatheringstatechange", "iceGatheringState:", t.iceGatheringState);
        }, h.oniceconnectionstatechange = function (t) {
          var n = t.target;
          f.log("oniceconnectionstatechange", "iceConnectionState:", n.iceConnectionState, "pc.signalingState:", n.signalingState), n.iceConnectionState === "failed" && P({
            type: e.MEDIA_ERROR.iceConnectionError,
            detail: "ice transport failed"
          }), n.iceConnectionState === "disconnected" ? W() : X();
        };
      })), p;
    }
    function J(e) {
      if (!N)
        throw new Error(e);
    }
    function K(e) {
      function n(e) {
        return !!e && (t.hasReceiveDirectionality(e) || e === "inactive");
      }
      return {
        offerToReceiveAudio: n(e.audio) ? 1 : 0,
        offerToReceiveVideo: n(e.video) ? 1 : 0
      };
    }
    function Q() {
      w && !k && (w = !1, f.log("trigger (re)negotiation"), u.onNegotiationRequired && u.onNegotiationRequired());
    }
    function G(e) {
      return new Promise(function (n) {
        if (!e || !e.audio && !e.video)
          throw new Error("Invalid parameters!" + JSON.stringify(e));
        var r = !N || !t.areNegotiatedDirectionsFulfilled(e, x);
        N = e, f.log("configure modalities", "audio:", e.audio, "video:", e.video, "peerconnection:", !!h, "pc.signalingState:", h ? h.signalingState : "-", "needNewRenegotiation:", r), r && Q(), n();
      });
    }
    function Y(e, n, r) {
      var i = t.hasSendDirectionality(x.audio), s = t.hasSendDirectionality(x.video), o = t.isOnHold(x), u = t.hasSendDirectionality(e.audio), a = t.hasSendDirectionality(e.video), c = t.isOnHold(e);
      return $().then(function () {
        f.log("updatePeerConnectionStreamsAsync", "pc state", h.signalingState, "hold", "[", o, "->", c, "]", "audio", "[", i, "->", u, "]", "video", "[", s, "->", a, "]");
        if (o !== c) {
          g && g.setHold(c);
          if (c)
            return;
        }
        if (i !== u || s !== a || E) {
          r && (E = !1);
          if (!h.addTrack) {
            var e = function () {
              if (g)
                try {
                  var e = g.getObject();
                  f.log("remove media stream", "audio tracks:", e.getAudioTracks(), "video tracks:", e.getVideoTracks()), h.removeStream(e);
                } finally {
                  g.dispose(), g = null;
                }
            };
            n && (f.log("not using any media(stream api) track, remove stream"), e());
            if (r && (u || a))
              return l.getMediaStreamRefAsync({
                audio: u,
                video: a
              }).then(function (t) {
                try {
                  var n = t.getObject();
                  f.log("received media(stream api) tracks", "wantSendAudio:", u, "wantSendVideo:", a), f.log("add media stream", "audio tracks:", n.getAudioTracks(), "video tracks:", n.getVideoTracks()), h.addStream(n), g = t;
                } catch (r) {
                  try {
                    e();
                  } finally {
                    t.dispose();
                  }
                  throw r;
                }
              });
          } else {
            var t = function () {
              if (g)
                try {
                  h.getSenders().forEach(function (e) {
                    f.log("remove sender", "track kind:", e.track.kind, "track id:", e.track.id), h.removeTrack(e);
                  });
                } catch (e) {
                  f.warn("removeTrack returned error(maybe the mozilla bug, check code for comment)", e);
                } finally {
                  g.dispose(), g = null;
                }
            };
            n && (f.log("not using any media(track api) track, remove all senders"), t());
            if (r && (u || a))
              return l.getMediaStreamRefAsync({
                audio: u,
                video: a
              }).then(function (e) {
                try {
                  f.log("received media(track api) tracks", "wantSendAudio:", u, "wantSendVideo:", a), e.getObject().getTracks().forEach(function (t) {
                    f.log("add stream", "track kind:", t.kind, "track id:", t.id), h.addTrack(t, e.getObject());
                  }), g = e;
                } catch (n) {
                  try {
                    t();
                  } finally {
                    e.dispose();
                  }
                  throw n;
                }
              });
          }
        }
      });
    }
    function Z() {
      if (k)
        throw k = !1, L = !0, new Error("fail offer as previous GLARE invalidated pc state!");
    }
    function et() {
      return new Promise(function (e) {
        f.log("create [offer] configured:", N), J("no configured modalities to create offer for"), w = !1, C = N, T = N;
        var n, r = t.negotiateModalities(T, N);
        t.isOnHold(r) ? e(Y(T, !0, !0).then(function () {
          var e = c.createInactiveOfferSdp(h.localDescription.sdp, T);
          return f.debug("CREATE OFFER hold", "sdp:", e), {
            sdp: e,
            modalities: r
          };
        })) : e(Y(T, !0, !0).then(function () {
          var e = K(T);
          return f.log("create [offer]", "offered:", T, "constraints:", e), h.createOffer(e);
        }).then(function (e) {
          f.debug("create [offer] offer from peer connection", "sdp:", e.sdp), n = c.createLocalOffer(e.sdp);
          var t = n.toLocal(T);
          return f.log("create [offer], collect ice candidates and set local description", "sdp:", t), n.needToWaitIceCandidates() && R(), Promise.all([
            h.setLocalDescription(new RTCSessionDescription({
              sdp: t,
              type: "offer"
            })),
            b.promise
          ]);
        }).then(function () {
          var e = n.toOffer(h.localDescription.sdp);
          return f.debug("CREATE OFFER", "sdp:", e), {
            sdp: e,
            modalities: r
          };
        }));
      });
    }
    function tt(e) {
      return new Promise(function (n) {
        f.debug("process [offer]", "sdp:", e), S = c.createRemoteOffer(e), w = !1, T = t.invertModalities(S.getModalities()), f.log("process [offer]", "offered:", T), Z(), n(T);
      });
    }
    function nt(e) {
      return new Promise(function (n) {
        if (e) {
          n("");
          return;
        }
        f.log("create [answer]", "offered:", T, "configured:", N), J("no configured modalities to create answer for"), C = N;
        var r, i = t.negotiateModalities(T, N);
        t.isOnHold(i) ? n(Y(i, !0, !0).then(function () {
          q(i);
          var e = c.createInactiveAnswerSdp(h.localDescription.sdp, x);
          return f.debug("CREATE ANSWER hold", "sdp:", e), {
            sdp: e,
            modalities: x
          };
        })) : n(Y(i, !0, !1).then(function () {
          var e = S.toRemote(i);
          return f.log("create [answer] set remote description", "negotiated:", i, "sdp:", e), h.setRemoteDescription(new RTCSessionDescription({
            sdp: e,
            type: "offer"
          }));
        }).then(function () {
          return Y(i, !1, !0);
        }).then(function () {
          return q(i), h.createAnswer();
        }).then(function (e) {
          f.debug("create [answer] answer from peer connection", "sdp:", e.sdp), r = c.createLocalAnswer(e.sdp);
          var t = r.toLocal(x);
          return f.log("create [answer], collect ice candidates and set local description", "sdp:", t), r.needToWaitIceCandidates() && R(), Promise.all([
            h.setLocalDescription(new RTCSessionDescription({
              sdp: t,
              type: "answer"
            })),
            b.promise
          ]);
        }).then(function () {
          var e = r.toAnswer(h.localDescription.sdp);
          return f.debug("CREATE ANSWER", "sdp:", e), {
            sdp: e,
            modalities: x
          };
        }));
      });
    }
    function rt(e, n) {
      return new Promise(function (r) {
        f.debug(n ? "PROCESS PRANSWER" : "PROCESS ANSWER", "sdp:", e);
        if (n) {
          f.log("process [pranswer]"), r("");
          return;
        }
        var i = c.createRemoteAnswer(e), s = t.invertModalities(i.getModalities());
        q(s);
        if (!t.isOnHold(x)) {
          var o = i.toRemote(x);
          f.log("process [answer] set remote description", "negotiated:", x, "sdp:", o), r(h.setRemoteDescription(new RTCSessionDescription({
            sdp: o,
            type: "answer"
          })).then(function () {
            return x;
          }));
        } else
          r(x);
      });
    }
    function it() {
      return new Promise(function (e) {
        var n = E && !t.isOnHold(x) || !t.areNegotiatedDirectionsAcceptable(N, C, x), r = !n;
        w = !0, f.log("negotiation completed", "isComplete:", r, "configured:", N, "negotiating:", C, "offered:", T, "negotiated:", x), n && Q(), e({
          isComplete: r,
          activeModalities: x,
          configuredModalities: N
        });
      });
    }
    function st(t, n) {
      return new Promise(function (r) {
        var i = t === e.RENEGOTIATION_ERROR.local && !L;
        L = !1, f.warn("negotiation rejected", "isComplete:", i, "error:", t, "configured:", N, "negotiating:", C, "offered:", T, "negotiated:", x), z(), t === e.RENEGOTIATION_ERROR.glare && (k = !0, w = !1), n && (f.log("retrying failed negotiation"), Q()), r({
          isComplete: i,
          activeModalities: x,
          configuredModalities: N
        });
      });
    }
    function ot(e, n) {
      var r = function (e, n) {
        l.Renderer.call(this, e, n);
        var r = this, i = this.dispose, s = null;
        this._updateStream = function () {
          r._attachMediaStream(d), s && (s.resolve(), s = null);
        }, this._unsubscribeIfSubscribed = function () {
          s && (s.reject(), s = null);
          var e = y.indexOf(r);
          e !== -1 && y.splice(e, 1);
        }, this.subscribeVideoAsync = function (e) {
          return f.info("subscribeVideoAsync", "msi:", e), new Promise(function (e) {
            r._unsubscribeIfSubscribed();
            var n = y.indexOf(r);
            n === -1 && y.push(r), d ? (r._attachMediaStream(d), e()) : (s = t.defer(), e(s.promise));
          });
        }, this.dispose = function () {
          r._unsubscribeIfSubscribed(), i();
        };
      };
      return new r(e, n);
    }
    function ut() {
      h && (t.isOnHold(x) || (E = !0, Q()));
    }
    function at() {
      f.log("terminate"), ft().then(function () {
        D = !0, j(), z(), X(), u._onTerminated && u._onTerminated(u);
      });
    }
    function ft() {
      return D ? _ : (_ = M.getReport().catch(function (e) {
        return f.error("getting statistics should never fail:", e), {};
      }), _);
    }
    this.configureModalitiesAsync = G, this.createOfferAsync = et, this.processOfferAsync = tt, this.createAnswerAsync = nt, this.processAnswerAsync = rt, this.completeNegotiationAsync = it, this.rejectNegotiationAsync = st, this.createRemoteRenderer = ot, this.getStatsAsync = ft, this.terminate = at, this._deviceSelectionChanged = ut, this._onTerminated = null, this.onNegotiationRequired = null, this.onSessionErrorOccurred = null;
    var u = this, a = s.maContext.settings, f = s.getLogger(), l = s.getDeviceManager(), c = n.build({
        adapter: r.build(),
        settings: a,
        logger: f
      }), h = null, p, d = null, v = null, m = null, g = null, y = [], b = t.defer(), w = !0, E = !1, S, x = {}, T, N, C, k = !1, L = !1, A = 10000, O = null, M = i.build(o), _ = Promise.resolve({}), D = !1;
  };
  return {
    build: function (e, t, n) {
      return new s(e, t, n);
    }
  };
})

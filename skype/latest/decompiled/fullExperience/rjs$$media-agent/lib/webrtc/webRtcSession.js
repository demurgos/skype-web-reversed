(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/webrtc/webRtcSession", [
      "require",
      "exports",
      "../constants",
      "../helper",
      "./webRtcSessionDescription",
      "./adapter/webrtcAdapter",
      "./mediaManager",
      "./statistics/webrtcStatistics",
      "../common/utils",
      "./webRtcDtmfSender",
      "../common/stream/receiveStreamCollection",
      "../common/render/remoteVideoRenderer",
      "../common/stream/subscriptionManager",
      "../common/resolutionTable",
      "../extensions/extensionsManager",
      "../common/activeSpeaker/activeSpeakerManager",
      "./render/audioRenderer",
      "./stream/webRtcReceiveStream",
      "./quality/qualityManager",
      "./statistics/statisticsGatherer",
      "../common/promiseQueue",
      "../common/settablePromise",
      "./negotiationEmulator"
    ], e);
}(function (e, t) {
  var n = e("../constants"), r = e("../helper"), i = e("./webRtcSessionDescription"), s = e("./adapter/webrtcAdapter"), o = e("./mediaManager"), u = e("./statistics/webrtcStatistics"), a = e("../common/utils"), f = e("./webRtcDtmfSender"), l = e("../common/stream/receiveStreamCollection"), c = e("../common/render/remoteVideoRenderer"), h = e("../common/stream/subscriptionManager"), p = e("../common/resolutionTable"), d = e("../extensions/extensionsManager"), v = e("../common/activeSpeaker/activeSpeakerManager"), m = e("./render/audioRenderer"), g = e("./stream/webRtcReceiveStream"), y = e("./quality/qualityManager"), b = e("./statistics/statisticsGatherer"), w = e("../common/promiseQueue"), E = e("../common/settablePromise"), S = e("./negotiationEmulator"), x = 10000, T = function (e, t, T) {
      function ct(e) {
        return yt.state() == E.SettablePromiseState.Pending ? (k.log("##### Renegotiation is in progress, no local resolution switch for now #####"), yt.promise().then(function () {
          return Promise.resolve(!1);
        })) : (k.log("Queueing local renegotiation..."), bt.add(function () {
          return k.log("############# LOCAL RENEGOTIATION START #############"), tn(e);
        }), wt.renegotiate().then(function () {
          return k.log("############# LOCAL RENEGOTIATION END   #############"), !0;
        }));
      }
      function ht(e) {
        T.onOptimalVideoReceiversCountChanged && T.onOptimalVideoReceiversCountChanged(e);
      }
      function St() {
        var e = new d["default"]();
        return e.addExtension(n["default"].EXTENSION_TYPE.dominantSpeakerHistory, {
          logger: k,
          callback: pt.onDominantSpeakerHistoryChanged.bind(pt)
        }), e.addExtension(n["default"].EXTENSION_TYPE.videoStreamControl, {
          logger: k,
          negotiationEmulator: wt
        }), e;
      }
      function xt() {
        return ot.getStreams();
      }
      function Tt(e) {
        it = e;
      }
      function Nt(e) {
        st = e;
      }
      function Ct(e) {
        tt = e;
      }
      function kt() {
        tt && tt();
      }
      function Lt(e, t, n) {
        var r = e.getMediaStream();
        if (r) {
          var i = _.getMaxFS(t, n), s = M.getMediaEntityByStreamId(r.id);
          if (!s || !s.getVideoCapabilities()) {
            k.warn("no capabilities for provided modality:", e.getModality());
            return;
          }
          s.getVideoCapabilities().setMaxFS(i, function () {
            k.log("updated max-fs video capability to", i);
            Jt(!0);
          });
        } else
          k.warn("renderer has no stream attached");
      }
      function At(e) {
      }
      function Ot(e) {
        k.error("Media error occurred", "type:", e.type, "detail:", e.detail);
        N.onSessionErrorOccurred && N.onSessionErrorOccurred(e);
      }
      function Mt() {
        k.log("audio transport connected");
        _t("active");
      }
      function _t(e) {
        k.log("audio state changed to", e);
        if (N.onAudioStateChanged) {
          var t = {
            content: "audio",
            direction: "receive",
            stream: e
          };
          N.onAudioStateChanged(t);
        }
      }
      function Dt(e) {
        n["default"].MODALITY.audio === e.getModality() && dt.play(e.getMediaStream());
        kt();
      }
      function Pt(e) {
        n["default"].MODALITY.audio === e.getModality() && dt.getStream() === e.getMediaStream() && dt.stop();
        kt();
      }
      function Ht(e) {
        V = e;
        G.setNegotiatedModalities(e);
      }
      function Bt() {
        var e = "webrtcIceGatheringTimeoutMs" in C ? C.webrtcIceGatheringTimeoutMs : x;
        if (!e)
          return;
        R > 0 && clearTimeout(R);
        var t = q;
        R = setTimeout(function () {
          R = 0;
          t.isPending() && (k.warn("ICE candidates gathering terminated due to timeout " + e), t.resolve());
        }, e);
      }
      function jt() {
        k.log("reset candidate gathering");
        q.promise.then(function () {
        }, function () {
        });
        q.reject(new Error("reset candidate gathering"));
        q = r["default"].defer();
      }
      function Ft() {
        k.info("ICE candidates gathered completely");
        q.resolve();
      }
      function It() {
        k.log("reset peer connection");
        dt.dispose();
        rt && (rt.dispose(), rt = null);
        P && P.close();
        hn();
        P = null;
        wt.configure(null);
        H = null;
        jt();
        z = !0;
        V = {};
      }
      function qt() {
        if (!C.iceDisconnectedTimeoutMs)
          return;
        Q = setTimeout(function () {
          k.error("ice disconnected for ", C.iceDisconnectedTimeoutMs, "ms. Raise CONSTANTS.MEDIA_ERROR.iceConnectionError");
          Ot({
            type: n["default"].MEDIA_ERROR.iceConnectionError,
            detail: "ice transport disconnected"
          });
        }, C.iceDisconnectedTimeoutMs);
      }
      function Rt() {
        Q && (clearTimeout(Q), Q = null);
      }
      function Ut(e) {
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
      function zt(e) {
        var t;
        if (X) {
          var n = X.getSrtpInfo();
          G.setOfferedSrtpInfo(n);
          t = !n.dtls || n.sdes && C.preferSdesSrtp;
        } else
          t = C.preferSdesSrtp;
        t && (k.log("configuring peer connection to use sdes"), e.optional = [{ DtlsSrtpKeyAgreement: !1 }]);
        G.setNegotiatedSrtpInfo({
          dtls: !t,
          sdes: !!t
        });
      }
      function Wt() {
        return H || (H = e.maContext.getRelayManager().queryRelaysAsync("turn", e.config.isRemoteClientLync).then(function (t) {
          var r = {};
          zt(r);
          k.log("create peer connection");
          P = new A.RTCPeerConnection({
            iceServers: Ut(t),
            rtcpMuxPolicy: "require",
            iceTransportPolicy: e.config.iceTransportPolicy ? e.config.iceTransportPolicy : n["default"].ICE_TRANSPORT_POLICY.all
          }, r);
          wt.configure(P);
          G.setPeerConnection(P);
          at.initialize(P);
          P.onnegotiationneeded = function (e) {
            var t = e.target;
            k.log("onnegotiationneeded", "signalingState:", t.signalingState);
          };
          P.onsignalingstatechange = function (e) {
            var t = e.target;
            G.setSignalingConnectionState(t.signalingState);
            k.log("onsignalingstatechange", "signalingState:", t.signalingState);
          };
          P.onaddstream = function (e) {
            var t = e.stream;
            k.log("onaddstream", "stream:", t);
            var r = M.getMediaEntityByStreamId(t.id);
            r || (k.log("cannot find media entity with stream id" + t.id + ", trying to fallback"), t.getAudioTracks()[0] && (r = M.getMediaEntitiesByModality(n["default"].MODALITY.audio)[0]));
            if (r) {
              var i = Xt(t, r.getModality(), +r.getXSourceStreamId());
              ot.add(i);
            } else
              k.error("could not find media entity for an added stream:", t.id);
          };
          P.ontrack = function (e) {
            k.log("ontrack", "track:", e.track);
          };
          P.onremovestream = function (e) {
            k.log("onremovestream", "stream:", e.stream);
            ot.remove(e.stream.id);
          };
          P.onicecandidate = function (e) {
            k.log("onicecandidate", "candidate:", e.candidate);
            e.candidate || Ft();
          };
          P.onicegatheringstatechange = function (e) {
            var t = e.target;
            k.log("onicegatheringstatechange", "iceGatheringState:", t.iceGatheringState);
          };
          P.oniceconnectionstatechange = function (e) {
            var t = e.target;
            G.setIceConnectionState(t.iceConnectionState);
            k.log("oniceconnectionstatechange", "iceConnectionState:", t.iceConnectionState, "pc.signalingState:", t.signalingState);
            t.iceConnectionState === "connected" || t.iceConnectionState === "completed" ? Mt() : t.iceConnectionState === "failed" && Ot({
              type: n["default"].MEDIA_ERROR.iceConnectionError,
              detail: "ice transport failed"
            });
            t.iceConnectionState === "disconnected" ? qt() : Rt();
          };
        })), H;
      }
      function Xt(e, t, r) {
        return new g["default"](e, t, r, {
          requestSource: function (e, t) {
            if (!O)
              return Promise.resolve();
            bt.add(function () {
              var r = Et.getExtension(n["default"].EXTENSION_TYPE.videoStreamControl);
              return r ? r.requestSource(e, t) : Promise.resolve();
            });
          }
        });
      }
      function Vt(e) {
        if (!J)
          throw new Error(e);
      }
      function $t(e) {
        function t(e) {
          return !!e && (r["default"].hasReceiveDirectionality(e) || e === "inactive");
        }
        return {
          offerToReceiveAudio: +t(e.audio),
          offerToReceiveVideo: +t(e.video) + +t(e.sharing)
        };
      }
      function Jt(e) {
        z ? (z = !1, U = !1, k.log("triggering renegotiation"), M.backup(), N.onNegotiationRequired && N.onNegotiationRequired()) : e && (k.log("renegotiation postponed"), U = !0);
      }
      function Kt(e) {
        var t = vt.then(function () {
          return new Promise(function (t) {
            if (!e || !e.audio && !e.video && !e.sharing)
              throw new Error("Invalid parameters!" + JSON.stringify(e));
            var n = !J || !r["default"].areNegotiatedDirectionsFulfilled(e, V);
            J = e;
            k.log("configure modalities", "audio:", e.audio, "video:", e.video, "sharing", e.sharing, "peerconnection:", !!P, "pc.signalingState:", P ? P.signalingState : "-", "needNewRenegotiation:", n);
            n && Jt();
            t(J);
          });
        });
        return vt = t["catch"](function (e) {
          k.warn("Error during configuring modalities: ", e);
        }), t;
      }
      function Qt(e, t, i) {
        var s = r["default"].hasSendDirectionality(V.audio), o = r["default"].hasSendDirectionality(V.video), u = r["default"].hasSendDirectionality(V.sharing), a = r["default"].isOnHold(V), f = r["default"].hasSendDirectionality(e.audio), l = r["default"].hasSendDirectionality(e.video), c = r["default"].hasSendDirectionality(e.sharing), h = r["default"].isOnHold(e);
        return Wt().then(function () {
          k.log("updatePeerConnectionStreamsAsync", "pc state", P.signalingState, "hold", "[", a, "->", h, "]", "audio", "[", s, "->", f, "]", "video", "[", o, "->", l, "]", "sharing", "[", u, "->", c, "]");
          if (a !== h) {
            B && B.setHold(h);
            j && j.setHold(h);
            F && F.setHold(h);
            if (h)
              return;
          }
          if (s !== f || o !== l || u !== c || W) {
            i && (W = !1);
            var e = function () {
                d(n["default"].MODALITY.audio);
              }, r = function () {
                d(n["default"].MODALITY.video);
              }, p = function () {
                d(n["default"].MODALITY.sharing);
              }, d = function (e) {
                e in gt && (k.log("remove sender", "track kind:", gt[e].track.kind, "track id:", gt[e].track.id), P.removeTrack(gt[e]), delete gt[e]);
              }, v = function (e, t, n) {
                if (!e)
                  return;
                k.log("add media track", "kind:", e.kind, "id:", e.id);
                if (gt[n])
                  throw new Error("track already created, modality:" + n + ", kind:" + e.kind + ", id:" + e.id);
                gt[n] = P.addTrack(e, t);
              }, m = function () {
                M.setMediaTracks(Zt());
                G.setMediaEntities(M.getMediaEntities());
              };
            if (t) {
              k.log("not using any media(track api) track, remove all senders");
              f || (e(), dn());
              if (!i || !l)
                r(), pn();
              if (!i || !c)
                p(), vn();
            }
            if (i) {
              var g = [];
              if (l) {
                var y = L._getMediaStream({ video: !0 });
                g.push(y.start().then(function () {
                  try {
                    r();
                    pn();
                    v(y.getObject().getVideoTracks()[0], y.getObject(), n["default"].MODALITY.video);
                    y.onApplyConstraints = function (e) {
                      r();
                      e.then(function () {
                        v(y.getObject().getVideoTracks()[0], y.getObject(), n["default"].MODALITY.video);
                        m();
                      });
                    };
                    B = y;
                  } catch (e) {
                    throw r(), pn(), y.dispose(), e;
                  }
                }));
              }
              if (f) {
                var b = L._getMediaStream({ audio: !0 });
                g.push(b.start().then(function () {
                  try {
                    !j || !b.isSameStream(j) ? (e(), dn(), v(b.getObject().getAudioTracks()[0], b.getObject(), n["default"].MODALITY.audio), b.setMute(I), j = b) : b.dispose();
                  } catch (t) {
                    throw e(), dn(), b.dispose(), t;
                  }
                }));
              }
              if (c) {
                var w = L._getMediaStream({ video: !0 });
                g.push(w.start().then(function () {
                  try {
                    v(w.getObject().getVideoTracks()[0], w.getObject(), n["default"].MODALITY.sharing);
                    t && (p(), vn());
                    F = w;
                  } catch (e) {
                    throw p(), vn(), w.dispose(), e;
                  }
                }));
              }
              return Promise.all(g).then(function () {
                return m();
              });
            }
          }
        });
      }
      function Gt() {
        yt.reject("promise expired");
        yt = new E.SettablePromise();
        bt.add(yt);
      }
      function Yt() {
        var e = bt.add(function () {
          return new Promise(function (e) {
            k.log("create [offer] configured:", J);
            et = !0;
            Vt("no configured modalities to create offer for");
            z = !1;
            K = r["default"].excludePassiveModalities(J, mt, $);
            $ = K;
            var t = r["default"].negotiateModalities($, K);
            r["default"].isOnHold(t) ? e(Qt($, !0, !0).then(function () {
              var e = D.createInactiveOfferSdp(P.localDescription.sdp, $);
              return k.debug("CREATE OFFER hold", "sdp:", e), {
                blob: e,
                modalities: t
              };
            })) : e(Qt($, !0, !0).then(function () {
              var e = $t($);
              return k.log("create [offer]", "offered:", $, "constraints:", e), P.createOffer(e);
            }).then(function (e) {
              k.debug("create [offer] offer from peer connection", "sdp:", e.sdp);
              var t = D.createLocalOffer(e.sdp);
              t.needToWaitIceCandidates() && jt();
              G.startWaitingForStreamStart($, !1);
              var n = new A.RTCSessionDescription({
                sdp: t.toLocal(),
                type: "offer"
              });
              return Bt(), Promise.all([
                P.setLocalDescription(n),
                q.promise
              ]);
            }).then(function () {
              var e = D.createLocalOffer(P.localDescription.sdp);
              e.updateModalities($);
              var n = e.toOffer();
              return k.debug("CREATE OFFER", "sdp:", n), {
                blob: n,
                modalities: t
              };
            }));
          });
        });
        return Gt(), e;
      }
      function Zt() {
        var e = [];
        return a["default"].forOwn(gt, function (t, n) {
          e.push({
            track: t.track.id,
            modality: n
          });
        }), e;
      }
      function en(e) {
        var t = bt.add(function () {
          return new Promise(function (t) {
            var n = e.blob;
            k.debug("process [offer]", "sdp:", n);
            et = !1;
            X = D.createRemoteOffer(n);
            z = !1;
            $ = r["default"].invertModalities(X.getModalities());
            var i = Promise.resolve($);
            if (r["default"].hasSendDirectionality($.video) || r["default"].hasReceiveDirectionality($.video)) {
              var s = X.getVideoCodecs();
              i = A.RTCRtpReceiver.getCapabilities("video").then(function (e) {
                var t = e.codecs.some(function (e) {
                  return s.some(function (t) {
                    return e.mimeType === t;
                  });
                });
                if (!t) {
                  k.warn("offer doesn't contain any supported video codecs");
                  var n = a["default"].shallowClone($);
                  return n.video = void 0, n;
                }
                return $;
              })["catch"](function (e) {
                return k.error("failed to get video capability", e), $;
              });
            }
            t(i.then(function (e) {
              return k.log("process [offer]", "offered:", $, "acceptable:", e), e;
            }));
          });
        });
        return Gt(), t;
      }
      function tn(e) {
        return k.log("Changing resolution to " + e), B.applyConstraints({
          maxFS: e.fs,
          maxFPS: lt
        }).then(function (t) {
          return ft.setCurrentResolution(e), t;
        });
      }
      function nn(e) {
        if (C.enableLocalVideoConstraints && B && B.hasVideo()) {
          var t = e.getVideoRecvCapabilities();
          if (t.maxFS && t.maxFPS) {
            var n = _.getResolution(t.maxFS);
            return lt = t.maxFPS, ft.setMaxResolution(n), ft.getActive() ? Promise.resolve(!1) : tn(n);
          }
          k.error("remote endpoint didn't specify video receive capability");
        }
        return Promise.resolve(!1);
      }
      function rn(e) {
        return new Promise(function (t) {
          if (e) {
            t({});
            return;
          }
          k.log("create [answer]", "offered:", $, "configured:", J);
          Vt("no configured modalities to create answer for");
          K = r["default"].excludePassiveModalities(J, mt, $);
          var n = r["default"].negotiateModalities($, K);
          r["default"].isOnHold(n) ? t(Qt(n, !0, !0).then(function () {
            Ht(n);
            var e = D.createInactiveAnswerSdp(P.localDescription.sdp, V);
            return k.debug("CREATE ANSWER hold", "sdp:", e), {
              blob: e,
              modalities: V
            };
          })) : t(Qt(n, !0, !1).then(function () {
            return nn(X);
          }).then(function () {
            return sn();
          }).then(function () {
            var e = X.toRemote(n);
            return k.log("create [answer] set remote description", "negotiated:", n, "sdp:", e), P.setRemoteDescription(new A.RTCSessionDescription({
              sdp: e,
              type: "offer"
            }));
          }).then(function () {
            return Qt(n, !1, !0);
          }).then(function () {
            return P.createAnswer();
          }).then(function (e) {
            k.debug("create [answer] answer from peer connection", "sdp:", e.sdp);
            var t = D.createLocalAnswer(e.sdp);
            t.needToWaitIceCandidates() && jt();
            G.startWaitingForStreamStart(n, !1);
            var r = new A.RTCSessionDescription({
              sdp: t.toLocal(),
              type: "answer"
            });
            return Bt(), Promise.all([
              P.setLocalDescription(r),
              q.promise
            ]);
          }).then(function () {
            var e = D.createLocalAnswer(P.localDescription.sdp);
            e.updateModalities(n);
            var t = e.toAnswer();
            return n = e.getModalities(), Ht(n), k.debug("CREATE ANSWER", "sdp:", t), {
              blob: t,
              modalities: V
            };
          }));
        });
      }
      function sn() {
        return X.isCodecSwitchSupported() ? Promise.resolve() : A.RTCRtpReceiver.getCapabilities(n["default"].MEDIA_TYPE.audio).then(function (e) {
          var t = e.codecs.map(function (e) {
            return e.mimeType;
          });
          X.usePrimaryAudioCodecOnly(t);
        })["catch"](function (e) {
          k.error("failed to set primary codec based on audio capability", e);
        });
      }
      function on(e, t) {
        return new Promise(function (n) {
          var i = e.blob;
          k.debug(t ? "PROCESS PRANSWER" : "PROCESS ANSWER", "sdp:", i);
          if (t) {
            k.log("process [pranswer]");
            n({});
            return;
          }
          var s = D.createRemoteAnswer(i), o = r["default"].invertModalities(s.getModalities());
          Ht(o);
          if (!r["default"].isOnHold(V)) {
            var u = s.toRemote(V);
            k.log("process [answer] set remote description", "negotiated:", V, "sdp:", u);
            n(P.setRemoteDescription(new A.RTCSessionDescription({
              sdp: u,
              type: "answer"
            })).then(function () {
              return V;
            }).then(function () {
              return nn(s);
            }).then(function (e) {
              e && Jt(!0);
            }).then(function () {
              return V;
            }));
          } else
            n(V);
        });
      }
      function un() {
        return new Promise(function (e) {
          M.commit();
          var t = r["default"].excludePassiveModalities(J, mt, $), n = W && !r["default"].isOnHold(V) || !r["default"].areNegotiatedDirectionsAcceptable(t, K, V) || U, i = !n;
          z = !0;
          k.log("negotiation completed", "isComplete:", i, "configured:", J, "negotiating:", K, "offered:", $, "negotiated:", V);
          n && Jt();
          yt.resolve();
          e({
            isComplete: i,
            activeModalities: V,
            offeredModalities: $,
            attemptedModalities: K,
            configuredModalities: J,
            initiator: et
          });
        });
      }
      function an(e, t) {
        return new Promise(function (r) {
          M.rollback();
          var i = e === n["default"].RENEGOTIATION_ERROR.local, s = Promise.resolve();
          k.warn("negotiation rejected", "isComplete:", i, "error:", e, "configured:", J, "negotiating:", K, "offered:", $, "negotiated:", V);
          P && ("have-local-offer" === P.signalingState ? (k.log("rolling back local description"), s = P.setLocalDescription(new A.RTCSessionDescription({ type: "rollback" }))) : k.error("cannot rollback local description in currrent state:", P.signalingState));
          yt.reject("negotiation rejected");
          r(s.then(function () {
            return t && (k.log("retrying failed negotiation"), Jt()), {
              isComplete: i,
              activeModalities: V,
              offeredModalities: $,
              attemptedModalities: K,
              configuredModalities: J,
              initiator: et
            };
          }));
        });
      }
      function fn(e, t) {
        var n = new c["default"]({
          settings: C,
          logger: k,
          subscriptionManager: ut
        }, e, t, Lt);
        return n;
      }
      function ln() {
        P && (r["default"].isOnHold(V) || (W = !0, Jt()));
      }
      function cn() {
        return k.log("terminate"), at.dispose(), G.setTerminated(), bn().then(function () {
          Z = !0;
          It();
          ut.dispose();
          Rt();
          Et.dispose();
          N._onTerminated && N._onTerminated(N);
        });
      }
      function hn() {
        dn();
        pn();
        vn();
      }
      function pn() {
        B && (B.dispose(), B = null);
      }
      function dn() {
        j && (j.dispose(), j = null);
      }
      function vn() {
        F && (F.dispose(), F = null);
      }
      function mn() {
        return yn(!0);
      }
      function gn() {
        return yn(!1);
      }
      function yn(e) {
        return I = e, j && j.setMute(e), Promise.resolve();
      }
      function bn() {
        return Z || (Y = Y.then(function () {
          return G.getReport();
        }).then(function (e) {
          return e;
        })["catch"](function (e) {
          return k.error("getting statistics should never fail:", e), {};
        })), Y;
      }
      function wn(e) {
        return rt.sendDtmf(P, e);
      }
      function En() {
        return rt.canSendDtmf(P);
      }
      function Sn() {
        return Et;
      }
      this.configureModalitiesAsync = Kt;
      this.createOfferAsync = Yt;
      this.processOfferAsync = en;
      this.createAnswerAsync = rn;
      this.processAnswerAsync = on;
      this.completeNegotiationAsync = un;
      this.rejectNegotiationAsync = an;
      this.createRemoteRenderer = fn;
      this.getStatsAsync = bn;
      this.terminate = cn;
      this.muteInputAsync = mn;
      this.unmuteInputAsync = gn;
      this.sendDtmf = wn;
      this.canSendDtmf = En;
      this.onNegotiationRequired = null;
      this.onSessionErrorOccurred = null;
      this.getExtensionsManager = Sn;
      this._deviceSelectionChanged = ln;
      this._onTerminated = null;
      var N = this, C = e.maContext.settings, k = e.getLogger().createChild("webrtc"), L = e.getDeviceManager(), A = s["default"].build({ global: e.maContext }), O = e.config && e.config.isConference, M = new o["default"]({
          logger: k,
          settings: C,
          numVideoChannels: O && C.numVideoChannelsGvc ? C.numVideoChannelsGvc : 1
        }, { mediaEntityCreated: At }), _ = new p["default"](), D = i["default"].build({
          sdpTransform: new A.SdpTransform(),
          mediaManager: M,
          settings: C,
          logger: k
        }), P = null, H, B = null, j = null, F = null, I = e.config.muted, q = r["default"].defer(), R = null, U = !1, z = !0, W = !1, X, V = {}, $, J, K, Q = null, G = new u["default"](t, { logger: k }), Y = Promise.resolve({}), Z = !1, et = !1, tt = null, nt = null, rt = f["default"].build(k, C.dtmf), it, st, ot = new l["default"]({
          streamAdded: Dt,
          streamRemoved: Pt
        }), ut = new h["default"]({ logger: k }, {
          getStreams: xt,
          onStreamsChanged: Ct
        }), at = new b["default"](), ft = new y["default"]({
          logger: k,
          resolutionTable: _,
          settings: {
            videoReceiversCount: C.webrtcVideoReceiversCount || 1,
            bandwidthPerVideoReceiver: C.webrtcBandwidthPerVideoReceiver || 200000,
            cooldownTimeout: C.webrtcResolutionManagerCooldownTimeout,
            retryDelay: C.webrtcResolutionManagerRetryDelay,
            multiParty: O
          }
        }, {
          onOptimalVideoReceiversCountChanged: ht,
          applyResolution: ct
        }, {
          onStatisticsChanged: function (e) {
            at.onStatisticsChanged(e);
          }
        }), lt = 30, pt = new v.ActiveSpeakerManager(T.onContributingSourcesChanged, T.onDominantSpeakerChanged), dt = new m["default"]({ logger: k }), vt = Promise.resolve(), mt = e.config.passiveModalities, gt = {}, yt = new E.SettablePromise();
      yt.reject("placeholder");
      var bt = new w.PromiseQueue(k), wt = new S["default"](A, D, bt, k), Et = St();
    };
  t.__esModule = !0;
  t["default"] = {
    build: function (e, t, n) {
      return new T(e, t, n);
    }
  };
}));

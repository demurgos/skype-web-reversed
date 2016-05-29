define("jSkype/services/mediaAgent/ortcSession", [
  "./ortcTransport",
  "./ortcMediaChannel",
  "./ortcNegotiation",
  "./ortcSdp",
  "./ortcHelper",
  "./constants",
  "./helper",
  "./userAgentAdapter"
], function (e, t, n, r, i, s, o) {
  function u() {
    function t(t) {
      throw new Error("Invalid state change:" + e.state + " " + t + " changing: " + e.changing);
    }
    var e = this;
    this.STABLE = "stable";
    this.NEGOTIATION_REQUESTED = "negotiation_requested";
    this.HAVE_LOCAL_OFFER = "have_local_offer";
    this.HAVE_REMOTE_PRANSWER = "have_remote_pranswer";
    this.HAVE_REMOTE_ANSWER = "have_remote_answer";
    this.HAVE_REMOTE_OFFER = "have_remote_offer";
    this.HAVE_LOCAL_PRANSWER = "have_local_pranswer";
    this.HAVE_LOCAL_ANSWER = "have_local_answer";
    this.TERMINATED = "terminated";
    this.state = e.STABLE;
    this.changing = !1;
    this.change = function (n, r) {
      e.busy && t(n);
      r && (e.changing = r);
      switch (n) {
      case e.STABLE:
        e.state !== e.HAVE_REMOTE_ANSWER && e.state !== e.HAVE_LOCAL_ANSWER && t(n);
        break;
      case e.NEGOTIATION_REQUESTED:
        e.state !== e.STABLE && t(n);
        break;
      case e.HAVE_LOCAL_OFFER:
        e.state !== e.STABLE && e.state !== e.NEGOTIATION_REQUESTED && t(n);
        break;
      case e.HAVE_REMOTE_PRANSWER:
      case e.HAVE_REMOTE_ANSWER:
        e.state !== e.HAVE_LOCAL_OFFER && e.state !== e.HAVE_REMOTE_PRANSWER && t(n);
        break;
      case e.HAVE_REMOTE_OFFER:
        e.state !== e.STABLE && e.state !== e.NEGOTIATION_REQUESTED && t(n);
        break;
      case e.HAVE_LOCAL_PRANSWER:
      case e.HAVE_LOCAL_ANSWER:
        e.state !== e.HAVE_REMOTE_OFFER && e.state !== e.HAVE_LOCAL_PRANSWER && t(n);
        break;
      case e.TERMINATED:
        break;
      default:
        t(n);
      }
      e.state = n;
    };
    this.complete = function () {
      e.changing = !1;
    };
  }
  function a(a, f) {
    function P(e) {
      var t = d + e * v;
      return {
        min: t,
        max: t + v - 1
      };
    }
    function H(e) {
      var n = 0;
      for (var r = 0; r < e.length; r++) {
        e[r].label === s.MEDIA_LABEL.audio && typeof C[r] == "undefined" ? C[r] = new t(m.createChild("AStrm:"), l, e[r].type, e[r].label, F, p) : e[r].label === s.MEDIA_LABEL.video && (typeof C[r] == "undefined" && (C[r] = new t(m.createChild("VStrm" + n + ":"), l, e[r].type, e[r].label, F, P(n))), n++);
        if (C[r] && C[r].type !== e[r].type)
          throw new Error("Error in media descriptors ch.type: " + C[r].type + " descr.type: " + e[r].type);
        if (C[r] && C[r].label !== e[r].label)
          throw new Error("Error in media descriptors ch.label: " + C[r].label + " descr.label: " + e[r].label);
      }
    }
    function B(e, t) {
      for (var n = 0; n < e.length; n++)
        if (e[n].label === t)
          return e[n];
      return null;
    }
    function j() {
      var e = [];
      for (var t = 0; t < C.length; t++)
        C[t] && (e[t] = C[t].getLocalParameters());
      return e;
    }
    function F(e) {
      m.error("Media error occurred", "type:", e.type, "detail:", e.detail);
      y.onSessionErrorOccurred && y.onSessionErrorOccurred(e);
    }
    function I() {
      for (var e in x)
        x.hasOwnProperty(e) && x[e].update();
    }
    function q() {
      for (var e in x)
        x.hasOwnProperty(e) && x[e].dispose();
    }
    function R(e) {
      S ? window.detachMediaStream(S) : (S = document.createElement("audio"), document.body.appendChild(S), S.autoplay = !0, S.addEventListener("error", function () {
        m.error("_audio.onerror", "error:", S ? S.error : "<no audio element>");
      }));
      var t = new MediaStream([e]);
      window.attachMediaStream(S, t);
    }
    function U() {
      S && (document.body.removeChild(S), window.detachMediaStream(S), S = null);
    }
    function z(e) {
      N.state === N.STABLE && !N.changing ? (N.change(N.NEGOTIATION_REQUESTED), m.log("triggerNegotiation", "mods:", JSON.stringify(L), "force:", e), O = !1, y.onNegotiationRequired && y.onNegotiationRequired()) : e && (O = !0);
    }
    function W(e) {
      return new Promise(function (t) {
        if (!e || !e.audio && !e.video)
          throw new Error("Invalid parameters!" + JSON.stringify(e));
        var n = !L || !o.areNegotiatedDirectionsFulfilled(e, k);
        L = e;
        n && z();
        t();
      });
    }
    function X(e) {
      return new Promise(function (t) {
        m.debug("PROCESS OFFER", "sdp:", e);
        N.change(N.HAVE_REMOTE_OFFER);
        var n;
        n = T.sdpToParams(e);
        E.processOffer(n);
        w = n.transportParams;
        t(o.invertModalities(i.getModalitiesFromParams(n)));
      });
    }
    function V(e) {
      return new Promise(function (t) {
        function r(e, t) {
          return t.label === e && t.enabled;
        }
        if (e)
          N.change(N.HAVE_LOCAL_PRANSWER, !0), A = {
            audio: "sendrecv",
            video: "sendrecv"
          };
        else {
          N.change(N.HAVE_LOCAL_ANSWER, !0);
          if (!L)
            throw new Error("Modalities not configured for answer");
          A = L;
        }
        var n = E.createMediaDescriptorsForAnswer(A), i = n.some(r.bind(null, s.MEDIA_LABEL.audio)), o = n.some(r.bind(null, s.MEDIA_LABEL.video)), u = _.assureInitAsync("controlled", [
            i,
            o
          ]).then(function () {
            return _.waitIceCompletionIfNeededAsync(w).then(function () {
              return _.getLocalParamsAsync().then(function (t) {
                H(n);
                var r = E.createAnswer(n, t, j(), e);
                N.complete();
                var i = T.paramsToSdp(r);
                return m.debug(e ? "CREATE PRANSWER" : "CREATE ANSWER", "sdp:", i), {
                  sdp: i,
                  modalities: A
                };
              });
            });
          });
        t(u);
      });
    }
    function $() {
      return new Promise(function (e) {
        N.change(N.HAVE_LOCAL_OFFER, !0);
        A = L;
        var t = E.createMediaDescriptorsForOffer(A), n = _.assureInitAsync("controlling", [
            !!A.audio,
            !!A.video
          ]).then(function () {
            return _.getLocalParamsAsync().then(function (e) {
              H(t);
              var n = E.createOffer(t, e, j());
              N.complete();
              var r = T.paramsToSdp(n);
              return m.debug("CREATE OFFER", "sdp:", r), {
                sdp: r,
                modalities: A
              };
            });
          });
        e(n);
      });
    }
    function J(e, t) {
      return new Promise(function (n) {
        m.debug(t ? "PROCESS PRANSWER" : "PROCESS ANSWER", "sdp:", e);
        if (t)
          N.change(N.HAVE_REMOTE_PRANSWER), m.log("ignoring provisional answer"), n();
        else {
          N.change(N.HAVE_REMOTE_ANSWER);
          var r;
          r = T.sdpToParams(e);
          E.processAnswer(r);
          n(o.invertModalities(i.getModalitiesFromParams(r)));
        }
      });
    }
    function K(e, t) {
      return e || t ? g.getMediaStreamRefAsync({
        audio: e,
        video: t
      }) : Promise.resolve();
    }
    function Q() {
      return new Promise(function (e) {
        N.change(N.STABLE, !0);
        var t = E.completeNegotiation(), n = i.findDescrFromMedia(t.media, s.MEDIA_LABEL.audio), r = i.findDescrFromMedia(t.media, s.MEDIA_LABEL.video);
        e(Promise.all([
          _.configureTransportAsync(t.transportParams, [
            n.enabled,
            r.enabled
          ]),
          K(n.send, r.send)
        ]).then(function (e) {
          var n = e[1];
          try {
            for (var r = 0; r < t.media.length; r++)
              if (t.media[r].descr.label === s.MEDIA_LABEL.audio) {
                var u = C[r].getRecvTrack();
                C[r].configureChannel(_.audioTransport, n, t.media[r]);
                C[r].getRecvTrack() && C[r].getRecvTrack() !== u ? (R(C[r].getRecvTrack()), C[r].onContributingSourcesChanged = function () {
                  y.onContributingSourcesChanged && y.onContributingSourcesChanged.apply(y, arguments);
                }) : !C[r].getRecvTrack() && u && (U(), C[r].onContributingSourcesChanged = null);
              } else
                t.media[r].descr.label === s.MEDIA_LABEL.video && C[r].configureChannel(_.videoTransport, n, t.media[r]);
          } finally {
            n && n.dispose();
          }
          I();
          N.complete();
          k = i.getModalitiesFromParams(t);
          var a = O || !o.areNegotiatedDirectionsAcceptable(L, A, k);
          return a && z(), m.log("_completeNegotiationAsync: configured:", JSON.stringify(L), "_negotiatingModalities:", JSON.stringify(A), "activeModalities:", JSON.stringify(k)), {
            isComplete: !a,
            activeModalities: k,
            configuredModalities: L
          };
        }));
      });
    }
    function G(e, t) {
      return new Promise(function (n) {
        var r = e === s.RENEGOTIATION_ERROR.local;
        N.state = N.STABLE;
        m.error("negotiation failed", "error:", e);
        t && (m.log("retrying failed negotiation"), z());
        n({
          isComplete: r,
          activeModalities: k,
          configuredModalities: L
        });
      });
    }
    function Y(e, t) {
      var n = function (e, t) {
        g.Renderer.call(this, e, t);
        var n = this, r = this.dispose, i = !1, u = o.defer(), a, f;
        this._unsubscribeIfSubscribed = function () {
          a && (a.remove(n), a = void 0);
          f = void 0;
        };
        this._updateRecvTrack = function (e, t) {
          m.log("renderer._updateRecvTrack - attachMediaStream", "msi:", e, "track:", t);
          f = e;
          n._attachMediaStream(t ? new MediaStream([t]) : null);
        };
        this.subscribeVideoAsync = function (e) {
          return m.info("subscribeVideoAsync", "msi:", e), new Promise(function (t) {
            typeof e == "undefined" && (e = s.MSI.subscribeAny);
            if (!i) {
              var r = f !== e;
              r && n._unsubscribeIfSubscribed();
              u.isPending() && (u.resolve(), u = o.defer());
              if (e === s.MSI.unsubscribe || !r)
                u.resolve();
              else {
                if (!x.hasOwnProperty(e)) {
                  var l = o.defer(), c = [], h, p = !1, d = null, v = function () {
                      p || (c = [], l.isPending() && l.reject(), h && h.unsubscribe(), delete x[e], p = !0);
                    }, m = function () {
                      if (l.isPending())
                        for (var t = 0; t < C.length; t++) {
                          var n = C[t];
                          if (n && n.canSubscribe() && n.subscribe(e)) {
                            h = n;
                            l.resolve();
                            break;
                          }
                        }
                      if (h) {
                        var r = h.getRecvTrack();
                        r !== d && (d = r, c.forEach(function (t) {
                          t._updateRecvTrack(e, d);
                        }));
                      }
                    };
                  x[e] = {
                    add: function (e, t) {
                      l.promise.then(t.resolve, t.reject);
                      c.push(e);
                      m();
                    },
                    remove: function (e) {
                      var t = c.indexOf(e);
                      t !== -1 && (c.splice(t, 1), c.length === 0 && v());
                    },
                    update: m,
                    dispose: v
                  };
                }
                a = x[e];
                a.add(n, u);
              }
            }
            t(u.promise);
          });
        };
        this.dispose = function () {
          m.debug("disposing remote renderer");
          n._unsubscribeIfSubscribed();
          u.isPending() && u.reject(new Error("disposing"));
          i = !0;
          r();
        };
      };
      return new n(e, t);
    }
    function Z() {
      m.log("_deviceSelectionChanged");
      var e = o.hasSendDirectionality(k.audio), t = o.hasSendDirectionality(k.video);
      N.state !== N.TERMINATED && (e || t) && g.getMediaStreamRefAsync({
        audio: e,
        video: t
      }).then(function (n) {
        var r;
        e && (r = B(C, s.MEDIA_LABEL.audio), r.updateLocalMediaStream(n));
        t && (r = B(C, s.MEDIA_LABEL.video), r.updateLocalMediaStream(n));
        n.dispose();
      }).catch(function (e) {
        F({
          type: s.MEDIA_ERROR.internalError,
          detail: e
        });
      });
    }
    function et() {
      return N.state === N.TERMINATED ? D : (D = new Promise(function (e) {
        var t = {
            localStreams: [{ tracks: [] }],
            remoteStreams: [{ tracks: [] }]
          }, n = B(C, s.MEDIA_LABEL.audio), r = B(C, s.MEDIA_LABEL.video);
        n && n.getSendTrack() && t.localStreams[0].tracks.push({
          stream: null,
          track: n.getSendTrack()
        });
        r && r.getSendTrack() && t.localStreams[0].tracks.push({
          stream: null,
          track: r.getSendTrack()
        });
        n && n.getRecvTrack() && t.remoteStreams[0].tracks.push({
          stream: null,
          track: n.getRecvTrack()
        });
        r && r.getRecvTrack() && t.remoteStreams[0].tracks.push({
          stream: null,
          track: r.getRecvTrack()
        });
        Promise.all([
          n ? n.getReportsAsync() : {},
          r ? r.getReportsAsync() : {}
        ]).then(function (n) {
          t.ortc = {
            CorrelationId: f,
            mainAudio: n[0],
            mainVideo: n[1]
          };
          e(t);
        }).catch(function (n) {
          m.error("getting statistics should never fail:", n);
          e(t);
        });
      }), D);
    }
    function tt() {
      m.log("terminate");
      et().then(function () {
        N.change(N.TERMINATED);
        _.stop();
        U();
        q();
        C.forEach(function (e) {
          e.terminate();
        });
        y._onTerminated && y._onTerminated(y);
      });
    }
    this.configureModalitiesAsync = W;
    this.processOfferAsync = X;
    this.createAnswerAsync = V;
    this.createOfferAsync = $;
    this.processAnswerAsync = J;
    this.completeNegotiationAsync = Q;
    this.rejectNegotiationAsync = G;
    this.createRemoteRenderer = Y;
    this.getStatsAsync = et;
    this.terminate = tt;
    this._deviceSelectionChanged = Z;
    this._onTerminated = null;
    this.onNegotiationRequired = null;
    this.onContributingSourcesChanged = null;
    this.onSessionErrorOccurred = null;
    var l = a.maContext.settings, c = a.config.isConference && l.numVideoChannelsGvc ? l.numVideoChannelsGvc : 1, h = Math.floor(Math.random() * 4294967295), p = {
        min: h,
        max: h
      }, d = h + 1, v = 100, m = a.getLogger(), g = a.getDeviceManager(), y = this, b = !0, w = null, E = new n(m, l, c), S = null, x = {}, T = new r(), N = new u(), C = [], k = {}, L, A, O = !1, M = {
        triggerIceReinvite: function () {
          if (l.disableIceReinvite) {
            m.log("ICE-reinvite disabled - triggerIceReinvite skipped");
            return;
          }
          m.log("triggerIceReinvite");
          z(!0);
        },
        raiseError: F
      }, _ = new e(m, l, M, a.maContext.getRelayManager(), a.config.isRemoteClientLync, b), D = Promise.resolve({});
    m.log("create session", "config:", a.config);
  }
  return {
    build: function (e, t, n) {
      return new a(e, t, n);
    }
  };
});

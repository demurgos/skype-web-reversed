(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/ortc/ortcSession", [
      "require",
      "exports",
      "./ortcTransport",
      "./ortcMediaChannel",
      "./ortcNegotiation",
      "./ortcSdp",
      "../common/ssrcGenerator",
      "./ortcVideoRendererGroup",
      "./ortcHelper",
      "../constants",
      "./ortcConstants",
      "../helper",
      "../common/utils",
      "../extensions/extensionsManager",
      "../common/activeSpeaker/activeSpeakerManager",
      "../common/activeSpeaker/dshGeneratingStrategy"
    ], e);
}(function (e, t) {
  function m() {
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
  function g(e, t, g) {
    function q(e, t) {
      e.type = e.type || f["default"].MEDIA_ERROR.iceConnectionError;
      e.detail = e.detail || "none";
      var n = Y(M, f["default"].MEDIA_LABEL.audio) || M[0];
      n && n.transportId === t && (E.error("primary transport disconnected, ending call"), et(e));
    }
    function R(e) {
      var t = Y(M, f["default"].MEDIA_LABEL.audio);
      t && t.transportId === e && (E.log("audio channel transport connected"), tt("active"));
    }
    function Q(e) {
      if (e === f["default"].MEDIA_TYPE.audio)
        return l.MediaChannelType.Audio;
      if (e === f["default"].MEDIA_TYPE.video)
        return l.MediaChannelType.Video;
      throw new Error("Error in media descriptors descr.type: " + e);
    }
    function G(e) {
      var t = 0;
      for (var n = 0; n < e.length; n++) {
        if (e[n].label === f["default"].MEDIA_LABEL.audio && !M[n]) {
          var i = E.createChild("AStrm_" + e[n].mediaId + ":");
          M[n] = new r["default"](e[n].mediaId, i, y, Q(e[n].type), e[n].label, T, X, !1);
        } else if (e[n].label === f["default"].MEDIA_LABEL.video) {
          if (!M[n]) {
            var i = E.createChild("VStrm_" + e[n].mediaId + ":");
            M[n] = new r["default"](e[n].mediaId, i, y, Q(e[n].type), e[n].label, T, X, !1);
          }
          t++;
        } else if (e[n].label === f["default"].MEDIA_LABEL.sharing && !M[n]) {
          var i = E.createChild("SStrm_" + e[n].mediaId + ":"), s = !e[n].send;
          M[n] = new r["default"](e[n].mediaId, i, y, Q(e[n].type), e[n].label, T, X, s);
        }
        M[n] && (M[n].setMute(x), M[n].preconfigureChannel(e[n]));
        if (M[n] && M[n].getLabel() !== e[n].label)
          throw new Error("Error in media descriptors ch.label: " + M[n].getLabel() + " descr.label: " + e[n].label);
      }
    }
    function Y(e, t) {
      for (var n = 0; n < e.length; n++)
        if (e[n].getLabel() === t)
          return e[n];
      return null;
    }
    function Z() {
      var e = [];
      for (var t = 0; t < M.length; t++)
        M[t] && (e[t] = M[t].getLocalParameters());
      return e;
    }
    function et(e) {
      E.error("Media error occurred", "type:", e.type, "detail:", e.detail);
      T.onSessionErrorOccurred && T.onSessionErrorOccurred(e);
    }
    function tt(e) {
      E.log("audio state changed to", e);
      if (T.onAudioStateChanged) {
        var t = {
          content: "audio",
          direction: "receive",
          stream: e
        };
        T.onAudioStateChanged(t);
      }
    }
    function nt(e) {
      if (e) {
        var t = {};
        return h["default"].forOwn(e, function (e, n) {
          try {
            t[n] = typeof e == "function" ? t[n] = e() : t[n] = e;
          } catch (r) {
            t[n] = "error: " + r;
          }
        }), JSON.stringify(t);
      }
    }
    function rt(e) {
      e ? E.error("_audio.onerror", nt(e)) : E.error("_audio.onerror", "error:", L ? L.error : "<no audio element>");
    }
    function it(e) {
      L ? (L.removeEventListener("error", rt), L.addEventListener("error", rt), window.detachMediaStream(L)) : (L = document.createElement("audio"), document.body.appendChild(L), L.autoplay = !0, L.addEventListener("error", rt));
      var t = new MediaStream([e]);
      window.attachMediaStream(L, t);
    }
    function st() {
      L && (L.removeEventListener("error", rt), document.body.removeChild(L), window.detachMediaStream(L), L = null);
    }
    function ot(e) {
      O.state === O.STABLE && !O.changing ? (O.change(O.NEGOTIATION_REQUESTED), E.log("triggerNegotiation", "mods:", JSON.stringify(D), "force:", e), B = !1, T.onNegotiationRequired && T.onNegotiationRequired()) : e && (B = !0);
    }
    function ut(e) {
      var t = V.then(function () {
        return new Promise(function (t) {
          if (!e || !e.audio && !e.video && !e.sharing)
            throw new Error("Invalid parameters!" + JSON.stringify(e));
          var n = !D || !c["default"].areNegotiatedDirectionsFulfilled(e, _);
          D = e;
          n && ot();
          t(D);
        });
      });
      return V = t["catch"](function (e) {
        E.warn("Error during configuring modalities: ", e);
      }), t;
    }
    function at(e) {
      return new Promise(function (t) {
        j = !1;
        var n = e.blob;
        E.debug("PROCESS OFFER", "sdp:", n);
        O.change(O.HAVE_REMOTE_OFFER);
        var r;
        r = A.sdpToParams(n);
        k.processOffer(r);
        C = r.transportParams;
        P = c["default"].invertModalities(a["default"].getModalitiesFromMedia(r.media));
        t(P);
      });
    }
    function ft(e) {
      var t = 0;
      return e.forEach(function (e) {
        e.needsTransport && t++;
      }), t;
    }
    function lt(e) {
      return new Promise(function (t) {
        if (e)
          O.change(O.HAVE_LOCAL_PRANSWER, !0), H = {
            audio: "sendrecv",
            video: "sendrecv",
            sharing: "sendrecv"
          };
        else {
          O.change(O.HAVE_LOCAL_ANSWER, !0);
          if (!D)
            throw new Error("Modalities not configured for answer");
          H = c["default"].excludePassiveModalities(D, $, P);
        }
        var n = k.createMediaDescriptorsForAnswer(H), r = U.assureInitAsync("controlled", ft(n)).then(function () {
            return U.waitIceCompletionIfNeededAsync(C).then(function () {
              return U.getLocalParamsAsync().then(function (t) {
                G(n);
                var r = k.createAnswer(n, t, Z(), e);
                O.complete();
                var i = A.paramsToSdp(r);
                return E.debug(e ? "CREATE PRANSWER" : "CREATE ANSWER", "sdp:", i), {
                  blob: i,
                  modalities: H
                };
              });
            });
          });
        t(r);
      });
    }
    function ct() {
      return new Promise(function (e) {
        j = !0;
        O.change(O.HAVE_LOCAL_OFFER, !0);
        H = c["default"].excludePassiveModalities(D, $, P);
        P = H;
        if (c["default"].hasSendDirectionality(H.sharing) && !y.allowSendScreensharing)
          throw new Error("unsupported shreensharing send directionality in _negotiatingModalities" + JSON.stringify(H));
        var t = k.createMediaDescriptorsForOffer(H), n = U.assureInitAsync("controlling", ft(t)).then(function () {
            return U.getLocalParamsAsync().then(function (e) {
              G(t);
              var n = k.createOffer(t, e, Z());
              O.complete();
              var r = A.paramsToSdp(n);
              return E.debug("CREATE OFFER", "sdp:", r), {
                blob: r,
                modalities: H
              };
            });
          });
        e(n);
      });
    }
    function ht(e, t) {
      return new Promise(function (n) {
        var r = e.blob;
        E.debug(t ? "PROCESS PRANSWER" : "PROCESS ANSWER", "sdp:", r);
        if (t)
          O.change(O.HAVE_REMOTE_PRANSWER), E.log("ignoring provisional answer"), n();
        else {
          O.change(O.HAVE_REMOTE_ANSWER);
          var i;
          i = A.sdpToParams(r);
          k.processAnswer(i);
          n(c["default"].invertModalities(a["default"].getModalitiesFromMedia(i.media)));
        }
      });
    }
    function pt(e) {
      var t = a["default"].findDescrFromMedia(e, f["default"].MEDIA_LABEL.audio), n = a["default"].findDescrFromMedia(e, f["default"].MEDIA_LABEL.video), r = a["default"].findDescrFromMedia(e, f["default"].MEDIA_LABEL.sharing);
      return t.send || n.send || r.send ? S._getMediaStream({
        audio: t.send,
        video: n.send || r.send
      }) : null;
    }
    function dt(e) {
      var t = [];
      return e.forEach(function (e) {
        e.descr.enabled && t.indexOf(e.descr.transportId) === -1 && t.push(e.descr.transportId);
      }), t;
    }
    function vt() {
      return new Promise(function (e) {
        O.change(O.STABLE, !0);
        var t = k.completeNegotiation(), n = t.media, r = pt(n), i = function (e) {
            var t = arguments[1];
            r && r.dispose();
            if (e)
              return t;
            throw t;
          };
        e(Promise.all([
          U.configureTransportAsync(t, dt(n)),
          r ? r.start() : Promise.resolve()
        ]).then(function () {
          St();
          for (var e = 0; e < n.length; e++)
            if (n[e].descr.label === f["default"].MEDIA_LABEL.audio) {
              var t = M[e].getRecvTrack();
              M[e].configureChannel(n[e], U.getTransportById(n[e].descr.transportId), r);
              M[e].getRecvTrack() && M[e].getRecvTrack() !== t ? it(M[e].getRecvTrack()) : !M[e].getRecvTrack() && t && st();
            } else
              n[e].descr.label === f["default"].MEDIA_LABEL.video ? M[e].configureChannel(n[e], U.getTransportById(n[e].descr.transportId), r) : n[e].descr.label === f["default"].MEDIA_LABEL.sharing && M[e].configureChannel(n[e], U.getTransportById(n[e].descr.transportId), r);
          mt();
          O.complete();
          _ = a["default"].getModalitiesFromMedia(n);
          var i = c["default"].excludePassiveModalities(D, $, P), s = B || !c["default"].areNegotiatedDirectionsAcceptable(i, H, _);
          return s && ot(), E.log("_completeNegotiationAsync: configured:", JSON.stringify(D), "_negotiatingModalities:", JSON.stringify(H), "activeModalities:", JSON.stringify(_)), {
            isComplete: !s,
            activeModalities: _,
            offeredModalities: P,
            attemptedModalities: H,
            configuredModalities: D,
            initiator: j
          };
        }).then(i.bind(null, !0), i.bind(null, !1)));
      });
    }
    function mt() {
      W.update(M.filter(function (e) {
        return f["default"].MEDIA_LABEL.video === e.getLabel() || f["default"].MEDIA_LABEL.sharing === e.getLabel();
      }));
    }
    function gt(e, t) {
      return new Promise(function (n) {
        var r = e === f["default"].RENEGOTIATION_ERROR.local;
        O.state = O.STABLE;
        E.error("negotiation failed", "error:", e);
        t && (E.log("retrying failed negotiation"), ot());
        n({
          isComplete: r,
          activeModalities: _,
          offeredModalities: P,
          attemptedModalities: H,
          configuredModalities: D,
          initiator: j
        });
      });
    }
    function yt(e, t) {
      return W.create(e, t);
    }
    function bt() {
      E.log("_deviceSelectionChanged");
      var e = c["default"].hasSendDirectionality(_.audio), t = c["default"].hasSendDirectionality(_.video);
      if (!Et() && (e || t)) {
        var n = S._getMediaStream({
          audio: e,
          video: t
        });
        n.start().then(function () {
          var r;
          e && (r = Y(M, f["default"].MEDIA_LABEL.audio), r.updateLocalMediaStream(n));
          t && (r = Y(M, f["default"].MEDIA_LABEL.video), r.updateLocalMediaStream(n));
          n.dispose();
        })["catch"](function (e) {
          et({
            type: f["default"].MEDIA_ERROR.internalError,
            detail: e
          });
          n.dispose();
        });
      }
    }
    function wt() {
      return Et() ? z : (z = new Promise(function (e) {
        var n = { type: "OrtcMediaStats" };
        n.localStreams = [{ tracks: [] }];
        n.remoteStreams = [{ tracks: [] }];
        var r = Y(M, f["default"].MEDIA_LABEL.audio), i = Y(M, f["default"].MEDIA_LABEL.video), s = Y(M, f["default"].MEDIA_LABEL.sharing);
        r && r.getSendTrack() && n.localStreams[0].tracks.push({
          stream: null,
          track: r.getSendTrack()
        });
        i && i.getSendTrack() && n.localStreams[0].tracks.push({
          stream: null,
          track: i.getSendTrack()
        });
        s && s.getSendTrack() && n.localStreams[0].tracks.push({
          stream: null,
          track: s.getSendTrack()
        });
        r && r.getRecvTrack() && n.remoteStreams[0].tracks.push({
          stream: null,
          track: r.getRecvTrack()
        });
        i && i.getRecvTrack() && n.remoteStreams[0].tracks.push({
          stream: null,
          track: i.getRecvTrack()
        });
        s && s.getRecvTrack() && n.remoteStreams[0].tracks.push({
          stream: null,
          track: s.getRecvTrack()
        });
        Promise.all([
          r ? r.getReportsAsync() : {},
          i ? i.getReportsAsync() : {},
          s ? s.getReportsAsync() : {}
        ]).then(function (r) {
          n.ortc = {
            CorrelationId: t,
            mainAudio: r[0],
            mainVideo: r[1],
            appsharingVideo: r[2]
          };
          e(n);
        })["catch"](function (t) {
          E.error("getting statistics should never fail:", t);
          e(n);
        });
      }), z);
    }
    function Et() {
      return O.state === O.TERMINATED;
    }
    function St() {
      if (Et())
        throw new Error("session is already terminated");
    }
    function xt() {
      return E.log("terminate"), J.dispose(), wt().then(function () {
        O.change(O.TERMINATED);
        U.stop();
        st();
        W.terminate();
        M.forEach(function (e) {
          e.terminate();
        });
        T._onTerminated && T._onTerminated(T);
      });
    }
    function Tt() {
      return Ct(!0);
    }
    function Nt() {
      return Ct(!1);
    }
    function Ct(e) {
      return x = e, M.forEach(function (t) {
        t.setMute(e);
      }), Promise.resolve();
    }
    function kt(e) {
      var t = Y(M, f["default"].MEDIA_LABEL.audio);
      return t ? t.sendDtmf(e) : Promise.reject(new Error("no audio channel"));
    }
    function Lt() {
      var e = Y(M, f["default"].MEDIA_LABEL.audio);
      return e ? e.canSendDtmf() : !1;
    }
    function At() {
      return J;
    }
    this.configureModalitiesAsync = ut;
    this.processOfferAsync = at;
    this.createAnswerAsync = lt;
    this.createOfferAsync = ct;
    this.processAnswerAsync = ht;
    this.completeNegotiationAsync = vt;
    this.rejectNegotiationAsync = gt;
    this.createRemoteRenderer = yt;
    this.sendDtmf = kt;
    this.canSendDtmf = Lt;
    this.getStatsAsync = wt;
    this.terminate = xt;
    this.muteInputAsync = Tt;
    this.unmuteInputAsync = Nt;
    this._deviceSelectionChanged = bt;
    this._onTerminated = null;
    this.onNegotiationRequired = null;
    this.onContributingSourcesChanged = null;
    this.onSessionErrorOccurred = null;
    this.getExtensionsManager = At;
    var y = e.maContext.settings, b = e.config.iceTransportPolicy ? e.config.iceTransportPolicy : f["default"].ICE_TRANSPORT_POLICY.all, w = e.config.isConference && y.numVideoChannelsGvc ? y.numVideoChannelsGvc : 1, E = e.getLogger().createChild("ortc"), S = e.getDeviceManager(), x = e.config.muted, T = this, N = !0, C = null, k = new i["default"](E, y, w), L = null, A = new s["default"](), O = new m(), M = [], _ = {}, D, P, H, B = !1, j = !1, F = {
        triggerIceReinvite: function () {
          if (y.disableIceReinvite) {
            E.log("ICE-reinvite disabled - triggerIceReinvite skipped");
            return;
          }
          E.log("triggerIceReinvite");
          ot(!0);
        },
        onConnected: R,
        onError: q
      }, I = !1, U = new n["default"](E, y, F, e.maContext.getRelayManager(), e.config.isRemoteClientLync, b, N), z = Promise.resolve({}), W = u["default"].build({
        logger: E,
        settings: y
      }), X = new o["default"](), V = Promise.resolve(), $ = e.config.passiveModalities, J = new p["default"](), K = new d.ActiveSpeakerManager(g.onContributingSourcesChanged, g.onDominantSpeakerChanged);
    K.setStrategy(new v.DSHGeneratingStrategy(e.maContext.settings.activeSpeaker));
    E.log("create session", "config:", e.config);
    this.onError = function (e) {
      et(e);
    };
    this.onMediaCapabilitiesChanged = function (e, t) {
      k.onMediaCapabilitiesChanged(e, t);
      O.state !== O.HAVE_LOCAL_ANSWER && ot(!0);
    };
    this.onContributingSourcesChanged = function (e) {
      O.state === O.STABLE && !O.changing && K.onContributingSourcesChanged(e);
    };
  }
  var n = e("./ortcTransport"), r = e("./ortcMediaChannel"), i = e("./ortcNegotiation"), s = e("./ortcSdp"), o = e("../common/ssrcGenerator"), u = e("./ortcVideoRendererGroup"), a = e("./ortcHelper"), f = e("../constants"), l = e("./ortcConstants"), c = e("../helper"), h = e("../common/utils"), p = e("../extensions/extensionsManager"), d = e("../common/activeSpeaker/activeSpeakerManager"), v = e("../common/activeSpeaker/dshGeneratingStrategy");
  t.__esModule = !0;
  t["default"] = {
    build: function (e, t, n) {
      return new g(e, t, n);
    }
  };
}));

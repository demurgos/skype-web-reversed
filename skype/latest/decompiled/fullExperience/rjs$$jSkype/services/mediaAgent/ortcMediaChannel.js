define("jSkype/services/mediaAgent/ortcMediaChannel", [
  "./ortcHelper",
  "./constants",
  "./ortcChannelStats"
], function (e, t, n) {
  function r(r, i, s, o, u, a) {
    function w() {
      var e = RTCRtpReceiver.getCapabilities(s), n;
      if (e.codecs)
        if (s === t.MEDIA_TYPE.audio && i.audioCodec) {
          var r = [
            "cn",
            "red"
          ];
          for (n = e.codecs.length - 1; n >= 0; n--) {
            var o = e.codecs[n].name.toLowerCase();
            o !== i.audioCodec.toLowerCase() && r.indexOf(o) === -1 && e.codecs.splice(n, 1);
          }
        } else if (s === t.MEDIA_TYPE.video && i.videoCodec)
          for (n = e.codecs.length - 1; n >= 0; n--)
            e.codecs[n].name.toLowerCase() !== i.videoCodec.toLowerCase() && e.codecs.splice(n, 1);
      if (s === t.MEDIA_TYPE.audio)
        for (n = e.codecs.length - 1; n >= 0; n--)
          e.codecs[n].preferredPayloadType === 106 && (e.codecs[n].preferredPayloadType = 111);
      return e;
    }
    function E(e) {
      return e.cryptoSuite !== "SCALE_AES_CM_128_HMAC_SHA1_80";
    }
    function S(e) {
      var t, n, i;
      T() ? (n = h.getObject().getAudioTracks()[0], t = e.getObject().getAudioTracks()) : (n = h.getObject().getVideoTracks()[0], t = e.getObject().getVideoTracks());
      i = t.length ? t[0] : null;
      if (i === null) {
        r.error("media track is not available");
        return;
      }
      var s = n.getSettings().deviceId, o = i.getSettings().deviceId;
      s !== o ? (r.log("replacing media track", "currDevID:", s, "newDevID:", o, "currTrackID:", n.id, "newTrackID:", i.id), l.setTrack(i), h.dispose(), h = e.clone()) : r.log("NOT replacing media track", "currDevID:", s, "newDevID:", o, "currTrackID:", n.id, "newTrackID:", i.id);
    }
    function x(e, n) {
      p || (r.debug("RTCSrtpSdesTransport", "local:", JSON.stringify(n.sdesParamsList[0]), "remote:", JSON.stringify(n.remoteSdesParams)), p = new RTCSrtpSdesTransport(e, n.sdesParamsList[0], n.remoteSdesParams), p.onerror = function (e) {
        r.log("RTCSrtpSdesTransport.onerror", "event:", e);
        u({
          type: t.MEDIA_ERROR.srtpError,
          detail: e
        });
      });
    }
    function T() {
      return s === t.MEDIA_TYPE.audio;
    }
    function N() {
      return s === t.MEDIA_TYPE.video;
    }
    function C() {
      p && (p = null);
    }
    function k() {
      if (c) {
        var e;
        try {
          e = c.getContributingSources();
        } catch (t) {
          r.error("failed to retrieve contributing sources from receiver", "error:", t);
          return;
        }
        if (!e) {
          r.warn("could not retrieve contributing sources from receiver");
          return;
        }
        e = e.map(function (e) {
          return e.csrc;
        });
        var n = y.length === e.length && e.every(function (e, t) {
          return e === y[t];
        });
        n || (r.debug("contributing sources changed", "sources:", e), f.onContributingSourcesChanged && f.onContributingSourcesChanged(e));
        y = e;
        setTimeout(k, m);
      } else
        r.debug("receiver is missing, stop polling for contributing sources");
    }
    function L(e) {
      if (c) {
        r.log("_requestSendCsrc", "csrc:", e);
        try {
          c.requestSendCSRC(e);
        } catch (t) {
          r.error("failed to request send csrc", "error:", t);
        }
        return !0;
      }
      return !1;
    }
    function A(e, n) {
      r.log("_rtpReceiver create");
      if (n.enableDtls) {
        if (!n.rtcpMux)
          throw new Error("rtcpMux=false not supported with dtls!");
        c = new RTCRtpReceiver(e.dtlsTransport, s);
      } else
        x(e.iceTransport, n), c = new RTCRtpReceiver(p, s);
      g = c.track;
      c.onerror = function (e) {
        r.error("_rtpReceiver.onerror", "event:", e);
        u({
          type: t.MEDIA_ERROR.internalError,
          detail: e
        });
      };
    }
    function O(e, n, i) {
      var s;
      T() ? s = n.getObject().getAudioTracks()[0] : s = n.getObject().getVideoTracks()[0];
      r.log("_rtpSender create trackID:", s.id);
      if (i.enableDtls) {
        if (!i.rtcpMux)
          throw new Error("rtcpMux=false not supported with dtls!");
        l = new RTCRtpSender(s, e.dtlsTransport);
      } else
        x(e.iceTransport, i), l = new RTCRtpSender(s, p);
      l.onerror = function (e) {
        r.error("_rtpSender.onerror", "event:", e);
        u({
          type: t.MEDIA_ERROR.internalError,
          detail: e
        });
      };
      l.onssrcconflict = function (e) {
        r.error("_rtpSender.onssrcconflict", "event:", e);
      };
    }
    function M(t) {
      return e.getRecvParams(t.rtpCaps, t.remoteSsrcRange, a.min, t.rtcpReducedSize, t.rtcpMux);
    }
    function _(t) {
      return e.getSendParams(t.rtpCaps, a, t.remoteSsrcRange.min, t.rtcpReducedSize, t.rtcpMux);
    }
    function D(e, n) {
      function i() {
        var n = M(e);
        r.debug("_rtpReceiver.receive:", JSON.stringify(n));
        c.receive(n);
        T() ? k() : f.subscribedMsi !== t.MSI.unsubscribe && L(f.subscribedMsi);
      }
      c && j(e) && (r.log("SSRC changed, resetting receiver"), c.stop(), c = null);
      c ? v && i() : (A(n, e), i());
    }
    function P() {
      c && (r.log("_rtpReceiver stop & destroy"), c.stop(), c = null, g = null, l || C());
    }
    function H(e, t, n) {
      function i() {
        var t = _(e);
        r.debug("_rtpSender.send:", JSON.stringify(t));
        l.send(t);
        h ? S(n) : h = n.clone();
      }
      l && j(e) && (r.log("SSRC changed, resetting sender"), l.stop(), l = null);
      l ? v && i() : (O(t, n, e), i());
    }
    function B() {
      l && (r.log("_rtpSender stop & destroy"), l.stop(), l = null, c || C(), h.dispose(), h = null);
    }
    function j(e) {
      return b && e.remoteSsrcRange && (b.min !== e.remoteSsrcRange.min || b.max !== e.remoteSsrcRange.max);
    }
    function F(e) {
      if (!v) {
        if (c) {
          var t = M(e);
          r.debug("_rtpReceiver.receive:", JSON.stringify(t));
          r.log("_rtpReceiver.receive ACTIVE -> INACTIVE");
          t.encodings[0].active = !1;
          c.receive(t);
        }
        if (l) {
          var n = _(e);
          r.debug("_rtpSender.send", "params:", JSON.stringify(n));
          r.log("_rtpSender.send ACTIVE -> INACTIVE");
          n.encodings[0].active = !1;
          l.send(n);
        }
        v = !0;
      }
    }
    var f = this, l = null, c = null, h = null, p = null, d = null, v = !1, m = 1000, g = null, y = [], b = null;
    this.type = s;
    this.label = o;
    this.subscribedMsi = t.MSI.unsubscribe;
    this.onContributingSourcesChanged = null;
    i.disableSdes || (d = RTCSrtpSdesTransport.getLocalParameters().filter(E));
    this.getLocalParameters = function () {
      return {
        sdesParamsList: d,
        rtpCaps: w(),
        ssrcRange: a
      };
    };
    this.configureChannel = function (e, t, n) {
      r.log("configureChannel", "type:", s, "descr:", JSON.stringify(n.descr));
      if (n.descr.enabled) {
        var i = !n.descr.send && !n.descr.recv;
        i ? F(n) : (n.descr.recv ? D(n, e) : P(), n.descr.send ? H(n, e, t) : B(), v = !1);
        b = n.remoteSsrcRange;
      } else
        P(), B();
    };
    this.updateLocalMediaStream = function (e) {
      l && S(e);
    };
    this.canSubscribe = function () {
      return c && f.subscribedMsi === t.MSI.unsubscribe && N();
    };
    this.subscribe = function (e) {
      if (f.subscribedMsi === t.MSI.unsubscribe && N())
        return f.subscribedMsi = e, L(f.subscribedMsi);
      throw new Error("invalid call for subscribe:" + f.subscribedMsi + "type:" + s);
    };
    this.unsubscribe = function () {
      if (f.subscribedMsi === t.MSI.unsubscribe || !N())
        throw new Error("invalid call for unsubscribe:" + f.subscribedMsi + "type:" + s);
      f.subscribedMsi = t.MSI.unsubscribe;
      L(f.subscribedMsi);
    };
    this.getReportsAsync = function () {
      var e = c ? c.transport.transport : l ? l.transport.transport : null, t = n.build({ logger: r }, e, l, c);
      return t.getReport();
    };
    this.getSendTrack = function () {
      return l && !v ? l.track : null;
    };
    this.getRecvTrack = function () {
      return v ? null : g;
    };
    this.terminate = function () {
      l = null;
      c = null;
      g = null;
      C();
      h && (h.dispose(), h = null);
      r.log("termiated");
    };
  }
  return r;
});

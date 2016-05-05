define("jSkype/services/mediaAgent/ortcTransport", [
  "./constants",
  "./helper"
], function (e, t) {
  function n(n, r, i, s, o, u, a) {
    var f = this, l = t.defer(), c, h;
    this.nominatedCandidatePair = null, r.log("create RTCIceGatherer", "options:", JSON.stringify(o.iceGathererOptions)), u ? this.iceGatherer = u.createAssociatedGatherer() : this.iceGatherer = new RTCIceGatherer(o.iceGathererOptions), r.log("create RTCIceTransport"), a ? this.iceTransport = a.createAssociatedTransport() : this.iceTransport = new RTCIceTransport(), this.getLocalCandidatesAsync = function () {
      return l.promise;
    }, this.start = function (e, t) {
      if (h)
        throw new Error("already started!");
      h = !0, c = i.createCb(o.iceRole), r.log("RTCIceTransport setRemoteCandidates", "candidates:", JSON.stringify(e)), f.iceTransport.setRemoteCandidates(e), r.log("RTCIceTransport start", "remoteIceParams:", JSON.stringify(t), "role:", o.iceRole), f.iceTransport.start(f.iceGatherer, t, o.iceRole), r.log("RTCIceTransport start", "role:", f.iceTransport.role);
    }, this.dispose = function () {
      r.log("dispose"), f.iceTransport.stop(), f.iceTransport = null, f.iceGatherer = null, l.isPending() && l.reject(new Error("operation canceled due to stop")), c && c.dispose();
    }, this.iceGatherer.onlocalcandidate = function (e) {
      r.log("RTCIceGatherer.onlocalcandidate", "candidate:", JSON.stringify(e.candidate)), Object.keys(e.candidate).length === 0 && l.resolve();
    }, this.iceGatherer.onerror = function (e) {
      r.error("RTCIceGatherer.onerror", "event:", e), l.reject(new Error("IceGatherer failed!"));
    }, this.iceTransport.onicestatechange = function () {
      f.iceTransport && (r.log("RTCIceTransport.onicestatechange", "state:", f.iceTransport.state), f.iceTransport.state === "completed" && (r.log("pair:", JSON.stringify(f.iceTransport.getNominatedCandidatePair())), f.nominatedCandidatePair = f.iceTransport.getNominatedCandidatePair(), c.iceCompleted()), n === "audio" && f.iceTransport.state === "disconnected" && (r.error("audio ICE transport disconnected, ending call!"), s({
        type: e.MEDIA_ERROR.iceConnectionError,
        detail: "ice transport disconnected"
      })));
    }, this.iceTransport.oncandidatepairchange = function (e) {
      r.log("RTCIceTransport.oncandidatepairchange", "event:", e);
    };
  }
  function r(t, n, r) {
    var i = this, s = !1;
    this.dtlsTransport = new RTCDtlsTransport(n), this.dtlsTransport.ondtlsstatechange = function () {
      t.log("RTCDtlsTransport.ondtlsstatechange", "state:", event.state, "role:", i.dtlsTransport ? i.dtlsTransport.getLocalParameters().role : "");
    }, this.dtlsTransport.onerror = function (n) {
      t.error("RTCDtlsTransport.onerror", "event:", n), r({
        type: e.MEDIA_ERROR.srtpError,
        detail: n
      });
    }, this.startAsync = function (e) {
      if (s)
        throw new Error("already started!");
      return s = !0, t.log("RTCDtlsTransport.start", "params:", JSON.stringify(e)), i.dtlsTransport.start(e), Promise.resolve();
    }, this.dispose = function () {
      s && i.dtlsTransport.stop(), i.dtlsTransport = null;
    };
  }
  function i(e, t, i, s, o, u) {
    function h(e) {
      var t = e;
      if (o.iceCandidateType || o.iceCandidateTransport)
        t = t.filter(function (e) {
          var t = !0, n = !0;
          return o.iceCandidateType && (t = e.type.match(new RegExp(o.iceCandidateType), "i")), o.iceCandidateTransport && (n = e.protocol.match(new RegExp(o.iceCandidateTransport, "i"))), t && n;
        });
      return t;
    }
    function p() {
      return {
        iceParams: a.iceGatherer.getLocalParameters(),
        iceCandidates: h(a.iceGatherer.getLocalCandidates()),
        iceCandidatePair: a.nominatedCandidatePair,
        dtlsParams: l ? l.dtlsTransport.getLocalParameters() : null,
        rtcpIceParams: f ? f.iceGatherer.getLocalParameters() : null,
        rtcpIceCandidates: f ? h(f.iceGatherer.getLocalCandidates()) : null,
        rtcpIceCandidatePair: f ? f.nominatedCandidatePair : null
      };
    }
    var a, f, l, c = !1;
    a = new n(e, t.createChild("IceT"), i, s, o), l = new r(t.createChild("DtlsT"), a.iceTransport, s), u && (f = new n(e, t.createChild("RtcpIceT"), i, s, o, a.iceGatherer, a.iceTransport)), Object.defineProperty(this, "iceTransport", {
      get: function () {
        return a.iceTransport;
      }
    }), Object.defineProperty(this, "dtlsTransport", {
      get: function () {
        return l ? l.dtlsTransport : null;
      }
    }), this.getLocalParamsAsync = function () {
      var e;
      return f ? e = Promise.all([
        a.getLocalCandidatesAsync(),
        f.getLocalCandidatesAsync()
      ]) : e = a.getLocalCandidatesAsync(), e.then(function () {
        return p();
      });
    }, this.startAsync = function (e) {
      if (c)
        throw new Error("already started!");
      var t = Promise.resolve();
      return c = !0, a.start(e.iceCandidates, e.iceParams), f && (e.doRtcpMux ? (f.dispose(), f = null) : f.start(e.rtcpIceCandidates, e.rtcpIceParams)), e.enableDtls && (t = l.startAsync(e.dtlsParams)), t;
    }, this.dispose = function () {
      t.log("dispose"), a.dispose(), a = null, f && (f.dispose(), f = null), l && (l.dispose(), l = null);
    };
  }
  function s(e, n) {
    function u(t) {
      this.dispose = function () {
        var e = r.indexOf(this);
        e !== -1 && r.splice(e, 1);
      }, this.gotCallback = !1, this.iceCompleted = function () {
        this.gotCallback = !0, this.gotCallbackFromControlling = t === "controlling";
        var u = 0, a = 0;
        for (var f = 0; f < r.length; f++)
          r[f].gotCallback && u++, r[f].gotCallbackFromControlling && a++;
        a && a === o && !i && (e.log("IceCompletionMonitor REINVITE"), i = !0, n.triggerIceReinvite()), u && u === r.length && (e.log("IceCompletionMonitor ALL COMPLETE"), s.resolve());
      };
    }
    var r = [], i = !1, s = t.defer(), o = 0;
    this.createCb = function (e) {
      var n = new u(e);
      return r.push(n), e === "controlling" && (i = !1, o++), s.reject(), s = t.defer(), n;
    }, this.waitAllCallbacksAsync = function () {
      return s.promise;
    };
  }
  function o(e, t, n, r, o, u) {
    function p() {
      return h || (h = r.queryRelaysAsync("msturn", o)), h;
    }
    var a, f, l = [
        !1,
        !1
      ], c = new s(e, n), h;
    Object.defineProperty(this, "audioTransport", {
      get: function () {
        return a ? a : null;
      }
    }), Object.defineProperty(this, "videoTransport", {
      get: function () {
        return f ? f : null;
      }
    }), this.assureInitAsync = function (r, s) {
      return new Promise(function (o) {
        e.log("assureInitAsync");
        var l = p().then(function (o) {
          var l = {
            iceRole: r,
            iceCandidateType: t.iceCandidateType,
            iceCandidateTransport: t.iceCandidateTransport,
            iceGathererOptions: {
              gatherPolicy: "all",
              iceServers: o.reduce(function (e, t) {
                return t.addresses.map(function (n) {
                  e.push({
                    urls: t.type + ":" + n + ":" + t.udpPort + "?transport=udp",
                    credential: t.password,
                    username: t.username
                  }), e.push({
                    urls: t.type + ":" + n + ":" + t.tcpPort + "?transport=tcp",
                    credential: t.password,
                    username: t.username
                  });
                }), e;
              }, [])
            }
          };
          !a && s[0] && (e.log("assureInitAsync AUDIO" + l.iceRole), a = new i("audio", e.createChild("AT"), c, n.raiseError, l, u)), !f && s[1] && (e.log("assureInitAsync VIDEO" + l.iceRole), f = new i("video", e.createChild("VT"), c, n.raiseError, l, u));
        });
        o(l);
      });
    }, this.getLocalParamsAsync = function () {
      return e.log("getLocalParamsAsync"), new Promise(function (e) {
        var t = Promise.resolve(), n = Promise.resolve();
        a && (t = a.getLocalParamsAsync()), f && (n = f.getLocalParamsAsync()), e(Promise.all([
          t,
          n
        ]));
      });
    }, this.waitIceCompletionIfNeededAsync = function (t) {
      return new Promise(function (n) {
        var r = "";
        if (t[0] && t[0].iceCandidatePair || t[1] && t[1].iceCandidatePair)
          e.log("waiting ICE completed state!"), r = c.waitAllCallbacksAsync();
        n(r);
      });
    }, this.configureTransportAsync = function (e, t) {
      return new Promise(function (n) {
        var r = Promise.resolve(), i = Promise.resolve();
        t[0] && !l[0] ? r = a.startAsync(e[0]) : !t[0] && l[0] && (a.dispose(), a = null), t[1] && !l[1] ? i = f.startAsync(e[1]) : !t[1] && l[1] && (f.dispose(), f = null), l = t, n(Promise.all([
          r,
          i
        ]));
      });
    }, this.stop = function () {
      a && (a.dispose(), a = null), f && (f.dispose(), f = null);
    };
  }
  return o;
})

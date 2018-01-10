(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/ortc/ortcTransport", [
      "require",
      "exports",
      "../constants",
      "../helper",
      "../common/utils",
      "./ortcHelper"
    ], e);
}(function (e, t) {
  function o(e, t, i, s, o, u, a) {
    var f = this, l = r["default"].defer(), c, h;
    this.nominatedCandidatePair = null;
    t.log("create RTCIceGatherer", "options:", JSON.stringify(o.iceGathererOptions));
    u ? this.iceGatherer = u.createAssociatedGatherer() : this.iceGatherer = new RTCIceGatherer(o.iceGathererOptions);
    t.log("create RTCIceTransport");
    a ? this.iceTransport = a.createAssociatedTransport() : this.iceTransport = new RTCIceTransport();
    this.getLocalCandidatesAsync = function () {
      return l.promise;
    };
    this.start = function (e, n) {
      if (h)
        throw new Error("icetransport already started!");
      h = !0;
      c = i.createCb(o.iceRole);
      t.log("RTCIceTransport setRemoteCandidates", "candidates:", JSON.stringify(e));
      f.iceTransport.setRemoteCandidates(e);
      t.log("RTCIceTransport start", "remoteIceParams:", JSON.stringify(n), "role:", o.iceRole);
      f.iceTransport.start(f.iceGatherer, n, o.iceRole);
      t.log("RTCIceTransport start", "role:", f.iceTransport.role);
    };
    this.dispose = function () {
      t.log("dispose");
      f.iceTransport.stop();
      f.iceTransport = null;
      f.iceGatherer = null;
      l.isPending() && l.reject(new Error("operation canceled due to stop"));
      c && c.dispose();
    };
    this.iceGatherer.onlocalcandidate = function (e) {
      t.log("RTCIceGatherer.onlocalcandidate", "candidate:", JSON.stringify(e.candidate));
      Object.keys(e.candidate).length === 0 && l.resolve();
    };
    this.iceGatherer.onerror = function (e) {
      t.error("RTCIceGatherer.onerror", "event:", e);
      l.reject(new Error("IceGatherer failed!"));
    };
    this.iceTransport.onicestatechange = function () {
      f.iceTransport && (t.log("RTCIceTransport.onicestatechange", "state:", f.iceTransport.state), f.iceTransport.state === "completed" ? (t.log("pair:", JSON.stringify(f.iceTransport.getNominatedCandidatePair())), f.nominatedCandidatePair = f.iceTransport.getNominatedCandidatePair(), c.iceCompleted(), s.onConnected(e)) : f.iceTransport.state === "connected" ? s.onConnected(e) : f.iceTransport.state === "disconnected" && (t.error("audio ICE transport disconnected, ending call!"), s.onError({
        type: n["default"].MEDIA_ERROR.iceConnectionError,
        detail: "ice transport disconnected"
      }, e)));
    };
    this.iceTransport.oncandidatepairchange = function (e) {
      t.log("RTCIceTransport.oncandidatepairchange", "event:", e);
    };
  }
  function u(e, t, r, i) {
    var s = this, o = !1;
    this.dtlsTransport = new RTCDtlsTransport(r);
    this.dtlsTransport.ondtlsstatechange = function () {
      t.log("RTCDtlsTransport.ondtlsstatechange", "state:", event.state, "role:", s.dtlsTransport ? s.dtlsTransport.getLocalParameters().role : "");
    };
    this.dtlsTransport.onerror = function (r) {
      t.error("RTCDtlsTransport.onerror", "event:", r);
      i.onError({
        type: n["default"].MEDIA_ERROR.srtpError,
        detail: r
      }, e);
    };
    this.startAsync = function (e) {
      if (o)
        throw new Error("dtlstransport already started!");
      return o = !0, t.log("RTCDtlsTransport.start", "params:", JSON.stringify(e)), s.dtlsTransport.start(e), Promise.resolve();
    };
    this.dispose = function () {
      o && s.dtlsTransport.stop();
      s.dtlsTransport = null;
    };
  }
  function f(e, t, r, i, s, f, l) {
    function g(e) {
      var t = e;
      if (s.iceCandidateType || s.iceCandidateTransport)
        t = t.filter(function (e) {
          var t = !0, n = !0;
          return s.iceCandidateType && (t = e.type.match(new RegExp(s.iceCandidateType), "i")), s.iceCandidateTransport && (n = e.protocol.match(new RegExp(s.iceCandidateTransport, "i"))), t && n;
        });
      return s.iceGathererOptions.gatherPolicy === n["default"].ICE_TRANSPORT_POLICY.relay && t.forEach(function (e) {
        e.relatedAddress = e.ip;
        e.relatedPort = e.port;
      }), t;
    }
    function y() {
      return {
        transportId: v.transportId,
        iceParams: c.iceGatherer.getLocalParameters(),
        iceCandidates: g(c.iceGatherer.getLocalCandidates()),
        iceCandidatePair: c.nominatedCandidatePair,
        sdesParamsList: l,
        dtlsParams: p ? p.dtlsTransport.getLocalParameters() : null,
        rtcpIceParams: h ? h.iceGatherer.getLocalParameters() : null,
        rtcpIceCandidates: h ? g(h.iceGatherer.getLocalCandidates()) : null,
        rtcpIceCandidatePair: h ? h.nominatedCandidatePair : null
      };
    }
    var c, h, p, d, v = this, m = !1;
    this.transportId = a++;
    c = new o(this.transportId, t.createChild("IceT"), r, i, s);
    p = new u(this.transportId, t.createChild("DtlsT"), c.iceTransport, i);
    f && (h = new o(this.transportId, t.createChild("RtcpIceT"), r, i, s, c.iceGatherer, c.iceTransport));
    Object.defineProperty(this, "transport", {
      get: function () {
        return !e.disableSdes && d ? d : p ? p.dtlsTransport : null;
      }
    });
    this.isStarted = function () {
      return m;
    };
    this.getLocalParamsAsync = function () {
      var e;
      return h ? e = Promise.all([
        c.getLocalCandidatesAsync(),
        h.getLocalCandidatesAsync()
      ]) : e = c.getLocalCandidatesAsync(), e.then(function () {
        return y();
      });
    };
    this.startAsync = function (e) {
      if (m)
        throw new Error("mediaTransport already started!");
      var r = Promise.resolve();
      return m = !0, c.start(e.iceCandidates, e.iceParams), h && (e.doRtcpMux ? (h.dispose(), h = null) : h.start(e.rtcpIceCandidates, e.rtcpIceParams)), e.enableDtls ? r = p.startAsync(e.dtlsParams) : d || (t.debug("RTCSrtpSdesTransport", "local:", JSON.stringify(e.sdesParamsList[0]), "remote:", JSON.stringify(e.remoteSdesParams)), d = new RTCSrtpSdesTransport(c.iceTransport, e.sdesParamsList[0], e.remoteSdesParams), d.onerror = function (e) {
        t.log("RTCSrtpSdesTransport.onerror", "event:", e);
        i.onError({
          type: n["default"].MEDIA_ERROR.srtpError,
          detail: e
        }, v.transportId);
      }), r;
    };
    this.dispose = function () {
      t.log("dispose");
      c.dispose();
      c = null;
      h && (h.dispose(), h = null);
      p && (p.dispose(), p = null);
    };
  }
  function l(e, t) {
    function a(r) {
      this.dispose = function () {
        i["default"].remove(n, function (e) {
          return e === this;
        });
      };
      this.gotCallback = !1;
      this.iceCompleted = function () {
        this.gotCallback = !0;
        this.gotCallbackFromControlling = r === "controlling";
        var i = 0, a = 0;
        for (var f = 0; f < n.length; f++)
          n[f].gotCallback && i++, n[f].gotCallbackFromControlling && a++;
        a && a === u && !s && (e.log("IceCompletionMonitor REINVITE"), s = !0, t.triggerIceReinvite());
        i && i === n.length && (e.log("IceCompletionMonitor ALL COMPLETE"), o.resolve());
      };
    }
    var n = [], s = !1, o = r["default"].defer(), u = 0;
    this.createCb = function (e) {
      var t = new a(e);
      return n.push(t), e === "controlling" && (s = !1, u++), o.reject(undefined), o = r["default"].defer(), t;
    };
    this.waitAllCallbacksAsync = function () {
      return o.promise;
    };
  }
  function c(e, t, r, i, o, u, a) {
    function m(e) {
      return e.cryptoSuite !== "SCALE_AES_CM_128_HMAC_SHA1_80";
    }
    function g() {
      return d || (d = i.queryRelaysAsync("msturn", o)), d;
    }
    function y(e, t) {
      return e.find(function (e) {
        return e.transportId === t;
      });
    }
    var c = [], h = !1, u = u ? u : n["default"].ICE_TRANSPORT_POLICY.all, p = new l(e, r), d, v = null;
    t.disableSdes || (v = RTCSrtpSdesTransport.getLocalParameters().filter(m));
    this.getTransportById = function (e) {
      return c[s["default"].getTransportIndexById(c, e)];
    };
    this.assureInitAsync = function (n, i) {
      return new Promise(function (s) {
        e.log("assureInitAsync", i);
        var o = g().then(function (s) {
          var o = {
            iceRole: n,
            iceCandidateType: t.iceCandidateType,
            iceCandidateTransport: t.iceCandidateTransport,
            iceGathererOptions: {
              gatherPolicy: u,
              iceServers: s.reduce(function (e, t) {
                return t.addresses.map(function (n) {
                  e.push({
                    urls: t.type + ":" + n + ":" + t.udpPort + "?transport=udp",
                    credential: t.password,
                    username: t.username
                  });
                  e.push({
                    urls: t.type + ":" + n + ":" + t.tcpPort + "?transport=tcp",
                    credential: t.password,
                    username: t.username
                  });
                }), e;
              }, [])
            }
          };
          for (var l = c.length; l < i; l++) {
            e.log("assureInitAsync " + l + o.iceRole);
            var h = {
                onError: r.onError,
                onConnected: r.onConnected
              }, d = new f(t, e.createChild("MT" + l), p, h, o, a, v);
            c.push(d);
          }
        });
        s(o);
      });
    };
    this.getLocalParamsAsync = function () {
      return e.log("getLocalParamsAsync"), new Promise(function (e) {
        var t = c.map(function (e) {
          return e.getLocalParamsAsync();
        });
        e(Promise.all(t));
      });
    };
    this.waitIceCompletionIfNeededAsync = function (t) {
      return new Promise(function (n) {
        var r = "";
        if (t[0] && t[0].iceCandidatePair || t[1] && t[1].iceCandidatePair)
          e.log("waiting ICE completed state!"), r = p.waitAllCallbacksAsync();
        n(r);
      });
    };
    this.configureTransportAsync = function (e, t) {
      return new Promise(function (n) {
        var r = [], i = e.transportParams;
        c = c.filter(function (e) {
          return t.findIndex(function (t) {
            return t === e.transportId;
          }) !== -1 ? (e.isStarted() || r.push(e.startAsync(y(i, e.transportId))), !0) : (e.dispose(), !1);
        });
        n(Promise.all(r));
      });
    };
    this.stop = function () {
      c.forEach(function (e) {
        e.dispose();
      });
      c = [];
    };
  }
  var n = e("../constants"), r = e("../helper"), i = e("../common/utils"), s = e("./ortcHelper"), a = 0;
  t.__esModule = !0;
  t["default"] = c;
}));

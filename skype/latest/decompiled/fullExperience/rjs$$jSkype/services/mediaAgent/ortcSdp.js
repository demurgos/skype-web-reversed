define("jSkype/services/mediaAgent/ortcSdp", [
  "microsoft-sdp-transform",
  "./constants"
], function (e, t) {
  function n() {
    function n(e, t) {
      return e.toLowerCase() === t.toLowerCase();
    }
    function r(e) {
      var t = e.iceCandidates.slice(0).sort(function (e, t) {
        return t.priority - e.priority;
      });
      for (var n = 0; n < t.length; n++)
        if (t[n].type === "host")
          return t[n].ip;
      return "0.0.0.0";
    }
    function i(e, t) {
      return e && t ? "sendrecv" : e ? "sendonly" : t ? "recvonly" : "inactive";
    }
    function s(e, t) {
      var n = e.toUpperCase();
      if (n === "TCP")
        switch (t.toLowerCase()) {
        case "active":
          return "TCP-ACT";
        case "passive":
          return "TCP-PASS";
        case "so":
          return "TCP-SO";
        }
      return n;
    }
    function o(e, t, r) {
      r.push({
        foundation: e.foundation,
        component: t,
        transport: s(e.protocol, e.tcpType),
        priority: e.priority,
        ip: e.ip,
        port: e.port,
        type: e.type,
        raddr: n(e.type, "host") ? void 0 : e.relatedAddress,
        rport: n(e.type, "host") ? void 0 : e.relatedPort
      });
    }
    function u(e, t, n, r) {
      e && e.forEach(function (e) {
        e.ip.indexOf(":") === -1 ? o(e, t, n) : o(e, t, r);
      });
    }
    function a(e) {
      if (e.iceCandidatePair)
        return {
          0: e.iceCandidatePair.local,
          1: e.rtcpIceCandidatePair ? e.rtcpIceCandidatePair.local : null
        };
      var t = e.iceCandidates.slice(0).sort(function (e, t) {
          return t.priority - e.priority;
        }), n = t[0], r = null;
      if (e.rtcpIceCandidates)
        for (var i = 0; i < e.rtcpIceCandidates.length; ++i) {
          var s = e.rtcpIceCandidates[i];
          if (s.foundation === n.foundation) {
            r = s;
            break;
          }
        }
      return {
        0: n,
        1: r
      };
    }
    function f(e, r, s, o) {
      function d(e) {
        return e.mkiLength !== 0 ? "|" + e.mkiValue + ":" + e.mkiLength : "";
      }
      var f = {
        rtp: [],
        fmtp: [],
        rtcpFb: [],
        type: r.descr.type,
        port: 0,
        protocol: "RTP/SAVP",
        payloads: "",
        cryptoscale: [],
        crypto: [],
        candidates: [],
        xCandidatesIpv6: []
      };
      if (!r.descr.enabled)
        return f.type === t.MEDIA_TYPE.video ? f.payloads = "34" : f.payloads = "9", f;
      var l = a(e), c = l[0], h = l[1];
      f.port = c.port;
      o.ip !== c.ip && (f.connection = {
        version: 4,
        ip: c.ip
      });
      f.iceUfrag = e.iceParams.usernameFragment;
      f.icePwd = e.iceParams.password;
      f.type === t.MEDIA_TYPE.audio && (f.maxptime = 200, f.ptime = 20);
      f.direction = i(r.descr.send, r.descr.recv);
      f.xSsrcRange = {
        ssrcMin: r.ssrcRange.min,
        ssrcMax: r.ssrcRange.max
      };
      f.label = r.descr.label;
      r.bundledWithOther || (f.xSource = r.descr.label);
      r.rtcpReducedSize && (f.rtcpRsize = !0);
      s && r.justAdded ? (e.doRtcpMux && (f.rtcpMux = !0), f.rtcp = { port: h && h.port || f.port + 1 }) : e.doRtcpMux ? f.rtcpMux = !0 : f.rtcp = { port: h && h.port || f.port + 1 };
      var p = null;
      r.rtpCaps && r.rtpCaps.codecs && r.rtpCaps.codecs.forEach(function (e) {
        f.rtp.push({
          payload: e.preferredPayloadType,
          codec: e.name,
          rate: e.clockRate,
          encoding: e.numChannels > 1 ? e.numChannels : void 0
        });
        var t = "";
        for (var r in e.parameters)
          e.parameters.hasOwnProperty(r) && (t !== "" && (t += ";"), t += r === "events" ? e.parameters[r] : r + "=" + e.parameters[r]);
        t !== "" && f.fmtp.push({
          payload: e.preferredPayloadType,
          config: t
        });
        f.payloads += (f.payloads ? " " : "") + e.preferredPayloadType;
        if (!p)
          for (var i = 0; i < e.rtcpFeedback.length; i++)
            if (n(e.rtcpFeedback[i].type, "x-message")) {
              p = e.rtcpFeedback[i].parameter;
              break;
            }
      });
      p && f.rtcpFb.push({
        payload: "*",
        type: "x-message",
        subtype: p
      });
      if (r.sdesParamsList)
        for (var v = 0; v < r.sdesParamsList.length; ++v) {
          var m = r.sdesParamsList[v];
          n(m.cryptoSuite, "AES_CM_128_HMAC_SHA1_80") ? f.crypto.push({
            id: m.tag,
            suite: "AES_CM_128_HMAC_SHA1_80",
            config: m.keyParams[0].keyMethod + ":" + m.keyParams[0].keySalt + "|" + m.keyParams[0].lifetime + d(m.keyParams[0])
          }) : n(m.cryptoSuite, "SCALE_AES_CM_128_HMAC_SHA1_80") && f.cryptoscale.push({
            id: m.tag,
            flavor: "client",
            suite: "AES_CM_128_HMAC_SHA1_80",
            config: m.keyParams[0].keyMethod + ":" + m.keyParams[0].keySalt + "|" + m.keyParams[0].lifetime + d(m.keyParams[0])
          });
        }
      if (!r.bundledWithOther) {
        e.iceCandidatePair ? (u([e.iceCandidatePair.local], 1, f.candidates, f.xCandidatesIpv6), e.rtcpIceCandidatePair && !e.doRtcpMux && u([e.rtcpIceCandidatePair.local], 2, f.candidates, f.xCandidatesIpv6), f.remoteCandidates = "1 " + e.iceCandidatePair.remote.ip + " " + e.iceCandidatePair.remote.port, e.doRtcpMux ? f.remoteCandidates += " 2 " + e.iceCandidatePair.remote.ip + " " + e.iceCandidatePair.remote.port : f.remoteCandidates += " 2 " + e.rtcpIceCandidatePair.remote.ip + " " + e.rtcpIceCandidatePair.remote.port) : (u(e.iceCandidates, 1, f.candidates, f.xCandidatesIpv6), (s && r.justAdded || !e.doRtcpMux) && u(e.rtcpIceCandidates, 2, f.candidates, f.xCandidatesIpv6));
        f.candidates.sort(function (e, t) {
          return +e.foundation - +t.foundation || e.foundation === t.foundation && e.component - t.component;
        });
        f.xCandidatesIpv6.sort(function (e, t) {
          return +e.foundation - +t.foundation || e.foundation === t.foundation && e.component - t.component;
        });
        if (e.dtlsParams) {
          f.fingerprint = {
            type: e.dtlsParams.fingerprints[0].algorithm,
            hash: e.dtlsParams.fingerprints[0].value
          };
          switch (e.dtlsParams.role) {
          case "auto":
            f.setup = "actpass";
            break;
          case "client":
            f.setup = "active";
            break;
          case "server":
            f.setup = "passive";
          }
        }
      }
      return f;
    }
    function l(e) {
      var t = e.toLowerCase();
      switch (t) {
      case "tcp-act":
      case "tcp-pass":
      case "tcp-so":
        return "tcp";
      default:
        return t;
      }
    }
    function c(e) {
      switch (e.toLowerCase()) {
      case "tcp-act":
        return "active";
      case "tcp-pass":
        return "passive";
      case "tcp-so":
        return "so";
      default:
        return void 0;
      }
    }
    function h(e) {
      var t = {
        foundation: e.foundation,
        priority: e.priority,
        ip: e.ip,
        protocol: l(e.transport),
        port: e.port,
        type: e.type
      };
      return n(e.type, "host") || (t.tcpType = c(e.transport), t.relatedAddress = e.raddr, t.relatedPort = e.rport), t;
    }
    function p(e, t, n) {
      e.candidates && e.candidates.forEach(function (e) {
        e.component === t && n.push(h(e));
      });
      e.xCandidatesIpv6 && e.xCandidatesIpv6.forEach(function (e) {
        e.component === t && n.push(h(e));
      });
    }
    function d(e) {
      var t = /(\w+):([a-zA-Z0-9+\/]+={0,2})(\|([0-9\^]+))?(\|([0-9]+):([0-9]+))?/, n = e.match(t);
      if (!n)
        return void 0;
      var r = {
        keyMethod: n[1],
        keySalt: n[2],
        mkiValue: 0,
        mkiLength: 0
      };
      return typeof n[4] != "undefined" && (r.lifetime = n[4]), typeof n[7] != "undefined" && (r.mkiValue = +n[6], r.mkiLength = +n[7]), r;
    }
    function v(e, t) {
      var n = {};
      n.iceParams = {
        usernameFragment: t.iceUfrag,
        password: t.icePwd
      };
      n.iceCandidates = [];
      p(t, 1, n.iceCandidates);
      n.doRtcpMux = !!t.rtcpMux;
      t.rtcpMux || (n.rtcpIceParams = {
        usernameFragment: t.iceUfrag,
        password: t.icePwd
      }, n.rtcpIceCandidates = [], p(t, 2, n.rtcpIceCandidates));
      t.remoteCandidates && (n.iceCandidatePair = {});
      if (e.fingerprint || t.fingerprint) {
        var r = t.fingerprint ? t.fingerprint : e.fingerprint, i = t.setup ? t.setup : e.setup, s = "auto";
        switch (i) {
        case "actpass":
          s = "auto";
          break;
        case "active":
          s = "client";
          break;
        case "passive":
          s = "server";
        }
        n.dtlsParams = {
          role: s,
          fingerprints: [{
              algorithm: r.type,
              value: r.hash
            }]
        };
      }
      return n;
    }
    function m(e) {
      var t = [];
      return e.rtp.forEach(function (n) {
        t.push({
          name: n.codec,
          kind: e.type,
          clockRate: n.rate,
          preferredPayloadType: n.payload,
          numChannels: n.encoding ? n.encoding : 1,
          rtcpFeedback: []
        });
      }), {
        codecs: t,
        headerExtensions: [],
        fecMechanisms: []
      };
    }
    function g(e) {
      e.direction || (e.direction = "sendrecv");
      var t = e.direction.toLowerCase(), n = parseInt(e.port, 10) !== 0;
      if (n && !e.label)
        throw new Error("No label for enabled media stream");
      return {
        enabled: n,
        type: e.type,
        label: e.label,
        send: n ? t === "sendrecv" || t === "sendonly" : !1,
        recv: n ? t === "sendrecv" || t === "recvonly" : !1
      };
    }
    function y(e) {
      function r(e, n, r, i) {
        t.push({
          tag: e,
          cryptoSuite: n,
          keyParams: r,
          sessionParams: i
        });
      }
      var t = [], i = g(e);
      return i.enabled ? (e.cryptoscale && e.cryptoscale.forEach(function (e) {
        var t = n(e.flavor, "server") ? d(e.config) : void 0;
        t && r(e.id, "SCALE_" + e.suite, [t], []);
      }), e.crypto && e.crypto.forEach(function (e) {
        var t = d(e.config);
        t && r(e.id, e.suite, [t], []);
      }), {
        descr: g(e),
        rtpCaps: m(e),
        sdesParamsList: t,
        ssrcRange: {
          min: e.xSsrcRange ? e.xSsrcRange.ssrcMin : 0,
          max: e.xSsrcRange ? e.xSsrcRange.ssrcMax : 0
        },
        rtcpReducedSize: e.rtcpRsize ? !0 : !1
      }) : {
        descr: i,
        rtpCaps: null,
        ssrcRange: null,
        rtcpReducedSize: !1
      };
    }
    this.paramsToSdp = function (n) {
      var i = {}, s = n.transportParams[0] ? n.transportParams[0] : n.transportParams[1], o = r(s), u = a(s), l = u[0];
      i.version = 0;
      i.origin = {
        username: "-",
        sessionId: 0,
        sessionVersion: n.sessionVersion,
        netType: "IN",
        ipVer: 4,
        address: o
      };
      i.bandwidth = [{
          type: "CT",
          limit: 99980
        }];
      i.timing = {
        start: 0,
        stop: 0
      };
      i.name = "session";
      i.connection = {
        version: 4,
        ip: l.ip
      };
      i.xMediaBw = {
        label: t.MEDIA_LABEL.video,
        sendBw: 8100,
        receiveBw: 8000
      };
      i.media = [];
      for (var c = 0; c < n.media.length; c++) {
        var h = n.media[c].descr.label === t.MEDIA_LABEL.audio ? 0 : 1, p = n.transportParams[h];
        i.media.push(f(p, n.media[c], n.isOffer, l));
      }
      return e.write(i);
    };
    this.sdpToParams = function (n) {
      var r = e.parse(n), i = {
          sessionVersion: r.origin.sessionVersion,
          transportParams: [],
          media: []
        };
      for (var s = 0; s < r.media.length; s++) {
        var o = r.media[s], u = y(o);
        i.media.push(u);
        if (u.descr.enabled) {
          var a = u.descr.label === t.MEDIA_LABEL.audio ? 0 : 1;
          typeof i.transportParams[a] == "undefined" && (i.transportParams[a] = v(r, o));
        }
      }
      return i;
    };
  }
  return n;
});

(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/ortc/ortcSdp", [
      "require",
      "exports",
      "microsoft-sdp-transform",
      "../constants",
      "./ortcHelper",
      "../common/utils",
      "../common/formatParameters"
    ], e);
}(function (e, t) {
  function u() {
    function e(e, t) {
      return t ? e.replace(/\\/g, "/") : e.replace(/\//g, "\\");
    }
    function t(e, t) {
      return e.toLowerCase() === t.toLowerCase();
    }
    function u(e) {
      return e.indexOf(":") === -1;
    }
    function a(e) {
      var t = e.iceCandidates.slice(0).sort(function (e, t) {
        return t.priority - e.priority;
      });
      for (var n = 0; n < t.length; n++)
        if (t[n].type === "host")
          return t[n].ip;
      return "0.0.0.0";
    }
    function f(e, t) {
      return e && t ? "sendrecv" : e ? "sendonly" : t ? "recvonly" : "inactive";
    }
    function l(e, t) {
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
    function c(e, n, r) {
      r.push({
        foundation: e.foundation,
        component: n,
        transport: l(e.protocol, e.tcpType),
        priority: e.priority,
        ip: e.ip,
        port: e.port,
        type: e.type,
        raddr: t(e.type, "host") ? void 0 : e.relatedAddress,
        rport: t(e.type, "host") ? void 0 : e.relatedPort
      });
    }
    function h(e, t, n, r) {
      e && e.forEach(function (e) {
        u(e.ip) ? c(e, t, n) : c(e, t, r);
      });
    }
    function p(e) {
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
    function d(n, i, o, a, l, c) {
      function E(e) {
        return e.mkiLength !== 0 ? "|" + e.mkiValue + ":" + e.mkiLength : "";
      }
      var d = i.receiver, v = {
          rtp: [],
          fmtp: [],
          rtcpFb: [],
          ext: [],
          type: i.descr.type,
          port: 0,
          protocol: "RTP/SAVP",
          payloads: "",
          cryptoscale: [],
          crypto: [],
          candidates: [],
          xCandidatesIpv6: []
        };
      if (!i.descr.enabled)
        return v.type === r["default"].MEDIA_TYPE.video ? v.payloads = "34" : v.payloads = "9", v;
      i.descr.mid && (v.mid = i.descr.mid);
      var m = p(n);
      v.port = m[0].port;
      var g, y;
      if (l && v.mid === c[0] || !l)
        g = m[0], y = m[1], a.ip !== g.ip && (v.connection = {
          version: u(g.ip) ? 4 : 6,
          ip: g.ip
        });
      v.iceUfrag = n.iceParams.usernameFragment;
      v.icePwd = n.iceParams.password;
      if (v.type === r["default"].MEDIA_TYPE.audio) {
        var b = C(d.rtpCaps.codecs);
        v.maxptime = b.maxptime;
        v.ptime = b.ptime;
      }
      v.direction = f(i.descr.send, i.descr.recv);
      v.xSsrcRange = {
        ssrcMin: d.ssrcRange.min,
        ssrcMax: d.ssrcRange.max
      };
      v.ssrcGroups = T(i.sender.rtxSsrc, i.sender.ssrcRange.min);
      v.label = i.descr.label;
      if (v.label !== r["default"].MEDIA_LABEL.video || i.descr.firstVideoChannel)
        v.xSource = v.label;
      d.rtcpReducedSize && (v.rtcpRsize = !0);
      o && i.justAdded ? (n.doRtcpMux && (v.rtcpMux = !0), v.rtcp = { port: y && y.port || v.port + 1 }) : n.doRtcpMux ? v.rtcpMux = !0 : v.rtcp = { port: y && y.port || v.port + 1 };
      var w = null;
      d.rtpCaps && d.rtpCaps.codecs && (d.rtpCaps.codecs.forEach(function (e) {
        v.rtp.push({
          payload: e.preferredPayloadType,
          codec: e.name,
          rate: e.clockRate,
          encoding: e.numChannels > 1 ? e.numChannels : void 0
        });
        var n = "";
        s["default"].forOwn(e.parameters, function (e, t) {
          n !== "" && (n += ";");
          n += t === "events" ? e : t + "=" + e;
        });
        n !== "" && v.fmtp.push({
          payload: e.preferredPayloadType,
          config: n
        });
        v.payloads += (v.payloads ? " " : "") + e.preferredPayloadType;
        for (var r = 0; r < e.rtcpFeedback.length; r++)
          t(e.rtcpFeedback[r].type, "x-message") ? w = e.rtcpFeedback[r].parameter : v.rtcpFb.push({
            payload: e.preferredPayloadType,
            type: e.rtcpFeedback[r].type,
            subtype: e.rtcpFeedback[r].parameter
          });
      }), w && v.rtcpFb.push({
        payload: "*",
        type: "x-message",
        subtype: w
      }));
      d.rtpCaps && d.rtpCaps.headerExtensions && d.rtpCaps.headerExtensions.forEach(function (t) {
        v.ext.push({
          value: t.preferredId,
          uri: e(t.uri, !1)
        });
      });
      if (n.sdesParamsList)
        for (var S = 0; S < n.sdesParamsList.length; ++S) {
          var x = n.sdesParamsList[S];
          t(x.cryptoSuite, "AES_CM_128_HMAC_SHA1_80") ? v.crypto.push({
            id: x.tag,
            suite: "AES_CM_128_HMAC_SHA1_80",
            config: x.keyParams[0].keyMethod + ":" + x.keyParams[0].keySalt + "|" + x.keyParams[0].lifetime + E(x.keyParams[0])
          }) : t(x.cryptoSuite, "SCALE_AES_CM_128_HMAC_SHA1_80") && v.cryptoscale.push({
            id: x.tag,
            flavor: "client",
            suite: "AES_CM_128_HMAC_SHA1_80",
            config: x.keyParams[0].keyMethod + ":" + x.keyParams[0].keySalt + "|" + x.keyParams[0].lifetime + E(x.keyParams[0])
          });
        }
      i.bundledWithOther || (n.iceCandidatePair ? (h([n.iceCandidatePair.local], 1, v.candidates, v.xCandidatesIpv6), n.rtcpIceCandidatePair && !n.doRtcpMux && h([n.rtcpIceCandidatePair.local], 2, v.candidates, v.xCandidatesIpv6), v.remoteCandidates = "1 " + n.iceCandidatePair.remote.ip + " " + n.iceCandidatePair.remote.port, n.doRtcpMux ? v.remoteCandidates += " 2 " + n.iceCandidatePair.remote.ip + " " + n.iceCandidatePair.remote.port : v.remoteCandidates += " 2 " + n.rtcpIceCandidatePair.remote.ip + " " + n.rtcpIceCandidatePair.remote.port) : (h(n.iceCandidates, 1, v.candidates, v.xCandidatesIpv6), (o && i.justAdded || !n.doRtcpMux) && h(n.rtcpIceCandidates, 2, v.candidates, v.xCandidatesIpv6)), v.candidates.sort(function (e, t) {
        return +e.foundation - +t.foundation || e.foundation === t.foundation && e.component - t.component;
      }), v.xCandidatesIpv6.sort(function (e, t) {
        return +e.foundation - +t.foundation || e.foundation === t.foundation && e.component - t.component;
      }));
      if (n.dtlsParams) {
        v.fingerprint = {
          type: n.dtlsParams.fingerprints[0].algorithm,
          hash: n.dtlsParams.fingerprints[0].value
        };
        switch (n.dtlsParams.role) {
        case "auto":
          v.setup = "actpass";
          break;
        case "client":
          v.setup = "active";
          break;
        case "server":
          v.setup = "passive";
        }
      }
      return v;
    }
    function v(e) {
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
    function m(e) {
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
    function g(e) {
      var n = {
        foundation: e.foundation,
        priority: e.priority,
        ip: e.ip,
        protocol: v(e.transport),
        port: e.port,
        type: e.type
      };
      return t(e.type, "host") || (n.tcpType = m(e.transport), n.relatedAddress = e.raddr, n.relatedPort = e.rport), n;
    }
    function y(e, t, n) {
      e.candidates && e.candidates.forEach(function (e) {
        e.component === t && n.push(g(e));
      });
      e.xCandidatesIpv6 && e.xCandidatesIpv6.forEach(function (e) {
        e.component === t && n.push(g(e));
      });
    }
    function b(e) {
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
    function w(e, n) {
      function s(e, t, n, r) {
        i.push({
          tag: e,
          cryptoSuite: t,
          keyParams: n,
          sessionParams: r
        });
      }
      var r = {}, i = [];
      n.cryptoscale && n.cryptoscale.forEach(function (e) {
        var n = t(e.flavor, "server") ? b(e.config) : void 0;
        n && s(e.id, "SCALE_" + e.suite, [n], []);
      });
      n.crypto && n.crypto.forEach(function (e) {
        var t = b(e.config);
        t && s(e.id, e.suite, [t], []);
      });
      r.iceParams = {
        usernameFragment: n.iceUfrag,
        password: n.icePwd
      };
      r.sdesParamsList = i;
      r.iceCandidates = [];
      y(n, 1, r.iceCandidates);
      r.doRtcpMux = !!n.rtcpMux;
      n.rtcpMux || (r.rtcpIceParams = {
        usernameFragment: n.iceUfrag,
        password: n.icePwd
      }, r.rtcpIceCandidates = [], y(n, 2, r.rtcpIceCandidates), e.icelite && (r.rtcpIceParams.iceLite = !0));
      n.remoteCandidates && (r.iceCandidatePair = {});
      if (e.fingerprint || n.fingerprint) {
        var o = n.fingerprint ? n.fingerprint : e.fingerprint, u = n.setup ? n.setup : e.setup, a = "auto";
        switch (u) {
        case "actpass":
          a = "auto";
          break;
        case "active":
          a = "client";
          break;
        case "passive":
          a = "server";
        }
        r.dtlsParams = {
          role: a,
          fingerprints: [{
              algorithm: o.type,
              value: o.hash
            }]
        };
      }
      return e.icelite && (r.iceParams.iceLite = !0), r;
    }
    function E(t) {
      var n = [], s = [];
      return t.rtp.forEach(function (e) {
        var i = {
          name: e.codec,
          kind: t.type,
          clockRate: e.rate,
          preferredPayloadType: e.payload,
          numChannels: e.encoding ? e.encoding : 1,
          rtcpFeedback: [],
          parameters: {}
        };
        t.type === r["default"].MEDIA_TYPE.audio && (i.ptime = t.ptime, i.maxptime = t.maxptime);
        t.rtcpFbXMessage && t.rtcpFbXMessage.length && t.rtcpFbXMessage.forEach(function (e) {
          (e.payload === "*" || i.preferredPayloadType === +e.payload) && i.rtcpFeedback.push({
            type: "x-message",
            parameter: e.param
          });
        });
        t.rtcpFb && t.rtcpFb.length && t.rtcpFb.forEach(function (e) {
          (e.payload === "*" || i.preferredPayloadType === +e.payload) && i.rtcpFeedback.push({
            type: e.type,
            parameter: e.subtype || ""
          });
        });
        n.push(i);
      }), t.fmtp && t.fmtp.forEach(function (e) {
        var t = o["default"].build(e.config), r = i["default"].getCodecIndexByPayload(e.payload, n);
        t.names().forEach(function (e) {
          n[r].parameters[e] = t.get(e);
        });
      }), t.ext && t.ext.forEach(function (n) {
        s.push({
          kind: t.type,
          uri: e(n.uri, !0),
          preferredId: n.value
        });
      }), {
        codecs: n,
        headerExtensions: s,
        fecMechanisms: []
      };
    }
    function S(e) {
      e.direction || (e.direction = "sendrecv");
      var t = e.direction.toLowerCase(), n = parseInt(e.port, 10) !== 0;
      e.type !== r["default"].MEDIA_TYPE.audio && e.type !== r["default"].MEDIA_TYPE.video && (n = !1);
      var i = function () {
        if (n && !e.label) {
          if (r["default"].MEDIA_TYPE.audio === e.type)
            return r["default"].MEDIA_LABEL.audio;
          if (r["default"].MEDIA_TYPE.video === e.type)
            return r["default"].MEDIA_LABEL.video;
        }
        return e.label;
      };
      return {
        enabled: n,
        type: e.type,
        label: i(),
        mid: e.mid,
        send: n ? t === "sendrecv" || t === "sendonly" : !1,
        recv: n ? t === "sendrecv" || t === "recvonly" : !1
      };
    }
    function x(e) {
      if (e) {
        var t = s["default"].find(e, function (e) {
          return e.semantics === "FID";
        });
        if (t)
          return +t.ssrcs.split(" ")[1];
      }
      return 0;
    }
    function T(e, t) {
      return e ? [{
          semantics: "FID",
          ssrcs: t + " " + e
        }] : [];
    }
    function N(e) {
      var t = S(e);
      if (!t.enabled) {
        var n = {
          rtpCaps: null,
          ssrcRange: null,
          rtcpReducedSize: !1
        };
        return {
          descr: t,
          receiver: n,
          sender: n
        };
      }
      var r = {
        rtpCaps: E(e),
        ssrcRange: {
          min: e.xSsrcRange ? e.xSsrcRange.ssrcMin : 0,
          max: e.xSsrcRange ? e.xSsrcRange.ssrcMax : 0
        },
        mid: e.mid || void 0,
        rtxSsrc: x(e.ssrcGroups),
        rtcpReducedSize: e.rtcpRsize ? !0 : !1
      };
      return {
        descr: S(e),
        receiver: r,
        sender: s["default"].deepClone(r)
      };
    }
    function C(e) {
      if (e.length === 0)
        return {
          ptime: 0,
          maxptime: 0
        };
      var t = e[0].ptime, n = e[0].maxptime;
      return e.forEach(function (e) {
        n > e.maxptime && e.maxptime > 0 && (n = e.maxptime);
      }), {
        ptime: t,
        maxptime: n
      };
    }
    function k(e) {
      return !e || !e.groups ? [] : s["default"].find(e.groups, function (e) {
        return e.type === "BUNDLE";
      }).mids.split(" ");
    }
    this.paramsToSdp = function (e) {
      var t = {}, s = e.transportParams[0] || e.transportParams[1] || e.transportParams[2], o = a(s), f = p(s), l = f[0];
      t.groups = i["default"].groupsToSdp(e);
      t.version = 0;
      t.origin = {
        username: "-",
        sessionId: 0,
        sessionVersion: e.sessionVersion,
        netType: "IN",
        ipVer: u(o) ? 4 : 6,
        address: o
      };
      t.bandwidth = [{
          type: "CT",
          limit: 99980
        }];
      t.timing = {
        start: 0,
        stop: 0
      };
      t.name = "session";
      t.connection = {
        version: u(l.ip) ? 4 : 6,
        ip: l.ip
      };
      t.xMediaBw = {
        label: r["default"].MEDIA_LABEL.video,
        sendBw: 8100,
        receiveBw: 8000
      };
      t.media = [];
      for (var c = 0; c < e.media.length; c++) {
        var h = e.bundled ? 0 : i["default"].getTransportIndexById(e.transportParams, e.media[c].descr.transportId), v = e.transportParams[h];
        t.media.push(d(v, e.media[c], e.isOffer, l, e.bundled, e.groups));
      }
      return n.write(t);
    };
    this.sdpToParams = function (e) {
      var t = n.parse(e), r = {
          sessionVersion: t.origin.sessionVersion,
          transportParams: [],
          groups: k(t),
          media: []
        };
      for (var i = 0; i < t.media.length; i++) {
        var s = t.media[i], o = N(s);
        r.media.push(o);
        if (o.descr.enabled) {
          var u = w(t, s);
          u.iceCandidates.length > 0 && r.transportParams.push(w(t, s));
        }
      }
      return r;
    };
  }
  var n = e("microsoft-sdp-transform"), r = e("../constants"), i = e("./ortcHelper"), s = e("../common/utils"), o = e("../common/formatParameters");
  t.__esModule = !0;
  t["default"] = u;
}));

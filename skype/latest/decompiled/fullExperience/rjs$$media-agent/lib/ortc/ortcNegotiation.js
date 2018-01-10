(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/ortc/ortcNegotiation", [
      "require",
      "exports",
      "./ortcHelper",
      "../constants",
      "./ortcConstants",
      "../common/utils"
    ], e);
}(function (e, t) {
  function o(e, t, o) {
    function c(e) {
      return e && e.groups && e.groups.length > 0;
    }
    function h(t) {
      u = t;
      e.debug("PROCESS OFFER", "params:", JSON.stringify(u));
    }
    function p(e, t) {
      var n = t.descr;
      n || (n = {
        enabled: !0,
        send: !0,
        recv: !0
      });
      var r = e.send && e.enabled && n.recv && n.enabled, i = e.recv && e.enabled && n.send && n.enabled, s = e.enabled && n.enabled && (r || i || !e.send && !e.recv || !n.send && !n.recv), o = t.receiver.ssrcRange;
      return {
        enabled: s,
        mediaId: e.mediaId,
        mid: n.mid || null,
        type: e.type,
        transportId: e.transportId,
        needsTransport: e.needsTransport,
        label: e.label,
        send: r,
        recv: i,
        remoteSsrcRange: o
      };
    }
    function d(e) {
      if (f && f.media.length > u.media.length)
        throw new Error("Invalid remote offer - removed media lines");
      var t = [], i, s = !1, a = !1, h = 0;
      l = c(u);
      for (var d = 0; d < u.media.length; d++) {
        if (f && f.media[d]) {
          if (f.media[d].type !== u.media[d].type)
            throw new Error("Changing media type not supported");
          if (f.media[d].label && u.media[d].label && f.media[d].label !== u.media[d].label)
            throw new Error("Changing media label not supported");
        }
        u.media[d].descr.label === r["default"].MEDIA_LABEL.audio && !s ? (i = p(n["default"].getDescrFromState(e, r["default"].MEDIA_LABEL.audio, d), u.media[d]), i.needsTransport = !0, t.push(i), s = !0) : u.media[d].descr.label === r["default"].MEDIA_LABEL.video && h < o ? (i = p(n["default"].getDescrFromState(e, r["default"].MEDIA_LABEL.video, d), u.media[d]), i.needsTransport = !0, h > 0 && (i.send = !1, i.needsTransport = !1), t.push(i), h++) : u.media[d].descr.label === r["default"].MEDIA_LABEL.sharing && !a ? (i = p(n["default"].getDescrFromState(e, r["default"].MEDIA_LABEL.sharing, d), u.media[d]), i.needsTransport = !0, t.push(i), a = !0) : t.push({
          enabled: !1,
          type: u.media[d].descr.type,
          label: f && f.media[d] ? f.media[d].descr.label : u.media[d].descr.label
        });
      }
      if (l) {
        var v = !1;
        t.forEach(function (e) {
          !v && e.needsTransport ? v = !0 : e.needsTransport = !1;
        });
      }
      return t;
    }
    function v(e, r, i) {
      for (var s = 0; s < e.length; s++) {
        e[s] && (e[s].doRtcpMux = r[s] && !r[s].doRtcpMux ? !1 : !0);
        if (e[s] && r[s]) {
          var o = !1;
          for (var u = 0; !t.disableSdes && u < r.length; u++)
            r[u] && r[u].sdesParamsList && r[u].sdesParamsList.length && (o = !0);
          r[s].doRtcpMux && (e[s].rtcpIceParams = null, e[s].rtcpIceCandidates = null);
          e[s].dtlsParams && r[s].dtlsParams && (e[s].dtlsParams.role = r[s].dtlsParams.role === "client" ? "server" : "client");
          if (o || !r[s].dtlsParams)
            e[s].dtlsParams = null;
          o || (e[s].sdesParamsList = []);
          var a = null;
          e[s].sdesParamsList && r[s].sdesParamsList && (a = n["default"].findMatchingSdesParams(e[s].sdesParamsList, r[s].sdesParamsList), a && (a.localSdesParams.tag = a.remoteSdesParams.tag, e[s].sdesParamsList = [a.localSdesParams], e[s].remoteSdesParams = a.remoteSdesParams));
        } else
          e[s] && e[s].dtlsParams && (e[s].dtlsParams.role = null);
      }
      return e;
    }
    function m(e, t, r, i) {
      var s = i ? e.sender : e.receiver, o = i ? t.receiver : t.sender, u = n["default"].matchRtpCaps(s.rtpCaps, o.rtpCaps, r, i);
      return {
        mid: r ? s.mid : o.mid,
        transportId: s.transportId,
        ssrcRange: s.ssrcRange,
        remoteSsrcRange: o.ssrcRange,
        rtxSsrc: n["default"].getRtxSsrc(u, s, o, i),
        rtpCaps: u
      };
    }
    function g(e, t, n, r, i) {
      if (!e.enabled)
        return { descr: e };
      var s = t;
      return s.sender.rtcpReducedSize = i, s.receiver.rtcpReducedSize = i, s.descr = e, s.justAdded = n, s.bundledWithOther = r, s;
    }
    function y(t, n, i, o) {
      var f = {
          isOffer: !1,
          sessionVersion: u.sessionVersion,
          transportParams: v(n, u.transportParams, !1),
          media: [],
          bundled: l,
          groups: []
        }, c = !1, h = !1, p, d = 0, y = 0;
      for (var b = 0; b < t.length; b++) {
        var w = h && t[b].label === r["default"].MEDIA_LABEL.video || c && f.bundled, E = {}, x = s["default"].shallowClone(t[b]);
        if (x.enabled) {
          c = !0;
          var T = m(i[b], u.media[b], !1, !1), C = m(i[b], u.media[b], !1, !0);
          E.receiver = T;
          E.sender = C;
          p = x.needsTransport ? n[d] : n[y];
          x.transportId = p.transportId;
          x.needsTransport && (y = d, d++);
          x.label === r["default"].MEDIA_LABEL.video && (x.firstVideoChannel = !h, h = !0);
          if (!S(x, p, E.receiver) || !S(x, p, E.sender))
            x.enabled = !1, e.warn("Rejecting media since unable to match parameters");
        }
        f.media.push(g(x, E, !1, w, u.media[b].receiver.rtcpReducedSize));
      }
      e.debug(o ? "CREATE PRANSWER" : "CREATE ANSWER", "params:", JSON.stringify(f));
      o || (a = N(f, u, !1));
      var k = [];
      return f.media.forEach(function (e) {
        l && e.descr.enabled && e.descr.mid && k.push(e.descr.mid);
      }), f.groups = k, f;
    }
    function b(e) {
      var t = [], i, s = !1, u = !1, a = 0, c = 0;
      if (f)
        for (var h = 0; h < f.media.length; h++)
          f.media[h].descr.label === r["default"].MEDIA_LABEL.audio && !s ? (i = n["default"].getDescrFromState(e, r["default"].MEDIA_LABEL.audio, c++), i.needsTransport = !0, t.push(i), s = !0) : f.media[h].descr.label === r["default"].MEDIA_LABEL.video && a < o ? (i = n["default"].getDescrFromState(e, r["default"].MEDIA_LABEL.video, c++), i.needsTransport = !0, a > 0 && (i.send = !1, i.needsTransport = !1), t.push(i), a++) : f.media[h].descr.label === r["default"].MEDIA_LABEL.sharing && !u ? (i = n["default"].getDescrFromState(e, r["default"].MEDIA_LABEL.sharing, c++), i.needsTransport = !0, t.push(i), u = !0) : t.push({
            enabled: !1,
            type: f.media[h].descr.type,
            label: f.media[h].descr.label
          });
      !s && e.audio && (i = n["default"].getDescrFromState(e, r["default"].MEDIA_LABEL.audio, c++), i.needsTransport = !0, t.push(i));
      for (var p = a; p < o && e.video; p++)
        i = n["default"].getDescrFromState(e, r["default"].MEDIA_LABEL.video, c++), i.needsTransport = !0, p > 0 && (i.send = !1, i.needsTransport = !1), t.push(i);
      !u && e.sharing && (i = n["default"].getDescrFromState(e, r["default"].MEDIA_LABEL.sharing, c++), i.needsTransport = !0, t.push(i));
      for (var h = 0; h < t.length; h++)
        t[h].mid || (t[h].mid = "m" + h);
      if (l) {
        var d = !1;
        t.forEach(function (e) {
          !d && e.needsTransport ? d = !0 : e.needsTransport = !1;
        });
      }
      return t;
    }
    function w(t, n, i) {
      var s = {
          isOffer: !0,
          sessionVersion: f ? f.sessionVersion : 0,
          transportParams: v(n, f ? f.transportParams : [], !0),
          groups: [],
          bundled: l,
          media: []
        }, o = !1, a = !1, c = 0, h = 0;
      for (var p = 0; p < t.length; p++) {
        var d = f && f.media[p] && f.media[p].descr.enabled, m = !d && t[p].enabled, y, b = a && t[p].label === r["default"].MEDIA_LABEL.video || s.bundled && o;
        s.groups.push(t[p].mid);
        m ? y = i[p] : y = f.media[p];
        t[p].transportId = t[p].needsTransport ? n[c].transportId : n[h].transportId;
        t[p].needsTransport && (h = c, c++);
        o = o || d;
        t[p].label === r["default"].MEDIA_LABEL.video && (t[p].firstVideoChannel = !a, a = !0);
        s.media.push(g(t[p], y, m, b, !0));
      }
      return u = s, e.debug("CREATE OFFER", "params:", JSON.stringify(u)), u;
    }
    function E(t) {
      e.debug("PROCESS ANSWER", "params:", JSON.stringify(t));
      a = N(u, t, !0);
    }
    function S(t, n, r) {
      if (t.enabled) {
        if (!n.sdesParamsList && !n.dtlsParams)
          return e.warn("no sdes nor dtls params:", n.sdesParamsList, n.dtlsParams), !1;
        if (!r.rtpCaps.codecs.length)
          return e.warn("no common codecs!", r.rtpCaps), !1;
      }
      return !0;
    }
    function x(e, t, r) {
      var i = [];
      for (var o = 0; o < Math.max(e.length, t.length); o++) {
        var u = null;
        if (e[o] && t[o]) {
          u = s["default"].shallowClone(t[o]);
          u.doRtcpMux = e[o].doRtcpMux && t[o].doRtcpMux;
          u.enableDtls = e[o].dtlsParams && t[o].dtlsParams;
          u.transportId = e[o].transportId;
          var a = null;
          e[o].sdesParamsList && t[o].sdesParamsList && (a = n["default"].findMatchingSdesParams(e[o].sdesParamsList, t[o].sdesParamsList), a && (a.localSdesParams.tag = a.remoteSdesParams.tag, u.sdesParamsList = [a.localSdesParams], u.remoteSdesParams = a.remoteSdesParams));
        }
        i.push(u);
      }
      return i;
    }
    function T(e, t, r, i, s) {
      function o(n) {
        var r = n ? e.sender : e.receiver, s = n ? t.sender : t.receiver, o = m(e, t, i, n);
        return o.rtcpMux = l.doRtcpMux, o.rtcpReducedSize = r.rtcpReducedSize && s.rtcpReducedSize, o.enableDtls = l.enableDtls, o;
      }
      var u = p(e.descr, t), a = { descr: u };
      if (u.enabled) {
        u.transportId = s ? r[0].transportId : u.transportId;
        var f = n["default"].getTransportIndexById(r, u.transportId), l = s ? r[0] : r[f];
        a.descr = u;
        a.sender = o(!0);
        a.receiver = o(!1);
        if (!S(u, l, a.sender) || !S(u, l, a.receiver))
          throw new Error("Failed to verify negotiated parameters!");
      }
      return a;
    }
    function N(e, t, n) {
      if (e.media.length !== t.media.length)
        throw new Error("Number of media lines doesn't match in offer & answer l:" + e.media.length + " r: " + t.media.length);
      l = c(t);
      var r = {
        sessionVersion: n ? e.sessionVersion : t.sessionVersion,
        transportParams: x(e.transportParams, t.transportParams, n),
        bundle: n ? e.groups : t.groups,
        bundled: l,
        media: []
      };
      for (var i = 0; i < e.media.length; i++)
        r.media.push(T(e.media[i], t.media[i], r.transportParams, n, r.bundled));
      return r;
    }
    function C() {
      return a.sessionVersion++, f = a, e.debug("NEGOTIATED", "params:", JSON.stringify(f)), f;
    }
    function k(e, t) {
      if (e === i.VideoCapabilitiesEventType.CODEC_PARAMS_UPDATED)
        return L(t);
      if (e === i.VideoCapabilitiesEventType.SSRC_UPDATED)
        return A(t);
    }
    function L(t) {
      var r = s["default"].find(f.media, function (e) {
        return e.descr.mediaId === t.mediaId;
      });
      if (!r) {
        e.warn("mediaCaps not found for mediaId: ", t.mediaId);
        return;
      }
      var i = n["default"].getCodecByName(t.codecName, r.receiver.rtpCaps.codecs);
      if (!i || !i.parameters) {
        e.warn("codec not found for codecName: ", t.codecName);
        return;
      }
      s["default"].forOwn(t.capabilities, function (n, r) {
        e.log("changing ", r, " for ", t.codecName, " from ", i.parameters[r], " to ", n);
        i.parameters[r] = n;
      });
    }
    function A(t) {
      var n = s["default"].find(f.media, function (e) {
        return e.descr.mediaId === t.mediaId;
      });
      if (!n) {
        e.warn("mediaCaps not found for mediaType: ", t.mediaId, f);
        return;
      }
      e.log("SSRC changing: ", n.receiver.ssrcRange, " -> ", t.ssrcRange);
      e.log("rtxSSRC changing: ", n.receiver.rtxSsrc, " -> ", t.rtxSsrc);
      n.receiver.ssrcRange = s["default"].shallowClone(t.ssrcRange);
      n.sender.ssrcRange = s["default"].shallowClone(t.ssrcRange);
      n.receiver.rtxSsrc = t.rtxSsrc;
      n.sender.rtxSsrc = t.rtxSsrc;
    }
    this.processOffer = h;
    this.createMediaDescriptorsForAnswer = d;
    this.createAnswer = y;
    this.createMediaDescriptorsForOffer = b;
    this.createOffer = w;
    this.processAnswer = E;
    this.completeNegotiation = C;
    this.onMediaCapabilitiesChanged = k;
    var u = null, a = null, f = null, l = !1;
  }
  var n = e("./ortcHelper"), r = e("../constants"), i = e("./ortcConstants"), s = e("../common/utils");
  t.__esModule = !0;
  t["default"] = o;
}));

define("jSkype/services/mediaAgent/ortcNegotiation", [
  "./ortcHelper",
  "./constants",
  "./helper",
  "./userAgentAdapter"
], function (e, t, n) {
  function r(r, i, s) {
    function f(e) {
      o = e;
      r.debug("PROCESS OFFER", "params:", JSON.stringify(o));
    }
    function l(e, t) {
      t || (t = {
        enabled: !0,
        send: !0,
        recv: !0
      });
      var n = e.send && e.enabled && t.recv && t.enabled, r = e.recv && e.enabled && t.send && t.enabled, i = e.enabled && t.enabled && (n || r || !e.send && !e.recv || !t.send && !t.recv);
      return {
        enabled: i,
        type: e.type,
        label: e.label,
        send: n,
        recv: r
      };
    }
    function c(n) {
      if (a && a.media.length > o.media.length)
        throw new Error("Invalid remote offer - removed media lines");
      var r = [], i, u = !1, f = 0;
      for (var c = 0; c < o.media.length; c++) {
        if (a && a.media[c]) {
          if (a.media[c].type !== o.media[c].type)
            throw new Error("Changing media type not supported");
          if (a.media[c].label && o.media[c].label && a.media[c].label !== o.media[c].label)
            throw new Error("Changing media label not supported");
        }
        o.media[c].descr.label === t.MEDIA_LABEL.audio && !u ? (i = l(e.getDescrFromState(n.audio, t.MEDIA_LABEL.audio), o.media[c].descr), r.push(i), u = !0) : o.media[c].descr.label === t.MEDIA_LABEL.video && f < s ? (i = l(e.getDescrFromState(n.video, t.MEDIA_LABEL.video), o.media[c].descr), f > 0 && (i.send = !1), r.push(i), f++) : r.push({
          enabled: !1,
          type: o.media[c].descr.type,
          label: a && a.media[c] ? a.media[c].descr.label : o.media[c].descr.label
        });
      }
      return r;
    }
    function h(e, t) {
      var n = t ? t.transportParams : [];
      for (var r = 0; r < e.length; r++) {
        e[r] && (e[r].doRtcpMux = n[r] && !n[r].doRtcpMux ? !1 : !0);
        if (e[r] && n[r]) {
          var s = !1;
          for (var o = 0; !i.disableSdes && o < t.media.length; o++)
            t.media[o].sdesParamsList && t.media[o].sdesParamsList.length && (s = !0);
          n[r].doRtcpMux && (e[r].rtcpIceParams = null, e[r].rtcpIceCandidates = null);
          e[r].dtlsParams && n[r].dtlsParams && (e[r].dtlsParams.role = n[r].dtlsParams.role === "client" ? "server" : "client");
          if (s || !n[r].dtlsParams)
            e[r].dtlsParams = null;
        } else
          e[r] && e[r].dtlsParams && (e[r].dtlsParams.role = null);
      }
      return e;
    }
    function p(t, n, r) {
      var i;
      t.sdesParamsList && n.sdesParamsList && (i = e.findMatchingSdesParams(t.sdesParamsList, n.sdesParamsList));
      var s = [], o;
      return i && (s.push(i.localSdesParams), o = i.remoteSdesParams), {
        ssrcRange: t.ssrcRange,
        remoteSsrcRange: n.ssrcRange,
        sdesParamsList: s,
        remoteSdesParams: o,
        rtpCaps: e.matchRtpCaps(t.rtpCaps, n.rtpCaps, r)
      };
    }
    function d(e, t, n, r, i) {
      if (!e.enabled)
        return { descr: e };
      var s = t;
      return s.descr = e, s.justAdded = n, s.bundledWithOther = r, s.rtcpReducedSize = i, s;
    }
    function v(e, i, s, a) {
      var f = {
          isOffer: !1,
          sessionVersion: o.sessionVersion,
          transportParams: h(i, o),
          media: []
        }, l = !1;
      for (var c = 0; c < e.length; c++) {
        var v = l && e[c].label === t.MEDIA_LABEL.video;
        e[c].label === t.MEDIA_LABEL.video && (l = !0);
        var m, g = n.shallowClone(e[c]);
        if (g.enabled) {
          m = p(s[c], o.media[c], !1);
          var y = g.label === t.MEDIA_LABEL.audio ? 0 : 1, w = f.transportParams[y];
          b(g, w, m) || (g.enabled = !1, r.warn("Rejecting media since unable to match parameters"));
          m.sdesParamsList.length && m.remoteSdesParams && (m.sdesParamsList[0].tag = m.remoteSdesParams.tag);
        }
        f.media.push(d(g, m, !1, v, o.media[c].rtcpReducedSize));
      }
      return r.debug(a ? "CREATE PRANSWER" : "CREATE ANSWER", "params:", JSON.stringify(f)), a || (u = S(f, o, !1)), f;
    }
    function m(n) {
      var r = [], i, o = !1, u = 0;
      if (a)
        for (var f = 0; f < a.media.length; f++)
          a.media[f].descr.label === t.MEDIA_LABEL.audio && !o ? (i = e.getDescrFromState(n.audio, t.MEDIA_LABEL.audio), r.push(i), o = !0) : a.media[f].descr.label === t.MEDIA_LABEL.video && u < s ? (i = e.getDescrFromState(n.video, t.MEDIA_LABEL.video), u > 0 && (i.send = !1), r.push(i), u++) : r.push({
            enabled: !1,
            type: a.media[f].descr.type,
            label: a.media[f].descr.label
          });
      !o && n.audio && (i = e.getDescrFromState(n.audio, t.MEDIA_LABEL.audio), r.push(i));
      for (var l = u; l < s && n.video; l++)
        i = e.getDescrFromState(n.video, t.MEDIA_LABEL.video), l > 0 && (i.send = !1), r.push(i);
      return r;
    }
    function g(e, n, i) {
      var s = {
          isOffer: !0,
          sessionVersion: a ? a.sessionVersion : 0,
          transportParams: h(n, a),
          media: []
        }, u = !1;
      for (var f = 0; f < e.length; f++) {
        var l = (!a || !a.media[f] || !a.media[f].descr.enabled) && e[f].enabled, c;
        l ? c = i[f] : c = a.media[f];
        var p = u && e[f].label === t.MEDIA_LABEL.video;
        e[f].label === t.MEDIA_LABEL.video && (u = !0);
        s.media.push(d(e[f], c, l, p, !0));
      }
      return o = s, r.debug("CREATE OFFER", "params:", JSON.stringify(o)), o;
    }
    function y(e) {
      r.debug("PROCESS ANSWER", "params:", JSON.stringify(e));
      u = S(o, e, !0);
    }
    function b(e, t, n) {
      if (e.enabled) {
        if (!n.sdesParamsList.length || !n.remoteSdesParams)
          if (!t.dtlsParams)
            return r.warn("no sdes nor dtls params:", n.sdesParamsList, n.remoteSdesParams, t.dtlsParams), !1;
        if (!n.rtpCaps.codecs.length)
          return r.warn("no common codecs!", n.rtpCaps), !1;
      }
      return !0;
    }
    function w(e, t) {
      var r = [];
      for (var i = 0; i < Math.max(e.length, t.length); i++) {
        var s = null;
        e[i] && t[i] && (s = n.shallowClone(t[i]), s.doRtcpMux = e[i].doRtcpMux && t[i].doRtcpMux, s.enableDtls = e[i].dtlsParams && t[i].dtlsParams);
        r.push(s);
      }
      return r;
    }
    function E(e, n, r, i) {
      var s = l(e.descr, n.descr), o = { descr: s };
      if (s.enabled) {
        var u = s.label === t.MEDIA_LABEL.audio ? 0 : 1, a = r[u];
        o = p(e, n, i);
        if (!b(s, a, o))
          throw new Error("Failed to verify negotiated parameters!");
        o.descr = s;
        o.rtcpMux = a.doRtcpMux;
        o.rtcpReducedSize = e.rtcpReducedSize && n.rtcpReducedSize;
        o.enableDtls = a.enableDtls;
      }
      return o;
    }
    function S(e, t, n) {
      if (e.media.length !== t.media.length)
        throw new Error("Number of media lines doesn't match in offer & answer l:" + e.media.length + " r: " + t.media.length);
      var r = {
        sessionVersion: n ? e.sessionVersion : t.sessionVersion,
        transportParams: w(e.transportParams, t.transportParams),
        media: []
      };
      for (var i = 0; i < e.media.length; i++)
        r.media.push(E(e.media[i], t.media[i], r.transportParams, n));
      return r;
    }
    function x() {
      return u.sessionVersion++, a = u, r.debug("NEGOTIATED", "params:", JSON.stringify(a)), a;
    }
    this.processOffer = f;
    this.createMediaDescriptorsForAnswer = c;
    this.createAnswer = v;
    this.createMediaDescriptorsForOffer = m;
    this.createOffer = g;
    this.processAnswer = y;
    this.completeNegotiation = x;
    var o = null, u = null, a = null;
  }
  return r;
});

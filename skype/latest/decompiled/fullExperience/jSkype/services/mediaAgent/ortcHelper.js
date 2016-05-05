define("jSkype/services/mediaAgent/ortcHelper", [
  "./constants",
  "./helper"
], function (e, t) {
  function n(e, t) {
    return e.toLowerCase() === t.toLowerCase();
  }
  function r(t) {
    return t.enabled ? t.send && t.recv ? e.MEDIA_STATE.sendReceive : t.send ? e.MEDIA_STATE.send : t.recv ? e.MEDIA_STATE.receive : e.MEDIA_STATE.inactive : null;
  }
  function i(t) {
    if (t === e.MEDIA_LABEL.audio)
      return e.MEDIA_TYPE.audio;
    if (t === e.MEDIA_LABEL.video)
      return e.MEDIA_TYPE.video;
    if (t === e.MEDIA_LABEL.screensharing)
      return e.MEDIA_TYPE.video;
    throw new Error("unsupported label");
  }
  function s(e, n) {
    return {
      enabled: !!e,
      type: i(n),
      label: n,
      send: t.hasSendDirectionality(e),
      recv: t.hasReceiveDirectionality(e)
    };
  }
  function o(e, t) {
    for (var n = 0; n < e.length; n++)
      if (e[n].descr.label === t)
        return e[n].descr;
    return {
      enabled: !1,
      type: i(t),
      label: t,
      send: !1,
      recv: !1
    };
  }
  function u(t) {
    var n = {}, i = o(t.media, e.MEDIA_LABEL.audio), s = o(t.media, e.MEDIA_LABEL.video);
    return i.enabled && (n.audio = r(i)), s.enabled && (n.video = r(s)), n;
  }
  function a(e, r, i) {
    var s = [];
    return e && r && e.forEach(function (e) {
      for (var o = 0; o < r.length; o++) {
        var u = r[o];
        if (n(e.name, u.name) && n(e.kind, u.kind) && e.numChannels === u.numChannels && e.clockRate === u.clockRate) {
          var a = t.shallowClone(e);
          a.preferredPayloadType = i ? e.preferredPayloadType : u.preferredPayloadType, s.push(a);
          break;
        }
      }
    }), s;
  }
  function f(e, n) {
    function r(e, t) {
      var n = e.keyParams[0], r = t.keyParams[0];
      return e.cryptoSuite === t.cryptoSuite && n.mkiLength === r.mkiLength && n.mkiValue === r.mkiValue;
    }
    for (var i = 0; i < n.length; ++i) {
      var s = n[i];
      for (var o = 0; o < e.length; ++o) {
        var u = e[o];
        if (r(s, u))
          return {
            localSdesParams: t.shallowClone(u),
            remoteSdesParams: t.shallowClone(s)
          };
      }
    }
    return null;
  }
  function l(e, t) {
    var n = [];
    return e && t && e.forEach(function (e) {
      for (var r = 0; r < t.length; r++) {
        var i = t[r];
        e.kind === i.kind && e.uri === i.uri && n.push(e);
      }
    }), n;
  }
  function c(e, t, n) {
    var r = null;
    return e && t && (r = {
      codecs: a(e.codecs, t.codecs, n),
      headerExtensions: l(e.headerExtensions, t.headerExtensions),
      fecMechanisms: e.fecMechanisms.filter(function (e) {
        return t.fecMechanisms.indexOf(e) !== -1;
      })
    }), r;
  }
  function h(e, t, n, r, i) {
    return g("", d(e.codecs), v(e.headerExtensions), m(e.codecs, t), w(n, "", r, i));
  }
  function p(e, t, n, r, i) {
    return h(e, t, n, r, i);
  }
  function d(e) {
    var t = [];
    return e.forEach(function (e) {
      t.push(y(e.name, e.preferredPayloadType, e.clockRate, e.numChannels, e.rtcpFeedback, e.parameters));
    }), t;
  }
  function v(e) {
    var t = [];
    return e.forEach(function (e) {
      t.push(b(e.uri, e.preferredId, e.preferredEncrypt));
    }), t;
  }
  function m(e, t) {
    var n = [];
    return n.push(E(t, 0, 0, 0, 1)), n;
  }
  function g(e, t, n, r, i) {
    return {
      muxId: e || "",
      codecs: t,
      headerExtensions: n,
      encodings: r,
      rtcp: i
    };
  }
  function y(e, t, n, r, i, s) {
    return {
      name: e,
      payloadType: t,
      clockRate: n,
      numChannels: r,
      rtcpFeedback: i,
      parameters: s
    };
  }
  function b(e, t, n) {
    return {
      uri: e,
      id: t,
      encrypt: n
    };
  }
  function w(e, t, n, r) {
    return {
      ssrc: e,
      cname: t,
      reducedSize: n,
      mux: r
    };
  }
  function E(e, t, n, r, i, s, o, u, a, f, l, c, h, p) {
    return {
      ssrc: e.min,
      ssrcRange: e,
      codecPayloadType: t,
      fec: n,
      rtx: r,
      priority: i || 1,
      maxBitrate: s,
      minQuality: o || 0,
      framerateBias: u || 0.5,
      resolutionScale: a || 1,
      framerateScale: f || 1,
      active: c || !0,
      encodingId: h,
      dependencyEncodingId: p
    };
  }
  return {
    getStateFromDescr: r,
    getDescrFromState: s,
    findDescrFromMedia: o,
    getModalitiesFromParams: u,
    findMatchingSdesParams: f,
    matchRtpCaps: c,
    getSendParams: h,
    getRecvParams: p,
    RTCRtpParameters: g,
    RTCRtpCodecParameters: y,
    RTCRtpHeaderExtensionParameters: b,
    RTCRtcpParameters: w,
    RTCRtpEncodingParameters: E
  };
})

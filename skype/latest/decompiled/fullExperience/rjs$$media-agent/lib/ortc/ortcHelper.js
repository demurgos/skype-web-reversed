(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/ortc/ortcHelper", [
      "require",
      "exports",
      "../constants",
      "../helper",
      "../common/utils"
    ], e);
}(function (e, t) {
  function s(e, t) {
    return e.toLowerCase() === t.toLowerCase();
  }
  function o(e) {
    return e.enabled ? e.send && e.recv ? n["default"].MEDIA_STATE.sendReceive : e.send ? n["default"].MEDIA_STATE.send : e.recv ? n["default"].MEDIA_STATE.receive : n["default"].MEDIA_STATE.inactive : null;
  }
  function u(e) {
    if (e === n["default"].MEDIA_LABEL.audio)
      return n["default"].MEDIA_TYPE.audio;
    if (e === n["default"].MEDIA_LABEL.video)
      return n["default"].MEDIA_TYPE.video;
    if (e === n["default"].MEDIA_LABEL.sharing)
      return n["default"].MEDIA_TYPE.video;
    throw new Error("unsupported label: " + e);
  }
  function a(e, t) {
    return t === n["default"].MEDIA_LABEL.audio ? e.audio : t === n["default"].MEDIA_LABEL.video ? e.video : t === n["default"].MEDIA_LABEL.sharing ? e.sharing : null;
  }
  function f(e, t, n) {
    var i = a(e, t);
    return {
      enabled: !!i,
      mediaId: n,
      type: u(t),
      label: t,
      send: r["default"].hasSendDirectionality(i),
      recv: r["default"].hasReceiveDirectionality(i)
    };
  }
  function l(e, t) {
    for (var n = 0; n < e.length; n++)
      if (e[n].descr.label === t)
        return e[n].descr;
    return {
      enabled: !1,
      type: u(t),
      label: t,
      send: !1,
      recv: !1
    };
  }
  function c(e) {
    var t = {}, r = l(e, n["default"].MEDIA_LABEL.audio), i = l(e, n["default"].MEDIA_LABEL.video), s = l(e, n["default"].MEDIA_LABEL.sharing);
    return r.enabled && (t.audio = o(r)), i.enabled && (t.video = o(i)), s.enabled && (t.sharing = o(s)), t;
  }
  function h(e, t) {
    return i["default"].find(t, function (t) {
      if (t.preferredPayloadType === +e)
        return !0;
    });
  }
  function p(e, t) {
    return i["default"].findIndex(t, function (t) {
      if (t.preferredPayloadType === e)
        return !0;
    });
  }
  function d(e, t) {
    return i["default"].find(t, function (t) {
      if (s(t.name, e))
        return !0;
    });
  }
  function v(e, t) {
    return h(e, t).name;
  }
  function m(e, t) {
    return i["default"].findIndex(e, function (e) {
      if (e.transportId === t)
        return !0;
    });
  }
  function g(e, t) {
    function n(e) {
      return {
        send: /send:(\S+)/.exec(e)[1].split(","),
        recv: /recv:(\S+)/.exec(e)[1].split(",")
      };
    }
    var r = {
        send: [],
        recv: []
      }, i = n(t);
    n(e).send.forEach(function (e) {
      i.send.indexOf(e) !== -1 && r.send.push(e);
    });
    n(e).recv.forEach(function (e) {
      i.recv.indexOf(e) !== -1 && r.recv.push(e);
    });
    if (!r.send.length && !r.recv.length)
      return null;
    var s = "app";
    return s = r.send.length ? s + " send:" + r.send.join(",") : s, s = r.recv.length ? s + " recv:" + r.recv.join(",") : s, s;
  }
  function y(e, t) {
    var n = [];
    return e.forEach(function (e) {
      t.forEach(function (t) {
        if (e.type === t.type)
          if (e.type === "x-message") {
            var r = g(e.parameter, t.parameter);
            r && n.push({
              type: "x-message",
              parameter: r
            });
          } else
            e.parameter === t.parameter && n.push(e);
      });
    }), n;
  }
  function b(e, t, n, r) {
    var o = [];
    if (e && t)
      return e.filter(function (e) {
        return !s(e.name, "rtx");
      }).forEach(function (e) {
        for (var u = 0; u < t.length; u++) {
          var a = t[u];
          if (s(e.name, a.name) && s(e.kind, a.kind) && e.numChannels === a.numChannels && e.clockRate === a.clockRate) {
            var f = i["default"].shallowClone(r ? a : e);
            f.preferredPayloadType = n ? e.preferredPayloadType : a.preferredPayloadType;
            f.rtcpFeedback = y(e.rtcpFeedback, a.rtcpFeedback);
            o.push(f);
            break;
          }
        }
      }), e.filter(function (e) {
        return s(e.name, "rtx");
      }).forEach(function (u) {
        for (var a = 0; a < t.length; a++) {
          var f = t[a];
          if (s(u.name, f.name) && s(u.kind, f.kind) && u.numChannels === f.numChannels && u.clockRate === f.clockRate && s(v(u.parameters.apt, e), v(f.parameters.apt, t))) {
            var l = i["default"].shallowClone(r ? f : u);
            l.preferredPayloadType = n ? u.preferredPayloadType : f.preferredPayloadType;
            l.parameters.apt = d(h(u.parameters.apt, e).name, o).preferredPayloadType;
            o.push(l);
            break;
          }
        }
      }), o;
  }
  function w(e, t) {
    function n(e, t) {
      var n = e.keyParams[0], r = t.keyParams[0];
      return e.cryptoSuite === t.cryptoSuite && n.mkiLength === r.mkiLength && n.mkiValue === r.mkiValue;
    }
    for (var r = 0; r < t.length; ++r) {
      var s = t[r];
      for (var o = 0; o < e.length; ++o) {
        var u = e[o];
        if (n(s, u))
          return {
            localSdesParams: i["default"].shallowClone(u),
            remoteSdesParams: i["default"].shallowClone(s)
          };
      }
    }
    return null;
  }
  function E(e, t) {
    var n = [];
    return e && t && e.forEach(function (e) {
      for (var r = 0; r < t.length; r++) {
        var i = t[r];
        e.kind === i.kind && e.uri === i.uri && n.push(e);
      }
    }), n;
  }
  function S(e, t, n, r) {
    var i = null;
    return e && t && (i = {
      codecs: b(e.codecs, t.codecs, n, r),
      headerExtensions: E(e.headerExtensions, t.headerExtensions),
      fecMechanisms: e.fecMechanisms.filter(function (e) {
        return t.fecMechanisms.indexOf(e) !== -1;
      })
    }), i;
  }
  function x(e, t, n, r, i, s) {
    return L("", N(e.codecs), C(e.headerExtensions), k(t, s), M(n, "", r, i));
  }
  function T(e, t, n, r, i, s) {
    return x(e, t, n, r, i, s);
  }
  function N(e) {
    var t = [];
    return e.forEach(function (e) {
      t.push(A(e.name, e.preferredPayloadType, e.clockRate, e.numChannels, e.rtcpFeedback, e.parameters, e.ptime, e.maxptime));
    }), t;
  }
  function C(e) {
    var t = [];
    return e.forEach(function (e) {
      t.push(O(e.uri, e.preferredId, e.preferredEncrypt));
    }), t;
  }
  function k(e, t) {
    var n = [];
    return n.push(H(e, 0, 0, t, 1)), n;
  }
  function L(e, t, n, r, i) {
    return {
      muxId: e || "",
      codecs: t,
      headerExtensions: n,
      encodings: r,
      rtcp: i,
      degradationPreference: "balanced"
    };
  }
  function A(e, t, n, r, i, s, o, u) {
    return {
      name: e,
      payloadType: t,
      clockRate: n,
      numChannels: r,
      rtcpFeedback: i,
      parameters: s,
      ptime: o,
      maxptime: u
    };
  }
  function O(e, t, n) {
    return {
      uri: e,
      id: t,
      encrypt: n
    };
  }
  function M(e, t, n, r) {
    return {
      ssrc: e,
      cname: t,
      reducedSize: n,
      mux: r
    };
  }
  function _(e) {
    return e.some(function (e) {
      return s(e.name, "rtx");
    });
  }
  function D(e, t, n, r) {
    return _(e.codecs) ? r ? t.rtxSsrc : n.rtxSsrc : 0;
  }
  function P(e) {
    return e.groups && e.groups.length !== 0 ? [{
        mids: e.groups.join(" "),
        type: "BUNDLE"
      }] : null;
  }
  function H(e, t, n, r, i, s, o, u, a, f, l, c, h, p) {
    return {
      ssrc: e.min,
      ssrcRange: e,
      codecPayloadType: t,
      fec: n,
      rtx: r ? { ssrc: r } : 0,
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
  var n = e("../constants"), r = e("../helper"), i = e("../common/utils");
  t.__esModule = !0;
  t["default"] = {
    groupsToSdp: P,
    getStateFromDescr: o,
    getDescrFromState: f,
    getCodecIndexByPayload: p,
    getTransportIndexById: m,
    findDescrFromMedia: l,
    getModalitiesFromMedia: c,
    findMatchingSdesParams: w,
    matchXMessage: g,
    matchRtpCaps: S,
    matchRtcpFeedback: y,
    getSendParams: x,
    getRecvParams: T,
    RTCRtpCodecParameters: A,
    RTCRtpHeaderExtensionParameters: O,
    RTCRtcpParameters: M,
    hasRtx: _,
    getRtxSsrc: D,
    RTCRtpEncodingParameters: H,
    getCodecByName: d
  };
}));

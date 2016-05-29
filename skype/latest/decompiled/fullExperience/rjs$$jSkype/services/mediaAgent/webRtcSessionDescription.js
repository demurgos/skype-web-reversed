define("jSkype/services/mediaAgent/webRtcSessionDescription", [
  "./constants",
  "./helper",
  "microsoft-sdp-transform",
  "./msSdpTransform"
], function (e, t, n, r) {
  function i(t, i, s, l) {
    var c = t.settings, h = t.logger, p = t.adapter, d = n.parse(s), v = new r(t), m;
    this.getModalities = function () {
      return a(d);
    };
    this.hasDtls = function () {
      return d.media.some(function (e) {
        return "RTP/SAVPF" !== e.protocol;
      });
    };
    this.toOffer = function (e) {
      return d = n.parse(e), f(d, function (e, t) {
        t.port !== 0 && !m[e] && (h.warn("toOffer _applyMediaFixups disable", "type:", e), o(t));
        u(c, t);
      }), c.disableMsSdp || v.toMsSdp(d, { type: i }), n.write(d);
    };
    this.toAnswer = function (e) {
      return d = n.parse(e), f(d, function (e, t) {
        u(c, t);
      }), c.disableMsSdp || v.toMsSdp(d, { type: i }), n.write(d);
    };
    this.toLocal = function (e) {
      return m = e, n.write(d);
    };
    this.toRemote = function (t) {
      return m = t, f(d, function (t, n) {
        n.port !== 0 && !m[t] && (h.warn("toRemote _applyMediaFixups disable", "type:", t), o(n));
        m[t] === e.MEDIA_STATE.send && n.direction.toLowerCase() !== "recvonly" && (h.warn("toRemote _applyMediaFixups direction => recvonly", "type:", t, "olddirection:", n.direction), n.direction = "recvonly");
      }), p.toRemote(d), n.write(d);
    };
    this.needToWaitIceCandidates = function () {
      return d.media && d.media.some(function (e) {
        return e.port === 9;
      });
    };
    (function () {
      l && !c.disableMsSdp && v.fromMsSdp(d, { type: i });
    }());
  }
  function s(e, t, i, s) {
    var a = e.settings, l = new r(e), c = n.parse(i);
    return f(c, function (e, t) {
      t.port !== 0 && !s[e] && o(t);
      t.direction = "inactive";
      u(a, t);
    }), a.disableMsSdp || l.toMsSdp(c, { type: t }), n.write(c);
  }
  function o(e) {
    e.port = 0;
    for (var t in e)
      e.hasOwnProperty(t) && [
        "type",
        "port",
        "protocol",
        "payloads",
        "connection",
        "direction"
      ].indexOf(t) < 0 && (delete e[t], e.direction = "inactive");
  }
  function u(e, t) {
    if (e.iceCandidateType || e.iceCandidateTransport)
      t.candidates = t.candidates.filter(function (t) {
        var n = !0, r = !0;
        return e.iceCandidateType && (n = t.type.match(new RegExp(e.iceCandidateType), "i")), e.iceCandidateTransport && (r = t.transport.match(new RegExp(e.iceCandidateTransport, "i"))), n && r;
      });
  }
  function a(n, r) {
    var i, s = t.createUniformModalities(void 0);
    for (var o = 0; o < n.media.length; ++o) {
      i = n.media[o];
      if (i.port !== 0 || r)
        i.type === "audio" ? s[e.MEDIA_TYPE.audio] = i.direction || e.MEDIA_STATE.sendReceive : i.type === "video" && (s[e.MEDIA_TYPE.video] = i.direction || e.MEDIA_STATE.sendReceive);
    }
    return s;
  }
  function f(t, n) {
    for (var r = 0; r < t.media.length; r++)
      t.media[r].type === "audio" ? n(e.MEDIA_TYPE.audio, t.media[r]) : t.media[r].type === "video" && n(e.MEDIA_TYPE.video, t.media[r]);
  }
  return {
    build: function (e) {
      return e = e || {}, {
        createLocalOffer: function (t) {
          return new i(e, "offer", t);
        },
        createRemoteOffer: function (t) {
          return new i(e, "offer", t, !0);
        },
        createLocalAnswer: function (t) {
          return new i(e, "answer", t);
        },
        createRemoteAnswer: function (t) {
          return new i(e, "answer", t, !0);
        },
        createInactiveOfferSdp: s.bind(null, e, "offer"),
        createInactiveAnswerSdp: s.bind(null, e, "answer")
      };
    }
  };
});

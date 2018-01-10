(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/helper", [
      "require",
      "exports",
      "./constants",
      "./common/utils"
    ], e);
}(function (e, t) {
  function i(e) {
    switch (e) {
    case n["default"].MEDIA_STATE.send:
      return n["default"].MEDIA_STATE.receive;
    case n["default"].MEDIA_STATE.receive:
      return n["default"].MEDIA_STATE.send;
    default:
      return e;
    }
  }
  function s(e) {
    var t = {}, n = i(e.audio);
    n && (t.audio = n);
    var r = i(e.video);
    r && (t.video = r);
    var s = i(e.sharing);
    return s && (t.sharing = s), t;
  }
  function o(e) {
    return e === n["default"].MEDIA_STATE.sendReceive ? n["default"].MEDIA_STATE.receive : void 0;
  }
  function u(e) {
    return e === n["default"].MEDIA_STATE.send || e === n["default"].MEDIA_STATE.sendReceive;
  }
  function a(e) {
    return e === n["default"].MEDIA_STATE.receive || e === n["default"].MEDIA_STATE.sendReceive;
  }
  function f(e) {
    return e.audio === n["default"].MEDIA_STATE.inactive;
  }
  function l(e) {
    var t = {};
    for (var r in n["default"].MEDIA_TYPE)
      n["default"].MEDIA_TYPE.hasOwnProperty(r) && (t[n["default"].MEDIA_TYPE[r]] = e);
    return t;
  }
  function c(e, t) {
    var r = u(e) && u(t), i = a(e) && a(t);
    return r && i ? n["default"].MEDIA_STATE.sendReceive : r ? n["default"].MEDIA_STATE.send : i ? n["default"].MEDIA_STATE.receive : e === n["default"].MEDIA_STATE.inactive && t ? n["default"].MEDIA_STATE.inactive : void 0;
  }
  function h(e, t) {
    var n = {}, r = c(e.audio, t.audio);
    r && (n.audio = r);
    var i = c(e.video, t.video);
    i && (n.video = i);
    var s = c(e.sharing, t.sharing);
    return s && (n.sharing = s), n;
  }
  function p(e, t) {
    return !!e && !!t && e.audio === t.audio && e.video === t.video;
  }
  function d(e, t, n) {
    function r(e, t, n) {
      var r = u(e) && u(t) || !u(e) && !u(n), i = a(e) && a(t) || !a(e) && !a(n);
      return r && i;
    }
    return r(e.audio, t.audio, n.audio) && r(e.video, t.video, n.video) && r(e.sharing, t.sharing, n.sharing);
  }
  function v(e, t) {
    function n(e, t) {
      var n = u(e) === u(t), r = a(e) === a(t);
      return n && r;
    }
    return n(e.audio, t.audio) && n(e.video, t.video) && n(e.sharing, t.sharing);
  }
  function m() {
    return typeof RTCIceGatherer != "undefined";
  }
  function g(e) {
    var t, n, r = !0, i = new Promise(function (e, r) {
        t = e;
        n = r;
      });
    return e !== undefined && Promise.resolve().then(function () {
      r = !1;
      t(e);
    }), {
      isPending: function () {
        return r;
      },
      promise: i,
      resolve: function () {
        r && (t.apply(null, arguments), r = !1);
      },
      reject: function (e) {
        r && (n.apply(null, arguments), r = !1);
      }
    };
  }
  function y(e) {
    return new Promise(function (t) {
      setTimeout(t, e);
    });
  }
  function b(e, t, n) {
    var r = new Promise(function (e, r) {
      setTimeout(r.bind(null, new Error("Promise timed out" + (n ? ": " + n : "") + "after " + t + "ms")), t);
    });
    return Promise.race([
      e,
      r
    ]);
  }
  function w(e) {
    var t = {
      dtls: !1,
      sdes: !1
    };
    return t.dtls = !!e.fingerprint, e.media.forEach(function (e) {
      t.dtls = t.dtls || !!e.fingerprint;
      t.sdes = t.sdes || !!e.crypto;
    }), t;
  }
  function E(e, t, n) {
    if (!t || r["default"].isEmpty(t))
      return e;
    var i = function (e, r) {
        if (!t[e])
          return !0;
        if (n) {
          if (!u(r) && (!n[e] || n[e] !== r))
            return !1;
        } else if (t[e] === r)
          return !1;
        return !0;
      }, s = {};
    return r["default"].forOwn(e, function (t, n) {
      i(n, t) && (s[n] = e[n]);
    }), s;
  }
  var n = e("./constants"), r = e("./common/utils");
  t.__esModule = !0;
  t["default"] = {
    invertDirectionality: i,
    invertModalities: s,
    removeSendDirectionality: o,
    hasSendDirectionality: u,
    hasReceiveDirectionality: a,
    negotiateDirectionality: c,
    negotiateModalities: h,
    areModalitiesEqual: p,
    isOnHold: f,
    createUniformModalities: l,
    areNegotiatedDirectionsFulfilled: v,
    areNegotiatedDirectionsAcceptable: d,
    isMsBrowser: m,
    defer: g,
    delay: y,
    timeout: b,
    getSrtpInfo: w,
    excludePassiveModalities: E
  };
}));

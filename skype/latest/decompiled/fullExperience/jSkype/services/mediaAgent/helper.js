define("jSkype/services/mediaAgent/helper", ["./constants"], function (e) {
  function t(t) {
    switch (t) {
    case e.MEDIA_STATE.send:
      return e.MEDIA_STATE.receive;
    case e.MEDIA_STATE.receive:
      return e.MEDIA_STATE.send;
    default:
      return t;
    }
  }
  function n(e) {
    var n = {}, r = t(e.audio);
    r && (n.audio = r);
    var i = t(e.video);
    return i && (n.video = i), n;
  }
  function r(t) {
    return t === e.MEDIA_STATE.sendReceive ? e.MEDIA_STATE.receive : void 0;
  }
  function i(t) {
    return t === e.MEDIA_STATE.send || t === e.MEDIA_STATE.sendReceive;
  }
  function s(t) {
    return t === e.MEDIA_STATE.receive || t === e.MEDIA_STATE.sendReceive;
  }
  function o(t) {
    return t.audio === e.MEDIA_STATE.inactive || t.video === e.MEDIA_STATE.inactive;
  }
  function u(t) {
    var n = {};
    for (var r in e.MEDIA_TYPE)
      e.MEDIA_TYPE.hasOwnProperty(r) && (n[e.MEDIA_TYPE[r]] = t);
    return n;
  }
  function a(t, n) {
    var r = i(t) && i(n), o = s(t) && s(n);
    return r && o ? e.MEDIA_STATE.sendReceive : r ? e.MEDIA_STATE.send : o ? e.MEDIA_STATE.receive : t === e.MEDIA_STATE.inactive && n ? e.MEDIA_STATE.inactive : void 0;
  }
  function f(e, t) {
    var n = {}, r = a(e.audio, t.audio);
    r && (n.audio = r);
    var i = a(e.video, t.video);
    return i && (n.video = i), n;
  }
  function l(e, t) {
    return !!e && !!t && e.audio === t.audio && e.video === t.video;
  }
  function c(e, t) {
    e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var n = new RegExp("[\\?&]" + e + "=([^&#]*)"), r = n.exec(location.search), i = t;
    if (r) {
      var s = decodeURIComponent(r[1].replace(/\+/g, " "));
      try {
        i = JSON.parse(s);
      } catch (o) {
        i = s;
      }
    }
    return i;
  }
  function h(e, t, n) {
    function r(e, t, n) {
      var r = i(e) && i(t) || !i(e) && !i(n), o = s(e) && s(t) || !s(e) && !s(n);
      return r && o;
    }
    return r(e.audio, t.audio, n.audio) && r(e.video, t.video, n.video);
  }
  function p(e, t) {
    function n(e, t) {
      var n = i(e) === i(t), r = s(e) === s(t);
      return n && r;
    }
    return n(e.audio, t.audio) && n(e.video, t.video);
  }
  function d(e) {
    var t = {};
    for (var n in e)
      e.hasOwnProperty(n) && (t[n] = e[n]);
    return t;
  }
  function v() {
    return typeof RTCIceGatherer != "undefined";
  }
  function m() {
    var e, t, n = !0, r = new Promise(function (n, r) {
        e = n, t = r;
      });
    return {
      isPending: function () {
        return n;
      },
      promise: r,
      resolve: function () {
        n && (e.apply(null, arguments), n = !1);
      },
      reject: function () {
        n && (t.apply(null, arguments), n = !1);
      }
    };
  }
  function g(e) {
    return new Promise(function (t) {
      setTimeout(t, e);
    });
  }
  function y(e, t, n) {
    var r = new Promise(function (e, r) {
      setTimeout(r.bind(null, new Error("Promise timed out" + (n ? ": " + n : "") + "after " + t + "ms")), t);
    });
    return Promise.race([
      e,
      r
    ]);
  }
  return {
    invertDirectionality: t,
    invertModalities: n,
    removeSendDirectionality: r,
    hasSendDirectionality: i,
    hasReceiveDirectionality: s,
    negotiateDirectionality: a,
    negotiateModalities: f,
    areModalitiesEqual: l,
    isOnHold: o,
    createUniformModalities: u,
    getParameterByName: c,
    areNegotiatedDirectionsFulfilled: p,
    areNegotiatedDirectionsAcceptable: h,
    shallowClone: d,
    isMsBrowser: v,
    defer: m,
    delay: g,
    timeout: y
  };
})

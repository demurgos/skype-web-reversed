(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/webrtc/sessionDescriptorUtils", [
      "require",
      "exports",
      "../constants",
      "../common/utils"
    ], e);
}(function (e, t) {
  function i(e, t, n) {
    e.rtp && e.rtp.some(function (r, i) {
      var s = r.payload;
      if (t.name.toLowerCase() !== r.codec.toLowerCase() || t.rate !== r.rate || t.encoding !== r.encoding)
        return !1;
      var o = { rtp: r };
      e.fmtp = e.fmtp || [];
      var u = e.fmtp.some(function (e) {
          return r.payload !== e.payload ? !1 : (o.fmtp = e, !0);
        }), a = n(o);
      return a === null ? (e.payloads = e.payloads.toString().split(" ").filter(function (e) {
        return r.payload !== +e;
      }).join(" "), e.fmtp = e.fmtp.filter(function (e) {
        return r.payload !== e.payload;
      }), e.rtp.splice(i, 1)) : (o.rtp.payload !== s && (e.payloads = e.payloads.toString().split(" ").map(function (e) {
        return +e === s ? o.rtp.payload : +e;
      }).join(" "), o.fmtp && (o.fmtp.payload = o.rtp.payload)), !u && o.fmtp && e.fmtp.push(o.fmtp)), !0;
    });
  }
  function s(e, t) {
    var n = -1;
    e.rtp.forEach(function (e, r) {
      t.codec.toLowerCase() === e.codec.toLowerCase() && t.rate === e.rate && t.encoding === e.encoding && (n = r);
    });
    if (n >= 0 && e.rtp.length > 1) {
      var r = e.rtp[n].payload;
      e.rtp.splice(n, 1);
      e.payloads = e.payloads.split(" ").filter(function (e) {
        return r !== +e;
      }).join(" ");
      e.fmtp = e.fmtp.filter(function (e) {
        return r !== e.payload;
      });
    }
  }
  function o(e) {
    if (e.label) {
      if (n["default"].MEDIA_LABEL.audio === e.label)
        return n["default"].MODALITY.audio;
      if (n["default"].MEDIA_LABEL.video === e.label)
        return n["default"].MODALITY.video;
      if (n["default"].MEDIA_LABEL.sharing === e.label)
        return n["default"].MODALITY.sharing;
    } else {
      if (n["default"].MEDIA_TYPE.audio === e.type)
        return n["default"].MODALITY.audio;
      if (n["default"].MEDIA_TYPE.video === e.type)
        return n["default"].MODALITY.video;
    }
    return null;
  }
  function u(e) {
    return n["default"].MODALITY.audio === e ? n["default"].MEDIA_LABEL.audio : n["default"].MODALITY.video === e ? n["default"].MEDIA_LABEL.video : n["default"].MODALITY.sharing === e ? n["default"].MEDIA_LABEL.sharing : null;
  }
  function a(e) {
    return e.media.reduce(function (e, t) {
      if (t.port !== 0) {
        var r = o(t);
        if (!(r in e)) {
          var i = t.direction ? t.direction.toLowerCase() : n["default"].MEDIA_STATE.sendReceive;
          e[r] = i;
        }
      }
      return e;
    }, {});
  }
  function f(e) {
    return e === n["default"].MODALITY.audio ? n["default"].MEDIA_TYPE.audio : n["default"].MEDIA_TYPE.video;
  }
  function l(e) {
    var t;
    if (e.groups) {
      var n = r["default"].find(e.groups, function (e) {
        return "BUNDLE" === e.type;
      });
      if (n) {
        var i = n.mids.split(" ")[0];
        t = r["default"].find(e.media, function (e) {
          var t = typeof e.mid == "number" ? e.mid.toString() : e.mid;
          return i === t;
        });
      }
    }
    return t || null;
  }
  var n = e("../constants"), r = e("../common/utils");
  t.__esModule = !0;
  t["default"] = {
    forCodec: i,
    getModality: o,
    getModalities: a,
    removeCodec: s,
    getLabelForModality: u,
    getTypeFromModality: f,
    getBundle: l
  };
}));

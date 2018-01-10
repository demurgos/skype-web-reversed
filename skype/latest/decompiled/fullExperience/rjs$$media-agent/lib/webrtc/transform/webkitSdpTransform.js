(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/webrtc/transform/webkitSdpTransform", [
      "require",
      "exports",
      "../sessionDescriptorUtils",
      "../../constants",
      "../../common/utils",
      "../../common/ssrcGenerator"
    ], e);
}(function (e, t) {
  function o() {
    function u(e) {
      n["default"].removeCodec(e, {
        codec: "g722",
        rate: 8000,
        encoding: 2
      });
    }
    function a(e) {
      return e.groups ? i["default"].find(e.groups, function (e) {
        return e.type === "BUNDLE";
      }) : null;
    }
    function f(e, t, n) {
      return {
        type: e,
        port: 0,
        label: t,
        payloads: 36,
        protocol: n
      };
    }
    function l(t, s, o, u, a) {
      var l = t.getMid(), c = t.getModality(), p = i["default"].deepClone(s);
      p.label = n["default"].getLabelForModality(c);
      p.direction = u;
      p.mid = l;
      p.ssrcs = [];
      p.ssrcGroups = [];
      if (u === r["default"].MEDIA_STATE.send || u === r["default"].MEDIA_STATE.sendReceive) {
        var d = i["default"].find(o, function (e) {
          return e.modality === c;
        });
        if (!d)
          return f(s.type, n["default"].getLabelForModality(c), s.protocol);
        if (s.ssrcs) {
          var v = s.ssrcs.filter(function (e) {
            return e.attribute === "msid" && d.track === h(e.value);
          }).map(function (e) {
            return e.id;
          });
          p.ssrcs = s.ssrcs.filter(function (e) {
            return v.indexOf(e.id) > -1;
          });
          p.ssrcs.forEach(function (t) {
            t.attribute === "cname" && (t.value = e);
          });
        }
        s.ssrcGroups && (p.ssrcGroups = s.ssrcGroups.filter(function (e) {
          var t = e.ssrcs.split(" ");
          return i["default"].find(t, function (e) {
            return v.indexOf(+e) > -1;
          });
        }));
      } else if (u == r["default"].MEDIA_STATE.receive || u == r["default"].MEDIA_STATE.inactive)
        a[s.type].ssrcs && a[s.type].ssrcs[0] ? p.ssrcs = [{
            id: a[s.type].ssrcs[0].id,
            attribute: "cname",
            value: e
          }] : s.type === r["default"].MEDIA_TYPE.audio ? p.ssrcs = [{
            id: 4195875351,
            attribute: "cname",
            value: e
          }] : s.type === r["default"].MEDIA_TYPE.video && (p.ssrcs = [{
            id: 1,
            attribute: "cname",
            value: e
          }]);
      return p;
    }
    function c(e, t, s, o) {
      var u = i["default"].deepClone(e), c = i["default"].find(u.media, function (e) {
          return e.type === r["default"].MEDIA_TYPE.audio;
        }), h = i["default"].find(u.media, function (e) {
          return e.type === r["default"].MEDIA_TYPE.video;
        }), p = {};
      p[r["default"].MODALITY.audio] = c;
      p[r["default"].MODALITY.video] = h;
      p[r["default"].MODALITY.sharing] = h;
      var d = {};
      d[r["default"].MEDIA_TYPE.audio] = c;
      d[r["default"].MEDIA_TYPE.video] = h;
      var v = {};
      v[r["default"].MODALITY.audio] = t.getMediaEntitiesByModality(r["default"].MODALITY.audio)[0];
      v[r["default"].MODALITY.video] = t.getMediaEntitiesByModality(r["default"].MODALITY.video)[0];
      v[r["default"].MODALITY.sharing] = t.getMediaEntitiesByModality(r["default"].MODALITY.sharing)[0];
      u.media = [];
      t.getMediaEntities().forEach(function (e) {
        var i, a = s[e.getModality()];
        !e.isEnabled() || p[e.getModality()].port === 0 || e !== v[e.getModality()] && a === r["default"].MEDIA_STATE.send ? i = f(e.getType(), n["default"].getLabelForModality(e.getModality()), p[e.getModality()].protocol) : (e !== v[e.getModality()] && (a = r["default"].MEDIA_STATE.receive), i = l(e, p[e.getModality()], t.getMediaTracks(), a, d), e !== v[e.getModality()] && (i.candidates = []));
        var c = p[e.getModality()].setup;
        c && (c !== "actpass" ? e.setExtension("setup", c) : o && e.getExtension("setup") !== undefined && (i.setup = e.getExtension("setup") !== "actpass" ? e.getExtension("setup") : c));
        i.port === 0 && e.disable();
        u.media.push(i);
      });
      var m = a(u);
      return m && (m.mids = u.media.map(function (e) {
        return e.mid;
      }).filter(function (e) {
        return e;
      }).join(" ")), u;
    }
    function h(e) {
      return e.split(" ")[1];
    }
    function p(e, n) {
      return o[e.mid] === undefined && (o[e.mid] = []), o[e.mid][n] === undefined && (o[e.mid][n] = t.nextVideoStreamSsrc().min), o[e.mid][n];
    }
    function d(e) {
      o[e.mid] && delete o[e.mid];
    }
    function v(e, t) {
      return e === r["default"].MEDIA_STATE.sendReceive || t === r["default"].MEDIA_STATE.sendReceive ? r["default"].MEDIA_STATE.sendReceive : e === t ? e : e && t && e !== t ? r["default"].MEDIA_STATE.sendReceive : e || t;
    }
    var e = i["default"].uniqueId(), t = new s["default"](), o = [];
    this.toLocal = function (e, t, n) {
      var r = i["default"].deepClone(e);
      return r.media.forEach(function (e) {
        if (e.type !== "audio") {
          var t = -1;
          if (e.ssrcs) {
            e.ssrcs.forEach(function (n) {
              n.attribute === "cname" && t++;
              n.id = p(e, t);
            });
            if (e.ssrcGroups) {
              var n = e.ssrcs.filter(function (e) {
                return e.attribute === "cname";
              }).map(function (e) {
                return e.id;
              });
              e.ssrcGroups.forEach(function (e, t) {
                e.ssrcs = [
                  n[t * 2],
                  n[t * 2 + 1]
                ].join(" ");
              });
            }
          }
        }
      }), r;
    };
    this.toOffer = function (e, t, n) {
      return c(e, t, n, !0);
    };
    this.toAnswer = function (e, t, n) {
      return c(e, t, n, !1);
    };
    this.toRemote = function (e, t, s) {
      var o = i["default"].deepClone(e), l = null, c = null, h = a(o);
      o.media.forEach(function (e, n) {
        var r = t.getMediaEntity(n);
        r.isDisabled() && (e.port = 0);
      });
      if (!h) {
        var p = {};
        o.media.forEach(function (e, n) {
          var r = t.getMediaEntity(n);
          r.getType() in p ? (r.disable(), e.port = 0) : p[r.getType()] = !0;
        });
      }
      o.media.forEach(function (e) {
        var t = n["default"].getModality(e);
        s[t] === r["default"].MEDIA_STATE.send && (!e.direction || e.direction.toLowerCase() !== r["default"].MEDIA_STATE.receive) && (e.direction = r["default"].MEDIA_STATE.receive);
      });
      var d = i["default"].find(o.media, function (e) {
        return e.type === r["default"].MEDIA_TYPE.audio;
      });
      d && (d.port !== 0 ? (l = i["default"].deepClone(d), l.mid = "audio", delete l.label, u(l)) : l = f(r["default"].MEDIA_TYPE.audio, undefined, d.protocol));
      var m = o.media.filter(function (e) {
        return e.type === r["default"].MEDIA_TYPE.video;
      });
      if (m.length > 0) {
        var g = m.filter(function (e) {
          return e.port !== 0;
        });
        g.length > 0 ? (c = i["default"].deepClone(g[0]), c.mid = "video", c.direction = null, delete c.label, c.ssrcs = [], c.ssrcGroups = [], g.forEach(function (e) {
          e.ssrcs && (c.ssrcs = c.ssrcs.concat(e.ssrcs));
          e.ssrcGroups && (c.ssrcGroups = c.ssrcGroups.concat(e.ssrcGroups));
          c.direction = v(c.direction, e.direction || r["default"].MEDIA_STATE.sendReceive);
        })) : c = f(r["default"].MEDIA_TYPE.video, undefined, m[0].protocol);
      }
      return o.media = [
        l,
        c
      ].filter(function (e) {
        return e;
      }), t.getMediaEntities()[0].getModality() !== r["default"].MODALITY.audio && o.media.reverse(), h && (h.mids = o.media.map(function (e) {
        return e.mid;
      }).filter(function (e) {
        return e;
      }).join(" ")), o;
    };
  }
  var n = e("../sessionDescriptorUtils"), r = e("../../constants"), i = e("../../common/utils"), s = e("../../common/ssrcGenerator");
  t.__esModule = !0;
  t["default"] = {
    build: function () {
      return o;
    }
  };
}));

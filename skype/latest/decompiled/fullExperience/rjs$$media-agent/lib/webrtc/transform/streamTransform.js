(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/webrtc/transform/streamTransform", [
      "require",
      "exports",
      "../../constants",
      "../../common/utils",
      "../webRtcConstants"
    ], e);
}(function (e, t) {
  function u() {
    function e(e) {
      if (e.ssrcGroups) {
        var t;
        e.ssrcGroups.some(function (e) {
          return "FID" === e.semantics ? (t = e, !0) : !1;
        });
        if (t)
          return t.ssrcs.split(" ").map(function (e) {
            return +e;
          });
      }
      return [];
    }
    function t(e, t, n, r) {
      e.ssrcs = e.ssrcs || [];
      e.ssrcs.push({
        attribute: "cname",
        id: t,
        value: n
      });
      e.ssrcs.push({
        attribute: "msid",
        id: t,
        value: r
      });
    }
    function n(e, t) {
      e.filter(function (e) {
        return "msid" === e.attribute;
      }).forEach(function (e) {
        var n = e.value.split(" ");
        e.value = t(n[0], n[1] || n[0]);
      });
    }
    function r(e, t, n) {
      var r = u(n);
      return r + e + " " + r + t;
    }
    function u(e) {
      return s[e] ? s[e] + i["default"].STREAM_ID_DELIMITER : "";
    }
    function a(e) {
      return "recvonly" === e.direction;
    }
    this.fromMsSdp = function (i) {
      if (0 === i.port)
        return;
      if (!a(i)) {
        if (i.msid) {
          i.ssrcs && i.ssrcs.length === 1 && (t(i, i.ssrcs[0].id, i.ssrcs[0].value, i.msid), i.ssrcs.shift());
          var s = i.msid.split(" ");
          i.msid = r(s[0], s[1] || s[0], i.label);
        }
        if (i.ssrcs)
          n(i.ssrcs, function (e, t) {
            return r(e, t, i.label);
          });
        else {
          var u = e(i);
          u.length > 0 ? u.forEach(function (e) {
            t(i, e, o, r(u[0], u[0], i.label));
          }) : i.xSsrcRange && t(i, i.xSsrcRange.ssrcMin, o, r(i.xSsrcRange.ssrcMin, i.xSsrcRange.ssrcMin, i.label));
        }
      }
      delete i.xSsrcRange;
    };
    this.toMsSdp = function (e) {
      if (0 === e.port)
        return;
      var t;
      e.ssrcs && e.ssrcs[0] && (t = e.ssrcs[0].id);
      void 0 !== t && (e.xSsrcRange = {
        ssrcMin: t,
        ssrcMax: t
      });
    };
  }
  var n = e("../../constants"), r = e("../../common/utils"), i = e("../webRtcConstants"), s = [
      {
        label: n["default"].MEDIA_LABEL.audio,
        id: i["default"].STREAM_ID.audio
      },
      {
        label: n["default"].MEDIA_LABEL.video,
        id: i["default"].STREAM_ID.video
      },
      {
        label: n["default"].MEDIA_LABEL.sharing,
        id: i["default"].STREAM_ID.sharing
      }
    ].reduce(function (e, t) {
      return e[t.label] = t.id, e;
    }, {}), o = r["default"].uniqueId();
  t.__esModule = !0;
  t["default"] = {
    build: function () {
      return new u();
    }
  };
}));

(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/webrtc/transform/candidateTransform", [
      "require",
      "exports",
      "../sessionDescriptorUtils"
    ], e);
}(function (e, t) {
  function r() {
    function t(e, t) {
      if (e.port && !e.candidates.length) {
        var r = n["default"].getBundle(t);
        r && (e.port = r.port, e.connection = r.connection);
      }
    }
    function r(e, t) {
      delete e.generation;
      e.transport.match(/tcp/i) && i(e, t);
    }
    function i(t, n) {
      e.some(function (e) {
        if (n) {
          if (e.msSdp === t.transport.toLowerCase())
            return t.transport = "tcp", t.tcptype = e.jsep, !0;
        } else if (t.tcptype && e.jsep === t.tcptype.toLowerCase())
          return t.transport = e.msSdp, delete t.tcptype, !0;
        return !1;
      });
    }
    function s(e, t, n) {
      var r = t.connection || n.connection, i = function (e, t, n) {
          return e.port === n && e.ip === t;
        };
      return r ? 1 === e.component ? i(e, r.ip, t.port) : t.rtcp ? i(e, t.rtcp.ip || r.ip, t.rtcp.port) : !1 : !1;
    }
    var e = [
      {
        jsep: "active",
        msSdp: "tcp-act"
      },
      {
        jsep: "passive",
        msSdp: "tcp-pass"
      },
      {
        jsep: "so",
        msSdp: "tcp-so"
      }
    ];
    this.fromMsSdp = function (e) {
      e.candidates = e.candidates || [];
      e.xCandidatesIpv6 && (e.xCandidatesIpv6.forEach(function (t) {
        e.candidates.push(t);
      }), delete e.xCandidatesIpv6);
      e.candidates.forEach(function (e) {
        r(e, !0);
      });
    };
    this.toMsSdp = function (e, n) {
      e.candidates = e.candidates || [];
      e.candidates.sort(function (t, r) {
        return t.foundation !== r.foundation ? t.foundation - r.foundation : t.component !== r.component ? t.component - r.component : +s(r, e, n) - +s(t, e, n);
      });
      e.candidates = e.candidates.filter(function (t, n) {
        r(t, !1);
        var i = e.candidates[n - 1];
        return !i || i.component !== t.component || i.foundation !== t.foundation;
      });
      t(e, n);
    };
  }
  var n = e("../sessionDescriptorUtils");
  t.__esModule = !0;
  t["default"] = {
    build: function () {
      return new r();
    }
  };
}));

(function (e) {
  if (typeof module == "object" && typeof module.exports == "object") {
    var t = e(require, exports);
    t !== undefined && (module.exports = t);
  } else
    typeof define == "function" && define.amd && define("media-agent/lib/ortc/ortcChannelStats", [
      "require",
      "exports",
      "../helper",
      "../common/utils"
    ], e);
}(function (e, t) {
  function i(e, t, i, s) {
    function u() {
      if (!t)
        return "CheckNotCompleted";
      var e = t.state;
      return e === "new" || e === "checking" || e === "connected" ? "CheckNotCompleted" : e === "completed" ? "CheckSucceed" : e === "failed" ? "CheckFailed" : e === "disconnected" || e === "closed" ? "MediaTimeout" : "Unknown DiagnosticReason";
    }
    var o = e.logger.createChild("ChannelStats");
    this.getReport = function () {
      function a(t, i, s) {
        if (!t)
          return;
        var u = i + "." + (s ? "msGetStats" : "getStats"), a = new Promise(function (e) {
            o.log(u, "start");
            e(s ? t.msGetStats() : t.getStats());
          }).then(function (t) {
            o.log(u, "complete");
            e[i] = e[i] || {};
            r["default"].forOwn(t, function (t) {
              e[i][t.type || t.msType] = t;
            });
          })["catch"](function (e) {
            o.warn(u, "failed:", e);
          });
        return n["default"].timeout(a, 5000, u)["catch"](function (e) {
          o.warn(u, "failed:", e);
        });
      }
      var e = {};
      return e.extended = { mediaDiagnostic: { reason: u() } }, new Promise(function (n) {
        Promise.all([
          a(t, "iceTransport", !1),
          a(t, "iceTransport", !0),
          a(i, "sender", !1),
          a(i, "sender", !0),
          a(s, "receiver", !1),
          a(s, "receiver", !0)
        ]).then(function () {
          n(e);
        })["catch"](function (t) {
          o.error("getting statistics should never fail", t);
          n(e);
        });
      });
    };
  }
  var n = e("../helper"), r = e("../common/utils");
  t.__esModule = !0;
  t["default"] = {
    build: function (e, t, n, r) {
      return new i(e, t, n, r);
    }
  };
}));

define("jSkype/services/mediaAgent/ortcChannelStats", [
  "./helper",
  "./common/utils"
], function (e, t) {
  function n(n, r, i, s) {
    function u() {
      if (!r)
        return "CheckNotCompleted";
      var e = r.state;
      return e === "new" || e === "checking" || e === "connected" ? "CheckNotCompleted" : e === "completed" ? "CheckSucceed" : e === "failed" ? "CheckFailed" : e === "disconnected" || e === "closed" ? "MediaTimeout" : "Unknown DiagnosticReason";
    }
    var o = n.logger.createChild("ChannelStats");
    this.getReport = function () {
      function a(r, i, s) {
        if (!r)
          return;
        var u = i + "." + (s ? "msGetStats" : "getStats"), a = new Promise(function (e) {
            o.log(u, "start");
            e(s ? r.msGetStats() : r.getStats());
          }).then(function (e) {
            o.log(u, "complete");
            n[i] = n[i] || {};
            t.forOwn(e, function (e) {
              n[i][e.type || e.msType] = e;
            });
          }).catch(function (e) {
            o.warn(u, "failed:", e);
          });
        return e.timeout(a, 5000, u).catch(function (e) {
          o.warn(u, "failed:", e);
        });
      }
      var n = {};
      return n.extended = { mediaDiagnostic: { reason: u() } }, new Promise(function (e) {
        Promise.all([
          a(r, "iceTransport", !1),
          a(r, "iceTransport", !0),
          a(i, "sender", !1),
          a(i, "sender", !0),
          a(s, "receiver", !1),
          a(s, "receiver", !0)
        ]).then(function () {
          e(n);
        }).catch(function (t) {
          o.error("getting statistics should never fail", t);
          e(n);
        });
      });
    };
  }
  return {
    build: function (e, t, r, i) {
      return new n(e, t, r, i);
    }
  };
});

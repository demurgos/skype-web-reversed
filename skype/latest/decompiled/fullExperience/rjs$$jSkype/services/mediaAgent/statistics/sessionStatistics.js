define("jSkype/services/mediaAgent/statistics/sessionStatistics", [], function () {
  function e() {
    function h() {
      return {
        started: function () {
          n = "Offering";
          d();
        }
      };
    }
    function p() {
      return {
        started: function () {
          n = "Answering";
          d();
        }
      };
    }
    function d() {
      t = t || n;
      ++r;
    }
    function v() {
      return {
        completed: function () {
          r === 1 && (i = !0);
        },
        rejected: function () {
          ++l;
        }
      };
    }
    function m(e) {
      return e * 10000;
    }
    var e = new Date().getTime(), t, n, r = 0, i = !1, s = !1, o, u = 0, a = 0, f = "0", l = 0, c = {
        type: "none",
        detail: "none"
      };
    this.negotiation = {
      offering: h(),
      answering: p(),
      current: v()
    };
    this.terminated = function () {
      a = new Date().getTime();
      u = new Date().getTime() - e;
    };
    this.setMultiParty = function () {
      s = !0;
    };
    this.setMediaLegId = function (e) {
      o = e;
    };
    this.setId = function (e) {
      f = e;
    };
    this.setError = function (e) {
      c.type = e.type || "internalError";
      c.detail = e.detail || e.toString();
    };
    this.getReport = function () {
      return {
        CorrelationId: f,
        CallNumber: 0,
        RetargetCount: 0,
        CreationTime: m(e),
        InitTime: m(e),
        TerminationTime: m(a),
        CallDuration: m(u),
        InitialNegotiationType: t || "none",
        InitialNegotiationCompleted: i,
        NegotiationCount: r,
        RejectedNegotiationCount: l,
        MediaLegId: o,
        MultiParty: s,
        ErrorType: c.type,
        ErrorDetail: c.detail
      };
    };
  }
  return {
    build: function () {
      return new e();
    }
  };
});
